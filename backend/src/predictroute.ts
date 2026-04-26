import { cacheGet, cacheSet } from "./cache.js";
import { fetchMapsTrafficRisk, fetchNewsDisruptionRisk, fetchOpenWeatherRisk } from "./connectors.js";
import { shipments } from "./data.js";
import { getDb } from "./db.js";

type SignalType =
  | "WEATHER"
  | "TRAFFIC"
  | "PORT_CONGESTION"
  | "WAREHOUSE_CAPACITY"
  | "NEWS_NLP"
  | "SOCIAL_NLP";

interface IngestionSignal {
  id: string;
  shipmentId: string;
  source: SignalType;
  region: string;
  severity: number;
  confidence: number;
  message: string;
  timestamp: string;
}

interface RiskScore {
  shipmentId: string;
  delayProbability: number;
  bottleneckSeverity: number;
  confidenceLevel: number;
  predictedDelayHours: number;
  topSignals: IngestionSignal[];
}

interface RouteOption {
  routeId: string;
  algorithm: "DIJKSTRA" | "A_STAR" | "RL_POLICY";
  estimatedHours: number;
  fuelCostIndex: number;
  slaComplianceProbability: number;
  riskReductionPercent: number;
  summary: string;
}

interface RerouteRecommendation {
  shipmentId: string;
  selectedRoute: RouteOption;
  alternatives: RouteOption[];
  estimatedTimeSavedHours: number;
  estimatedCostImpactPercent: number;
  action: "AUTO_EXECUTE" | "MANUAL_APPROVAL";
}

interface AlertRecord {
  id: string;
  channel: "DASHBOARD" | "WHATSAPP" | "EMAIL" | "SMS";
  shipmentId: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  text: string;
  createdAt: string;
}

interface SignalRow {
  id: string;
  shipment_id: string;
  source: string;
  region: string;
  severity: number;
  confidence: number;
  message: string;
  created_at: string;
}

interface AlertRow {
  id: string;
  channel: string;
  shipment_id: string;
  priority: string;
  text: string;
  created_at: string;
}

