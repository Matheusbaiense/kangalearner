"use client";

import { useEffect, useRef } from "react";
import { syncLocalProgressToSupabase } from "../lib/sync-local-progress";

const SESSION_FLAG = "kanga-local-migration-done";

/** Runs once per browser session after login (covers OAuth users who skip /login). */
export function MigrateLocalProgress() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_FLAG)) return;

    void syncLocalProgressToSupabase().then((ok) => {
      if (ok) sessionStorage.setItem(SESSION_FLAG, "1");
    });
  }, []);

  return null;
}
