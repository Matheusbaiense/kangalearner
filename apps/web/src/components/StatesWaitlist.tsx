"use client";

import { useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { WAITLIST_STATES, type WaitlistState } from "@/lib/api/newsletterValidation";

// WA (active) + 3 next states (coming soon). SA/TAS/ACT/NT stay select-only to reduce noise.
const AU_STATES: { code: string; available: boolean }[] = [
  { code: "WA", available: true },
  { code: "NSW", available: false },
  { code: "VIC", available: false },
  { code: "QLD", available: false }
];

export function StatesWaitlist() {
  const { s } = useLang();
  const [selected, setSelected] = useState<WaitlistState>("NSW");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const emailRef = useRef<HTMLInputElement>(null);

  function pickState(code: WaitlistState) {
    setSelected(code);
    emailRef.current?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `waitlist:${selected}` })
      });
      const json = await res.json().catch(() => ({}));
      setStatus(json?.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="states-inner">
      <div className="states-grid">
        {AU_STATES.map((st) =>
          st.available ? (
            <div key={st.code} className="state-card active">
              <span className="state-code">{st.code}</span>
              <span className="state-badge">{s.stateAvailable}</span>
            </div>
          ) : (
            <button
              key={st.code}
              type="button"
              className="state-card coming-soon"
              onClick={() => pickState(st.code as WaitlistState)}
              aria-label={`${st.code} — ${s.comingSoon}. ${s.waitlistCardAria}`}
            >
              <span className="state-code">{st.code}</span>
              <span className="state-badge">{s.comingSoon}</span>
            </button>
          )
        )}
      </div>
      <p className="states-more-note">{s.statesMoreNote}</p>
      {status === "success" ? (
        <p className="waitlist-success" role="status">
          {s.waitlistSuccess}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="waitlist-form" noValidate>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value as WaitlistState)}
            disabled={status === "loading"}
            className="waitlist-select"
            aria-label={s.waitlistStateLabel}
          >
            {WAITLIST_STATES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            ref={emailRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={s.waitlistEmailPlaceholder}
            required
            disabled={status === "loading"}
            className="waitlist-input"
            aria-label={s.waitlistEmailPlaceholder}
          />
          <button type="submit" disabled={status === "loading"} className="waitlist-btn">
            {status === "loading" ? "…" : s.waitlistCta}
          </button>
          {status === "error" && (
            <p className="waitlist-error" role="alert">
              {s.waitlistError}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
