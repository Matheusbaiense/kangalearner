import { describe, expect, it } from "vitest";
import {
  isValidAttemptCategory,
  isValidAttemptState,
  isValidQuestionId,
  normalizeAttemptSource
} from "./attemptValidation";

describe("attemptValidation", () => {
  it("accepts AU states", () => {
    expect(isValidAttemptState("WA")).toBe(true);
    expect(isValidAttemptState("XX")).toBe(false);
  });

  it("validates question ids", () => {
    expect(isValidQuestionId("wa-q-001")).toBe(true);
    expect(isValidQuestionId("../etc/passwd")).toBe(false);
  });

  it("whitelists sources", () => {
    expect(normalizeAttemptSource("practice")).toBe("practice");
    expect(normalizeAttemptSource("evil")).toBe("web");
  });

  it("allows null category", () => {
    expect(isValidAttemptCategory(null)).toBe(true);
    expect(isValidAttemptCategory("signs")).toBe(true);
  });
});
