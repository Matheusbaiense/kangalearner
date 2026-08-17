import type { Metadata } from "next";
import { LandingClient } from "./LandingClient";
import { bankCountsFor } from "@/lib/stateBankCounts";

export const metadata: Metadata = {
  title: "Pass your Australian learner test | Free practice in EN/PT/ES",
  description:
    "Practice 2000+ real exam-style road-rule questions in English, Portuguese or Spanish. Mock tests with instant feedback, based on official handbooks for WA, NSW, VIC, QLD, SA, ACT and NT.",
  keywords:
    "Australian learner test, learner licence practice, road rules practice, learner driver test, driver knowledge test, prova de learner Austrália, examen learner Australia",
  openGraph: {
    title: "KangaLearner | Pass your Australian learner test",
    description:
      "Practice real road-rule questions in English, Português or Español. Free mock tests with instant feedback, covering WA, NSW, VIC, QLD, SA, ACT and NT.",
    type: "website",
    url: "https://kangalearner.com.au",
    locale: "en_AU",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "KangaLearner, Pass Your Australian Learner Test"
      }
    ]
  }
};

// Contagens reais por estado, resolvidas em build (stateBankCounts e server-only).
const STATE_QUESTION_COUNTS = Object.fromEntries(
  (["WA", "NSW", "VIC", "QLD", "SA", "TAS", "ACT", "NT"] as const).map((code) => [
    code,
    bankCountsFor(code).total
  ])
);

export default function HomePage() {
  return <LandingClient stateCounts={STATE_QUESTION_COUNTS} />;
}
