import { QUESTIONS } from "@kanga/core";
import { createClient } from "@/lib/supabase/client";

const ANSWERED_BY_STATE_KEY = "kl-answered-by-state-v2";
const LEGACY_ANSWERED_BY_STATE_KEY = "kl-answered-by-state";
const DW_ANSWERS_KEY = "dw-answers";
const MIGRATION_ANSWERED_AT_KEY = "kl-local-progress-migration-answered-at";

const BY_STATE_KEYS = [ANSWERED_BY_STATE_KEY, LEGACY_ANSWERED_BY_STATE_KEY];
const FLAT_KEYS = [DW_ANSWERS_KEY];

type SupabaseBrowserClient = ReturnType<typeof createClient>;

type StoredAnswer = {
  correct?: boolean;
  is_correct?: boolean;
  chosen?: string | null;
  selected?: string | null;
  answer?: string | null;
  answered_at?: string | number | null;
  answeredAt?: string | number | null;
  timestamp?: string | number | null;
  ts?: string | number | null;
};

type LocalAttempt = {
  question_id: string;
  state: string;
  category: string | null;
  is_correct: boolean;
  chosen: string | null;
  answered_at: string;
  source: "web";
};

type LocalProgress = {
  attempts: LocalAttempt[];
  sourceKeys: Set<string>;
};

