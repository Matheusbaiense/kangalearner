"use client";
import { useEffect, useState } from "react";
import { getStateProfile, normalizeAuState, type StateProfile } from "@kanga/core";
import { SK } from "./storageKeys";

export const STATE_CHANGED_EVENT = "kanga:state-changed";

/** App-wide default when nothing is stored yet. */
export const DEFAULT_STATE_CODE = "WA";

export function readStoredState(): string {
  try {
    return (
      normalizeAuState(localStorage.getItem(SK.stateV2)) ??
      normalizeAuState(localStorage.getItem(SK.stateLegacy)) ??
      DEFAULT_STATE_CODE
    );
  } catch {
    return DEFAULT_STATE_CODE;
  }
}

export function persistStoredState(code: string): string {
  const next = normalizeAuState(code) ?? DEFAULT_STATE_CODE;
  try {
    localStorage.setItem(SK.stateV2, next);
    localStorage.setItem(SK.stateLegacy, next);
  } catch {
    /* private mode */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(STATE_CHANGED_EVENT, { detail: next }));
  }
  return next;
}

/**
 * Selected jurisdiction, kept in sync with the nav selector.
 *
 * Starts at the deterministic default so the first client render matches the server
 * HTML (reading localStorage in the initializer causes hydration error #418), then
 * hydrates in the effect below.
 */
export function useStateCode(): string {
  const [code, setCode] = useState<string>(DEFAULT_STATE_CODE);

  useEffect(() => {
    setCode(readStoredState());
    const handler = () => setCode(readStoredState());
    window.addEventListener(STATE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(STATE_CHANGED_EVENT, handler);
  }, []);

  return code;
}

export function useStateProfile(): StateProfile {
  return getStateProfile(useStateCode());
}
