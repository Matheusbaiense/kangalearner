export type MockConfig = {
  state: string;
  mode: "practice" | "exam";
  questions: number;
  /** Defaults to "car" when absent (older saved configs pre-date this field). */
  licenceType?: "car" | "motorcycle";
};

export type MockSession = {
  cfg: MockConfig;
  startedAtIso: string;
  qids: string[];
  answers: Record<string, string>;
  completedAtIso: string | null;
  postedAtIso?: string | null;
};
