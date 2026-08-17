import type { Metadata } from "next";
import { bankCountsFor, bankTotalFor } from "@/lib/stateBankCounts";
import { STATE_TEST_INFO } from "@/lib/stateTestInfo";
import { HubClient } from "./HubClient";

const BASE = "https://kangalearner.com.au";
const TOTAL = bankTotalFor(STATE_TEST_INFO.map((s) => s.code));

// ponytail: sem force-static. O CSP com nonce do middleware exige render por
// request (os scripts de hidratacao precisam do nonce); igual a /learn e /blog.

const DESCRIPTION =
  `${TOTAL} free practice questions across all 8 Australian states and territories. ` +
  "Pick your state on the map and study in English, Portuguese or Spanish.";

export const metadata: Metadata = {
  title: "Australian Learner Practice Tests by State",
  description: DESCRIPTION,
  alternates: { canonical: `${BASE}/learner-test` },
  openGraph: {
    title: "Australian Learner Practice Tests by State",
    description: DESCRIPTION,
    url: `${BASE}/learner-test`,
    type: "website"
  }
};

export default function LearnerTestHubPage() {
  const stateCounts = STATE_TEST_INFO.map((info) => ({
    code: info.code,
    total: bankCountsFor(info.code).total
  }));

  return (
    <main className="app-page">
      <HubClient total={TOTAL} stateCounts={stateCounts} />
    </main>
  );
}
