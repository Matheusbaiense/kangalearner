"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useStateCopy } from "@/lib/stateCopy";
import { getStateGls, GLS_VERIFIED_AT } from "@/lib/stateJourney";
import { buildOverseasGeneral, getOverseasLinks, OVERSEAS_COUNTRIES } from "@/lib/overseasLicence";

export default function OverseasLicenceHub() {
  const { uiLang: lang } = useLang();
  const { profile, ts } = useStateCopy();
  const gls = getStateGls(profile.code);
  const links = getOverseasLinks(profile.code);
  const g = buildOverseasGeneral(gls)[lang];

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
            {ts(g.kicker)}
          </p>
          <h1 className="page-title">{ts(g.title)}</h1>
          <p className="page-sub">{ts(g.intro)}</p>
        </div>

        <Section title={ts(g.visitingTitle)} items={g.visiting.map(ts)} />
        <Section title={ts(g.convertTitle)} items={g.convert.map(ts)} />

        <div style={{ display: "grid", gap: 14, marginTop: 8, marginBottom: 24 }}>
          <Callout title={ts(g.recognisedTitle)} body={ts(g.recognised)} tone="green" />
          <Callout title={ts(g.notRecognisedTitle)} body={ts(g.notRecognised)} tone="amber" />
        </div>

        {/* Country picker */}
        <h2 style={{ fontSize: "1.05rem", fontWeight: 850, marginBottom: 12 }}>
          {ts(g.chooseCountry)}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12,
            marginBottom: 28
          }}
        >
          {OVERSEAS_COUNTRIES.map((c) => (
            <Link
              key={c.code}
              href={`/overseas-licence/${c.code}`}
              className="overseas-country-card"
            >
              <span style={{ fontSize: "1.6rem" }} aria-hidden>
                {c.flag}
              </span>
              <strong>{c.name[lang]}</strong>
              <span className="overseas-country-arrow" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <VerifiedBadge
            lang={lang}
            lastVerified={GLS_VERIFIED_AT}
            sourceUrl={links.transfer}
            reportContext="overseas-licence-hub"
          />
        </div>

        <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.5 }}>
          {ts(g.verifyNote)}
        </p>

        <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/practice" className="btn btn-primary">
            {lang === "pt"
              ? "Praticar a prova teórica"
              : lang === "es"
                ? "Practicar el examen teórico"
                : "Practise the theory test"}
          </Link>
          <a
            href={links.recognised}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            {lang === "pt"
              ? "Lista oficial de países"
              : lang === "es"
                ? "Lista oficial de países"
                : "Official recognised countries"}{" "}
            ↗
          </a>
        </div>
      </div>
    </main>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section style={{ marginBottom: 22 }}>
      <h2 style={{ fontSize: "1.05rem", fontWeight: 850, marginBottom: 10 }}>{title}</h2>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </section>
  );
}

function Callout({ title, body, tone }: { title: string; body: string; tone: "green" | "amber" }) {
  const isGreen = tone === "green";
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 12,
        lineHeight: 1.55,
        background: isGreen ? "var(--green3, rgba(46,125,91,0.08))" : "rgba(245,166,0,0.10)",
        border: `1px solid ${isGreen ? "var(--green2, rgba(46,125,91,0.3))" : "rgba(245,166,0,0.4)"}`
      }}
    >
      <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>
      <span style={{ color: "var(--muted)" }}>{body}</span>
    </div>
  );
}
