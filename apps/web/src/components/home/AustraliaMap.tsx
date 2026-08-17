"use client";

import { useRouter } from "next/navigation";
import { AU_MAP_STATES, AU_MAP_VIEWBOX } from "@/lib/auMapPaths";

interface AustraliaMapProps {
  /** Contagem real de perguntas por codigo de estado. */
  counts: Record<string, number>;
  /** Slug da pagina /learner-test por codigo (estados sem pagina ficam sem link). */
  slugs: Record<string, string | null>;
  questionsWord: string;
}

export function AustraliaMap({ counts, slugs, questionsWord }: AustraliaMapProps) {
  const router = useRouter();

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
        return (
          <g key={st.code}>
            <path
              className={`au-map-state${clickable ? " au-map-state--link" : ""}`}
              d={st.d}
              role={clickable ? "link" : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-label={`${st.name}: ${count} ${questionsWord}`}
              onClick={clickable ? () => router.push(`/learner-test/${slug}`) : undefined}
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
            {st.code !== "ACT" && (
              <text className="au-map-label" x={st.cx} y={st.cy} aria-hidden="true">
                <tspan className="au-map-label-code" x={st.cx} dy="-2">
                  {st.code}
                </tspan>
                <tspan className="au-map-label-count" x={st.cx} dy="30">
                  {count}
                </tspan>
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
