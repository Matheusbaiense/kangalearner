"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLang } from "@/contexts/LangContext";
import { AU_STATE_OPTIONS, type AuStateCode } from "./state-options";

export function StateProgressSelector({ selectedState }: { selectedState: AuStateCode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { s } = useLang();

  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontSize: ".78rem",
        fontWeight: 800
      }}
    >
      <span style={{ color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>
        {s.dashStateLabel}
      </span>
      <select
        className="state-select"
        value={selectedState}
        disabled={isPending}
        onChange={(event) => {
          const state = event.target.value;
          startTransition(() => {
            router.push(`/dashboard?state=${encodeURIComponent(state)}`);
          });
        }}
        style={{ width: 220, maxWidth: "100%" }}
      >
        {AU_STATE_OPTIONS.map((state) => (
          <option key={state.code} value={state.code}>
            {state.code} - {state.name}
          </option>
        ))}
      </select>
    </label>
  );
}