interface ActionRow {
  id: string;
  shipment_id: string;
  mode: "AUTO" | "MANUAL";
  route_id: string;
  executed_by: string;
  created_at: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export async function ingestSignal(input: Omit<IngestionSignal, "id" | "timestamp">): Promise<IngestionSignal> {
  const created: IngestionSignal = {
    ...input,
    severity: clamp(input.severity, 0, 1),
    confidence: clamp(input.confidence, 0, 1),
    id: `sig-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
  };
  const db = getDb();
  await db.query(
    `INSERT INTO ingestion_signals (id, shipment_id, source, region, severity, confidence, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      created.id,
      created.shipmentId,
      created.source,
      created.region,
      created.severity,
      created.confidence,
      created.message,
    ],
  );
  return created;
}

export async function listSignals(limit = 20): Promise<IngestionSignal[]> {
  const db = getDb();
  const result = await db.query<SignalRow>(
    `SELECT id, shipment_id, source, region, severity, confidence, message, created_at
     FROM ingestion_signals
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit],
  );
  return result.rows.map((row) => ({
    id: row.id as string,
    shipmentId: row.shipment_id as string,
    source: row.source as SignalType,
    region: row.region as string,
    severity: Number(row.severity),
    confidence: Number(row.confidence),
    message: row.message as string,
    timestamp: new Date(row.created_at as string).toISOString(),
  }));
}

export async function scoreShipmentRisk(shipmentId: string): Promise<RiskScore | null> {
  const shipment = shipments.find((s) => s.id === shipmentId);
  if (!shipment) {
    return null;
  }

  const related = (await listSignals(100)).filter((s) => s.shipmentId === shipmentId).slice(0, 5);
  const weightedSeverity = related.length
    ? related.reduce((sum, s) => sum + s.severity * s.confidence, 0) / related.length
    : shipment.riskScore;

  const delayProbability = clamp(weightedSeverity * 0.9 + shipment.riskScore * 0.3, 0, 1);
  const bottleneckSeverity = clamp(weightedSeverity * 0.85 + (shipment.status === "Delayed" ? 0.25 : 0), 0, 1);
  const confidenceLevel = related.length
    ? clamp(related.reduce((sum, s) => sum + s.confidence, 0) / related.length, 0, 1)
    : 0.62;

  const risk = {
    shipmentId,
    delayProbability,
    bottleneckSeverity,
    confidenceLevel,
    predictedDelayHours: Math.round(delayProbability * 24),
    topSignals: related,
  };
  return risk;
}

export async function optimizeRoute(shipmentId: string): Promise<RerouteRecommendation | null> {
  const risk = await scoreShipmentRisk(shipmentId);
  if (!risk) {
    return null;
  }

  const baselineHours = 24;
  const options: RouteOption[] = [
    {
      routeId: `${shipmentId}-dijkstra`,
      algorithm: "DIJKSTRA",
      estimatedHours: Math.round(baselineHours - 2 - risk.delayProbability * 4),
      fuelCostIndex: 1.04,
      slaComplianceProbability: clamp(0.7 + (1 - risk.delayProbability) * 0.2, 0, 1),
      riskReductionPercent: Math.round((risk.bottleneckSeverity * 100) * 0.22),
      summary: "Balanced shortest-path reroute around flagged nodes.",
    },
    {
      routeId: `${shipmentId}-astar`,
      algorithm: "A_STAR",
      estimatedHours: Math.round(baselineHours - 3 - risk.delayProbability * 5),
      fuelCostIndex: 1.09,
      slaComplianceProbability: clamp(0.72 + (1 - risk.delayProbability) * 0.2, 0, 1),
      riskReductionPercent: Math.round((risk.bottleneckSeverity * 100) * 0.3),
      summary: "Heuristic-driven reroute for faster ETA under congestion.",
    },
    {
      routeId: `${shipmentId}-rl`,
      algorithm: "RL_POLICY",
      estimatedHours: Math.round(baselineHours - 4 - risk.delayProbability * 6),
      fuelCostIndex: 0.98,
      slaComplianceProbability: clamp(0.75 + (1 - risk.delayProbability) * 0.22, 0, 1),
      riskReductionPercent: Math.round((risk.bottleneckSeverity * 100) * 0.38),
      summary: "Policy-optimized adaptive route based on learned outcomes.",
    },
  ];

  const selectedRoute = [...options].sort(
    (a, b) =>
      b.riskReductionPercent * 0.4 +
      b.slaComplianceProbability * 100 * 0.4 -
      b.estimatedHours * 0.2 -
      (a.riskReductionPercent * 0.4 + a.slaComplianceProbability * 100 * 0.4 - a.estimatedHours * 0.2),
  )[0];

  return {
    shipmentId,
    selectedRoute,
    alternatives: options.filter((option) => option.routeId !== selectedRoute.routeId),
    estimatedTimeSavedHours: Math.max(1, baselineHours - selectedRoute.estimatedHours),
    estimatedCostImpactPercent: Math.round((selectedRoute.fuelCostIndex - 1) * 100),
    action: risk.delayProbability > 0.78 ? "AUTO_EXECUTE" : "MANUAL_APPROVAL",
  };
}

export async function executeReroute(shipmentId: string, executedBy: string, mode: "AUTO" | "MANUAL") {
  const recommendation = await optimizeRoute(shipmentId);
  if (!recommendation) {
    return null;
  }

  const action = {
    id: `act-${Date.now()}`,
    shipmentId,
    mode,
    routeId: recommendation.selectedRoute.routeId,
    executedBy,
    timestamp: new Date().toISOString(),
  };

  const db = getDb();
  await db.query(
    `INSERT INTO reroute_actions (id, shipment_id, mode, route_id, executed_by)
     VALUES ($1, $2, $3, $4, $5)`,
    [action.id, action.shipmentId, action.mode, action.routeId, action.executedBy],
  );
  return action;
}

export async function generateAlert(
  shipmentId: string,
  priority: AlertRecord["priority"],
  text: string,
  channels: AlertRecord["channel"][],
): Promise<AlertRecord[]> {
  const records = channels.map((channel) => ({
    id: `alt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    channel,
    shipmentId,
    priority,
    text,
    createdAt: new Date().toISOString(),
  }));
  const db = getDb();
  for (const alert of records) {
    await db.query(
      `INSERT INTO action_alerts (id, channel, shipment_id, priority, text)
       VALUES ($1, $2, $3, $4, $5)`,
      [alert.id, alert.channel, alert.shipmentId, alert.priority, alert.text],
    );
  }
  return records;
}

