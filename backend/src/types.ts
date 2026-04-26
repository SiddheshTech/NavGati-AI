import type { Request } from "express";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  COMPANY_ADMIN = "COMPANY_ADMIN",
  OPERATIONS_MANAGER = "OPERATIONS_MANAGER",
  ANALYST = "ANALYST",
  FIELD_EXECUTIVE = "FIELD_EXECUTIVE",
  VIEWER = "VIEWER",
}

export type Permission =
  | "platform:manage"
  | "company:manage"
  | "users:manage"
  | "subscriptions:manage"
  | "security:manage"
  | "settings:manage"
  | "integrations:manage"
  | "workflow:manage"
  | "reports:read"
  | "sla:monitor"
  | "shipments:read"
  | "shipments:update"
  | "alerts:handle"
  | "routes:approve"
  | "warehouse:manage"
  | "fleet:optimize"
  | "risk:analyze"
  | "kpi:read"
  | "insights:read"
  | "deliveries:track"
  | "incidents:report"
  | "dashboard:read";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  permissions: Permission[];
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}
