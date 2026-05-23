import { describe, expect, it } from "vitest";
import { safeParseJson } from "./safeParseJson";

describe("safeParseJson", () => {
  it("returns fallback for null/undefined/empty", () => {
    expect(safeParseJson(null, {})).toEqual({});
    expect(safeParseJson(undefined, [])).toEqual([]);
    expect(safeParseJson("", { ok: true })).toEqual({ ok: true });
  });

  it("parses valid JSON", () => {
    expect(safeParseJson('{"a":1}', {})).toEqual({ a: 1 });
    expect(safeParseJson("[1,2]", [])).toEqual([1, 2]);
  });

  it("returns fallback on invalid JSON", () => {
    const fallback = { safe: true };
    expect(safeParseJson("{not json", fallback)).toBe(fallback);
  });
});
