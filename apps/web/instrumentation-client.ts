import * as Sentry from "@sentry/nextjs";

// Client-side error tracking. Inert until NEXT_PUBLIC_SENTRY_DSN is set.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development"
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
