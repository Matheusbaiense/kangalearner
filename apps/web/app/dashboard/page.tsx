import { redirect } from "next/navigation";
import Link from "next/link";
import { Flame, Target } from "lucide-react";
import { createSupabaseServerClient } from "../../src/lib/supabase/server";
import { MigrateLocalProgress } from "../../src/components/MigrateLocalProgress";
import { categoryLucideIcon } from "@/lib/categoryLucideIcon";
import { MockSessionHistory } from "./MockSessionHistory";
import { StateProgressSelector } from "./StateProgressSelector";
import { AU_STATE_OPTIONS, normalizeAuState, type AuStateCode } from "./state-options";

export const metadata = { title: "Dashboard — KangaLearner" };

/* ── Data types ── */
interface AttemptRow {
  category: string | null;
  is_correct: boolean;
  answered_at: string;
}
interface SessionRow {
  id: number | string;
  state: string;
  score: number;
  total: number;
  percent: number;
  completed_at: string;
}
interface UserSettingsRow {
  daily_goal: number;
}
type DashboardSearchParams = {
  state?: string | string[];
};

const UTC_MINUS_8_OFFSET_MS = -8 * 60 * 60 * 1000;

function pct(correct: number, total: number) {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

function dayKeyUtcMinus8(value: string | Date): string | null {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getTime() + UTC_MINUS_8_OFFSET_MS).toISOString().slice(0, 10);
}

function shiftDayKey(dayKey: string, deltaDays: number): string {
  const date = new Date(`${dayKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + deltaDays);
  return date.toISOString().slice(0, 10);
}

function startOfWeekDayKey(dayKey: string): string {
  const date = new Date(`${dayKey}T00:00:00.000Z`);
  const day = date.getUTCDay(); // 0=Sun
  const diff = date.getUTCDate() - day + (day === 0 ? -6 : 1); // Monday
  date.setUTCDate(diff);
  return date.toISOString().slice(0, 10);
}

function weekLabel(dayKey: string): string {
  return new Date(`${dayKey}T00:00:00.000Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    timeZone: "UTC"
  });
}

function streakForAttempts(attempts: Pick<AttemptRow, "answered_at">[]): number {
  const activeDays = new Set(
    attempts
      .map((attempt) => dayKeyUtcMinus8(attempt.answered_at))
      .filter((dayKey): dayKey is string => Boolean(dayKey))
  );

  let day = dayKeyUtcMinus8(new Date());
  let streak = 0;
  while (day && activeDays.has(day)) {
    streak++;
    day = shiftDayKey(day, -1);
  }
  return streak;
}

function firstSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function categoryStatsFor(attempts: Pick<AttemptRow, "category" | "is_correct">[]) {
  const catMap: Record<string, { total: number; correct: number }> = {};
  attempts.forEach((a) => {
    const key = a.category ?? "Other";
    if (!catMap[key]) catMap[key] = { total: 0, correct: 0 };
    catMap[key].total++;
    if (a.is_correct) catMap[key].correct++;
  });
  return Object.entries(catMap);
}

async function loadPreferredState(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string
): Promise<AuStateCode> {
  const { data } = await supabase
    .from("profiles")
    .select("preferred_state")
    .eq("id", userId)
    .maybeSingle();

  return normalizeAuState(data?.preferred_state) ?? "WA";
}

