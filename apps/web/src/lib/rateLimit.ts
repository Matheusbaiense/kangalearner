const map = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (map.get(key) ?? []).filter((t) => t > now - windowMs);
  if (hits.length >= limit) return false;
  hits.push(now);
  map.set(key, hits);
  return true;
}
