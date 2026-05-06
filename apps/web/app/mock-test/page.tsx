"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";

type MockMode = "practice" | "exam";

export default function MockTestSetupPage() {
  const [mode, setMode] = useState<MockMode>("practice");
  const router = useRouter();

  function handleStart() {
    sessionStorage.setItem("mock-config", JSON.stringify({ state: "WA", mode, questions: 30 }));
    router.push("/mock-test/session");
  }

  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        <h1>Mock Test</h1>
        <p className="mock-meta">Western Australia · 30 questions · Pass mark: 26/30</p>

        <h2>Choose your mode</h2>

        <button
          className={`mock-mode-option ${mode === "practice" ? "active" : ""}`}
          onClick={() => setMode("practice")}
          type="button"
        >
          <span className="mode-icon">
            <IconBadge icon={Icons.book} tone="brand" size="md" />
          </span>
          <div>
            <strong>Practice Mock</strong>
            <span>Explanation shown after each answer. Best for learning.</span>
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
            <strong>Exam Mode</strong>
            <span>No feedback until the end. Simulates the real test.</span>
          </div>
        </button>

        <button className="btn btn-primary btn-full" onClick={handleStart} type="button">
          Start Mock Test →
        </button>
      </div>
    </main>
  );
}
