import { describe, expect, it } from "vitest";
import { SENTRY_SERVER_TEST_MESSAGE, throwSentryServerTestError } from "./sentryServerTest";

describe("throwSentryServerTestError", () => {
  it("throws the stable Sentry probe message", () => {
    expect(() => throwSentryServerTestError()).toThrow(SENTRY_SERVER_TEST_MESSAGE);
  });
});
