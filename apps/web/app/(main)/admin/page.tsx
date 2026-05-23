"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Activity,
  ClipboardList,
  TrendingUp,
  Globe,
  RefreshCw,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Star,
  UserCheck,
  Crown,
  BarChart3,
  Zap,
  Target,
  Calendar
} from "lucide-react";

/* ── Types ── */
interface StatsData {
  users: {
    total: number;
    newLast24h: number;
    activeLastWeek: number;
    byRole: Record<string, number>;
    byCountry: [string, number][];
    signupsLast30Days: { date: string; count: number }[];
  };
  activity: {
    totalAttempts: number;
    attemptsLast7d: number;
    totalMockSessions: number;
    mockSessionsLast7d: number;
    passRateLast30d: number;
    topCategories: [string, number][];
  };
}

interface User {
  id: string;
  email: string | null;
  display_name: string | null;
  role: string;
  country: string;
  lang: string;
  created_at: string;
  last_sign_in: string | null;
}

/* ── Helpers ── */
function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function relativeTime(iso: string | null): string {
  if (!iso) return "never";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

const ROLE_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  free: { label: "Free", color: "#64748b", icon: <UserCheck size={12} /> },
  premium: { label: "Premium", color: "#f59e0b", icon: <Star size={12} /> },
  admin: { label: "Admin", color: "#3b82f6", icon: <ShieldCheck size={12} /> },
  super_admin: { label: "Super Admin", color: "#22c55e", icon: <Crown size={12} /> }
};

