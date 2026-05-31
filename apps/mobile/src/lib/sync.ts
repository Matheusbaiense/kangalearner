import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getDeviceId,
  loadAnswers,
  loadMockSessions,
  loadSyncQueue,
  saveAnswers,
  saveMockSessions,
  saveSyncQueue
} from "./local-store";
import {
  buildAttemptRow,
  buildMockRow,
  isAttemptItem,
  isMockItem,
  removeSyncedItems
} from "./sync-logic";

export type SyncResult = {
  attemptsSynced: number;
  mockSessionsSynced: number;
  remaining: number;
};

export async function syncLocalProgress(
  supabase: SupabaseClient,
  userId: string
): Promise<SyncResult> {
  const [queue, deviceId] = await Promise.all([loadSyncQueue(), getDeviceId()]);
  const syncedIds = new Set<string>();

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

  const remainingQueue = removeSyncedItems(queue, syncedIds);
  await saveSyncQueue(remainingQueue);

  return {
    attemptsSynced: attemptItems.length,
    mockSessionsSynced: mockItems.length,
    remaining: remainingQueue.length
  };
}
