import type { Metadata } from "next";
import { ResourcesPageClient } from "./ResourcesPageClient";

export const metadata: Metadata = {
  title: "WA Learner Licence Resources & Official Links",
  description:
    "Official Transport WA links, booking guides, the licence pathway from learner theory to " +
    "PDA, and trusted community resources for new drivers in Perth.",
  alternates: { canonical: "https://kangalearner.com.au/resources" },
  openGraph: {
    title: "WA Learner Licence Resources — KangaLearner",
    description: "The full WA licence pathway plus official links, in one place.",
    url: "https://kangalearner.com.au/resources"
  }
};

export default function ResourcesPage() {
  return <ResourcesPageClient />;
}
