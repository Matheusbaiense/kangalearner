"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, QUESTIONS } from "@kanga/core";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { categoryLucideIcon } from "@/lib/categoryLucideIcon";
import { useLang } from "@/contexts/LangContext";
import { tx, type UiLang } from "@/lib/i18n";
import { SK } from "@/lib/storageKeys";

/* ── Local types (full shape of the question data) ── */
type StateCode = "WA" | "NSW" | "VIC" | "QLD" | "SA" | "TAS" | "ACT" | "NT";
type Mode = "all" | "wrong" | "unanswered" | "saved" | "sim";

interface Opt {
  l: string;
  t: Record<UiLang, string>;
  ok: boolean;
}
type Cap = Record<string, string>;
interface Question {
  id: string;
  cat: string;
  states?: string[];
  q: Record<UiLang, string>;
  sign: string;
  cap: Cap | null;
  opts: Opt[];
  exp: Record<UiLang, string>;
  tip: Record<UiLang, string> | null;
}

const QS = QUESTIONS as unknown as Question[];

const STATE_CODES = ["WA", "NSW", "VIC", "QLD", "SA", "TAS", "ACT", "NT"] as const;
const STATE_STORAGE_KEY = SK.stateV2;
const STATE_STORAGE_LEGACY_KEY = SK.stateLegacy;
const STATE_CHANGED_EVENT = "kanga:state-changed";

function readStoredState(): StateCode {
  try {
    const raw =
      localStorage.getItem(STATE_STORAGE_KEY) ??
      localStorage.getItem(STATE_STORAGE_LEGACY_KEY);
    if (raw && STATE_CODES.includes(raw as StateCode)) return raw as StateCode;
  } catch {
    /* noop */
  }
  return "WA";
}

function persistState(code: StateCode): void {
  try {
    localStorage.setItem(STATE_STORAGE_KEY, code);
    localStorage.setItem(STATE_STORAGE_LEGACY_KEY, code);
  } catch {
    /* noop */
  }
}

type Answered = Record<string, { chosen: string; correct: boolean }>;

/* ── helpers ── */
function pct(correct: number, total: number) {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

function spawnConfetti(x: number, y: number) {
  const colors = ["#F4A900", "#30D158", "#FFBE33", "#fff", "#52B788"];
  for (let i = 0; i < 20; i++) {
    const d = document.createElement("div");
    d.className = "confetti-dot";
    d.style.cssText = `left:${x}px;top:${y}px;background:${colors[i % colors.length]};
      --dx:${(Math.random() - 0.5) * 170}px;--dy:${-(Math.random() * 130 + 60)}px;
      width:${5 + Math.random() * 6}px;height:${5 + Math.random() * 6}px;
      border-radius:${Math.random() > 0.5 ? "50%" : "3px"};`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 900);
  }
}

