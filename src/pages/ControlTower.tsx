import { useEffect, useMemo, useState } from "react";
import { fetchOverview, login, triggerExternalIngestion, executeReroute } from "../lib/api";

const demoEmails = [
  "superadmin@predictroute.ai",
  "admin@acmelogistics.com",
  "ops@acmelogistics.com",
  "analyst@acmelogistics.com",
  "field@acmelogistics.com",
  "viewer@client.com",
];

export default function ControlTower() {
  const [email, setEmail] = useState(demoEmails[0]);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<{ name: string; role: string } | null>(null);
  const [overview, setOverview] = useState<Awaited<ReturnType<typeof fetchOverview>>["overview"] | null>(null);
  const [status, setStatus] = useState("Disconnected");

  const canRunActions = useMemo(
    () => profile?.role === "SUPER_ADMIN" || profile?.role === "OPERATIONS_MANAGER",
    [profile?.role],
  );

  async function doLogin() {
    try {
      const result = await login(email);
      setToken(result.accessToken);
      setProfile(result.user);
      setStatus(`Connected as ${result.user.role}`);
    } catch (_error) {
      setStatus("Login failed");
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchOverview(token);
        if (!cancelled) {
          setOverview(data.overview);
          setStatus(`Live update: ${new Date().toLocaleTimeString()}`);
        }
      } catch (_error) {
        if (!cancelled) {
          setStatus("Unable to fetch control tower");
        }
      }
    };

    load();
    const id = window.setInterval(load, 5000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [token]);

  async function handleIngest() {
    if (!token) return;
    await triggerExternalIngestion(token, "s-1002");
  }

  async function handleReroute() {
    if (!token) return;
    await executeReroute(token, "s-1002", "MANUAL");
  }

  return (
    <div className="relative z-10 pt-36 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black font-display mb-4">Control Tower Live</h1>
      <p className="text-gray-400 mb-8">Real-time disruption intelligence, optimization, and action execution.</p>

      <div className="glass rounded-3xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1">
            <label className="text-sm text-gray-400">Demo User</label>
            <select
              className="w-full mt-1 rounded-xl bg-slate-900 border border-white/10 p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              {demoEmails.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button onClick={doLogin} className="btn-primary px-6 py-3">
            Connect
          </button>
          <div className="text-sm text-gray-400">{status}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          ["Active Shipments", overview?.activeShipments ?? 0],
          ["Delayed", overview?.delayedShipments ?? 0],
          ["High Risk", overview?.highRiskShipments ?? 0],
          ["Open Alerts", overview?.openAlerts ?? 0],
        ].map(([label, value]) => (
          <div key={label} className="glass rounded-2xl p-5">
            <div className="text-gray-400 text-sm">{label}</div>
            <div className="text-3xl font-bold mt-2">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Disruption Signals</h2>
            {canRunActions && (
              <button onClick={handleIngest} className="btn-primary px-4 py-2 text-sm">
                Ingest External Feeds
              </button>
            )}
          </div>
          <div className="space-y-3">
            {(overview?.recentSignals ?? []).map((signal) => (
              <div key={signal.id} className="rounded-xl border border-white/10 p-3">
                <div className="font-semibold">{signal.source}</div>
                <div className="text-sm text-gray-400">{signal.message}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Shipment {signal.shipmentId} | Severity {(signal.severity * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Reroute Actions</h2>
            {canRunActions && (
              <button onClick={handleReroute} className="btn-primary px-4 py-2 text-sm">
                Execute Reroute
              </button>
            )}
          </div>
          <div className="space-y-3">
            {(overview?.lastActions ?? []).map((action) => (
              <div key={action.id} className="rounded-xl border border-white/10 p-3">
                <div className="font-semibold">{action.routeId}</div>
                <div className="text-sm text-gray-400">
                  Shipment {action.shipmentId} | Mode {action.mode}
                </div>
                <div className="text-xs text-gray-500 mt-1">Executed by {action.executedBy}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
