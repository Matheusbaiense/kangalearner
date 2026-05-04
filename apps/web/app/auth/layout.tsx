import type { ReactNode } from "react";
import "../../src/app/auth/auth.css";

export default function AuthSegmentLayout({ children }: { children: ReactNode }) {
  return <div className="auth-route">{children}</div>;
}
