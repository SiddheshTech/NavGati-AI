import { Pool } from "pg";
import { config } from "./config.js";

let pool: Pool | null = null;

export function getDb(): Pool {
  if (!config.databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }
  if (!pool) {
    pool = new Pool({ connectionString: config.databaseUrl });
  }
  return pool;
}

export async function initDb(): Promise<void> {
  const db = getDb();
  await db.query(`
    CREATE TABLE IF NOT EXISTS ingestion_signals (
      id TEXT PRIMARY KEY,
      shipment_id TEXT NOT NULL,
      source TEXT NOT NULL,
      region TEXT NOT NULL,
      severity DOUBLE PRECISION NOT NULL,
      confidence DOUBLE PRECISION NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS action_alerts (
      id TEXT PRIMARY KEY,
      channel TEXT NOT NULL,
      shipment_id TEXT NOT NULL,
      priority TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS reroute_actions (
      id TEXT PRIMARY KEY,
      shipment_id TEXT NOT NULL,
      mode TEXT NOT NULL,
      route_id TEXT NOT NULL,
      executed_by TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS learning_outcomes (
      feedback_id TEXT PRIMARY KEY,
      shipment_id TEXT NOT NULL,
      route_id TEXT NOT NULL,
      actual_delay_hours DOUBLE PRECISION NOT NULL,
      on_time BOOLEAN NOT NULL,
      notes TEXT,
      learning_status TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}
