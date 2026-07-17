import { describe, expect, it } from "vitest";
import { WA_PASS_MIN_CORRECT, WA_TOTAL_QUESTIONS } from "@kanga/core";
import type { AnswerRecord, MockSessionRecord } from "./questions";
import {
  buildAttemptId,
  buildAttemptRow,
  buildMockRow,
  buildSavedQuestionRow,
  isMockPassed,
  removeSyncedItems,
  upsertQueueItem,
  type AttemptItem,
  type MockItem,
  type SyncQueueItem
} from "./sync-logic";

const deviceId = "abcdef12-3456-7890-abcd-ef1234567890";

function answer(over: Partial<AnswerRecord> = {}): AnswerRecord {
  return {
    questionId: "q-001",
    category: "road-rules",
    chosen: "A",
    correct: true,
    state: "WA",
    answeredAt: "2026-05-31T10:00:00.000Z",
    source: "mobile",
    ...over
  };
}

function attemptItem(id: string, over: Partial<AnswerRecord> = {}): AttemptItem {
  return { type: "attempt", id, payload: answer(over) };
}

function mockSession(over: Partial<MockSessionRecord> = {}): MockSessionRecord {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    state: "WA",
    mode: "exam",
    qids: [],
    answers: {},
    score: WA_PASS_MIN_CORRECT,
    total: WA_TOTAL_QUESTIONS,
    completedAt: "2026-05-31T10:30:00.000Z",
    ...over
  };
}

describe("attempt dedupe key", () => {
  it("is deterministic for the same question_id + answered_at + device", () => {
    const p = { questionId: "q-009", answeredAt: "2026-05-31T10:00:00.000Z" };
    expect(buildAttemptId(deviceId, p)).toBe(buildAttemptId(deviceId, p));
  });

  it("changes when question_id changes", () => {
    const a = buildAttemptId(deviceId, { questionId: "q-1", answeredAt: "t" });
    const b = buildAttemptId(deviceId, { questionId: "q-2", answeredAt: "t" });
    expect(a).not.toBe(b);
  });

  it("changes when answered_at changes", () => {
    const a = buildAttemptId(deviceId, { questionId: "q-1", answeredAt: "t1" });
    const b = buildAttemptId(deviceId, { questionId: "q-1", answeredAt: "t2" });
    expect(a).not.toBe(b);
  });

  it("scopes the key to the device", () => {
    const a = buildAttemptId("device-aaaaaaaa", { questionId: "q-1", answeredAt: "t" });
    const b = buildAttemptId("device-bbbbbbbb", { questionId: "q-1", answeredAt: "t" });
    expect(a).not.toBe(b);
  });

  it("never exceeds the 64-char column width", () => {
    const id = buildAttemptId(deviceId, {
      questionId: "q".repeat(50),
      answeredAt: "2026-05-31T10:00:00.000Z"
    });
    expect(id.length).toBeLessThanOrEqual(64);
  });

  it("produces a stable remote attempt row tagged as mobile", () => {
    const row = buildAttemptRow("user-1", deviceId, attemptItem("local-1"));
    expect(row).toMatchObject({
      user_id: "user-1",
      question_id: "q-001",
      source: "mobile",
      is_correct: true,
      answered_at: "2026-05-31T10:00:00.000Z"
    });
    expect(row.attempt_id).toBe(buildAttemptId(deviceId, answer()));
  });
});

describe("sync queue (offline-first)", () => {
  it("appends new items", () => {
    const q1 = upsertQueueItem([], attemptItem("a"));
    const q2 = upsertQueueItem(q1, attemptItem("b"));
    expect(q2.map((i) => i.id)).toEqual(["a", "b"]);
  });

  it("replaces an item with the same id instead of duplicating it", () => {
    const first = upsertQueueItem([], attemptItem("a", { chosen: "A" }));
    const updated = upsertQueueItem(first, attemptItem("a", { chosen: "B" }));
    expect(updated).toHaveLength(1);
    expect((updated[0] as AttemptItem).payload.chosen).toBe("B");
  });

  it("does not mutate the input queue", () => {
    const original: SyncQueueItem[] = [attemptItem("a")];
    upsertQueueItem(original, attemptItem("b"));
    expect(original).toHaveLength(1);
  });

  it("removes only the items that were synced", () => {
    const queue: SyncQueueItem[] = [attemptItem("a"), attemptItem("b"), attemptItem("c")];
    const remaining = removeSyncedItems(queue, new Set(["a", "c"]));
    expect(remaining.map((i) => i.id)).toEqual(["b"]);
  });

  it("keeps only the latest saved-question operation per question", () => {
    const saved: SyncQueueItem = {
      type: "saved_question",
      id: "saved:q-001",
      payload: { questionId: "q-001", saved: true }
    };
    const unsaved: SyncQueueItem = {
      type: "saved_question",
      id: "saved:q-001",
      payload: { questionId: "q-001", saved: false }
    };
    const queue = upsertQueueItem(upsertQueueItem([], saved), unsaved);
    expect(queue).toEqual([unsaved]);
  });
});

describe("saved questions sync", () => {
  it("builds a saved question row scoped to AU", () => {
    expect(buildSavedQuestionRow("user-1", "q-001")).toEqual({
      user_id: "user-1",
      question_id: "q-001",
      country: "AU"
    });
  });
});

describe("mock pass threshold (24/30)", () => {
  it("passes at exactly the WA minimum correct", () => {
    expect(isMockPassed(WA_PASS_MIN_CORRECT, WA_TOTAL_QUESTIONS)).toBe(true);
  });

  it("fails one below the WA minimum correct", () => {
    expect(isMockPassed(WA_PASS_MIN_CORRECT - 1, WA_TOTAL_QUESTIONS)).toBe(false);
  });

  it("treats an empty session as not passed", () => {
    expect(isMockPassed(0, 0)).toBe(false);
  });

  it("stamps passed onto the remote mock row", () => {
    const passRow = buildMockRow("user-1", {
      type: "mock_session",
      id: "m1",
      payload: mockSession({ score: WA_PASS_MIN_CORRECT })
    } as MockItem);
    expect(passRow.passed).toBe(true);

    const failRow = buildMockRow("user-1", {
      type: "mock_session",
      id: "m2",
      payload: mockSession({ score: WA_PASS_MIN_CORRECT - 1 })
    } as MockItem);
    expect(failRow.passed).toBe(false);
  });

  it("forwards a real UUID id but drops a non-UUID local id", () => {
    const withUuid = buildMockRow("user-1", {
      type: "mock_session",
      id: "m1",
      payload: mockSession({ id: "11111111-1111-4111-8111-111111111111" })
    } as MockItem);
    expect(withUuid.id).toBe("11111111-1111-4111-8111-111111111111");

    const withLocalId = buildMockRow("user-1", {
      type: "mock_session",
      id: "m2",
      payload: mockSession({ id: "local-123" })
    } as MockItem);
    expect(withLocalId.id).toBeUndefined();
  });
});
