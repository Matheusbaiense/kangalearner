import type { Metadata } from "next";
import { LearnPageClient } from "./LearnPageClient";
import { AdSlot } from "@/features/ads";

export const metadata: Metadata = {
  title: "Learn Australian Road Rules, Signs, Speed Limits & More",
  description:
    "Browse 20 learner test topics for every Australian state: road signs, speed limits, give way " +
    "rules, roundabouts, alcohol laws and more. Explanations in English, Portuguese and Spanish.",
  alternates: { canonical: "https://kangalearner.com.au/learn" },
  openGraph: {
    title: "Learn Australian Road Rules",
    description:
      "Every WA learner test topic explained in plain language, in English, Portuguese and Spanish.",
    url: "https://kangalearner.com.au/learn"
  }
};

export default function LearnPage() {
  return <LearnPageClient learnInlineAd={<AdSlot slotId="learn_inline" />} />;
}
