import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Manrope, Space_Grotesk } from "next/font/google";
import { SiteNav } from "@/components/layout/SiteNav";
import { Footer } from "@/components/layout/Footer";
import { Onboarding } from "@/components/Onboarding";
import { LangProvider } from "@/contexts/LangContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#071A2C"
};

export const metadata: Metadata = {
  title: "KangaLearner — Australia Learner Test Practice",
  description:
    "Study Australian road rules by state. Practice learner test questions, take mock tests and track your progress.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png",    type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png",type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png",type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "KangaLearner — Australia Learner Test Practice",
    description:
      "Study Australian road rules by state, practice unlimited questions and track your progress.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <LangProvider>
          <Suspense fallback={<header style={{ height: 60 }} aria-hidden="true" />}>
            <SiteNav />
          </Suspense>
          <Onboarding />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
