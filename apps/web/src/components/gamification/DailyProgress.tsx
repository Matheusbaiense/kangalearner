"use client";

import type { UiLang } from "@/lib/i18n";
import { DAILY_GOAL_XP, levelFromXp, type GameProgress } from "@/lib/gamification/progress";

/**
 * Compact gamification display: streak, level + XP, and today's goal ring.
 * Guest-first (reads from `useGameProgress`). Free — the opposite of Zutobi's
 * PLUS-gated stats. Localized inline (EN/PT/ES).
 */

const COPY: Record<
  UiLang,
  { dayStreak: (n: number) => string; level: string; goal: string; goalDone: string }
> = {
  en: {
    dayStreak: (n) => `${n}-day streak`,
    level: "Level",
    goal: "Daily goal",
    goalDone: "Daily goal reached! 🎉"
  },
  pt: {
    dayStreak: (n) => `sequência de ${n} ${n === 1 ? "dia" : "dias"}`,
    level: "Nível",
    goal: "Meta diária",
    goalDone: "Meta diária batida! 🎉"
  },
  es: {
    dayStreak: (n) => `racha de ${n} ${n === 1 ? "día" : "días"}`,
    level: "Nivel",
    goal: "Meta diaria",
    goalDone: "¡Meta diaria alcanzada! 🎉"
  }
};

export function DailyProgress({
  progress,
  lang,
  compact = false
}: {
  progress: GameProgress;
  lang: UiLang;
  compact?: boolean;
}) {
  const c = COPY[lang];
  const { level, title } = levelFromXp(progress.totalXp);
  const goalPct = Math.min(100, Math.round((progress.todayXp / DAILY_GOAL_XP) * 100));
  const goalReached = progress.todayXp >= DAILY_GOAL_XP;

  if (compact) {
    return (
      <span className="game-chip" title={title}>
        <span className="game-chip__streak" aria-hidden>
          🔥
        </span>
        <strong>{progress.streakDays}</strong>
        <span className="game-chip__sep" aria-hidden>
          ·
        </span>
        <span className="game-chip__xp">{progress.totalXp} XP</span>
      </span>
    );
  }

  return (
    <div className="game-card">
      <div className="game-card__row">
        <span className="game-card__streak">
          <span aria-hidden>🔥</span> {c.dayStreak(progress.streakDays)}
        </span>
        <span className="game-card__level">
          {c.level} {level} · <strong>{title}</strong>
        </span>
      </div>
      <div className="game-card__goal">
        <div className="game-card__goal-head">
          <span>{goalReached ? c.goalDone : c.goal}</span>
          <span>
            {progress.todayXp}/{DAILY_GOAL_XP} XP
          </span>
        </div>
        <div className="game-card__track">
          <div
            className="game-card__fill"
            style={{ width: `${goalPct}%` }}
            role="progressbar"
            aria-valuenow={progress.todayXp}
            aria-valuemin={0}
            aria-valuemax={DAILY_GOAL_XP}
          />
        </div>
      </div>
    </div>
  );
}
