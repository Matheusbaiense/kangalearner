import { describe, expect, it } from "vitest";
import { getStateProfile } from "@kanga/core";
import { STATE_TEST_INFO } from "./stateTestInfo";

const LANGS = ["en", "pt", "es"] as const;

/**
 * Two tables state the same exam facts: STATE_TEST_INFO drives the /learner-test
 * SEO pages, STATE_PROFILES (core) drives the Learn, mock-test and FAQ copy.
 * They must not drift — a visitor comparing the two pages would see one of them
 * lying — and the trilingual FAQ prose must not quote different numbers either.
 */
describe("stateTestInfo agrees with the core state profiles", () => {
  for (const info of STATE_TEST_INFO) {
    it(`${info.code}: names the same jurisdiction and question count`, () => {
      const profile = getStateProfile(info.code);
      expect(profile.code).toBe(info.code);
      expect(info.stateName).toBe(profile.name);
      expect(info.examQuestions).toBe(profile.totalQuestions);
      expect(info.examPassMark).not.toBeNull();
    });

    it(`${info.code}: FAQ prose quotes the real question count and no bigger one`, () => {
      const profile = getStateProfile(info.code);
      for (const lang of LANGS) {
        const prose = [
          info.descriptionTail,
          ...info.faq.flatMap((f) => [f.q[lang], f.a[lang]])
        ].join(" ");
        const quoted = [
          ...prose.matchAll(/(\d+)\s+(?:multiple choice\s+)?(?:questions|questões|preguntas)/gi)
        ].map((m) => Number(m[1]));
        // Section counts are legitimate ("8 give way questions and 42 multiple
        // choice"), so: nothing quoted may exceed the real total.
        for (const n of quoted) {
          expect(n).toBeLessThanOrEqual(profile.totalQuestions);
        }
      }
    });

    it(`${info.code}: every FAQ entry is translated into all three languages`, () => {
      for (const f of info.faq) {
        for (const lang of LANGS) {
          expect(f.q[lang]?.length ?? 0).toBeGreaterThan(5);
          expect(f.a[lang]?.length ?? 0).toBeGreaterThan(10);
        }
      }
    });
  }
});
