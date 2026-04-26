import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../token.js";
import type { AuthenticatedRequest } from "../types.js";

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing Bearer token" });
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const user = verifyAccessToken(token);

  if (!user) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  (req as AuthenticatedRequest).user = user;
  next();
}
