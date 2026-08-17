import {
  AU_STATE_OPTIONS,
  WA_PASS_MIN_CORRECT,
  WA_TOTAL_QUESTIONS,
  fisherYatesSlice,
  type AuStateCode
} from "@kanga/core";
import { CATEGORIES, type Category, type Question } from "@kanga/core";
import { QUESTIONS } from "@kanga/core/data/questions";
import { tx, type UiLang } from "./i18n";

export { AU_STATE_OPTIONS, CATEGORIES, QUESTIONS, WA_PASS_MIN_CORRECT, WA_TOTAL_QUESTIONS };
export { tx };
export type { AuStateCode, Question };

export type AnswerRecord = {
  questionId: string;
  category: string;
  chosen: string;
  correct: boolean;
  state: AuStateCode;
  answeredAt: string;
  source: "mobile";
  synced?: boolean;
};

export type MockSessionRecord = {
  id: string;
  state: AuStateCode;
  mode: "practice" | "exam";
  qids: string[];
  answers: Record<string, string>;
  score: number;
  total: number;
  completedAt: string;
  synced?: boolean;
};

export function questionsForState(state: AuStateCode): Question[] {
  // ponytail: mobile has no licence toggle yet, so it serves the car pool only;
  // add a licenceType preference (like the web SiteNav toggle) to unlock motorcycle.
  return QUESTIONS.filter((q) => {
    if (q.licenceType === "motorcycle") return false;
    const states = q.states as readonly AuStateCode[] | undefined;
    return !states || states.includes(state);
  });
}

/** Categories that actually have questions in the given pool, in CATEGORIES order.
 * Keeps state-only or motorcycle-only topics from rendering as empty cards. */
export function categoriesForPool(pool: readonly Question[]): Category[] {
  const present = new Set(pool.map((q) => q.cat));
  return CATEGORIES.filter((c) => present.has(c.key));
}

export function categoryLabel(category: string, lang: UiLang): string {
  const c = CATEGORIES.find((item) => item.key === category);
  return c ? tx(c.label, lang) : category;
}

export function correctLetter(q: Question): string {
  return q.opts.find((o) => o.ok)?.l ?? "";
}

export function scoreAnswers(qids: string[], answers: Record<string, string>): number {
  return qids.reduce((score, id) => {
    const q = QUESTIONS.find((item) => item.id === id);
    if (!q) return score;
    return score + (answers[id] === correctLetter(q) ? 1 : 0);
  }, 0);
}

export function buildMockQuestionIds(state: AuStateCode, count = WA_TOTAL_QUESTIONS): string[] {
  return fisherYatesSlice(
    questionsForState(state).map((q) => q.id),
    count
  );
}

export function pct(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}
