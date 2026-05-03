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
