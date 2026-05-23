import { describe, expect, it, vi } from "vitest";
import { fisherYatesSlice } from "./shuffle";

describe("fisherYatesSlice", () => {
  it("returns empty array for empty input or k <= 0", () => {
    expect(fisherYatesSlice([], 5)).toEqual([]);
    expect(fisherYatesSlice([1, 2, 3], 0)).toEqual([]);
    expect(fisherYatesSlice([1, 2, 3], -1)).toEqual([]);
  });

  it("returns at most k items", () => {
    const input = [1, 2, 3, 4, 5];
    expect(fisherYatesSlice(input, 3)).toHaveLength(3);
    expect(fisherYatesSlice(input, 10)).toHaveLength(5);
  });

  it("samples only from the original set (no invented values)", () => {
    const input = ["a", "b", "c", "d"];
    const sample = fisherYatesSlice(input, 2);
    sample.forEach((item) => expect(input).toContain(item));
  });

  it("does not mutate the source array", () => {
    const input = [1, 2, 3];
    const copy = [...input];
    fisherYatesSlice(input, 2);
    expect(input).toEqual(copy);
  });

  it("is deterministic when Math.random is fixed", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(fisherYatesSlice([10, 20, 30], 2)).toEqual([10, 20]);
    vi.restoreAllMocks();
  });
});
