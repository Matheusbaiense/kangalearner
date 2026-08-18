"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/contexts/LangContext";
import { persistStoredState } from "@/lib/stateSelection";

/** CTA that selects the jurisdiction before navigating to practice/mock. */
export function StateCtaButtons({ stateCode }: { stateCode: string }) {
  const router = useRouter();
  const { s } = useLang();

  function go(path: string) {
    persistStoredState(stateCode);
    router.push(path);
  }

  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <button type="button" className="btn btn-primary" onClick={() => go("/practice")}>
        {s.stateCtaPractice.replace("{state}", stateCode)}
      </button>
      <button type="button" className="btn btn-outline" onClick={() => go("/mock-test")}>
        {s.stateCtaMock.replace("{state}", stateCode)}
      </button>
    </div>
  );
}
