"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

function LogoMark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0B1D2D" />
      <path
        d="M22 52 C18 45 14 36 16 26 C18 18 24 13 28 10 C30 9 32 9 33 11 C34 13 32 16 30 18 C28 20 27 22 28 26 C29 30 33 32 35 35 C37 38 37 42 35 46 C34 48 32 50 30 52 Z"
        fill="white"
      />
      <path d="M27 20 L30 46" stroke="#0B1D2D" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M30 10 C30 10 33 7 36 8 C38 9 38 12 36 14 C34 15 32 14 30 12 Z" fill="white" />
      <path d="M36 8 C37 5 40 4 41 6 C42 8 40 10 38 10 Z" fill="white" />
      <path d="M12 30 C12 20 18 12 26 10" stroke="#52B788" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M34 44 C38 44 46 46 50 42" stroke="#52B788" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M47 38 L50 42 L45 44" stroke="#52B788" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface NavUser {
  email?: string;
  name?: string;
}

export function SiteNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<NavUser | null>(null);
  const [busy, setBusy] = useState(false);

  const supabase = useMemo(() => {
    try { return createSupabaseBrowserClient(); } catch { return null; }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) { setUser(null); return; }
      setUser({
        email: u.email ?? undefined,
        name: (u.user_metadata?.full_name as string | undefined) ?? (u.user_metadata?.name as string | undefined)
      });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) { setUser(null); return; }
      const u = session.user;
      setUser({
        email: u.email ?? undefined,
        name: (u.user_metadata?.full_name as string | undefined) ?? (u.user_metadata?.name as string | undefined)
      });
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
    window.location.assign("/login");
  }

  const links = [
    { href: "/practice", label: "Practice" },
    { href: "/practice?mode=sim", label: "Mock Test" },
    { href: "/dashboard", label: "Dashboard" }
  ];

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link href="/" className="nav-brand" aria-label="KangaLearner home">
        <span className="nav-logo-mark"><LogoMark /></span>
        <span className="nav-logo-name">KangaLearner</span>
      </Link>

      <div className="nav-links">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link${pathname === l.href.split("?")[0] ? " active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user-email">{user.name ?? user.email}</span>
            <button
              className="btn-nav-signout"
              onClick={signOut}
              disabled={busy}
            >
              {busy ? "…" : "Sign out"}
            </button>
          </>
        ) : (
          <Link href="/login" className="btn-nav-signin">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
