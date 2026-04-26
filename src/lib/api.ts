const BASE_URL = (import.meta.env.VITE_BACKEND_URL as string | undefined) ?? "http://localhost:8080/api";

export interface ControlTowerOverview {
  activeShipments: number;
  delayedShipments: number;
  highRiskShipments: number;
  openAlerts: number;
  recentSignals: Array<{
    id: string;
    shipmentId: string;
    source: string;
    severity: number;
    confidence: number;
    message: string;
    timestamp: string;
  }>;
  lastActions: Array<{
    id: string;
    shipmentId: string;
    mode: "AUTO" | "MANUAL";
    routeId: string;
    executedBy: string;
    timestamp: string;
  }>;
}

export async function login(email: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return (await response.json()) as { accessToken: string; user: { name: string; role: string } };
}

async function authedFetch<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function fetchOverview(token: string) {
  return authedFetch<{ overview: ControlTowerOverview }>("/control-tower/overview", token);
}

export async function triggerExternalIngestion(token: string, shipmentId: string) {
  return authedFetch(`/ingestion/external/${shipmentId}`, token, { method: "POST" });
}

export async function executeReroute(token: string, shipmentId: string, mode: "AUTO" | "MANUAL") {
  return authedFetch(`/action/reroute/${shipmentId}/execute`, token, {
    method: "POST",
    body: JSON.stringify({ mode }),
  });
}
