import type { ReactNode } from "react";
import "../../src/app/auth/auth.css";
import { AuthTopBar } from "@/components/auth/AuthTopBar";

export default function AuthSegmentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-route">
      <AuthTopBar />
      {children}
    </div>
  );
}
