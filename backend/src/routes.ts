import { Router } from "express";
import { companies, shipments, users } from "./data.js";
import { authenticate } from "./middleware/authenticate.js";
import { authorizePermissions, authorizeRoles } from "./middleware/authorize.js";
import {
  executeReroute,
  generateAlert,
  getControlTowerSummary,
  ingestExternalSignals,
  ingestSignal,
  listAlerts,
  listSignals,
  optimizeRoute,
  registerOptimizationOutcome,
  scoreShipmentRisk,
} from "./predictroute.js";
import { signAccessToken } from "./token.js";
import type { AuthenticatedRequest } from "./types.js";
import { UserRole } from "./types.js";

export const api = Router();

api.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

api.post("/auth/login", (req, res) => {
  const { email } = req.body as { email?: string };
  const user = users.find((u) => u.email.toLowerCase() === email?.toLowerCase());

  if (!user) {
    res.status(401).json({ message: "Unknown user. Use one of demo emails." });
    return;
  }

  res.json({
    accessToken: signAccessToken(user.id),
    user,
  });
});

api.get("/auth/profile", authenticate, (req: AuthenticatedRequest, res) => {
  res.json({ user: req.user });
});

api.get(
  "/admin/platform-overview",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN),
  authorizePermissions("platform:manage"),
  (_req, res) => {
    res.json({
      activeCompanies: companies.length,
      totalUsers: users.length,
      subscriptionMetrics: { enterprise: 1, growth: 0, starter: 0 },
      securityIncidentsOpen: 1,
      apiKeysIssued: 12,
    });
  },
);

api.get(
  "/company/account",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN),
  authorizePermissions("company:manage"),
  (req: AuthenticatedRequest, res) => {
    const companyId = req.user?.companyId ?? companies[0]?.id;
    const company = companies.find((c) => c.id === companyId);
    res.json({ company });
  },
);

api.get(
  "/operations/shipments",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.OPERATIONS_MANAGER, UserRole.ANALYST, UserRole.FIELD_EXECUTIVE, UserRole.VIEWER),
  authorizePermissions("shipments:read"),
  (req: AuthenticatedRequest, res) => {
    const companyShipments = req.user?.companyId
      ? shipments.filter((s) => s.companyId === req.user?.companyId)
      : shipments;
    res.json({ shipments: companyShipments });
  },
);

api.post(
  "/operations/routes/:shipmentId/approve",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.OPERATIONS_MANAGER),
  authorizePermissions("routes:approve"),
  (req, res) => {
    res.json({
      shipmentId: req.params.shipmentId,
      approved: true,
      approvedAt: new Date().toISOString(),
    });
  },
);

api.get(
  "/analytics/risk",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ANALYST),
  authorizePermissions("risk:analyze"),
  (_req, res) => {
    res.json({
      highRiskShipments: shipments.filter((s) => s.riskScore > 0.75),
      recommendation: "Shift delayed lane traffic to alternate warehouse cluster.",
    });
  },
);

api.post(
  "/field/incidents",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.FIELD_EXECUTIVE),
  authorizePermissions("incidents:report"),
  (req, res) => {
    const { shipmentId, description } = req.body as {
      shipmentId?: string;
      description?: string;
    };

    res.status(201).json({
      id: `inc-${Date.now()}`,
      shipmentId,
      description,
      status: "OPEN",
      reportedAt: new Date().toISOString(),
    });
  },
);

api.get(
  "/viewer/dashboard",
  authenticate,
  authorizeRoles(
    UserRole.SUPER_ADMIN,
    UserRole.COMPANY_ADMIN,
    UserRole.OPERATIONS_MANAGER,
    UserRole.ANALYST,
    UserRole.FIELD_EXECUTIVE,
    UserRole.VIEWER,
  ),
  authorizePermissions("dashboard:read"),
  (_req, res) => {
    res.json({
      onTimeDeliveryRate: 0.92,
      delayedShipments: shipments.filter((s) => s.status === "Delayed").length,
      costOptimizationOpportunity: "4.5% for west-region lanes",
    });
  },
);

