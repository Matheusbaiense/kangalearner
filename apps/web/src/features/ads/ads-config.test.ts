import { describe, expect, it } from "vitest";
import { resolveAdSenseUnit, selectDirectSponsorCampaign } from "./ads-config";

describe("ads-config", () => {
  it("shows development-only direct sponsor campaigns only in development", () => {
    const now = new Date("2026-06-15T00:00:00.000Z");

    expect(
      selectDirectSponsorCampaign("mock_result", now, {
        includeDevelopmentCampaigns: true
      })?.id
    ).toBe("dev-car-insurance-preview");

    expect(
      selectDirectSponsorCampaign("mock_result", now, {
        includeDevelopmentCampaigns: false
      })
    ).toBeNull();
  });

  it("resolves an AdSense unit when client id and slot id are both configured", () => {
    expect(
      resolveAdSenseUnit("practice_inline", {
        isDevelopment: false,
        env: {
          NEXT_PUBLIC_ADSENSE_CLIENT_ID: "ca-pub-123",
          NEXT_PUBLIC_ADSENSE_PRACTICE_INLINE_SLOT_ID: "456"
        }
      })
    ).toEqual({ clientId: "ca-pub-123", slotId: "456" });
  });

  it("returns null when either the client id or the slot id is missing", () => {
    expect(
      resolveAdSenseUnit("practice_inline", {
        isDevelopment: false,
        env: { NEXT_PUBLIC_ADSENSE_CLIENT_ID: "ca-pub-123" }
      })
    ).toBeNull();
    expect(
      resolveAdSenseUnit("practice_inline", {
        isDevelopment: false,
        env: { NEXT_PUBLIC_ADSENSE_PRACTICE_INLINE_SLOT_ID: "456" }
      })
    ).toBeNull();
  });

  it("never resolves a unit in a development runtime, even with valid ids", () => {
    expect(
      resolveAdSenseUnit("practice_inline", {
        isDevelopment: true,
        env: {
          NEXT_PUBLIC_ADSENSE_CLIENT_ID: "ca-pub-123",
          NEXT_PUBLIC_ADSENSE_PRACTICE_INLINE_SLOT_ID: "456"
        }
      })
    ).toBeNull();
  });
});
