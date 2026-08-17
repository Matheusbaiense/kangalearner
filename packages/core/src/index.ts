export const WA_PASS_THRESHOLD = 0.8; // 80% — DoT WA Learner Test
export const WA_PASS_MIN_CORRECT = 24; // out of 30 questions
export const WA_TOTAL_QUESTIONS = 30;

/** ISO 3166-1 alpha-2 country code for the single supported market. */
export const SUPPORTED_COUNTRY = "AU" as const;

export type SupportedLanguage = "pt" | "en" | "es" | "pten" | "esen";
export type SupportedState = "WA" | "NSW" | "VIC" | "QLD" | "SA" | "TAS" | "ACT" | "NT";

export interface QuizAnswerState {
  correct: boolean;
  chosen: string;
}

export interface QuizQuestion {
  id: string;
  cat: string;
  states: SupportedState[];
}

export function filterByState<T extends { states?: string[] }>(questions: T[], state: string): T[] {
  return questions.filter((q) => !q.states || q.states.includes(state));
}

// ── Australian States ──────────────────────────────────────────────
export const AU_STATE_OPTIONS = [
  { code: "WA", name: "Western Australia" },
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" }
] as const;

export type AuStateCode = (typeof AU_STATE_OPTIONS)[number]["code"];

/** States with a real question bank live today. Everything else in AU_STATE_OPTIONS is "coming soon". */
export const LIVE_STATE_CODES: AuStateCode[] = [
  "WA",
  "NSW",
  "QLD",
  "VIC",
  "SA",
  "TAS",
  "ACT",
  "NT"
];

/**
 * States/territories whose official learner-test authority offers a real
 * motorcycle rider knowledge test. VIC/SA/ACT are deliberately excluded —
 * confirmed (2026-08) that VIC's is an in-person paper test, SA's requires
 * a paid authenticated mySAGOV account (no public quiz), and ACT riders sit
 * the identical general car test. This is not missing content to extract;
 * there is nothing public to extract.
 */
export const MOTORCYCLE_LICENCE_STATES: AuStateCode[] = ["WA", "NSW", "QLD", "TAS", "NT"];

export function stateHasMotorcycleLicence(state: string | null | undefined): boolean {
  return (MOTORCYCLE_LICENCE_STATES as readonly string[]).includes(state ?? "");
}

const _VALID_STATE_CODES = new Set<string>(AU_STATE_OPTIONS.map((s) => s.code));

export function normalizeAuState(value: string | null | undefined): AuStateCode | null {
  if (value && _VALID_STATE_CODES.has(value)) return value as AuStateCode;
  return null;
}

export { fisherYatesSlice } from "./shuffle";

export {
  STATE_PROFILES,
  getStateProfile,
  passPercent,
  applyStateTokens,
  type StateProfile
} from "./data/stateProfiles";

export {
  computeReadiness,
  LOW_COVERAGE_THRESHOLD,
  READINESS_LEVEL_THRESHOLDS,
  READINESS_MIN_PASSING_MOCKS,
  WEAK_CATEGORY_ACCURACY,
  type ReadinessInput,
  type ReadinessLevel,
  type ReadinessReason,
  type ReadinessResult
} from "./readiness";

export { CATEGORIES } from "./data/categories";
export { QUESTIONS } from "./data/questions";
export {
  LANGS,
  validateQuestionsDataset,
  type Category,
  type DatasetIssue,
  type Lang,
  type LocalizedText,
  type Question,
  type QuestionOption,
  type QuestionsDataset
} from "./data/questionsSchema";
