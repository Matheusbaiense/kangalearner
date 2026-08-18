import { describe, expect, it } from "vitest";
import { sentryIngestUrl } from "./sentryTunnel";

describe("sentryIngestUrl", () => {
  it("builds the default ingest host", () => {
    expect(sentryIngestUrl("1", "2")).toBe("https://o1.ingest.sentry.io/api/2/envelope/?hsts=0");
  });

  it("includes a two-letter region", () => {
    expect(sentryIngestUrl("450", "99", "us")).toBe(
      "https://o450.ingest.us.sentry.io/api/99/envelope/?hsts=0"
    );
  });

  it("rejects non-numeric org or project", () => {
    expect(sentryIngestUrl("abc", "1")).toBeNull();
    expect(sentryIngestUrl("1", "x")).toBeNull();
    expect(sentryIngestUrl("1", "2", "usa")).toBeNull();
  });
});
