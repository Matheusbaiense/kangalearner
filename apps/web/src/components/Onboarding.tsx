"use client";
import { useState, useEffect } from "react";

const KEY = "kl-onboarding-v1";

export function Onboarding() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ state: "", lang: "", level: "" });

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  function done(final: typeof sel) {
    localStorage.setItem(KEY, "1");
    if (final.state) localStorage.setItem("kl-state-v2", final.state);
    if (final.lang) localStorage.setItem("kl-lang", final.lang);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="onboarding-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to KangaLearner"
    >
      <div className="onboarding-card">
        {step === 0 && (
          <>
            <h2>Which state are you studying for?</h2>
            {[
              { key: "WA", label: "Western Australia" },
              { key: "NSW", label: "New South Wales", soon: true },
              { key: "VIC", label: "Victoria", soon: true },
              { key: "QLD", label: "Queensland", soon: true }
            ].map((s) => (
              <button
                key={s.key}
                className={`ob-option${s.soon ? " ob-soon" : ""}`}
                disabled={s.soon}
                onClick={() => {
                  setSel((p) => ({ ...p, state: s.key }));
                  setStep(1);
                }}
              >
                {s.label}
                {s.soon ? " — coming soon" : ""}
              </button>
            ))}
          </>
        )}
        {step === 1 && (
          <>
            <h2>What language do you prefer?</h2>
            {[
              { key: "en", label: "English" },
              { key: "pt", label: "Português" },
              { key: "es", label: "Español" }
            ].map((l) => (
              <button
                key={l.key}
                className="ob-option"
                onClick={() => {
                  setSel((p) => ({ ...p, lang: l.key }));
                  setStep(2);
                }}
              >
                {l.label}
              </button>
            ))}
          </>
        )}
        {step === 2 && (
          <>
            <h2>Where are you in your study?</h2>
            {[
              { key: "new", label: "Just starting out" },
              { key: "mid", label: "I've studied a bit" },
              { key: "ready", label: "Ready to take the test" }
            ].map((l) => (
              <button
                key={l.key}
                className="ob-option"
                onClick={() => {
                  const final = { ...sel, level: l.key };
                  setSel(final);
                  done(final);
                }}
              >
                {l.label}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
