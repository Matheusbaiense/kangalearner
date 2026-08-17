import { type NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api/envelope";
import { log, logContext } from "@/lib/log";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import { rateLimit } from "@/lib/rateLimit";

/**
 * Deletes the authenticated user's account:
 * 1. Soft-deletes the profile row (sets deleted_at, anonymises display name).
 * 2. Hard-deletes the auth.users record via the admin API so the user cannot
 *    sign in again.
 * On auth deletion failure, rolls back the soft-delete to keep account consistent.
 */
export async function DELETE(request: NextRequest) {
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

  if (!(await rateLimit(`account-delete:${user.id}`, 5, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  const { data: existingProfile, error: fetchError } = await supabaseAdmin
    .from("profiles")
    .select("display_name, name, avatar_url, deleted_at")
    .eq("id", user.id)
    .maybeSingle();

  if (fetchError) {
    log("error", "account.delete.profile_fetch_failed", {
      ...logContext(request, { userId: user.id, action: "fetch" }),
      code: fetchError.code
    });
    return apiError("delete_failed", 500);
  }

  if (existingProfile?.deleted_at) {
    return apiError("already_deleted", 409);
  }

  const rollbackSnapshot = {
    display_name: existingProfile?.display_name ?? null,
    name: existingProfile?.name ?? null,
    avatar_url: existingProfile?.avatar_url ?? null
  };

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .update({
      deleted_at: new Date().toISOString(),
      display_name: "Deleted User",
      name: null,
      avatar_url: null
    })
    .eq("id", user.id);

  if (profileError) {
    log("error", "account.delete.soft_delete_failed", {
      ...logContext(request, { userId: user.id, action: "soft_delete" }),
      code: profileError.code
    });
    return apiError("delete_failed", 500);
  }

  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (authError) {
    log("error", "account.delete.auth_user_failed", {
      ...logContext(request, { userId: user.id, action: "auth_delete" })
    });

    const { error: rollbackError } = await supabaseAdmin
      .from("profiles")
      .update({
        deleted_at: null,
        display_name: rollbackSnapshot.display_name,
        name: rollbackSnapshot.name,
        avatar_url: rollbackSnapshot.avatar_url
      })
      .eq("id", user.id);

    if (rollbackError) {
      log("error", "account.delete.rollback_failed", {
        ...logContext(request, { userId: user.id, action: "rollback" }),
        code: rollbackError.code
      });
    }

    return apiError("auth_delete_failed", 500);
  }

  // Best-effort cleanup of orphaned avatar objects. The account is already gone
  // at this point, so a storage failure must not fail the request, just log it.
  const { data: avatarFiles, error: listError } = await supabaseAdmin.storage
    .from("avatars")
    .list(user.id);

  if (listError) {
    log("error", "account.delete.avatar_list_failed", {
      ...logContext(request, { userId: user.id, action: "avatar_list" })
    });
  } else if (avatarFiles && avatarFiles.length > 0) {
    const paths = avatarFiles.map((f) => `${user.id}/${f.name}`);
    const { error: removeError } = await supabaseAdmin.storage.from("avatars").remove(paths);
    if (removeError) {
      log("error", "account.delete.avatar_remove_failed", {
        ...logContext(request, { userId: user.id, action: "avatar_remove" })
      });
    }
  }

  return apiOk(undefined, { headers: response.headers });
}
