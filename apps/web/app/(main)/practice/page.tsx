import { redirect } from "next/navigation";
import { PracticeClient } from "./PracticeClient";
import { parsePracticeCat, parsePracticeMode } from "@/lib/practiceCat";

export const metadata = {
  title: "Practice",
  alternates: { canonical: "https://kangalearner.com.au/practice" }
};

type PageSearchParams = Promise<{ mode?: string; cat?: string; category?: string }>;

export default async function PracticePage({ searchParams }: { searchParams: PageSearchParams }) {
  const { mode: rawMode, cat: rawCat, category: rawCategory } = await searchParams;
  const initialMode = parsePracticeMode(rawMode);
  const initialCat = parsePracticeCat(rawCat, rawCategory);

  if (rawMode === "sim") {
    redirect("/mock-test");
  }

  return <PracticeClient initialMode={initialMode} initialCat={initialCat} />;
}
