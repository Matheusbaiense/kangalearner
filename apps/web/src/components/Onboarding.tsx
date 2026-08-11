"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SK } from "@/lib/storageKeys";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/i18n";
import { AU_STATE_OPTIONS } from "@kanga/core";

const KEY = "kl-onboarding-v1";

const SUPPRESS_PATHS = [
  "/auth/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/mock-test"
];

const AVAILABLE_STATES = new Set(["WA", "NSW"]);

const STATES = AU_STATE_OPTIONS.map((s) => ({
  key: s.code,
  label: s.name,
  soon: !AVAILABLE_STATES.has(s.code)
}));

const LANGS = [
  { key: "en", label: "English" },
  { key: "pt", label: "Português" },
  { key: "es", label: "Español" },
  { key: "pt-en", label: "Português + EN" },
  { key: "es-en", label: "Español + EN" }
];

// CTA says what it does (saves the choices), not just "go".
const GO_LABEL: Record<string, string> = {
  en: "Save & start",
  pt: "Salvar e começar",
  es: "Guardar y empezar",
  "pt-en": "Salvar e começar",
  "es-en": "Guardar y empezar"
};

export function Onboarding() {
  const pathname = usePathname();
  const { setLang: applyLang } = useLang();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState("WA");
  const [lang, setLang] = useState<Lang>("en");

  const isAuthRoute = SUPPRESS_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (isAuthRoute) return;
    // Only for a genuinely fresh visitor: anyone who already picked a language
    // or state (nav selector, previous session, signup) must never see it again.
    const hasPrefs = localStorage.getItem(SK.lang) || localStorage.getItem(SK.stateV2);
    if (!localStorage.getItem(KEY) && !hasPrefs) setVisible(true);
  }, [isAuthRoute]);

  function done() {
    localStorage.setItem(KEY, "1");
    localStorage.setItem(SK.stateV2, state);
    localStorage.setItem(SK.lang, lang);
    applyLang(lang);
    setVisible(false);
  }

  function dismiss() {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  if (!visible || isAuthRoute) return null;

  return (
    <div className="onboarding-banner" role="dialog" aria-label="Welcome to KangaLearner">
      <div className="ob-banner-inner">
        <div className="ob-banner-text">
          <strong>Welcome 🦘</strong> Pick state & language:
        </div>

        <div className="ob-banner-controls">
          <div className="ob-option-row">
            {STATES.map((s) => (
              <button
                key={s.key}
                className={`ob-option${s.soon ? " ob-soon" : ""}${state === s.key ? " ob-selected" : ""}`}
                disabled={s.soon}
                onClick={() => setState(s.key)}
                type="button"
                title={s.label}
              >
                {s.key}
              </button>
            ))}
          </div>

          <div className="ob-option-row">
            {LANGS.map((l) => (
              <button
                key={l.key}
                className={`ob-option${lang === l.key ? " ob-selected" : ""}`}
                onClick={() => setLang(l.key as Lang)}
                type="button"
              >
                {l.key.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="btn-auth-primary ob-banner-cta"
            onClick={done}
            type="button"
            style={{ height: "32px", fontSize: "0.8rem", padding: "0 14px", marginTop: 0 }}
          >
            {GO_LABEL[lang] ?? "Let's go!"}
          </button>
        </div>
      </div>

      <button className="ob-dismiss-banner" onClick={dismiss} type="button" aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}
