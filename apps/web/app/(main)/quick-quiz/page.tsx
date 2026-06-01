"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { fisherYatesSlice, WA_PASS_THRESHOLD, type Question } from "@kanga/core";
import { useQuestions } from "@/hooks/useQuestions";
import { useLang } from "@/contexts/LangContext";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { tx, type UiLang } from "@/lib/i18n";
import { useGameProgress } from "@/hooks/useGameProgress";
import { DailyProgress } from "@/components/gamification/DailyProgress";
import { XP_PER_CORRECT } from "@/lib/gamification/progress";

/**
 * Tourist / Newcomer Quick Quiz — stolen from DriverKnowledgeTests' tourist quiz.
 * 10 questions, no account, multilingual. Pure acquisition + SEO surface; the CTA
 * at the end converts to Practice / account. Self-contained, no API, no migration.
 */

const QUIZ_SIZE = 10;

const COPY: Record<
  UiLang,
  {
    kicker: string;
    title: string;
    sub: string;
    start: string;
    question: string;
    of: string;
    next: string;
    seeResult: string;
    yourScore: string;
    resultGoodTitle: string;
    resultGoodBody: string;
    resultSoftTitle: string;
    resultSoftBody: string;
    ctaPractice: string;
    ctaAccount: string;
    retry: string;
    noFee: string;
  }
> = {
  en: {
    kicker: "No sign-up needed",
    title: "WA road rules — quick quiz for newcomers",
    sub: "New to driving in Western Australia? Take 10 questions to see where you stand. Free, no account.",
    start: "Start the 10-question quiz",
    question: "Question",
    of: "of",
    next: "Next question",
    seeResult: "See my result",
    yourScore: "Your score",
    resultGoodTitle: "Nice — you know the basics!",
    resultGoodBody:
      "You're off to a strong start. Keep going with full practice and a mock test to be ready for the real WA Learner test.",
    resultSoftTitle: "Good start — a few gaps to close",
    resultSoftBody:
      "Totally normal for newcomers. Practice by topic and review your weak spots to build confidence fast.",
    ctaPractice: "Practise the full set",
    ctaAccount: "Create a free account to save progress",
    retry: "Try 10 new questions",
    noFee: "Takes ~3 minutes · no payment, no catch"
  },
  pt: {
    kicker: "Sem cadastro",
    title: "Regras de trânsito de WA — quiz rápido para recém-chegados",
    sub: "Novo na direção em Western Australia? Faça 10 questões para ver como está. Grátis, sem conta.",
    start: "Começar o quiz de 10 questões",
    question: "Questão",
    of: "de",
    next: "Próxima questão",
    seeResult: "Ver meu resultado",
    yourScore: "Sua pontuação",
    resultGoodTitle: "Boa — você sabe o básico!",
    resultGoodBody:
      "Começou forte. Continue com a prática completa e um simulado para ficar pronto para a prova real de learner de WA.",
    resultSoftTitle: "Bom começo — algumas lacunas a fechar",
    resultSoftBody:
      "É totalmente normal para quem está chegando. Pratique por tópico e revise seus pontos fracos para ganhar confiança rápido.",
    ctaPractice: "Praticar o conjunto completo",
    ctaAccount: "Criar conta grátis para salvar o progresso",
    retry: "Tentar 10 novas questões",
    noFee: "Leva ~3 minutos · sem pagamento, sem pegadinha"
  },
  es: {
    kicker: "Sin registro",
    title: "Reglas de tránsito de WA — quiz rápido para recién llegados",
    sub: "¿Nuevo conduciendo en Western Australia? Haz 10 preguntas para ver cómo estás. Gratis, sin cuenta.",
    start: "Empezar el quiz de 10 preguntas",
    question: "Pregunta",
    of: "de",
    next: "Siguiente pregunta",
    seeResult: "Ver mi resultado",
    yourScore: "Tu puntuación",
    resultGoodTitle: "¡Bien — conoces lo básico!",
    resultGoodBody:
      "Empezaste fuerte. Sigue con la práctica completa y un simulacro para estar listo para el examen real de learner de WA.",
    resultSoftTitle: "Buen comienzo — algunas lagunas por cerrar",
    resultSoftBody:
      "Es totalmente normal para los recién llegados. Practica por tema y revisa tus puntos débiles para ganar confianza rápido.",
    ctaPractice: "Practicar el conjunto completo",
    ctaAccount: "Crear cuenta gratis para guardar el progreso",
    retry: "Probar 10 preguntas nuevas",
    noFee: "Toma ~3 minutos · sin pago, sin trampa"
  }
};

type Phase = "intro" | "quiz" | "result";

