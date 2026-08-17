"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { JOURNEY_PHASES, JOURNEY_LINKS } from "@/lib/licenceJourney";

const LAST_VERIFIED = "2026-06-01";

const COPY = {
  en: {
    kicker: "Your WA licence journey",
    title: "From learner to full licence. The whole path",
    sub: "Western Australia's licence is a sequence of steps. Here's the whole journey, and where KangaLearner helps at each stage.",
    hptCard: "HPT prep",
    hptDesc: "Spot hazards on video clips. Required before your P1.",
    pdaCard: "PDA prep",
    pdaDesc: "Your on-road driving test. The last step before P1.",
    verify:
      "A plain-English guide, not legal advice. Hours, ages and rules depend on your situation. Confirm with the Department of Transport WA.",
    practise: "Start practising the theory test"
  },
  pt: {
    kicker: "Sua jornada de habilitação em WA",
    title: "De learner à licença completa. O caminho inteiro",
    sub: "A habilitação de Western Australia é uma sequência de passos. Aqui está a jornada completa e onde o KangaLearner ajuda em cada etapa.",
    hptCard: "Preparação HPT",
    hptDesc: "Identifique perigos em video clips. Exigido antes da P1.",
    pdaCard: "Preparação PDA",
    pdaDesc: "Sua prova de direção na via. O último passo antes da P1.",
    verify:
      "Guia em linguagem simples, não aconselhamento jurídico. Horas, idades e regras dependem do seu caso. Confirme com o Departamento de Transportes de WA.",
    practise: "Começar a praticar a prova teórica"
  },
  es: {
    kicker: "Tu recorrido de licencia en WA",
    title: "De learner a licencia completa. Todo el camino",
    sub: "La licencia de Western Australia es una secuencia de pasos. Aquí está todo el recorrido y dónde KangaLearner ayuda en cada etapa.",
    hptCard: "Preparación HPT",
    hptDesc: "Detecta peligros en video clips. Requerido antes de la P1.",
    pdaCard: "Preparación PDA",
    pdaDesc: "Tu examen de conducción en vía. El último paso antes de la P1.",
    verify:
      "Guía en lenguaje claro, no asesoría legal. Horas, edades y reglas dependen de tu caso. Confirma con el Departamento de Transporte de WA.",
    practise: "Empezar a practicar el examen teórico"
  }
} as const;

export default function JourneyPage() {
  const { uiLang: lang } = useLang();
  const c = COPY[lang];

  return (
    <main className="app-page">
      <div className="container section-pad" style={{ maxWidth: 760 }}>
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

        {/* Phase timeline */}
        <ol className="journey-timeline">
          {JOURNEY_PHASES.map((p) => (
            <li key={p.key} className="journey-step">
              <span className="journey-step__badge">{p.badge[lang]}</span>
              <div className="journey-step__body">
                <h2 className="journey-step__title">{p.title[lang]}</h2>
                <p className="journey-step__summary">{p.summary[lang]}</p>
                <ul className="journey-step__points">
                  {p.points.map((pt, i) => (
                    <li key={i}>{pt[lang]}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* HPT / PDA prep cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
            marginTop: 8,
            marginBottom: 24
          }}
        >
          <Link
            href="/hpt"
            className="overseas-country-card"
            style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}
          >
            <strong>{c.hptCard}</strong>
            <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>{c.hptDesc}</span>
          </Link>
          <Link
            href="/pda"
            className="overseas-country-card"
            style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}
          >
            <strong>{c.pdaCard}</strong>
            <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>{c.pdaDesc}</span>
          </Link>
        </div>

        <div style={{ marginBottom: 18 }}>
          <VerifiedBadge
            lang={lang}
            lastVerified={LAST_VERIFIED}
            sourceUrl={JOURNEY_LINKS.learner}
            reportContext="licence-journey"
          />
        </div>

        <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.5 }}>{c.verify}</p>

        <div style={{ marginTop: 24 }}>
          <Link href="/practice" className="btn btn-primary">
            {c.practise}
          </Link>
        </div>
      </div>
    </main>
  );
}
