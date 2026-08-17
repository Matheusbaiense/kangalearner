"use client";

import type { UiLang } from "@/lib/i18n";

/**
 * Trust layer — "last verified with the official source".
 * Steals DrivingTestWA's disclaimer discipline but makes it a positive signal.
 * Presentational only: the "report outdated" action falls back to a mailto so it
 * needs no API/migration yet (a future `content_reports` endpoint can replace it).
 */

const COPY: Record<UiLang, { verified: string; source: string; report: string; subject: string }> =
  {
    en: {
      verified: "Last verified with the official source",
      source: "Official source",
      report: "Report outdated info",
      subject: "Outdated info on KangaLearner"
    },
    pt: {
      verified: "Última verificação com a fonte oficial",
      source: "Fonte oficial",
      report: "Reportar info desatualizada",
      subject: "Informação desatualizada no KangaLearner"
    },
    es: {
      verified: "Última verificación con la fuente oficial",
      source: "Fuente oficial",
      report: "Reportar info desactualizada",
      subject: "Información desactualizada en KangaLearner"
    }
  };

const REPORT_TO = "hello@kangalearner.com.au";

function formatDate(iso: string, lang: UiLang): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-AU";
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

export function VerifiedBadge({
  lang,
  lastVerified,
  sourceUrl,
  reportContext
}: {
  lang: UiLang;
  /** ISO date, e.g. "2026-06-01" */
  lastVerified: string;
  /** Official authority/legislation URL backing this content */
  sourceUrl?: string;
  /** Slug/title used in the report mailto subject */
  reportContext?: string;
}) {
  const c = COPY[lang];
  const subject = encodeURIComponent(reportContext ? `${c.subject} - ${reportContext}` : c.subject);
  const mailto = `mailto:${REPORT_TO}?subject=${subject}`;

  return (
    <div className="verified-badge" role="note">
      <span className="verified-badge__dot" aria-hidden>
        ✓
      </span>
      <span className="verified-badge__text">
        {c.verified}: <strong>{formatDate(lastVerified, lang)}</strong>
      </span>
      {sourceUrl ? (
        <a
          className="verified-badge__link"
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {c.source} ↗
        </a>
      ) : null}
      <a className="verified-badge__report" href={mailto}>
        {c.report}
      </a>
    </div>
  );
}
