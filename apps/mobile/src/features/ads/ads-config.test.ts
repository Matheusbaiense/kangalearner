import { describe, expect, it } from "vitest";
import { resolveGoogleAdUnit, selectDirectSponsorCampaign } from "./ads-config";

describe("ads-config", () => {
  it("shows development-only direct sponsor campaigns only in development", () => {
    const now = new Date("2026-06-15T00:00:00.000Z");

    expect(
      selectDirectSponsorCampaign("home_top", now, {
        includeDevelopmentCampaigns: true
      })?.id
    ).toBe("dev-wa-local-sponsor-preview");

    expect(
      selectDirectSponsorCampaign("home_top", now, {
        includeDevelopmentCampaigns: false
      })
    ).toBeNull();
  });

  it("prefers GAM unit IDs before AdMob fallback unit IDs", () => {
    expect(
      resolveGoogleAdUnit("practice_inline", {
        env: {
          EXPO_PUBLIC_GAM_PRACTICE_INLINE_ID: "/123/practice",
          EXPO_PUBLIC_ADMOB_PRACTICE_INLINE_BANNER_ID: "ca-app-pub-123/456"
        }
      })
    ).toEqual({ provider: "gam", unitId: "/123/practice" });
  });

  it("uses AdMob when a slot has no GAM unit ID", () => {
    expect(
      resolveGoogleAdUnit("mock_result", {
        env: {
          EXPO_PUBLIC_ADMOB_MOCK_RESULT_BANNER_ID: "ca-app-pub-123/789"
        }
      })
    ).toEqual({ provider: "admob", unitId: "ca-app-pub-123/789" });
  });
});
