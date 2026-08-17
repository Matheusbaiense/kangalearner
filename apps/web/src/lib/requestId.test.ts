import { describe, expect, it } from "vitest";
import { REQUEST_ID_HEADER, resolveRequestId } from "./requestId";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const KNOWN = "11111111-1111-4111-8111-111111111111";

describe("resolveRequestId", () => {
  it("reuses a well-formed incoming uuid", () => {
    expect(resolveRequestId(KNOWN)).toBe(KNOWN);
    expect(resolveRequestId(`  ${KNOWN}  `)).toBe(KNOWN);
  });

  it("mints a uuid when the header is missing", () => {
    const minted = resolveRequestId(null);
    expect(minted).toMatch(UUID);
    expect(resolveRequestId(undefined)).toMatch(UUID);
  });

  it("rejects injection and non-uuid values", () => {
    expect(resolveRequestId("not-a-uuid")).toMatch(UUID);
    expect(resolveRequestId("not-a-uuid")).not.toBe("not-a-uuid");
    expect(resolveRequestId(`${KNOWN}\nAuthorization: Bearer secret`)).not.toContain("Bearer");
  });
});

describe("REQUEST_ID_HEADER", () => {
  it("is the hop-by-hop name the middleware stamps", () => {
    expect(REQUEST_ID_HEADER).toBe("x-request-id");
  });
});
