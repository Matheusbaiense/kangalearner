"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { useLang } from "@/contexts/LangContext";
import {
  applyStateTokens,
  stateHasMotorcycleLicence,
  WA_PASS_MIN_CORRECT,
  WA_TOTAL_QUESTIONS
} from "@kanga/core";
import { createClient } from "@/lib/supabase/client";
import { useStateProfile } from "@/lib/stateSelection";
import {
  readStoredLicenceType,
  persistLicenceType,
  LICENCE_CHANGED_EVENT,
  type LicenceType
} from "@/lib/licenceType";

type MockMode = "practice" | "exam";

const MOCK_PASS_PCT = Math.round((WA_PASS_MIN_CORRECT / WA_TOTAL_QUESTIONS) * 100);

const PRACTICE_DESC = {
  en: "Explanation shown after each answer. Best for learning.",
  pt: "Explicação exibida após cada resposta. Melhor para aprender.",
  es: "Explicación mostrada después de cada respuesta. Mejor para aprender."
};
const EXAM_DESC = {
  en: "No feedback until the end. Simulates the real test.",
  pt: "Sem feedback até o final. Simula o teste real.",
  es: "Sin retroalimentación hasta el final. Simula el examen real."
};

export function MockTestClient() {
  const [mode, setMode] = useState<MockMode>("practice");
  const router = useRouter();
  const { uiLang: lang, s } = useLang();

  // Hydration-safe: starts at the default jurisdiction and syncs with the nav selector.
  const profile = useStateProfile();
  const selectedState = profile.code;

  const [licenceType, setLicenceType] = useState<LicenceType>("car");

  useEffect(() => {
    setLicenceType(readStoredLicenceType());
  }, []);

  // Stay in sync if licence type changes elsewhere (nav selector, onboarding) while this page is open.
  useEffect(() => {
    const onLicenceChanged = () => setLicenceType(readStoredLicenceType());
    window.addEventListener(LICENCE_CHANGED_EVENT, onLicenceChanged);
    return () => window.removeEventListener(LICENCE_CHANGED_EVENT, onLicenceChanged);
  }, []);

  // Motorcycle has no official online test in some states — fall back to car
  // whenever the selected state (nav selector included) does not offer it.
  useEffect(() => {
    if (!stateHasMotorcycleLicence(selectedState)) {
      setLicenceType((prev) => (prev === "motorcycle" ? "car" : prev));
    }
  }, [selectedState]);

  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  function handleLicenceTypeChange(next: LicenceType) {
    setLicenceType(next);
    persistLicenceType(next);
  }

  async function handleStart() {
    const config = { state: selectedState, mode, questions: 30, licenceType };

    // Always write to sessionStorage (same-tab flow, authenticated users)
    sessionStorage.setItem("mock-config", JSON.stringify(config));

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      // Guest: show value-prop prompt instead of immediate redirect
      try {
        localStorage.setItem("mock-config-saved", JSON.stringify(config));
      } catch {
        /* noop */
      }
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
        <div
          className="guest-prompt-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={s.mockGuestTitle}
        >
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
              <button type="button" className="btn btn-ghost" onClick={handleContinueAsGuest}>
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
          {profile.name} · {WA_TOTAL_QUESTIONS} {s.questionsWord} · {s.passMarkWord}:{" "}
          {WA_PASS_MIN_CORRECT}/{WA_TOTAL_QUESTIONS} ({MOCK_PASS_PCT}%)
        </p>
        <p className="mock-meta" style={{ fontSize: ".8rem", opacity: 0.8 }}>
          {applyStateTokens(s.mockRealExamNote, profile)}
        </p>

        <h2 style={{ marginTop: 20, marginBottom: 12, fontSize: "1rem", fontWeight: 700 }}>
          {s.vehicleType}
        </h2>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button
            className={`mock-mode-option ${licenceType === "car" ? "active" : ""}`}
            onClick={() => handleLicenceTypeChange("car")}
            type="button"
            style={{ flex: 1 }}
          >
            <IconBadge icon={Icons.car} tone="brand" size="md" />
            <div>
              <strong>{s.carLicence}</strong>
            </div>
          </button>

          {stateHasMotorcycleLicence(selectedState) && (
            <button
              className={`mock-mode-option ${licenceType === "motorcycle" ? "active" : ""}`}
              onClick={() => handleLicenceTypeChange("motorcycle")}
              type="button"
              style={{ flex: 1 }}
            >
              <IconBadge icon={Icons.motorcycle} tone="brand" size="md" />
              <div>
                <strong>{s.motorcycleLicence}</strong>
              </div>
            </button>
          )}
        </div>

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
