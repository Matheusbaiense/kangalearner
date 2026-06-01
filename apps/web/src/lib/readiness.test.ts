import { describe, it, expect } from "vitest";
import {
  computeReadiness,
  nextBestAction,
  type AnsweredMap,
  type ReadinessQuestion
} from "./readiness";

const QS: ReadinessQuestion[] = [
  { id: "a1", cat: "Speed Limits" },
  { id: "a2", cat: "Speed Limits" },
  { id: "a3", cat: "Speed Limits" },
  { id: "b1", cat: "Road Signs" },
  { id: "b2", cat: "Road Signs" },
  { id: "b3", cat: "Road Signs" },
  { id: "c1", cat: "Parking Rules" }
];

describe("computeReadiness", () => {
  it("returns empty readiness with no answers", () => {
    const r = computeReadiness({}, QS);
    expect(r.answeredCount).toBe(0);
    expect(r.theoryPct).toBe(0);
    expect(r.weakest).toBeNull();
    expect(r.untouchedCats).toHaveLength(3);
  });

  it("computes overall accuracy and coverage", () => {
    const answered: AnsweredMap = {
      a1: { correct: true },
      a2: { correct: true },
      a3: { correct: false }, // Speed Limits 2/3
      b1: { correct: false },
      b2: { correct: false },
      b3: { correct: false } // Road Signs 0/3
    };
    const r = computeReadiness(answered, QS);
    expect(r.answeredCount).toBe(6);
    expect(r.theoryPct).toBe(33); // 2/6
    expect(r.coveragePct).toBe(67); // 2 of 3 categories
    expect(r.weakest?.cat).toBe("Road Signs");
    expect(r.weakest?.accuracy).toBe(0);
    expect(r.untouchedCats).toEqual(["Parking Rules"]);
  });

  it("ignores categories below the minimum attempt threshold for 'weakest'", () => {
    const answered: AnsweredMap = {
      a1: { correct: true },
      a2: { correct: true },
      a3: { correct: true }, // Speed Limits 3/3
      c1: { correct: false } // Parking 0/1 — below threshold, not eligible
    };
    const r = computeReadiness(answered, QS);
    expect(r.weakest?.cat).toBe("Speed Limits");
  });
});

describe("nextBestAction", () => {
  it("suggests start when nothing answered", () => {
    expect(nextBestAction(computeReadiness({}, QS)).kind).toBe("start");
  });

  it("suggests drilling a weak category", () => {
    const r = computeReadiness(
      { b1: { correct: false }, b2: { correct: false }, b3: { correct: false } },
      QS
    );
    const action = nextBestAction(r);
    expect(action.kind).toBe("weak");
    expect(action.category).toBe("Road Signs");
  });

  it("suggests broadening when categories are untouched and the rest are strong", () => {
    const r = computeReadiness(
      { a1: { correct: true }, a2: { correct: true }, a3: { correct: true } },
      QS
    );
    expect(nextBestAction(r).kind).toBe("broaden");
  });

  it("suggests a mock test when broad and strong", () => {
    const answered: AnsweredMap = {
      a1: { correct: true },
      a2: { correct: true },
      a3: { correct: true },
      b1: { correct: true },
      b2: { correct: true },
      b3: { correct: true },
      c1: { correct: true }
    };
    expect(nextBestAction(computeReadiness(answered, QS)).kind).toBe("mock");
  });
});
