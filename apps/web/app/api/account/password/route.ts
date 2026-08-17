import { type NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api/envelope";
import { parsePasswordChangeBody, verifyCurrentPassword } from "@/lib/auth/passwordReauth";
import { log, logContext } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";

/** PATCH /api/account/password — requires current password (step-up). */
export async function PATCH(request: NextRequest) {
  let supabase;
  let response;
  try {
    ({ supabase, cookieResponse: response } = createRouteHandlerClient(request));
  } catch {
    return apiError("missing_env", 500);
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return apiError("unauthorized", 401);

  if (!(await rateLimit(`account-password:${user.id}`, 5, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("invalid_json", 400);
  }

  const parsed = parsePasswordChangeBody(body);
  if (!parsed.ok) {
    return apiError(parsed.code, parsed.code === "reauth_required" ? 403 : 400);
  }

  const reauth = await verifyCurrentPassword({
    email: user.email,
    password: parsed.currentPassword,
    signInWithPassword: (creds) => supabase.auth.signInWithPassword(creds)
  });
  if (!reauth.ok) return apiError("reauth_required", 403);

  const { error } = await supabase.auth.updateUser({ password: parsed.newPassword });
  if (error) {
    log("error", "account.password.update_failed", {
      ...logContext(request, { userId: user.id, action: "update_password" })
    });
    return apiError("password_update_failed", 500);
  }

  return apiOk(undefined, { headers: response.headers });
}
