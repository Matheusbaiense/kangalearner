// WARNING: This in-memory Map-based rate limiter does NOT work correctly in
// serverless/edge environments (Vercel, Netlify Functions, etc.) for two reasons:
//
//   1. Cold starts — the Map is reset on every new function instance, so the
//      counter resets to zero and previously-blocked IPs can bypass the limit.
//   2. No shared state — concurrent instances each maintain their own Map, so
//      a client sending N parallel requests across M instances is only charged
//      N/M hits per instance instead of N.
//
// This implementation is safe for local development and single-process Node
// servers, but MUST be replaced before going to production under serverless.
//
// TODO: Migrate to a Redis-backed rate limiter that survives cold starts and
// is shared across all instances. Recommended options:
//   - @upstash/ratelimit + @upstash/redis (Upstash free tier, no infra to manage)
//     https://github.com/upstash/ratelimit
//   - ioredis + a sliding-window script (if a Redis instance is already available)
// Required env vars for Upstash: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN

const map = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (map.get(key) ?? []).filter((t) => t > now - windowMs);
  if (hits.length >= limit) return false;
  hits.push(now);
  map.set(key, hits);
  return true;
}
