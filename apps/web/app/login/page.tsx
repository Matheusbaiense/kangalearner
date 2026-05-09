import { redirect } from "next/navigation";

/** Canonical auth path is /auth/login (INFRA-8). */
export default function LoginRedirect() {
  redirect("/auth/login");
}
