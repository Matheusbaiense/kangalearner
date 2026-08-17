import type { Metadata } from "next";
import { MockTestClient } from "./MockTestClient";

export const metadata: Metadata = {
  title: "Free Australian Learner Mock Test, 30 Questions",
  description:
    "Take a free 30-question learner licence mock test in practice or exam mode, with real " +
    "questions from all 8 Australian states and territories. In English, Portuguese and Spanish.",
  alternates: { canonical: "https://kangalearner.com.au/mock-test" },
  openGraph: {
    title: "Free Australian Learner Mock Test",
    description: "30 real questions from your state's bank. Practice or exam mode.",
    url: "https://kangalearner.com.au/mock-test"
  }
};

export default function MockTestPage() {
  return <MockTestClient />;
}
