"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORIES, WA_PASS_THRESHOLD, type Question } from "@kanga/core";
import { useQuestions } from "@/hooks/useQuestions";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { categoryLucideIcon } from "@/lib/categoryLucideIcon";
import { useLang } from "@/contexts/LangContext";
import { tx, type UiLang } from "@/lib/i18n";
import { SK } from "@/lib/storageKeys";
import { pct } from "@/lib/percent";
import { readStoredLicenceType, LICENCE_CHANGED_EVENT, type LicenceType } from "@/lib/licenceType";

/* ── Local types (full shape of the question data) ── */
type StateCode = "WA" | "NSW" | "VIC" | "QLD" | "SA" | "TAS" | "ACT" | "NT";
type Mode = "all" | "wrong" | "unanswered" | "saved";

interface Opt {
  l: string;
  t: Record<UiLang, string>;
  ok: boolean;
}
type Cap = Record<string, string>;
const STATE_CODES = ["WA", "NSW", "VIC", "QLD", "SA", "TAS", "ACT", "NT"] as const;
const STATE_STORAGE_KEY = SK.stateV2;
const STATE_STORAGE_LEGACY_KEY = SK.stateLegacy;
const STATE_CHANGED_EVENT = "kanga:state-changed";

function readStoredState(): StateCode {
  try {
    const raw =
      localStorage.getItem(STATE_STORAGE_KEY) ?? localStorage.getItem(STATE_STORAGE_LEGACY_KEY);
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

/* Static category lookup, built once (CATEGORIES is a static import). */
const CATEGORY_BY_KEY = new Map<string, (typeof CATEGORIES)[number]>(
  CATEGORIES.map((c) => [c.key, c])
);

/* ── QuizCard ── */
const QuizCard = memo(
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
    unsaveLabel
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
    const catData = CATEGORY_BY_KEY.get(q.cat);
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
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.1rem",
                lineHeight: 1,
                padding: "0 2px",
                color: isSaved ? "var(--green)" : "var(--muted)",
                flexShrink: 0
              }}
            >
              {isSaved ? "★" : "☆"}
            </button>
          )}
        </div>

        <p className="qtext">{tx(q.q, lang)}</p>
        {bilingual && q.q.en && <p className="qtext-en">{q.q.en}</p>}

        {(() => {
          const legacySign = q.sign?.match(/^assets\/icons\/signs\/(.+)$/);
          const signSrc = q.sign?.startsWith("/")
            ? q.sign
            : legacySign
              ? `/icons/signs/${legacySign[1]}`
              : null;
          const capLabel =
            q.cap == null ? null : typeof q.cap === "string" ? q.cap : tx(q.cap as Cap, lang);
          if (!signSrc && !capLabel) return null;
          return (
            <div className="sign-box">
              {signSrc ? (
                <img
                  src={signSrc}
                  alt={capLabel ?? "Road sign"}
                  loading="lazy"
                  decoding="async"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ) : null}
              {capLabel ? <div className="img-cap">{capLabel}</div> : null}
            </div>
          );
        })()}

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
                  {bilingual && o.t.en && <span className="otext-en">{o.t.en}</span>}
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
  },
  // Re-render a card only when ITS OWN answer state (or display inputs) change.
  // answered[q.id] keeps its reference for untouched questions (shallow spread in
  // pick). onPick/onToggleSave are stable (pick reads answered via a ref;
  // toggleSave is a functional setState), so omitting them is safe.
  (prev, next) =>
    prev.q === next.q &&
    prev.lang === next.lang &&
    prev.isBilingual === next.isBilingual &&
    prev.answered[prev.q.id] === next.answered[next.q.id] &&
    prev.isSaved === next.isSaved &&
    prev.answerLabel === next.answerLabel &&
    prev.saveLabel === next.saveLabel &&
    prev.unsaveLabel === next.unsaveLabel
);

