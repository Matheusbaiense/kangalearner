import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Progress — KangaLearner" };

interface AttemptRow {
  category: string | null;
  is_correct: boolean;
  created_at: string;
}

function pct(correct: number, total: number) {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

function clamp01(n: number) {
  if (!Number.isFinite(n) || n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

/** Returns ISO week label like "W18" for a Date */
function weekLabel(d: Date): string {
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const dayOfYear = Math.ceil((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
  const weekNum = Math.ceil((dayOfYear + jan4.getDay()) / 7);
  return `W${weekNum}`;
}

/** Returns start-of-week (Monday) for a Date */
function startOfWeek(d: Date): Date {
  const clone = new Date(d);
  const day = clone.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  clone.setDate(clone.getDate() + diff);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export default async function ProgressPage() {
  let supabase: Awaited<ReturnType<typeof createClient>>;
  try {
    supabase = await createClient();
  } catch {
    redirect("/auth/login?redirect=/progress");
  }

  const {
    data: { user }
  } = await supabase!.auth.getUser();
  if (!user) redirect("/auth/login?redirect=/progress");

  const { data: raw } = (await supabase!
    .from("question_attempts")
    .select("category, is_correct, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })) as { data: AttemptRow[] | null };

  const attempts = raw ?? [];

  /* ── Overall stats ── */
  const totalAnswered = attempts.length;
  const totalCorrect = attempts.filter((a) => a.is_correct).length;
  const overallPct = pct(totalCorrect, totalAnswered);

  /* ── Weekly buckets — last 8 weeks ── */
  const now = new Date();
  const weeks: { label: string; start: Date; end: Date }[] = [];
  for (let i = 7; i >= 0; i--) {
    const weekStart = startOfWeek(new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000));
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    weeks.push({ label: weekLabel(weekStart), start: weekStart, end: weekEnd });
  }

  const weeklyData = weeks.map((w) => {
    const bucket = attempts.filter((a) => {
      const t = new Date(a.created_at).getTime();
      return t >= w.start.getTime() && t < w.end.getTime();
    });
    const total = bucket.length;
    const correct = bucket.filter((a) => a.is_correct).length;
    return { label: w.label, total, correct, accuracy: pct(correct, total) };
  });

  const maxWeeklyTotal = Math.max(...weeklyData.map((w) => w.total), 1);

  /* ── Category breakdown ── */
  const catMap: Record<string, { total: number; correct: number }> = {};
  attempts.forEach((a) => {
    const key = a.category ?? "Other";
    if (!catMap[key]) catMap[key] = { total: 0, correct: 0 };
    catMap[key].total++;
    if (a.is_correct) catMap[key].correct++;
  });

  const catStats = Object.entries(catMap).sort((a, b) => b[1].total - a[1].total);

  /* ── Study streak (consecutive days with attempts) ── */
  const daySet = new Set(
    attempts.map((a) => {
      const d = new Date(a.created_at);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (daySet.has(key)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  const scoreColor =
    totalAnswered === 0
      ? "var(--ink)"
      : overallPct >= 80
        ? "var(--green)"
        : overallPct >= 60
          ? "var(--orange)"
          : "var(--red)";

  return (
    <div className="app-page">
      <div className="app-container app-section">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Progress</h1>
          <p className="page-sub">Your learning journey over time.</p>
        </div>

        {/* Top stat cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-card-label">Total answered</div>
            <div className="stat-card-value">{totalAnswered}</div>
            <div className="stat-card-sub">
              {totalAnswered === 0 ? "Start practising" : `${totalCorrect} correct`}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-label">Overall accuracy</div>
            <div className="stat-card-value" style={{ color: scoreColor }}>
              {totalAnswered === 0 ? "—" : `${overallPct}%`}
            </div>
            <div className="stat-card-sub">Target: 80%</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-label">Study streak</div>
            <div className="stat-card-value" style={{ color: streak > 0 ? "var(--green)" : "var(--ink)" }}>
              {streak}
            </div>
            <div className="stat-card-sub">{streak === 1 ? "day in a row" : "days in a row"}</div>
          </div>
        </div>

        {/* Weekly activity chart */}
        <div className="dash-section" style={{ marginTop: 28 }}>
          <p className="dash-section-title">Weekly activity — last 8 weeks</p>

          {totalAnswered === 0 ? (
            <div className="dash-empty">No activity yet. Start practising to see your weekly trend.</div>
          ) : (
            <div className="progress-weekly-chart">
              {weeklyData.map((w) => (
                <div key={w.label} className="progress-week-col">
                  <div className="progress-week-bar-wrap">
                    <div
                      className="progress-week-bar"
                      style={{
                        height: `${Math.round(clamp01(w.total / maxWeeklyTotal) * 100)}%`,
                        background:
                          w.accuracy >= 80
                            ? "var(--green)"
                            : w.accuracy >= 60
                              ? "var(--orange)"
                              : w.total === 0
                                ? "var(--border)"
                                : "var(--red)"
                      }}
                      title={`${w.total} questions, ${w.accuracy}% accuracy`}
                    />
                  </div>
                  <div className="progress-week-label">{w.label}</div>
                  <div className="progress-week-count">{w.total > 0 ? `${w.accuracy}%` : "—"}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category breakdown */}
        <div className="dash-section">
          <p className="dash-section-title">Progress by topic</p>

          {catStats.length === 0 ? (
            <div className="dash-empty">Answer questions in Practice mode to see topic breakdown.</div>
          ) : (
            <div className="cat-list">
              {catStats.map(([cat, s]) => {
                const cp = pct(s.correct, s.total);
                return (
                  <div className="cat-row" key={cat}>
                    <span className="cat-row-name" style={{ flex: "0 0 160px" }}>
                      {cat}
                    </span>
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
                    <span
                      className="cat-row-pct"
                      style={{
                        color: cp >= 80 ? "var(--green)" : cp >= 60 ? "var(--orange)" : "var(--red)"
                      }}
                    >
                      {cp}%
                    </span>
                    <Link
                      href={`/practice?cat=${encodeURIComponent(cat)}`}
                      className="btn-outline"
                      style={{ marginLeft: "auto", textDecoration: "none", flexShrink: 0 }}
                    >
                      Practise →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          <Link href="/practice" className="dash-cta">
            Continue practice →
          </Link>
          <Link href="/dashboard" className="btn-outline" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
