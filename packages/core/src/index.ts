export const WA_PASS_THRESHOLD = 0.80;   // 80% — DoT WA Learner Test
export const WA_PASS_MIN_CORRECT = 24;   // out of 30 questions
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

export { QUESTIONS, CATEGORIES } from "./data/questions";
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
