import { type NextRequest } from "next/server";
import { assertAdminRole } from "@/lib/auth/assertAdminRole";
import { apiError, apiOk } from "@/lib/api/envelope";
import { namedQueryFailures } from "@/lib/api/namedQueryFailures";
import { log, logContext } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";
import { supabaseAdmin } from "@/lib/supabase/admin";

type RoleBreakdownRow = { role: string; cnt: number };
type CountryBreakdownRow = { country: string; cnt: number };
type CategoryRow = { category: string; cnt: number };
type SignupDayRow = { day: string; cnt: number };

/** RPCs exist in Supabase but are not yet in generated database.types.ts */
const adminRpc = supabaseAdmin as unknown as {
  rpc: <T>(
    fn: string,
    args?: Record<string, unknown>
  ) => Promise<{ data: T | null; error: { message: string } | null }>;
};

export async function GET(request: NextRequest) {
  const uid = await assertAdminRole();
  if (!uid) return apiError("forbidden", 403);

  if (!(await rateLimit(`admin-stats:user:${uid}`, 30, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  const now = new Date();
  const d30 = new Date(now);
  d30.setDate(d30.getDate() - 30);
  const d7 = new Date(now);
  d7.setDate(d7.getDate() - 7);
  const d1 = new Date(now);
  d1.setDate(d1.getDate() - 1);

  const [
    totalUsersRes,
    newUsersRes,
    totalAttemptsRes,
    attemptsLast7Res,
    totalMockRes,
    mockLast7Res,
    roleBreakdownRes,
    countryBreakdownRes,
    topCategoriesRes,
    activeUsersRes,
    passRateRes,
    signupsPerDayRes
  ] = await Promise.all([
    supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", d1.toISOString()),
    supabaseAdmin.from("question_attempts").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("question_attempts")
      .select("id", { count: "exact", head: true })
      .gte("answered_at", d7.toISOString()),
    supabaseAdmin.from("mock_sessions").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("mock_sessions")
      .select("id", { count: "exact", head: true })
      .gte("completed_at", d7.toISOString()),
    adminRpc.rpc<RoleBreakdownRow[]>("get_role_breakdown"),
    adminRpc.rpc<CountryBreakdownRow[]>("get_country_breakdown", { limit_n: 10 }),
    adminRpc.rpc<CategoryRow[]>("get_top_categories", { since_ts: d30.toISOString(), limit_n: 6 }),
    adminRpc.rpc<number>("get_active_users_count", { since_ts: d7.toISOString() }),
    adminRpc.rpc<number>("get_pass_rate", { since_ts: d30.toISOString() }),
    adminRpc.rpc<SignupDayRow[]>("get_signups_per_day", { since_ts: d30.toISOString() })
  ]);

  const failed = namedQueryFailures([
    { name: "profiles_total", error: totalUsersRes.error },
    { name: "profiles_new_24h", error: newUsersRes.error },
    { name: "attempts_total", error: totalAttemptsRes.error },
    { name: "attempts_last_7d", error: attemptsLast7Res.error },
    { name: "mocks_total", error: totalMockRes.error },
    { name: "mocks_last_7d", error: mockLast7Res.error },
    { name: "get_role_breakdown", error: roleBreakdownRes.error },
    { name: "get_country_breakdown", error: countryBreakdownRes.error },
    { name: "get_top_categories", error: topCategoriesRes.error },
    { name: "get_active_users_count", error: activeUsersRes.error },
    { name: "get_pass_rate", error: passRateRes.error },
    { name: "get_signups_per_day", error: signupsPerDayRes.error }
  ]);

  if (failed.length > 0) {
    log("error", "admin.stats.query_failures", {
      ...logContext(request, { userId: uid, action: "stats" }),
      failed
    });
  }
  if (failed.length === 12) {
    return apiError("internal_error", 500);
  }

  const signupsByDay: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    signupsByDay[d.toISOString().slice(0, 10)] = 0;
  }
  (signupsPerDayRes.data ?? []).forEach((r) => {
    const day = r.day.slice(0, 10);
    if (day in signupsByDay) signupsByDay[day] = r.cnt;
  });

  return apiOk({
    degraded: failed.length > 0,
    failed,
    users: {
      total: totalUsersRes.count ?? 0,
      newLast24h: newUsersRes.count ?? 0,
      activeLastWeek: Number(activeUsersRes.data ?? 0),
      byRole: Object.fromEntries((roleBreakdownRes.data ?? []).map((r) => [r.role, r.cnt])),
      byCountry: (countryBreakdownRes.data ?? []).map((r) => [r.country, r.cnt]),
      signupsLast30Days: Object.entries(signupsByDay).map(([date, count]) => ({ date, count }))
    },
    activity: {
      totalAttempts: totalAttemptsRes.count ?? 0,
      attemptsLast7d: attemptsLast7Res.count ?? 0,
      totalMockSessions: totalMockRes.count ?? 0,
      mockSessionsLast7d: mockLast7Res.count ?? 0,
      passRateLast30d: Number(passRateRes.data ?? 0),
      topCategories: (topCategoriesRes.data ?? []).map((r) => [r.category, r.cnt])
    }
  });
}
