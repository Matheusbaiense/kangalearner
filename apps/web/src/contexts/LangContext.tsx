"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  t,
  type Lang,
  type UiLang,
  type UIStrings,
  getUiLang,
  isBilingualLang,
  VALID_LANGS,
} from "@/lib/i18n";
import { SK } from "@/lib/storageKeys";

// Map bilingual modes to primary language for the lang attribute
const LANG_TO_HTML: Record<string, string> = {
  en: "en",
  pt: "pt",
  "pt-en": "pt",
  es: "es",
  "es-en": "es",
};

interface LangContextValue {
  lang: Lang;          // full code e.g. "pt-en"
  uiLang: UiLang;      // base UI lang e.g. "pt"
  isBilingual: boolean; // true when English subtitles should appear in questions
  setLang: (l: Lang) => void;
  s: UIStrings;        // translated UI strings
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  uiLang: "en",
  isBilingual: false,
  setLang: () => {},
  s: t.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // Read saved lang from localStorage on mount
    try {
      const saved = localStorage.getItem(SK.lang) as Lang | null;
      if (saved && VALID_LANGS.includes(saved)) setLangState(saved);
    } catch {}

    // Listen for same-tab lang changes dispatched by SiteNav
    const handler = (e: Event) => {
      const l = (e as CustomEvent<string>).detail as Lang;
      if (VALID_LANGS.includes(l)) setLangState(l);
    };
    window.addEventListener("kl-lang-change", handler);
    return () => window.removeEventListener("kl-lang-change", handler);
  }, []);

  useEffect(() => {
    document.documentElement.lang = LANG_TO_HTML[lang] ?? "en";
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      localStorage.setItem(SK.lang, l);
      window.dispatchEvent(new CustomEvent("kl-lang-change", { detail: l }));
    } catch {}
  }

  const uiLang = getUiLang(lang);
  const isBilingual = isBilingualLang(lang);

  return (
    <LangContext.Provider
      value={{ lang, uiLang, isBilingual, setLang, s: t[uiLang] as UIStrings }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
