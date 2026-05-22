import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Nunito, Sora } from "next/font/google";
import { LangProvider } from "@/contexts/LangContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--kl-font-body",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--kl-font-heading",
  display: "swap"
});

export const viewport: Viewport = { themeColor: "#071A2C" };

export const metadata: Metadata = {
  title: "KangaLearner — Australia Learner Test Practice",
  description:
    "Study Australian road rules by state. Practice learner test questions, take mock tests and track your progress.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.svg",
    apple: "/icon-192.png"
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
    <html lang="en" className={`${nunito.variable} ${sora.variable}`} suppressHydrationWarning>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
