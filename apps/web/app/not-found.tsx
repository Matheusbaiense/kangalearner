"use client";

import Link from "next/link";
import { Kanga } from "@/components/brand/Kanga";
import { useLang } from "@/contexts/LangContext";

export default function NotFound() {
  const { s } = useLang();

  return (
    <main
      className="container section-pad"
      style={{
        minHeight: "70dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 14
      }}
    >
      <Kanga pose="search" size={140} />
      <h1 style={{ margin: 0 }}>{s.notFoundTitle}</h1>
      <p style={{ margin: 0, opacity: 0.7 }}>{s.notFoundSub}</p>
      <Link href="/" className="dash-cta" style={{ marginTop: 8 }}>
        {s.notFoundCta}
      </Link>
    </main>
  );
}
