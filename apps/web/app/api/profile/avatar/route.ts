import { type NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api/envelope";
import { log, logContext } from "@/lib/log";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import { rateLimit } from "@/lib/rateLimit";

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const MAGIC_BYTES: Record<string, number[][]> = {
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png": [[0x89, 0x50, 0x4e, 0x47]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]],
  "image/gif": [
    [0x47, 0x49, 0x46, 0x38, 0x37],
    [0x47, 0x49, 0x46, 0x38, 0x39]
  ]
};

function matchesMagicBytes(buf: Buffer, mime: string, signatures: number[][]): boolean {
  if (mime === "image/webp") {
    return (
      buf.length >= 12 &&
      buf[0] === 0x52 &&
      buf[1] === 0x49 &&
      buf[2] === 0x46 &&
      buf[3] === 0x46 &&
      buf[8] === 0x57 &&
      buf[9] === 0x45 &&
      buf[10] === 0x42 &&
      buf[11] === 0x50
    );
  }
  return signatures.some((sig) => sig.every((byte, i) => buf[i] === byte));
}

/** POST /api/profile/avatar, upload or replace user avatar */
export async function POST(req: NextRequest) {
  const { supabase } = createRouteHandlerClient(req);

  const {
    data: { user },
    error: authErr
  } = await supabase.auth.getUser();
  if (authErr || !user) {
    return apiError("unauthorized", 401);
  }

  if (!(await rateLimit(`avatar:post:${user.id}`, 5, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return apiError("missing_file", 400);
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return apiError("invalid_file_type", 400);
  }
  if (file.size > MAX_SIZE_BYTES) {
    return apiError("file_too_large", 400);
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const signatures = MAGIC_BYTES[file.type];
  if (!signatures || !matchesMagicBytes(buffer, file.type, signatures)) {
    return apiError("invalid_file_content", 400);
  }

  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${user.id}/avatar.${ext}`;

  const { error: uploadErr } = await supabase.storage
    .from("avatars")
    .upload(path, buffer, { contentType: file.type, upsert: true });

  if (uploadErr) {
    log("error", "avatar.upload_failed", {
      ...logContext(req, { userId: user.id, action: "upload" })
    });
    return apiError("upload_failed", 500);
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from("avatars").getPublicUrl(path);
  const avatarUrl = `${publicUrl}?t=${Date.now()}`;

  const { error: dbErr } = await supabaseAdmin
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", user.id);

  if (dbErr) {
    log("error", "avatar.db_update_failed", {
      ...logContext(req, { userId: user.id, action: "db_update" }),
      code: dbErr.code
    });
    return apiError("db_update_failed", 500);
  }

  return apiOk({ url: avatarUrl });
}

/** DELETE /api/profile/avatar, remove user avatar */
export async function DELETE(req: NextRequest) {
  const { supabase } = createRouteHandlerClient(req);

  const {
    data: { user },
    error: authErr
  } = await supabase.auth.getUser();
  if (authErr || !user) {
    return apiError("unauthorized", 401);
  }

  if (!(await rateLimit(`avatar:delete:${user.id}`, 5, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  const { data: profile, error: profileErr } = await supabaseAdmin
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (profileErr) {
    log("error", "avatar.profile_fetch_failed", {
      ...logContext(req, { userId: user.id, action: "fetch" }),
      code: profileErr.code
    });
    return apiError("profile_fetch_failed", 500);
  }

  const { data: files } = await supabase.storage.from("avatars").list(user.id);

  if (files && files.length > 0) {
    const paths = files.map((f) => `${user.id}/${f.name}`);
    const { error: storageError } = await supabase.storage.from("avatars").remove(paths);

    if (storageError) {
      log("error", "avatar.storage_remove_failed", {
        ...logContext(req, { userId: user.id, action: "storage_remove" })
      });
      return apiError("storage_remove_failed", 500);
    }
  }

  const { error: dbError } = await supabaseAdmin
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", user.id);

  if (dbError) {
    log("error", "avatar.delete_db_update_failed", {
      ...logContext(req, { userId: user.id, action: "db_update" }),
      code: dbError.code
    });
    return apiError("db_update_failed", 500);
  }

  return apiOk();
}
