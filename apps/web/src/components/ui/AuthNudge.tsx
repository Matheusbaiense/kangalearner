"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/contexts/LangContext";

export function AuthNudge() {
  const { s } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) setShow(true);
    });
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        margin: "24px 0 0",
        padding: "16px 20px",
        borderRadius: "var(--radius-md)",
        background: "var(--brand3, #f0f9ff)",
        border: "1px solid var(--brand2, #bae6fd)",
        display: "flex",
        flexWrap: "wrap",
        gap: "12px 20px",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontWeight: 800, fontSize: ".9rem", color: "var(--ink)", marginBottom: 2 }}>
          {s.nudgeTitle}
        </p>
        <p style={{ fontSize: ".82rem", color: "var(--muted)", lineHeight: 1.45 }}>
          {s.nudgeBody}
        </p>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
        <Link href="/auth/signup" className="btn btn-primary" style={{ fontSize: ".85rem", padding: "8px 16px" }}>
          {s.nudgeSignUp}
        </Link>
        <Link href="/auth/login" className="btn btn-secondary" style={{ fontSize: ".85rem", padding: "8px 16px" }}>
          {s.nudgeSignIn}
        </Link>
      </div>
    </div>
  );
}
