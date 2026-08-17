"use client";
import { applyStateTokens, type StateProfile } from "@kanga/core";
import { useLang } from "@/contexts/LangContext";
import { tx, type UiLang } from "./i18n";
import { useStateProfile } from "./stateSelection";

type Localized = Record<UiLang, string>;

/**
 * Resolves localized copy for the selected jurisdiction: picks the UI language,
 * then swaps {state}/{handbook}/{questions}/… for that jurisdiction's facts.
 */
export function useStateCopy(): { profile: StateProfile; t: (copy: Localized) => string } {
  const { uiLang, s } = useLang();
  const profile = useStateProfile();
  const extra = { sectionNote: profile.sectioned ? s.learnSectionedNote : "" };

  return {
    profile,
    t: (copy: Localized) => applyStateTokens(tx(copy, uiLang), profile, extra)
  };
}
