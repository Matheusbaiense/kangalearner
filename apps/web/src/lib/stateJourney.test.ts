import { describe, expect, it } from "vitest";
import { getStateProfile } from "@kanga/core";
import { getStateGls, listStateGls } from "./stateJourney";
import { getStateResources } from "./stateResources";

const LANGS = ["en", "pt", "es"] as const;

/**
 * The /journey, /supervisor and /overseas-licence guides render from this data.
 * These tests pin coverage (8/8 jurisdictions), internal plausibility, and that
 * localized notes exist in all three languages — a missing translation would
 * silently render English.
 */
describe("state GLS data", () => {
  it("covers every jurisdiction the profiles know", () => {
    const all = listStateGls();
    expect(all).toHaveLength(8);
    for (const gls of all) {
      expect(getStateProfile(gls.code).code).toBe(gls.code);
    }
  });

  it("falls back to WA for unknown codes", () => {
    expect(getStateGls("XX").code).toBe("WA");
    expect(getStateGls("NSW").code).toBe("NSW");
  });

  for (const gls of listStateGls()) {
    describe(gls.code, () => {
      it("has plausible ages and stage lengths", () => {
        expect(gls.learner.minAge).toBeGreaterThanOrEqual(15);
        expect(gls.learner.minAge).toBeLessThan(18);
        expect(gls.p1.minAge).toBeGreaterThanOrEqual(gls.learner.minAge);
        expect(gls.p1.months).toBeGreaterThan(0);
        if (gls.p2) expect(gls.p2.months).toBeGreaterThan(0);
      });

      it("links only to official https pages", () => {
        for (const url of [gls.glsUrl, gls.overseas.recognisedUrl, gls.overseas.transferUrl]) {
          expect(url).toMatch(/^https:\/\//);
          expect(url).toMatch(/\.gov\.au|austroads\.gov\.au/);
        }
      });

      it("localizes every note in all three languages", () => {
        const blocks = [
          gls.learner.tenureNote,
          gls.p1.note,
          gls.supervisor,
          gls.overseas.tempVisaRule,
          gls.overseas.prDeadline
        ];
        for (const block of blocks) {
          if (!block) continue;
          for (const lang of LANGS) {
            expect(block[lang]?.length ?? 0).toBeGreaterThan(10);
          }
        }
      });

      it("agrees with the resources layer on the hazard-test stage", () => {
        const res = getStateResources(gls.code);
        // Single-P states in this dataset are exactly WA and NT.
        expect(gls.p2 === null).toBe(gls.code === "WA" || gls.code === "NT");
        // If resources says there is no learner-stage hazard test, the journey
        // must not invent one (it renders the hazard step from res, so this is
        // a data-shape guard for the card links).
        if (!res.hazardTestName) expect(res.links.hazard).toBeUndefined();
      });
    });
  }
});
