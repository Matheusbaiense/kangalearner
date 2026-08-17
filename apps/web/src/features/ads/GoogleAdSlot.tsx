"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import type { AdSenseUnit } from "./ads-config";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// `unit` is always a resolved, real AdSense unit here — AdSlot.tsx (server-side)
// only renders this component once it has already confirmed one exists.
export function GoogleAdSlot({ unit }: { unit: AdSenseUnit }) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch (err) {
      console.error("[ads:adsense] push failed:", err);
    }
  }, []);

  return (
    <div
      style={{
        margin: "24px 0 0",
        padding: "10px 12px 4px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
        minHeight: 90
      }}
    >
      <Script
        id="adsbygoogle-script"
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(unit.clientId)}`}
        crossOrigin="anonymous"
      />
      <span
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: ".7rem",
          fontWeight: 800,
          color: "var(--muted)"
        }}
      >
        Ad
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={unit.clientId}
        data-ad-slot={unit.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
