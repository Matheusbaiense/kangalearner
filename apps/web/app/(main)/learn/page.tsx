import type { Metadata } from "next";
import { LearnPageClient } from "./LearnPageClient";

export const metadata: Metadata = {
  title: "Learn WA Road Rules, Signs, Speed Limits & More",
  description:
    "Browse 20 WA learner test topics: road signs, speed limits, give way rules, roundabouts, " +
    "alcohol laws and more. Explanations in English, Portuguese and Spanish.",
  alternates: { canonical: "https://kangalearner.com.au/learn" },
  openGraph: {
    title: "Learn Australian Road Rules",
    description:
      "Every WA learner test topic explained in plain language, in English, Portuguese and Spanish.",
    url: "https://kangalearner.com.au/learn"
  }
};

export default function LearnPage() {
  return <LearnPageClient />;
}
