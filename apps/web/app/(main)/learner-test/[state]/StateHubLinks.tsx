"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";
import { fill } from "@/lib/i18n";
import { getStateResources } from "@/lib/stateResources";
import { SK } from "@/lib/storageKeys";

type Localized = Record<UiLang, string>;

/**
 * "Everything for {state}" grid: every state-aware surface in the app, with the
 * state pre-selected before navigating (same mechanism as StateCtaButtons, so
 * the destination page renders this state's content, not the stored one).
 */
const LINKS: {
  href: string;
  icon: string;
  needsHazard?: boolean;
  label: Localized;
  desc: Localized;
}[] = [
  {
    href: "/learn",
    icon: "📚",
    label: { en: "Learn the road rules", pt: "Aprenda as regras", es: "Aprende las reglas" },
    desc: {
      en: "20 topics with your state's numbers",
      pt: "20 tópicos com os números do seu estado",
      es: "20 temas con los números de tu estado"
    }
  },
  {
    href: "/practice",
    icon: "✏️",
    label: { en: "Practice questions", pt: "Praticar questões", es: "Practicar preguntas" },
    desc: {
      en: "The real question bank, by topic",
      pt: "O banco real de questões, por tópico",
      es: "El banco real de preguntas, por tema"
    }
  },
  {
    href: "/mock-test",
    icon: "⏱️",
    label: { en: "Mock test", pt: "Simulado", es: "Simulacro" },
    desc: {
      en: "30 random questions, exam mode",
      pt: "30 questões aleatórias, modo prova",
      es: "30 preguntas aleatorias, modo examen"
    }
  },
  {
    href: "/journey",
    icon: "🗺️",
    label: { en: "Licence journey", pt: "Jornada da licença", es: "Recorrido de licencia" },
    desc: {
      en: "Learner to full licence, step by step",
      pt: "De learner à licença completa, passo a passo",
      es: "De learner a licencia completa, paso a paso"
    }
  },
  {
    href: "/resources",
    icon: "🔗",
    label: { en: "Official resources", pt: "Recursos oficiais", es: "Recursos oficiales" },
    desc: {
      en: "Handbook, logbook, bookings and links",
      pt: "Manual, logbook, agendamentos e links",
      es: "Manual, logbook, reservas y enlaces"
    }
  },
  {
    href: "/hpt",
    icon: "👁️",
    needsHazard: true,
    label: { en: "Hazard test prep", pt: "Preparação hazard test", es: "Preparación hazard test" },
    desc: {
      en: "Format, cost and when you sit it",
      pt: "Formato, custo e quando fazer",
      es: "Formato, costo y cuándo rendirlo"
    }
  },
  {
    href: "/pda",
    icon: "🚗",
    label: {
      en: "Practical test prep",
      pt: "Preparação prova prática",
      es: "Preparación examen práctico"
    },
    desc: {
      en: "What the on-road test looks like",
      pt: "Como é a prova na via",
      es: "Cómo es el examen en vía"
    }
  },
  {
    href: "/supervisor",
    icon: "🧑‍🏫",
    label: {
      en: "Supervisor companion",
      pt: "Companheiro do supervisor",
      es: "Compañero del supervisor"
    },
    desc: {
      en: "Who can supervise and how to coach",
      pt: "Quem pode supervisionar e como ensinar",
      es: "Quién puede supervisar y cómo enseñar"
    }
  },
  {
    href: "/overseas-licence",
    icon: "🌏",
    label: { en: "Overseas licence", pt: "Licença estrangeira", es: "Licencia extranjera" },
    desc: {
      en: "Visiting, converting and deadlines",
      pt: "Visita, conversão e prazos",
      es: "Visita, conversión y plazos"
    }
  }
];

const TITLE: Localized = {
  en: "Everything for {state}",
  pt: "Tudo para {state}",
  es: "Todo para {state}"
};

const SUB: Localized = {
  en: "Every guide below opens with {state} already selected.",
  pt: "Cada guia abaixo abre com {state} já selecionado.",
  es: "Cada guía de abajo se abre con {state} ya seleccionado."
};

export function StateHubLinks({ stateCode, stateName }: { stateCode: string; stateName: string }) {
  const router = useRouter();
  const { uiLang: lang } = useLang();
  const hasHazard = getStateResources(stateCode).hazardTestName !== null;
  const links = LINKS.filter((l) => !l.needsHazard || hasHazard);

  function go(path: string) {
    try {
      localStorage.setItem(SK.stateV2, stateCode);
      localStorage.setItem(SK.stateLegacy, stateCode);
    } catch {
      /* noop */
    }
    window.dispatchEvent(new CustomEvent("kanga:state-changed", { detail: stateCode }));
    router.push(path);
  }

  return (
    <section style={{ marginTop: "2.5rem" }}>
      <h2 className="section-title">{fill(TITLE[lang], { state: stateName })}</h2>
      <p style={{ marginBottom: "1rem" }}>{fill(SUB[lang], { state: stateName })}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: 12
        }}
      >
        {links.map((l) => (
          <button
            key={l.href}
            type="button"
            className="overseas-country-card"
            style={{ cursor: "pointer", textAlign: "left", font: "inherit" }}
            onClick={() => go(l.href)}
          >
            <span style={{ fontSize: "var(--text-xl)" }} aria-hidden>
              {l.icon}
            </span>
            <span style={{ display: "flex", flexDirection: "column" }}>
              <strong>{l.label[lang]}</strong>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--muted)" }}>
                {l.desc[lang]}
              </span>
            </span>
            <span className="overseas-country-arrow" aria-hidden>
              →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
