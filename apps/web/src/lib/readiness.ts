/**
 * Readiness — derive a simple "how ready am I" picture from the locally stored
 * answers, plus the single next-best action. Pure functions (no storage, no React)
 * so they're easy to test and reuse on the dashboard later.
 */

export interface AnsweredEntry {
  correct: boolean;
}
export type AnsweredMap = Record<string, AnsweredEntry>;

/** Minimal shape we need from a question. */
export interface ReadinessQuestion {
  id: string;
  cat: string;
}

export interface CategoryReadiness {
  cat: string;
  answered: number;
  correct: number;
  accuracy: number; // 0..100
}

export interface Readiness {
  answeredCount: number;
  theoryPct: number; // overall accuracy 0..100
  coveragePct: number; // % of categories with ≥1 answer
  /** Weakest category with enough data to act on, or null. */
  weakest: CategoryReadiness | null;
  /** Categories never attempted (to encourage breadth). */
  untouchedCats: string[];
  perCategory: CategoryReadiness[];
}

const MIN_ATTEMPTS_FOR_WEAKEST = 3;

export function computeReadiness(answered: AnsweredMap, questions: ReadinessQuestion[]): Readiness {
  const catOf = new Map<string, string>();
  const allCats = new Set<string>();
  for (const q of questions) {
    catOf.set(q.id, q.cat);
    allCats.add(q.cat);
  }

  const stats = new Map<string, { answered: number; correct: number }>();
  let answeredCount = 0;
  let correctCount = 0;

  for (const [id, entry] of Object.entries(answered)) {
    const cat = catOf.get(id);
    if (!cat) continue;
    answeredCount++;
    if (entry.correct) correctCount++;
    const s = stats.get(cat) ?? { answered: 0, correct: 0 };
    s.answered++;
    if (entry.correct) s.correct++;
    stats.set(cat, s);
  }

  const perCategory: CategoryReadiness[] = [...stats.entries()].map(([cat, s]) => ({
    cat,
    answered: s.answered,
    correct: s.correct,
    accuracy: s.answered > 0 ? Math.round((s.correct / s.answered) * 100) : 0
  }));

  const eligible = perCategory.filter((c) => c.answered >= MIN_ATTEMPTS_FOR_WEAKEST);
  const weakest =
    eligible.length > 0 ? eligible.reduce((lo, c) => (c.accuracy < lo.accuracy ? c : lo)) : null;

  const untouchedCats = [...allCats].filter((c) => !stats.has(c));

  return {
    answeredCount,
    theoryPct: answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0,
    coveragePct: allCats.size > 0 ? Math.round((stats.size / allCats.size) * 100) : 0,
    weakest,
    untouchedCats,
    perCategory: perCategory.sort((a, b) => a.accuracy - b.accuracy)
  };
}

export type NextActionKind = "start" | "broaden" | "weak" | "mock";

export interface NextAction {
  kind: NextActionKind;
  /** Category to target (for "weak"/"broaden"), if any. */
  category?: string;
}

/**
 * The single next-best action:
 * - nothing answered yet → start practising
 * - a weak category with enough data → drill it
 * - untouched categories remain → broaden coverage
 * - otherwise (broad + decent) → take a mock test
 */
export function nextBestAction(r: Readiness): NextAction {
  if (r.answeredCount === 0) return { kind: "start" };
  if (r.weakest && r.weakest.accuracy < 80) return { kind: "weak", category: r.weakest.cat };
  if (r.untouchedCats.length > 0) return { kind: "broaden", category: r.untouchedCats[0] };
  return { kind: "mock" };
}