api.post(
  "/ingestion/signals",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.OPERATIONS_MANAGER),
  authorizePermissions("shipments:read"),
  async (req, res) => {
    const created = await ingestSignal(req.body as Parameters<typeof ingestSignal>[0]);
    res.status(201).json({ signal: created });
  },
);

api.get(
  "/ingestion/signals",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.OPERATIONS_MANAGER, UserRole.ANALYST),
  authorizePermissions("shipments:read"),
  async (req, res) => {
    const limit = Number(req.query.limit ?? 20);
    res.json({ signals: await listSignals(limit) });
  },
);

api.post(
  "/ingestion/external/:shipmentId",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.OPERATIONS_MANAGER),
  authorizePermissions("shipments:read"),
  async (req, res) => {
    const result = await ingestExternalSignals(req.params.shipmentId);
    if (!result) {
      res.status(404).json({ message: "Shipment not found" });
      return;
    }
    res.status(201).json(result);
  },
);

api.get(
  "/intelligence/risk/:shipmentId",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.OPERATIONS_MANAGER, UserRole.ANALYST),
  authorizePermissions("risk:analyze"),
  async (req, res) => {
    const result = await scoreShipmentRisk(req.params.shipmentId);
    if (!result) {
      res.status(404).json({ message: "Shipment not found" });
      return;
    }
    res.json({ risk: result });
  },
);

api.get(
  "/optimization/recommendations/:shipmentId",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.OPERATIONS_MANAGER),
  authorizePermissions("routes:approve"),
  async (req, res) => {
    const recommendation = await optimizeRoute(req.params.shipmentId);
    if (!recommendation) {
      res.status(404).json({ message: "Shipment not found" });
      return;
    }
    res.json({ recommendation });
  },
);

api.post(
  "/action/reroute/:shipmentId/execute",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.OPERATIONS_MANAGER),
  authorizePermissions("routes:approve"),
  async (req: AuthenticatedRequest, res) => {
    const mode = (req.body as { mode?: "AUTO" | "MANUAL" }).mode ?? "MANUAL";
    const action = await executeReroute(req.params.shipmentId, req.user?.id ?? "unknown", mode);
    if (!action) {
      res.status(404).json({ message: "Shipment not found" });
      return;
    }
    res.json({ action });
  },
);

api.post(
  "/action/alerts",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.OPERATIONS_MANAGER, UserRole.FIELD_EXECUTIVE),
  authorizePermissions("alerts:handle"),
  async (req, res) => {
    const payload = req.body as {
      shipmentId: string;
      priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
      text: string;
      channels: Array<"DASHBOARD" | "WHATSAPP" | "EMAIL" | "SMS">;
    };

    const records = await generateAlert(payload.shipmentId, payload.priority, payload.text, payload.channels);
    res.status(201).json({ alerts: records });
  },
);

api.get(
  "/action/alerts",
  authenticate,
  authorizeRoles(
    UserRole.SUPER_ADMIN,
    UserRole.COMPANY_ADMIN,
    UserRole.OPERATIONS_MANAGER,
    UserRole.ANALYST,
    UserRole.FIELD_EXECUTIVE,
    UserRole.VIEWER,
  ),
  authorizePermissions("dashboard:read"),
  async (req, res) => {
    const limit = Number(req.query.limit ?? 25);
    res.json({ alerts: await listAlerts(limit) });
  },
);

api.get(
  "/control-tower/overview",
  authenticate,
  authorizeRoles(
    UserRole.SUPER_ADMIN,
    UserRole.COMPANY_ADMIN,
    UserRole.OPERATIONS_MANAGER,
    UserRole.ANALYST,
    UserRole.FIELD_EXECUTIVE,
    UserRole.VIEWER,
  ),
  authorizePermissions("dashboard:read"),
  async (_req, res) => {
    res.json({ overview: await getControlTowerSummary() });
  },
);

api.post(
  "/learning/outcomes",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ANALYST, UserRole.OPERATIONS_MANAGER),
  authorizePermissions("reports:read"),
  async (req, res) => {
    const feedback = await registerOptimizationOutcome(
      req.body as Parameters<typeof registerOptimizationOutcome>[0],
    );
    res.status(201).json({ feedback });
  },
);
