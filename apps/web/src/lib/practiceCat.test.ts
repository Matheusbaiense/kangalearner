import { describe, expect, it } from "vitest";
import { parsePracticeCat, parsePracticeMode, practiceQueryHref } from "./practiceCat";

describe("parsePracticeMode", () => {
  it("accepts known modes", () => {
    expect(parsePracticeMode("wrong")).toBe("wrong");
    expect(parsePracticeMode("unanswered")).toBe("unanswered");
    expect(parsePracticeMode("saved")).toBe("saved");
  });

  it("falls back to all", () => {
    expect(parsePracticeMode(undefined)).toBe("all");
    expect(parsePracticeMode("sim")).toBe("all");
    expect(parsePracticeMode("evil")).toBe("all");
  });
});

describe("parsePracticeCat", () => {
  it("accepts real category keys including spaces", () => {
    expect(parsePracticeCat("Speed Limits")).toBe("Speed Limits");
    expect(parsePracticeCat(undefined, "Road Signs")).toBe("Road Signs");
  });

  it("prefers cat over category", () => {
    expect(parsePracticeCat("Speed Limits", "Road Signs")).toBe("Speed Limits");
  });

  it("rejects unknown keys", () => {
    expect(parsePracticeCat("not-a-topic")).toBe("all");
    expect(parsePracticeCat("<script>")).toBe("all");
    expect(parsePracticeCat(undefined)).toBe("all");
  });
});

describe("practiceQueryHref", () => {
  it("omits default all/all", () => {
    expect(practiceQueryHref("all", "all")).toBe("/practice");
  });

  it("keeps both params when set", () => {
    expect(practiceQueryHref("wrong", "Speed Limits")).toBe(
      "/practice?mode=wrong&cat=Speed+Limits"
    );
  });
});
