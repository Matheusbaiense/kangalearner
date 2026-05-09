import { redirect } from "next/navigation";

/** Canonical auth path is /auth/forgot-password (INFRA-8). */
export default function ForgotPasswordRedirect() {
  redirect("/auth/forgot-password");
}