export async function listAlerts(limit = 25): Promise<AlertRecord[]> {
  const db = getDb();
  const result = await db.query<AlertRow>(
    `SELECT id, channel, shipment_id, priority, text, created_at
     FROM action_alerts
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit],
  );
  return result.rows.map((row) => ({
    id: row.id as string,
    channel: row.channel as AlertRecord["channel"],
    shipmentId: row.shipment_id as string,
    priority: row.priority as AlertRecord["priority"],
    text: row.text as string,
    createdAt: new Date(row.created_at as string).toISOString(),
  }));
}

export async function getControlTowerSummary() {
  const cached = await cacheGet<{
    activeShipments: number;
    delayedShipments: number;
    highRiskShipments: number;
    openAlerts: number;
    recentSignals: IngestionSignal[];
    lastActions: Array<{
      id: string;
      shipmentId: string;
      mode: "AUTO" | "MANUAL";
      routeId: string;
      executedBy: string;
      timestamp: string;
    }>;
  }>("control_tower_overview");
  if (cached) {
    return cached;
  }

  const delayedShipments = shipments.filter((s) => s.status === "Delayed");
  const scores = await Promise.all(shipments.map((s) => scoreShipmentRisk(s.id)));
  const atRisk = scores.filter((score): score is RiskScore => Boolean(score)).filter((score) => score.delayProbability > 0.65);
  const db = getDb();
  const actionRows = await db.query<ActionRow>(
    `SELECT id, shipment_id, mode, route_id, executed_by, created_at
     FROM reroute_actions
     ORDER BY created_at DESC
     LIMIT 5`,
  );
  const recentSignals = await listSignals(5);
  const allAlerts = await listAlerts(50);

  const summary = {
    activeShipments: shipments.length,
    delayedShipments: delayedShipments.length,
    highRiskShipments: atRisk.length,
    openAlerts: allAlerts.length,
    recentSignals,
    lastActions: actionRows.rows.map((row) => ({
      id: row.id as string,
      shipmentId: row.shipment_id as string,
      mode: row.mode as "AUTO" | "MANUAL",
      routeId: row.route_id as string,
      executedBy: row.executed_by as string,
      timestamp: new Date(row.created_at as string).toISOString(),
    })),
  };
  await cacheSet("control_tower_overview", summary, 20);
  return summary;
}

export async function registerOptimizationOutcome(input: {
  shipmentId: string;
  routeId: string;
  actualDelayHours: number;
  onTime: boolean;
  notes?: string;
}) {
  const feedback = {
    ...input,
    feedbackId: `fb-${Date.now()}`,
    recordedAt: new Date().toISOString(),
    learningStatus: "QUEUED_FOR_POLICY_UPDATE",
  };
  const db = getDb();
  await db.query(
    `INSERT INTO learning_outcomes (feedback_id, shipment_id, route_id, actual_delay_hours, on_time, notes, learning_status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      feedback.feedbackId,
      feedback.shipmentId,
      feedback.routeId,
      feedback.actualDelayHours,
      feedback.onTime,
      feedback.notes ?? null,
      feedback.learningStatus,
    ],
  );
  return feedback;
}

export async function ingestExternalSignals(shipmentId: string) {
  const shipment = shipments.find((item) => item.id === shipmentId);
  if (!shipment) {
    return null;
  }

  const [weather, traffic, news] = await Promise.all([
    fetchOpenWeatherRisk(shipment.origin),
    fetchMapsTrafficRisk(shipment.origin, shipment.destination),
    fetchNewsDisruptionRisk(`${shipment.origin} ${shipment.destination} logistics disruption`),
  ]);

  const generated = [];

  for (const entry of [weather, traffic, news]) {
    if (!entry.available) {
      continue;
    }
    generated.push(
      await ingestSignal({
        shipmentId,
        source: entry.source as SignalType,
        region: `${shipment.origin}-${shipment.destination}`,
        severity: entry.severity ?? 0.2,
        confidence: entry.confidence ?? 0.5,
        message: entry.message,
      }),
    );
  }

  return {
    shipmentId,
    sourceResults: [weather, traffic, news],
    ingestedSignals: generated,
  };
}
