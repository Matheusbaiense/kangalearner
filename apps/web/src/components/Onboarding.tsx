"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SK } from "@/lib/storageKeys";

const KEY = "kl-onboarding-v1";

const SUPPRESS_PATHS = ["/auth/", "/login", "/signup", "/forgot-password", "/reset-password"];

const STATES = [
  { key: "WA", label: "Western Australia" },
  { key: "NSW", label: "New South Wales", soon: true },
  { key: "VIC", label: "Victoria", soon: true },
  { key: "QLD", label: "Queensland", soon: true },
];

const LANGS = [
  { key: "en", label: "English" },
  { key: "pt", label: "Português" },
  { key: "es", label: "Español" },
];

const GO_LABEL: Record<string, string> = { en: "Let's go!", pt: "Vamos!", es: "¡Vamos!" };

export function Onboarding() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState("WA");
  const [lang, setLang] = useState("en");

  const isAuthRoute = SUPPRESS_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (isAuthRoute) return;
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, [isAuthRoute]);

  function done() {
    localStorage.setItem(KEY, "1");
    localStorage.setItem(SK.stateV2, state);
    localStorage.setItem(SK.lang, lang);
    setVisible(false);
  }

  if (!visible || isAuthRoute) return null;

  return (
    <div
      className="onboarding-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to KangaLearner"
    >
      <div className="onboarding-card">
        <h2>Welcome to KangaLearner 🦘</h2>
        <p className="ob-sub">Quick setup — takes 5 seconds.</p>

        <div className="ob-group">
          <p className="ob-group-label">I&apos;m studying for:</p>
          <div className="ob-option-row">
            {STATES.map((s) => (
              <button
                key={s.key}
                className={`ob-option${s.soon ? " ob-soon" : ""}${state === s.key ? " ob-selected" : ""}`}
                disabled={s.soon}
                onClick={() => setState(s.key)}
                type="button"
              >
                {s.label}
                {s.soon ? <span className="ob-soon-badge">soon</span> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="ob-group">
          <p className="ob-group-label">Study in:</p>
          <div className="ob-option-row">
            {LANGS.map((l) => (
              <button
                key={l.key}
                className={`ob-option${lang === l.key ? " ob-selected" : ""}`}
                onClick={() => setLang(l.key)}
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
    </div>
  );
}
