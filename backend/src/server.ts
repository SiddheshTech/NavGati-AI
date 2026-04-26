import dotenv from "dotenv";
import express from "express";
import { config } from "./config.js";
import { initDb } from "./db.js";
import { api } from "./routes.js";

dotenv.config();

const app = express();
const port = config.backendPort;

app.use(express.json());
app.use("/api", api);

async function start() {
  await initDb();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${port}`);
  });
}

start().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start backend", error);
  process.exit(1);
});
