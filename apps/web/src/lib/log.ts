/**
 * Minimal structured logger for server-side code (Route Handlers, server
 * components). Emits one JSON line per event so logs are greppable/parseable
 * in Vercel and ready to forward to Sentry/Logtail later.
 *
 * NEVER pass raw secrets, tokens or full PII. Use `mask()` for identifiers
 * (e.g. Stripe customer ids) that are useful for correlation but sensitive.
 */
type Level = "info" | "warn" | "error";

export function mask(value?: string | null): string | undefined {
  if (!value) return undefined;
  return value.length <= 8 ? "***" : `${value.slice(0, 4)}…${value.slice(-4)}`;
}

export function log(level: Level, event: string, ctx: Record<string, unknown> = {}): void {
  const line = JSON.stringify({ ts: new Date().toISOString(), level, event, ...ctx });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}
