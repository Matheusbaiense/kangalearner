"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { useLang } from "@/contexts/LangContext";
import { createClient } from "@/lib/supabase/client";

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

  const [selectedState, setSelectedState] = useState<StateCode>("WA");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kl-state-v2") ?? localStorage.getItem("kl-state");
      if (raw && STATE_CODES.includes(raw as StateCode)) {
        setSelectedState(raw as StateCode);
      }
    } catch {
      // localStorage unavailable (SSR guard — this component is "use client" but be safe)
    }
  }, []);

  async function handleStart() {
    const config = { state: selectedState, mode, questions: 30 };

    // Always write to sessionStorage (same-tab flow — authenticated users)
    sessionStorage.setItem("mock-config", JSON.stringify(config));

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Guest: persist config to localStorage so the session page can recover it
      // after login redirects back to /mock-test/session
      try {
        localStorage.setItem("mock-config-saved", JSON.stringify(config));
      } catch { /* noop */ }
      // Redirect to login with return URL
      router.push("/auth/login?redirect=/mock-test/session");
      return;
    }

    router.push("/mock-test/session");
  }

  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        <h1>{s.mockTest}</h1>
        <p className="mock-meta">{STATE_NAMES[selectedState]} · 30 questions · Pass mark: 26/30</p>

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
