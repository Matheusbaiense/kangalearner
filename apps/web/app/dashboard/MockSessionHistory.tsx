"use client";

import { useMemo, useState } from "react";

export type DashboardMockSession = {
  id: number | string;
  state: string;
  score: number;
  total: number;
  percent: number;
  completed_at: string;
};

const PAGE_SIZE = 10;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function MockSessionHistory({ sessions }: { sessions: DashboardMockSession[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleSessions = useMemo(() => sessions.slice(0, visibleCount), [sessions, visibleCount]);
  const hasMore = visibleCount < sessions.length;

  if (sessions.length === 0) {
    return <div className="dash-empty">No mock tests yet.</div>;
  }

  return (
    <>
      <div className="session-list">
        {visibleSessions.map((session) => {
          const pass = session.percent >= 80;
          return (
            <div className="session-row" key={session.id}>
              <div
                className="session-score"
                style={{ color: pass ? "var(--green)" : "var(--red)" }}
              >
                {session.score}/{session.total}
              </div>
              <div className="session-info">
                <div className="session-state">
                  {session.state} · {session.percent}%
                </div>
                <div className="session-date">{formatDate(session.completed_at)}</div>
              </div>
              <span className={`badge ${pass ? "badge-pass" : "badge-fail"}`}>
                {pass ? "Pass" : "Fail"}
              </span>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          className="btn-outline"
          type="button"
          onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, sessions.length))}
          style={{ marginTop: 14 }}
        >
          Carregar mais
        </button>
      )}
    </>
  );
}
