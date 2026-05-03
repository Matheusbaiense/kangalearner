"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";

type UserInfo = {
  email?: string;
  name?: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        setError(error.message);
        return;
      }
      const u = data.user;
      if (!u) {
        setUser(null);
        return;
      }
      setUser({
        email: u.email ?? undefined,
        name: (u.user_metadata?.full_name as string | undefined) ?? (u.user_metadata?.name as string | undefined)
      });
    });
  }, [supabase]);

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
    setBusy(false);
    setUser(null);
  }

  return (
    <main style={{ padding: 32, fontFamily: "Inter, sans-serif", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Account</h1>
      {error ? (
        <p style={{ marginTop: 12, color: "#b91c1c", fontWeight: 600, whiteSpace: "pre-wrap" }}>{error}</p>
      ) : null}

      {!user ? (
        <>
          <p style={{ marginTop: 12, color: "#475569" }}>You are not signed in.</p>
          <Link href="/login" style={{ display: "inline-block", marginTop: 12, fontWeight: 800 }}>
            Go to login →
          </Link>
        </>
      ) : (
        <>
          <p style={{ marginTop: 12, color: "#475569" }}>
            Signed in as <strong>{user.email ?? "unknown"}</strong>
            {user.name ? <> ({user.name})</> : null}
          </p>
          <button
            onClick={signOut}
            disabled={busy}
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              background: busy ? "#f1f5f9" : "white",
              fontWeight: 800,
              cursor: busy ? "not-allowed" : "pointer"
            }}
          >
            {busy ? "Signing out…" : "Sign out"}
          </button>
        </>
      )}
    </main>
  );
}

