/* eslint-disable react/no-danger */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { computeReadiness, WA_PASS_THRESHOLD } from "@kanga/core";
import { useQuestions } from "@/hooks/useQuestions";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { Icons } from "@/components/icons";
import { Kanga } from "@/components/brand/Kanga";
import { useLang } from "@/contexts/LangContext";
import { AuthNudge } from "@/components/ui/AuthNudge";
import { ReadinessCard } from "@/components/ReadinessCard";
import { createClient } from "@/lib/supabase/client";
import { SK } from "@/lib/storageKeys";
import { safeParseJson } from "@/lib/safeParseJson";
import { tx, type UiLang } from "@/lib/i18n";
import type { MockConfig, MockSession } from "@/types/mock";
import { awardXp, XP_PER_MOCK_PASS, XP_PER_MOCK_COMPLETE } from "@/lib/gamification/progress";

type LocalAnswerRecord = Record<string, { chosen: string; correct: boolean }>;

const RESULT_MSG = {
  pass: {
    en: "Well done! You passed the mock test.",
    pt: "Parabéns! Você passou no simulado.",
    es: "¡Felicidades! Pasaste el simulacro."
  },
  fail: {
    en: "Keep practising, you need 80% to pass. Review wrong answers below.",
    pt: "Continue praticando, você precisa de 80% para passar. Revise as respostas erradas abaixo.",
    es: "Sigue practicando, necesitas 80% para aprobar. Revisa las respuestas incorrectas abajo."
  }
};

const TRY_AGAIN = { en: "Try again", pt: "Tentar de novo", es: "Intentar de nuevo" };
const NEW_TEST = { en: "New mock test", pt: "Novo simulado", es: "Nuevo simulacro" };
const CONTINUE = {
  en: "Continue practice →",
  pt: "Continuar praticando →",
  es: "Continuar practicando →"
};
const YOUR_ANSWER = { en: "Your answer:", pt: "Sua resposta:", es: "Tu respuesta:" };
const CORRECT_ANSWER = { en: "Correct:", pt: "Correto:", es: "Correcto:" };
const EXPLANATION = { en: "Explanation", pt: "Explicação", es: "Explicación" };
const REVIEW = {
  en: "Review wrong answers",
  pt: "Revisar respostas erradas",
  es: "Revisar respuestas incorrectas"
};
const PERFECT = {
  en: "Perfect score, no mistakes to review.",
  pt: "Pontuação perfeita, sem erros para revisar.",
  es: "Puntuación perfecta, sin errores para revisar."
};

