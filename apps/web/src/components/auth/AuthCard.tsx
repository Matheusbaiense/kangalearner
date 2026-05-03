import Link from "next/link";
import type { ReactNode } from "react";

/* Inline SVG so no public/ path dependency */
function LogoMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0B1D2D" />
      {/* Body */}
      <path
        d="M22 52 C18 45 14 36 16 26 C18 18 24 13 28 10 C30 9 32 9 33 11 C34 13 32 16 30 18 C28 20 27 22 28 26 C29 30 33 32 35 35 C37 38 37 42 35 46 C34 48 32 50 30 52 Z"
        fill="white"
      />
      {/* Road stripe */}
      <path
        d="M27 20 L30 46"
        stroke="#0B1D2D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="4 3"
      />
      {/* Head */}
      <path
        d="M30 10 C30 10 33 7 36 8 C38 9 38 12 36 14 C34 15 32 14 30 12 Z"
        fill="white"
      />
      {/* Ear */}
      <path
        d="M36 8 C37 5 40 4 41 6 C42 8 40 10 38 10 Z"
        fill="white"
      />
      {/* Arc */}
      <path
        d="M12 30 C12 20 18 12 26 10"
        stroke="#52B788"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Arrow tail */}
      <path
        d="M34 44 C38 44 46 46 50 42"
        stroke="#52B788"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Arrow head */}
      <path
        d="M47 38 L50 42 L45 44"
        stroke="#52B788"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="auth-bg">
      <Link href="/" className="auth-brand" aria-label="KangaLearner home">
        <span className="auth-logo-mark">
          <LogoMark />
        </span>
        <span className="auth-logo-name">KangaLearner</span>
      </Link>

      <div className="auth-card">
        <h1 className="auth-card-title">{title}</h1>
        {subtitle && <p className="auth-card-sub">{subtitle}</p>}
        {children}
      </div>

      <p className="auth-tagline">
        Official road rules · Up to date · Trusted by learner drivers Australia-wide
      </p>
    </div>
  );
}
