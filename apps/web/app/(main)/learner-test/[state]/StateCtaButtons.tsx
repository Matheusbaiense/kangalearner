"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/contexts/LangContext";
import { SK } from "@/lib/storageKeys";

/**
 * CTA que pre-seleciona o estado antes de navegar.
 * Mesmo mecanismo do SiteNav.changeState(): grava as 2 chaves e dispara o
 * evento kanga:state-changed; PracticeClient/MockTestClient ja escutam.
 */
export function StateCtaButtons({ stateCode }: { stateCode: string }) {
  const router = useRouter();
  const { s } = useLang();

  function go(path: string) {
    try {
      localStorage.setItem(SK.stateV2, stateCode);
      localStorage.setItem(SK.stateLegacy, stateCode);
    } catch {
      /* noop */
    }
    window.dispatchEvent(new CustomEvent("kanga:state-changed", { detail: stateCode }));
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
