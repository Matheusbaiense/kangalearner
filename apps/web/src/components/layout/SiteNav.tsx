"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/contexts/LangContext";
import { FlagImg } from "@/components/ui/FlagImg";
import { SK } from "@/lib/storageKeys";
import { AU_STATE_OPTIONS } from "@kanga/core";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/", key: "home", exact: true },
  { href: "/learn", key: "learn" },
  { href: "/practice", key: "practice" },
  { href: "/mock-test", key: "mockTest" },
  { href: "/progress", key: "progress", requiresAuth: true },
  { href: "/dashboard", key: "dashboard", requiresAuth: true },
  { href: "/resources", key: "resources" }
] as const;

const LANGUAGES = [
  { code: "en", country: "au", label: "English", triggerLabel: "English", bilingual: false },
  { code: "pt", country: "br", label: "Português", triggerLabel: "Português", bilingual: false },
  { code: "pt-en", country: "br", label: "Bilingue PT·EN", triggerLabel: "PT·EN", bilingual: true },
  { code: "es", country: "es", label: "Español", triggerLabel: "Español", bilingual: false },
  { code: "es-en", country: "es", label: "Bilingüe ES·EN", triggerLabel: "ES·EN", bilingual: true }
] as const;

interface NavUser {
  email: string;
  name: string;
  initials: string;
  role: string;
  avatarUrl: string | null;
}

/** Serializable user data passed from the Server Component layout. */
export type InitialNavUser = NavUser;

