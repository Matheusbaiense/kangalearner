"use client";

import { useRouter } from "next/navigation";
import { AU_MAP_STATES, AU_MAP_VIEWBOX } from "@/lib/auMapPaths";

/* VIC e TAS sao estreitos: rotulo numa linha so, fora do caminho das divisas */
const COMPACT_LABELS: Record<string, { x: number; y: number }> = {
  VIC: { x: 768, y: 710 },
  TAS: { x: 798, y: 945 }
};

interface AustraliaMapProps {
  /** Contagem real de perguntas por codigo de estado. */
  counts: Record<string, number>;
  /** Slug da pagina /learner-test por codigo (estados sem pagina ficam sem link). */
  slugs: Record<string, string | null>;
  questionsWord: string;
  hovered?: string | null;
  onHover?: (code: string | null) => void;
}

export function AustraliaMap({
  counts,
  slugs,
  questionsWord,
  hovered,
  onHover
}: AustraliaMapProps) {
  const router = useRouter();
  const max = Math.max(1, ...Object.values(counts));

  return (
    <svg
      className="au-map"
      viewBox={AU_MAP_VIEWBOX}
      role="group"
      aria-label="Australia map, questions per state"
    >
      {AU_MAP_STATES.map((st) => {
        const slug = slugs[st.code] ?? null;
        const count = counts[st.code] ?? 0;
        const clickable = slug !== null;
        const compact = COMPACT_LABELS[st.code];
        const isHot = hovered === st.code;
        return (
          <g key={st.code}>
            <path
              className={`au-map-state${clickable ? " au-map-state--link" : ""}${isHot ? " au-map-state--hot" : ""}`}
              d={st.d}
              /* intensidade proporcional ao tamanho do banco do estado */
              style={{ fillOpacity: 0.08 + 0.3 * (count / max) }}
              role={clickable ? "link" : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-label={`${st.name}: ${count} ${questionsWord}`}
              onClick={clickable ? () => router.push(`/learner-test/${slug}`) : undefined}
              onMouseEnter={onHover ? () => onHover(st.code) : undefined}
              onMouseLeave={onHover ? () => onHover(null) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push(`/learner-test/${slug}`);
                      }
                    }
                  : undefined
              }
            >
              <title>{`${st.name}: ${count} ${questionsWord}`}</title>
            </path>
            {/* ACT e pequeno demais para rotulo interno; o tooltip/lista cobre */}
            {st.code !== "ACT" &&
              (compact ? (
                <text
                  className="au-map-label au-map-label--compact"
                  x={compact.x}
                  y={compact.y}
                  aria-hidden="true"
                >
                  <tspan className="au-map-label-code">{st.code} </tspan>
                  <tspan className="au-map-label-count">{count}</tspan>
                </text>
              ) : (
                <text className="au-map-label" x={st.cx} y={st.cy} aria-hidden="true">
                  <tspan className="au-map-label-code" x={st.cx} dy="-2">
                    {st.code}
                  </tspan>
                  <tspan className="au-map-label-count" x={st.cx} dy="30">
                    {count}
                  </tspan>
                </text>
              ))}
          </g>
        );
      })}
    </svg>
  );
}
