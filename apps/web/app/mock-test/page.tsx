"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { useLang } from "@/contexts/LangContext";

type MockMode = "practice" | "exam";

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

  function handleStart() {
    sessionStorage.setItem("mock-config", JSON.stringify({ state: "WA", mode, questions: 30 }));
    router.push("/mock-test/session");
  }

  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        <h1>{s.mockTest}</h1>
        <p className="mock-meta">Western Australia · 30 questions · Pass mark: 26/30</p>

        <h2 style={{ marginTop: 20, marginBottom: 12, fontSize: "1rem", fontWeight: 700 }}>
          {s.studyMode}
        </h2>

        <button
          className={`mock-mode-option ${mode === "practice" ? "active" : ""}`}
          onClick={() => setMode("practice")}
          type="button"
        >
          <span className="mode-icon">
            <IconBadge icon={Icons.book} tone="brand" size="md" />
          </span>
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
          <span className="mode-icon">
            <IconBadge icon={Icons.timer} tone="brand" size="md" />
          </span>
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
