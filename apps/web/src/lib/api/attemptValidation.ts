import { AU_STATE_OPTIONS } from "@kanga/core";

const AU_STATES = new Set<string>(AU_STATE_OPTIONS.map((s) => s.code));
const ATTEMPT_SOURCES = new Set(["web", "practice", "mock", "migration", "bulk"]);
// 50 matches the varchar(50) columns (question_attempts/saved_questions) — a
// 51-64 char id would pass validation and then fail the whole batch upsert.
const QUESTION_ID_RE = /^[a-zA-Z0-9_-]{1,50}$/;
const CATEGORY_RE = /^[a-zA-Z0-9_-]{1,50}$/;

export function isValidAttemptState(state: unknown): state is string {
  return typeof state === "string" && AU_STATES.has(state);
}

export function isValidQuestionId(id: unknown): id is string {
  return typeof id === "string" && QUESTION_ID_RE.test(id);
}

export function isValidAttemptCategory(category: unknown): boolean {
  return (
    category === undefined ||
    category === null ||
    (typeof category === "string" && CATEGORY_RE.test(category))
  );
}

export function normalizeAttemptSource(source: unknown): string {
  if (typeof source === "string" && ATTEMPT_SOURCES.has(source)) return source;
  return "web";
}

export const MAX_BULK_ATTEMPTS = 500;

/** Reject client-supplied future timestamps so streaks cannot be pre-claimed. */
export function clampAnsweredAt(value: string | undefined, now = new Date()): string {
  if (!value) return now.toISOString();
  const ms = Date.parse(value);
  if (Number.isNaN(ms) || ms > now.getTime()) return now.toISOString();
  return new Date(ms).toISOString();
}

export type AttemptPayload = {
  attempt_id?: string;
  question_id: string;
  state: string;
  category?: string | null;
  is_correct: boolean;
  chosen?: string | null;
  source?: string;
  /** Ignored if present — the session user id always wins (IDOR). */
  user_id?: string;
};

export function buildAttemptInsertRow(
  sessionUserId: string,
  payload: AttemptPayload,
  attemptId: string,
  now = new Date()
): {
  user_id: string;
  attempt_id: string;
  question_id: string;
  state: string;
  category: string | null;
  is_correct: boolean;
  chosen: string | null;
  source: string;
  answered_at: string;
} {
  return {
    user_id: sessionUserId,
    attempt_id: attemptId,
    question_id: payload.question_id,
    state: payload.state,
    category: payload.category ?? null,
    is_correct: payload.is_correct,
    chosen: payload.chosen ?? null,
    source: normalizeAttemptSource(payload.source),
    answered_at: now.toISOString()
  };
}
