import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "../../src/lib/supabase/server";
import { SiteNav } from "../../src/components/layout/SiteNav";
import { MigrateLocalProgress } from "../../src/components/MigrateLocalProgress";
import { CATEGORIES } from "@kanga/core";

export const metadata = { title: "Dashboard — KangaLearner" };

/* ── Data types ── */
interface AttemptRow {
  category: string | null;
  is_correct: boolean;
}
interface SessionRow {
  id: string;
  state: string;
  score: number;
  total: number;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric", month: "short", year: "numeric"
  });
}

function pct(correct: number, total: number) {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

export default async function DashboardPage() {
  /* ── Auth check ── */
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    redirect("/login?next=/dashboard");
  }

  const { data: { user } } = await supabase!.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    "there";

  /* ── Fetch question attempts ── */
  const { data: attempts } = await supabase!
    .from("question_attempts")
    .select("category, is_correct")
    .eq("user_id", user.id) as { data: AttemptRow[] | null };

  /* ── Fetch last 5 mock sessions ── */
  const { data: sessions } = await supabase!
    .from("mock_sessions")
    .select("id, state, score, total, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5) as { data: SessionRow[] | null };

  /* ── Aggregate stats ── */
  const allAttempts = attempts ?? [];
  const totalAnswered = allAttempts.length;
  const totalCorrect = allAttempts.filter((a) => a.is_correct).length;
  const overallPct = pct(totalCorrect, totalAnswered);

  /* Per-category */
  const catMap: Record<string, { total: number; correct: number }> = {};
  allAttempts.forEach((a) => {
    const key = a.category ?? "Other";
    if (!catMap[key]) catMap[key] = { total: 0, correct: 0 };
    catMap[key].total++;
    if (a.is_correct) catMap[key].correct++;
  });

  const catStats = Object.entries(catMap)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);

  const allSessions = sessions ?? [];
  const bestSession = allSessions.length > 0
    ? allSessions.reduce((best, s) => pct(s.score, s.total) > pct(best.score, best.total) ? s : best)
    : null;

  /* ── Score colour ── */
  const scoreColor =
    totalAnswered === 0 ? "var(--ink)" :
    overallPct >= 80 ? "var(--green)" :
    overallPct >= 60 ? "var(--orange)" :
    "var(--red)";

  return (
    <>
      <MigrateLocalProgress />
      <SiteNav />
      <div className="app-page">
        <div className="app-container app-section">

          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">Hello, {displayName} 👋</h1>
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
                {totalAnswered === 0 ? "No attempts yet" : overallPct >= 80 ? "Above pass threshold ✓" : "Target: 80%"}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-label">Mock tests taken</div>
              <div className="stat-card-value">{allSessions.length}</div>
              <div className="stat-card-sub">
                {bestSession
                  ? `Best: ${pct(bestSession.score, bestSession.total)}%`
                  : "No mock tests yet"}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
            <Link href="/practice" className="dash-cta">Continue practice →</Link>
            <Link
              href="/practice"
              onClick={undefined}
              className="btn-outline"
              style={{ textDecoration: "none" }}
            >
              Take mock test
            </Link>
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
                  const catData = CATEGORIES.find((c) => c.key === cat);
                  const cp = pct(s.correct, s.total);
                  return (
                    <div className="cat-row" key={cat}>
                      <span className="cat-row-icon">{catData?.icon ?? "📚"}</span>
                      <span className="cat-row-name">{cat}</span>
                      <span className="cat-row-frac">{s.correct}/{s.total}</span>
                      <div className="cat-row-track">
                        <div
                          className="cat-row-fill"
                          style={{
                            width: `${cp}%`,
                            background: cp >= 80 ? "var(--green)" : cp >= 60 ? "var(--orange)" : "var(--red)"
                          }}
                        />
                      </div>
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
              <div className="session-list">
                {allSessions.map((s) => {
                  const p = pct(s.score, s.total);
                  const pass = p >= 80;
                  return (
                    <div className="session-row" key={s.id}>
                      <div className="session-score" style={{ color: pass ? "var(--green)" : "var(--red)" }}>
                        {s.score}/{s.total}
                      </div>
                      <div className="session-info">
                        <div className="session-state">{s.state} · {p}%</div>
                        <div className="session-date">{formatDate(s.created_at)}</div>
                      </div>
                      <span className={`badge ${pass ? "badge-pass" : "badge-fail"}`}>
                        {pass ? "Pass" : "Fail"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sign-out note */}
          <p style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: 32 }}>
            Signed in as {user.email} ·{" "}
            <Link href="/login" style={{ color: "var(--muted)", textDecoration: "underline" }}>
              sign out from nav
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
