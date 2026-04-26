import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest, Permission, UserRole } from "../types.js";

export function authorizeRoles(...roles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden for current role" });
      return;
    }
    next();
  };
}

export function authorizePermissions(...permissions: Permission[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const hasAllPermissions = permissions.every((permission) => req.user?.permissions.includes(permission));
    if (!hasAllPermissions) {
      res.status(403).json({ message: "Missing required permissions" });
      return;
    }
    next();
  };
}
