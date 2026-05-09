import { redirect } from "next/navigation";

/** Canonical auth path is /auth/reset-password (INFRA-8). */
export default function ResetPasswordRedirect() {
  redirect("/auth/reset-password");
}
