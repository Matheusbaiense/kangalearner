import type { Metadata } from "next";
import { MockTestClient } from "./MockTestClient";

export const metadata: Metadata = {
  title: "Free WA Learner Mock Test — 30 Questions, Real Format",
  description:
    "Take a free 30-question WA learner licence mock test in practice or exam mode. Same " +
    "format as the official DoT test. Available in English, Portuguese and Spanish.",
  alternates: { canonical: "https://kangalearner.com.au/mock-test" },
  openGraph: {
    title: "Free WA Learner Mock Test — KangaLearner",
    description: "30 questions, same format as the real DoT test. Practice or exam mode.",
    url: "https://kangalearner.com.au/mock-test"
  }
};

export default function MockTestPage() {
  return <MockTestClient />;
}
