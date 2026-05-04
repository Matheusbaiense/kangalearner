"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MockConfig = {
  state: string;
  mode: string;
  questions: number;
};

export default function MockTestSessionPage() {
  const [raw, setRaw] = useState<string | null>(null);

  useEffect(() => {
    try {
      setRaw(sessionStorage.getItem("mock-config"));
    } catch {
      setRaw(null);
    }
  }, []);

  const cfg = useMemo<MockConfig | null>(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as MockConfig;
    } catch {
      return null;
    }
  }, [raw]);

  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        <h1>Session in progress — coming soon</h1>
        <p className="mock-meta">
          {cfg ? `${cfg.state} · ${cfg.questions} questions · mode: ${cfg.mode}` : "No mock config found."}
        </p>
        <Link href="/mock-test" className="btn btn-secondary">
          Back to setup
        </Link>
      </div>
    </main>
  );
}

