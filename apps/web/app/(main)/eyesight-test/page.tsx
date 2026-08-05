"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";

/**
 * Eyesight self-check — stolen from EzLicence's embedded Snellen widget.
 * A rough, at-home indication only. It is NOT the official DoT eyesight test;
 * the real test is taken at a DVS centre. Self-contained, no account, no API.
 */

const COPY: Record<
  UiLang,
  {
    kicker: string;
    title: string;
    sub: string;
    instructions: string;
    distance: string;
    smallest: string;
    cantRead: string;
    canRead: string;
    resultGood: string;
    resultCheck: string;
    disclaimer: string;
    official: string;
    restart: string;
    backChecklist: string;
  }
> = {
  en: {
    kicker: "Quick self-check",
    title: "Eyesight self-check",
    sub: "A rough at-home check before your official WA eyesight test.",
    instructions:
      "Sit about 3 metres (10 feet) from your screen. Cover one eye, read down the chart, then swap eyes. Tap the smallest line you can read clearly.",
    distance: "Stand ~3 m back · good lighting · glasses on if you wear them",
    smallest: "Smallest line I can read clearly:",
    cantRead: "I can't read this one",
    canRead: "I selected line",
    resultGood:
      "Good sign — you read the smaller lines clearly. You still need to pass the official DoT eyesight test at a DVS centre.",
    resultCheck:
      "You found the small lines hard. Consider an eye test before booking — and always do the official DoT eyesight test at a DVS centre.",
    disclaimer:
      "This is a rough self-check only, not a medical or official test. The legal eyesight test for your WA licence is done at a Driver and Vehicle Services (DVS) centre.",
    official: "Official WA eyesight standards",
    restart: "Start over",
    backChecklist: "Back to test-day checklist"
  },
  pt: {
    kicker: "Autoteste rápido",
    title: "Autoteste de visão",
    sub: "Uma checagem caseira aproximada antes do teste de visão oficial de WA.",
    instructions:
      "Sente-se a cerca de 3 metros da tela. Cubra um olho, leia de cima para baixo e depois troque o olho. Toque na menor linha que você consegue ler com clareza.",
    distance: "Fique a ~3 m · boa iluminação · use os óculos se precisar",
    smallest: "Menor linha que consigo ler com clareza:",
    cantRead: "Não consigo ler esta",
    canRead: "Selecionei a linha",
    resultGood:
      "Bom sinal — você leu as linhas menores com clareza. Ainda assim, é preciso passar no teste de visão oficial do DoT num centro DVS.",
    resultCheck:
      "Você teve dificuldade com as linhas pequenas. Considere um exame de vista antes de agendar — e faça sempre o teste de visão oficial do DoT num centro DVS.",
    disclaimer:
      "Isto é apenas um autoteste aproximado, não um teste médico ou oficial. O teste de visão legal para sua licença de WA é feito num centro Driver and Vehicle Services (DVS).",
    official: "Padrões oficiais de visão de WA",
    restart: "Recomeçar",
    backChecklist: "Voltar ao checklist do dia da prova"
  },
  es: {
    kicker: "Autotest rápido",
    title: "Autotest de visión",
    sub: "Una comprobación casera aproximada antes del test de visión oficial de WA.",
    instructions:
      "Siéntate a unos 3 metros de la pantalla. Tápate un ojo, lee de arriba abajo y luego cambia de ojo. Toca la línea más pequeña que puedas leer con claridad.",
    distance: "Ponte a ~3 m · buena iluminación · usa las gafas si las necesitas",
    smallest: "Línea más pequeña que puedo leer con claridad:",
    cantRead: "No puedo leer esta",
    canRead: "Seleccioné la línea",
    resultGood:
      "Buena señal — leíste las líneas más pequeñas con claridad. Aún debes aprobar el test de visión oficial del DoT en un centro DVS.",
    resultCheck:
      "Te costaron las líneas pequeñas. Considera un examen de la vista antes de reservar — y haz siempre el test de visión oficial del DoT en un centro DVS.",
    disclaimer:
      "Esto es solo un autotest aproximado, no un test médico ni oficial. El test de visión legal para tu licencia de WA se hace en un centro Driver and Vehicle Services (DVS).",
    official: "Estándares oficiales de visión de WA",
    restart: "Reiniciar",
    backChecklist: "Volver al checklist del día del examen"
  }
};

const OFFICIAL_URL = "https://www.transport.wa.gov.au/licensing/eyesight-standards.asp";

// Snellen-style chart: decreasing font size per line. Last (smallest) line is the target.
const CHART: { letters: string; size: number }[] = [
  { letters: "E", size: 64 },
  { letters: "F P", size: 48 },
  { letters: "T O Z", size: 36 },
  { letters: "L P E D", size: 27 },
  { letters: "P E C F D", size: 20 },
  { letters: "E D F C Z P", size: 15 }
];

const PASS_LINE_INDEX = 3; // reading line 4+ (index 3) clearly is the "good" threshold

export default function EyesightTestPage() {
  const { uiLang: lang } = useLang();
  const c = COPY[lang];
  const [selected, setSelected] = useState<number | null>(null);

  const passed = selected !== null && selected >= PASS_LINE_INDEX;

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

        <p style={{ lineHeight: 1.6, marginTop: 16 }}>{c.instructions}</p>
        <p style={{ fontSize: ".82rem", color: "var(--muted)", marginBottom: 20 }}>{c.distance}</p>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 14,
            background: "var(--paper)",
            padding: "24px 16px",
            textAlign: "center"
          }}
        >
          <p style={{ fontWeight: 800, fontSize: ".82rem", marginBottom: 16 }}>{c.smallest}</p>
          {CHART.map((line, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={isSelected}
                style={{
                  display: "block",
                  width: "100%",
                  border: isSelected ? "2px solid var(--green)" : "2px solid transparent",
                  background: isSelected ? "var(--green3, rgba(46,125,91,0.08))" : "transparent",
                  borderRadius: 10,
                  padding: "6px 4px",
                  margin: "0 auto 4px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  fontSize: `${line.size}px`,
                  lineHeight: 1.1,
                  color: "var(--ink)"
                }}
              >
                {line.letters}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div
            role="status"
            style={{
              marginTop: 16,
              padding: "14px 16px",
              borderRadius: 12,
              background: passed ? "var(--green3, rgba(46,125,91,0.08))" : "rgba(245,166,0,0.10)",
              border: `1px solid ${passed ? "var(--green2, rgba(46,125,91,0.3))" : "rgba(245,166,0,0.4)"}`,
              lineHeight: 1.55
            }}
          >
            <p style={{ margin: 0 }}>{passed ? c.resultGood : c.resultCheck}</p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="btn btn-secondary"
              style={{ marginTop: 12 }}
            >
              {c.restart}
            </button>
          </div>
        )}

        <p
          style={{
            fontSize: ".78rem",
            color: "var(--muted)",
            lineHeight: 1.5,
            marginTop: 20
          }}
        >
          {c.disclaimer}
        </p>

        <div style={{ marginTop: 12, marginBottom: 24 }}>
          <VerifiedBadge
            lang={lang}
            lastVerified="2026-06-01"
            sourceUrl={OFFICIAL_URL}
            reportContext="eyesight-test"
          />
        </div>

        <Link href="/resources" className="btn btn-secondary">
          {c.backChecklist}
        </Link>
      </div>
    </main>
  );
}