let activeSync: Promise<boolean> | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function looksLikeAnswer(value: unknown): value is StoredAnswer {
  return isRecord(value) && ("correct" in value || "is_correct" in value);
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {}
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

function parseJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function toIsoDate(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  if (typeof value === "string" && value.trim()) {
    const trimmed = value.trim();
    const millis = /^\d+$/.test(trimmed) ? Number(trimmed) : Date.parse(trimmed);
    if (Number.isFinite(millis)) {
      const date = new Date(millis);
      return Number.isNaN(date.getTime()) ? null : date.toISOString();
    }
  }

  return null;
}

function fallbackAnsweredAt(): string {
  const existing = toIsoDate(safeGet(MIGRATION_ANSWERED_AT_KEY));
  if (existing) return existing;

  const next = new Date().toISOString();
  safeSet(MIGRATION_ANSWERED_AT_KEY, next);
  return next;
}

function answerAnsweredAt(answer: StoredAnswer, fallback: string): string {
  return (
    toIsoDate(answer.answered_at) ??
    toIsoDate(answer.answeredAt) ??
    toIsoDate(answer.timestamp) ??
    toIsoDate(answer.ts) ??
    fallback
  );
}

function answerChosen(answer: StoredAnswer): string | null {
  const chosen = answer.chosen ?? answer.selected ?? answer.answer ?? null;
  return chosen == null ? null : String(chosen);
}

function normalisePayload(parsed: unknown, defaultState: string): Record<string, Record<string, StoredAnswer>> {
  if (!isRecord(parsed)) return {};

  const values = Object.values(parsed);
  if (values.some(looksLikeAnswer)) {
    return { [defaultState]: parsed as Record<string, StoredAnswer> };
  }

  const byState: Record<string, Record<string, StoredAnswer>> = {};
  for (const [state, answers] of Object.entries(parsed)) {
    if (!isRecord(answers)) continue;
    byState[state] = answers as Record<string, StoredAnswer>;
  }
  return byState;
}

function readRawKangaStorage(): string | null {
  const win = window as typeof window & {
    KangaStorage?: { getAnsweredByStateRaw?: () => string | null };
  };

  try {
    return win.KangaStorage?.getAnsweredByStateRaw?.() ?? null;
  } catch {
    return null;
  }
}

function readLocalProgress(): LocalProgress {
  const sourceKeys = new Set<string>();
  const attemptsByKey = new Map<string, LocalAttempt>();
  const categoryByQuestionId = new Map<string, string>(QUESTIONS.map((q) => [q.id, q.cat]));
  let fallback: string | null = null;

  function collect(parsed: unknown, sourceKey: string, defaultState: string) {
    const byState = normalisePayload(parsed, defaultState);
    if (Object.keys(byState).length === 0) return;

    for (const [state, answers] of Object.entries(byState)) {
      if (!isRecord(answers)) continue;

      for (const [questionId, answer] of Object.entries(answers)) {
        if (!looksLikeAnswer(answer)) continue;

        const correct =
          typeof answer.correct === "boolean"
            ? answer.correct
            : typeof answer.is_correct === "boolean"
              ? answer.is_correct
              : null;
        if (correct == null) continue;

        fallback ??= fallbackAnsweredAt();
        const attempt: LocalAttempt = {
          question_id: questionId,
          state: state === "AU" ? "WA" : state,
          category: categoryByQuestionId.get(questionId) ?? null,
          is_correct: correct,
          chosen: answerChosen(answer),
          answered_at: answerAnsweredAt(answer, fallback),
          source: "web"
        };

        sourceKeys.add(sourceKey);
        attemptsByKey.set(attemptKey(attempt), attempt);
      }
    }
  }

  const kangaRaw = readRawKangaStorage();
  if (kangaRaw) {
    collect(parseJson(kangaRaw), ANSWERED_BY_STATE_KEY, "WA");
  }

  for (const key of BY_STATE_KEYS) {
    collect(parseJson(safeGet(key)), key, "WA");
  }

  for (const key of FLAT_KEYS) {
    collect(parseJson(safeGet(key)), key, "WA");
  }

  return { attempts: [...attemptsByKey.values()], sourceKeys };
}

function attemptKey(attempt: Pick<LocalAttempt, "question_id" | "state" | "answered_at">): string {
  const answeredAt = toIsoDate(attempt.answered_at) ?? attempt.answered_at;
  return `${attempt.question_id}\u0000${attempt.state}\u0000${answeredAt}`;
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function findExistingAttemptKeys(
  supabase: SupabaseBrowserClient,
  userId: string,
  attempts: LocalAttempt[]
): Promise<Set<string>> {
  const existing = new Set<string>();
  const states = [...new Set(attempts.map((attempt) => attempt.state))];
  const questionIds = [...new Set(attempts.map((attempt) => attempt.question_id))];

  for (const questionIdChunk of chunk(questionIds, 100)) {
    const { data, error } = await supabase
      .from("question_attempts")
      .select("question_id,state,answered_at")
      .eq("user_id", userId)
      .in("question_id", questionIdChunk)
      .in("state", states);

    if (error) throw error;
    if (!Array.isArray(data)) continue;

    for (const row of data) {
      if (
        row &&
        typeof row.question_id === "string" &&
        typeof row.state === "string" &&
        typeof row.answered_at === "string"
      ) {
        existing.add(attemptKey(row));
      }
    }
  }

  return existing;
}

function clearMigratedProgress(sourceKeys: Set<string>): void {
  for (const key of sourceKeys) {
    safeRemove(key);
  }
  safeRemove(MIGRATION_ANSWERED_AT_KEY);
}

async function runLocalProgressSync(supabaseClient?: SupabaseBrowserClient): Promise<boolean> {
  if (typeof window === "undefined") return true;

  try {
    const progress = readLocalProgress();
    if (progress.attempts.length === 0) return true;

    const supabase = supabaseClient ?? createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) return false;

    const existingKeys = await findExistingAttemptKeys(supabase, user.id, progress.attempts);
    const rowsToInsert = progress.attempts
      .filter((attempt) => !existingKeys.has(attemptKey(attempt)))
      .map((attempt) => ({
        user_id: user.id,
        question_id: attempt.question_id,
        state: attempt.state,
        category: attempt.category,
        is_correct: attempt.is_correct,
        chosen: attempt.chosen,
        answered_at: attempt.answered_at,
        source: "web" as const
      }));

    if (rowsToInsert.length > 0) {
      for (const rowChunk of chunk(rowsToInsert, 100)) {
        const { error } = await supabase.from("question_attempts").insert(rowChunk);
        if (error) throw error;
      }
    }

    clearMigratedProgress(progress.sourceKeys);
    return true;
  } catch {
    return false;
  }
}

export function syncLocalProgressToSupabase(
  supabaseClient?: SupabaseBrowserClient
): Promise<boolean> {
  if (!activeSync) {
    activeSync = runLocalProgressSync(supabaseClient).finally(() => {
      activeSync = null;
    });
  }
  return activeSync;
}
