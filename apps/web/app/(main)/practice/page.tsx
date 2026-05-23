import { Suspense } from "react";
import { PracticeClient } from "./PracticeClient";

export const metadata = {
  title: "Practice — KangaLearner"
};

const VALID_MODES = ["all", "wrong", "unanswered", "saved", "sim"] as const;
type Mode = (typeof VALID_MODES)[number];

function toMode(raw: string | undefined): Mode {
  return (VALID_MODES as readonly string[]).includes(raw ?? "") ? (raw as Mode) : "all";
}

type PageSearchParams = Promise<{ mode?: string }>;

export default async function PracticePage({ searchParams }: { searchParams: PageSearchParams }) {
  const { mode: rawMode } = await searchParams;
  const initialMode = toMode(rawMode);
  return (
    <Suspense fallback={<div className="app-page" aria-busy="true" />}>
      <PracticeClient initialMode={initialMode} />
    </Suspense>
  );
}
