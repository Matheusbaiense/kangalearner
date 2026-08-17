import { describe, expect, it } from "vitest";
import { getStateProfile } from "@kanga/core";
import { STATE_TEST_INFO } from "./stateTestInfo";

/**
 * The /learner-test SEO pages take their exam numbers from STATE_PROFILES (core),
 * the same table behind the Learn and mock-test copy. What stays here is editorial
 * prose, which can still drift — these tests pin it to the shared facts.
 */
describe("stateTestInfo agrees with the core state profiles", () => {
  for (const info of STATE_TEST_INFO) {
    it(`${info.code}: names the same jurisdiction`, () => {
      const profile = getStateProfile(info.code);
      expect(profile.code).toBe(info.code);
      expect(info.stateName).toBe(profile.name);
    });

    it(`${info.code}: prose quotes the real question count and no bigger one`, () => {
      const profile = getStateProfile(info.code);
      const prose = [info.descriptionTail, ...info.faq.flatMap((f) => [f.q, f.a])].join(" ");
      const quoted = [...prose.matchAll(/(\d+)\s+(?:multiple choice\s+)?questions/g)].map((m) =>
        Number(m[1])
      );
      // Section counts are legitimate ("8 give way questions and 42 multiple choice"),
      // so the rule is: the real total must appear, and nothing may exceed it.
      expect(quoted).toContain(profile.totalQuestions);
      expect(Math.max(...quoted)).toBe(profile.totalQuestions);
    });
  }
});
