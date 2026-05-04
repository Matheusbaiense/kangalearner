import { redirect } from "next/navigation";

/** Alias path from INFRA-8 auth shell — formulário real em `/forgot-password`. */
export default function AuthForgotPasswordRedirect() {
  redirect("/forgot-password");
}
