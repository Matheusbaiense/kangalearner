// Rate limiter with automatic fallback:
//   - Production (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN set):
//       uses @upstash/ratelimit sliding-window — shared across all serverless
//       instances, survives cold starts, correct under parallel traffic.
//   - Development / no env vars:
//       uses in-memory Map — correct for single-process local servers but NOT
//       suitable for production serverless deployments.
//
// Production without Upstash: FAIL CLOSED (deny) to prevent bypass across instances.

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const useUpstash = Boolean(upstashUrl && upstashToken);
const isProduction = process.env.NODE_ENV === "production";

const limiterCache = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowMs: number): Ratelimit {
  const cacheKey = `${limit}:${windowMs}`;
  let limiter = limiterCache.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url: upstashUrl!, token: upstashToken! }),
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      analytics: false
    });
    limiterCache.set(cacheKey, limiter);
  }
  return limiter;
}

const memMap = new Map<string, number[]>();

function memRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (memMap.get(key) ?? []).filter((t) => t > now - windowMs);
  if (hits.length >= limit) return false;
  hits.push(now);
  memMap.set(key, hits);
  return true;
}

export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  if (!useUpstash) {
    if (isProduction) {
      console.error("[rateLimit] Upstash not configured in production — denying request");
      return false;
    }
    return memRateLimit(key, limit, windowMs);
  }

  try {
    const { success } = await getUpstashLimiter(limit, windowMs).limit(key);
    return success;
  } catch (err) {
    console.error("[rateLimit] Upstash error —", err instanceof Error ? err.message : "unknown");
    if (isProduction) return false;
    return memRateLimit(key, limit, windowMs);
  }
}
