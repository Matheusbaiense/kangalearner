"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { computeReadiness } from "@kanga/core";
import { useQuestions } from "@/hooks/useQuestions";
import { useLang } from "@/contexts/LangContext";
import { useGameProgress } from "@/hooks/useGameProgress";
import { DailyProgress } from "@/components/gamification/DailyProgress";
import { ReadinessCard } from "@/components/ReadinessCard";
import { SK } from "@/lib/storageKeys";
import { readStoredLicenceType, LICENCE_CHANGED_EVENT, type LicenceType } from "@/lib/licenceType";
import type { UiLang } from "@/lib/i18n";

/**
 * "Today". A guest command-centre. Surfaces streak/XP, the readiness picture
 * (same computeReadiness as the dashboard, fed from local practice history and
 * the local mock history), and the single next-best action. No auth needed;
 * the logged-in dashboard layers cross-device data on top.
 */

const STATE_CHANGED_EVENT = "kanga:state-changed";

type AnsweredMap = Record<string, { chosen: string; correct: boolean }>;

interface NextAction {
  kind: "start" | "weak" | "broaden" | "mock";
  category?: string;
}

const COPY: Record<
  UiLang,
  {
    kicker: string;
    title: string;
    sub: string;
    nextAction: string;
    act: {
      start: string;
      weak: (c: string) => string;
      broaden: (c: string) => string;
      mock: string;
    };
  }
