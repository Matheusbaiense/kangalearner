import { NextResponse, type NextRequest } from "next/server";
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
    return NextResponse.json({ error: "missing_env" }, { status: 500 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!(await rateLimit(`account-delete:${user.id}`, 5, 60_000))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const { data: existingProfile, error: fetchError } = await supabaseAdmin
    .from("profiles")
    .select("display_name, name, avatar_url, deleted_at")
    .eq("id", user.id)
    .maybeSingle();

  if (fetchError) {
    console.error("[account/delete] profile fetch failed:", fetchError.code);
    return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  }

  if (existingProfile?.deleted_at) {
    return NextResponse.json({ error: "already_deleted" }, { status: 409 });
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
    console.error("[account/delete] profile soft-delete failed:", profileError.code);
    return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  }

  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (authError) {
    console.error("[account/delete] auth user deletion failed:", authError.message);

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
      console.error("[account/delete] rollback failed:", rollbackError.code);
    }

    return NextResponse.json({ error: "auth_delete_failed" }, { status: 500 });
  }

  // Best-effort cleanup of orphaned avatar objects. The account is already gone
  // at this point, so a storage failure must not fail the request, just log it.
  const { data: avatarFiles, error: listError } = await supabaseAdmin.storage
    .from("avatars")
    .list(user.id);

  if (listError) {
    console.error("[account/delete] avatar list failed:", listError.message);
  } else if (avatarFiles && avatarFiles.length > 0) {
    const paths = avatarFiles.map((f) => `${user.id}/${f.name}`);
    const { error: removeError } = await supabaseAdmin.storage.from("avatars").remove(paths);
    if (removeError) {
      console.error("[account/delete] avatar remove failed:", removeError.message);
    }
  }

  return NextResponse.json({ ok: true }, { headers: response.headers });
}
