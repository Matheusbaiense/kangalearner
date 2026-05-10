"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";

type Resource = {
  nameEn: string; namePt: string; nameEs: string;
  descEn: string; descPt: string; descEs: string;
  url: string;
  category: "official" | "booking" | "school";
};

const RESOURCES: Resource[] = [
  {
    nameEn: "WA Learner Driver Guide",
    namePt: "Guia do Motorista Aprendiz de WA",
    nameEs: "Guía del Conductor Novato de WA",
    descEn: "The official Department of Transport handbook covering all road rules for the WA learner test.",
    descPt: "O manual oficial do Departamento de Transportes com todas as regras de trânsito para a prova de learner de WA.",
    descEs: "El manual oficial del Departamento de Transportes con todas las reglas de tránsito para el examen learner de WA.",
    url: "https://www.transport.wa.gov.au/licensing/learner-driver-guide.asp",
    category: "official",
  },
  {
    nameEn: "WA Road Traffic Rules",
    namePt: "Regras de Trânsito de WA",
    nameEs: "Reglas de Tránsito de WA",
    descEn: "The Road Traffic (Administration) Act and Rules — the legal framework behind the test questions.",
    descPt: "A Lei e as Regras de Trânsito de WA — o quadro legal por trás das questões da prova.",
    descEs: "La Ley y Reglamento de Tránsito de WA — el marco legal detrás de las preguntas del examen.",
    url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/law_a146929.html",
    category: "official",
  },
  {
    nameEn: "Book Your Learner Test",
    namePt: "Agendar a Prova de Learner",
    nameEs: "Reservar el Examen Learner",
    descEn: "Ready to sit the real test? Book your appointment online through the DoT portal.",
    descPt: "Pronto para a prova real? Agende seu atendimento online pelo portal do Departamento de Transportes.",
    descEs: "¿Listo para el examen real? Reserva tu cita en línea a través del portal del Departamento de Transportes.",
    url: "https://online.transport.wa.gov.au/dotOnline/",
    category: "booking",
  },
  {
    nameEn: "DoT — Licensing Information",
    namePt: "DoT — Informações sobre Carteira de Motorista",
    nameEs: "DoT — Información sobre Licencia de Conducir",
    descEn: "Full information on licence classes, fees, eligibility and what to bring on test day.",
    descPt: "Informações completas sobre categorias de carteira, taxas, elegibilidade e o que levar no dia.",
    descEs: "Información completa sobre tipos de licencia, tarifas, elegibilidad y qué llevar el día del examen.",
    url: "https://www.transport.wa.gov.au/licensing/get-a-drivers-licence.asp",
    category: "official",
  },
  {
    nameEn: "Hazard Perception Test Info",
    namePt: "Informações sobre o Teste de Percepção de Risco",
    nameEs: "Información sobre la Prueba de Percepción de Peligros",
    descEn: "Learn about the Hazard Perception Test required before getting your provisional licence.",
    descPt: "Saiba sobre o Teste de Percepção de Risco, necessário para obter sua carteira provisória.",
    descEs: "Aprende sobre el Test de Percepción de Peligros requerido antes de obtener tu licencia provisional.",
    url: "https://www.transport.wa.gov.au/licensing/hazard-perception-test.asp",
    category: "official",
  },
  {
    nameEn: "RAC Driving School",
    namePt: "Escola de Condução RAC",
    nameEs: "Autoescuela RAC",
    descEn: "WA's leading driving school for learner lessons and licence preparation.",
    descPt: "A principal escola de condução de WA para aulas de learner e preparação para a carteira.",
    descEs: "La principal autoescuela de WA para lecciones de conductor novato y preparación para la licencia.",
    url: "https://www.rac.com.au/driving/driving-lessons",
    category: "school",
  },
];

const CATEGORY_BADGE: Record<Resource["category"], { label: Record<UiLang, string>; color: string; bg: string }> = {
  official: { label: { en: "Official", pt: "Oficial", es: "Oficial" }, color: "var(--green)", bg: "var(--green3)" },
  booking:  { label: { en: "Booking",  pt: "Agendamento", es: "Reserva" }, color: "#2563eb", bg: "#eff6ff" },
  school:   { label: { en: "Driving School", pt: "Autoescola", es: "Autoescuela" }, color: "#7c3aed", bg: "#f5f3ff" },
};

function getName(r: Resource, lang: UiLang) {
  return lang === "pt" ? r.namePt : lang === "es" ? r.nameEs : r.nameEn;
}
function getDesc(r: Resource, lang: UiLang) {
  return lang === "pt" ? r.descPt : lang === "es" ? r.descEs : r.descEn;
}

export default function ResourcesPage() {
  const { uiLang: lang, s } = useLang();

  return (
    <main className="app-page">
      <div className="container section-pad">

        {/* Header */}
        <div className="page-header">
          <p style={{ fontSize: ".78rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--green)", marginBottom: 8 }}>
            {s.resourcesKicker}
          </p>
          <h1 className="page-title">{s.resourcesTitle}</h1>
          <p className="page-sub">{s.resourcesSub}</p>
        </div>

        {/* Resource cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 32 }}>
          {RESOURCES.map((r) => {
            const badge = CATEGORY_BADGE[r.category];
            return (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: "18px 20px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--paper)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "box-shadow 0.18s, border-color 0.18s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-soft)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--green2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                }}
              >
                <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 99, fontSize: ".7rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: badge.color, background: badge.bg, alignSelf: "flex-start" }}>
                  {badge.label[lang]}
                </span>
                <strong style={{ fontSize: "1rem", fontWeight: 800, color: "var(--ink)", lineHeight: 1.3 }}>
                  {getName(r, lang)}
                </strong>
                <p style={{ fontSize: ".85rem", color: "var(--muted)", lineHeight: 1.5, margin: 0, flex: 1 }}>
                  {getDesc(r, lang)}
                </p>
                <span style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--green)" }}>
                  ↗ {lang === "pt" ? "Abrir" : lang === "es" ? "Abrir" : "Open"}
                </span>
              </a>
            );
          })}
        </div>

        {/* WA notice */}
        <div style={{ marginTop: 24, padding: "12px 16px", borderRadius: "var(--radius-sm)", background: "var(--green3)", border: "1px solid var(--green2)", fontSize: ".85rem", color: "var(--green)" }}>
          {s.resourcesWaOnly}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link href="/practice" className="btn btn-primary">
            {s.resourcesPracticeNow} →
          </Link>
        </div>

      </div>
    </main>
  );
}
