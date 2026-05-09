"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/mock-test", label: "Mock Test" },
  { href: "/progress", label: "Progress" },
  { href: "/resources", label: "Resources" }
];

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
  { code: "en", flag: "🇦🇺", label: "English" },
  { code: "pt", flag: "🇧🇷", label: "Português" },
  { code: "es", flag: "🇪🇸", label: "Español" }
];

interface NavUser {
  email: string;
  name: string;
  initials: string;
}

function getInitials(name: string, email: string): string {
  const src = name || email;
  const parts = src.split(/[\s@]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<NavUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  // Auth state
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (u) {
        const name =
          (u.user_metadata?.full_name as string | undefined) ||
          (u.user_metadata?.name as string | undefined) ||
          "";
        setUser({ email: u.email ?? "", name, initials: getInitials(name, u.email ?? "") });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        const name =
          (u.user_metadata?.full_name as string | undefined) ||
          (u.user_metadata?.name as string | undefined) ||
          "";
        setUser({ email: u.email ?? "", name, initials: getInitials(name, u.email ?? "") });
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

  const currentLang = LANGUAGES.find((l) => l.code === activeLang) ?? LANGUAGES[0];

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        {/* Brand */}
        <Link href="/" className="brand" aria-label="KangaLearner home">
          <Image
            src="/brand/logo-mark.svg"
            alt="KangaLearner kangaroo logo"
            width={32}
            height={32}
            className="brand-logo"
            priority
          />
          <span className="brand-name">KangaLearner</span>
        </Link>

        {/* Nav links */}
        <ul className="main-nav" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname.startsWith(link.href) ? "nav-link active" : "nav-link"}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="nav-controls">
          {/* State selector */}
          <label className="state-control" aria-label="Select state">
            <Image src="/icons/map.svg" alt="" width={16} height={16} aria-hidden="true" />
            <select className="state-select" defaultValue="WA">
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
              aria-label="Select language"
            >
              <span aria-hidden="true">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <span className="lang-arrow" aria-hidden="true">▼</span>
            </button>
            <div className="lang-panel" role="listbox" aria-label="Language options">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option${activeLang === lang.code ? " active" : ""}`}
                  role="option"
                  aria-selected={activeLang === lang.code}
                  onClick={() => {
                    setActiveLang(lang.code);
                    setLangOpen(false);
                  }}
                >
                  <span aria-hidden="true">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auth */}
          {user ? (
            <div className={`user-menu${userMenuOpen ? " open" : ""}`} ref={userMenuRef}>
              <button
                className="user-trigger"
                onClick={() => setUserMenuOpen((o) => !o)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-label="Account menu"
              >
                <span className="user-avatar" aria-hidden="true">
                  {user.initials}
                </span>
              </button>
              <div className="user-panel" role="menu">
                <div className="user-panel-email">{user.email}</div>
                <Link
                  href="/dashboard"
                  className="user-panel-item"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button className="user-panel-item danger" role="menuitem" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/auth/login" className="btn-nav-login">
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