/* ── QuizCard ── */
function QuizCard({
  q,
  lang,
  isBilingual,
  answered,
  onPick,
  answerLabel,
  isSaved,
  onToggleSave,
  saveLabel,
  unsaveLabel,
}: {
  q: Question;
  lang: UiLang;
  isBilingual: boolean;
  answered: Answered;
  onPick: (qid: string, letter: string, ev: React.MouseEvent) => void;
  answerLabel: string;
  isSaved?: boolean;
  onToggleSave?: (qid: string) => void;
  saveLabel?: string;
  unsaveLabel?: string;
}) {
  const bilingual = isBilingual;
  const state = answered[q.id];
  const catData = CATEGORIES.find((c) => c.key === q.cat);
  const CatIco = categoryLucideIcon(q.cat);
  const expText = tx(q.exp, lang);
  const expTextEn = bilingual ? tx(q.exp, "en") : null;
  const tipText = q.tip ? tx(q.tip, lang) : "";

  return (
    <div className="qcard" id={q.id}>
      <div className="qmeta">
        <span className="qnum">{q.id}</span>
        <span className="qcat-badge">
          <CatIco className="qcat-ico" aria-hidden />
          {catData?.label?.[lang] ?? q.cat}
        </span>
        {onToggleSave && (
          <button
            onClick={() => onToggleSave(q.id)}
            title={isSaved ? unsaveLabel : saveLabel}
            aria-label={isSaved ? unsaveLabel : saveLabel}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, padding: "0 2px", color: isSaved ? "var(--green)" : "var(--muted)", flexShrink: 0 }}
          >
            {isSaved ? "★" : "☆"}
          </button>
        )}
      </div>

      <p className="qtext">{tx(q.q, lang)}</p>
      {bilingual && q.q.en && (
        <p className="qtext-en">{q.q.en}</p>
      )}

      {q.sign && (
        <div className="sign-box">
          {/^\/?assets\//.test(q.sign) ? (
            <img
              src={q.sign}
              alt={q.cap ? tx(q.cap, lang) : "Road sign"}
              loading="lazy"
              decoding="async"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : null}
          {q.cap && <div className="img-cap">{tx(q.cap, lang)}</div>}
        </div>
      )}

      <div className="opts">
        {q.opts.map((o) => {
          const isChosen = state?.chosen === o.l;
          const isCorrect = Boolean(o.ok);
          let cls = "opt";
          if (state) {
            if (isCorrect) cls += state.correct ? " correct" : " missed";
            else if (isChosen && !state.correct) cls += " wrong";
          }
          return (
            <button
              key={o.l}
              className={cls}
              data-done={state ? "1" : undefined}
              onClick={(ev) => !state && onPick(q.id, o.l, ev)}
            >
              <span className="oletter">{o.l}</span>
              <span className="otext">
                {tx(o.t, lang)}
                {bilingual && o.t.en && (
                  <span className="otext-en">{o.t.en}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {state && expText && (
        <div className="answer show">
          <div className="alabel">
            <Icons.success className="alabel-ico" aria-hidden />
            {answerLabel}
          </div>
          <div className="atext" dangerouslySetInnerHTML={{ __html: sanitizeHtml(expText) }} />
          {bilingual && expTextEn && (
            <div
              className="atext atext-en"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(expTextEn) }}
            />
          )}
          {tipText && (
            <div className="atip">
              <Icons.lightbulb className="atip-ico" aria-hidden />
              <span>{tipText}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── ScoreSidebar ── */
function ScoreSidebar({
  answered,
  onReset,
  yourProgressLabel,
  scoreLabel,
  correctLabel,
  resetLabel,
  dashboardLabel
}: {
  answered: Answered;
  onReset: () => void;
  yourProgressLabel: string;
  scoreLabel: string;
  correctLabel: string;
  resetLabel: string;
  dashboardLabel: string;
}) {
  const total = Object.keys(answered).length;
  const correct = Object.values(answered).filter((a) => a.correct).length;
  const p = pct(correct, total);

  const catStats = useMemo(() => {
    const map: Record<string, { total: number; correct: number }> = {};
    Object.entries(answered).forEach(([qid, a]) => {
      const q = QS.find((x) => x.id === qid);
      if (!q) return;
      if (!map[q.cat]) map[q.cat] = { total: 0, correct: 0 };
      map[q.cat].total++;
      if (a.correct) map[q.cat].correct++;
    });
    return Object.entries(map)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 6);
  }, [answered]);

  const scoreColor =
    total === 0
      ? "var(--ink)"
      : p >= 80
        ? "var(--green)"
        : p >= 60
          ? "var(--orange)"
          : "var(--red)";

  return (
    <aside className="panel score-sidebar">
      <p className="panel-title">{yourProgressLabel}</p>
      <span className="slabel">{scoreLabel}</span>
      <span className="score-val" style={{ color: scoreColor }}>
        {correct} / {total}
      </span>
      {total > 0 && (
        <span className="score-pct">
          {p}% {correctLabel}
        </span>
      )}
      <div className="pbar-track">
        <div className="pbar-fill" style={{ width: `${p}%` }} />
      </div>

      {catStats.length > 0 && (
        <div className="score-cats">
          {catStats.map(([cat, s]) => {
            const CatIco = categoryLucideIcon(cat);
            const cp = pct(s.correct, s.total);
            return (
              <div className="score-cat-row" key={cat}>
                <span className="score-cat-name">
                  <CatIco className="score-cat-ico" aria-hidden />
                  {cat}
                </span>
                <span className="score-cat-frac">
                  {s.correct}/{s.total}
                </span>
                <div className="score-cat-track">
                  <div className="score-cat-fill" style={{ width: `${cp}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button className="btn-reset" onClick={onReset}>
        {resetLabel}
      </button>

      <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
        <Link
          href="/dashboard"
          style={{ fontSize: ".78rem", fontWeight: 800, color: "var(--green)" }}
        >
          {dashboardLabel}
        </Link>
      </div>
    </aside>
  );
}

/* ── Main PracticeClient ── */
export function PracticeClient({ initialMode }: { initialMode?: Mode }) {
  const searchParams = useSearchParams();
  const requestedMode = searchParams.get("mode");
  const { uiLang: lang, isBilingual, s } = useLang();
  const [selectedState, setSelectedState] = useState<StateCode>(() => readStoredState());
  const [mode, setMode] = useState<Mode>(requestedMode === "sim" ? "sim" : initialMode ?? "all");
  const [cat, setCat] = useState("all");
  const [answered, setAnswered] = useState<Answered>({});
  const [saved, setSaved] = useState<Set<string>>(new Set());

  /* Sim state */
  const [simQueue, setSimQueue] = useState<Question[]>([]);
  const [simIdx, setSimIdx] = useState(0);
  const [simDone, setSimDone] = useState(false);
  const [simResult, setSimResult] = useState({ score: 0, total: 0 });
  const simResultRef = useRef({ score: 0, total: 0 });

  /* ── Load answered + saved from localStorage ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SK.answered);
      if (raw) setAnswered(JSON.parse(raw));
    } catch {}
    try {
      const savedRaw = localStorage.getItem(SK.saved);
      if (savedRaw) setSaved(new Set(JSON.parse(savedRaw)));
    } catch {}
  }, []);

  /* ── Sync state from nav selector (same tab or after navigation) ── */
  useEffect(() => {
    const onStateChanged = (event: Event) => {
      const code = (event as CustomEvent<string>).detail;
      if (!code || !STATE_CODES.includes(code as StateCode)) return;
      const next = code as StateCode;
      setSelectedState(next);
      persistState(next);
    };
    window.addEventListener(STATE_CHANGED_EVENT, onStateChanged);
    return () => window.removeEventListener(STATE_CHANGED_EVENT, onStateChanged);
  }, []);

  /* ── Allow /practice?mode=sim to start the mock test flow ── */
  useEffect(() => {
    if (requestedMode === "sim") {
      setMode("sim");
      return;
    }
    setMode(initialMode ?? "all");
  }, [requestedMode, initialMode]);

  /* ── Start sim when mode switches ── */
  useEffect(() => {
    if (mode !== "sim") return;
    const shuffled = [...QS].sort(() => Math.random() - 0.5).slice(0, 30);
    setSimQueue(shuffled);
    setSimIdx(0);
    setSimDone(false);
  }, [mode]);

  /* ── Filtered questions for study modes ── */
  const filtered = useMemo(() => {
    let qs = QS.filter((q) => !q.states || q.states.includes(selectedState));
    if (cat !== "all") qs = qs.filter((q) => q.cat === cat);
    if (mode === "wrong") qs = qs.filter((q) => answered[q.id] && !answered[q.id].correct);
    if (mode === "unanswered") qs = qs.filter((q) => !answered[q.id]);
    if (mode === "saved") qs = qs.filter((q) => saved.has(q.id));
    return qs;
  }, [mode, cat, answered, selectedState, saved]);

  /* Group study questions by category */
  const grouped = useMemo(() => {
    const m: Record<string, Question[]> = {};
    filtered.forEach((q) => {
      if (!m[q.cat]) m[q.cat] = [];
      m[q.cat].push(q);
    });
    return m;
  }, [filtered]);

  /* ── Sync attempt to Supabase (silent — 401 ok for guests) ── */
  const syncAttempt = useCallback(
    (qid: string, cat: string, isCorrect: boolean, chosen: string) => {
      fetch("/api/attempts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question_id: qid,
          state: selectedState,
          category: cat,
          is_correct: isCorrect,
          chosen,
          source: "web"
        }),
        keepalive: true
      }).catch(() => {});
    },
    [selectedState]
  );

  /* ── Pick an answer ── */
  const pick = useCallback(
    (qid: string, letter: string, ev: React.MouseEvent, isSim = false) => {
      if (answered[qid]) return;
      const q = QS.find((x) => x.id === qid);
      if (!q) return;
      const opt = q.opts.find((o) => o.l === letter);
      if (!opt) return;
      const correct = Boolean(opt.ok);

      const next: Answered = { ...answered, [qid]: { chosen: letter, correct } };
      setAnswered(next);
      try {
        localStorage.setItem(SK.answered, JSON.stringify(next));
      } catch {}

      if (correct) {
        const rect = (ev.target as HTMLElement).getBoundingClientRect();
        spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      syncAttempt(qid, q.cat, correct, letter);

      if (isSim) {
        setTimeout(() => {
          setSimIdx((prev) => {
            const nextIdx = prev + 1;
            if (nextIdx >= simQueue.length) {
              const score = simQueue.filter((sq) => next[sq.id]?.correct).length;
              const result = { score, total: simQueue.length };
              simResultRef.current = result;
              setSimResult(result);
              setSimDone(true);
              fetch("/api/mock-sessions", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  state: selectedState,
                  score,
                  total: simQueue.length,
                  source: "web"
                }),
                keepalive: true
              }).catch(() => {});
            }
            return nextIdx;
          });
        }, 900);
      }
    },
    [answered, simQueue, selectedState, syncAttempt]
  );

  /* ── Toggle save ── */
  function toggleSave(qid: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(qid)) next.delete(qid);
      else next.add(qid);
      try { localStorage.setItem(SK.saved, JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  /* ── Reset ── */
  function resetAll() {
    setAnswered({});
    try {
      localStorage.removeItem(SK.answered);
    } catch {}
  }

  /* ── Change mode ── */
  function changeMode(m: Mode) {
    setMode(m);
    if (m !== "sim") setSimDone(false);
  }

  /* ──────────────── RENDER ──────────────── */

  const modes: { key: Mode; label: string }[] = [
    { key: "all", label: s.allQuestions },
    { key: "wrong", label: s.wrongAnswers },
    { key: "unanswered", label: s.unanswered },
    { key: "saved", label: `${s.savedMode}${saved.size > 0 ? ` (${saved.size})` : ""}` },
    { key: "sim", label: s.mockTestMode }
  ];

  return (
    <div className="app-page">
      <div className="app-container app-section">
        <div className="page-header">
          <h1 className="page-title">{s.practice}</h1>
          <p className="page-sub">
            {QS.length} questions · {CATEGORIES.length} topics · WA road rules
          </p>
        </div>

        <div className="app-shell">
          {/* ── LEFT SIDEBAR ── */}
          <aside className="panel panel-pad">
            <p className="panel-title">{s.studyMode}</p>

            <div className="mode-bar">
              {modes.map((m) => (
                <button
                  key={m.key}
                  className={`fmode${mode === m.key ? " active" : ""}`}
                  onClick={() => changeMode(m.key)}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {mode !== "sim" && (
              <div className="filter-wrap">
                <p className="filter-label">{s.filterByTopic}</p>
                <div className="filter-bar">
                  <button
                    className={`fcat${cat === "all" ? " active" : ""}`}
                    onClick={() => setCat("all")}
                  >
                    {s.allTopics}
                  </button>
                  {CATEGORIES.map((c) => {
                    const CI = categoryLucideIcon(c.key);
                    return (
                      <button
                        key={c.key}
                        className={`fcat${cat === c.key ? " active" : ""}`}
                        onClick={() => setCat(c.key)}
                        type="button"
                      >
                        <CI className="fcat-ico" aria-hidden />
                        {c.label[lang] ?? c.label.en}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* ── CENTER: QUIZ or SIM ── */}
          <section className="panel quiz-panel">
            {mode === "sim" ? (
              <SimView
                queue={simQueue}
                idx={simIdx}
                done={simDone}
                result={simResult}
                lang={lang}
                isBilingual={isBilingual}
                answered={answered}
                onPick={(qid, letter, ev) => pick(qid, letter, ev, true)}
                onRestart={() => changeMode("sim")}
                onStudy={() => changeMode("all")}
                s={s}
              />
            ) : (
              <StudyView
                grouped={grouped}
                lang={lang}
                isBilingual={isBilingual}
                answered={answered}
                onPick={(qid, letter, ev) => pick(qid, letter, ev, false)}
                noQuestionsTitle={mode === "saved" ? s.noSavedTitle : s.noQuestionsTitle}
                noQuestionsSub={mode === "saved" ? s.noSavedSub : s.noQuestionsSub}
                answerLabel={s.answer}
                saved={saved}
                onToggleSave={toggleSave}
                saveLabel={s.saveQuestion}
                unsaveLabel={s.unsaveQuestion}
              />
            )}
          </section>

          {/* ── RIGHT SIDEBAR ── */}
          <ScoreSidebar
            answered={answered}
            onReset={resetAll}
            yourProgressLabel={s.yourProgress}
            scoreLabel={s.score}
            correctLabel={s.correctLabel}
            resetLabel={s.resetAll}
            dashboardLabel={s.viewDashboard}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Study view (all / wrong / unanswered / saved modes) ── */
function StudyView({
  grouped,
  lang,
  isBilingual,
  answered,
  onPick,
  noQuestionsTitle,
  noQuestionsSub,
  answerLabel,
  saved,
  onToggleSave,
  saveLabel,
  unsaveLabel,
}: {
  grouped: Record<string, Question[]>;
  lang: UiLang;
  isBilingual: boolean;
  answered: Answered;
  onPick: (qid: string, letter: string, ev: React.MouseEvent) => void;
  noQuestionsTitle: string;
  noQuestionsSub: string;
  answerLabel: string;
  saved: Set<string>;
  onToggleSave: (qid: string) => void;
  saveLabel: string;
  unsaveLabel: string;
}) {
  const entries = Object.entries(grouped);

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <IconBadge icon={Icons.party} tone="success" size="lg" />
        </div>
        <div className="empty-title">{noQuestionsTitle}</div>
        <div className="empty-sub">{noQuestionsSub}</div>
      </div>
    );
  }

  return (
    <>
      {entries.map(([cat, qs]) => {
        const catData = CATEGORIES.find((c) => c.key === cat);
        const HeadIco = categoryLucideIcon(cat);
        return (
          <div key={cat}>
            <div className="sec-head">
              <HeadIco className="sec-head-ico" aria-hidden />
              <span>{catData?.label?.[lang] ?? cat}</span>
            </div>
            {qs.map((q) => (
              <QuizCard
                key={q.id}
                q={q}
                lang={lang}
                isBilingual={isBilingual}
                answered={answered}
                onPick={onPick}
                answerLabel={answerLabel}
                isSaved={saved.has(q.id)}
                onToggleSave={onToggleSave}
                saveLabel={saveLabel}
                unsaveLabel={unsaveLabel}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}

/* ── Sim view (mock test) ── */
function SimView({
  queue,
  idx,
  done,
  result,
  lang,
  isBilingual,
  answered,
  onPick,
  onRestart,
  onStudy,
  s
}: {
  queue: Question[];
  idx: number;
  done: boolean;
  result: { score: number; total: number };
  lang: UiLang;
  isBilingual: boolean;
  answered: Answered;
  onPick: (qid: string, letter: string, ev: React.MouseEvent) => void;
  onRestart: () => void;
  onStudy: () => void;
  s: Record<string, string>;
}) {
  if (queue.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <IconBadge
            icon={Icons.loader}
            tone="muted"
            size="lg"
            iconClassName="icon-badge__icon--spin"
          />
        </div>
        <div className="empty-title">{s.loading}</div>
      </div>
    );
  }

  if (done) {
    const p = pct(result.score, result.total);
    const pass = p >= 80;
    return (
      <div className="sim-result">
        <div className="sim-result-emoji">
          <IconBadge
            icon={pass ? Icons.trophy : Icons.book}
            tone={pass ? "success" : "muted"}
            size="lg"
            label={pass ? s.pass : s.fail}
          />
        </div>
        <div className="sim-result-score">
          {result.score}/{result.total}
        </div>
        <div className="sim-result-pct" style={{ color: pass ? "var(--green)" : "var(--red)" }}>
          {p}%
        </div>
        <div className="sim-result-msg">
          {pass
            ? (lang === "en"
                ? "Well done! You passed the mock test."
                : lang === "pt"
                  ? "Parabéns! Você passou no simulado."
                  : "¡Felicidades! Pasaste el simulacro.")
            : (lang === "en"
                ? "Keep practising — you need 80% to pass. Review wrong answers in study mode."
                : lang === "pt"
                  ? "Continue praticando — você precisa de 80% para passar. Revise as respostas erradas no modo de estudo."
                  : "Sigue practicando — necesitas 80% para aprobar. Revisa las respuestas incorrectas en el modo de estudio.")}
        </div>
        <div className="sim-result-actions">
          <button className="btn-green" onClick={onRestart}>
            {lang === "en" ? "Try again" : lang === "pt" ? "Tentar de novo" : "Intentar de nuevo"}
          </button>
          <button className="btn-outline" onClick={onStudy}>
            {lang === "en" ? "Back to study" : lang === "pt" ? "Voltar ao estudo" : "Volver al estudio"}
          </button>
          <Link href="/dashboard" className="btn-outline">
            {lang === "en" ? "View dashboard" : lang === "pt" ? "Ver painel" : "Ver panel"}
          </Link>
        </div>
      </div>
    );
  }

  const current = queue[idx];
  if (!current) return null;
  const progress = Math.round((idx / queue.length) * 100);

  return (
    <>
      <div className="sim-header">
        <div className="sim-meta">
          <span className="sim-label">{s.mockTest}</span>
          <span className="sim-progress-text">
            {idx + 1} / {queue.length}
          </span>
        </div>
        <div className="pbar-track">
          <div className="pbar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <QuizCard
        key={current.id}
        q={current}
        lang={lang}
        isBilingual={isBilingual}
        answered={answered}
        onPick={onPick}
        answerLabel={s.answer}
      />
    </>
  );
}
