const MAX_PASSWORD_LENGTH = 256;
const MIN_NEW_PASSWORD_LENGTH = 8;

export type ReauthFailure = { ok: false; code: "reauth_required" };
export type ReauthResult = { ok: true } | ReauthFailure;

export type PasswordSignIn = (creds: {
  email: string;
  password: string;
}) => Promise<{ error: unknown }>;

export function parseReauthPassword(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const value = (body as { password?: unknown }).password;
  if (typeof value !== "string") return null;
  if (value.length === 0 || value.length > MAX_PASSWORD_LENGTH) return null;
  return value;
}

export async function verifyCurrentPassword(input: {
  email: string | null | undefined;
  password: string | null;
  signInWithPassword: PasswordSignIn;
}): Promise<ReauthResult> {
  if (!input.email || !input.password) {
    return { ok: false, code: "reauth_required" };
  }
  const { error } = await input.signInWithPassword({
    email: input.email,
    password: input.password
  });
  if (error) return { ok: false, code: "reauth_required" };
  return { ok: true };
}

export type PasswordChangeParse =
  | { ok: true; currentPassword: string; newPassword: string }
  | { ok: false; code: "reauth_required" | "invalid_payload" };

export function parsePasswordChangeBody(body: unknown): PasswordChangeParse {
  if (!body || typeof body !== "object") {
    return { ok: false, code: "invalid_payload" };
  }
  const rec = body as { currentPassword?: unknown; newPassword?: unknown };
  if (typeof rec.currentPassword !== "string" || rec.currentPassword.length === 0) {
    return { ok: false, code: "reauth_required" };
  }
  if (typeof rec.newPassword !== "string") {
    return { ok: false, code: "invalid_payload" };
  }
  if (
    rec.currentPassword.length > MAX_PASSWORD_LENGTH ||
    rec.newPassword.length < MIN_NEW_PASSWORD_LENGTH ||
    rec.newPassword.length > MAX_PASSWORD_LENGTH
  ) {
    return { ok: false, code: "invalid_payload" };
  }
  return {
    ok: true,
    currentPassword: rec.currentPassword,
    newPassword: rec.newPassword
  };
}
