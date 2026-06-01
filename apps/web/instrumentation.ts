import * as Sentry from "@sentry/nextjs";

// Server/edge error tracking. Inert until SENTRY_DSN is set, so this is safe to
// ship before the Sentry project exists.
export function register(): void {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;
  if (process.env.NEXT_RUNTIME === "nodejs" || process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development"
    });
  }
}

// Captures errors thrown in nested React Server Components / route handlers.
export const onRequestError = Sentry.captureRequestError;