/* ── ScoreSidebar ── */
function ScoreSidebar({
  questions,
  answered,
  onReset,
  yourProgressLabel,
  scoreLabel,
  correctLabel,
  resetLabel,
  dashboardLabel
}: {
  questions: Question[];
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
    const byId = new Map(questions.map((x) => [x.id, x]));
    const map: Record<string, { total: number; correct: number }> = {};
    Object.entries(answered).forEach(([qid, a]) => {
      const q = byId.get(qid);
      if (!q) return;
      if (!map[q.cat]) map[q.cat] = { total: 0, correct: 0 };
      map[q.cat].total++;
      if (a.correct) map[q.cat].correct++;
    });
    return Object.entries(map)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 6);
  }, [answered, questions]);

  const scoreColor =
    total === 0
      ? "var(--ink)"
      : p >= WA_PASS_THRESHOLD * 100
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
  const { questions: QS, loading: questionsLoading, error: questionsError } = useQuestions();
  const { uiLang: lang, isBilingual, s } = useLang();
  // Deterministic SSR value ("WA"); hydrated from localStorage in the mount effect
  // below. Reading localStorage in the initializer diverges the first client render
  // from the server HTML → React hydration error #418, aborting hydration and
  // leaving answer-option onClick handlers unattached.
  const [selectedState, setSelectedState] = useState<StateCode>("WA");
  // Same SSR-safe deferred-hydration pattern as selectedState above.
  const [licenceType, setLicenceType] = useState<LicenceType>("car");
  const [mode, setMode] = useState<Mode>(initialMode ?? "all");
  const [cat, setCat] = useState("all");
  const [answered, setAnswered] = useState<Answered>({});
  const [saved, setSaved] = useState<Set<string>>(new Set());

  // Mirror `answered` into a ref so `pick` can read the latest value without
  // depending on `answered`, keeps `pick` referentially stable so memoized
  // QuizCards never hold a stale closure that would wipe answers.
  const answeredRef = useRef<Answered>(answered);
  useEffect(() => {
    answeredRef.current = answered;
  }, [answered]);

  /* ── Load persisted state + answered + saved from localStorage ── */
  useEffect(() => {
    setSelectedState(readStoredState());
    setLicenceType(readStoredLicenceType());
    try {
      const raw = localStorage.getItem(SK.answered);
      if (raw) setAnswered(JSON.parse(raw));
    } catch {}
    try {
      const savedRaw = localStorage.getItem(SK.saved);
      if (savedRaw) setSaved(new Set(JSON.parse(savedRaw)));
    } catch {}
  }, []);

  /* ── Sync licence type from nav selector or onboarding (same tab) ── */
  useEffect(() => {
    const onLicenceChanged = () => setLicenceType(readStoredLicenceType());
    window.addEventListener(LICENCE_CHANGED_EVENT, onLicenceChanged);
    return () => window.removeEventListener(LICENCE_CHANGED_EVENT, onLicenceChanged);
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

  /* ── Keep mode in sync with the URL on client-side navigations ── */
  useEffect(() => {
    setMode(initialMode ?? "all");
  }, [initialMode]);

  /* ── Question pool for the selected licence type (state-filtered) ── */
  const licenceQS = useMemo(() => {
    const byLicence =
      licenceType === "motorcycle"
        ? QS.filter((q) => q.licenceType === "motorcycle")
        : QS.filter((q) => q.licenceType !== "motorcycle");
    return byLicence.filter((q) => !q.states || q.states.includes(selectedState));
  }, [QS, licenceType, selectedState]);

  /* Only show topics that actually have questions for the current licence type
     (e.g. "Motorcycle Safety" never appears for car students, and vice versa). */
  const visibleCategories = useMemo(() => {
    const catsInPool = new Set(licenceQS.map((q) => q.cat));
    return CATEGORIES.filter((c) => catsInPool.has(c.key));
  }, [licenceQS]);

  /* Reset an out-of-range topic filter when switching licence type. */
  useEffect(() => {
    if (cat !== "all" && !visibleCategories.some((c) => c.key === cat)) setCat("all");
  }, [visibleCategories, cat]);

  /* ── Filtered questions for study modes ── */
  const filtered = useMemo(() => {
    let qs = licenceQS;
    if (cat !== "all") qs = qs.filter((q) => q.cat === cat);
    if (mode === "wrong") qs = qs.filter((q) => answered[q.id] && !answered[q.id].correct);
    if (mode === "unanswered") qs = qs.filter((q) => !answered[q.id]);
    if (mode === "saved") qs = qs.filter((q) => saved.has(q.id));
    return qs;
  }, [mode, cat, answered, saved, licenceQS]);

  /* Group study questions by category */
  const grouped = useMemo(() => {
    const m: Record<string, Question[]> = {};
    filtered.forEach((q) => {
      if (!m[q.cat]) m[q.cat] = [];
      m[q.cat].push(q);
    });
    return m;
  }, [filtered]);

  /* ── Sync attempt to Supabase (silent, 401 ok for guests) ── */
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
      }).catch((err) => console.error("[practice] attempt sync failed:", err));
    },
    [selectedState]
  );

  /* ── Pick an answer ── */
  const pick = useCallback(
    (qid: string, letter: string, ev: React.MouseEvent) => {
      const current = answeredRef.current;
      if (current[qid]) return;
      const q = QS.find((x) => x.id === qid);
      if (!q) return;
      const opt = q.opts.find((o) => o.l === letter);
      if (!opt) return;
      const correct = Boolean(opt.ok);

      const next: Answered = { ...current, [qid]: { chosen: letter, correct } };
      setAnswered(next);
      answeredRef.current = next;
      try {
        localStorage.setItem(SK.answered, JSON.stringify(next));
      } catch {}

      if (correct) {
        const rect = (ev.target as HTMLElement).getBoundingClientRect();
        spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      syncAttempt(qid, q.cat, correct, letter);
    },
    [QS, selectedState, syncAttempt]
  );

  /* ── Toggle save ── */
  const toggleSave = useCallback((qid: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(qid)) next.delete(qid);
      else next.add(qid);
      try {
        localStorage.setItem(SK.saved, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  /* ── Reset ── */
  function resetAll() {
    setAnswered({});
    answeredRef.current = {};
    try {
      localStorage.removeItem(SK.answered);
    } catch {}
  }

  /* ── Change mode ── */
  function changeMode(m: Mode) {
    setMode(m);
  }

  /* ──────────────── RENDER ──────────────── */

  if (questionsLoading) {
    return (
      <div className="app-page">
        <div className="app-container app-section" aria-busy="true">
          <div className="page-header">
            <div className="sk-line sk-title" />
            <div className="sk-line sk-sub" />
          </div>
          <div className="quiz-skeletons">
            {[0, 1, 2].map((i) => (
              <div key={i} className="qcard qcard-skeleton">
                <div className="sk-line sk-w30" />
                <div className="sk-line sk-w90" />
                <div className="sk-line sk-w70" />
                <div className="sk-block" />
                <div className="sk-block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (questionsError) {
    return (
      <div className="app-page">
        <div className="app-container app-section">
          <p role="alert">{questionsError}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            {s.retry}
          </button>
        </div>
      </div>
    );
  }

  const modes: { key: Mode; label: string }[] = [
    { key: "all", label: s.allQuestions },
    { key: "wrong", label: s.wrongAnswers },
    { key: "unanswered", label: s.unanswered },
    { key: "saved", label: `${s.savedMode}${saved.size > 0 ? ` (${saved.size})` : ""}` }
  ];

  return (
    <div className="app-page">
      <div className="app-container app-section">
        <div className="page-header">
          <h1 className="page-title">{s.practice}</h1>
          <p className="page-sub">
            {licenceQS.length} {s.questionsWord} · {visibleCategories.length} {s.topicsWord} ·{" "}
            {selectedState} {s.roadRulesWord}
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

            <div className="filter-wrap">
              <p className="filter-label">{s.filterByTopic}</p>
              <div className="filter-bar">
                <button
                  className={`fcat${cat === "all" ? " active" : ""}`}
                  onClick={() => setCat("all")}
                >
                  {s.allTopics}
                </button>
                {visibleCategories.map((c) => {
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
          </aside>

          {/* ── CENTER: QUIZ ── */}
          <section className="panel quiz-panel">
            <StudyView
              grouped={grouped}
              lang={lang}
              isBilingual={isBilingual}
              answered={answered}
              onPick={(qid, letter, ev) => pick(qid, letter, ev)}
              noQuestionsTitle={mode === "saved" ? s.noSavedTitle : s.noQuestionsTitle}
              noQuestionsSub={mode === "saved" ? s.noSavedSub : s.noQuestionsSub}
              answerLabel={s.answer}
              saved={saved}
              onToggleSave={toggleSave}
              saveLabel={s.saveQuestion}
              unsaveLabel={s.unsaveQuestion}
            />
          </section>

          {/* ── RIGHT SIDEBAR ── */}
          <ScoreSidebar
            questions={QS}
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
  unsaveLabel
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