export default function QuickQuizPage() {
  const { questions: QS, loading, error } = useQuestions();
  const { uiLang: lang, isBilingual, s } = useLang();
  const { progress, award } = useGameProgress();
  const c = COPY[lang];

  const [phase, setPhase] = useState<Phase>("intro");
  const [seed, setSeed] = useState(0);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const quiz = useMemo<Question[]>(() => {
    const waQs = QS.filter((q) => !q.states || q.states.includes("WA"));
    return fisherYatesSlice(waQs, QUIZ_SIZE);
    // seed forces a fresh draw on retry
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [QS, seed]);

  function start() {
    setPhase("quiz");
    setIdx(0);
    setPicked(null);
    setScore(0);
  }

  function retry() {
    setSeed((n) => n + 1);
    start();
  }

  function pick(letter: string) {
    if (picked) return;
    const q = quiz[idx];
    const opt = q.opts.find((o) => o.l === letter);
    setPicked(letter);
    if (opt?.ok) {
      setScore((n) => n + 1);
      award(XP_PER_CORRECT);
    }
  }

  function next() {
    if (idx + 1 >= quiz.length) {
      setPhase("result");
      return;
    }
    setIdx((n) => n + 1);
    setPicked(null);
  }

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
      </div>
    );
  }
  if (error) {
    return (
      <main className="app-page">
        <div className="container section-pad">
          <p role="alert">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      <div className="container section-pad" style={{ maxWidth: 680 }}>
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

        {phase === "intro" && (
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <button type="button" className="btn btn-primary" onClick={start}>
              {c.start} →
            </button>
            <p style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: 12 }}>{c.noFee}</p>
          </div>
        )}

        {phase === "quiz" && quiz[idx] && (
          <QuizStep
            q={quiz[idx]}
            lang={lang}
            isBilingual={isBilingual}
            picked={picked}
            onPick={pick}
            index={idx}
            total={quiz.length}
            questionLabel={c.question}
            ofLabel={c.of}
            answerLabel={s.answer}
            nextLabel={idx + 1 >= quiz.length ? c.seeResult : c.next}
            onNext={next}
          />
        )}

        {phase === "result" && (
          <>
            <ResultView score={score} total={quiz.length} c={c} onRetry={retry} />
            <div style={{ marginTop: 20 }}>
              <DailyProgress progress={progress} lang={lang} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function QuizStep({
  q,
  lang,
  isBilingual,
  picked,
  onPick,
  index,
  total,
  questionLabel,
  ofLabel,
  answerLabel,
  nextLabel,
  onNext
}: {
  q: Question;
  lang: UiLang;
  isBilingual: boolean;
  picked: string | null;
  onPick: (letter: string) => void;
  index: number;
  total: number;
  questionLabel: string;
  ofLabel: string;
  answerLabel: string;
  nextLabel: string;
  onNext: () => void;
}) {
  const progress = Math.round(((index + (picked ? 1 : 0)) / total) * 100);
  const expText = tx(q.exp, lang);

  return (
    <div style={{ marginTop: 20 }}>
      <div className="sim-header">
        <div className="sim-meta">
          <span className="sim-progress-text">
            {questionLabel} {index + 1} {ofLabel} {total}
          </span>
        </div>
        <div className="pbar-track">
          <div className="pbar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="qcard">
        <p className="qtext">{tx(q.q, lang)}</p>
        {isBilingual && q.q.en && <p className="qtext-en">{q.q.en}</p>}

        <div className="opts">
          {q.opts.map((o) => {
            const isChosen = picked === o.l;
            const isCorrect = Boolean(o.ok);
            let cls = "opt";
            if (picked) {
              if (isCorrect) cls += " correct";
              else if (isChosen) cls += " wrong";
            }
            return (
              <button
                key={o.l}
                className={cls}
                data-done={picked ? "1" : undefined}
                onClick={() => onPick(o.l)}
                type="button"
              >
                <span className="oletter">{o.l}</span>
                <span className="otext">
                  {tx(o.t, lang)}
                  {isBilingual && o.t.en && <span className="otext-en">{o.t.en}</span>}
                </span>
              </button>
            );
          })}
        </div>

        {picked && expText && (
          <div className="answer show">
            <div className="alabel">{answerLabel}</div>
            <div className="atext" dangerouslySetInnerHTML={{ __html: sanitizeHtml(expText) }} />
          </div>
        )}
      </div>

      {picked && (
        <div style={{ textAlign: "right", marginTop: 12 }}>
          <button type="button" className="btn btn-primary" onClick={onNext}>
            {nextLabel} →
          </button>
        </div>
      )}
    </div>
  );
}

function ResultView({
  score,
  total,
  c,
  onRetry
}: {
  score: number;
  total: number;
  c: (typeof COPY)[UiLang];
  onRetry: () => void;
}) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const good = pct >= WA_PASS_THRESHOLD * 100;

  return (
    <div className="sim-result" style={{ marginTop: 24 }}>
      <div className="sim-result-score">
        {score}/{total}
      </div>
      <div className="sim-result-pct" style={{ color: good ? "var(--green)" : "var(--orange)" }}>
        {pct}%
      </div>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 850, margin: "8px 0" }}>
        {good ? c.resultGoodTitle : c.resultSoftTitle}
      </h2>
      <p className="sim-result-msg">{good ? c.resultGoodBody : c.resultSoftBody}</p>
      <div className="sim-result-actions">
        <Link href="/practice" className="btn-green">
          {c.ctaPractice}
        </Link>
        <Link href="/auth/signup" className="btn-outline">
          {c.ctaAccount}
        </Link>
        <button type="button" className="btn-outline" onClick={onRetry}>
          {c.retry}
        </button>
      </div>
    </div>
  );
}
