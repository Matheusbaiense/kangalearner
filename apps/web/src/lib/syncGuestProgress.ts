import { SK } from "./storageKeys";
import { loadQuestions } from "@/hooks/useQuestions";

async function syncAnsweredQuestions() {
  try {
    const raw = localStorage.getItem(SK.answered);
    if (!raw) return;

    const answered = JSON.parse(raw);
    const keys = Object.keys(answered);
    if (keys.length === 0) return;

    const state = localStorage.getItem(SK.stateV2) ?? localStorage.getItem(SK.stateLegacy) ?? "WA";
    const questions = await loadQuestions().catch((err) => {
      console.error("Failed to load questions for guest sync", err);
      return [];
    });
    const categoriesByQuestionId = new Map(questions.map((q) => [q.id, q.cat]));

    const attempts = keys.map((qid) => {
      const a = answered[qid];
      return {
        attempt_id: `migration:${state}:${qid}`,
        question_id: qid,
        state: state,
        category: categoriesByQuestionId.get(qid) ?? null,
        is_correct: !!a.correct,
        chosen: a.chosen || "",
        source: "migration"
      };
    });

    const res = await fetch("/api/attempts/bulk", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ attempts })
    });

    if (res.ok) {
      // Clear localStorage so we don't migrate again on next login
      localStorage.removeItem(SK.answered);
    }
  } catch (error) {
    // Silently fail, it will retry next time if localStorage wasn't cleared
    console.error("Failed to sync guest answers", error);
  }
}

async function syncSavedQuestions() {
  try {
    const raw = localStorage.getItem(SK.saved);
    if (!raw) return;

    const parsed = JSON.parse(raw);
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
  } catch (error) {
    // Silently fail, it will retry next time if localStorage wasn't cleared
    console.error("Failed to sync saved questions", error);
  }
}

export async function syncGuestProgress() {
  if (typeof window === "undefined") return;

  await Promise.all([syncAnsweredQuestions(), syncSavedQuestions()]);
}
