"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fisherYatesSlice } from "@kanga/core";
import { useQuestions } from "@/hooks/useQuestions";
import { safeParseJson } from "@/lib/safeParseJson";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { useLang } from "@/contexts/LangContext";
import { tx, type UiLang } from "@/lib/i18n";
import type { MockConfig, MockSession } from "@/types/mock";

const EXAM_SECONDS = 45 * 60; // 45 minutes

type Cap = Record<string, string>;

function signSrcFor(sign: string | undefined): string | null {
  if (!sign) return null;
  if (sign.startsWith("/")) return sign;
  const legacySign = sign.match(/^assets\/icons\/signs\/(.+)$/);
  return legacySign ? `/icons/signs/${legacySign[1]}` : null;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const TIMER_RING_RADIUS = 15;
const TIMER_RING_CIRCUMFERENCE = 2 * Math.PI * TIMER_RING_RADIUS;
const TIMER_WARN_SECONDS = 5 * 60;
const TIMER_DANGER_SECONDS = 60;

function ExamTimer({ timeLeft, label }: { timeLeft: number; label: string }) {
  const frac = Math.max(0, Math.min(1, timeLeft / EXAM_SECONDS));
  const tone =
    timeLeft < TIMER_DANGER_SECONDS ? " danger" : timeLeft < TIMER_WARN_SECONDS ? " warn" : "";
  return (
    <span
      className={`exam-timer${tone}`}
      role="timer"
      aria-label={`${label}: ${formatTime(timeLeft)}`}
    >
      <svg
        className="exam-timer-ring"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        aria-hidden="true"
      >
        <circle className="ring-bg" cx="18" cy="18" r={TIMER_RING_RADIUS} strokeWidth="3" />
        <circle
          className="ring-fg"
          cx="18"
          cy="18"
          r={TIMER_RING_RADIUS}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={TIMER_RING_CIRCUMFERENCE}
          strokeDashoffset={TIMER_RING_CIRCUMFERENCE * (1 - frac)}
        />
      </svg>
      <span className="exam-timer-time">{formatTime(timeLeft)}</span>
    </span>
  );
}

export default function MockTestSessionPage() {
  const { questions: QUESTIONS, loading: questionsLoading } = useQuestions();
  const [raw, setRaw] = useState<string | null>(null);
  const [sessionRaw, setSessionRaw] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, string> | null>(null);
  const [reveal, setReveal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const [timeExpired, setTimeExpired] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();
  const { uiLang: lang, isBilingual: bilingual, s } = useLang();

  useEffect(() => {
    try {
      let configRaw = sessionStorage.getItem("mock-config");
      if (!configRaw) {
        configRaw = localStorage.getItem("mock-config-saved");
        if (configRaw) {
          sessionStorage.setItem("mock-config", configRaw);
          try {
            localStorage.removeItem("mock-config-saved");
          } catch {
            /* noop */
          }
        }
      }
      setRaw(configRaw);
      setSessionRaw(sessionStorage.getItem("mock-session"));
    } catch {
      setRaw(null);
      setSessionRaw(null);
    }
  }, []);

  const cfg = useMemo<MockConfig | null>(() => {
    const parsed = safeParseJson<MockConfig | null>(raw, null);
    if (!parsed) return null;
    const state = typeof parsed.state === "string" ? parsed.state : "WA";
    const mode = parsed.mode === "exam" ? "exam" : "practice";
    const questions = Number.isFinite(parsed.questions)
      ? Math.max(1, Math.min(50, parsed.questions))
      : 30;
    const licenceType = parsed.licenceType === "motorcycle" ? "motorcycle" : "car";
    return { state, mode, questions, licenceType };
  }, [raw]);

  const session = useMemo<MockSession | null>(
    () => safeParseJson<MockSession | null>(sessionRaw, null),
    [sessionRaw]
  );

  const questionPool = useMemo(() => {
    if (!cfg) return [];
    const state = cfg.state;
    const byState =
      state === "AU"
        ? QUESTIONS.slice()
        : QUESTIONS.filter((q) => Array.isArray(q.states) && q.states.includes(state));
    return byState.filter((q) =>
      cfg.licenceType === "motorcycle"
        ? q.licenceType === "motorcycle"
        : q.licenceType !== "motorcycle"
    );
  }, [cfg, QUESTIONS]);

  const activeQuestion = useMemo(() => {
    if (!session) return null;
    const qid = session.qids[activeIndex];
    return QUESTIONS.find((q) => q.id === qid) ?? null;
  }, [session, activeIndex, QUESTIONS]);

  const correctLetter = useMemo(() => {
    if (!activeQuestion) return null;
    const ok = activeQuestion.opts.find((o) => o.ok);
    return ok?.l ?? null;
  }, [activeQuestion]);

  useEffect(() => {
    if (!cfg) return;
    if (session) return;
    if (questionPool.length === 0) return;
    const ids = fisherYatesSlice(
      questionPool.map((q) => q.id),
      cfg.questions
    );
    const s: MockSession = {
      cfg,
      startedAtIso: new Date().toISOString(),
      qids: ids,
      answers: {},
      completedAtIso: null
    };
    try {
      const nextRaw = JSON.stringify(s);
      sessionStorage.setItem("mock-session", nextRaw);
      setSessionRaw(nextRaw);
    } catch {}
  }, [cfg, session, questionPool]);

  useEffect(() => {
    if (!session) return;
    const firstUnanswered = session.qids.findIndex((id) => !session.answers[id]);
    setActiveIndex(firstUnanswered === -1 ? 0 : firstUnanswered);
  }, [session]);

  /* ── Countdown timer (exam mode only) ── */
  const examActive = cfg?.mode === "exam" && !!session && !session.completedAtIso;
  useEffect(() => {
    if (!examActive) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setTimeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examActive]);

  /* Auto-submit when time expires */
  useEffect(() => {
    if (!timeExpired || !session || session.completedAtIso) return;
    const completed: MockSession = { ...session, completedAtIso: new Date().toISOString() };
    persistSession(completed);
    router.push("/mock-test/results");
  }, [timeExpired, session, router]);

  /* ── Focus mode: hide site chrome while questions are being answered ── */
  const inQuestionPhase = !!cfg && !!session && !session.completedAtIso && !!activeQuestion;
  useEffect(() => {
    if (!inQuestionPhase) return;
    document.documentElement.classList.add("exam-focus");
    return () => document.documentElement.classList.remove("exam-focus");
  }, [inQuestionPhase]);

  function persistSession(next: MockSession) {
    try {
      const nextRaw = JSON.stringify(next);
      sessionStorage.setItem("mock-session", nextRaw);
      setSessionRaw(nextRaw);
    } catch {}
  }

  function choose(letter: string) {
    if (!session || !activeQuestion) return;
    if (picked && picked[activeQuestion.id]) return;
    const nextAnswers = { ...session.answers, [activeQuestion.id]: letter };
    const next: MockSession = { ...session, answers: nextAnswers };
    persistSession(next);
    setPicked({ [activeQuestion.id]: letter });
    setReveal(session.cfg.mode === "practice");
  }

  function nextStep() {
    if (!session) return;
    const qid = session.qids[activeIndex];
    const isAnswered = !!session.answers[qid];
    if (!isAnswered) return;

    const nextIdx = activeIndex + 1;
    setPicked(null);
    setReveal(false);
    if (nextIdx < session.qids.length) {
      setActiveIndex(nextIdx);
      return;
    }

    const completed: MockSession = { ...session, completedAtIso: new Date().toISOString() };
    persistSession(completed);
    router.push("/mock-test/results");
  }

  if (questionsLoading) {
    return (
      <main className="container section-pad">
        <div className="page-loading">
          <div className="spinner" />
        </div>
      </main>
    );
  }

  if (!cfg) {
    return (
      <main className="container section-pad">
        <div className="mock-setup-card">
          <h1>{s.mockTest}</h1>
          <p className="mock-meta">{s.mockConfigNotFound}</p>
          <Link href="/mock-test" className="btn btn-ghost-light">
            ← {s.mockTest}
          </Link>
        </div>
      </main>
    );
  }

  if (!session) {
    if (!questionsLoading && questionPool.length === 0) {
      return (
        <main className="container section-pad">
          <div className="mock-setup-card">
            <h1>{s.mockTest}</h1>
            <p className="mock-meta">{s.mockNoQuestions}</p>
            <Link href="/mock-test" className="btn btn-ghost-light">
              ← {s.mockTest}
            </Link>
          </div>
        </main>
      );
    }
    return (
      <main className="container section-pad">
        <div className="mock-setup-card">
          <h1>{s.loading}</h1>
          <p className="mock-meta">
            {cfg.state} · {cfg.licenceType === "motorcycle" ? s.motorcycleLicence : s.carLicence} ·{" "}
            {cfg.questions} {s.questionsWord} · {cfg.mode === "exam" ? s.examMode : s.practiceMode}
          </p>
        </div>
      </main>
    );
  }

  if (!activeQuestion) {
    return (
      <main className="container section-pad">
        <div className="mock-setup-card">
          <h1>{s.mockSessionError}</h1>
          <p className="mock-meta">{s.mockLoadNextQuestion}</p>
          <Link href="/mock-test" className="btn btn-ghost-light">
            ← {s.mockTest}
          </Link>
        </div>
      </main>
    );
  }

  const total = session.qids.length;
  const answeredCount = session.qids.filter((id) => !!session.answers[id]).length;
  const isCurrentAnswered = !!session.answers[activeQuestion.id];
  const chosen = session.answers[activeQuestion.id] ?? null;
  const q = activeQuestion;

  return (
    <main className="container section-pad">
      {/* Exam mini-header: small logo, prominent timer, discreet exit */}
      <div className="exam-topbar">
        <img src="/brand/logo-nav.svg" alt="KangaLearner" height={26} />
        <div className="exam-topbar-right">
          {cfg.mode === "exam" && <ExamTimer timeLeft={timeLeft} label={s.timeRemaining} />}
          <Link href="/mock-test" className="btn btn-ghost-light exam-exit">
            {s.exitLabel}
          </Link>
        </div>
      </div>

      <div className="mock-setup-card">
        {/* Question progress bar */}
        <div className="pbar-track exam-pbar">
          <div
            className="pbar-fill"
            style={{ width: `${Math.round((answeredCount / total) * 100)}%` }}
          />
        </div>

        <div
          className="mock-meta"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <span>
            {cfg.state} · {cfg.licenceType === "motorcycle" ? s.motorcycleLicence : s.carLicence} ·{" "}
            {total} {s.questionsWord} · {cfg.mode === "exam" ? s.examMode : s.practiceMode}
          </span>
          <span aria-live="polite">
            {activeIndex + 1} / {total}
          </span>
        </div>

        {/* Question text */}
        <p
          id="mock-question-text"
          style={{
            fontWeight: 850,
            fontSize: "1rem",
            lineHeight: 1.45,
            marginBottom: bilingual ? 4 : 14
          }}
        >
          {tx(q.q, lang)}
        </p>
        {bilingual && q.q?.en && (
          <p
            style={{
              fontSize: ".82rem",
              color: "var(--muted2)",
              fontStyle: "italic",
              marginBottom: 14,
              lineHeight: 1.4
            }}
          >
            {q.q.en}
          </p>
        )}

        {(() => {
          const signSrc = signSrcFor(q.sign);
          const capLabel =
            q.cap == null ? null : typeof q.cap === "string" ? q.cap : tx(q.cap as Cap, lang);
          if (!signSrc && !capLabel) return null;
          return (
            <div className="sign-box">
              {signSrc ? (
                <img src={signSrc} alt={capLabel ?? "Road sign"} loading="lazy" decoding="async" />
              ) : null}
              {capLabel ? <div className="img-cap">{capLabel}</div> : null}
            </div>
          );
        })()}

        {/* Options */}
        <div
          role="radiogroup"
          aria-labelledby="mock-question-text"
          style={{ display: "grid", gap: 10, marginTop: 4 }}
        >
          {q.opts.map((o) => {
            const isChosen = chosen === o.l;
            const isCorrect = correctLetter === o.l;
            const showResult = reveal && isCurrentAnswered;
            const className =
              "mock-mode-option" +
              (isChosen ? " active" : "") +
              (showResult
                ? isCorrect
                  ? " mock-opt-correct"
                  : isChosen
                    ? " mock-opt-wrong"
                    : ""
                : "");
            return (
              <button
                key={o.l}
                className={className}
                type="button"
                role="radio"
                aria-checked={isChosen}
                onClick={() => choose(o.l)}
                disabled={isCurrentAnswered}
              >
                <span className="mode-icon">{o.l}</span>
                <div style={{ textAlign: "left" }}>
                  <strong>{tx(o.t, lang)}</strong>
                  {bilingual && o.t?.en && tx(o.t, lang) !== o.t.en && (
                    <span
                      style={{
                        display: "block",
                        fontSize: ".75rem",
                        fontWeight: 400,
                        opacity: 0.65,
                        fontStyle: "italic"
                      }}
                    >
                      {o.t.en}
                    </span>
                  )}
                  {showResult && isCorrect && (
                    <span style={{ display: "block", marginTop: 4, opacity: 0.9, fontWeight: 700 }}>
                      ✓ {s.answer}
                    </span>
                  )}
                  {showResult && isChosen && !isCorrect && (
                    <span style={{ display: "block", marginTop: 4, opacity: 0.9 }}>✗</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (practice mode) */}
        {reveal && isCurrentAnswered && q.exp && (
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 12,
              background: "rgba(15, 23, 42, 0.04)"
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{s.answer}</div>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(tx(q.exp, lang)) }} />
            {bilingual && q.exp?.en && tx(q.exp, lang) !== q.exp.en && (
              <div
                style={{ marginTop: 8, opacity: 0.6, fontSize: ".8rem", fontStyle: "italic" }}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(q.exp.en) }}
              />
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <button
            className="btn btn-primary btn-full"
            type="button"
            onClick={nextStep}
            disabled={!isCurrentAnswered}
          >
            {activeIndex + 1 >= total ? s.finishLabel : s.nextLabel}
          </button>
        </div>
      </div>
    </main>
  );
}
