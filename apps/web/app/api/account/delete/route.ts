import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Soft-deletes the account: sets profiles.deleted_at and anonymises the display name.
 * The auth.users row and all attempt data are preserved for analytics / recovery.
 * A background job or manual admin action can hard-delete later if needed (GDPR request).
 */
export async function DELETE() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({
      deleted_at: new Date().toISOString(),
      full_name: "Deleted User",
      avatar_url: null,
    })
    .eq("id", user.id);

  if (error) {
    console.error("[account/delete] soft-delete failed:", error.code);
    return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
