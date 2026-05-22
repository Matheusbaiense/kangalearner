"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { WA_PASS_THRESHOLD } from "@kanga/core";
import { useQuestions } from "@/hooks/useQuestions";
import { SK } from "@/lib/storageKeys";
import { AuthNudge } from "@/components/ui/AuthNudge";
import { createClient } from "@/lib/supabase/client";

/* ── Types ── */
type AnswerRecord = Record<string, { chosen: string; correct: boolean }>;

interface CatStat {
  category: string;
  correct: number;
  total: number;
  accuracy: number;
}

/* ── Helpers ── */
function pct(correct: number, total: number) {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

function accuracyColor(acc: number, total: number) {
  if (total === 0) return "var(--muted)";
  if (acc >= WA_PASS_THRESHOLD * 100) return "var(--green)";
  if (acc >= 60) return "var(--orange)";
  return "var(--red)";
}

/* ── Category icon map ── */
const CAT_ICON: Record<string, string> = {
  "Speed Limits": "🚗",
  "Road Signs": "🚦",
  "Parking": "🅿️",
  "Alcohol / BAC": "🍺",
  "Lanes & Merging": "🛣️",
  "Road Safety": "⛑️",
};

function catIcon(cat: string) {
  return CAT_ICON[cat] ?? "📋";
}

export default function ProgressPage() {
  const { questions: QUESTIONS, loading: questionsLoading } = useQuestions();
  const { s } = useLang();
  const [answers, setAnswers] = useState<AnswerRecord>({});
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* Load from localStorage on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SK.answered);
      setAnswers(raw ? JSON.parse(raw) : {});
    } catch {
      setAnswers({});
    }
    setMounted(true);

    try {
      const supabase = createClient();
      supabase.auth
        .getUser()
        .then(({ data }) => {
          setIsAuthenticated(Boolean(data.user));
        })
        .catch(() => {});
    } catch {}
  }, []);

  /* Derived stats */
  const stats = useMemo(() => {
    const entries = Object.entries(answers);
    const totalAnswered = entries.length;
    const totalCorrect = entries.filter(([, v]) => v.correct).length;
    const overallAcc = pct(totalCorrect, totalAnswered);

    /* Category breakdown using QUESTIONS to get category names */
    const catMap: Record<string, { correct: number; total: number }> = {};
    entries.forEach(([qid, v]) => {
      const q = QUESTIONS.find((x) => x.id === qid);
      const cat = q?.cat ?? "Other";
      if (!catMap[cat]) catMap[cat] = { correct: 0, total: 0 };
      catMap[cat].total++;
      if (v.correct) catMap[cat].correct++;
    });

    const catStats: CatStat[] = Object.entries(catMap)
      .map(([category, { correct, total }]) => ({
        category,
        correct,
        total,
        accuracy: pct(correct, total),
      }))
      .sort((a, b) => b.total - a.total);

    /* Next-step recommendation */
    const hasWrong = entries.some(([, v]) => !v.correct);
    const totalQs = questionsLoading ? 0 : QUESTIONS.length;
    const hasUnanswered = !questionsLoading && totalAnswered < totalQs;

    let nextStep: string;
    if (totalAnswered === 0) {
      nextStep = s.nextStepEmpty;
    } else if (hasWrong) {
      nextStep = s.nextStepReviewWrong;
    } else if (hasUnanswered) {
      nextStep = s.nextStepFinishUnanswered;
    } else {
      nextStep = s.nextStepTakeMock;
    }

    return { totalAnswered, totalCorrect, overallAcc, catStats, nextStep, hasWrong, hasUnanswered };
  }, [answers, s, QUESTIONS, questionsLoading]);

  function handleReset() {
    if (!window.confirm(s.resetConfirm)) return;
    localStorage.removeItem(SK.answered);
    localStorage.removeItem(SK.saved);
    setAnswers({});
  }

  if (!mounted) {
    return (
      <main className="app-page">
        <div className="container section-pad" style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
          <span style={{ color: "var(--muted)", fontSize: ".9rem" }}>{s.loading}</span>
        </div>
      </main>
    );
  }

  const { totalAnswered, totalCorrect, overallAcc, catStats, nextStep } = stats;
  const isEmpty = totalAnswered === 0;
  const scoreColor = isEmpty ? "var(--ink)" : accuracyColor(overallAcc, totalAnswered);

  return (
    <main className="app-page">
      <div className="container section-pad">

        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">{s.progressTitle}</h1>
          <p className="page-sub">{s.progressSub}</p>
        </div>

        <AuthNudge />

        {isEmpty && isAuthenticated && (
          <div
            style={{
              marginTop: 24,
              padding: "14px 18px",
              borderRadius: "var(--radius-md)",
              background: "var(--green3)",
              border: "1px solid var(--green2)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap"
            }}
          >
            <span style={{ fontSize: ".9rem", color: "var(--ink)", flex: 1 }}>{s.progressCloudNote}</span>
            <Link
              href="/dashboard"
              style={{
                fontWeight: 800,
                fontSize: ".85rem",
                color: "var(--green)",
                textDecoration: "none",
                flexShrink: 0
              }}
            >
              {s.dashboard} →
            </Link>
          </div>
        )}

        {isEmpty ? (
          /* Empty state */
          <div style={{ marginTop: 40, padding: "32px 24px", borderRadius: "var(--radius-md)", background: "var(--paper)", border: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontSize: "2.5rem", marginBottom: 12 }}>📊</p>
            <p style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)", marginBottom: 8 }}>{s.noQuestionsTitle}</p>
            <p style={{ color: "var(--muted)", fontSize: ".9rem", marginBottom: 20 }}>{s.progressEmpty}</p>
            <Link href="/practice" className="btn btn-primary">{s.practice} →</Link>
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginTop: 28 }}>
              <StatCard label={s.attemptedCol} value={String(totalAnswered)} sub={`${totalCorrect} ${s.correctLabel}`} />
              <StatCard label={s.accuracyCol} value={`${overallAcc}%`} valueColor={scoreColor} sub="Target: 80%" />
              <StatCard label={s.nextStepTitle} value={nextStep} isText />
            </div>

            {/* Category breakdown */}
            <div style={{ marginTop: 32 }}>
              <p style={{ fontWeight: 800, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 12 }}>
                {s.categoryCol}
              </p>

              {catStats.length === 0 ? (
                <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>{s.progressEmpty}</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {catStats.map((c) => {
                    const color = accuracyColor(c.accuracy, c.total);
                    return (
                      <div
                        key={c.category}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "28px 1fr auto auto auto",
                          alignItems: "center",
                          gap: "0 12px",
                          padding: "12px 16px",
                          borderRadius: "var(--radius-md)",
                          background: "var(--paper)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {/* Icon */}
                        <span style={{ fontSize: "1.1rem" }}>{catIcon(c.category)}</span>

                        {/* Name + progress bar */}
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--ink)", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {c.category}
                          </p>
                          <div style={{ height: 5, borderRadius: 99, background: "var(--border)", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${c.accuracy}%`, background: color, borderRadius: 99, transition: "width 0.4s ease" }} />
                          </div>
                        </div>

                        {/* Fraction */}
                        <span style={{ fontSize: ".8rem", color: "var(--muted)", flexShrink: 0 }}>{c.correct}/{c.total}</span>

                        {/* Percentage */}
                        <span style={{ fontSize: ".85rem", fontWeight: 800, color, flexShrink: 0, minWidth: 36, textAlign: "right" }}>{c.accuracy}%</span>

                        {/* Practice link */}
                        <Link
                          href={`/practice?cat=${encodeURIComponent(c.category)}`}
                          style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--green)", textDecoration: "none", flexShrink: 0 }}
                        >
                          →
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Next-step recommendation */}
            <div style={{ marginTop: 28, padding: "16px 20px", borderRadius: "var(--radius-md)", background: "var(--green3)", border: "1px solid var(--green2)" }}>
              <p style={{ fontSize: ".75rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green)", marginBottom: 4 }}>{s.nextStepTitle}</p>
              <p style={{ fontWeight: 700, color: "var(--ink)", fontSize: ".95rem" }}>{nextStep}</p>
            </div>

            {/* CTA row */}
            <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {stats.hasWrong && (
                <Link href="/practice?mode=wrong" className="btn btn-primary">{s.wrongAnswers} →</Link>
              )}
              {!stats.hasWrong && stats.hasUnanswered && (
                <Link href="/practice?mode=unanswered" className="btn btn-primary">{s.unanswered} →</Link>
              )}
              {!stats.hasWrong && !stats.hasUnanswered && (
                <Link href="/mock-test" className="btn btn-primary">{s.mockTest} →</Link>
              )}
              <Link href="/practice" style={{ fontSize: ".85rem", fontWeight: 700, color: "var(--green)", textDecoration: "none" }}>
                {s.practice}
              </Link>
              <button
                onClick={handleReset}
                style={{ marginLeft: "auto", fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", padding: "6px 0" }}
              >
                {s.resetAll}
              </button>
            </div>
          </>
        )}

      </div>
    </main>
  );
}

/* ── Sub-component: StatCard ── */
function StatCard({
  label,
  value,
  sub,
  valueColor,
  isText,
}: {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
  isText?: boolean;
}) {
  return (
    <div style={{ padding: "16px 18px", borderRadius: "var(--radius-md)", background: "var(--paper)", border: "1px solid var(--border)" }}>
      <p style={{ fontSize: ".72rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>
        {label}
      </p>
      <p style={{ fontSize: isText ? ".85rem" : "1.8rem", fontWeight: 800, color: valueColor ?? "var(--ink)", lineHeight: isText ? 1.4 : 1 }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: ".78rem", color: "var(--muted)", marginTop: 4 }}>{sub}</p>}
    </div>
  );
}