export default function MockTestResultsPage() {
  const { questions: QUESTIONS, loading: questionsLoading } = useQuestions();
  const [raw, setRaw] = useState<string | null>(null);
  const { uiLang: lang, isBilingual: bilingual, s } = useLang();

  useEffect(() => {
    try {
      setRaw(sessionStorage.getItem("mock-session"));
    } catch {
      setRaw(null);
    }
  }, []);

  const session = useMemo(() => safeParseJson<MockSession | null>(raw, null), [raw]);

  const scored = useMemo(() => {
    if (!session || questionsLoading) return null;
    const rows = session.qids.map((qid) => {
      const q = QUESTIONS.find((x) => x.id === qid) ?? null;
      const chosen = session.answers[qid] ?? null;
      const correct = q?.opts?.find((o) => o.ok)?.l ?? null;
      const ok = chosen && correct ? chosen === correct : false;
      return { qid, q, chosen, correct, ok };
    });
    const total = rows.length;
    const score = rows.filter((r) => r.ok).length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const pass = total > 0 ? score / total >= WA_PASS_THRESHOLD : false;
    return { rows, total, score, pct, pass };
  }, [session, QUESTIONS, questionsLoading]);

  /* Award guest XP + append to the local mock history, once per completed
     session (guarded by completedAtIso). The history feeds /today's readiness
     for guests; signed-in users get the server-side version on the dashboard. */
  useEffect(() => {
    if (!session?.completedAtIso || !scored) return;
    try {
      const KEY = "kl-mock-xp-awarded";
      if (localStorage.getItem(KEY) === session.completedAtIso) return;
      awardXp(scored.pass ? XP_PER_MOCK_PASS : XP_PER_MOCK_COMPLETE);
      const rawHistory = localStorage.getItem(SK.mockHistory);
      const history = safeParseJson<
        Array<{ score: number; total: number; state: string; at: string }>
      >(rawHistory, []);
      const next = [
        {
          score: scored.score,
          total: scored.total,
          state: session.cfg.state,
          at: session.completedAtIso
        },
        ...(Array.isArray(history) ? history : [])
      ].slice(0, 10);
      localStorage.setItem(SK.mockHistory, JSON.stringify(next));
      localStorage.setItem(KEY, session.completedAtIso);
    } catch {}
  }, [session, scored]);

  /* Readiness recomputed with the mock just taken + local practice history,
     restricted to the pool of this mock (state + licence type), mirroring the
     session page filter. ponytail: local data only, signed-in users get the
     full picture on the dashboard. */
  const readiness = useMemo(() => {
    if (!session || !scored || QUESTIONS.length === 0) return null;
    let local: LocalAnswerRecord = {};
    try {
      local = safeParseJson<LocalAnswerRecord>(localStorage.getItem(SK.answered), {});
    } catch {
      local = {};
    }
    const bank = QUESTIONS.filter(
      (q) =>
        (!q.states || q.states.includes(session.cfg.state)) &&
        (session.cfg.licenceType === "motorcycle"
          ? q.licenceType === "motorcycle"
          : q.licenceType !== "motorcycle")
    );
    const byId = new Map(bank.map((q) => [q.id, q]));
    const catMap = new Map<string, { correct: number; total: number }>();
    const bump = (cat: string, ok: boolean) => {
      const entry = catMap.get(cat) ?? { correct: 0, total: 0 };
      catMap.set(cat, { correct: entry.correct + (ok ? 1 : 0), total: entry.total + 1 });
    };
    for (const [qid, v] of Object.entries(local)) {
      const q = byId.get(qid);
      if (q) bump(q.cat, v.correct);
    }
    for (const r of scored.rows) bump(r.q?.cat ?? "Other", r.ok);
    const answeredUnique = new Set([
      ...Object.keys(local).filter((qid) => byId.has(qid)),
      ...session.qids
    ]).size;

    return computeReadiness({
      categories: [...catMap.entries()].map(([category, stat]) => ({
        category,
        correct: stat.correct,
        total: stat.total
      })),
      recentMocks: [{ score: scored.score, total: scored.total }],
      questionBankSize: bank.length,
      answeredUnique
    });
  }, [session, scored, QUESTIONS]);

  /* Save to Supabase (once), authenticated users only */
  useEffect(() => {
    if (!session || !scored) return;
    if (!session.completedAtIso) return;
    if (session.postedAtIso) return;

    let cancelled = false;
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data: { user } }) => {
      if (cancelled || !user) return;

      fetch("/api/mock-sessions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          state: session.cfg.state,
          score: scored.score,
          total: scored.total,
          mode: session.cfg.mode,
          source: "web"
        }),
        signal: ctrl ? ctrl.signal : undefined
      })
        .then((r) => (r.ok ? r.json().catch(() => null) : null))
        .then((j) => {
          if (cancelled) return;
          if (!j?.ok) {
            console.error("[mock-sessions] persist rejected:", j);
            return;
          }
          const next: MockSession = { ...session, postedAtIso: new Date().toISOString() };
          try {
            const nextRaw = JSON.stringify(next);
            sessionStorage.setItem("mock-session", nextRaw);
            setRaw(nextRaw);
          } catch {}
        })
        .catch((err) => {
          if (cancelled) return;
          if (err instanceof DOMException && err.name === "AbortError") return;
          console.error("[mock-sessions] persist failed:", err);
        });
    });

    return () => {
      cancelled = true;
      ctrl?.abort();
    };
  }, [session, scored]);

  if (questionsLoading) {
    return (
      <main className="container section-pad">
        <div className="page-loading">
          <div className="spinner" />
        </div>
      </main>
    );
  }

  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        {!session || !scored ? (
          <>
            <h1>{s.mockTest}</h1>
            <p className="mock-meta">{s.mockNoResults}</p>
            <Link href="/mock-test" className="btn btn-ghost-light">
              ← {s.mockTest}
            </Link>
          </>
        ) : (
          <>
            <div
              className="mock-meta"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap"
              }}
            >
              <span>
                {session.cfg.state} · {session.cfg.mode === "exam" ? s.examMode : s.practiceMode}
              </span>
              <span>{scored.pct}%</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap"
              }}
            >
              <h1 style={{ marginTop: 10 }}>
                {scored.pass ? s.pass : s.fail}, {scored.score}/{scored.total}
              </h1>
              <Kanga
                pose={scored.pass ? "celebrate" : "encourage"}
                size={112}
                label={s.kangaAlmost}
                style={{ flexShrink: 0 }}
              />
            </div>

            <p
              className="mock-meta"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 6
              }}
            >
              {scored.pass ? (
                <Icons.success
                  width={18}
                  height={18}
                  aria-hidden
                  style={{ color: "var(--green)" }}
                />
              ) : (
                <Icons.error width={18} height={18} aria-hidden style={{ color: "var(--red)" }} />
              )}
              {scored.pass ? RESULT_MSG.pass[lang] : RESULT_MSG.fail[lang]}
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <Link href="/practice" className="dash-cta">
                {CONTINUE[lang]}
              </Link>
              <Link href="/mock-test" className="btn btn-ghost-light">
                {NEW_TEST[lang]}
              </Link>
              <Link href="/dashboard" className="btn btn-ghost-light">
                {s.dashboard}
              </Link>
            </div>

            {readiness && <ReadinessCard readiness={readiness} compact />}

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
                        style={{
                          padding: 12,
                          borderRadius: 12,
                          background: "rgba(15, 23, 42, 0.04)"
                        }}
                      >
                        <div style={{ fontWeight: 800, marginBottom: 4 }}>{tx(r.q?.q, lang)}</div>
                        {bilingual && r.q?.q?.en && tx(r.q?.q, lang) !== r.q.q.en && (
                          <div
                            style={{
                              fontSize: ".78rem",
                              opacity: 0.55,
                              fontStyle: "italic",
                              marginBottom: 8
                            }}
                          >
                            {r.q.q.en}
                          </div>
                        )}
                        <div style={{ display: "grid", gap: 4, fontSize: ".9rem" }}>
                          <div>
                            {YOUR_ANSWER[lang]} <strong>{r.chosen ?? "—"}</strong>{" "}
                            <span style={{ opacity: 0.8 }}>
                              {tx(r.q?.opts?.find((o) => o.l === r.chosen)?.t, lang)}
                            </span>
                          </div>
                          <div>
                            {CORRECT_ANSWER[lang]} <strong>{r.correct ?? "—"}</strong>{" "}
                            <span style={{ opacity: 0.8 }}>
                              {tx(r.q?.opts?.find((o) => o.l === r.correct)?.t, lang)}
                            </span>
                          </div>
                        </div>
                        {r.q?.exp && (
                          <div style={{ marginTop: 10 }}>
                            <div style={{ fontWeight: 800, marginBottom: 6 }}>
                              {EXPLANATION[lang]}
                            </div>
                            <div
                              dangerouslySetInnerHTML={{ __html: sanitizeHtml(tx(r.q.exp, lang)) }}
                            />
                            {bilingual && r.q.exp?.en && tx(r.q.exp, lang) !== r.q.exp.en && (
                              <div
                                style={{
                                  marginTop: 6,
                                  opacity: 0.55,
                                  fontSize: ".8rem",
                                  fontStyle: "italic"
                                }}
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
