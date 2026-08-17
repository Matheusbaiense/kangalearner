import { describe, expect, it } from "vitest";
import { firstUnansweredIndex } from "./firstUnansweredIndex";

describe("firstUnansweredIndex", () => {
  it("returns the first id without an answer", () => {
    expect(firstUnansweredIndex(["a", "b", "c"], { a: "A" })).toBe(1);
  });

  it("returns 0 when every question is answered", () => {
    expect(firstUnansweredIndex(["a", "b"], { a: "A", b: "B" })).toBe(0);
  });

  it("returns 0 for an empty paper", () => {
    expect(firstUnansweredIndex(["a", "b"], {})).toBe(0);
  });
});
