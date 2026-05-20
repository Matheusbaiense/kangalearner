export type MockConfig = {
  state: string;
  mode: "practice" | "exam";
  questions: number;
};

export type MockSession = {
  cfg: MockConfig;
  startedAtIso: string;
  qids: string[];
  answers: Record<string, string>;
  completedAtIso: string | null;
  postedAtIso?: string | null;
};
