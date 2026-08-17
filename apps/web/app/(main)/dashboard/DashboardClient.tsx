"use client";

import Link from "next/link";
import { Flame, Target } from "lucide-react";
import { WA_PASS_THRESHOLD, type ReadinessResult } from "@kanga/core";
import { useLang } from "@/contexts/LangContext";
import { Kanga } from "@/components/brand/Kanga";
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
  loadError?: boolean;
};

export function DashboardClient({
  readiness,
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
  sessions,
  loadError = false
}: DashboardClientProps) {
  const { s } = useLang();

  return (
    <div className="app-page">
      <div className="app-container app-section">
        <div className="page-header dash-row-spread">
          <div>
            <h1 className="page-title">
              {s.dashHello}, {displayName}
            </h1>
            <p className="page-sub">{s.dashSub}</p>
          </div>
          <Link href="/account" className="btn-outline dash-settings-btn">
            ⚙ {s.settings}
          </Link>
        </div>

        {loadError ? (
          <div className="stat-card" role="alert">
            <div className="stat-card-label">{s.dashLoadFailed}</div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              {s.retry}
            </button>
          </div>
        ) : null}

        {!loadError && totalAnswered === 0 && (
          <div className="stat-card dash-welcome">
            <div className="dash-welcome-copy">
              <div className="stat-card-label">{s.dashWelcomeTitle}</div>
              <div className="stat-card-sub">{s.dashWelcomeSub}</div>
            </div>
            <Link href="/practice" className="btn btn-primary">
              {s.dashWelcomeCta} →
            </Link>
          </div>
        )}

        {!loadError && totalAnswered > 0 && <ReadinessCard readiness={readiness} />}

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-card-label">{s.dashQuestionsAnswered}</div>
            <div className="stat-card-value">{loadError ? "—" : totalAnswered}</div>
            <div className="stat-card-sub">
              {loadError
                ? s.dashLoadFailed
                : totalAnswered === 0
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

        <div className="stat-grid mt-22">
          <div className="stat-card">
            <div className="dash-stat-row">
              <span aria-hidden className="dash-stat-ico dash-stat-ico--orange">
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

          <div className="stat-card dash-span-2">
            <div className="dash-stat-row">
              <span aria-hidden className="dash-stat-ico dash-stat-ico--green">
                <Target size={21} />
              </span>
              <div className="flex-1">
                <div className="stat-card-label">{s.dashDailyGoal}</div>
                <div className="stat-card-sub">
                  {answeredToday} {s.dashOf} {dailyGoal} {s.dashQuestionsAnsweredToday}
                </div>
              </div>
              <div className="stat-card-value stat-card-value--sm">{dailyGoalPct}%</div>
            </div>
            <div className="pbar-track">
              <div className="pbar-fill" style={{ width: `${dailyGoalPct}%` }} />
            </div>
          </div>
        </div>

        <div className="dash-section mt-22">
          <div className="dash-row-spread">
            <div>
              <p className="dash-section-title">{s.dashProgressByState}</p>
              <div className="dash-empty dash-empty--plain">
                {s.dashFilteredFor} {selectedState} · {selectedStateName}
              </div>
            </div>
            <StateProgressSelector selectedState={selectedState} />
          </div>

          <div className="stat-grid mt-18">
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

          <div className="mt-18">
            <p className="dash-section-title dash-section-title--sm">{s.dashCategoryBreakdown}</p>
            {stateCategoryStats.length === 0 ? (
              <div className="dash-empty dash-empty--row">
                <Kanga pose="search" size={72} style={{ flexShrink: 0 }} />
                <span>
                  {s.dashNoAttemptsForStatePrefix} {selectedState}. {s.dashNoAttemptsForStateSuffix}
                </span>
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
                      <span className="cat-row-pct">{cp}%</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="dash-section mt-22">
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

        <div className="dash-actions">
          <Link href="/practice" className="dash-cta">
            {s.dashContinuePractice}
          </Link>
          <Link href="/mock-test" className="btn-outline">
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
                    <Link href={`/practice?cat=${encodeURIComponent(cat)}`} className="btn-outline">
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
                    <Link href={`/practice?cat=${encodeURIComponent(cat)}`} className="btn-outline">
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
              <Link href="/practice" className="dash-link-strong">
                {s.dashMockTestMode}
              </Link>
              .
            </div>
          ) : (
            <MockSessionHistory sessions={sessions} />
          )}
        </div>

        <p className="dash-footnote">
          {s.dashSignedInAs} {userEmail} ·{" "}
          <Link href="/account" className="dash-footnote-link">
            {s.settings}
          </Link>
        </p>
      </div>
    </div>
  );
}
