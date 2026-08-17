import { type NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api/envelope";
import { deleteAccountWithReauth, type AccountDeleteStore } from "@/lib/auth/deleteAccount";
import { parseReauthPassword } from "@/lib/auth/passwordReauth";
import { log, logContext } from "@/lib/log";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import { rateLimit } from "@/lib/rateLimit";

function createAdminDeleteStore(request: NextRequest, userId: string): AccountDeleteStore {
  return {
    fetchProfile: async (id) => {
      const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("display_name, name, avatar_url, deleted_at")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        log("error", "account.delete.profile_fetch_failed", {
          ...logContext(request, { userId, action: "fetch" }),
          code: error.code
        });
        return { data: null, error: { code: error.code } };
      }
      return { data, error: null };
    },
    softDelete: async (id) => {
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          deleted_at: new Date().toISOString(),
          display_name: "Deleted User",
          name: null,
          avatar_url: null
        })
        .eq("id", id);
      if (error) {
        log("error", "account.delete.soft_delete_failed", {
          ...logContext(request, { userId, action: "soft_delete" }),
          code: error.code
        });
        return { error: { code: error.code } };
      }
      return { error: null };
    },
    deleteAuthUser: async (id) => {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
      if (error) {
        log("error", "account.delete.auth_user_failed", {
          ...logContext(request, { userId, action: "auth_delete" })
        });
      }
      return { error };
    },
    rollback: async (id, snapshot) => {
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          deleted_at: null,
          display_name: snapshot.display_name,
          name: snapshot.name,
          avatar_url: snapshot.avatar_url
        })
        .eq("id", id);
      if (error) {
        log("error", "account.delete.rollback_failed", {
          ...logContext(request, { userId, action: "rollback" }),
          code: error.code
        });
        return { error: { code: error.code } };
      }
      return { error: null };
    },
    listAvatarFiles: async (id) => {
      const { data, error } = await supabaseAdmin.storage.from("avatars").list(id);
      if (error) {
        log("error", "account.delete.avatar_list_failed", {
          ...logContext(request, { userId, action: "avatar_list" })
        });
      }
      return { data, error };
    },
    removeAvatarPaths: async (paths) => {
      const { error } = await supabaseAdmin.storage.from("avatars").remove(paths);
      if (error) {
        log("error", "account.delete.avatar_remove_failed", {
          ...logContext(request, { userId, action: "avatar_remove" })
        });
      }
      return { error };
    }
  };
}

/**
 * Deletes the authenticated user's account after a password step-up:
 * 1. Reauth with the current password (body `{ password }`).
 * 2. Soft-deletes the profile row (sets deleted_at, anonymises display name).
 * 3. Hard-deletes the auth.users record via the admin API.
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

  let body: unknown = null;
  try {
    const text = await request.text();
    if (text.trim()) body = JSON.parse(text);
  } catch {
    return apiError("invalid_json", 400);
  }

  const result = await deleteAccountWithReauth({
    userId: user.id,
    email: user.email,
    password: parseReauthPassword(body),
    signInWithPassword: (creds) => supabase.auth.signInWithPassword(creds),
    store: createAdminDeleteStore(request, user.id)
  });

  if (!result.ok) {
    if (result.code === "reauth_required") return apiError("reauth_required", 403);
    if (result.code === "already_deleted") return apiError("already_deleted", 409);
    return apiError(result.code, 500);
  }

  return apiOk(undefined, { headers: response.headers });
}
