"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@kanga/core";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

type MockConfig = {
  state: string;
  mode: "practice" | "exam";
  questions: number;
};

type MockSession = {
  cfg: MockConfig;
  startedAtIso: string;
  qids: string[];
  answers: Record<string, string>; // question_id -> option letter
  completedAtIso: string | null;
};

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function fisherYatesSlice<T>(arr: T[], k: number): T[] {
  const a = arr.slice();
  const n = a.length;
  const take = Math.min(k, n);
  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(Math.random() * (n - i));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.slice(0, take);
}

export default function MockTestSessionPage() {
  const [raw, setRaw] = useState<string | null>(null);
  const [sessionRaw, setSessionRaw] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, string> | null>(null);
  const [reveal, setReveal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      setRaw(sessionStorage.getItem("mock-config"));
      setSessionRaw(sessionStorage.getItem("mock-session"));
    } catch {
      setRaw(null);
      setSessionRaw(null);
    }
  }, []);

  const cfg = useMemo<MockConfig | null>(() => {
    const parsed = safeParseJson<MockConfig>(raw);
    if (!parsed) return null;
    const state = typeof parsed.state === "string" ? parsed.state : "WA";
    const mode = parsed.mode === "exam" ? "exam" : "practice";
    const questions = Number.isFinite(parsed.questions)
      ? Math.max(1, Math.min(50, parsed.questions))
      : 30;
    return { state, mode, questions };
  }, [raw]);

  const session = useMemo<MockSession | null>(
    () => safeParseJson<MockSession>(sessionRaw),
    [sessionRaw]
  );

  const questionPool = useMemo(() => {
    if (!cfg) return [];
    const state = cfg.state;
    const pool =
      state === "AU"
        ? QUESTIONS.slice()
        : QUESTIONS.filter((q: any) => Array.isArray(q.states) && q.states.includes(state));
    return pool;
  }, [cfg]);

  const activeQuestion = useMemo(() => {
    if (!session) return null;
    const qid = session.qids[activeIndex];
    return QUESTIONS.find((q: any) => q.id === qid) ?? null;
  }, [session, activeIndex]);

  const correctLetter = useMemo(() => {
    if (!activeQuestion) return null;
    const ok = (activeQuestion as any).opts?.find((o: any) => o && o.ok);
    return ok?.l ?? null;
  }, [activeQuestion]);

  useEffect(() => {
    if (!cfg) return;
    if (session) return;
    if (questionPool.length === 0) return;
    const ids = fisherYatesSlice(
      questionPool.map((q: any) => q.id),
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
    } catch {
      // ignore
    }
  }, [cfg, session, questionPool]);

  useEffect(() => {
    if (!session) return;
    const firstUnanswered = session.qids.findIndex((id) => !session.answers[id]);
    setActiveIndex(firstUnanswered === -1 ? 0 : firstUnanswered);
  }, [sessionRaw]); // eslint-disable-line react-hooks/exhaustive-deps

  function persistSession(next: MockSession) {
    try {
      const nextRaw = JSON.stringify(next);
      sessionStorage.setItem("mock-session", nextRaw);
      setSessionRaw(nextRaw);
    } catch {
      // ignore
    }
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

  if (!cfg) {
    return (
      <main className="container section-pad">
        <div className="mock-setup-card">
          <h1>Mock Test</h1>
          <p className="mock-meta">No mock config found.</p>
          <Link href="/mock-test" className="btn btn-secondary">
            Back to setup
          </Link>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="container section-pad">
        <div className="mock-setup-card">
          <h1>Preparing your session…</h1>
          <p className="mock-meta">
            {cfg.state} · {cfg.questions} questions ·{" "}
            {cfg.mode === "exam" ? "Exam mode" : "Practice mock"}
          </p>
        </div>
      </main>
    );
  }

  if (!activeQuestion) {
    return (
      <main className="container section-pad">
        <div className="mock-setup-card">
          <h1>Session error</h1>
          <p className="mock-meta">We couldn’t load the next question.</p>
          <Link href="/mock-test" className="btn btn-secondary">
            Back to setup
          </Link>
        </div>
      </main>
    );
  }

  const total = session.qids.length;
  const answeredCount = session.qids.filter((id) => !!session.answers[id]).length;
  const isCurrentAnswered = !!session.answers[activeQuestion.id];
  const chosen = session.answers[activeQuestion.id] ?? null;

  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        <div
          className="mock-meta"
          style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}
        >
          <span>
            {cfg.state} · {total} questions · {cfg.mode === "exam" ? "Exam mode" : "Practice mock"}
          </span>
          <span aria-live="polite">
            {Math.min(answeredCount + 1, total)} / {total}
          </span>
        </div>

        <h1 style={{ marginTop: 10, marginBottom: 10 }}>
          {(activeQuestion as any).q?.en ?? "Question"}
        </h1>

        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          {((activeQuestion as any).opts ?? []).map((o: any) => {
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
                onClick={() => choose(o.l)}
                disabled={isCurrentAnswered}
              >
                <span className="mode-icon">{o.l}</span>
                <div>
                  <strong>{o.t?.en ?? ""}</strong>
                  {showResult && isCorrect && (
                    <span style={{ display: "block", marginTop: 4, opacity: 0.9 }}>Correct</span>
                  )}
                  {showResult && isChosen && !isCorrect && (
                    <span style={{ display: "block", marginTop: 4, opacity: 0.9 }}>
                      Your answer
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {reveal && isCurrentAnswered && (
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 12,
              background: "rgba(15, 23, 42, 0.04)"
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Explanation</div>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml((activeQuestion as any).exp?.en ?? "")
              }}
            />
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <Link href="/mock-test" className="btn btn-secondary">
            Exit
          </Link>
          <button
            className="btn btn-primary btn-full"
            type="button"
            onClick={nextStep}
            disabled={!isCurrentAnswered}
          >
            {activeIndex + 1 >= total ? "Finish →" : "Next →"}
          </button>
        </div>
      </div>
    </main>
  );
}
