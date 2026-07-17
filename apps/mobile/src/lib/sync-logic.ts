import { SUPPORTED_COUNTRY, WA_PASS_THRESHOLD } from "@kanga/core";
import type { AnswerRecord, MockSessionRecord } from "./questions";

// Pure, dependency-free sync helpers. This module must NOT import AsyncStorage,
// expo-*, or the Supabase client so it stays unit-testable under vitest (node).

export type SyncQueueItem =
  | { type: "attempt"; id: string; payload: AnswerRecord }
  | { type: "mock_session"; id: string; payload: MockSessionRecord }
  | { type: "saved_question"; id: string; payload: SavedQuestionSyncPayload };

export type AttemptItem = Extract<SyncQueueItem, { type: "attempt" }>;
export type MockItem = Extract<SyncQueueItem, { type: "mock_session" }>;
export type SavedQuestionItem = Extract<SyncQueueItem, { type: "saved_question" }>;

export type SavedQuestionSyncPayload = {
  questionId: string;
  saved: boolean;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

// Deterministic dedupe key for a remote attempt: device + question + answered_at,
// capped at the column width. The same local answer always maps to the same key,
// so retries/re-syncs never create duplicate rows.
export function buildAttemptId(
  deviceId: string,
  payload: Pick<AnswerRecord, "questionId" | "answeredAt">
): string {
  return `${deviceId.slice(0, 8)}:${payload.questionId}:${payload.answeredAt}`.slice(0, 64);
}

export type AttemptRow = {
  user_id: string;
  attempt_id: string;
  question_id: string;
  country: typeof SUPPORTED_COUNTRY;
  state: AnswerRecord["state"];
  category: string;
  is_correct: boolean;
  chosen: string;
  source: "mobile";
  answered_at: string;
};

export function buildAttemptRow(userId: string, deviceId: string, item: AttemptItem): AttemptRow {
  const p = item.payload;
  return {
    user_id: userId,
    attempt_id: buildAttemptId(deviceId, p),
    question_id: p.questionId,
    country: SUPPORTED_COUNTRY,
    state: p.state,
    category: p.category,
    is_correct: p.correct,
    chosen: p.chosen,
    source: "mobile",
    answered_at: p.answeredAt
  };
}

export function isMockPassed(score: number, total: number): boolean {
  return total > 0 && score / total >= WA_PASS_THRESHOLD;
}

export type MockRow = {
  id?: string;
  user_id: string;
  country: typeof SUPPORTED_COUNTRY;
  state: MockSessionRecord["state"];
  mode: MockSessionRecord["mode"];
  score: number;
  total: number;
  passed: boolean;
  time_seconds: number | null;
  answers: Record<string, string>;
  weak_categories: null;
  source: "mobile";
  completed_at: string;
};

export function buildMockRow(userId: string, item: MockItem): MockRow {
  const p = item.payload;
  return {
    // Only forward a client id when it is a real UUID, otherwise let the DB mint one.
    ...(isUuid(p.id) ? { id: p.id } : {}),
    user_id: userId,
    country: SUPPORTED_COUNTRY,
    state: p.state,
    mode: p.mode,
    score: p.score,
    total: p.total,
    passed: isMockPassed(p.score, p.total),
    time_seconds: null,
    answers: p.answers,
    weak_categories: null,
    source: "mobile",
    completed_at: p.completedAt
  };
}

export type SavedQuestionRow = {
  user_id: string;
  question_id: string;
  country: typeof SUPPORTED_COUNTRY;
};

export function buildSavedQuestionRow(userId: string, questionId: string): SavedQuestionRow {
  return {
    user_id: userId,
    question_id: questionId,
    country: SUPPORTED_COUNTRY
  };
}

export function isAttemptItem(item: SyncQueueItem): item is AttemptItem {
  return item.type === "attempt";
}

export function isMockItem(item: SyncQueueItem): item is MockItem {
  return item.type === "mock_session";
}

export function isSavedQuestionItem(item: SyncQueueItem): item is SavedQuestionItem {
  return item.type === "saved_question";
}

// Append-or-replace by id so the offline queue never accumulates duplicate work.
export function upsertQueueItem(queue: SyncQueueItem[], item: SyncQueueItem): SyncQueueItem[] {
  return [...queue.filter((entry) => entry.id !== item.id), item];
}

export function removeSyncedItems(
  queue: SyncQueueItem[],
  syncedIds: ReadonlySet<string>
): SyncQueueItem[] {
  return queue.filter((item) => !syncedIds.has(item.id));
}
