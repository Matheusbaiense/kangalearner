"use client";

import Link from "next/link";
import type { ReadinessLevel, ReadinessReason, ReadinessResult } from "@kanga/core";
import { useLang } from "@/contexts/LangContext";
import type { UIStrings } from "@/lib/i18n";

const LEVEL_COLOR: Record<ReadinessLevel, string> = {
  not_ready: "var(--red)",
  getting_there: "var(--orange)",
  almost: "var(--orange)",
  ready: "var(--green)"
};

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function reasonHref(reason: ReadinessReason, weakestCategory: string | null): string {
  if (reason === "readiness.weakCategories") {
    return weakestCategory ? `/practice?cat=${encodeURIComponent(weakestCategory)}` : "/practice";
  }
  if (reason === "readiness.lowCoverage") return "/practice";
  return "/mock-test";
}

export function ReadinessCard({
  readiness,
  weakestCategory = null,
  compact = false
}: {
  readiness: ReadinessResult;
  weakestCategory?: string | null;
  compact?: boolean;
}) {
  const { s } = useLang();
  const levelLabel = s[`readiness.level.${readiness.level}` as keyof UIStrings];
  const color = LEVEL_COLOR[readiness.level];

  if (compact) {
    return (
      <div className="readiness-inline">
        <span className="readiness-inline-score" style={{ color }}>
          {readiness.score}%
        </span>
        <div>
          <p className="readiness-inline-level">
            {s["readiness.title"]} <strong style={{ color }}>{levelLabel}</strong>
          </p>
          <Link href="/dashboard" className="readiness-inline-link">
            {s["readiness.viewDashboard"]} →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-section readiness-card">
      <div className="readiness-head">
        <div className="readiness-ring">
          <svg
            viewBox="0 0 84 84"
            width={84}
            height={84}
            role="img"
            aria-label={`${readiness.score}/100`}
          >
            <circle
              cx={42}
              cy={42}
              r={RING_RADIUS}
              fill="none"
              stroke="var(--border)"
              strokeWidth={8}
            />
            <circle
              cx={42}
              cy={42}
              r={RING_RADIUS}
              fill="none"
              stroke={color}
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={`${(readiness.score / 100) * RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`}
              transform="rotate(-90 42 42)"
            />
          </svg>
          <span className="readiness-ring-score">{readiness.score}</span>
        </div>
        <div>
          <p className="dash-section-title" style={{ marginBottom: 2 }}>
            {s["readiness.title"]}
          </p>
          <p className="readiness-level" style={{ color }}>
            {levelLabel}
          </p>
          <p className="readiness-hint">{s["readiness.hint"]}</p>
        </div>
      </div>

      {readiness.reasons.length > 0 && (
        <ul className="readiness-reasons">
          {readiness.reasons.map((reason) => (
            <li key={reason}>
              <Link href={reasonHref(reason, weakestCategory)} className="readiness-reason">
                {s[reason]} →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
