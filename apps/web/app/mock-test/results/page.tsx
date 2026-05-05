/* eslint-disable react/no-danger */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QUESTIONS } from "@kanga/core";

type MockConfig = {
  state: string;
  mode: "practice" | "exam";
  questions: number;
};

type MockSession = {
  cfg: MockConfig;
  startedAtIso: string;
  qids: string[];
  answers: Record<string, string>;
  completedAtIso: string | null;
  postedAtIso?: string | null;
};

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export default function MockTestResultsPage() {
  const [raw, setRaw] = useState<string | null>(null);

  useEffect(() => {
    try {
      setRaw(sessionStorage.getItem("mock-session"));
    } catch {
      setRaw(null);
    }
  }, []);

  const session = useMemo(() => safeParseJson<MockSession>(raw), [raw]);

  const scored = useMemo(() => {
    if (!session) return null;
    const rows = session.qids.map((qid) => {
      const q: any = QUESTIONS.find((x: any) => x.id === qid) ?? null;
      const chosen = session.answers[qid] ?? null;
      const correct = q?.opts?.find((o: any) => o && o.ok)?.l ?? null;
      const ok = chosen && correct ? chosen === correct : false;
      return { qid, q, chosen, correct, ok };
    });
    const total = rows.length;
    const score = rows.filter((r) => r.ok).length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const pass = total > 0 ? score / total >= 0.8 : false;
    return { rows, total, score, pct, pass };
  }, [session]);

  useEffect(() => {
    if (!session || !scored) return;
    if (!session.completedAtIso) return;
    if (session.postedAtIso) return;

    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    fetch("/api/mock-sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        state: session.cfg.state,
        score: scored.score,
        total: scored.total,
        source: "web"
      }),
      signal: ctrl ? ctrl.signal : undefined
    })
      .then((r) => {
        if (!r.ok) return null;
        return r.json().catch(() => null);
      })
      .then((j) => {
        if (!j || !j.ok) return;
        const next: MockSession = { ...session, postedAtIso: new Date().toISOString() };
        try {
          const nextRaw = JSON.stringify(next);
          sessionStorage.setItem("mock-session", nextRaw);
          setRaw(nextRaw);
        } catch {
          // ignore
        }
      })
      .catch(() => {})
      .finally(() => {
        if (ctrl) ctrl.abort();
      });
  }, [session, scored]);

  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        {!session || !scored ? (
          <>
            <h1>Mock Test</h1>
            <p className="mock-meta">No results found for this session.</p>
            <Link href="/mock-test" className="btn btn-secondary">
              Back to setup
            </Link>
          </>
        ) : (
          <>
            <div className="mock-meta" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <span>{session.cfg.state} · {session.cfg.mode === "exam" ? "Exam mode" : "Practice mock"}</span>
              <span>{scored.pct}%</span>
            </div>

            <h1 style={{ marginTop: 10 }}>Your result</h1>
            <p className="mock-meta">
              Score: <strong>{scored.score}/{scored.total}</strong> · {scored.pass ? "Pass ✓" : "Fail"}
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              <Link href="/practice" className="dash-cta">
                Continue practice →
              </Link>
              <Link href="/mock-test" className="btn btn-secondary">
                New mock test
              </Link>
            </div>

            <div className="dash-section" style={{ marginTop: 26 }}>
              <p className="dash-section-title">Review</p>
              {scored.rows.filter((r) => !r.ok).length === 0 ? (
                <div className="dash-empty">Perfect score — no mistakes to review.</div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {scored.rows
                    .filter((r) => !r.ok)
                    .slice(0, 10)
                    .map((r) => (
                      <div key={r.qid} style={{ padding: 12, borderRadius: 12, background: "rgba(15, 23, 42, 0.04)" }}>
                        <div style={{ fontWeight: 800, marginBottom: 6 }}>{r.q?.q?.en ?? r.qid}</div>
                        <div style={{ display: "grid", gap: 4, fontSize: ".95rem" }}>
                          <div>
                            Your answer: <strong>{r.chosen ?? "—"}</strong>{" "}
                            <span style={{ opacity: 0.8 }}>{r.q?.opts?.find((o: any) => o?.l === r.chosen)?.t?.en ?? ""}</span>
                          </div>
                          <div>
                            Correct: <strong>{r.correct ?? "—"}</strong>{" "}
                            <span style={{ opacity: 0.8 }}>{r.q?.opts?.find((o: any) => o?.l === r.correct)?.t?.en ?? ""}</span>
                          </div>
                        </div>
                        {r.q?.exp?.en && (
                          <div style={{ marginTop: 10 }}>
                            <div style={{ fontWeight: 800, marginBottom: 6 }}>Explanation</div>
                            <div dangerouslySetInnerHTML={{ __html: r.q.exp.en }} />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
