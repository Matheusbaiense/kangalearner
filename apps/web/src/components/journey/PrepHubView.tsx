"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import type { PrepHub } from "@/lib/licenceJourney";

const LAST_VERIFIED = "2026-06-01";

/** Shared renderer for the HPT and PDA prep hubs (DrivingTestWA 4-part structure). */
export function PrepHubView({ hub }: { hub: PrepHub }) {
  const { uiLang: lang } = useLang();

  const officialLabel =
    lang === "pt"
      ? "Página oficial do DoT"
      : lang === "es"
        ? "Página oficial del DoT"
        : "Official DoT page";
  const practiceLabel =
    lang === "pt"
      ? "Praticar a teórica"
      : lang === "es"
        ? "Practicar el teórico"
        : "Practise the theory";
  const journeyLabel =
    lang === "pt"
      ? "Ver a jornada completa"
      : lang === "es"
        ? "Ver el recorrido completo"
        : "See the full journey";

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
            {hub.kicker[lang]}
          </p>
          <h1 className="page-title">{hub.title[lang]}</h1>
          <p className="page-sub">{hub.intro[lang]}</p>
        </div>

        <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
          {hub.sections.map((s, i) => (
            <section
              key={i}
              style={{
                padding: "16px 18px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--paper)"
              }}
            >
              <h2 style={{ fontSize: "1rem", fontWeight: 850, marginBottom: 8 }}>
                {s.heading[lang]}
              </h2>
              <p style={{ lineHeight: 1.6, margin: 0, color: "var(--muted)" }}>{s.body[lang]}</p>
            </section>
          ))}
        </div>

        <div style={{ margin: "20px 0" }}>
          <VerifiedBadge
            lang={lang}
            lastVerified={LAST_VERIFIED}
            sourceUrl={hub.officialUrl}
            reportContext={hub.kicker.en}
          />
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/practice" className="btn btn-primary">
            {practiceLabel}
          </Link>
          <Link href="/journey" className="btn btn-secondary">
            {journeyLabel}
          </Link>
          <a
            href={hub.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            {officialLabel} ↗
          </a>
        </div>
      </div>
    </main>
  );
}