function getInitials(name: string, email: string): string {
  const src = name || email;
  const parts = src.split(/[\s@]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

function readStoredState(): string {
  try {
    return localStorage.getItem(SK.stateV2) ?? localStorage.getItem(SK.stateLegacy) ?? "WA";
  } catch {
    return "WA";
  }
}

interface SiteNavProps {
  /** Pre-fetched user from the server component layout — eliminates client-side auth race condition. */
  initialNavUser?: InitialNavUser | null;
}

export function SiteNav({ initialNavUser }: SiteNavProps = {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang, setLang, s } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<NavUser | null>(initialNavUser ?? null);
  const [authLoading, setAuthLoading] = useState(!initialNavUser);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Deterministic SSR value ("WA"); the persisted state is hydrated by the effect
  // below. Reading localStorage in the initializer diverges the first client render
  // from the server HTML → React hydration error #418 (aborts hydration, breaks
  // every nav handler — logout, user menu, lang dropdown).
  const [stateCode, setStateCode] = useState<string>("WA");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setStateCode(readStoredState());
    const handler = () => setStateCode(readStoredState());
    window.addEventListener("kanga:state-changed", handler);
    return () => window.removeEventListener("kanga:state-changed", handler);
  }, []);

  // Close lang dropdown on outside click (mouse + touch)
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: Event) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [langOpen]);

  // Close user menu on outside click (mouse + touch)
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: Event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [userMenuOpen]);

  // Close mobile nav on Escape
  useEffect(() => {
    if (!mobileNavOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileNavOpen]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  // Auth state — initialNavUser (server-fetched) is the primary source for the first render.
  // onAuthStateChange handles subsequent events: SIGNED_IN (after login), SIGNED_OUT, TOKEN_REFRESHED.
  //
  // The server layout pre-fetches the user via supabase.auth.getUser() so the nav renders
  // correctly without waiting for any client-side event. The getSession() recovery below is
  // kept as a fallback for cases where the layout could not fetch the user (env not configured,
  // or the subscription fires before initialNavUser is set on a fresh tab).
  useEffect(() => {
    let supabase: ReturnType<typeof createClient> | null = null;
    try {
      supabase = createClient();
    } catch {
      setAuthLoading(false);
      return;
    }

    async function buildNavUser(u: {
      id: string;
      email?: string;
      user_metadata?: Record<string, unknown>;
    }) {
      const name =
        (u.user_metadata?.full_name as string | undefined) ||
        (u.user_metadata?.name as string | undefined) ||
        "";
      const { data: profile } = await supabase!
        .from("profiles")
        .select("role, avatar_url")
        .eq("id", u.id)
        .maybeSingle();
      setUser({
        email: u.email ?? "",
        name,
        initials: getInitials(name, u.email ?? ""),
        role: profile?.role ?? "free",
        avatarUrl: (profile?.avatar_url as string | null) ?? null
      });
    }

    // Safety fallback: if the subscription never resolves (e.g. corporate network
    // blocking Supabase), unblock the nav after 4 s instead of staying frozen.
    const fallbackTimer = setTimeout(() => setAuthLoading(false), 4000);

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // IMPORTANT: Supabase invokes this callback while holding the GoTrue auth lock
      // (Web Locks API, "lock:sb-<ref>-auth-token"). Calling any other auth/data method
      // (getSession, .from(), getUser) synchronously inside the callback re-acquires the
      // same exclusive lock and deadlocks — the lock is never released, freezing every
      // subsequent auth call across the entire app. Defer all async work to a macrotask so
      // the lock is released before we touch Supabase again.
      setTimeout(async () => {
        if (session?.user) {
          await buildNavUser(session.user);
        } else if (event === "SIGNED_OUT") {
          // Explicit sign-out — always clear regardless of initial state.
          setUser(null);
        } else {
          // INITIAL_SESSION or TOKEN_REFRESHED fired with no session. This can happen when the
          // browser client reads stale / mismatched cookies. Try getSession() as recovery first.
          const { data: recovered } = await supabase!.auth.getSession();
          if (recovered.session?.user) {
            await buildNavUser(recovered.session.user);
          } else if (!initialNavUser) {
            // Only clear if the server layout also had no user — don't override a server-confirmed
            // logged-in state with a potentially buggy client-side event.
            setUser(null);
          }
        }
        clearTimeout(fallbackTimer);
        setAuthLoading(false);
      }, 0);
    });

    return () => {
      clearTimeout(fallbackTimer);
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    setUserMenuOpen(false);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      /* ignore — force navigation below regardless */
    }
    window.location.assign("/");
  }

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <nav className="nav-shell" aria-label="Main navigation">
          {/* Brand */}
          <Link href="/" className="brand" aria-label="KangaLearner home">
            <Image
              src="/brand/logo-nav.svg"
              alt="KangaLearner"
              width={120}
              height={30}
              className="brand-logo"
              priority
            />
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>

          {/* Nav links */}
          <ul className="main-nav" role="list">
            {NAV_LINKS.map((link) => {
              const needsAuth = "requiresAuth" in link && link.requiresAuth;
              if (needsAuth && !authLoading && !user) return null;
              const isActive =
                "exact" in link && link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link href={link.href} className={isActive ? "nav-link active" : "nav-link"}>
                    {s[link.key]}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="nav-controls">
            {/* State selector */}
            <label className="state-control" aria-label="Select state">
              <Image src="/icons/map.svg" alt="" width={16} height={16} aria-hidden="true" />
              <select
                className="state-select"
                value={stateCode}
                onChange={(e) => {
                  const code = e.target.value;
                  try {
                    localStorage.setItem(SK.stateV2, code);
                    localStorage.setItem(SK.stateLegacy, code);
                  } catch {}
                  setStateCode(code);
                  window.dispatchEvent(new CustomEvent("kanga:state-changed", { detail: code }));
                  router.refresh();
                }}
              >
                {AU_STATE_OPTIONS.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code}
                  </option>
                ))}
              </select>
            </label>

            {/* Language selector */}
            <div className={`lang-control${langOpen ? " open" : ""}`} ref={langRef}>
              <button
                className="lang-trigger"
                onClick={() => setLangOpen((o) => !o)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label={s.language}
              >
                <FlagImg country={currentLang.country} size={20} />
                <span className="lang-label">{currentLang.triggerLabel}</span>
                {currentLang.bilingual && (
                  <span className="lang-bilingual-badge" aria-hidden="true">
                    EN
                  </span>
                )}
                <span className="lang-arrow" aria-hidden="true">
                  ▼
                </span>
              </button>
              <div className="lang-panel" role="listbox" aria-label={s.language}>
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    className={`lang-option${lang === l.code ? " active" : ""}${l.bilingual ? " lang-option--bilingual" : ""}`}
                    role="option"
                    aria-selected={lang === l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                  >
                    <FlagImg country={l.country} size={20} />
                    <span style={{ flex: 1 }}>{l.label}</span>
                    {l.bilingual && <span className="lang-bilingual-badge">EN</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Auth — hidden while session check is pending to prevent race-condition redirect */}
            {authLoading ? (
              <div style={{ width: 72, height: 36 }} aria-hidden="true" />
            ) : user ? (
              <div className={`user-menu${userMenuOpen ? " open" : ""}`} ref={userMenuRef}>
                <button
                  className="user-trigger"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  aria-label={s.account}
                  title={s.account}
                >
                  <span className="user-avatar" aria-hidden="true">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />
                    ) : (
                      user.initials
                    )}
                  </span>
                  <span className="user-trigger-name" aria-hidden="true">
                    {(user.name || user.email).split(/[\s@]/)[0]}
                  </span>
                  <span className="user-trigger-chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>
                <div className="user-panel" role="menu">
                  <div className="user-panel-header">
                    <div className="user-panel-name">{user.name || user.email.split("@")[0]}</div>
                    <div className="user-panel-email">{user.email}</div>
                  </div>
                  <Link
                    href="/"
                    className="user-panel-item"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {s.home}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="user-panel-item"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {s.dashboard}
                  </Link>
                  <Link
                    href="/account"
                    className="user-panel-item"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {s.settings}
                  </Link>
                  <Link
                    href="/resources"
                    className="user-panel-item"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {s.help}
                  </Link>
                  {["admin", "super_admin"].includes(user.role) && (
                    <>
                      <div className="user-panel-divider" role="separator" />
                      <Link
                        href="/admin"
                        className="user-panel-item admin-link"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        ⚡ Admin Dashboard
                      </Link>
                    </>
                  )}
                  <div className="user-panel-divider" role="separator" />
                  <button
                    className="user-panel-item danger"
                    role="menuitem"
                    onClick={handleSignOut}
                  >
                    {s.signOut}
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-nav-login">
                {s.signIn}
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <>
          {/* Backdrop */}
          <div
            className="mobile-nav-backdrop"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <nav id="mobile-nav-drawer" className="mobile-nav-drawer" aria-label="Mobile navigation">
            <div className="mobile-nav-header">
              <span className="mobile-nav-title">KangaLearner</span>
              <button
                className="mobile-nav-close"
                type="button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            {/* User identity block — shown when logged in */}
            {!authLoading && user && (
              <div className="mobile-nav-user">
                <div className="mobile-nav-user-info">
                  <div className="nav-avatar" aria-hidden="true">
                    {user.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt=""
                        width={36}
                        height={36}
                        className="nav-avatar-img"
                      />
                    ) : (
                      <span className="nav-avatar-initials">{user.initials}</span>
                    )}
                  </div>
                  <div className="mobile-nav-user-text">
                    <span className="mobile-nav-user-name">
                      {user.name || user.email.split("@")[0]}
                    </span>
                    <span className="mobile-nav-user-email">{user.email}</span>
                  </div>
                </div>
                <button
                  className="mobile-nav-signout"
                  onClick={() => {
                    void handleSignOut();
                    setMobileNavOpen(false);
                  }}
                >
                  {s.signOut}
                </button>
              </div>
            )}
            <ul role="list">
              {NAV_LINKS.map((link) => {
                const needsAuth = "requiresAuth" in link && link.requiresAuth;
                if (needsAuth && !authLoading && !user) return null;
                const isActive =
                  "exact" in link && link.exact
                    ? pathname === link.href
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={isActive ? "mobile-nav-link active" : "mobile-nav-link"}
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {s[link.key]}
                    </Link>
                  </li>
                );
              })}
              {!authLoading && user && (
                <li>
                  <Link
                    href="/account"
                    className={
                      pathname === "/account" ? "mobile-nav-link active" : "mobile-nav-link"
                    }
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {s.settings}
                  </Link>
                </li>
              )}
              {!authLoading && !user && (
                <li>
                  <Link
                    href="/auth/login"
                    className="mobile-nav-link mobile-nav-signin"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {s.signIn}
                  </Link>
                </li>
              )}
            </ul>

            <div className="mobile-nav-language" aria-label={s.language}>
              <span className="mobile-nav-section-label">{s.language}</span>
              <div className="mobile-lang-options">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    className={`mobile-lang-option${lang === l.code ? " active" : ""}`}
                    type="button"
                    aria-pressed={lang === l.code}
                    onClick={() => {
                      setLang(l.code);
                      setMobileNavOpen(false);
                    }}
                  >
                    <FlagImg country={l.country} size={20} />
                    <span>{l.triggerLabel}</span>
                    {l.bilingual && <span className="lang-bilingual-badge">EN</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-nav-state">
              <span className="mobile-nav-section-label">State</span>
              <label className="state-control" aria-label="Select state">
                <Image src="/icons/map.svg" alt="" width={16} height={16} aria-hidden="true" />
                <select
                  className="state-select"
                  value={stateCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    try {
                      localStorage.setItem(SK.stateV2, code);
                      localStorage.setItem(SK.stateLegacy, code);
                    } catch {
                      /* noop */
                    }
                    setStateCode(code);
                    window.dispatchEvent(new CustomEvent("kanga:state-changed", { detail: code }));
                    router.refresh();
                    setMobileNavOpen(false);
                  }}
                >
                  {AU_STATE_OPTIONS.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.code} — {st.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
