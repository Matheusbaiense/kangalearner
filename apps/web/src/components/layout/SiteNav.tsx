"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/contexts/LangContext";
import { FlagImg } from "@/components/ui/FlagImg";
import { SK } from "@/lib/storageKeys";

const NAV_LINKS = [
  { href: "/", key: "home", exact: true },
  { href: "/learn", key: "learn" },
  { href: "/practice", key: "practice" },
  { href: "/mock-test", key: "mockTest" },
  { href: "/progress", key: "progress", requiresAuth: true },
  { href: "/resources", key: "resources" },
] as const;

const AU_STATES = [
  { code: "WA", name: "Western Australia" },
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" }
];

const LANGUAGES = [
  { code: "en",    country: "au", label: "English",         triggerLabel: "English",    bilingual: false },
  { code: "pt",    country: "br", label: "Português",       triggerLabel: "Português",  bilingual: false },
  { code: "pt-en", country: "br", label: "Bilingue PT·EN",  triggerLabel: "PT·EN",      bilingual: true  },
  { code: "es",    country: "es", label: "Español",         triggerLabel: "Español",    bilingual: false },
  { code: "es-en", country: "es", label: "Bilingüe ES·EN",  triggerLabel: "ES·EN",      bilingual: true  },
] as const;

interface NavUser {
  email: string;
  name: string;
  initials: string;
  role: string;
  avatarUrl: string | null;
}

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

export function SiteNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang, setLang, s } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<NavUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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

  // Auth state
  useEffect(() => {
    const supabase = createClient();

    async function buildNavUser(u: { id: string; email?: string; user_metadata?: Record<string, unknown> }) {
      const name =
        (u.user_metadata?.full_name as string | undefined) ||
        (u.user_metadata?.name as string | undefined) ||
        "";
      const { data: profile } = await supabase
        .from("profiles").select("role, avatar_url").eq("id", u.id).single();
      setUser({
        email: u.email ?? "",
        name,
        initials: getInitials(name, u.email ?? ""),
        role: profile?.role ?? "free",
        avatarUrl: (profile?.avatar_url as string | null) ?? null,
      });
    }

    async function loadUser() {
      try {
        const { data: { user: u } } = await supabase.auth.getUser();
        if (u) await buildNavUser(u);
      } finally {
        setAuthLoading(false);
      }
    }
    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setAuthLoading(false);
      if (session?.user) {
        await buildNavUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
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

        {/* Nav links */}
        <ul className="main-nav" role="list">
          {NAV_LINKS.map((link) => {
            const needsAuth = "requiresAuth" in link && link.requiresAuth;
            if (needsAuth && !authLoading && !user) return null;
            const isActive = "exact" in link && link.exact
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
                window.dispatchEvent(new CustomEvent("kanga:state-changed"));
                router.refresh();
              }}
            >
              {AU_STATES.map((s) => (
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
                <span className="lang-bilingual-badge" aria-hidden="true">EN</span>
              )}
              <span className="lang-arrow" aria-hidden="true">▼</span>
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
              >
                <span className="user-avatar" aria-hidden="true">
                  {user.avatarUrl
                    ? <img src={user.avatarUrl} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                    : user.initials}
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
                <button className="user-panel-item danger" role="menuitem" onClick={handleSignOut}>
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
  );
}
