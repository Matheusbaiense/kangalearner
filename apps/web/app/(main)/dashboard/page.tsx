import { redirect } from "next/navigation";
import { SUPPORTED_COUNTRY, WA_PASS_THRESHOLD } from "@kanga/core";
import { createClient } from "@/lib/supabase/server";
import { MigrateLocalProgress } from "@/components/MigrateLocalProgress";
import { DashboardClient } from "./DashboardClient";
import { AU_STATE_OPTIONS, normalizeAuState, type AuStateCode } from "./state-options";

export const metadata = { title: "Dashboard — KangaLearner" };

type CatStatRow = {
  category: string;
  total_attempts: number;
  correct_attempts: number;
};

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

function errCode(e: unknown): string {
  if (e && typeof e === "object") {
    if ("code" in e) return String((e as { code: unknown }).code);
    if ("message" in e) return String((e as { message: unknown }).message);
  }
  return String(e);
}

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

async function loadPreferredState(
  supabase: Awaited<ReturnType<typeof createClient>>,
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
  let supabase: Awaited<ReturnType<typeof createClient>>;
  try {
    supabase = await createClient();
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

  // Auto-persist preferred state when user explicitly navigates to a different state
  if (params.state && selectedState !== preferredState) {
    const { error: prefStateErr } = await supabase!
      .from("profiles")
      .update({ preferred_state: selectedState })
      .eq("id", user.id);
    if (prefStateErr)
      console.error("Dashboard preferred_state update failed", errCode(prefStateErr));
  }

  const { error: settingsUpsertError } = await supabase!
    .from("user_settings")
    .upsert(
      { user_id: user.id, daily_goal: 10 },
      { onConflict: "user_id", ignoreDuplicates: true }
    );

  if (settingsUpsertError)
    console.error("Dashboard user settings upsert failed", errCode(settingsUpsertError));

  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

  const [
    catStatsResult,
    stateCatStatsResult,
    temporalAttemptsResult,
    attemptsCountResult,
    attemptsCorrectCountResult,
    stateAttemptsCountResult,
    stateAttemptsCorrectCountResult,
    sessionsResult,
    settingsResult
  ] = await Promise.all([
    // Category stats — all states aggregated (replaces 500-row attempts query)
    supabase!
      .from("user_category_stats")
      .select("category, total_attempts, correct_attempts")
      .eq("user_id", user.id)
      .eq("country", SUPPORTED_COUNTRY),
    // Category stats — state-specific (replaces 500-row state-filtered query)
    supabase!
      .from("user_category_stats")
      .select("category, total_attempts, correct_attempts")
      .eq("user_id", user.id)
      .eq("country", SUPPORTED_COUNTRY)
      .eq("state", selectedState),
    // Temporal data — last 90 days only, for streak/weekly chart/today count
    supabase!
      .from("question_attempts")
      .select("answered_at, is_correct")
      .eq("user_id", user.id)
      .gte("answered_at", ninetyDaysAgo)
      .order("answered_at", { ascending: false })
      .limit(5000),
    supabase!
      .from("question_attempts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase!
      .from("question_attempts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_correct", true),
    supabase!
      .from("question_attempts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("state", selectedState),
    supabase!
      .from("question_attempts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("state", selectedState)
      .eq("is_correct", true),
    supabase!
      .from("mock_sessions")
      .select("id, state, score, total, percent, completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(50),
    supabase!.from("user_settings").select("daily_goal").eq("user_id", user.id).maybeSingle()
  ]);

  const { data: userCatStats, error: catStatsError } = catStatsResult as {
    data: CatStatRow[] | null;
    error: unknown;
  };
  const { data: stateUserCatStats, error: stateCatStatsError } = stateCatStatsResult as {
    data: CatStatRow[] | null;
    error: unknown;
  };
  const { data: temporalAttempts, error: temporalAttemptsError } = temporalAttemptsResult as {
    data: Pick<AttemptRow, "answered_at" | "is_correct">[] | null;
    error: unknown;
  };
  const { count: attemptsCount, error: attemptsCountError } = attemptsCountResult as {
    count: number | null;
    error: unknown;
  };
  const { count: attemptsCorrectCount, error: attemptsCorrectCountError } =
    attemptsCorrectCountResult as {
      count: number | null;
      error: unknown;
    };
  const { count: stateAttemptsCount, error: stateAttemptsCountError } =
    stateAttemptsCountResult as {
      count: number | null;
      error: unknown;
    };
  const { count: stateAttemptsCorrectCount, error: stateAttemptsCorrectCountError } =
    stateAttemptsCorrectCountResult as {
      count: number | null;
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

  if (catStatsError)
    console.error("Dashboard category stats lookup failed", errCode(catStatsError));
  if (stateCatStatsError)
    console.error("Dashboard state category stats lookup failed", errCode(stateCatStatsError));
  if (temporalAttemptsError)
    console.error("Dashboard temporal attempts lookup failed", errCode(temporalAttemptsError));
  if (attemptsCountError)
    console.error("Dashboard attempts count failed", errCode(attemptsCountError));
  if (attemptsCorrectCountError)
    console.error("Dashboard correct attempts count failed", errCode(attemptsCorrectCountError));
  if (stateAttemptsCountError)
    console.error("Dashboard state attempts count failed", errCode(stateAttemptsCountError));
  if (stateAttemptsCorrectCountError) {
    console.error(
      "Dashboard state correct attempts count failed",
      errCode(stateAttemptsCorrectCountError)
    );
  }
  if (sessionsError) console.error("Dashboard sessions lookup failed", errCode(sessionsError));
  if (settingsError) console.error("Dashboard user settings lookup failed", errCode(settingsError));

  /* ── Aggregate stats ── */
  // Counts come from exact COUNT queries — no raw-row fallback needed
  const totalAnswered = attemptsCount ?? 0;
  const totalCorrect = attemptsCorrectCount ?? 0;
  const overallPct = pct(totalCorrect, totalAnswered);
  const dailyGoal = Math.max(1, settings?.daily_goal ?? 10);
  const todayKey = dayKeyUtcMinus8(new Date());

  // Temporal analytics — last 90 days of question_attempts
  const temporalData = temporalAttempts ?? [];
  const answeredToday = todayKey
    ? temporalData.filter((attempt) => dayKeyUtcMinus8(attempt.answered_at) === todayKey).length
    : 0;
  const dailyGoalPct = Math.min(100, pct(answeredToday, dailyGoal));
  const streakDays = streakForAttempts(temporalData);

  // Weekly bar chart — built from temporal data (last 90 days covers 8+ weeks)
  const WEEKS = 8;
  const weekBuckets: { label: string; total: number; correct: number }[] = [];
  const thisWeekStart = startOfWeekDayKey(todayKey ?? dayKeyUtcMinus8(new Date()) ?? "1970-01-01");

  for (let i = WEEKS - 1; i >= 0; i--) {
    const weekStart = shiftDayKey(thisWeekStart, -i * 7);
    const weekEnd = shiftDayKey(weekStart, 7);
    const label = weekLabel(weekStart);
    const bucket = temporalData.filter((a) => {
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

  // Category stats — from pre-aggregated user_category_stats (no row-scan limit)
  const catMap = new Map<string, { total: number; correct: number }>();
  for (const row of userCatStats ?? []) {
    const e = catMap.get(row.category) ?? { total: 0, correct: 0 };
    catMap.set(row.category, {
      total: e.total + row.total_attempts,
      correct: e.correct + row.correct_attempts
    });
  }
  const catStats = [...catMap.entries()].sort((a, b) => b[1].total - a[1].total).slice(0, 10);
  const weakTopics = [...catMap.entries()]
    .filter(([, s]) => s.total >= 3)
    .sort((a, b) => {
      const ap = a[1].total > 0 ? a[1].correct / a[1].total : 0;
      const bp = b[1].total > 0 ? b[1].correct / b[1].total : 0;
      if (ap !== bp) return ap - bp;
      return b[1].total - a[1].total;
    })
    .slice(0, 3);

  // State-specific stats
  const stateTotalAnswered = stateAttemptsCount ?? 0;
  const stateTotalCorrect = stateAttemptsCorrectCount ?? 0;
  const stateAccuracy = pct(stateTotalCorrect, stateTotalAnswered);
  const stateCategoryStats = (stateUserCatStats ?? [])
    .map((row): [string, { total: number; correct: number }] => [
      row.category,
      { total: row.total_attempts, correct: row.correct_attempts }
    ])
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);

  const allSessions = sessions ?? [];
  const bestSession =
    allSessions.length > 0
      ? allSessions.reduce((best, s) => (s.percent > best.percent ? s : best))
      : null;

  /* ── Score colour ── */
  const scoreColor =
    totalAnswered === 0
      ? "var(--ink)"
      : overallPct >= WA_PASS_THRESHOLD * 100
        ? "var(--green)"
        : overallPct >= 60
          ? "var(--orange)"
          : "var(--red)";

  return (
    <>
      <MigrateLocalProgress />
      <DashboardClient
        displayName={displayName}
        userEmail={user.email}
        totalAnswered={totalAnswered}
        totalCorrect={totalCorrect}
        overallPct={overallPct}
        scoreColor={scoreColor}
        mockSessionCount={allSessions.length}
        bestSession={bestSession}
        streakDays={streakDays}
        answeredToday={answeredToday}
        dailyGoal={dailyGoal}
        dailyGoalPct={dailyGoalPct}
        selectedState={selectedState}
        selectedStateName={selectedStateName}
        stateTotalAnswered={stateTotalAnswered}
        stateTotalCorrect={stateTotalCorrect}
        stateAccuracy={stateAccuracy}
        stateCategoryStats={stateCategoryStats}
        weekBuckets={weekBuckets}
        maxWeekTotal={maxWeekTotal}
        hasAttempts={totalAnswered > 0}
        catStats={catStats}
        weakTopics={weakTopics}
        sessions={allSessions}
      />
    </>
  );
}
