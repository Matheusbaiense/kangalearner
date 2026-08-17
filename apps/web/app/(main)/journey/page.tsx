"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useStateCopy } from "@/lib/stateCopy";
import { getStateResources } from "@/lib/stateResources";
import { getStateGls, GLS_VERIFIED_AT, type StateGls } from "@/lib/stateJourney";
import type { StateResources } from "@/lib/stateResources";
import type { UiLang } from "@/lib/i18n";

type Localized = Record<UiLang, string>;

interface Phase {
  badge: Localized;
  title: Localized;
  summary: Localized;
  points: Localized[];
}

const STEP_WORD: Localized = { en: "Step", pt: "Passo", es: "Paso" };

/**
 * Builds the licence journey for the selected jurisdiction from verified data.
 * Copy uses {tokens} resolved by useStateCopy; numbers are interpolated here.
 */
function buildPhases(gls: StateGls, res: StateResources): Phase[] {
  const phases: Phase[] = [];

  const learnerPoints: Localized[] = [
    {
      en: "Pass the {testName} ({minCorrect}/{questions}). KangaLearner prepares you free, in your language.",
      pt: "Passe no {testName} ({minCorrect}/{questions}). O KangaLearner te prepara grátis, na sua língua.",
      es: "Aprueba el {testName} ({minCorrect}/{questions}). KangaLearner te prepara gratis, en tu idioma."
    },
    {
      en: "Zero BAC, L plates front and back, and a supervising driver at all times.",
      pt: "Zero de álcool (BAC), placas L na frente e atrás, e um supervisor sempre presente.",
      es: "Cero alcohol (BAC), placas L delante y detrás, y un supervisor siempre presente."
    }
  ];

  if (res.hours) {
    const h = res.hours;
    learnerPoints.push({
      en: h.appliesUnder
        ? `Under ${h.appliesUnder}: log at least ${h.total} supervised hours, including ${h.night} at night.`
        : `Log at least ${h.total} supervised hours, including ${h.night} at night — every learner, no age exemption.`,
      pt: h.appliesUnder
        ? `Menos de ${h.appliesUnder} anos: registre ao menos ${h.total} horas supervisionadas, incluindo ${h.night} à noite.`
        : `Registre ao menos ${h.total} horas supervisionadas, incluindo ${h.night} à noite — todo learner, sem isenção por idade.`,
      es: h.appliesUnder
        ? `Menos de ${h.appliesUnder} años: registra al menos ${h.total} horas supervisadas, incluyendo ${h.night} de noche.`
        : `Registra al menos ${h.total} horas supervisadas, incluyendo ${h.night} de noche — todo learner, sin exención por edad.`
    });
  } else {
    learnerPoints.push({
      en: "No minimum logged hours in the NT — but practise as much as you can before the driving test.",
      pt: "Sem mínimo de horas registradas no NT — mas pratique o máximo possível antes da prova prática.",
      es: "Sin mínimo de horas registradas en el NT — pero practica todo lo posible antes del examen práctico."
    });
  }

  if (gls.learner.minTenureMonths > 0) {
    const m = gls.learner.minTenureMonths;
    const base: Localized = {
      en: `Hold your learner licence for at least ${m} months before the ${res.practicalTestName}.`,
      pt: `Mantenha a licença de learner por pelo menos ${m} meses antes do ${res.practicalTestName}.`,
      es: `Mantén la licencia de learner al menos ${m} meses antes del ${res.practicalTestName}.`
    };
    learnerPoints.push(
      gls.learner.tenureNote
        ? {
            en: `${base.en} ${gls.learner.tenureNote.en}`,
            pt: `${base.pt} ${gls.learner.tenureNote.pt}`,
            es: `${base.es} ${gls.learner.tenureNote.es}`
          }
        : base
    );
  }

  phases.push({
    badge: { en: `${STEP_WORD.en} 1`, pt: `${STEP_WORD.pt} 1`, es: `${STEP_WORD.es} 1` },
    title: {
      en: `Learner licence (from ${gls.learner.minAge})`,
      pt: `Licença de learner (a partir de ${gls.learner.minAge} anos)`,
      es: `Permiso de learner (desde los ${gls.learner.minAge} años)`
    },
    summary: {
      en: "Pass the {testName}, then build real driving experience under supervision.",
      pt: "Passe no {testName} e construa experiência real de direção sob supervisão.",
      es: "Aprueba el {testName} y gana experiencia real de conducción bajo supervisión."
    },
    points: learnerPoints
  });

  const p1Points: Localized[] = [
    res.hazardTestName
      ? {
          en: `Pass the ${res.hazardTestName} and the ${res.practicalTestName} to get your Ps.`,
          pt: `Passe no ${res.hazardTestName} e no ${res.practicalTestName} para pegar os Ps.`,
          es: `Aprueba el ${res.hazardTestName} y el ${res.practicalTestName} para obtener tus Ps.`
        }
      : {
          en: `Pass the ${res.practicalTestName} to get your Ps.`,
          pt: `Passe no ${res.practicalTestName} para pegar os Ps.`,
          es: `Aprueba el ${res.practicalTestName} para obtener tus Ps.`
        }
  ];
  if (gls.p1.note) p1Points.push(gls.p1.note);

  const p1Months = gls.p1.months;
  phases.push({
    badge: { en: `${STEP_WORD.en} 2`, pt: `${STEP_WORD.pt} 2`, es: `${STEP_WORD.es} 2` },
    title: {
      en: `${gls.p1.label} (from ${gls.p1.minAge})`,
      pt: `${gls.p1.label} (a partir de ${gls.p1.minAge} anos)`,
      es: `${gls.p1.label} (desde los ${gls.p1.minAge} años)`
    },
    summary: {
      en: `Zero BAC and P plates, held for at least ${p1Months} months.`,
      pt: `Zero BAC e placas P, por pelo menos ${p1Months} meses.`,
      es: `Cero BAC y placas P, durante al menos ${p1Months} meses.`
    },
    points: p1Points
  });

  if (gls.p2) {
    phases.push({
      badge: { en: `${STEP_WORD.en} 3`, pt: `${STEP_WORD.pt} 3`, es: `${STEP_WORD.es} 3` },
      title: { en: gls.p2.label, pt: gls.p2.label, es: gls.p2.label },
      summary: {
        en: `Held for at least ${gls.p2.months} months before your full licence.`,
        pt: `Por pelo menos ${gls.p2.months} meses antes da licença completa.`,
        es: `Durante al menos ${gls.p2.months} meses antes de la licencia completa.`
      },
      points: [
        {
          en: "Keep a clean record — offences can extend your provisional period.",
          pt: "Mantenha a ficha limpa — infrações podem estender o período provisório.",
          es: "Mantén un historial limpio — las infracciones pueden extender el período provisional."
        }
      ]
    });
  }

  const lastStep = gls.p2 ? 4 : 3;
  phases.push({
    badge: {
      en: `${STEP_WORD.en} ${lastStep}`,
      pt: `${STEP_WORD.pt} ${lastStep}`,
      es: `${STEP_WORD.es} ${lastStep}`
    },
    title: { en: "Full licence", pt: "Licença completa", es: "Licencia completa" },
    summary: {
      en: "Restrictions lifted. The general BAC limit (0.05) applies.",
      pt: "Restrições removidas. Vale o limite geral de BAC (0,05).",
      es: "Restricciones levantadas. Aplica el límite general de BAC (0,05)."
    },
    points: [
      {
        en: "Keep driving safely. Most crashes happen in the first years of solo driving.",
        pt: "Continue dirigindo com segurança. A maioria dos acidentes é nos primeiros anos sozinho.",
        es: "Sigue conduciendo con seguridad. La mayoría de accidentes son en los primeros años solo."
      }
    ]
  });

  return phases;
}

