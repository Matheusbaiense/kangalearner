export type AuthErrorKind = "login" | "signup" | "oauth" | "reset";

const MESSAGES: Record<AuthErrorKind, string> = {
  login: "Could not sign in. Check your email and password, or try again.",
  signup: "Could not create an account. Try a different email or try again.",
  oauth: "Could not continue with Google. Please try again.",
  reset: "Could not send a reset email. Try again in a moment."
};

/** Map GoTrue errors to a generic UI string. Never surface raw provider text. */
export function authErrorToUserMessage(
  kind: AuthErrorKind,
  error?: { code?: string; message?: string } | null
): string {
  const code = error?.code ?? "";
  if (code === "email_not_confirmed") {
    return "Confirm your email before signing in.";
  }
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit") {
    return "Too many attempts. Please wait a minute and try again.";
  }
  if (code === "captcha_failed") {
    return "Could not verify you are human. Refresh and try again.";
  }
  return MESSAGES[kind];
}
