"use client";

import Link from "next/link";
import { Flame, Target } from "lucide-react";
import { WA_PASS_THRESHOLD, type ReadinessResult } from "@kanga/core";
import { useLang } from "@/contexts/LangContext";
import { categoryLucideIcon } from "@/lib/categoryLucideIcon";
import { pct } from "@/lib/percent";
import { ReadinessCard } from "@/components/ReadinessCard";
import { MockSessionHistory, type DashboardMockSession } from "./MockSessionHistory";
import { StateProgressSelector } from "./StateProgressSelector";
import type { AuStateCode } from "./state-options";

type CategoryStat = [string, { total: number; correct: number }];
type WeekBucket = { label: string; total: number; correct: number };

export type DashboardClientProps = {
  readiness: ReadinessResult;
  weakestCategory: string | null;
  displayName: string;
  userEmail: string | undefined;
  totalAnswered: number;
  totalCorrect: number;
  overallPct: number;
  scoreColor: string;
  mockSessionCount: number;
  bestSession: DashboardMockSession | null;
  streakDays: number;
  answeredToday: number;
  dailyGoal: number;
  dailyGoalPct: number;
  selectedState: AuStateCode;
  selectedStateName: string;
  stateTotalAnswered: number;
  stateTotalCorrect: number;
  stateAccuracy: number;
  stateCategoryStats: CategoryStat[];
  weekBuckets: WeekBucket[];
  maxWeekTotal: number;
  hasAttempts: boolean;
  catStats: CategoryStat[];
  weakTopics: CategoryStat[];
  sessions: DashboardMockSession[];
};

