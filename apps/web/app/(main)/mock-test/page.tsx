"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { useLang } from "@/contexts/LangContext";
import { WA_PASS_MIN_CORRECT } from "@kanga/core";
import { createClient } from "@/lib/supabase/client";
import { SK } from "@/lib/storageKeys";

type MockMode = "practice" | "exam";

type StateCode = "WA" | "NSW" | "VIC" | "QLD" | "SA" | "TAS" | "ACT" | "NT";

const STATE_NAMES: Record<StateCode, string> = {
  WA:  "Western Australia",
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  SA:  "South Australia",
  TAS: "Tasmania",
  ACT: "Australian Capital Territory",
  NT:  "Northern Territory",
};

const STATE_CODES = Object.keys(STATE_NAMES) as StateCode[];

const PRACTICE_DESC = {
  en: "Explanation shown after each answer. Best for learning.",
  pt: "Explicação exibida após cada resposta. Melhor para aprender.",
  es: "Explicación mostrada después de cada respuesta. Mejor para aprender.",
};
const EXAM_DESC = {
  en: "No feedback until the end. Simulates the real test.",
  pt: "Sem feedback até o final. Simula o teste real.",
  es: "Sin retroalimentación hasta el final. Simula el examen real.",
};

export default function MockTestSetupPage() {
  const [mode, setMode] = useState<MockMode>("practice");
  const router = useRouter();
  const { uiLang: lang, s } = useLang();

  const [selectedState, setSelectedState] = useState<StateCode>(() => {
    if (typeof window === "undefined") return "WA";
    try {
      const raw = localStorage.getItem(SK.stateV2) ?? localStorage.getItem(SK.stateLegacy);
      if (raw && STATE_CODES.includes(raw as StateCode)) return raw as StateCode;
    } catch {
      // localStorage unavailable
    }
    return "WA";
  });

  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  async function handleStart() {
    const config = { state: selectedState, mode, questions: 30 };

    // Always write to sessionStorage (same-tab flow — authenticated users)
    sessionStorage.setItem("mock-config", JSON.stringify(config));

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Guest: show value-prop prompt instead of immediate redirect
      try {
        localStorage.setItem("mock-config-saved", JSON.stringify(config));
      } catch { /* noop */ }
      setShowGuestPrompt(true);
      return;
    }

    router.push("/mock-test/session");
  }

  function handleContinueAsGuest() {
    router.push("/mock-test/session");
  }

  return (
    <main className="container section-pad">
      {showGuestPrompt && (
        <div className="guest-prompt-overlay" role="dialog" aria-modal="true" aria-label={s.mockGuestTitle}>
          <div className="guest-prompt-card">
            <h3>{s.mockGuestTitle}</h3>
            <p>{s.mockGuestSub}</p>
            <div className="guest-prompt-actions">
              <a href="/auth/signup?redirect=/mock-test/session" className="btn btn-primary">
                {s.mockGuestBannerCta}
              </a>
              <a href="/auth/login?redirect=/mock-test/session" className="btn btn-ghost-light">
                {s.mockGuestSignIn}
              </a>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleContinueAsGuest}
              >
                {s.mockGuestContinue}
              </button>
            </div>
            <button
              type="button"
              className="guest-prompt-dismiss"
              aria-label="Dismiss"
              onClick={() => setShowGuestPrompt(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="mock-setup-card">
        <h1>{s.mockTest}</h1>
        <p className="mock-meta">
          {STATE_NAMES[selectedState]} · 30 questions · Pass mark: {WA_PASS_MIN_CORRECT}/30 (80%)
        </p>

        <h2 style={{ marginTop: 20, marginBottom: 12, fontSize: "1rem", fontWeight: 700 }}>
          {s.studyMode}
        </h2>

        <button
          className={`mock-mode-option ${mode === "practice" ? "active" : ""}`}
          onClick={() => setMode("practice")}
          type="button"
        >
          <IconBadge icon={Icons.book} tone="brand" size="md" />
          <div>
            <strong>{s.practiceMode}</strong>
            <span>{PRACTICE_DESC[lang]}</span>
          </div>
        </button>

        <button
          className={`mock-mode-option ${mode === "exam" ? "active" : ""}`}
          onClick={() => setMode("exam")}
          type="button"
        >
          <IconBadge icon={Icons.timer} tone="brand" size="md" />
          <div>
            <strong>{s.examMode}</strong>
            <span>{EXAM_DESC[lang]}</span>
          </div>
        </button>

        <button className="btn btn-primary btn-full" onClick={handleStart} type="button">
          {s.startMockTest} →
        </button>
      </div>
    </main>
  );
}
