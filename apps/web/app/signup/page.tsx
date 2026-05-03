"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";

export default function SignupPage() {
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

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}/account` }
    });
    if (error) {
      setError(error.message);
    } else {
      window.location.assign(next);
    }
    setBusy(false);
  }

  return (
    <main style={{ padding: 32, fontFamily: "Inter, sans-serif", maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Create account</h1>
      <p style={{ color: "#475569" }}>Create an account using email & password.</p>

      <form onSubmit={signUp} style={{ marginTop: 18, display: "grid", gap: 10 }}>
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
          {busy ? "Creating…" : "Create account"}
        </button>

        <div style={{ marginTop: 6, fontSize: 13 }}>
          <Link href={`/login?next=${encodeURIComponent(next)}`} style={{ fontWeight: 800 }}>
            ← Back to login
          </Link>
        </div>
      </form>

      {error ? (
        <p style={{ marginTop: 16, color: "#b91c1c", fontWeight: 600, whiteSpace: "pre-wrap" }}>{error}</p>
      ) : null}
    </main>
  );
}

