import { QUESTIONS } from "@kanga/core";

const STORAGE_KEY = "kl-answered-by-state-v2";

export type BulkAttemptPayload = {
  attempt_id: string;
  question_id: string;
  state: string;
  category: string | null;
  is_correct: boolean;
  chosen: string | null;
  source: string;
};

/** Build deduplicated attempt rows from the static-site localStorage blob. */
export function buildAttemptsFromLocalStorage(): BulkAttemptPayload[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  let byState: Record<string, Record<string, { correct?: boolean; chosen?: string }>>;
  try {
    byState = JSON.parse(raw) as Record<string, Record<string, { correct?: boolean; chosen?: string }>>;
  } catch {
    return [];
  }

  const catById = new Map<string, string>();
  for (const q of QUESTIONS) {
    catById.set(q.id, q.cat);
  }
  const attempts: BulkAttemptPayload[] = [];

  for (const [state, answers] of Object.entries(byState)) {
    if (!answers || typeof answers !== "object") continue;
    for (const [qid, rec] of Object.entries(answers)) {
      if (!rec || typeof rec.correct !== "boolean") continue;
      attempts.push({
        attempt_id: `mig-${state}-${qid}`,
        question_id: qid,
        state,
        category: catById.get(qid) ?? null,
        is_correct: rec.correct,
        chosen: rec.chosen ?? null,
        source: "migration"
      });
    }
  }
  return attempts;
}

export async function postAttemptsBulk(attempts: BulkAttemptPayload[]): Promise<boolean> {
  if (attempts.length === 0) return true;
  const res = await fetch("/api/attempts/bulk", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ attempts }),
    credentials: "include"
  });
  return res.ok;
}

export async function runLocalAttemptMigration(): Promise<boolean> {
  const attempts = buildAttemptsFromLocalStorage();
  if (attempts.length === 0) return true;
  return postAttemptsBulk(attempts);
}
