/** Stable message so the Sentry dashboard can be grepped after GET /api/sentry-test. */
export const SENTRY_SERVER_TEST_MESSAGE = "Sentry server test";

/** Temporary 0.5 probe. Remove the route after a server event is visible in Sentry. */
export function throwSentryServerTestError(): never {
  throw new Error(SENTRY_SERVER_TEST_MESSAGE);
}
