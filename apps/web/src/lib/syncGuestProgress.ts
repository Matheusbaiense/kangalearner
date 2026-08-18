import { SK } from "./storageKeys";
import { loadQuestions } from "@/hooks/useQuestions";
import { runLocalAttemptMigration } from "./migrateLocalAttempts";

const SYNC_DONE = "kanga-guest-sync-done";
const SYNC_LOCK = "kanga-guest-sync-lock";

async function syncAnsweredQuestions() {
  const raw = localStorage.getItem(SK.answered);
  if (!raw) return;

  const answered = JSON.parse(raw) as Record<
    string,
    { correct?: boolean; chosen?: string; category?: string }
  >;
  const keys = Object.keys(answered);
  if (keys.length === 0) return;

  const state = localStorage.getItem(SK.stateV2) ?? localStorage.getItem(SK.stateLegacy) ?? "WA";
  const needsCategory = keys.some((qid) => !answered[qid]?.category);
  const questions = needsCategory
    ? await loadQuestions(state).catch((err) => {
        console.error("Failed to load questions for guest sync", err);
        return [];
      })
    : [];
  const categoriesByQuestionId = new Map(questions.map((q) => [q.id, q.cat]));

  const attempts = keys.map((qid) => {
    const a = answered[qid];
    return {
      attempt_id: `migration:${state}:${qid}`,
      question_id: qid,
      state,
      category: a?.category ?? categoriesByQuestionId.get(qid) ?? null,
      is_correct: !!a?.correct,
      chosen: a?.chosen || "",
      source: "migration"
    };
  });

  const res = await fetch("/api/attempts/bulk", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ attempts })
  });

  if (res.ok) {
    localStorage.removeItem(SK.answered);
  }
}

async function syncSavedQuestions() {
  const raw = localStorage.getItem(SK.saved);
  if (!raw) return;

  const parsed = JSON.parse(raw) as unknown;
  const questionIds = Array.isArray(parsed) ? parsed : [];
  if (questionIds.length === 0) return;

  const res = await fetch("/api/saved-questions/bulk", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ questionIds })
  });

  if (res.ok) {
    localStorage.removeItem(SK.saved);
  }
}

/** One guest→cloud migration per tab. Safe to call from nav and dashboard. */
export async function syncGuestProgress() {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem(SYNC_DONE) || sessionStorage.getItem(SYNC_LOCK)) return;
  sessionStorage.setItem(SYNC_LOCK, "1");
  try {
    await Promise.all([syncAnsweredQuestions(), syncSavedQuestions()]);
    await runLocalAttemptMigration();
    sessionStorage.setItem(SYNC_DONE, "1");
  } catch (error) {
    console.error("Failed to sync guest progress", error);
  } finally {
    sessionStorage.removeItem(SYNC_LOCK);
  }
}
