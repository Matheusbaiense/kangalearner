import type { Metadata } from "next";
import { LandingClient } from "./LandingClient";
import { bankCountsFor } from "@/lib/stateBankCounts";
import { AdSlot } from "@/features/ads";

export const metadata: Metadata = {
  title: "Pass your Australian learner test | Free practice in EN/PT/ES",
  description:
    "Practice 2000+ real exam-style road-rule questions in English, Portuguese or Spanish. 30-question mock tests with instant feedback, from the official handbook of all 8 states and territories. Free to study.",
  keywords:
    "Australian learner test, learner licence practice, road rules practice, learner driver test, driver knowledge test, prova de learner Austrália, examen learner Australia",
  openGraph: {
    title: "KangaLearner | Pass your Australian learner test",
    description:
      "Practice real road-rule questions in English, Português or Español. Free mock tests with instant feedback, for all 8 Australian states and territories.",
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
  return (
    <LandingClient
      stateCounts={STATE_QUESTION_COUNTS}
      homeTopAd={<AdSlot slotId="home_top" />}
    />
  );
}
