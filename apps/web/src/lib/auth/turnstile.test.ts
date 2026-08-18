import { describe, expect, it } from "vitest";
import { captchaAuthOptions } from "./turnstile";

describe("captchaAuthOptions", () => {
  it("omits captchaToken when empty", () => {
    expect(captchaAuthOptions("")).toEqual({});
    expect(captchaAuthOptions("  ")).toEqual({});
  });

  it("passes a trimmed token", () => {
    expect(captchaAuthOptions(" abc ")).toEqual({ captchaToken: "abc" });
  });
});
