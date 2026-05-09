import { redirect } from "next/navigation";

/** Canonical auth path is /auth/signup (INFRA-8). */
export default function SignupRedirect() {
  redirect("/auth/signup");
}
