"use client";
import { applyStateTokens, type StateProfile } from "@kanga/core";
import { useLang } from "@/contexts/LangContext";
import { tx, type UiLang } from "./i18n";
import { useStateProfile } from "./stateSelection";

type Localized = Record<UiLang, string>;

/**
 * Resolves localized copy for the selected jurisdiction: picks the UI language,
 * then swaps {state}/{handbook}/{questions}/… for that jurisdiction's facts.
 * `t` takes a per-language record; `ts` takes an already-localized string
 * (e.g. one coming from the i18n UIStrings table).
 */
export function useStateCopy(): {
  profile: StateProfile;
  t: (copy: Localized) => string;
  ts: (text: string) => string;
} {
  const { uiLang, s } = useLang();
  const profile = useStateProfile();
  const extra = { sectionNote: profile.sectioned ? s.learnSectionedNote : "" };

  return {
    profile,
    t: (copy: Localized) => applyStateTokens(tx(copy, uiLang), profile, extra),
    ts: (text: string) => applyStateTokens(text, profile, extra)
  };
}
