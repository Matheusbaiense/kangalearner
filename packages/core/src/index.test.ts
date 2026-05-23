import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  WA_PASS_MIN_CORRECT,
  WA_PASS_THRESHOLD,
  WA_TOTAL_QUESTIONS,
  filterByState,
  normalizeAuState,
  validateQuestionsDataset
} from "./index";
import { QUESTIONS } from "./data/questions";

describe("questions dataset integrity", () => {
  it("has at least 50 questions", () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(50);
  });

  it("passes schema validation", () => {
    const issues = validateQuestionsDataset({ QUESTIONS, CATEGORIES });
    expect(issues).toEqual([]);
  });

  it("keeps WA pass constants aligned", () => {
    expect(WA_TOTAL_QUESTIONS).toBe(30);
    expect(WA_PASS_THRESHOLD).toBe(0.8);
    expect(WA_PASS_MIN_CORRECT).toBe(Math.ceil(WA_TOTAL_QUESTIONS * WA_PASS_THRESHOLD));
  });
});

describe("filterByState", () => {
  it("returns questions matching the state", () => {
    const qs = [
      { id: "1", states: ["WA"] },
      { id: "2", states: ["NSW"] },
      { id: "3", states: ["WA", "NSW"] }
    ];
    expect(filterByState(qs, "WA").map((q) => q.id)).toEqual(["1", "3"]);
  });
});

describe("normalizeAuState", () => {
  it("accepts valid AU state codes", () => {
    expect(normalizeAuState("WA")).toBe("WA");
  });

  it("rejects invalid codes", () => {
    expect(normalizeAuState("XX")).toBeNull();
    expect(normalizeAuState(null)).toBeNull();
  });
});
