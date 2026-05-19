import { Suspense } from "react";
import { PracticeClient } from "./PracticeClient";

export const metadata = {
  title: "Practice — KangaLearner"
};

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="app-page" aria-busy="true" />}>
      <PracticeClient />
    </Suspense>
  );
}