const COPY = {
  kicker: {
    en: "Your {stateCode} licence journey",
    pt: "Sua jornada de habilitação em {stateCode}",
    es: "Tu recorrido de licencia en {stateCode}"
  },
  title: {
    en: "From learner to full licence. The whole path",
    pt: "De learner à licença completa. O caminho inteiro",
    es: "De learner a licencia completa. Todo el camino"
  },
  sub: {
    en: "{state}'s licence is a sequence of steps. Here's the whole journey, and where KangaLearner helps at each stage.",
    pt: "A habilitação de {state} é uma sequência de passos. Aqui está a jornada completa e onde o KangaLearner ajuda em cada etapa.",
    es: "La licencia de {state} es una secuencia de pasos. Aquí está todo el recorrido y dónde KangaLearner ayuda en cada etapa."
  },
  hptCard: { en: "HPT prep", pt: "Preparação HPT", es: "Preparación HPT" },
  hptDesc: {
    en: "Spot hazards on video clips. Required before your Ps.",
    pt: "Identifique perigos em video clips. Exigido antes dos Ps.",
    es: "Detecta peligros en video clips. Requerido antes de tus Ps."
  },
  hazardCardOfficial: {
    en: "About the hazard test",
    pt: "Sobre o hazard test",
    es: "Sobre el hazard test"
  },
  practicalCard: {
    en: "The practical test",
    pt: "A prova prática",
    es: "El examen práctico"
  },
  practicalDesc: {
    en: "Your on-road driving test. The last step before your Ps.",
    pt: "Sua prova de direção na via. O último passo antes dos Ps.",
    es: "Tu examen de conducción en vía. El último paso antes de tus Ps."
  },
  verify: {
    en: "A plain-English guide, not legal advice. Hours, ages and rules depend on your situation. Confirm with {authority}.",
    pt: "Guia em linguagem simples, não aconselhamento jurídico. Horas, idades e regras dependem do seu caso. Confirme com o {authority}.",
    es: "Guía en lenguaje claro, no asesoría legal. Horas, edades y reglas dependen de tu caso. Confirma con {authority}."
  },
  practise: {
    en: "Start practising the theory test",
    pt: "Começar a praticar a prova teórica",
    es: "Empezar a practicar el examen teórico"
  }
};

