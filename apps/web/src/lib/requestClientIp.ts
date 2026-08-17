import type { NextRequest } from "next/server";

/**
 * Best-effort client IP for rate limiting behind Vercel / reverse proxies.
 * Prefers platform-set x-real-ip; falls back to first x-forwarded-for hop.
 * On Vercel those headers are set by the edge, not the browser (SEC-14).
 * Do not change this while the app stays only on Vercel.
 */
export function getClientIp(request: NextRequest): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return "anon";
}