> = {
  en: {
    kicker: "Your day",
    title: "Today",
    sub: "Your progress, how ready you are, and the one thing to do next.",
    nextAction: "Your next best action",
    act: {
      start: "Start practising",
      weak: (c) => `Drill ${c}`,
      broaden: (c) => `Try ${c}`,
      mock: "Take a mock test"
    }
  },
  pt: {
    kicker: "Seu dia",
    title: "Hoje",
    sub: "Seu progresso, o quão pronto você está e a única coisa a fazer agora.",
    nextAction: "Sua próxima melhor ação",
    act: {
      start: "Começar a praticar",
      weak: (c) => `Treinar ${c}`,
      broaden: (c) => `Experimentar ${c}`,
      mock: "Fazer um simulado"
    }
  },
  es: {
    kicker: "Tu día",
    title: "Hoy",
    sub: "Tu progreso, qué tan listo estás y lo único que debes hacer ahora.",
    nextAction: "Tu próxima mejor acción",
    act: {
      start: "Empezar a practicar",
      weak: (c) => `Practicar ${c}`,
      broaden: (c) => `Probar ${c}`,
      mock: "Hacer un simulacro"
    }
  }
};

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export default function TodayPage() {
  const { questions: QS } = useQuestions();
  const { uiLang: lang } = useLang();
  const { progress } = useGameProgress();
  const c = COPY[lang];

  const [answered, setAnswered] = useState<AnsweredMap>({});
  const [selectedState, setSelectedState] = useState("WA");
  const [licenceType, setLicenceType] = useState<LicenceType>("car");
  const [mockHistory, setMockHistory] = useState<
    Array<{ score: number; total: number; state: string }>
  >([]);

  useEffect(() => {
    const load = () => {
      setAnswered(safeParse<AnsweredMap>(localStorage.getItem(SK.answered)) ?? {});
      setSelectedState(
        localStorage.getItem(SK.stateV2) || localStorage.getItem(SK.stateLegacy) || "WA"
      );
      setLicenceType(readStoredLicenceType());
      const history = safeParse<Array<{ score: number; total: number; state: string }>>(
        localStorage.getItem(SK.mockHistory)
      );
      setMockHistory(Array.isArray(history) ? history : []);
    };
    load();
    window.addEventListener(STATE_CHANGED_EVENT, load);
    window.addEventListener(LICENCE_CHANGED_EVENT, load);
    return () => {
      window.removeEventListener(STATE_CHANGED_EVENT, load);
      window.removeEventListener(LICENCE_CHANGED_EVENT, load);
    };
  }, []);

  /* Same aggregation shape as the dashboard/mock-results: bank restricted to
     the selected state + licence type, categories from local answers. */
  const derived = useMemo(() => {
    const bank = QS.filter(
      (q) =>
        q.states.includes(selectedState) &&
        (licenceType === "motorcycle"
          ? q.licenceType === "motorcycle"
          : q.licenceType !== "motorcycle")
    );
    const byId = new Map(bank.map((q) => [q.id, q]));
    const allCats = new Set(bank.map((q) => q.cat));
    const catMap = new Map<string, { correct: number; total: number }>();
    let answeredUnique = 0;
    for (const [qid, v] of Object.entries(answered)) {
      const q = byId.get(qid);
      if (!q) continue;
      answeredUnique++;
      const e = catMap.get(q.cat) ?? { correct: 0, total: 0 };
      catMap.set(q.cat, { correct: e.correct + (v.correct ? 1 : 0), total: e.total + 1 });
    }

    const readiness = computeReadiness({
      categories: [...catMap.entries()].map(([category, stat]) => ({
        category,
        correct: stat.correct,
        total: stat.total
      })),
      recentMocks: mockHistory
        .filter((m) => m.state === selectedState)
        .map((m) => ({ score: m.score, total: m.total })),
      questionBankSize: bank.length,
      answeredUnique
    });

    /* Next best action: nothing yet → start; weak topic (≥3 attempts, <80%)
       → drill it; untouched topics remain → broaden; else → mock. */
    const eligible = [...catMap.entries()].filter(([, stat]) => stat.total >= 3);
    const weakest =
      eligible.length > 0
        ? eligible.reduce((lo, entry) =>
            entry[1].correct / entry[1].total < lo[1].correct / lo[1].total ? entry : lo
          )
        : null;
    const untouched = [...allCats].filter((cat) => !catMap.has(cat));

    let action: NextAction;
    if (answeredUnique === 0) action = { kind: "start" };
    else if (weakest && weakest[1].correct / weakest[1].total < 0.8)
      action = { kind: "weak", category: weakest[0] };
    else if (untouched.length > 0) action = { kind: "broaden", category: untouched[0] };
    else action = { kind: "mock" };

    return { readiness, action, answeredUnique };
  }, [QS, answered, selectedState, licenceType, mockHistory]);

  const { readiness, action, answeredUnique } = derived;

  const actionHref = action.kind === "mock" ? "/mock-test" : "/practice";
  const actionLabel =
    action.kind === "start"
      ? c.act.start
      : action.kind === "mock"
        ? c.act.mock
        : action.kind === "weak"
          ? c.act.weak(action.category ?? "")
          : c.act.broaden(action.category ?? "");

  return (
    <main className="app-page">
      <div className="container section-pad" style={{ maxWidth: 720 }}>
        <div className="page-header">
          <p
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--green)",
              marginBottom: 8
            }}
          >
            {c.kicker}
          </p>
          <h1 className="page-title">{c.title}</h1>
          <p className="page-sub">{c.sub}</p>
        </div>

        {/* Next best action. The hero */}
        <Link
          href={actionHref}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 20,
            padding: "18px 20px",
            borderRadius: "var(--card-radius)",
            textDecoration: "none",
            color: "#fff",
            background: "var(--green)"
          }}
        >
          <span>
            <span
              style={{
                display: "block",
                fontSize: "var(--text-xs)",
                opacity: 0.85,
                fontWeight: 700
              }}
            >
              {c.nextAction}
            </span>
            <strong style={{ fontSize: "var(--text-lg)" }}>{actionLabel}</strong>
          </span>
          <span aria-hidden style={{ fontSize: "1.4rem" }}>
            →
          </span>
        </Link>

        {/* Gamification */}
        <div style={{ marginTop: 16 }}>
          <DailyProgress progress={progress} lang={lang} />
        </div>

        {/* Readiness. Same card and computation as the dashboard */}
        {answeredUnique > 0 && (
          <div style={{ marginTop: 16 }}>
            <ReadinessCard readiness={readiness} />
          </div>
        )}
      </div>
    </main>
  );
}
