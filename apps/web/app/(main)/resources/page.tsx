import type { Metadata } from "next";
import { ResourcesPageClient } from "./ResourcesPageClient";

export const metadata: Metadata = {
  title: "Learner Licence Resources & Official Links",
  description:
    "Official licensing links, supervised-hours rules and the learner-to-Ps pathway for every " +
    "Australian state and territory, matched to the state you select.",
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