export function DashboardClient({
  readiness,
  weakestCategory,
  displayName,
  userEmail,
  totalAnswered,
  totalCorrect,
  overallPct,
  scoreColor,
  mockSessionCount,
  bestSession,
  streakDays,
  answeredToday,
  dailyGoal,
  dailyGoalPct,
  selectedState,
  selectedStateName,
  stateTotalAnswered,
  stateTotalCorrect,
  stateAccuracy,
  stateCategoryStats,
  weekBuckets,
  maxWeekTotal,
  hasAttempts,
  catStats,
  weakTopics,
  sessions
}: DashboardClientProps) {
  const { s } = useLang();

  return (
    <div className="app-page">
      <div className="app-container app-section">
        <div
          className="page-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12
          }}
        >
          <div>
            <h1 className="page-title">
              {s.dashHello}, {displayName}
            </h1>
            <p className="page-sub">{s.dashSub}</p>
          </div>
          <Link
            href="/account"
            className="btn-outline"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
              flexShrink: 0
            }}
          >
            ⚙ {s.settings}
          </Link>
        </div>

        <ReadinessCard readiness={readiness} weakestCategory={weakestCategory} />

        <div className="stat-grid" style={{ marginTop: 22 }}>
          <div className="stat-card">
            <div className="stat-card-label">{s.dashQuestionsAnswered}</div>
            <div className="stat-card-value">{totalAnswered}</div>
            <div className="stat-card-sub">
              {totalAnswered === 0
                ? s.dashStartPractisingStats
                : `${totalCorrect} ${s.dashCorrect}`}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-label">{s.dashOverallAccuracy}</div>
            <div className="stat-card-value" style={{ color: scoreColor }}>
              {totalAnswered === 0 ? "—" : `${overallPct}%`}
            </div>
            <div className="stat-card-sub">
              {totalAnswered === 0
                ? s.dashNoAttemptsYet
                : overallPct >= WA_PASS_THRESHOLD * 100
                  ? s.dashAbovePassThreshold
                  : s.dashTarget80}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-label">{s.dashMockTestsTaken}</div>
            <div className="stat-card-value">{mockSessionCount}</div>
            <div className="stat-card-sub">
              {bestSession ? `${s.dashBest}: ${bestSession.percent}%` : s.dashNoMockTestsYet}
            </div>
          </div>
        </div>

        <div className="stat-grid" style={{ marginTop: 22 }}>
          <div className="stat-card">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                aria-hidden
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  background: "rgba(244, 169, 0, .14)",
                  color: "var(--orange)"
                }}
              >
                <Flame size={21} />
              </span>
              <div>
                <div className="stat-card-label">{s.dashStreak}</div>
                <div className="stat-card-value">{streakDays}</div>
              </div>
            </div>
            <div className="stat-card-sub">
              {streakDays === 1 ? s.dashStreakOneDay : `${streakDays} ${s.dashStreakDays}`}
            </div>
          </div>

          <div className="stat-card" style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                aria-hidden
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  background: "rgba(82, 183, 136, .14)",
                  color: "var(--green)"
                }}
              >
                <Target size={21} />
              </span>
              <div style={{ flex: 1 }}>
                <div className="stat-card-label">{s.dashDailyGoal}</div>
                <div className="stat-card-sub">
                  {answeredToday} {s.dashOf} {dailyGoal} {s.dashQuestionsAnsweredToday}
                </div>
              </div>
              <div className="stat-card-value" style={{ fontSize: "1.7rem" }}>
                {dailyGoalPct}%
              </div>
            </div>
            <div className="pbar-track" style={{ marginTop: 14 }}>
              <div className="pbar-fill" style={{ width: `${dailyGoalPct}%` }} />
            </div>
          </div>
        </div>

        <div className="dash-section" style={{ marginTop: 22 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "flex-start",
              flexWrap: "wrap"
            }}
          >
            <div>
              <p className="dash-section-title">{s.dashProgressByState}</p>
              <div
                className="dash-empty"
                style={{ padding: 0, background: "transparent", border: 0 }}
              >
                {s.dashFilteredFor} {selectedState} · {selectedStateName}
              </div>
            </div>
            <StateProgressSelector selectedState={selectedState} />
          </div>

          <div className="stat-grid" style={{ marginTop: 18 }}>
            <div className="stat-card">
              <div className="stat-card-label">{s.dashQuestionsAnswered}</div>
              <div className="stat-card-value">{stateTotalAnswered}</div>
              <div className="stat-card-sub">{selectedState}</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-label">{s.dashStateAccuracy}</div>
              <div
                className="stat-card-value"
                style={{
                  color:
                    stateTotalAnswered === 0
                      ? "var(--ink)"
                      : stateAccuracy >= WA_PASS_THRESHOLD * 100
                        ? "var(--green)"
                        : stateAccuracy >= 60
                          ? "var(--orange)"
                          : "var(--red)"
                }}
              >
                {stateTotalAnswered === 0 ? "—" : `${stateAccuracy}%`}
              </div>
              <div className="stat-card-sub">
                {stateTotalAnswered === 0
                  ? s.dashNoAttemptsInState
                  : `${stateTotalCorrect} ${s.dashCorrect}`}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-label">{s.dashCategoriesPractised}</div>
              <div className="stat-card-value">{stateCategoryStats.length}</div>
              <div className="stat-card-sub">{s.dashCategoryBreakdownBelow}</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <p className="dash-section-title" style={{ fontSize: ".88rem" }}>
              {s.dashCategoryBreakdown}
            </p>
            {stateCategoryStats.length === 0 ? (
              <div className="dash-empty">
                {s.dashNoAttemptsForStatePrefix} {selectedState}. {s.dashNoAttemptsForStateSuffix}
              </div>
            ) : (
              <div className="cat-list">
                {stateCategoryStats.map(([cat, stat]) => {
                  const CatIco = categoryLucideIcon(cat);
                  const cp = pct(stat.correct, stat.total);
                  return (
                    <div className="cat-row" key={`${selectedState}-${cat}`}>
                      <span className="cat-row-icon" aria-hidden>
                        <CatIco />
                      </span>
                      <span className="cat-row-name">{cat}</span>
                      <span className="cat-row-frac">
                        {stat.correct}/{stat.total}
                      </span>
                      <div className="cat-row-track">
                        <div
                          className="cat-row-fill"
                          style={{
                            width: `${cp}%`,
                            background:
                              cp >= WA_PASS_THRESHOLD * 100
                                ? "var(--green)"
                                : cp >= 60
                                  ? "var(--orange)"
                                  : "var(--red)"
                          }}
                        />
                      </div>
                      <span style={{ marginLeft: "auto", fontSize: ".78rem", fontWeight: 800 }}>
                        {cp}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="dash-section" style={{ marginTop: 22 }}>
          <p className="dash-section-title">{s.dashWeeklyActivity}</p>
          {!hasAttempts ? (
            <div className="dash-empty">{s.dashNoWeeklyActivity}</div>
          ) : (
            <div className="weekly-chart">
              {weekBuckets.map((b, i) => {
                const heightPct =
                  b.total === 0 ? 0 : Math.max(8, Math.round((b.total / maxWeekTotal) * 100));
                const accuracy = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
                const barColor =
                  b.total === 0
                    ? "var(--border)"
                    : accuracy >= WA_PASS_THRESHOLD * 100
                      ? "var(--green)"
                      : accuracy >= 60
                        ? "var(--orange)"
                        : "var(--red)";
                return (
                  <div key={i} className="weekly-col">
                    <div className="weekly-bar-wrap">
                      <div
                        className="weekly-bar"
                        style={{ height: `${heightPct}%`, background: barColor }}
                        title={
                          b.total === 0
                            ? s.dashChartNoActivity
                            : `${accuracy}% (${b.correct}/${b.total})`
                        }
                      />
                    </div>
                    <div className="weekly-label">{b.label}</div>
                    {b.total > 0 && <div className="weekly-count">{accuracy}%</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          <Link href="/practice" className="dash-cta">
            {s.dashContinuePractice}
          </Link>
          <Link
            href="/practice?mode=sim"
            className="btn-outline"
            style={{ textDecoration: "none" }}
          >
            {s.dashTakeMockTest}
          </Link>
        </div>

        <div className="dash-section">
          <p className="dash-section-title">{s.dashWhatToPractiseNext}</p>
          {weakTopics.length === 0 ? (
            <div className="dash-empty">{s.dashMoreQuestionsRecommendations}</div>
          ) : (
            <div className="cat-list">
              {weakTopics.map(([cat, stat]) => {
                const CatIco = categoryLucideIcon(cat);
                const cp = pct(stat.correct, stat.total);
                return (
                  <div className="cat-row" key={cat}>
                    <span className="cat-row-icon" aria-hidden>
                      <CatIco />
                    </span>
                    <span className="cat-row-name">{cat}</span>
                    <span className="cat-row-frac">
                      {stat.correct}/{stat.total}
                    </span>
                    <div className="cat-row-track">
                      <div
                        className="cat-row-fill"
                        style={{
                          width: `${cp}%`,
                          background:
                            cp >= WA_PASS_THRESHOLD * 100
                              ? "var(--green)"
                              : cp >= 60
                                ? "var(--orange)"
                                : "var(--red)"
                        }}
                      />
                    </div>
                    <Link
                      href={`/practice?cat=${encodeURIComponent(cat)}`}
                      className="btn-outline"
                      style={{ marginLeft: "auto", textDecoration: "none" }}
                    >
                      {s.dashPractiseArrow}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="dash-section">
          <p className="dash-section-title">{s.dashProgressByTopic}</p>
          {catStats.length === 0 ? (
            <div className="dash-empty">{s.dashNoTopicData}</div>
          ) : (
            <div className="cat-list">
              {catStats.map(([cat, stat]) => {
                const CatIco = categoryLucideIcon(cat);
                const cp = pct(stat.correct, stat.total);
                return (
                  <div className="cat-row" key={cat}>
                    <span className="cat-row-icon" aria-hidden>
                      <CatIco />
                    </span>
                    <span className="cat-row-name">{cat}</span>
                    <span className="cat-row-frac">
                      {stat.correct}/{stat.total}
                    </span>
                    <div className="cat-row-track">
                      <div
                        className="cat-row-fill"
                        style={{
                          width: `${cp}%`,
                          background:
                            cp >= WA_PASS_THRESHOLD * 100
                              ? "var(--green)"
                              : cp >= 60
                                ? "var(--orange)"
                                : "var(--red)"
                        }}
                      />
                    </div>
                    <Link
                      href={`/practice?cat=${encodeURIComponent(cat)}`}
                      className="btn-outline"
                      style={{ marginLeft: "auto", textDecoration: "none" }}
                    >
                      {s.dashPractise}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="dash-section">
          <p className="dash-section-title">{s.dashMockTestHistory}</p>
          {sessions.length === 0 ? (
            <div className="dash-empty">
              {s.dashNoMockTestsTryPrefix}{" "}
              <Link href="/practice" style={{ color: "var(--green)", fontWeight: 800 }}>
                {s.dashMockTestMode}
              </Link>
              .
            </div>
          ) : (
            <MockSessionHistory sessions={sessions} />
          )}
        </div>

        <p style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: 32 }}>
          {s.dashSignedInAs} {userEmail} ·{" "}
          <Link href="/account" style={{ color: "var(--muted)", textDecoration: "underline" }}>
            {s.settings}
          </Link>
        </p>
      </div>
    </div>
  );
}
