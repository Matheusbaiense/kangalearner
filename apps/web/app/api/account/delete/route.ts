import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";

/**
 * Deletes the authenticated user's account:
 * 1. Soft-deletes the profile row (sets deleted_at, anonymises display name).
 * 2. Hard-deletes the auth.users record via the admin API so the user cannot
 *    sign in again.
 * Note: question_attempts and mock_sessions reference auth.users with ON DELETE CASCADE
 *       (see migrations 004 and 005) — attempts and mock sessions are removed with the user.
 */
export async function DELETE() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!(await rateLimit(`account-delete:${user.id}`, 5, 60_000))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  // Step 1: Soft-delete the profile row and anonymise PII.
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

  // Step 2: Remove the auth.users record so the user cannot sign in again.
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (authError) {
    console.error("[account/delete] auth user deletion failed:", authError.message);
    // Profile is already anonymised; the auth deletion failure is non-fatal from
    // a data-privacy standpoint but should be investigated. Return 500 so the
    // client knows the operation was not fully completed.
    return NextResponse.json({ error: "auth_delete_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
