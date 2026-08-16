"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { WA_PASS_THRESHOLD } from "@kanga/core";
import { useQuestions } from "@/hooks/useQuestions";
import { SK } from "@/lib/storageKeys";
import { AuthNudge } from "@/components/ui/AuthNudge";
import { createClient } from "@/lib/supabase/client";
import { pct } from "@/lib/percent";

/* ── Types ── */
type AnswerRecord = Record<string, { chosen: string; correct: boolean }>;

interface CatStat {
  category: string;
  correct: number;
  total: number;
  accuracy: number;
}

/* ── Helpers ── */
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
  Parking: "🅿️",
  "Alcohol / BAC": "🍺",
  "Lanes & Merging": "🛣️",
  "Road Safety": "⛑️"
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

    /* Category breakdown using QUESTIONS to get category names (O(1) lookup) */
    const byId = new Map(QUESTIONS.map((x) => [x.id, x]));
    const catMap: Record<string, { correct: number; total: number }> = {};
    entries.forEach(([qid, v]) => {
      const cat = byId.get(qid)?.cat ?? "Other";
      if (!catMap[cat]) catMap[cat] = { correct: 0, total: 0 };
      catMap[cat].total++;
      if (v.correct) catMap[cat].correct++;
    });

    const catStats: CatStat[] = Object.entries(catMap)
      .map(([category, { correct, total }]) => ({
        category,
        correct,
        total,
        accuracy: pct(correct, total)
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
        <div className="container section-pad prog-loading">
          <span className="prog-muted">{s.loading}</span>
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
          <div className="prog-cloud-note">
            <span className="prog-cloud-note-text">{s.progressCloudNote}</span>
            <Link href="/dashboard" className="prog-link-green">
              {s.dashboard} →
            </Link>
          </div>
        )}

        {isEmpty ? (
          /* Empty state */
          <div className="prog-empty">
            <p className="prog-empty-emoji">📊</p>
            <p className="prog-empty-title">{s.noQuestionsTitle}</p>
            <p className="prog-empty-sub">{s.progressEmpty}</p>
            <Link href="/practice" className="btn btn-primary">
              {s.practice} →
            </Link>
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="prog-stat-grid">
              <StatCard
                label={s.attemptedCol}
                value={String(totalAnswered)}
                sub={`${totalCorrect} ${s.correctLabel}`}
              />
              <StatCard
                label={s.accuracyCol}
                value={`${overallAcc}%`}
                valueColor={scoreColor}
                sub="Target: 80%"
              />
              <StatCard label={s.nextStepTitle} value={nextStep} isText />
            </div>

            {/* Category breakdown */}
            <div className="prog-cats">
              <p className="dash-section-title">{s.categoryCol}</p>

              {catStats.length === 0 ? (
                <p className="prog-muted">{s.progressEmpty}</p>
              ) : (
                <div className="prog-cat-list">
                  {catStats.map((c) => {
                    const color = accuracyColor(c.accuracy, c.total);
                    return (
                      <div key={c.category} className="prog-cat-row">
                        {/* Icon */}
                        <span className="prog-cat-ico">{catIcon(c.category)}</span>

                        {/* Name + progress bar */}
                        <div className="prog-cat-main">
                          <p className="prog-cat-name">{c.category}</p>
                          <div className="prog-cat-track">
                            <div
                              className="prog-cat-fill"
                              style={{ width: `${c.accuracy}%`, background: color }}
                            />
                          </div>
                        </div>

                        {/* Fraction */}
                        <span className="prog-cat-frac">
                          {c.correct}/{c.total}
                        </span>

                        {/* Percentage */}
                        <span className="prog-cat-pct" style={{ color }}>
                          {c.accuracy}%
                        </span>

                        {/* Practice link */}
                        <Link
                          href={`/practice?cat=${encodeURIComponent(c.category)}`}
                          className="prog-cat-go"
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
            <div className="prog-next">
              <p className="prog-next-label">{s.nextStepTitle}</p>
              <p className="prog-next-text">{nextStep}</p>
            </div>

            {/* CTA row */}
            <div className="prog-cta-row">
              {stats.hasWrong && (
                <Link href="/practice?mode=wrong" className="btn btn-primary">
                  {s.wrongAnswers} →
                </Link>
              )}
              {!stats.hasWrong && stats.hasUnanswered && (
                <Link href="/practice?mode=unanswered" className="btn btn-primary">
                  {s.unanswered} →
                </Link>
              )}
              {!stats.hasWrong && !stats.hasUnanswered && (
                <Link href="/mock-test" className="btn btn-primary">
                  {s.mockTest} →
                </Link>
              )}
              <Link href="/practice" className="prog-link-green">
                {s.practice}
              </Link>
              <button onClick={handleReset} className="prog-reset">
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
  isText
}: {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
  isText?: boolean;
}) {
  return (
    <div className="stat-card">
      <p className="stat-card-label">{label}</p>
      <p
        className={`stat-card-value${isText ? " stat-card-value--text" : ""}`}
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </p>
      {sub && <p className="stat-card-sub">{sub}</p>}
    </div>
  );
}