export default async function DashboardPage({
  searchParams
}: {
  searchParams?: Promise<DashboardSearchParams>;
}) {
  const params = searchParams ? await searchParams : {};

  /* ── Auth check ── */
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    redirect("/auth/login?redirect=/dashboard");
  }

  const {
    data: { user }
  } = await supabase!.auth.getUser();
  if (!user) redirect("/auth/login?redirect=/dashboard");

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    "there";

  const preferredState = await loadPreferredState(supabase!, user.id);
  const selectedState: AuStateCode =
    normalizeAuState(firstSearchParam(params.state)) ?? preferredState;
  const selectedStateName =
    AU_STATE_OPTIONS.find((state) => state.code === selectedState)?.name ?? selectedState;

  const { error: settingsUpsertError } = await supabase!
    .from("user_settings")
    .upsert({ user_id: user.id, daily_goal: 10 }, { onConflict: "user_id", ignoreDuplicates: true });

  if (settingsUpsertError) console.error("Dashboard user settings upsert failed", settingsUpsertError);

  const [attemptsResult, stateAttemptsResult, sessionsResult, settingsResult] = await Promise.all([
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id),
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .eq("state", selectedState),
    supabase!
      .from("mock_sessions")
      .select("id, state, score, total, percent, completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false }),
    supabase!
      .from("user_settings")
      .select("daily_goal")
      .eq("user_id", user.id)
      .maybeSingle()
  ]);

  const { data: attempts, error: attemptsError } = attemptsResult as {
    data: AttemptRow[] | null;
    error: unknown;
  };
  const { data: stateAttempts, error: stateAttemptsError } = stateAttemptsResult as {
    data: AttemptRow[] | null;
    error: unknown;
  };
  const { data: sessions, error: sessionsError } = sessionsResult as {
    data: SessionRow[] | null;
    error: unknown;
  };
  const { data: settings, error: settingsError } = settingsResult as {
    data: UserSettingsRow | null;
    error: unknown;
  };

  if (attemptsError) console.error("Dashboard attempts lookup failed", attemptsError);
  if (stateAttemptsError) console.error("Dashboard state attempts lookup failed", stateAttemptsError);
  if (sessionsError) console.error("Dashboard sessions lookup failed", sessionsError);
  if (settingsError) console.error("Dashboard user settings lookup failed", settingsError);

  /* ── Aggregate stats ── */
  const allAttempts = attempts ?? [];
  const totalAnswered = allAttempts.length;
  const totalCorrect = allAttempts.filter((a) => a.is_correct).length;
  const overallPct = pct(totalCorrect, totalAnswered);
  const dailyGoal = Math.max(1, settings?.daily_goal ?? 10);
  const todayKey = dayKeyUtcMinus8(new Date());
  const answeredToday = todayKey
    ? allAttempts.filter((attempt) => dayKeyUtcMinus8(attempt.answered_at) === todayKey).length
    : 0;
  const dailyGoalPct = Math.min(100, pct(answeredToday, dailyGoal));
  const streakDays = streakForAttempts(allAttempts);

  const catStats = categoryStatsFor(allAttempts)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);

  const weakTopics = categoryStatsFor(allAttempts)
    .filter(([_, s]) => s.total >= 3)
    .sort((a, b) => {
      const ap = a[1].total > 0 ? a[1].correct / a[1].total : 0;
      const bp = b[1].total > 0 ? b[1].correct / b[1].total : 0;
      if (ap !== bp) return ap - bp;
      return b[1].total - a[1].total;
    })
    .slice(0, 3);

  const selectedStateAttempts = stateAttempts ?? [];
  const stateTotalAnswered = selectedStateAttempts.length;
  const stateTotalCorrect = selectedStateAttempts.filter((a) => a.is_correct).length;
  const stateAccuracy = pct(stateTotalCorrect, stateTotalAnswered);
  const stateCategoryStats = categoryStatsFor(selectedStateAttempts)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);

  // Weekly bar chart — last 8 weeks
  const WEEKS = 8;
  const weekBuckets: { label: string; total: number; correct: number }[] = [];
  const thisWeekStart = startOfWeekDayKey(todayKey ?? dayKeyUtcMinus8(new Date()) ?? "1970-01-01");

  for (let i = WEEKS - 1; i >= 0; i--) {
    const weekStart = shiftDayKey(thisWeekStart, -i * 7);
    const weekEnd = shiftDayKey(weekStart, 7);
    const label = weekLabel(weekStart);
    const bucket = allAttempts.filter((a) => {
      const dayKey = dayKeyUtcMinus8(a.answered_at);
      return Boolean(dayKey && dayKey >= weekStart && dayKey < weekEnd);
    });
    weekBuckets.push({
      label,
      total: bucket.length,
      correct: bucket.filter((a) => a.is_correct).length
    });
  }

  const maxWeekTotal = Math.max(...weekBuckets.map((b) => b.total), 1);

  const allSessions = sessions ?? [];
  const bestSession =
    allSessions.length > 0
      ? allSessions.reduce((best, s) =>
          s.percent > best.percent ? s : best
        )
      : null;

  /* ── Score colour ── */
  const scoreColor =
    totalAnswered === 0
      ? "var(--ink)"
      : overallPct >= 80
        ? "var(--green)"
        : overallPct >= 60
          ? "var(--orange)"
          : "var(--red)";

  return (
    <>
      <MigrateLocalProgress />
      <div className="app-page">
        <div className="app-container app-section">
          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">Hello, {displayName}</h1>
            <p className="page-sub">Your progress across all practice sessions.</p>
          </div>

          {/* Stat cards */}
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-card-label">Questions answered</div>
              <div className="stat-card-value">{totalAnswered}</div>
              <div className="stat-card-sub">
                {totalAnswered === 0 ? "Start practising to see stats" : `${totalCorrect} correct`}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-label">Overall accuracy</div>
              <div className="stat-card-value" style={{ color: scoreColor }}>
                {totalAnswered === 0 ? "—" : `${overallPct}%`}
              </div>
              <div className="stat-card-sub">
                {totalAnswered === 0
                  ? "No attempts yet"
                  : overallPct >= 80
                    ? "Above pass threshold"
                    : "Target: 80%"}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-label">Mock tests taken</div>
              <div className="stat-card-value">{allSessions.length}</div>
              <div className="stat-card-sub">
                {bestSession
                  ? `Best: ${bestSession.percent}%`
                  : "No mock tests yet"}
              </div>
            </div>
          </div>

          {/* Streak + daily goal */}
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
                  <div className="stat-card-label">Streak</div>
                  <div className="stat-card-value">{streakDays}</div>
                </div>
              </div>
              <div className="stat-card-sub">
                {streakDays === 1 ? "1 consecutive day" : `${streakDays} consecutive days`}
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
                  <div className="stat-card-label">Daily goal</div>
                  <div className="stat-card-sub">
                    {answeredToday} of {dailyGoal} questions answered today
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

          {/* Progress by state */}
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
                <p className="dash-section-title">Progresso por Estado</p>
                <div className="dash-empty" style={{ padding: 0, background: "transparent", border: 0 }}>
                  Dados filtrados para {selectedState} · {selectedStateName}
                </div>
              </div>
              <StateProgressSelector selectedState={selectedState} />
            </div>

            <div className="stat-grid" style={{ marginTop: 18 }}>
              <div className="stat-card">
                <div className="stat-card-label">Perguntas respondidas</div>
                <div className="stat-card-value">{stateTotalAnswered}</div>
                <div className="stat-card-sub">{selectedState}</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-label">% de acerto</div>
                <div
                  className="stat-card-value"
                  style={{
                    color:
                      stateTotalAnswered === 0
                        ? "var(--ink)"
                        : stateAccuracy >= 80
                          ? "var(--green)"
                          : stateAccuracy >= 60
                            ? "var(--orange)"
                            : "var(--red)"
                  }}
                >
                  {stateTotalAnswered === 0 ? "—" : `${stateAccuracy}%`}
                </div>
                <div className="stat-card-sub">
                  {stateTotalAnswered === 0 ? "Sem respostas neste estado" : `${stateTotalCorrect} corretas`}
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-label">Categorias praticadas</div>
                <div className="stat-card-value">{stateCategoryStats.length}</div>
                <div className="stat-card-sub">Breakdown por categoria abaixo</div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <p className="dash-section-title" style={{ fontSize: ".88rem" }}>
                Breakdown por categoria
              </p>
              {stateCategoryStats.length === 0 ? (
                <div className="dash-empty">
                  Nenhuma tentativa encontrada para {selectedState}. Pratique perguntas deste estado para ver o
                  progresso aqui.
                </div>
              ) : (
                <div className="cat-list">
                  {stateCategoryStats.map(([cat, s]) => {
                    const CatIco = categoryLucideIcon(cat);
                    const cp = pct(s.correct, s.total);
                    return (
                      <div className="cat-row" key={`${selectedState}-${cat}`}>
                        <span className="cat-row-icon" aria-hidden>
                          <CatIco />
                        </span>
                        <span className="cat-row-name">{cat}</span>
                        <span className="cat-row-frac">
                          {s.correct}/{s.total}
                        </span>
                        <div className="cat-row-track">
                          <div
                            className="cat-row-fill"
                            style={{
                              width: `${cp}%`,
                              background:
                                cp >= 80 ? "var(--green)" : cp >= 60 ? "var(--orange)" : "var(--red)"
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

          {/* Weekly chart */}
          <div className="dash-section" style={{ marginTop: 22 }}>
            <p className="dash-section-title">Weekly activity</p>
            {allAttempts.length === 0 ? (
              <div className="dash-empty">No activity yet — start practising to see your trend.</div>
            ) : (
              <div className="weekly-chart">
                {weekBuckets.map((b, i) => {
                  const heightPct = b.total === 0 ? 0 : Math.max(8, Math.round((b.total / maxWeekTotal) * 100));
                  const accuracy = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
                  const barColor =
                    b.total === 0
                      ? "var(--border)"
                      : accuracy >= 80
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
                          title={b.total === 0 ? "No activity" : `${accuracy}% (${b.correct}/${b.total})`}
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

          {/* Quick actions */}
          <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
            <Link href="/practice" className="dash-cta">
              Continue practice →
            </Link>
            <Link href="/practice?mode=sim" className="btn-outline" style={{ textDecoration: "none" }}>
              Take mock test
            </Link>
          </div>

          {/* Weak topics */}
          <div className="dash-section">
            <p className="dash-section-title">What to practise next</p>
            {weakTopics.length === 0 ? (
              <div className="dash-empty">
                Answer more questions to get personalised recommendations.
              </div>
            ) : (
              <div className="cat-list">
                {weakTopics.map(([cat, s]) => {
                  const CatIco = categoryLucideIcon(cat);
                  const cp = pct(s.correct, s.total);
                  return (
                    <div className="cat-row" key={cat}>
                      <span className="cat-row-icon" aria-hidden>
                        <CatIco />
                      </span>
                      <span className="cat-row-name">{cat}</span>
                      <span className="cat-row-frac">
                        {s.correct}/{s.total}
                      </span>
                      <div className="cat-row-track">
                        <div
                          className="cat-row-fill"
                          style={{
                            width: `${cp}%`,
                            background:
                              cp >= 80 ? "var(--green)" : cp >= 60 ? "var(--orange)" : "var(--red)"
                          }}
                        />
                      </div>
                      <Link
                        href={`/practice?cat=${encodeURIComponent(cat)}`}
                        className="btn-outline"
                        style={{ marginLeft: "auto", textDecoration: "none" }}
                      >
                        Practise →
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category breakdown */}
          <div className="dash-section">
            <p className="dash-section-title">Progress by topic</p>
            {catStats.length === 0 ? (
              <div className="dash-empty">
                No data yet — answer some questions in Practice mode.
              </div>
            ) : (
              <div className="cat-list">
                {catStats.map(([cat, s]) => {
                  const CatIco = categoryLucideIcon(cat);
                  const cp = pct(s.correct, s.total);
                  return (
                    <div className="cat-row" key={cat}>
                      <span className="cat-row-icon" aria-hidden>
                        <CatIco />
                      </span>
                      <span className="cat-row-name">{cat}</span>
                      <span className="cat-row-frac">
                        {s.correct}/{s.total}
                      </span>
                      <div className="cat-row-track">
                        <div
                          className="cat-row-fill"
                          style={{
                            width: `${cp}%`,
                            background:
                              cp >= 80 ? "var(--green)" : cp >= 60 ? "var(--orange)" : "var(--red)"
                          }}
                        />
                      </div>
                      <Link
                        href={`/practice?cat=${encodeURIComponent(cat)}`}
                        className="btn-outline"
                        style={{ marginLeft: "auto", textDecoration: "none" }}
                      >
                        Practise
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mock session history */}
          <div className="dash-section">
            <p className="dash-section-title">Mock test history</p>
            {allSessions.length === 0 ? (
              <div className="dash-empty">
                No mock tests yet — try the{" "}
                <Link href="/practice" style={{ color: "var(--green)", fontWeight: 800 }}>
                  Mock Test mode
                </Link>
                .
              </div>
            ) : (
              <MockSessionHistory sessions={allSessions} />
            )}
          </div>

          {/* Sign-out note */}
          <p style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: 32 }}>
            Signed in as {user.email} ·{" "}
            <Link
              href="/auth/login?redirect=/dashboard"
              style={{ color: "var(--muted)", textDecoration: "underline" }}
            >
              sign out from nav
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
