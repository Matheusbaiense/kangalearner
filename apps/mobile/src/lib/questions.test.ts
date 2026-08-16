import { describe, expect, it } from "vitest";
import { WA_PASS_MIN_CORRECT, WA_TOTAL_QUESTIONS } from "@kanga/core";
import { QUESTIONS } from "@kanga/core/data/questions";
import {
  buildMockQuestionIds,
  categoriesForPool,
  correctLetter,
  pct,
  questionsForState,
  scoreAnswers
} from "./questions";

describe("questionsForState", () => {
  it("excludes motorcycle-only questions (mobile serves the car pool)", () => {
    expect(questionsForState("WA").every((q) => q.licenceType !== "motorcycle")).toBe(true);
  });
});

describe("categoriesForPool", () => {
  it("only returns categories with at least one question in the pool", () => {
    const pool = questionsForState("WA");
    const present = new Set(pool.map((q) => q.cat));
    const cats = categoriesForPool(pool);
    expect(cats.length).toBeGreaterThan(0);
    expect(cats.every((c) => present.has(c.key))).toBe(true);
  });
});

describe("scoreAnswers", () => {
  it("counts only correct answers", () => {
    const sample = QUESTIONS.slice(0, 5);
    const qids = sample.map((q) => q.id);
    const answers: Record<string, string> = {};
    sample.forEach((q, idx) => {
      // Answer the first three correctly, the rest wrong.
      answers[q.id] = idx < 3 ? correctLetter(q) : "__wrong__";
    });
    expect(scoreAnswers(qids, answers)).toBe(3);
  });

  it("ignores unknown question ids", () => {
    expect(scoreAnswers(["does-not-exist"], { "does-not-exist": "A" })).toBe(0);
  });

  it("reaches the WA pass threshold when 24/30 are correct", () => {
    const sample = QUESTIONS.slice(0, WA_TOTAL_QUESTIONS);
    expect(sample.length).toBe(WA_TOTAL_QUESTIONS);
    const qids = sample.map((q) => q.id);
    const answers: Record<string, string> = {};
    sample.forEach((q, idx) => {
      answers[q.id] = idx < WA_PASS_MIN_CORRECT ? correctLetter(q) : "__wrong__";
    });
    const score = scoreAnswers(qids, answers);
    expect(score).toBe(WA_PASS_MIN_CORRECT);
    expect(score / WA_TOTAL_QUESTIONS).toBeGreaterThanOrEqual(0.8);
  });
});

describe("buildMockQuestionIds (mock of 30)", () => {
  it("returns 30 unique question ids for WA by default", () => {
    const ids = buildMockQuestionIds("WA");
    expect(ids.length).toBe(WA_TOTAL_QUESTIONS);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only selects questions available for the requested state", () => {
    const allowed = new Set<string>(questionsForState("WA").map((q) => q.id));
    for (const id of buildMockQuestionIds("WA")) {
      expect(allowed.has(id)).toBe(true);
    }
  });

  it("caps the count at the number of available questions", () => {
    const available = questionsForState("WA").length;
    const ids = buildMockQuestionIds("WA", available + 50);
    expect(ids.length).toBe(available);
  });
});

describe("pct", () => {
  it("rounds the percentage", () => {
    expect(pct(24, 30)).toBe(80);
    expect(pct(1, 3)).toBe(33);
  });

  it("returns 0 when there are no questions", () => {
    expect(pct(0, 0)).toBe(0);
  });
});
