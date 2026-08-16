import { describe, expect, it } from "vitest";
import { computeReadiness, READINESS_LEVEL_THRESHOLDS, type ReadinessInput } from "./readiness";

function base(overrides: Partial<ReadinessInput> = {}): ReadinessInput {
  return {
    categories: [],
    recentMocks: [],
    questionBankSize: 100,
    answeredUnique: 0,
    ...overrides
  };
}

describe("computeReadiness", () => {
  it("returns 0 / not_ready with actionable reasons when there is no data", () => {
    const r = computeReadiness(base());
    expect(r.score).toBe(0);
    expect(r.level).toBe("not_ready");
    expect(r.reasons).toContain("readiness.noMocks");
    expect(r.reasons).toContain("readiness.lowCoverage");
  });

  it("never declares ready from practice alone (no mocks)", () => {
    const r = computeReadiness(
      base({
        categories: [{ category: "Road Signs", correct: 90, total: 100 }],
        answeredUnique: 100
      })
    );
    // 40 coverage + 27 accuracy + 0 mocks = 67
    expect(r.score).toBe(67);
    expect(r.level).toBe("almost");
    expect(r.reasons).toContain("readiness.noMocks");
  });

  it("flags low coverage even with strong recent mocks", () => {
    const r = computeReadiness(
      base({
        categories: [{ category: "Road Signs", correct: 8, total: 10 }],
        recentMocks: [
          { score: 27, total: 30 },
          { score: 26, total: 30 }
        ],
        questionBankSize: 300,
        answeredUnique: 15
      })
    );
    // 2 coverage + 24 accuracy + 30 mocks = 56
    expect(r.score).toBe(56);
    expect(r.level).toBe("getting_there");
    expect(r.reasons).toContain("readiness.lowCoverage");
  });

  it("is ready when everything is high: coverage, accuracy and 2+ passing mocks", () => {
    const r = computeReadiness({
      categories: [
        { category: "Road Signs", correct: 95, total: 100 },
        { category: "Speed Limits", correct: 90, total: 100 }
      ],
      recentMocks: [
        { score: 27, total: 30 },
        { score: 28, total: 30 },
        { score: 26, total: 30 }
      ],
      questionBankSize: 200,
      answeredUnique: 200
    });
    expect(r.score).toBeGreaterThanOrEqual(READINESS_LEVEL_THRESHOLDS.ready);
    expect(r.level).toBe("ready");
    expect(r.reasons).toEqual([]);
  });

  it("a weak category (<70%) drags the score down and is reported", () => {
    const strong = computeReadiness(
      base({
        categories: [{ category: "Road Signs", correct: 90, total: 100 }],
        answeredUnique: 100
      })
    );
    const withWeak = computeReadiness(
      base({
        categories: [
          { category: "Road Signs", correct: 90, total: 100 },
          { category: "Parking", correct: 3, total: 10 }
        ],
        answeredUnique: 100
      })
    );
    expect(withWeak.score).toBeLessThan(strong.score);
    expect(withWeak.reasons).toContain("readiness.weakCategories");
  });

  it("score >= 80 with fewer than 2 passing mocks is NOT ready (boundary)", () => {
    const oneMock = computeReadiness(
      base({
        categories: [{ category: "Road Signs", correct: 95, total: 100 }],
        recentMocks: [{ score: 30, total: 30 }],
        answeredUnique: 100
      })
    );
    expect(oneMock.score).toBeGreaterThanOrEqual(READINESS_LEVEL_THRESHOLDS.ready);
    expect(oneMock.level).toBe("almost");
    expect(oneMock.reasons).toContain("readiness.needMorePassingMocks");

    const twoMocks = computeReadiness(
      base({
        categories: [{ category: "Road Signs", correct: 95, total: 100 }],
        recentMocks: [
          { score: 30, total: 30 },
          { score: 24, total: 30 }
        ],
        answeredUnique: 100
      })
    );
    expect(twoMocks.level).toBe("ready");
  });

  it("guards divisions: empty bank and zero-total mocks do not produce NaN", () => {
    const r = computeReadiness(
      base({
        questionBankSize: 0,
        recentMocks: [{ score: 0, total: 0 }]
      })
    );
    expect(Number.isFinite(r.score)).toBe(true);
    expect(r.score).toBe(0);
  });
});
