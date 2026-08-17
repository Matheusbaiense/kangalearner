"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useStateCopy } from "@/lib/stateCopy";
import { getStateResources, type StateResources } from "@/lib/stateResources";
import { getStateGls, GLS_VERIFIED_AT } from "@/lib/stateJourney";
import type { UiLang } from "@/lib/i18n";

/**
 * Supervisor Companion. For parents/partners/friends supervising a learner.
 * Content + a client-side practice checklist (localStorage) so it works
 * guest-first. Hours, supervisor rules and test names follow the selected state.
 */

const STORAGE_KEY = "kl-supervisor-checklist-v1";

type Localized = Record<UiLang, string>;

function hoursIntro(res: StateResources): Localized {
  if (!res.hours) {
    return {
      en: "The NT sets no minimum supervised hours, but every properly supervised drive builds the experience the driving test checks. Use this companion to make each drive count. It's a coach, not an official record.",
      pt: "O NT não define mínimo de horas supervisionadas, mas cada volta bem supervisionada constrói a experiência que a prova prática avalia. Use este companheiro para aproveitar cada volta. É um coach, não um registro oficial.",
      es: "El NT no fija un mínimo de horas supervisadas, pero cada vuelta bien supervisada construye la experiencia que evalúa el examen práctico. Usa este compañero para aprovechar cada vuelta. Es un coach, no un registro oficial."
    };
  }
  const h = res.hours;
  const who = {
    en: h.appliesUnder ? `{stateCode} learners under ${h.appliesUnder}` : "{stateCode} learners",
    pt: h.appliesUnder
      ? `Learners de {stateCode} com menos de ${h.appliesUnder}`
      : "Learners de {stateCode}",
    es: h.appliesUnder
      ? `Los learners de {stateCode} menores de ${h.appliesUnder}`
      : "Los learners de {stateCode}"
  };
  return {
    en: `${who.en} need at least ${h.total} supervised hours, including ${h.night} at night. Use this companion to make each drive count. It's a coach, not the official log book.`,
    pt: `${who.pt} precisam de ao menos ${h.total} horas supervisionadas, incluindo ${h.night} à noite. Use este companheiro para aproveitar cada volta. É um coach, não o logbook oficial.`,
    es: `${who.es} necesitan al menos ${h.total} horas supervisadas, incluidas ${h.night} de noche. Usa este compañero para aprovechar cada vuelta. Es un coach, no el registro oficial.`
  };
}

function checklistItems(res: StateResources): Localized[] {
  const items: Localized[] = [
    {
      en: "Quiet streets: starting, stopping smoothly, steering control",
      pt: "Ruas tranquilas: arrancar, parar suave, controle da direção",
      es: "Calles tranquilas: arrancar, frenar suave, control del volante"
    },
    {
      en: "Mirror and head checks before every move",
      pt: "Espelhos e ponto cego antes de cada manobra",
      es: "Espejos y punto ciego antes de cada maniobra"
    },
    {
      en: "Give way: intersections, T-junctions, roundabouts",
      pt: "Dar preferência: cruzamentos, entroncamentos, rotatórias",
      es: "Ceder el paso: intersecciones, cruces en T, rotondas"
    },
    {
      en: "Lane changes and merging with traffic",
      pt: "Mudança de faixa e entrada no tráfego",
      es: "Cambio de carril e incorporación al tráfico"
    },
    {
      en: "Roundabouts. Choosing lanes and signalling",
      pt: "Rotatórias. Escolher faixas e sinalizar",
      es: "Rotondas. Elegir carriles y señalizar"
    },
    {
      en: "Parking: reverse, parallel, and angle parking",
      pt: "Estacionar: baliza, paralelo e em ângulo",
      es: "Estacionar: en reversa, paralelo y en ángulo"
    },
    res.hours
      ? {
          en: `Night driving (${res.hours.night} hours required${res.hours.appliesUnder ? ` under ${res.hours.appliesUnder}` : ""})`,
          pt: `Direção noturna (${res.hours.night} horas exigidas${res.hours.appliesUnder ? ` para menores de ${res.hours.appliesUnder}` : ""})`,
          es: `Conducción nocturna (${res.hours.night} horas requeridas${res.hours.appliesUnder ? ` para menores de ${res.hours.appliesUnder}` : ""})`
        }
      : {
          en: "Night driving (no minimum in the NT, but practise it)",
          pt: "Direção noturna (sem mínimo no NT, mas pratique)",
          es: "Conducción nocturna (sin mínimo en el NT, pero practícala)"
        },
    {
      en: "Rain and low-visibility driving",
      pt: "Direção na chuva e baixa visibilidade",
      es: "Conducción con lluvia y poca visibilidad"
    },
    {
      en: "Multi-lane roads and higher speeds",
      pt: "Vias de várias faixas e velocidades maiores",
      es: "Vías de varios carriles y mayores velocidades"
    },
    {
      en: `A mock 'test route' type drive before the ${res.practicalTestName}`,
      pt: `Uma volta tipo 'rota de prova' antes do ${res.practicalTestName}`,
      es: `Una vuelta tipo 'ruta de examen' antes del ${res.practicalTestName}`
    }
  ];
  return items;
}

