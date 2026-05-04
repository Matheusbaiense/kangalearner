"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/mock-test", label: "Mock Test" },
  { href: "/progress", label: "Progress" },
  { href: "/resources", label: "Resources" }
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <nav className="nav-shell">
        <Link href="/" className="brand">
          <span className="brand-name">KangaLearner</span>
        </Link>
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
        <div className="nav-actions">
          <Link href="/login" className="btn-nav-login">
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
