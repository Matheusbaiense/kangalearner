import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const MAGIC_BYTES: Record<string, number[][]> = {
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png":  [[0x89, 0x50, 0x4e, 0x47]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]],
  "image/gif":  [[0x47, 0x49, 0x46, 0x38, 0x37], [0x47, 0x49, 0x46, 0x38, 0x39]],
};

function matchesMagicBytes(buf: Buffer, signatures: number[][]): boolean {
  return signatures.some((sig) => sig.every((byte, i) => buf[i] === byte));
}

/** POST /api/profile/avatar — upload or replace user avatar */
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, WebP or GIF." }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large. Max 2 MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const signatures = MAGIC_BYTES[file.type];
  if (!signatures || !matchesMagicBytes(buffer, signatures)) {
    return NextResponse.json({ error: "File content does not match declared type." }, { status: 400 });
  }

  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${user.id}/avatar.${ext}`;

  const { error: uploadErr } = await supabaseAdmin.storage
    .from("avatars")
    .upload(path, buffer, { contentType: file.type, upsert: true });

  if (uploadErr) {
    console.error("[avatar/upload] storage upload failed:", uploadErr.message);
    return NextResponse.json({ error: "upload_failed" }, { status: 500 });
  }

  const { data: { publicUrl } } = supabaseAdmin.storage.from("avatars").getPublicUrl(path);
  const avatarUrl = `${publicUrl}?t=${Date.now()}`;

  const { error: dbErr } = await supabaseAdmin
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", user.id);

  if (dbErr) {
    console.error("[avatar/upload] db update failed:", dbErr.code);
    return NextResponse.json({ error: "db_update_failed" }, { status: 500 });
  }

  return NextResponse.json({ url: avatarUrl });
}

/** DELETE /api/profile/avatar — remove user avatar */
export async function DELETE() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error: profileErr } = await supabaseAdmin
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (profileErr) {
    console.error("[avatar/delete] profile fetch failed:", profileErr.code);
    return NextResponse.json({ error: "profile_fetch_failed" }, { status: 500 });
  }

  if (profile?.avatar_url) {
    let storagePath: string | undefined;
    try {
      const url = new URL(profile.avatar_url);
      const segment = url.pathname.split("/object/public/avatars/")[1];
      if (segment && segment.startsWith(`${user.id}/`)) {
        storagePath = segment;
      }
    } catch {
      // malformed URL — skip storage removal, still zero DB
    }

    if (storagePath) {
      const { error: storageError } = await supabaseAdmin.storage
        .from("avatars")
        .remove([storagePath]);

      if (storageError) {
        console.error("[avatar/delete] storage remove failed:", storageError.message);
        return NextResponse.json({ error: "storage_remove_failed" }, { status: 500 });
      }
    }
  }

  const { error: dbError } = await supabaseAdmin
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", user.id);

  if (dbError) {
    console.error("[avatar/delete] db update failed:", dbError.code);
    return NextResponse.json({ error: "db_update_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
