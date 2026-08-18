"use client";

import { useEffect, useRef } from "react";
import { syncGuestProgress } from "@/lib/syncGuestProgress";

/** Runs once per browser session after login (covers OAuth users who skip /login). */
export function MigrateLocalProgress() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    void syncGuestProgress();
  }, []);

  return null;
}
