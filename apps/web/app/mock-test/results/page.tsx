/* eslint-disable react/no-danger */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QUESTIONS } from "@kanga/core";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import { AuthNudge } from "@/components/ui/AuthNudge";
import type { UiLang } from "@/lib/i18n";
import type { MockConfig, MockSession } from "@/types/mock";

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function tx(obj: Record<string, string> | null | undefined, lang: UiLang): string {
  if (!obj) return "";
  return obj[lang] ?? obj.en ?? "";
}

const RESULT_MSG = {
  pass: {
    en: "Well done! You passed the mock test.",
    pt: "Parabéns! Você passou no simulado.",
    es: "¡Felicidades! Pasaste el simulacro.",
  },
  fail: {
    en: "Keep practising — you need 80% to pass. Review wrong answers below.",
    pt: "Continue praticando — você precisa de 80% para passar. Revise as respostas erradas abaixo.",
    es: "Sigue practicando — necesitas 80% para aprobar. Revisa las respuestas incorrectas abajo.",
  },
};

const TRY_AGAIN = { en: "Try again", pt: "Tentar de novo", es: "Intentar de nuevo" };
const NEW_TEST = { en: "New mock test", pt: "Novo simulado", es: "Nuevo simulacro" };
const CONTINUE = { en: "Continue practice →", pt: "Continuar praticando →", es: "Continuar practicando →" };
const YOUR_ANSWER = { en: "Your answer:", pt: "Sua resposta:", es: "Tu respuesta:" };
const CORRECT_ANSWER = { en: "Correct:", pt: "Correto:", es: "Correcto:" };
const EXPLANATION = { en: "Explanation", pt: "Explicação", es: "Explicación" };
const REVIEW = { en: "Review wrong answers", pt: "Revisar respostas erradas", es: "Revisar respuestas incorrectas" };
const PERFECT = { en: "Perfect score — no mistakes to review.", pt: "Pontuação perfeita — sem erros para revisar.", es: "Puntuación perfecta — sin errores para revisar." };

export default function MockTestResultsPage() {
  const [raw, setRaw] = useState<string | null>(null);
  const { uiLang: lang, isBilingual: bilingual, s } = useLang();

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

  /* Save to Supabase (once) */
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
        source: "web",
      }),
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then((r) => (r.ok ? r.json().catch(() => null) : null))
      .then((j) => {
        if (!j?.ok) return;
        const next: MockSession = { ...session, postedAtIso: new Date().toISOString() };
        try {
          const nextRaw = JSON.stringify(next);
          sessionStorage.setItem("mock-session", nextRaw);
          setRaw(nextRaw);
        } catch {}
      })
      .catch(() => {})
      .finally(() => ctrl?.abort());
  }, [session, scored]);

  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        {!session || !scored ? (
          <>
            <h1>{s.mockTest}</h1>
            <p className="mock-meta">No results found for this session.</p>
            <Link href="/mock-test" className="btn btn-secondary">
              ← {s.mockTest}
            </Link>
          </>
        ) : (
          <>
            <div
              className="mock-meta"
              style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}
            >
              <span>
                {session.cfg.state} ·{" "}
                {session.cfg.mode === "exam" ? s.examMode : s.practiceMode}
              </span>
              <span>{scored.pct}%</span>
            </div>

            <h1 style={{ marginTop: 10 }}>
              {scored.pass ? s.pass : s.fail} — {scored.score}/{scored.total}
            </h1>

            <p
              className="mock-meta"
              style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 6 }}
            >
              {scored.pass ? (
                <Icons.success width={18} height={18} aria-hidden style={{ color: "var(--green)" }} />
              ) : (
                <Icons.error width={18} height={18} aria-hidden style={{ color: "var(--red)" }} />
              )}
              {scored.pass ? RESULT_MSG.pass[lang] : RESULT_MSG.fail[lang]}
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <Link href="/practice" className="dash-cta">
                {CONTINUE[lang]}
              </Link>
              <Link href="/mock-test" className="btn btn-secondary">
                {NEW_TEST[lang]}
              </Link>
              <Link href="/dashboard" className="btn btn-secondary">
                {s.dashboard}
              </Link>
            </div>

            <AuthNudge />

            {/* Wrong answer review */}
            <div className="dash-section" style={{ marginTop: 26 }}>
              <p className="dash-section-title">{REVIEW[lang]}</p>
              {scored.rows.filter((r) => !r.ok).length === 0 ? (
                <div className="dash-empty">{PERFECT[lang]}</div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {scored.rows
                    .filter((r) => !r.ok)
                    .slice(0, 10)
                    .map((r) => (
                      <div
                        key={r.qid}
                        style={{ padding: 12, borderRadius: 12, background: "rgba(15, 23, 42, 0.04)" }}
                      >
                        <div style={{ fontWeight: 800, marginBottom: 4 }}>
                          {tx(r.q?.q, lang)}
                        </div>
                        {bilingual && r.q?.q?.en && tx(r.q?.q, lang) !== r.q.q.en && (
                          <div style={{ fontSize: ".78rem", opacity: 0.55, fontStyle: "italic", marginBottom: 8 }}>
                            {r.q.q.en}
                          </div>
                        )}
                        <div style={{ display: "grid", gap: 4, fontSize: ".9rem" }}>
                          <div>
                            {YOUR_ANSWER[lang]}{" "}
                            <strong>{r.chosen ?? "—"}</strong>{" "}
                            <span style={{ opacity: 0.8 }}>
                              {tx(r.q?.opts?.find((o: any) => o?.l === r.chosen)?.t, lang)}
                            </span>
                          </div>
                          <div>
                            {CORRECT_ANSWER[lang]}{" "}
                            <strong>{r.correct ?? "—"}</strong>{" "}
                            <span style={{ opacity: 0.8 }}>
                              {tx(r.q?.opts?.find((o: any) => o?.l === r.correct)?.t, lang)}
                            </span>
                          </div>
                        </div>
                        {r.q?.exp && (
                          <div style={{ marginTop: 10 }}>
                            <div style={{ fontWeight: 800, marginBottom: 6 }}>{EXPLANATION[lang]}</div>
                            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(tx(r.q.exp, lang)) }} />
                            {bilingual && r.q.exp?.en && tx(r.q.exp, lang) !== r.q.exp.en && (
                              <div
                                style={{ marginTop: 6, opacity: 0.55, fontSize: ".8rem", fontStyle: "italic" }}
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(r.q.exp.en) }}
                              />
                            )}
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
