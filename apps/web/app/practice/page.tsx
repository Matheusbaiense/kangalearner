"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, QUESTIONS } from "@kanga/core";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";

type Lang = "en" | "pt" | "es";
type StateCode = "WA" | "NSW" | "VIC" | "QLD" | "SA" | "TAS" | "ACT" | "NT";

function safeLang(l?: string): Lang {
  if (l === "pt" || l === "es" || l === "en") return l;
  return "en";
}

export default function PracticePage() {
  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch {
      return null;
    }
  }, []);

  const [lang, setLang] = useState<Lang>("en");
  const [state, setState] = useState<StateCode>("WA");
  const [cat, setCat] = useState<string>("all");
  const [answered, setAnswered] = useState<Record<string, { chosen: string; correct: boolean }>>({});

  const filtered = useMemo(() => {
    return QUESTIONS.filter((q) => !q.states || q.states.includes(state)).filter((q) => cat === "all" || q.cat === cat);
  }, [state, cat]);

  async function syncAttempt(payload: {
    question_id: string;
    state: string;
    category?: string;
    is_correct: boolean;
    chosen?: string;
  }) {
    // Silent mode: if user not logged in, API returns 401 and we ignore.
    try {
      await fetch("/api/attempts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, source: "web" }),
        keepalive: true
      });
    } catch {
      // ignore
    }
  }

  async function pick(qid: string, letter: string) {
    if (answered[qid]) return;
    const q = QUESTIONS.find((x) => x.id === qid);
    if (!q) return;
    const opt = q.opts.find((o) => o.l === letter);
    if (!opt) return;
    const correct = Boolean(opt.ok);
    setAnswered((s) => ({ ...s, [qid]: { chosen: letter, correct } }));
    await syncAttempt({ question_id: qid, state, category: q.cat, is_correct: correct, chosen: letter });
  }

  const signedInHint = supabase ? "" : " (env missing)";

  return (
    <main style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>Practice</h1>
      <p style={{ color: "#475569" }}>
        React/TS practice view from <code>@kanga/core</code>
        {signedInHint}.
      </p>

      <section style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <label style={{ display: "grid", gap: 6, fontWeight: 800 }}>
          Language
          <select value={lang} onChange={(e) => setLang(safeLang(e.target.value))}>
            <option value="en">EN</option>
            <option value="pt">PT</option>
            <option value="es">ES</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6, fontWeight: 800 }}>
          State
          <select value={state} onChange={(e) => setState(e.target.value as StateCode)}>
            <option value="WA">WA</option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="QLD">QLD</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="ACT">ACT</option>
            <option value="NT">NT</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6, fontWeight: 800, minWidth: 240 }}>
          Category
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">All</option>
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.icon} {c.label[lang] ?? c.label.en}
              </option>
            ))}
          </select>
        </label>
      </section>

      <p style={{ marginTop: 16, color: "#64748b", fontWeight: 700 }}>
        Showing {filtered.length} questions
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {filtered.slice(0, 12).map((q) => {
          const done = answered[q.id];
          const qText = q.q[lang] ?? q.q.en;
          return (
            <article key={q.id} style={{ border: "1px solid #e2e8f0", borderRadius: 14, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <strong>{q.id}</strong>
                <span style={{ color: "#64748b", fontWeight: 700 }}>{q.cat}</span>
              </div>
              <p style={{ marginTop: 10, fontWeight: 800 }}>{qText}</p>
              {q.sign ? (
                <div style={{ marginTop: 10 }}>
                  <img src={q.sign} alt={q.cap?.[lang] ?? "Road sign"} width={170} height={170} />
                </div>
              ) : null}
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                {q.opts.map((o) => {
                  const optText = o.t[lang] ?? o.t.en;
                  const isChosen = done?.chosen === o.l;
                  const isCorrect = Boolean(o.ok);
                  const bg = !done
                    ? "white"
                    : isCorrect
                      ? "#EAF5EF"
                      : isChosen
                        ? "#FEF2F2"
                        : "white";
                  const border = !done ? "#e2e8f0" : isCorrect ? "#7CCBA2" : isChosen ? "#FCA5A5" : "#e2e8f0";
                  return (
                    <button
                      key={o.l}
                      onClick={() => pick(q.id, o.l)}
                      disabled={Boolean(done)}
                      style={{
                        textAlign: "left",
                        padding: 10,
                        borderRadius: 12,
                        border: `1px solid ${border}`,
                        background: bg,
                        cursor: done ? "default" : "pointer",
                        fontWeight: 700
                      }}
                    >
                      <span style={{ display: "inline-block", width: 22 }}>{o.l}</span> {optText}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <p style={{ marginTop: 18, color: "#64748b", fontSize: 12 }}>
        QA tip: after answering while logged in, check Supabase tables <code>question_attempts</code> /
        <code>mock_sessions</code>.
      </p>
    </main>
  );
}

