import { describe, expect, it } from "vitest";
import {
  buildAttemptInsertRow,
  clampAnsweredAt,
  isValidAttemptCategory,
  isValidAttemptState,
  isValidQuestionId,
  MAX_BULK_ATTEMPTS,
  normalizeAttemptSource
} from "./attemptValidation";

describe("attemptValidation", () => {
  it("accepts AU states", () => {
    expect(isValidAttemptState("WA")).toBe(true);
    expect(isValidAttemptState("XX")).toBe(false);
  });

  it("validates question ids", () => {
    expect(isValidQuestionId("wa-q-001")).toBe(true);
    expect(isValidQuestionId("../etc/passwd")).toBe(false);
  });

  it("whitelists sources", () => {
    expect(normalizeAttemptSource("practice")).toBe("practice");
    expect(normalizeAttemptSource("evil")).toBe("web");
  });

  it("allows null category", () => {
    expect(isValidAttemptCategory(null)).toBe(true);
    expect(isValidAttemptCategory("signs")).toBe(true);
  });

  it("caps bulk uploads at 500", () => {
    expect(MAX_BULK_ATTEMPTS).toBe(500);
  });

  it("clamps missing, invalid and future answered_at to now", () => {
    const now = new Date("2026-08-18T00:00:00.000Z");
    expect(clampAnsweredAt(undefined, now)).toBe(now.toISOString());
    expect(clampAnsweredAt("not-a-date", now)).toBe(now.toISOString());
    expect(clampAnsweredAt("2026-08-19T00:00:00.000Z", now)).toBe(now.toISOString());
    expect(clampAnsweredAt("2026-08-17T12:00:00.000Z", now)).toBe("2026-08-17T12:00:00.000Z");
  });

  it("always stamps the session user id, never a body user_id", () => {
    const row = buildAttemptInsertRow(
      "session-user",
      {
        user_id: "attacker",
        question_id: "q-1",
        state: "WA",
        is_correct: true
      },
      "att-1",
      new Date("2026-08-18T00:00:00.000Z")
    );
    expect(row.user_id).toBe("session-user");
    expect(row.attempt_id).toBe("att-1");
  });
});
