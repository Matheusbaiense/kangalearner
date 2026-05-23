import { AU_STATE_OPTIONS } from "@kanga/core";

const AU_STATES = new Set<string>(AU_STATE_OPTIONS.map((s) => s.code));
const ATTEMPT_SOURCES = new Set(["web", "practice", "mock", "migration", "bulk"]);
const QUESTION_ID_RE = /^[a-zA-Z0-9_-]{1,64}$/;
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
