import { rolePermissions } from "./rbac.js";
import { UserRole, type User } from "./types.js";

export const users: User[] = [
  {
    id: "u-super",
    name: "PredictRoute Super Admin",
    email: "superadmin@predictroute.ai",
    role: UserRole.SUPER_ADMIN,
    permissions: rolePermissions[UserRole.SUPER_ADMIN],
  },
  {
    id: "u-company",
    name: "Head of Supply Chain",
    email: "admin@acmelogistics.com",
    role: UserRole.COMPANY_ADMIN,
    companyId: "c-acme",
    permissions: rolePermissions[UserRole.COMPANY_ADMIN],
  },
  {
    id: "u-ops",
    name: "Logistics Manager",
    email: "ops@acmelogistics.com",
    role: UserRole.OPERATIONS_MANAGER,
    companyId: "c-acme",
    permissions: rolePermissions[UserRole.OPERATIONS_MANAGER],
  },
  {
    id: "u-analyst",
    name: "Supply Chain Analyst",
    email: "analyst@acmelogistics.com",
    role: UserRole.ANALYST,
    companyId: "c-acme",
    permissions: rolePermissions[UserRole.ANALYST],
  },
  {
    id: "u-field",
    name: "Fleet Supervisor",
    email: "field@acmelogistics.com",
    role: UserRole.FIELD_EXECUTIVE,
    companyId: "c-acme",
    permissions: rolePermissions[UserRole.FIELD_EXECUTIVE],
  },
  {
    id: "u-viewer",
    name: "Client Viewer",
    email: "viewer@client.com",
    role: UserRole.VIEWER,
    companyId: "c-acme",
    permissions: rolePermissions[UserRole.VIEWER],
  },
];

export const companies = [
  {
    id: "c-acme",
    name: "Acme Logistics",
    plan: "enterprise",
    slaStatus: "healthy",
  },
];

export const shipments = [
  {
    id: "s-1001",
    companyId: "c-acme",
    origin: "Mumbai",
    destination: "Pune",
    status: "In Transit",
    riskScore: 0.31,
    etaHours: 8,
  },
  {
    id: "s-1002",
    companyId: "c-acme",
    origin: "Delhi",
    destination: "Jaipur",
    status: "Delayed",
    riskScore: 0.84,
    etaHours: 20,
  },
];
