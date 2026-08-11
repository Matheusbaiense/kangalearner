import type { Metadata } from "next";
import { LandingClient } from "./LandingClient";

export const metadata: Metadata = {
  title: "KangaLearner | Pass your WA learner test | Free practice in EN/PT/ES",
  description:
    "Practice real Western Australia road-rule questions in English, Portuguese or Spanish. Growing question bank with 30-question mock tests and instant feedback. Free forever.",
  keywords:
    "WA learner test, Western Australia learner licence, road rules practice, learner driver test, driver knowledge test, prova de learner WA, examen learner WA",
  openGraph: {
    title: "KangaLearner | Pass your WA learner test",
    description:
      "Practice real WA road-rule questions in English, Português or Español. Free mock tests with instant feedback.",
    type: "website",
    url: "https://kangalearner.com.au",
    locale: "en_AU",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "KangaLearner, Pass Your WA Learner Test"
      }
    ]
  }
};

export default function HomePage() {
  return <LandingClient />;
}
