"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useQuestions } from "@/hooks/useQuestions";
import { useLang } from "@/contexts/LangContext";
import { useGameProgress } from "@/hooks/useGameProgress";
import { DailyProgress } from "@/components/gamification/DailyProgress";
import { computeReadiness, nextBestAction, type AnsweredMap } from "@/lib/readiness";
import { SK } from "@/lib/storageKeys";
import type { UiLang } from "@/lib/i18n";

/**
 * "Today" — a guest command-centre. Surfaces streak/XP, a simple readiness picture,
 * and the single next-best action, all from locally stored answers. No auth, no
 * migration. The logged-in dashboard can layer cross-device data on top later.
 */

const COPY: Record<
  UiLang,
  {
    kicker: string;
    title: string;
    sub: string;
    nextAction: string;
    theory: string;
    coverage: string;
    weakest: string;
    none: string;
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
    theory: "Theory accuracy",
    coverage: "Topics covered",
    weakest: "Needs work",
    none: "—",
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
    theory: "Acerto na teórica",
    coverage: "Tópicos cobertos",
    weakest: "Precisa de atenção",
    none: "—",
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
    theory: "Acierto en el teórico",
    coverage: "Temas cubiertos",
    weakest: "Necesita trabajo",
    none: "—",
    act: {
      start: "Empezar a practicar",
      weak: (c) => `Practicar ${c}`,
      broaden: (c) => `Probar ${c}`,
      mock: "Hacer un simulacro"
    }
  }
};

export default function TodayPage() {
  const { questions: QS } = useQuestions();
  const { uiLang: lang } = useLang();
  const { progress } = useGameProgress();
  const c = COPY[lang];

  const [answered, setAnswered] = useState<AnsweredMap>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SK.answered);
      if (raw) setAnswered(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }, []);

  const readiness = useMemo(() => computeReadiness(answered, QS), [answered, QS]);
  const action = useMemo(() => nextBestAction(readiness), [readiness]);

  const actionHref =
    action.kind === "mock"
      ? "/practice?mode=sim"
      : action.category
        ? `/practice?category=${encodeURIComponent(action.category)}`
        : "/practice";
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
              fontSize: ".78rem",
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

        {/* Next best action — the hero */}
        <Link
          href={actionHref}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 20,
            padding: "18px 20px",
            borderRadius: 14,
            textDecoration: "none",
            color: "#fff",
            background: "var(--green, #2e7d5b)"
          }}
        >
          <span>
            <span style={{ display: "block", fontSize: ".72rem", opacity: 0.85, fontWeight: 700 }}>
              {c.nextAction}
            </span>
            <strong style={{ fontSize: "1.15rem" }}>{actionLabel}</strong>
          </span>
          <span aria-hidden style={{ fontSize: "1.4rem" }}>
            →
          </span>
        </Link>

        {/* Gamification */}
        <div style={{ marginTop: 16 }}>
          <DailyProgress progress={progress} lang={lang} />
        </div>

        {/* Readiness stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
            marginTop: 16
          }}
        >
          <Stat
            label={c.theory}
            value={readiness.answeredCount > 0 ? `${readiness.theoryPct}%` : c.none}
          />
          <Stat label={c.coverage} value={`${readiness.coveragePct}%`} />
          <Stat
            label={c.weakest}
            value={readiness.weakest ? readiness.weakest.cat : c.none}
            small
          />
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        background: "var(--paper)",
        padding: "14px 16px"
      }}
    >
      <div style={{ fontSize: ".72rem", color: "var(--muted)", fontWeight: 700, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: small ? "1rem" : "1.5rem", fontWeight: 850, lineHeight: 1.2 }}>
        {value}
      </div>
    </div>
  );
}
