/**
 * Minimal structured logger for server-side code (Route Handlers, server
 * components). Emits one JSON line per event so logs are greppable/parseable
 * in Vercel and ready to forward to Sentry/Logtail later.
 *
 * NEVER pass raw secrets, tokens or full PII. Use `mask()` for identifiers
 * (e.g. Stripe customer ids) that are useful for correlation but sensitive.
 */
import { requestIdFrom } from "./requestId";

type Level = "info" | "warn" | "error";

const SENSITIVE_KEY = /^(password|passwd|token|authorization|cookie|secret|rawBody|raw_body)$/i;

export function mask(value?: string | null): string | undefined {
  if (!value) return undefined;
  return value.length <= 8 ? "***" : `${value.slice(0, 4)}…${value.slice(-4)}`;
}

function sanitize(ctx: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(ctx)) {
    out[key] = SENSITIVE_KEY.test(key) ? "[redacted]" : value;
  }
  return out;
}

export function logContext(
  request: { headers: Headers },
  extra: { userId?: string | null; action?: string } = {}
): { requestId: string; userId?: string; action?: string } {
  return {
    requestId: requestIdFrom(request),
    ...(extra.userId ? { userId: mask(extra.userId) } : {}),
    ...(extra.action ? { action: extra.action } : {})
  };
}

export function log(level: Level, event: string, ctx: Record<string, unknown> = {}): void {
  const line = JSON.stringify({ ts: new Date().toISOString(), level, event, ...sanitize(ctx) });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}
