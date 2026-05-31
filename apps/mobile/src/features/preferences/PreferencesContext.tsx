import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuStateCode } from "@kanga/core";
import { strings, uiLang, type Lang, type MobileStrings, type UiLang } from "../../lib/i18n";
import {
  loadPreferences,
  savePreferences,
  type MobilePreferences
} from "../../lib/local-store";

type PreferencesContextValue = MobilePreferences & {
  uiLang: UiLang;
  copy: MobileStrings;
  ready: boolean;
  setStateCode: (state: AuStateCode) => void;
  setLang: (lang: Lang) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<MobilePreferences>({ state: "WA", lang: "en" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadPreferences()
      .then((stored) => setPrefs(stored))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) void savePreferences(prefs);
  }, [prefs, ready]);

  const value = useMemo<PreferencesContextValue>(() => {
    const baseLang = uiLang(prefs.lang);
    return {
      ...prefs,
      uiLang: baseLang,
      copy: strings[baseLang],
      ready,
      setStateCode: (state) => setPrefs((current) => ({ ...current, state })),
      setLang: (lang) => setPrefs((current) => ({ ...current, lang }))
    };
  }, [prefs, ready]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}

