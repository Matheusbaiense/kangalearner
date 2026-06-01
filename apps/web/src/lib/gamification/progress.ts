/**
 * Guest-first gamification — streak, XP, level, daily goal.
 * Stolen from Duolingo (streak + daily goal) and Zutobi (XP/level), but kept FREE
 * and client-side (localStorage). When prod is aligned, migration `007`
 * (user_xp/xp_events/user_badges) persists this cross-device — the shapes match.
 *
 * Pure, deterministic functions + a thin localStorage wrapper. No React here.
 */

export const XP_PER_CORRECT = 10;
export const XP_PER_MOCK_PASS = 100;
export const XP_PER_MOCK_COMPLETE = 30;
export const DAILY_GOAL_XP = 50;

/** Level thresholds (cumulative XP). Index = level - 1. */
const LEVEL_TITLES = [
  "Learner Driver",
  "Road Ready",
  "Confident Driver",
  "Road Rules Pro",
  "WA Road Master"
] as const;

const LEVEL_STEP_XP = 500;

export interface GameProgress {
  totalXp: number;
  streakDays: number;
  /** ISO date (YYYY-MM-DD) of the last day XP was earned */
  lastActivityDate: string | null;
  /** XP earned on `todayDate` — resets each day */
  todayXp: number;
  todayDate: string | null;
}

export const EMPTY_PROGRESS: GameProgress = {
  totalXp: 0,
  streakDays: 0,
  lastActivityDate: null,
  todayXp: 0,
  todayDate: null
};

const STORAGE_KEY = "kl-game-progress-v1";

export function isoToday(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const ms = Date.parse(b) - Date.parse(a);
  return Math.round(ms / 86_400_000);
}

export function levelFromXp(totalXp: number): { level: number; title: string } {
  const level = Math.min(LEVEL_TITLES.length, Math.floor(totalXp / LEVEL_STEP_XP) + 1);
  return { level, title: LEVEL_TITLES[level - 1] };
}

/** XP needed to reach the next level (0 if already max). */
export function xpToNextLevel(totalXp: number): number {
  const nextThreshold = Math.floor(totalXp / LEVEL_STEP_XP + 1) * LEVEL_STEP_XP;
  if (levelFromXp(totalXp).level >= LEVEL_TITLES.length) return 0;
  return nextThreshold - totalXp;
}

/**
 * Pure reducer: apply earned XP to a progress state for a given day.
 * - same day → accumulate todayXp, streak unchanged
 * - exactly next day → streak + 1, reset todayXp
 * - gap > 1 day (or first ever) → streak resets to 1, reset todayXp
 */
export function applyXp(prev: GameProgress, xp: number, today: string = isoToday()): GameProgress {
  if (xp <= 0) return prev;

  let streakDays: number;
  if (prev.lastActivityDate === null) {
    streakDays = 1;
  } else {
    const gap = daysBetween(prev.lastActivityDate, today);
    if (gap === 0) streakDays = prev.streakDays || 1;
    else if (gap === 1) streakDays = prev.streakDays + 1;
    else streakDays = 1;
  }

  const todayXp = prev.todayDate === today ? prev.todayXp + xp : xp;

  return {
    totalXp: prev.totalXp + xp,
    streakDays,
    lastActivityDate: today,
    todayXp,
    todayDate: today
  };
}

/** Normalise a loaded state so `todayXp` is 0 when the stored day isn't today. */
export function normaliseForToday(p: GameProgress, today: string = isoToday()): GameProgress {
  if (p.todayDate === today) return p;
  return { ...p, todayXp: 0, todayDate: today };
}

export function readProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<GameProgress>;
    return normaliseForToday({ ...EMPTY_PROGRESS, ...parsed });
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function writeProgress(p: GameProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* noop */
  }
}

/** Award XP and persist. Returns the new state for the UI. */
export function awardXp(xp: number): GameProgress {
  const next = applyXp(readProgress(), xp);
  writeProgress(next);
  return next;
}
