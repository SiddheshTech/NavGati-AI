import { createClient, type RedisClientType } from "redis";
import { config } from "./config.js";

let redisClient: RedisClientType | null = null;

export function getRedis(): RedisClientType | null {
  if (!config.redisUrl) {
    return null;
  }
  if (!redisClient) {
    redisClient = createClient({ url: config.redisUrl });
  }
  return redisClient;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (!redis) {
    return null;
  }
  if (!redis.isOpen) {
    await redis.connect();
  }
  const raw = await redis.get(key);
  if (!raw || typeof raw !== "string") {
    return null;
  }
  return JSON.parse(raw) as T;
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds = 20): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    return;
  }
  if (!redis.isOpen) {
    await redis.connect();
  }
  await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
}
