"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { CONFIDENCE_ITEMS } from "@/lib/confidence";
import type { UiLang } from "@/lib/i18n";

/**
 * Confidence / Anxiety track (v1). Self-rate how you feel about common situations;
 * get a calm tip and a place to practise. Ratings persist client-side (localStorage).
 * A future `user_settings.confidence` (migration 027) can sync this for logged-in users.
 */

const STORAGE_KEY = "kl-confidence-v1";

const COPY: Record<
  UiLang,
  {
    kicker: string;
    title: string;
    sub: string;
    howFeel: string;
    scale: [string, string];
    practise: string;
    summaryLow: string;
    summaryOk: string;
  }
> = {
  en: {
    kicker: "Driving confidence",
    title: "Feeling nervous? That's normal. Let's build confidence",
    sub: "Rate how confident you feel about each situation. We'll point you to a calm tip and where to practise. Your answers stay on this device.",
    howFeel: "How confident do you feel?",
    scale: ["Anxious", "Confident"],
    practise: "Build confidence here",
    summaryLow:
      "Start with the situations you rated lowest. Small, focused practice builds real confidence fast.",
    summaryOk:
      "You're feeling solid across the board. Keep practising the ones you rated lower to stay sharp."
  },
  pt: {
    kicker: "Confiança ao volante",
    title: "Nervoso? É normal. Vamos construir confiança",
    sub: "Avalie como você se sente em cada situação. A gente aponta uma dica calma e onde praticar. Suas respostas ficam só neste dispositivo.",
    howFeel: "Quão confiante você se sente?",
    scale: ["Ansioso", "Confiante"],
    practise: "Ganhar confiança aqui",
    summaryLow:
      "Comece pelas situações que você avaliou mais baixo. Prática pequena e focada constrói confiança de verdade rápido.",
    summaryOk:
      "Você está firme no geral. Continue praticando as que avaliou mais baixo para se manter afiado."
  },
  es: {
    kicker: "Confianza al volante",
    title: "¿Nervioso? Es normal. Vamos a construir confianza",
    sub: "Evalúa cómo te sientes en cada situación. Te señalamos un consejo calmado y dónde practicar. Tus respuestas quedan solo en este dispositivo.",
    howFeel: "¿Qué tan seguro te sientes?",
    scale: ["Ansioso", "Seguro"],
    practise: "Gana confianza aquí",
    summaryLow:
      "Empieza por las situaciones que calificaste más bajo. Práctica pequeña y enfocada construye confianza real rápido.",
    summaryOk:
      "Te sientes firme en general. Sigue practicando las que calificaste más bajo para mantenerte afilado."
  }
};

type Ratings = Record<string, number>;

export default function ConfidencePage() {
  const { uiLang: lang } = useLang();
  const c = COPY[lang];
  const [ratings, setRatings] = useState<Ratings>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRatings(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }, []);

  function rate(key: string, value: number) {
    setRatings((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  }

  const rated = Object.keys(ratings).length;
  const avg = rated > 0 ? Object.values(ratings).reduce((a, b) => a + b, 0) / rated : 0;

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

        <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
          {CONFIDENCE_ITEMS.map((item) => {
            const value = ratings[item.key] ?? 0;
            return (
              <section
                key={item.key}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  background: "var(--paper)",
                  padding: "16px 18px"
                }}
              >
                <h2 style={{ fontSize: "1rem", fontWeight: 850, marginBottom: 6 }}>
                  <span aria-hidden>{item.icon}</span> {item.title[lang]}
                </h2>
                <p style={{ lineHeight: 1.55, color: "var(--muted)", margin: "0 0 12px" }}>
                  {item.tip[lang]}
                </p>

                <div className="confidence-scale" aria-label={c.howFeel}>
                  <span className="confidence-scale__end">{c.scale[0]}</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`confidence-dot${value >= n ? " on" : ""}`}
                      aria-pressed={value === n}
                      aria-label={`${n}/5`}
                      onClick={() => rate(item.key, n)}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="confidence-scale__end">{c.scale[1]}</span>
                </div>

                <div style={{ marginTop: 12 }}>
                  <Link
                    href={item.href}
                    className="btn btn-secondary"
                    style={{ fontSize: ".85rem" }}
                  >
                    {c.practise} →
                  </Link>
                </div>
              </section>
            );
          })}
        </div>

        {rated > 0 && (
          <div
            role="status"
            style={{
              marginTop: 18,
              padding: "14px 16px",
              borderRadius: 12,
              background: "var(--green3, rgba(46,125,91,0.08))",
              border: "1px solid var(--green2, rgba(46,125,91,0.3))",
              lineHeight: 1.55
            }}
          >
            {avg < 3.5 ? c.summaryLow : c.summaryOk}
          </div>
        )}
      </div>
    </main>
  );
}
