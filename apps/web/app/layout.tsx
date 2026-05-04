import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Sora } from "next/font/google";
import { SiteNav } from "@/components/layout/SiteNav";
import { Onboarding } from "@/components/Onboarding";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#071A2C"
};

export const metadata: Metadata = {
  title: "KangaLearner — Australia Learner Test Practice",
  description:
    "Study Australian road rules by state. Practice learner test questions, take mock tests and track your progress.",
  openGraph: {
    title: "KangaLearner — Australia Learner Test Practice",
    description:
      "Study Australian road rules by state, practice unlimited questions and track your progress.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <SiteNav />
        <Onboarding />
        {children}
      </body>
    </html>
  );
}
