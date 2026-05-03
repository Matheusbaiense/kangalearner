"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(false);

  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Supabase client error");
      return null;
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    // When coming from the reset email link, Supabase will parse tokens and set a session.
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) setError(error.message);
      setReady(Boolean(data.session));
    });
  }, [supabase]);

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    setOk(false);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else setOk(true);
    setBusy(false);
  }

  return (
    <main style={{ padding: 32, fontFamily: "Inter, sans-serif", maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Choose a new password</h1>
      <p style={{ color: "#475569" }}>
        Opened from a secure link. If this page says it’s not ready, try opening the reset link again.
      </p>

      {!ready ? (
        <p style={{ marginTop: 16, color: "#b45309", fontWeight: 700 }}>
          Waiting for password recovery session…
        </p>
      ) : (
        <form onSubmit={updatePassword} style={{ marginTop: 18, display: "grid", gap: 10 }}>
          <label style={{ display: "grid", gap: 6, fontWeight: 700 }}>
            New password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e2e8f0" }}
            />
          </label>

          <button
            type="submit"
            disabled={busy || !supabase}
            style={{
              marginTop: 6,
              padding: "12px 16px",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              background: busy ? "#f1f5f9" : "white",
              fontWeight: 800,
              cursor: busy ? "not-allowed" : "pointer"
            }}
          >
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>
      )}

      <div style={{ marginTop: 12, fontSize: 13 }}>
        <Link href="/login" style={{ fontWeight: 800 }}>
          ← Back to login
        </Link>
      </div>

      {ok ? <p style={{ marginTop: 16, color: "#166534", fontWeight: 700 }}>Password updated.</p> : null}
      {error ? (
        <p style={{ marginTop: 16, color: "#b91c1c", fontWeight: 600, whiteSpace: "pre-wrap" }}>{error}</p>
      ) : null}
    </main>
  );
}

