import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getDeviceId,
  loadAnswers,
  loadMockSessions,
  loadSavedQuestions,
  loadSyncQueue,
  saveAnswers,
  saveMockSessions,
  saveSyncQueue
} from "./local-store";
import {
  buildAttemptRow,
  buildMockRow,
  buildSavedQuestionRow,
  isAttemptItem,
  isMockItem,
  isSavedQuestionItem,
  removeSyncedItems
} from "./sync-logic";

export type SyncResult = {
  attemptsSynced: number;
  mockSessionsSynced: number;
  savedQuestionsSynced: number;
  remaining: number;
};

export async function syncLocalProgress(
  supabase: SupabaseClient,
  userId: string
): Promise<SyncResult> {
  const [queue, deviceId] = await Promise.all([loadSyncQueue(), getDeviceId()]);
  const syncedIds = new Set<string>();
  let savedQuestionsSynced = 0;

  const attemptItems = queue.filter(isAttemptItem);
  if (attemptItems.length) {
    const rows = attemptItems.map((item) => buildAttemptRow(userId, deviceId, item));

    const { error } = await supabase.from("question_attempts").upsert(rows, {
      onConflict: "user_id,attempt_id",
      ignoreDuplicates: true
    });
    if (error) throw error;
    attemptItems.forEach((item) => syncedIds.add(item.id));

    const answers = await loadAnswers();
    attemptItems.forEach((item) => {
      if (answers[item.payload.questionId]) answers[item.payload.questionId].synced = true;
    });
    await saveAnswers(answers);
  }

  const mockItems = queue.filter(isMockItem);
  if (mockItems.length) {
    const rows = mockItems.map((item) => buildMockRow(userId, item));

    const { error } = await supabase.from("mock_sessions").upsert(rows, {
      onConflict: "id",
      ignoreDuplicates: true
    });
    if (error) throw error;
    mockItems.forEach((item) => syncedIds.add(item.id));

    const sessions = await loadMockSessions();
    const syncedSessionIds = new Set(mockItems.map((item) => item.payload.id));
    await saveMockSessions(
      sessions.map((session) =>
        syncedSessionIds.has(session.id) ? { ...session, synced: true } : session
      )
    );
  }

  const savedIds = await loadSavedQuestions();
  if (savedIds.length) {
    const uniqueSavedIds = [...new Set(savedIds)];
    const rows = uniqueSavedIds.map((questionId) => buildSavedQuestionRow(userId, questionId));

    const { error } = await supabase.from("saved_questions").upsert(rows, {
      onConflict: "user_id,question_id",
      ignoreDuplicates: true
    });
    if (error) throw error;
    savedQuestionsSynced += rows.length;
  }

  const savedQuestionItems = queue.filter(isSavedQuestionItem);
  for (const item of savedQuestionItems) {
    if (item.payload.saved) {
      const row = buildSavedQuestionRow(userId, item.payload.questionId);
      const { error } = await supabase.from("saved_questions").upsert(row, {
        onConflict: "user_id,question_id",
        ignoreDuplicates: true
      });
      if (error) throw error;
      savedQuestionsSynced += 1;
    } else {
      const { error } = await supabase
        .from("saved_questions")
        .delete()
        .eq("user_id", userId)
        .eq("question_id", item.payload.questionId);
      if (error) throw error;
      savedQuestionsSynced += 1;
    }
    syncedIds.add(item.id);
  }

  // Re-read the queue before saving: items enqueued while the network calls
  // above were in flight must survive the sync (lost-update guard).
  const freshQueue = await loadSyncQueue();
  const remainingQueue = removeSyncedItems(freshQueue, syncedIds);
  await saveSyncQueue(remainingQueue);

  return {
    attemptsSynced: attemptItems.length,
    mockSessionsSynced: mockItems.length,
    savedQuestionsSynced,
    remaining: remainingQueue.length
  };
}
