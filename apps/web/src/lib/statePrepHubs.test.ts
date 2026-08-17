import { describe, expect, it } from "vitest";
import { getStateProfile } from "@kanga/core";
import { buildHazardHub, buildPracticalHub, listStatePrep } from "./statePrepHubs";
import { getStateResources } from "./stateResources";

const LANGS = ["en", "pt", "es"] as const;

/**
 * The /hpt and /pda prep hubs render from this data. These tests pin coverage
 * (8/8 jurisdictions), agreement with the resources layer (which decides where
 * the hazard step shows up in journeys), official links, and full translations.
 */
describe("state prep hub data", () => {
  it("covers every jurisdiction", () => {
    expect(listStatePrep()).toHaveLength(8);
  });

  for (const prep of listStatePrep()) {
    describe(prep.code, () => {
      it("agrees with the resources layer on whether a hazard test exists", () => {
        const res = getStateResources(prep.code);
        expect(prep.hazard !== null).toBe(res.hazardTestName !== null);
      });

      it("links only to official https pages", () => {
        const urls = [prep.practical.bookUrl];
        if (prep.hazard) urls.push(prep.hazard.bookUrl);
        for (const url of urls) {
          expect(url).toMatch(/^https:\/\//);
          expect(url).toMatch(/\.gov\.au/);
        }
      });

      it("localizes every text block in all three languages", () => {
        const blocks = [
          prep.practical.format,
          prep.practical.bring,
          ...(prep.practical.routes ? [prep.practical.routes] : []),
          ...(prep.hazard ? [prep.hazard.when, prep.hazard.format] : [])
        ];
        for (const block of blocks) {
          for (const lang of LANGS) {
            expect(block[lang]?.length ?? 0).toBeGreaterThan(20);
          }
        }
      });

      it("builds both hubs without falling back to another state", () => {
        const profile = getStateProfile(prep.code);
        const hazard = buildHazardHub(profile);
        const practical = buildPracticalHub(profile);
        for (const lang of LANGS) {
          expect(hazard.title[lang].length).toBeGreaterThan(10);
          expect(practical.title[lang]).toContain(prep.code);
        }
        // Dual-route states surface the alternative; single-route states don't.
        const hasRoutesSection = practical.sections.some(
          (s) => s.heading.en === "Your route options"
        );
        expect(hasRoutesSection).toBe(prep.practical.routes !== null);
      });
    });
  }

  it("NT hazard hub says there is no test instead of showing another state's", () => {
    const hub = buildHazardHub(getStateProfile("NT"));
    expect(hub.title.en).toContain("No hazard perception test");
  });
});
