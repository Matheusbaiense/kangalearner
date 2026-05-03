"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Supabase client error");
      return null;
    }
  }, []);

  async function sendReset(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    setOk(false);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) setError(error.message);
    else setOk(true);
    setBusy(false);
  }

  return (
    <main style={{ padding: 32, fontFamily: "Inter, sans-serif", maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Reset password</h1>
      <p style={{ color: "#475569" }}>
        Enter your email and we’ll send you a password reset link.
      </p>

      <form onSubmit={sendReset} style={{ marginTop: 18, display: "grid", gap: 10 }}>
        <label style={{ display: "grid", gap: 6, fontWeight: 700 }}>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
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
          {busy ? "Sending…" : "Send reset link"}
        </button>
        <div style={{ marginTop: 6, fontSize: 13 }}>
          <Link href="/login" style={{ fontWeight: 800 }}>
            ← Back to login
          </Link>
        </div>
      </form>

      {ok ? <p style={{ marginTop: 16, color: "#166534", fontWeight: 700 }}>Email sent.</p> : null}
      {error ? (
        <p style={{ marginTop: 16, color: "#b91c1c", fontWeight: 600, whiteSpace: "pre-wrap" }}>{error}</p>
      ) : null}
    </main>
  );
}

