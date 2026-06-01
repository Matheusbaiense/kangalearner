"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { JOURNEY_LINKS } from "@/lib/licenceJourney";
import type { UiLang } from "@/lib/i18n";

/**
 * Supervisor Companion (v1) — for parents/partners/friends supervising a learner.
 * Almost no competitor serves this persona. v1 is content + a client-side practice
 * checklist (localStorage) so it works guest-first; a future `supervisor_logs` table
 * (migration 026) can persist real sessions. It does NOT replace the official Learn&Log.
 */

const STORAGE_KEY = "kl-supervisor-checklist-v1";

const COPY: Record<
  UiLang,
  {
    kicker: string;
    title: string;
    sub: string;
    checklistTitle: string;
    items: string[];
    tipsTitle: string;
    tips: string[];
    disclaimer: string;
    practise: string;
    progress: (done: number, total: number) => string;
  }
> = {
  en: {
    kicker: "Supervisor Companion",
    title: "Helping a learner driver? Here's how to coach without the stress",
    sub: "WA learners under 25 need at least 50 supervised hours, including 5 at night. Use this companion to make each drive count — it's a coach, not the official Learn&Log.",
    checklistTitle: "Skills to practise together",
    items: [
      "Quiet streets: starting, stopping smoothly, steering control",
      "Mirror and head checks before every move",
      "Give way: intersections, T-junctions, roundabouts",
      "Lane changes and merging with traffic",
      "Roundabouts — choosing lanes and signalling",
      "Parking: reverse, parallel, and angle parking",
      "Night driving (5 hours required under 25)",
      "Rain and low-visibility driving",
      "Multi-lane roads and higher speeds",
      "A mock 'test route' type drive before the PDA"
    ],
    tipsTitle: "Coaching tips",
    tips: [
      "Stay calm — your tone sets theirs. Anxiety is the #1 thing that holds learners back.",
      "Give one instruction at a time, early enough to act on.",
      "Praise what went well before correcting what didn't.",
      "End each drive on a confident note, on an easy stretch."
    ],
    disclaimer:
      "This is a coaching aid, not the official record. Log your real hours in the WA Department of Transport Learn&Log app.",
    practise: "Send them to practise the theory",
    progress: (done, total) => `${done} of ${total} skills practised`
  },
  pt: {
    kicker: "Companheiro do Supervisor",
    title: "Supervisionando um learner? Veja como ensinar sem estresse",
    sub: "Learners de WA com menos de 25 precisam de ao menos 50 horas supervisionadas, incluindo 5 à noite. Use este companheiro para aproveitar cada volta — é um coach, não o Learn&Log oficial.",
    checklistTitle: "Habilidades para praticar juntos",
    items: [
      "Ruas tranquilas: arrancar, parar suave, controle da direção",
      "Espelhos e ponto cego antes de cada manobra",
      "Dar preferência: cruzamentos, entroncamentos, rotatórias",
      "Mudança de faixa e entrada no tráfego",
      "Rotatórias — escolher faixas e sinalizar",
      "Estacionar: baliza, paralelo e em ângulo",
      "Direção noturna (5 horas exigidas para menores de 25)",
      "Direção na chuva e baixa visibilidade",
      "Vias de várias faixas e velocidades maiores",
      "Uma volta tipo 'rota de prova' antes do PDA"
    ],
    tipsTitle: "Dicas de ensino",
    tips: [
      "Mantenha a calma — seu tom define o dele. Ansiedade é o nº1 que trava o aprendiz.",
      "Dê uma instrução por vez, com antecedência para agir.",
      "Elogie o que foi bem antes de corrigir o que não foi.",
      "Termine cada volta com confiança, num trecho fácil."
    ],
    disclaimer:
      "Isto é um apoio de ensino, não o registro oficial. Registre suas horas reais no app Learn&Log do Departamento de Transportes de WA.",
    practise: "Mande ele praticar a teórica",
    progress: (done, total) => `${done} de ${total} habilidades praticadas`
  },
  es: {
    kicker: "Compañero del Supervisor",
    title: "¿Supervisas a un learner? Así puedes enseñar sin estrés",
    sub: "Los learners de WA menores de 25 necesitan al menos 50 horas supervisadas, incluidas 5 de noche. Usa este compañero para aprovechar cada vuelta — es un coach, no el Learn&Log oficial.",
    checklistTitle: "Habilidades para practicar juntos",
    items: [
      "Calles tranquilas: arrancar, frenar suave, control del volante",
      "Espejos y punto ciego antes de cada maniobra",
      "Ceder el paso: intersecciones, cruces en T, rotondas",
      "Cambio de carril e incorporación al tráfico",
      "Rotondas — elegir carriles y señalizar",
      "Estacionar: en reversa, paralelo y en ángulo",
      "Conducción nocturna (5 horas requeridas para menores de 25)",
      "Conducción con lluvia y poca visibilidad",
      "Vías de varios carriles y mayores velocidades",
      "Una vuelta tipo 'ruta de examen' antes del PDA"
    ],
    tipsTitle: "Consejos de enseñanza",
    tips: [
      "Mantén la calma — tu tono marca el suyo. La ansiedad es lo que más frena al aprendiz.",
      "Da una instrucción a la vez, con tiempo para reaccionar.",
      "Elogia lo que salió bien antes de corregir lo que no.",
      "Termina cada vuelta con confianza, en un tramo fácil."
    ],
    disclaimer:
      "Esto es una ayuda de enseñanza, no el registro oficial. Registra tus horas reales en la app Learn&Log del Departamento de Transporte de WA.",
    practise: "Mándalo a practicar el teórico",
    progress: (done, total) => `${done} de ${total} habilidades practicadas`
  }
};

export default function SupervisorPage() {
  const { uiLang: lang } = useLang();
  const c = COPY[lang];
  const [checked, setChecked] = useState<boolean[]>(() => c.items.map(() => false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length === c.items.length) setChecked(saved);
      }
    } catch {
      /* noop */
    }
    // length is stable across languages (same item count)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {c.kicker}
          </p>
          <h1 className="page-title">{c.title}</h1>
          <p className="page-sub">{c.sub}</p>
        </div>

        <section style={{ marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 10
            }}
          >
            <h2 style={{ fontSize: "1.05rem", fontWeight: 850, margin: 0 }}>{c.checklistTitle}</h2>
            <span style={{ fontSize: ".8rem", color: "var(--muted)", fontWeight: 700 }}>
              {c.progress(done, c.items.length)}
            </span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
            {c.items.map((item, i) => (
              <li key={i}>
                <label className="supervisor-check">
                  <input type="checkbox" checked={checked[i] ?? false} onChange={() => toggle(i)} />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 850, marginBottom: 10 }}>{c.tipsTitle}</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {c.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>

        <div style={{ margin: "20px 0" }}>
          <VerifiedBadge
            lang={lang}
            lastVerified="2026-06-01"
            sourceUrl={JOURNEY_LINKS.logHours}
            reportContext="supervisor-companion"
          />
        </div>

        <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.5 }}>{c.disclaimer}</p>

        <div style={{ marginTop: 24 }}>
          <Link href="/practice" className="btn btn-primary">
            {c.practise}
          </Link>
        </div>
      </div>
    </main>
  );
}
