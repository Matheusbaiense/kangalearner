"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SK } from "@/lib/storageKeys";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/i18n";
import { AU_STATE_OPTIONS } from "@kanga/core";

const KEY = "kl-onboarding-v1";

const SUPPRESS_PATHS = ["/auth/", "/login", "/signup", "/forgot-password", "/reset-password", "/mock-test"];

const STATES = AU_STATE_OPTIONS.map((s) => ({
  key: s.code,
  label: s.name,
  soon: s.code !== "WA",
}));

const LANGS = [
  { key: "en", label: "English" },
  { key: "pt", label: "Português" },
  { key: "es", label: "Español" },
  { key: "pt-en", label: "Português + EN" },
  { key: "es-en", label: "Español + EN" },
];

const GO_LABEL: Record<string, string> = {
  en: "Let's go!",
  pt: "Vamos!",
  es: "¡Vamos!",
  "pt-en": "Vamos!",
  "es-en": "¡Vamos!",
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
    if (!localStorage.getItem(KEY)) setVisible(true);
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
    <div
      className="onboarding-card"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to KangaLearner"
    >
      <button
        className="ob-dismiss"
        onClick={dismiss}
        type="button"
        aria-label="Dismiss"
      >
        ✕
      </button>
      <h2>Welcome to KangaLearner 🦘</h2>
      <p className="ob-sub">Pick your state and language to get started.</p>

      <div className="ob-group">
        <p className="ob-group-label">Your state</p>
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
              {s.soon ? <span className="ob-soon-badge">soon</span> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="ob-group">
        <p className="ob-group-label">Preferred language:</p>
        <div className="ob-option-row">
          {LANGS.map((l) => (
            <button
              key={l.key}
              className={`ob-option${lang === l.key ? " ob-selected" : ""}`}
              onClick={() => setLang(l.key as Lang)}
              type="button"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <button className="ob-cta" onClick={done} type="button">
        {GO_LABEL[lang] ?? "Let's go!"}
      </button>
    </div>
  );
}
