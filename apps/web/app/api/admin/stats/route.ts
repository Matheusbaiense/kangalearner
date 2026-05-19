import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function assertSuperAdmin(): Promise<string | null> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["admin", "super_admin"].includes(profile.role)) return null;
  return user.id;
}

export async function GET() {
  const uid = await assertSuperAdmin();
  if (!uid) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const now = new Date();
  const d30 = new Date(now); d30.setDate(d30.getDate() - 30);
  const d7  = new Date(now); d7.setDate(d7.getDate() - 7);
  const d1  = new Date(now); d1.setDate(d1.getDate() - 1);

  // Parallel queries
  const [
    totalUsersRes,
    roleBreakdownRes,
    countryBreakdownRes,
    newUsersRes,
    signupsLast30Res,
    totalAttemptsRes,
    attemptsLast7Res,
    totalMockRes,
    mockLast7Res,
    topCategoriesRes,
    activeUsersRes,
    passRateRes,
  ] = await Promise.all([
    // Total users
    supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),

    // Role breakdown
    supabaseAdmin.from("profiles").select("role").then(({ data }) => {
      const counts: Record<string, number> = {};
      (data ?? []).forEach((r) => { counts[r.role] = (counts[r.role] ?? 0) + 1; });
      return { data: counts };
    }),

    // Country breakdown
    supabaseAdmin.from("profiles").select("country").then(({ data }) => {
      const counts: Record<string, number> = {};
      (data ?? []).forEach((r) => { counts[r.country] = (counts[r.country] ?? 0) + 1; });
      return { data: Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10) };
    }),

    // New users last 24h
    supabaseAdmin.from("profiles").select("id", { count: "exact", head: true })
      .gte("created_at", d1.toISOString()),

    // Signups per day last 30 days
    supabaseAdmin.from("profiles")
      .select("created_at")
      .gte("created_at", d30.toISOString())
      .order("created_at"),

    // Total question attempts
    supabaseAdmin.from("question_attempts").select("id", { count: "exact", head: true }),

    // Attempts last 7 days
    supabaseAdmin.from("question_attempts").select("id", { count: "exact", head: true })
      .gte("created_at", d7.toISOString()),

    // Total mock sessions
    supabaseAdmin.from("mock_sessions").select("id", { count: "exact", head: true }),

    // Mock sessions last 7 days
    supabaseAdmin.from("mock_sessions").select("id", { count: "exact", head: true })
      .gte("created_at", d7.toISOString()),

    // Top categories practiced
    supabaseAdmin.from("question_attempts")
      .select("category")
      .not("category", "is", null)
      .gte("created_at", d30.toISOString())
      .then(({ data }) => {
        const counts: Record<string, number> = {};
        (data ?? []).forEach((r) => { if (r.category) counts[r.category] = (counts[r.category] ?? 0) + 1; });
        return { data: Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6) };
      }),

    // Unique active users last 7 days
    supabaseAdmin.from("question_attempts")
      .select("user_id")
      .gte("created_at", d7.toISOString())
      .then(({ data }) => {
        const unique = new Set((data ?? []).map((r) => r.user_id));
        return { data: unique.size };
      }),

    // Pass rate on mock tests (pass = score/total >= 80%)
    supabaseAdmin.from("mock_sessions")
      .select("score, total")
      .gte("created_at", d30.toISOString())
      .then(({ data }) => {
        const sessions = data ?? [];
        const count = sessions.length;
        const passed = sessions.filter((r) => r.total > 0 && r.score / r.total >= 0.8).length;
        return { data: count > 0 ? Math.round((passed / count) * 100) : 0 };
      }),
  ]);

  // Build signups-per-day chart data
  const signupsByDay: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    signupsByDay[d.toISOString().slice(0, 10)] = 0;
  }
  (signupsLast30Res.data ?? []).forEach((r) => {
    const day = r.created_at.slice(0, 10);
    if (day in signupsByDay) signupsByDay[day]++;
  });

  return NextResponse.json({
    users: {
      total: totalUsersRes.count ?? 0,
      newLast24h: newUsersRes.count ?? 0,
      activeLastWeek: activeUsersRes.data ?? 0,
      byRole: roleBreakdownRes.data,
      byCountry: countryBreakdownRes.data,
      signupsLast30Days: Object.entries(signupsByDay).map(([date, count]) => ({ date, count })),
    },
    activity: {
      totalAttempts: totalAttemptsRes.count ?? 0,
      attemptsLast7d: attemptsLast7Res.count ?? 0,
      totalMockSessions: totalMockRes.count ?? 0,
      mockSessionsLast7d: mockLast7Res.count ?? 0,
      passRateLast30d: passRateRes.data ?? 0,
      topCategories: topCategoriesRes.data,
    },
  });
}
