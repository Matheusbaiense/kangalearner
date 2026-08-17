import { describe, expect, it } from "vitest";
import { namedQueryFailures } from "./namedQueryFailures";

describe("namedQueryFailures", () => {
  it("returns empty when every query succeeded", () => {
    expect(
      namedQueryFailures([
        { name: "profiles", error: null },
        { name: "rpc", error: undefined }
      ])
    ).toEqual([]);
  });

  it("lists failed query names without swallowing them", () => {
    expect(
      namedQueryFailures([
        { name: "profiles", error: { message: "timeout" } },
        { name: "attempts", error: null },
        { name: "get_pass_rate", error: { message: "permission denied" } }
      ])
    ).toEqual(["profiles", "get_pass_rate"]);
  });
});
