"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EMPTY_PROGRESS,
  awardXp,
  readProgress,
  type GameProgress
} from "@/lib/gamification/progress";

/**
 * Client-side gamification state (guest-first). Reads localStorage on mount
 * (deterministic SSR value avoids hydration mismatch) and exposes `award`.
 */
export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setReady(true);
  }, []);

  const award = useCallback((xp: number) => {
    setProgress(awardXp(xp));
  }, []);

  return { progress, award, ready };
}
