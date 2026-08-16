"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLang } from "@/contexts/LangContext";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import {
  findCountry,
  OVERSEAS_GENERAL,
  OVERSEAS_OFFICIAL_LINKS,
  type RecognitionStatus
} from "@/lib/overseasLicence";
import type { UiLang } from "@/lib/i18n";

const LAST_VERIFIED = "2026-06-01";

const STATUS_LABEL: Record<RecognitionStatus, Record<UiLang, string>> = {
  recognised: {
    en: "Likely recognised",
    pt: "Provavelmente reconhecido",
    es: "Probablemente reconocido"
  },
  "not-recognised": { en: "Not recognised", pt: "Não reconhecido", es: "No reconocido" },
  check: {
    en: "Check the official list",
    pt: "Confira a lista oficial",
    es: "Consulta la lista oficial"
  }
};

const COPY: Record<
  UiLang,
  {
    back: string;
    whatYouDo: string;
    theoryYes: string;
    theoryNo: string;
    practise: string;
    official: string;
  }
> = {
  en: {
    back: "← All countries",
    whatYouDo: "What you'll likely need in WA",
    theoryYes:
      "You'll most likely need to pass the WA theory test (Computerised Theory Test) and a practical driving assessment. KangaLearner gets you ready for the theory. Free, in your language.",
    theoryNo:
      "As an experienced driver you may be able to transfer without sitting the theory or practical test. Confirm on the official recognised-countries list before you book.",
    practise: "Practise the WA theory test",
    official: "Official recognised countries"
  },
  pt: {
    back: "← Todos os países",
    whatYouDo: "O que você provavelmente vai precisar em WA",
    theoryYes:
      "Você provavelmente vai precisar passar na prova teórica de WA (Computerised Theory Test) e na avaliação prática. O KangaLearner te prepara para a teórica. Grátis e na sua língua.",
    theoryNo:
      "Como motorista experiente, você pode conseguir transferir sem fazer a prova teórica ou prática. Confirme na lista oficial de países reconhecidos antes de agendar.",
    practise: "Praticar a prova teórica de WA",
    official: "Lista oficial de países reconhecidos"
  },
  es: {
    back: "← Todos los países",
    whatYouDo: "Lo que probablemente necesitarás en WA",
    theoryYes:
      "Lo más probable es que debas aprobar el examen teórico de WA (Computerised Theory Test) y la evaluación práctica. KangaLearner te prepara para el teórico. Gratis y en tu idioma.",
    theoryNo:
      "Como conductor con experiencia, podrías transferir sin presentar el examen teórico ni práctico. Confírmalo en la lista oficial de países reconocidos antes de reservar.",
    practise: "Practicar el examen teórico de WA",
    official: "Lista oficial de países reconocidos"
  }
};

export default function OverseasCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = use(params);
  const data = findCountry(country);
  const { uiLang: lang } = useLang();

  if (!data) notFound();

  const c = COPY[lang];
  const g = OVERSEAS_GENERAL[lang];
  const statusTone =
    data.status === "recognised" ? "green" : data.status === "not-recognised" ? "red" : "amber";

  return (
    <main className="app-page">
      <div className="container section-pad" style={{ maxWidth: 720 }}>
        <Link href="/overseas-licence" className="btn btn-secondary" style={{ marginBottom: 18 }}>
          {c.back}
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: "2rem" }} aria-hidden>
            {data.flag}
          </span>
          <h1 className="page-title" style={{ margin: 0 }}>
            {data.name[lang]} → WA
          </h1>
        </div>

        <span
          style={{
            display: "inline-block",
            padding: "3px 12px",
            borderRadius: 99,
            fontSize: ".74rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 16,
            color:
              statusTone === "green"
                ? "var(--green)"
                : statusTone === "red"
                  ? "var(--red, #c0392b)"
                  : "#b8860b",
            background:
              statusTone === "green"
                ? "var(--green3, rgba(46,125,91,0.1))"
                : statusTone === "red"
                  ? "rgba(192,57,43,0.1)"
                  : "rgba(245,166,0,0.12)"
          }}
        >
          {STATUS_LABEL[data.status][lang]}
        </span>

        <p style={{ lineHeight: 1.6, marginBottom: 22 }}>{data.summary[lang]}</p>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 850, marginBottom: 10 }}>{c.whatYouDo}</h2>
          <p style={{ lineHeight: 1.6 }}>{data.theoryTestLikely ? c.theoryYes : c.theoryNo}</p>
        </section>

        <section style={{ marginBottom: 8 }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 850, marginBottom: 10 }}>
            {g.convertTitle}
          </h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {g.convert.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </section>

        <div style={{ margin: "16px 0 20px" }}>
          <VerifiedBadge
            lang={lang}
            lastVerified={LAST_VERIFIED}
            sourceUrl={OVERSEAS_OFFICIAL_LINKS.transfer}
            reportContext={`overseas-${data.code}`}
          />
        </div>

        <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.5 }}>{g.verifyNote}</p>

        <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/practice" className="btn btn-primary">
            {c.practise}
          </Link>
          <a
            href={OVERSEAS_OFFICIAL_LINKS.recognised}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            {c.official} ↗
          </a>
        </div>
      </div>
    </main>
  );
}
