"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Supabase client error");
      return null;
    }
  }, []);

  async function signInWithGoogle() {
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      }
    });
    if (error) setError(error.message);
    setBusy(false);
  }

  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });
    if (error) setError(error.message);
    else window.location.assign(next);
    setBusy(false);
  }

  return (
    <main style={{ padding: 32, fontFamily: "Inter, sans-serif", maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Login</h1>
      <p style={{ color: "#475569" }}>
        Sign in to sync your progress across devices. We support Google login via Supabase.
      </p>

      <button
        onClick={signInWithGoogle}
        disabled={busy || !supabase}
        style={{
          marginTop: 16,
          padding: "12px 16px",
          borderRadius: 10,
          border: "1px solid #e2e8f0",
          background: busy ? "#f1f5f9" : "white",
          fontWeight: 800,
          cursor: busy ? "not-allowed" : "pointer"
        }}
      >
        {busy ? "Redirecting…" : "Continue with Google"}
      </button>

      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ height: 1, background: "#e2e8f0", flex: 1 }} />
        <span style={{ fontSize: 12, color: "#64748b" }}>or</span>
        <div style={{ height: 1, background: "#e2e8f0", flex: 1 }} />
      </div>

      <form onSubmit={signInWithPassword} style={{ marginTop: 18, display: "grid", gap: 10 }}>
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
        <label style={{ display: "grid", gap: 6, fontWeight: 700 }}>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
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
          {busy ? "Signing in…" : "Sign in with email"}
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 13 }}>
          <Link href={`/signup?next=${encodeURIComponent(next)}`} style={{ fontWeight: 800 }}>
            Create account →
          </Link>
          <Link href="/forgot-password" style={{ fontWeight: 700, color: "#475569" }}>
            Forgot password?
          </Link>
        </div>
      </form>

      {error ? (
        <p style={{ marginTop: 16, color: "#b91c1c", fontWeight: 600, whiteSpace: "pre-wrap" }}>{error}</p>
      ) : null}

      <p style={{ marginTop: 18, color: "#64748b", fontSize: 12 }}>
        Note: don’t put secrets in GitHub. Only the public Supabase URL and anon key go into{" "}
        <code>apps/web/.env.local</code>.
      </p>
    </main>
  );
}