function RoleBadge({ role }: { role: string }) {
  const meta = ROLE_META[role] ?? { label: role, color: "#64748b", icon: null };
  return (
    <span
      className="admin-role-badge"
      style={{ "--role-color": meta.color } as React.CSSProperties}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}

/* ── Sparkline (CSS bar chart) ── */
function Sparkline({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="admin-sparkline">
      {data.map((d) => (
        <div
          key={d.date}
          className="admin-spark-bar"
          style={{ height: `${Math.max(4, (d.count / max) * 48)}px` }}
          title={`${d.date}: ${d.count}`}
        />
      ))}
    </div>
  );
}

/* ── Stat card ── */
function StatCard({
  icon,
  label,
  value,
  sub,
  color = "var(--green)"
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="admin-stat-body">
        <div className="admin-stat-value">{value}</div>
        <div className="admin-stat-label">{label}</div>
        {sub && <div className="admin-stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function AdminPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(0);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "users">("overview");

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to load stats");
      setStats(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "50" });
    if (search) params.set("search", search);
    if (roleFilter) params.set("role", roleFilter);
    const res = await fetch(`/api/admin/users?${params}`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
      setUsersTotal(data.total);
    }
    setUsersLoading(false);
  }, [page, search, roleFilter]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);
  useEffect(() => {
    if (tab === "users") loadUsers();
  }, [tab, loadUsers]);

  async function changeRole(userId: string, newRole: string) {
    setUpdatingRole(userId);
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole })
    });
    await loadUsers();
    setUpdatingRole(null);
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-inner">
          <div>
            <h1 className="admin-title">
              <Crown size={22} strokeWidth={2} className="admin-title-icon" />
              Admin Dashboard
            </h1>
            <p className="admin-subtitle">KangaLearner — real-time platform analytics</p>
          </div>
          <button
            className="admin-refresh-btn"
            onClick={loadStats}
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw size={16} strokeWidth={2} className={loading ? "admin-spin" : ""} />
            Refresh
          </button>
        </div>
        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab${tab === "overview" ? " active" : ""}`}
            onClick={() => setTab("overview")}
          >
            <BarChart3 size={15} strokeWidth={2} /> Overview
          </button>
          <button
            className={`admin-tab${tab === "users" ? " active" : ""}`}
            onClick={() => setTab("users")}
          >
            <Users size={15} strokeWidth={2} /> Users
          </button>
        </div>
      </div>

      <div className="admin-body">
        {error && (
          <div className="admin-error">
            <XCircle size={16} /> {error}
          </div>
        )}

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <>
            {loading ? (
              <div className="admin-loading-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="admin-skeleton" />
                ))}
              </div>
            ) : (
              stats && (
                <>
                  {/* KPI row */}
                  <div className="admin-kpi-grid">
                    <StatCard
                      icon={<Users size={20} strokeWidth={2} />}
                      label="Total Users"
                      value={fmt(stats.users.total)}
                      sub={`+${stats.users.newLast24h} today`}
                      color="var(--green)"
                    />
                    <StatCard
                      icon={<Zap size={20} strokeWidth={2} />}
                      label="Active (7d)"
                      value={fmt(stats.users.activeLastWeek)}
                      sub="unique users practising"
                      color="#f59e0b"
                    />
                    <StatCard
                      icon={<Activity size={20} strokeWidth={2} />}
                      label="Questions Answered"
                      value={fmt(stats.activity.totalAttempts)}
                      sub={`${fmt(stats.activity.attemptsLast7d)} this week`}
                      color="#3b82f6"
                    />
                    <StatCard
                      icon={<ClipboardList size={20} strokeWidth={2} />}
                      label="Mock Tests"
                      value={fmt(stats.activity.totalMockSessions)}
                      sub={`${fmt(stats.activity.mockSessionsLast7d)} this week`}
                      color="#8b5cf6"
                    />
                    <StatCard
                      icon={<CheckCircle2 size={20} strokeWidth={2} />}
                      label="Pass Rate (30d)"
                      value={`${stats.activity.passRateLast30d}%`}
                      sub="mock tests passed"
                      color="#22c55e"
                    />
                    <StatCard
                      icon={<Calendar size={20} strokeWidth={2} />}
                      label="New Today"
                      value={stats.users.newLast24h}
                      sub="signups last 24h"
                      color="#f43f5e"
                    />
                  </div>

                  {/* Signups chart */}
                  <div className="admin-chart-card">
                    <div className="admin-chart-header">
                      <TrendingUp size={16} strokeWidth={2} />
                      <span>Signups — last 30 days</span>
                    </div>
                    <Sparkline data={stats.users.signupsLast30Days} />
                    <div className="admin-sparkline-labels">
                      <span>{stats.users.signupsLast30Days[0]?.date}</span>
                      <span>
                        {
                          stats.users.signupsLast30Days[stats.users.signupsLast30Days.length - 1]
                            ?.date
                        }
                      </span>
                    </div>
                  </div>

                  {/* Two-column: roles + countries */}
                  <div className="admin-two-col">
                    {/* Roles */}
                    <div className="admin-card">
                      <div className="admin-card-title">
                        <ShieldCheck size={15} strokeWidth={2} /> Users by Role
                      </div>
                      <div className="admin-role-list">
                        {Object.entries(stats.users.byRole).map(([role, count]) => {
                          const pct =
                            stats.users.total > 0
                              ? Math.round((count / stats.users.total) * 100)
                              : 0;
                          const meta = ROLE_META[role] ?? { label: role, color: "#64748b" };
                          return (
                            <div key={role} className="admin-role-row">
                              <span className="admin-role-row-label">
                                <span
                                  className="admin-role-dot"
                                  style={{ background: meta.color }}
                                />
                                {meta.label}
                              </span>
                              <div className="admin-role-bar-wrap">
                                <div
                                  className="admin-role-bar"
                                  style={{ width: `${pct}%`, background: meta.color }}
                                />
                              </div>
                              <span className="admin-role-count">{fmt(count)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Countries */}
                    <div className="admin-card">
                      <div className="admin-card-title">
                        <Globe size={15} strokeWidth={2} /> Top Countries
                      </div>
                      <div className="admin-country-list">
                        {stats.users.byCountry.map(([country, count]) => (
                          <div key={country} className="admin-country-row">
                            <span className="admin-country-flag">
                              <img
                                src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
                                alt={country}
                                width={18}
                                height={14}
                                loading="lazy"
                                style={{ borderRadius: 2 }}
                              />
                              {country}
                            </span>
                            <span className="admin-country-count">{fmt(count)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top categories */}
                  <div className="admin-card">
                    <div className="admin-card-title">
                      <Target size={15} strokeWidth={2} /> Top Practised Categories (30d)
                    </div>
                    <div className="admin-cat-grid">
                      {stats.activity.topCategories.map(([cat, count]) => {
                        const max = stats.activity.topCategories[0]?.[1] ?? 1;
                        return (
                          <div key={cat} className="admin-cat-row">
                            <span className="admin-cat-name">{cat.replace(/_/g, " ")}</span>
                            <div className="admin-cat-bar-wrap">
                              <div
                                className="admin-cat-bar"
                                style={{ width: `${Math.round((count / max) * 100)}%` }}
                              />
                            </div>
                            <span className="admin-cat-count">{fmt(count)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )
            )}
          </>
        )}

        {/* ── USERS TAB ── */}
        {tab === "users" && (
          <>
            <div className="admin-users-toolbar">
              <input
                className="admin-search"
                placeholder="Search by name…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              />
              <select
                className="admin-filter-select"
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(0);
                }}
              >
                <option value="">All roles</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
              <button className="admin-refresh-btn" onClick={loadUsers} disabled={usersLoading}>
                <RefreshCw size={14} strokeWidth={2} className={usersLoading ? "admin-spin" : ""} />
                Load
              </button>
            </div>

            <div className="admin-users-meta">
              {usersTotal} users {roleFilter && `· ${roleFilter}`}
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Country</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Last seen</th>
                    <th>Change role</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <tr key={i}>
                          {Array.from({ length: 6 }).map((_, j) => (
                            <td key={j}>
                              <div className="admin-skeleton admin-skeleton-sm" />
                            </td>
                          ))}
                        </tr>
                      ))
                    : users.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div className="admin-user-cell">
                              <div className="admin-user-avatar">
                                {(u.display_name ?? u.email ?? "?")[0].toUpperCase()}
                              </div>
                              <div>
                                <div className="admin-user-name">{u.display_name ?? "—"}</div>
                                <div className="admin-user-email">
                                  {u.email ?? u.id.slice(0, 8)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="admin-country-flag">
                              <img
                                src={`https://flagcdn.com/w20/${u.country.toLowerCase()}.png`}
                                alt={u.country}
                                width={16}
                                height={12}
                                loading="lazy"
                                style={{ borderRadius: 2 }}
                              />
                              {u.country}
                            </span>
                          </td>
                          <td>
                            <RoleBadge role={u.role} />
                          </td>
                          <td className="admin-table-muted">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td className="admin-table-muted">{relativeTime(u.last_sign_in)}</td>
                          <td>
                            <select
                              className="admin-role-select"
                              value={u.role}
                              disabled={updatingRole === u.id}
                              onChange={(e) => changeRole(u.id, e.target.value)}
                            >
                              <option value="free">Free</option>
                              <option value="premium">Premium</option>
                              <option value="admin">Admin</option>
                              <option value="super_admin">Super Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="admin-pagination">
              <button
                className="admin-page-btn"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Prev
              </button>
              <span className="admin-page-info">Page {page + 1}</span>
              <button
                className="admin-page-btn"
                disabled={(page + 1) * 50 >= usersTotal}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
