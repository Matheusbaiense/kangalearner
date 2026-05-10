import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "../../src/lib/supabase/server";
import { MigrateLocalProgress } from "../../src/components/MigrateLocalProgress";
import { categoryLucideIcon } from "@/lib/categoryLucideIcon";

export const metadata = { title: "Dashboard — KangaLearner" };

/* ── Data types ── */
interface AttemptRow {
  category: string | null;
  is_correct: boolean;
  created_at: string;
}
interface SessionRow {
  id: string;
  state: string;
  score: number;
  total: number;
  created_at: string;
}

// Weekly bar chart helpers — defined outside component (no component state needed)
function startOfWeek(d: Date): Date {
  const day = d.getDay(); // 0=Sun
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  return new Date(d.getFullYear(), d.getMonth(), diff);
}

function weekLabel(monday: Date): string {
  return monday.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
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

  /* ── Fetch question attempts ── */
  const { data: attempts } = (await supabase!
    .from("question_attempts")
    .select("category, is_correct, created_at")
    .eq("user_id", user.id)) as { data: AttemptRow[] | null };

  /* ── Fetch last 5 mock sessions ── */
  const { data: sessions } = (await supabase!
    .from("mock_sessions")
    .select("id, state, score, total, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)) as { data: SessionRow[] | null };

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

  const weakTopics = Object.entries(catMap)
    .filter(([_, s]) => s.total >= 3)
    .sort((a, b) => {
      const ap = a[1].total > 0 ? a[1].correct / a[1].total : 0;
      const bp = b[1].total > 0 ? b[1].correct / b[1].total : 0;
      if (ap !== bp) return ap - bp;
      return b[1].total - a[1].total;
    })
    .slice(0, 3);

  // Weekly bar chart — last 8 weeks
  const WEEKS = 8;
  const weekBuckets: { label: string; total: number; correct: number }[] = [];
  const nowDate = new Date();
  const thisWeekStart = startOfWeek(nowDate);

  for (let i = WEEKS - 1; i >= 0; i--) {
    const weekStart = new Date(thisWeekStart);
    weekStart.setDate(weekStart.getDate() - i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const label = weekLabel(weekStart);
    const bucket = allAttempts.filter((a) => {
      const t = Date.parse(a.created_at);
      return Number.isFinite(t) && t >= weekStart.getTime() && t < weekEnd.getTime();
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
          pct(s.score, s.total) > pct(best.score, best.total) ? s : best
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
                  ? `Best: ${pct(bestSession.score, bestSession.total)}%`
                  : "No mock tests yet"}
              </div>
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
            <Link href="/mock-test" className="btn-outline" style={{ textDecoration: "none" }}>
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
              <div className="session-list">
                {allSessions.map((s) => {
                  const p = pct(s.score, s.total);
                  const pass = p >= 80;
                  return (
                    <div className="session-row" key={s.id}>
                      <div
                        className="session-score"
                        style={{ color: pass ? "var(--green)" : "var(--red)" }}
                      >
                        {s.score}/{s.total}
                      </div>
                      <div className="session-info">
                        <div className="session-state">
                          {s.state} · {p}%
                        </div>
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
