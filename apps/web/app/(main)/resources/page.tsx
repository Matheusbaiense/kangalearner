import type { Metadata } from "next";
import { ResourcesPageClient } from "./ResourcesPageClient";

export const metadata: Metadata = {
  title: "Learner Licence Resources & Official Links",
  description:
    "Official Transport WA links, booking guides, the licence pathway from learner theory to " +
    "PDA, and trusted community resources for new drivers. Currently covers WA, other states coming soon.",
  alternates: { canonical: "https://kangalearner.com.au/resources" },
  openGraph: {
    title: "Learner Licence Resources",
    description: "The full licence pathway plus official links, in one place.",
    url: "https://kangalearner.com.au/resources"
  }
};

export default function ResourcesPage() {
  return <ResourcesPageClient />;
}
