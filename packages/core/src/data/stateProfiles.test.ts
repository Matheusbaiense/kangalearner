import { describe, expect, it } from "vitest";
import { AU_STATE_OPTIONS } from "../index";
import { STATE_PROFILES, applyStateTokens, getStateProfile, passPercent } from "./stateProfiles";

describe("state profiles", () => {
  it("covers every selectable jurisdiction with a plausible test format", () => {
    expect(STATE_PROFILES).toHaveLength(AU_STATE_OPTIONS.length);
    for (const p of STATE_PROFILES) {
      expect(p.minCorrect).toBeGreaterThan(0);
      expect(p.minCorrect).toBeLessThanOrEqual(p.totalQuestions);
      expect(p.handbookUrl).toMatch(/^https:\/\//);
      expect(p.authority.length).toBeGreaterThan(0);
    }
  });

  it("falls back to WA for unknown or missing codes", () => {
    expect(getStateProfile(null).code).toBe("WA");
    expect(getStateProfile("XX").code).toBe("WA");
    expect(getStateProfile("NSW").code).toBe("NSW");
  });

  it("resolves tokens against the selected jurisdiction", () => {
    const nsw = getStateProfile("NSW");
    expect(applyStateTokens("Study the {handbook} in {state}.", nsw)).toBe(
      "Study the Road User Handbook in New South Wales."
    );
    expect(applyStateTokens("{minCorrect} of {questions}", nsw)).toBe("41 of 45");
    expect(passPercent(getStateProfile("WA"))).toBe(80);
  });

  it("drops the gap left by an empty caller-supplied token", () => {
    const wa = getStateProfile("WA");
    expect(
      applyStateTokens("Pass mark is firm. {sectionNote} Good luck.", wa, { sectionNote: "" })
    ).toBe("Pass mark is firm. Good luck.");
  });

  it("leaves unknown tokens visible instead of silently blanking them", () => {
    expect(applyStateTokens("{nope}", getStateProfile("WA"))).toBe("{nope}");
  });
});
