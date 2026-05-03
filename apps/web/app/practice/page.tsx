import { SiteNav } from "../../src/components/layout/SiteNav";
import { PracticeClient } from "./PracticeClient";

export const metadata = {
  title: "Practice — KangaLearner"
};

export default function PracticePage() {
  return (
    <>
      <SiteNav />
      <PracticeClient />
    </>
  );
}