export default function JourneyPage() {
  const { uiLang: lang } = useLang();
  const { profile, t } = useStateCopy();
  const gls = getStateGls(profile.code);
  const res = getStateResources(profile.code);
  const phases = buildPhases(gls, res);
  const isWa = profile.code === "WA";

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
            {t(COPY.kicker)}
          </p>
          <h1 className="page-title">{t(COPY.title)}</h1>
          <p className="page-sub">{t(COPY.sub)}</p>
        </div>

        {/* Phase timeline */}
        <ol className="journey-timeline">
          {phases.map((p, i) => (
            <li key={i} className="journey-step">
              <span className="journey-step__badge">{p.badge[lang]}</span>
              <div className="journey-step__body">
                <h2 className="journey-step__title">{t(p.title)}</h2>
                <p className="journey-step__summary">{t(p.summary)}</p>
                <ul className="journey-step__points">
                  {p.points.map((pt, j) => (
                    <li key={j}>{t(pt)}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* Hazard / practical prep cards. WA links the in-app prep hubs; other
            states link their authority's official pages. */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
            marginTop: 8,
            marginBottom: 24
          }}
        >
          {isWa ? (
            <Link
              href="/hpt"
              className="overseas-country-card"
              style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}
            >
              <strong>{t(COPY.hptCard)}</strong>
              <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>{t(COPY.hptDesc)}</span>
            </Link>
          ) : (
            res.hazardTestName &&
            res.links.hazard && (
              <a
                href={res.links.hazard}
                target="_blank"
                rel="noopener noreferrer"
                className="overseas-country-card"
                style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}
              >
                <strong>{res.hazardTestName}</strong>
                <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>
                  {t(COPY.hazardCardOfficial)} ↗
                </span>
              </a>
            )
          )}
          {isWa ? (
            <Link
              href="/pda"
              className="overseas-country-card"
              style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}
            >
              <strong>{t(COPY.practicalCard)}</strong>
              <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>
                {t(COPY.practicalDesc)}
              </span>
            </Link>
          ) : (
            <a
              href={res.links.steps}
              target="_blank"
              rel="noopener noreferrer"
              className="overseas-country-card"
              style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}
            >
              <strong>{res.practicalTestName}</strong>
              <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>
                {t(COPY.practicalDesc)} ↗
              </span>
            </a>
          )}
        </div>

        <div style={{ marginBottom: 18 }}>
          <VerifiedBadge
            lang={lang}
            lastVerified={GLS_VERIFIED_AT}
            sourceUrl={gls.glsUrl}
            reportContext="licence-journey"
          />
        </div>

        <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.5 }}>
          {t(COPY.verify)}
        </p>

        <div style={{ marginTop: 24 }}>
          <Link href="/practice" className="btn btn-primary">
            {t(COPY.practise)}
          </Link>
        </div>
      </div>
    </main>
  );
}
