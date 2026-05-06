"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORIES, QUESTIONS } from "@kanga/core";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { categoryLucideIcon } from "@/lib/categoryLucideIcon";

/* ── Local types (full shape of the question data) ── */
type Lang = "en" | "pt" | "es";
type StateCode = "WA" | "NSW" | "VIC" | "QLD" | "SA" | "TAS" | "ACT" | "NT";
type Mode = "all" | "wrong" | "unanswered" | "sim";

interface Opt {
  l: string;
  t: Record<Lang, string>;
  ok: boolean;
}
interface Cap {
  en: string;
  pt: string;
  es: string;
}
interface Question {
  id: string;
  cat: string;
  states?: string[];
  q: Record<Lang, string>;
  sign: string;
  cap: Cap | null;
  opts: Opt[];
  exp: Record<Lang, string>;
  tip: Record<Lang, string> | null;
}

const QS = QUESTIONS as unknown as Question[];

type Answered = Record<string, { chosen: string; correct: boolean }>;

/* ── helpers ── */
function tx(obj: Record<Lang, string> | null | undefined, lang: Lang): string {
  if (!obj) return "";
  return obj[lang] ?? obj.en ?? "";
}

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
  answered,
  onPick
}: {
  q: Question;
  lang: Lang;
  answered: Answered;
  onPick: (qid: string, letter: string, ev: React.MouseEvent) => void;
}) {
  const state = answered[q.id];
  const catData = CATEGORIES.find((c) => c.key === q.cat);
  const CatIco = categoryLucideIcon(q.cat);
  const expText = tx(q.exp, lang);
  const tipText = q.tip ? tx(q.tip, lang) : "";

  return (
    <div className="qcard" id={q.id}>
      <div className="qmeta">
        <span className="qnum">{q.id}</span>
        <span className="qcat-badge">
          <CatIco className="qcat-ico" aria-hidden />
          {catData?.label?.[lang] ?? q.cat}
        </span>
      </div>

      <p className="qtext">{tx(q.q, lang)}</p>

      {q.sign && (
        <div className="sign-box">
          {/^\/?assets\//.test(q.sign) ? (
            // `sign` is a path; render as an image (avoid HTML injection).
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
              <span className="otext">{tx(o.t, lang)}</span>
            </button>
          );
        })}
      </div>

      {state && expText && (
        <div className="answer show">
          <div className="alabel">
            <Icons.success className="alabel-ico" aria-hidden />
            Answer
          </div>
          <div className="atext" dangerouslySetInnerHTML={{ __html: sanitizeHtml(expText) }} />
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
function ScoreSidebar({ answered, onReset }: { answered: Answered; onReset: () => void }) {
  const total = Object.keys(answered).length;
  const correct = Object.values(answered).filter((a) => a.correct).length;
  const p = pct(correct, total);

  /* Per-category mini stats */
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
      <p className="panel-title">Your Progress</p>
      <span className="slabel">Score</span>
      <span className="score-val" style={{ color: scoreColor }}>
        {correct} / {total}
      </span>
      {total > 0 && <span className="score-pct">{p}% correct</span>}
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
        Reset all
      </button>

      <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
        <Link
          href="/dashboard"
          style={{ fontSize: ".78rem", fontWeight: 800, color: "var(--green)" }}
        >
          View full dashboard →
        </Link>
      </div>
    </aside>
  );
}

/* ── Main PracticeClient ── */
export function PracticeClient({ initialMode }: { initialMode?: Mode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [selectedState] = useState<StateCode>("WA"); // expand later
  const [mode, setMode] = useState<Mode>(initialMode ?? "all");
  const [cat, setCat] = useState("all");
  const [answered, setAnswered] = useState<Answered>({});

  /* Sim state */
  const [simQueue, setSimQueue] = useState<Question[]>([]);
  const [simIdx, setSimIdx] = useState(0);
  const [simDone, setSimDone] = useState(false);
  const [simResult, setSimResult] = useState({ score: 0, total: 0 });
  const simResultRef = useRef({ score: 0, total: 0 });

  /* ── Load / persist ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kl-answered");
      if (raw) setAnswered(JSON.parse(raw));
      const savedLang = localStorage.getItem("kl-lang") as Lang | null;
      if (savedLang && ["en", "pt", "es"].includes(savedLang)) setLang(savedLang);
    } catch {}
  }, []);

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
    return qs;
  }, [mode, cat, answered, selectedState]);

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
        localStorage.setItem("kl-answered", JSON.stringify(next));
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
              /* calculate score from simQueue + new answers */
              const score = simQueue.filter((sq) => {
                const a = next[sq.id];
                return a?.correct;
              }).length;
              const result = { score, total: simQueue.length };
              simResultRef.current = result;
              setSimResult(result);
              setSimDone(true);
              /* Save mock session (silent) */
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

  /* ── Reset ── */
  function resetAll() {
    setAnswered({});
    try {
      localStorage.removeItem("kl-answered");
    } catch {}
  }

  /* ── Change mode ── */
  function changeMode(m: Mode) {
    setMode(m);
    if (m !== "sim") setSimDone(false);
  }

  /* ── Change lang ── */
  function changeLang(l: Lang) {
    setLang(l);
    try {
      localStorage.setItem("kl-lang", l);
    } catch {}
  }

  /* ──────────────── RENDER ──────────────── */

  const modes: { key: Mode; label: string }[] = [
    { key: "all", label: "All questions" },
    { key: "wrong", label: "Wrong answers" },
    { key: "unanswered", label: "Unanswered" },
    { key: "sim", label: "Mock test (30)" }
  ];

  return (
    <div className="app-page">
      {/* Lang selector strip */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "white",
          padding: "10px 28px",
          display: "flex",
          alignItems: "center",
          gap: 10
        }}
      >
        <span
          style={{
            fontSize: ".78rem",
            fontWeight: 800,
            color: "var(--muted2)",
            textTransform: "uppercase",
            letterSpacing: ".08em"
          }}
        >
          Language:
        </span>
        {(["en", "pt", "es"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => changeLang(l)}
            style={{
              height: 30,
              padding: "0 12px",
              borderRadius: 8,
              border: "1.5px solid",
              borderColor: lang === l ? "var(--green2)" : "var(--border)",
              background: lang === l ? "var(--green3)" : "white",
              color: lang === l ? "var(--green)" : "var(--muted2)",
              fontWeight: 800,
              fontSize: ".78rem"
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="app-container app-section">
        <div className="page-header">
          <h1 className="page-title">Practice</h1>
          <p className="page-sub">
            {QS.length} questions · {CATEGORIES.length} topics · WA road rules
          </p>
        </div>

        <div className="app-shell">
          {/* ── LEFT SIDEBAR ── */}
          <aside className="panel panel-pad">
            <p className="panel-title">Study Mode</p>

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
                <p className="filter-label">Filter by topic</p>
                <div className="filter-bar">
                  <button
                    className={`fcat${cat === "all" ? " active" : ""}`}
                    onClick={() => setCat("all")}
                  >
                    All topics
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
                answered={answered}
                onPick={(qid, letter, ev) => pick(qid, letter, ev, true)}
                onRestart={() => changeMode("sim")}
                onStudy={() => changeMode("all")}
              />
            ) : (
              <StudyView
                grouped={grouped}
                lang={lang}
                answered={answered}
                onPick={(qid, letter, ev) => pick(qid, letter, ev, false)}
              />
            )}
          </section>

          {/* ── RIGHT SIDEBAR ── */}
          <ScoreSidebar answered={answered} onReset={resetAll} />
        </div>
      </div>
    </div>
  );
}

/* ── Study view (all / wrong / unanswered modes) ── */
function StudyView({
  grouped,
  lang,
  answered,
  onPick
}: {
  grouped: Record<string, Question[]>;
  lang: Lang;
  answered: Answered;
  onPick: (qid: string, letter: string, ev: React.MouseEvent) => void;
}) {
  const entries = Object.entries(grouped);

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <IconBadge icon={Icons.party} tone="success" size="lg" />
        </div>
        <div className="empty-title">No questions here!</div>
        <div className="empty-sub">Try a different mode or reset your progress.</div>
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
              <QuizCard key={q.id} q={q} lang={lang} answered={answered} onPick={onPick} />
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
  answered,
  onPick,
  onRestart,
  onStudy
}: {
  queue: Question[];
  idx: number;
  done: boolean;
  result: { score: number; total: number };
  lang: Lang;
  answered: Answered;
  onPick: (qid: string, letter: string, ev: React.MouseEvent) => void;
  onRestart: () => void;
  onStudy: () => void;
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
        <div className="empty-title">Loading mock test…</div>
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
            label={pass ? "Passed" : "Keep practising"}
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
            ? "Well done! You passed the mock test."
            : "Keep practising — you need 80% to pass. Review wrong answers in study mode."}
        </div>
        <div className="sim-result-actions">
          <button className="btn-green" onClick={onRestart}>
            Try again
          </button>
          <button className="btn-outline" onClick={onStudy}>
            Back to study
          </button>
          <Link href="/dashboard" className="btn-outline">
            View dashboard
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
      {/* Progress header */}
      <div className="sim-header">
        <div className="sim-meta">
          <span className="sim-label">Mock Test</span>
          <span className="sim-progress-text">
            {idx + 1} / {queue.length}
          </span>
        </div>
        <div className="pbar-track">
          <div className="pbar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Current question */}
      <QuizCard key={current.id} q={current} lang={lang} answered={answered} onPick={onPick} />
    </>
  );
}
