import { redirect } from "next/navigation";
import { PracticeClient } from "./PracticeClient";

export const metadata = {
  title: "Practice",
  alternates: { canonical: "https://kangalearner.com.au/practice" }
};

// "sim" is intentionally NOT a practice mode, the mock test lives at
// /mock-test; the redirect below keeps old ?mode=sim links working.
const VALID_MODES = ["all", "wrong", "unanswered", "saved"] as const;
type Mode = (typeof VALID_MODES)[number];

function toMode(raw: string | undefined): Mode {
  return (VALID_MODES as readonly string[]).includes(raw ?? "") ? (raw as Mode) : "all";
}

type PageSearchParams = Promise<{ mode?: string }>;

export default async function PracticePage({ searchParams }: { searchParams: PageSearchParams }) {
  const { mode: rawMode } = await searchParams;
  const initialMode = toMode(rawMode);

  if (rawMode === "sim") {
    redirect("/mock-test");
  }

  return <PracticeClient initialMode={initialMode} />;
}
