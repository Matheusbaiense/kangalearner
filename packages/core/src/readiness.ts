import { WA_PASS_THRESHOLD } from "./index";

// ── Readiness score ("Am I ready for the test?") ───────────────────
// score (0–100) = coverage (40) + accuracy (30) + recent mocks (30)
//  - coverage: answeredUnique / questionBankSize, saturating at 1
//  - accuracy: attempt-weighted accuracy across categories; each weak
//    category (>= WEAK_CATEGORY_MIN_ATTEMPTS attempts and < 70% accuracy)
//    costs WEAK_CATEGORY_PENALTY_PTS points
//  - mocks: mean of the last 3 mock percentages, full share at >= 80%;
//    no mocks = 0
// "ready" additionally requires >= 2 of the last 3 mocks at the WA pass
// mark (24/30 = 80%) — never declare ready without passing mocks.

export interface ReadinessInput {
  categories: Array<{ category: string; correct: number; total: number }>;
  /** Most recent first. */
  recentMocks: Array<{ score: number; total: number }>;
  questionBankSize: number;
  answeredUnique: number;
}

export type ReadinessLevel = "not_ready" | "getting_there" | "almost" | "ready";

export type ReadinessReason =
  | "readiness.noMocks"
  | "readiness.lowMockScores"
  | "readiness.needMorePassingMocks"
  | "readiness.weakCategories"
  | "readiness.lowCoverage";

export interface ReadinessResult {
  score: number;
  level: ReadinessLevel;
  /** i18n keys, most important first, max 3. */
  reasons: ReadinessReason[];
}

export const READINESS_LEVEL_THRESHOLDS = {
  getting_there: 40,
  almost: 65,
  ready: 80
} as const;

export const READINESS_MIN_PASSING_MOCKS = 2;
export const WEAK_CATEGORY_ACCURACY = 0.7;
export const WEAK_CATEGORY_MIN_ATTEMPTS = 3;
export const WEAK_CATEGORY_PENALTY_PTS = 3;
export const LOW_COVERAGE_THRESHOLD = 0.6;
const RECENT_MOCK_WINDOW = 3;

export function computeReadiness(input: ReadinessInput): ReadinessResult {
  const { categories, recentMocks, questionBankSize, answeredUnique } = input;

  const coverage = questionBankSize > 0 ? Math.min(1, answeredUnique / questionBankSize) : 0;
  const coveragePts = 40 * coverage;

  const sumTotal = categories.reduce((acc, c) => acc + c.total, 0);
  const sumCorrect = categories.reduce((acc, c) => acc + c.correct, 0);
  const weightedAccuracy = sumTotal > 0 ? sumCorrect / sumTotal : 0;
  const weakCount = categories.filter(
    (c) => c.total >= WEAK_CATEGORY_MIN_ATTEMPTS && c.correct / c.total < WEAK_CATEGORY_ACCURACY
  ).length;
  const accuracyPts = Math.max(0, 30 * weightedAccuracy - WEAK_CATEGORY_PENALTY_PTS * weakCount);

  const windowMocks = recentMocks.slice(0, RECENT_MOCK_WINDOW).filter((m) => m.total > 0);
  const mockAvg =
    windowMocks.length > 0
      ? windowMocks.reduce((acc, m) => acc + m.score / m.total, 0) / windowMocks.length
      : 0;
  const mockPts = windowMocks.length > 0 ? 30 * Math.min(1, mockAvg / WA_PASS_THRESHOLD) : 0;

  const score = Math.min(100, Math.max(0, Math.round(coveragePts + accuracyPts + mockPts)));

  const passingMocks = windowMocks.filter((m) => m.score / m.total >= WA_PASS_THRESHOLD).length;

  let level: ReadinessLevel;
  if (score >= READINESS_LEVEL_THRESHOLDS.ready && passingMocks >= READINESS_MIN_PASSING_MOCKS) {
    level = "ready";
  } else if (score >= READINESS_LEVEL_THRESHOLDS.almost) {
    level = "almost";
  } else if (score >= READINESS_LEVEL_THRESHOLDS.getting_there) {
    level = "getting_there";
  } else {
    level = "not_ready";
  }

  const reasons: ReadinessReason[] = [];
  if (level !== "ready") {
    if (windowMocks.length === 0) reasons.push("readiness.noMocks");
    else if (mockAvg < WA_PASS_THRESHOLD) reasons.push("readiness.lowMockScores");
    else if (passingMocks < READINESS_MIN_PASSING_MOCKS)
      reasons.push("readiness.needMorePassingMocks");
    if (weakCount > 0) reasons.push("readiness.weakCategories");
    if (coverage < LOW_COVERAGE_THRESHOLD) reasons.push("readiness.lowCoverage");
  }

  return { score, level, reasons: reasons.slice(0, 3) };
}
