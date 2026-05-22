import type { Metadata } from "next";
import { LandingClient } from "./LandingClient";

export const metadata: Metadata = {
  title: "KangaLearner — Pass your WA learner test | Free practice in EN/PT/ES",
  description:
    "Practice real Western Australia road-rule questions in English, Portuguese or Spanish. 200+ questions, 30-question mock test, instant feedback. Free forever.",
  keywords:
    "WA learner test, Western Australia learner licence, road rules practice, learner driver test, driver knowledge test, prova de learner WA, examen learner WA",
  openGraph: {
    title: "KangaLearner — Pass your WA learner test",
    description:
      "Practice real WA road-rule questions in English, Português or Español. Free mock tests with instant feedback.",
    type: "website",
    locale: "en_AU",
  },
};

export default function HomePage() {
  return <LandingClient />;
}
