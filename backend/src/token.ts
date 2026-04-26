import crypto from "node:crypto";
import { users } from "./data.js";
import type { User } from "./types.js";

const secret = process.env.BACKEND_AUTH_SECRET ?? "dev-secret-change-me";

export function signAccessToken(userId: string): string {
  const payload = Buffer.from(JSON.stringify({ userId }), "utf-8").toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyAccessToken(token: string): User | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  if (expected !== signature) {
    return null;
  }

  const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as {
    userId?: string;
  };

  if (!decoded.userId) {
    return null;
  }

  return users.find((user) => user.id === decoded.userId) ?? null;
}