const COPY = {
  kicker: {
    en: "Supervisor Companion",
    pt: "Companheiro do Supervisor",
    es: "Compañero del Supervisor"
  },
  title: {
    en: "Helping a learner driver? Here's how to coach without the stress",
    pt: "Supervisionando um learner? Veja como ensinar sem estresse",
    es: "¿Supervisas a un learner? Así puedes enseñar sin estrés"
  },
  supervisorRuleTitle: {
    en: "Who can supervise in {stateCode}",
    pt: "Quem pode supervisionar em {stateCode}",
    es: "Quién puede supervisar en {stateCode}"
  },
  checklistTitle: {
    en: "Skills to practise together",
    pt: "Habilidades para praticar juntos",
    es: "Habilidades para practicar juntos"
  },
  tipsTitle: { en: "Coaching tips", pt: "Dicas de ensino", es: "Consejos de enseñanza" },
  tips: [
    {
      en: "Stay calm. Your tone sets theirs. Anxiety is the #1 thing that holds learners back.",
      pt: "Mantenha a calma. Seu tom define o dele. Ansiedade é o nº1 que trava o aprendiz.",
      es: "Mantén la calma. Tu tono marca el suyo. La ansiedad es lo que más frena al aprendiz."
    },
    {
      en: "Give one instruction at a time, early enough to act on.",
      pt: "Dê uma instrução por vez, com antecedência para agir.",
      es: "Da una instrucción a la vez, con tiempo para reaccionar."
    },
    {
      en: "Praise what went well before correcting what didn't.",
      pt: "Elogie o que foi bem antes de corrigir o que não foi.",
      es: "Elogia lo que salió bien antes de corregir lo que no."
    },
    {
      en: "End each drive on a confident note, on an easy stretch.",
      pt: "Termine cada volta com confiança, num trecho fácil.",
      es: "Termina cada vuelta con confianza, en un tramo fácil."
    }
  ] as Localized[],
  disclaimer: {
    en: "This is a coaching aid, not the official record. Log real hours the way {authority} requires.",
    pt: "Isto é um apoio de ensino, não o registro oficial. Registre as horas reais como o {authority} exige.",
    es: "Esto es una ayuda de enseñanza, no el registro oficial. Registra las horas reales como exige {authority}."
  },
  practise: {
    en: "Send them to practise the theory",
    pt: "Mande ele praticar a teórica",
    es: "Mándalo a practicar el teórico"
  },
  progress: {
    en: (done: number, total: number) => `${done} of ${total} skills practised`,
    pt: (done: number, total: number) => `${done} de ${total} habilidades praticadas`,
    es: (done: number, total: number) => `${done} de ${total} habilidades practicadas`
  } as Record<UiLang, (done: number, total: number) => string>
};

const CHECKLIST_LENGTH = 10;

export default function SupervisorPage() {
  const { uiLang: lang } = useLang();
  const { profile, t } = useStateCopy();
  const res = getStateResources(profile.code);
  const gls = getStateGls(profile.code);

  const items = checklistItems(res);
  const [checked, setChecked] = useState<boolean[]>(() =>
    Array.from({ length: CHECKLIST_LENGTH }, () => false)
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length === CHECKLIST_LENGTH) setChecked(saved);
      }
    } catch {
      /* noop */
    }
  }, []);

  function toggle(i: number) {
    setChecked((prev) => {
      const next = prev.map((v, idx) => (idx === i ? !v : v));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  }

  const done = checked.filter(Boolean).length;

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
            {t(COPY.kicker)}
          </p>
          <h1 className="page-title">{t(COPY.title)}</h1>
          <p className="page-sub">{t(hoursIntro(res))}</p>
        </div>

        <section
          style={{
            marginTop: 16,
            padding: "12px 16px",
            borderRadius: 12,
            background: "var(--green3, rgba(46,125,91,0.08))",
            border: "1px solid var(--green2, rgba(46,125,91,0.3))"
          }}
        >
          <strong style={{ display: "block", marginBottom: 4 }}>
            {t(COPY.supervisorRuleTitle)}
          </strong>
          <span style={{ color: "var(--muted)", lineHeight: 1.55 }}>{t(gls.supervisor)}</span>
        </section>

        <section style={{ marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 10
            }}
          >
            <h2 style={{ fontSize: "1.05rem", fontWeight: 850, margin: 0 }}>
              {t(COPY.checklistTitle)}
            </h2>
            <span style={{ fontSize: ".8rem", color: "var(--muted)", fontWeight: 700 }}>
              {COPY.progress[lang](done, items.length)}
            </span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
            {items.map((item, i) => (
              <li key={i}>
                <label className="supervisor-check">
                  <input type="checkbox" checked={checked[i] ?? false} onChange={() => toggle(i)} />
                  <span>{t(item)}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 850, marginBottom: 10 }}>
            {t(COPY.tipsTitle)}
          </h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {COPY.tips.map((tip, i) => (
              <li key={i}>{t(tip)}</li>
            ))}
          </ul>
        </section>

        <div style={{ margin: "20px 0" }}>
          <VerifiedBadge
            lang={lang}
            lastVerified={GLS_VERIFIED_AT}
            sourceUrl={res.links.logbook ?? gls.glsUrl}
            reportContext="supervisor-companion"
          />
        </div>

        <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.5 }}>
          {t(COPY.disclaimer)}
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
