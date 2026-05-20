import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../src/lib/supabase/server";
import { MigrateLocalProgress } from "../../src/components/MigrateLocalProgress";
import { DashboardClient } from "./DashboardClient";
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

  if (settingsUpsertError) console.error("Dashboard user settings upsert failed", errCode(settingsUpsertError));

  const [
    attemptsResult,
    stateAttemptsResult,
    attemptsCountResult,
    attemptsCorrectCountResult,
    stateAttemptsCountResult,
    stateAttemptsCorrectCountResult,
    sessionsResult,
    settingsResult
  ] = await Promise.all([
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(500),
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .eq("state", selectedState)
      .order("created_at", { ascending: false })
      .limit(500),
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
  const { count: attemptsCount, error: attemptsCountError } = attemptsCountResult as {
    count: number | null;
    error: unknown;
  };
  const { count: attemptsCorrectCount, error: attemptsCorrectCountError } = attemptsCorrectCountResult as {
    count: number | null;
    error: unknown;
  };
  const { count: stateAttemptsCount, error: stateAttemptsCountError } = stateAttemptsCountResult as {
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

  if (attemptsError) console.error("Dashboard attempts lookup failed", errCode(attemptsError));
  if (stateAttemptsError) console.error("Dashboard state attempts lookup failed", errCode(stateAttemptsError));
  if (attemptsCountError) console.error("Dashboard attempts count failed", errCode(attemptsCountError));
  if (attemptsCorrectCountError) console.error("Dashboard correct attempts count failed", errCode(attemptsCorrectCountError));
  if (stateAttemptsCountError) console.error("Dashboard state attempts count failed", errCode(stateAttemptsCountError));
  if (stateAttemptsCorrectCountError) {
    console.error("Dashboard state correct attempts count failed", errCode(stateAttemptsCorrectCountError));
  }
  if (sessionsError) console.error("Dashboard sessions lookup failed", errCode(sessionsError));
  if (settingsError) console.error("Dashboard user settings lookup failed", errCode(settingsError));

  /* ── Aggregate stats ── */
  const allAttempts = attempts ?? [];
  const totalAnswered = attemptsCount ?? allAttempts.length;
  const totalCorrect = attemptsCorrectCount ?? allAttempts.filter((a) => a.is_correct).length;
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
  const stateTotalAnswered = stateAttemptsCount ?? selectedStateAttempts.length;
  const stateTotalCorrect = stateAttemptsCorrectCount ?? selectedStateAttempts.filter((a) => a.is_correct).length;
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
        hasAttempts={allAttempts.length > 0}
        catStats={catStats}
        weakTopics={weakTopics}
        sessions={allSessions}
      />
    </>
  );
}
