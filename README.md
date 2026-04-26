<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a71c5b14-7456-4310-abdf-89fc6718aa7a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Backend (RBAC API)

This project now includes an Express backend with role-based access control for:

- `SUPER_ADMIN`
- `COMPANY_ADMIN`
- `OPERATIONS_MANAGER`
- `ANALYST`
- `FIELD_EXECUTIVE`
- `VIEWER`

### Start backend

1. Install dependencies: `npm install`
2. Copy `.env.example` values into your local `.env.local` / shell environment.
3. Start PostgreSQL and Redis locally (or cloud instances).
4. Run backend server: `npm run backend:dev`
3. API base URL: `http://localhost:8080/api`

### Demo login

Call `POST /api/auth/login` with one of these emails:

- `superadmin@predictroute.ai`
- `admin@acmelogistics.com`
- `ops@acmelogistics.com`
- `analyst@acmelogistics.com`
- `field@acmelogistics.com`
- `viewer@client.com`

Use returned `accessToken` as `Authorization: Bearer <token>`.

### PredictRoute architecture APIs

These endpoints map to your hackathon architecture:

- **Data ingestion layer**
  - `POST /api/ingestion/signals` (weather, traffic, port, warehouse, news NLP, social NLP)
  - `GET /api/ingestion/signals`
  - `POST /api/ingestion/external/:shipmentId` (OpenWeather + Google Maps Traffic + News feed connectors)
- **Intelligence layer**
  - `GET /api/intelligence/risk/:shipmentId` (delay probability, bottleneck severity, confidence)
- **Optimization engine**
  - `GET /api/optimization/recommendations/:shipmentId` (Dijkstra, A*, RL policy options)
- **Action layer**
  - `POST /api/action/reroute/:shipmentId/execute` (manual/auto mode)
  - `POST /api/action/alerts` (dashboard/WhatsApp/email/SMS channels)
  - `GET /api/action/alerts`
- **Control tower dashboard**
  - `GET /api/control-tower/overview`
- **Self-learning feedback loop**
  - `POST /api/learning/outcomes`

### Live frontend control tower

- Visit `http://localhost:3000/control-tower`
- Login with a demo email
- Dashboard polls `/api/control-tower/overview` every 5 seconds
- Trigger:
  - `Ingest External Feeds` -> `POST /api/ingestion/external/s-1002`
  - `Execute Reroute` -> `POST /api/action/reroute/s-1002/execute`
