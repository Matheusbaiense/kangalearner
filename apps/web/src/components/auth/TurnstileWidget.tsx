"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { TURNSTILE_SCRIPT_SRC } from "@/lib/security/cspSources";
import { isTurnstileConfigured, turnstileSiteKey } from "@/lib/auth/turnstile";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

type Props = {
  onToken: (token: string) => void;
  resetKey: number;
};

export function TurnstileWidget({ onToken, resetKey }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  function renderWidget() {
    const sitekey = turnstileSiteKey();
    if (!sitekey || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey,
      callback: (token: string) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(""),
      "error-callback": () => onTokenRef.current("")
    });
  }

  useEffect(() => {
    renderWidget();
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
    // resetKey re-renders after a failed submit so the visitor gets a fresh token.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- renderWidget reads refs
  }, [resetKey]);

  if (!isTurnstileConfigured()) return null;

  return (
    <>
      <Script src={TURNSTILE_SCRIPT_SRC} strategy="afterInteractive" onLoad={renderWidget} />
      <div ref={containerRef} className="auth-turnstile" />
    </>
  );
}
