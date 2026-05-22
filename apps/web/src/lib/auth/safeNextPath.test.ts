import { describe, expect, it } from "vitest";
import { safeNextPath } from "./safeNextPath";

describe("safeNextPath", () => {
  it("allows same-origin relative paths", () => {
    expect(safeNextPath("/dashboard", "/")).toBe("/dashboard");
  });

  it("rejects external URLs", () => {
    expect(safeNextPath("https://evil.example/phish", "/")).toBe("/");
  });

  it("rejects protocol-relative URLs", () => {
    expect(safeNextPath("//evil.example", "/")).toBe("/");
  });
});
