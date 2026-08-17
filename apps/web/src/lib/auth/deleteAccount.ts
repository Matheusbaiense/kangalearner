import { verifyCurrentPassword, type PasswordSignIn } from "./passwordReauth";

export type ProfileSnapshot = {
  display_name: string | null;
  name: string | null;
  avatar_url: string | null;
  deleted_at: string | null;
};

export type AccountDeleteStore = {
  fetchProfile(
    userId: string
  ): Promise<{ data: ProfileSnapshot | null; error: { code: string } | null }>;
  softDelete(userId: string): Promise<{ error: { code: string } | null }>;
  deleteAuthUser(userId: string): Promise<{ error: unknown }>;
  rollback(
    userId: string,
    snapshot: Pick<ProfileSnapshot, "display_name" | "name" | "avatar_url">
  ): Promise<{ error: { code: string } | null }>;
  listAvatarFiles(
    userId: string
  ): Promise<{ data: Array<{ name: string }> | null; error: unknown }>;
  removeAvatarPaths(paths: string[]): Promise<{ error: unknown }>;
};

export type DeleteAccountResult =
  | { ok: true }
  | {
      ok: false;
      code: "reauth_required" | "delete_failed" | "already_deleted" | "auth_delete_failed";
    };

export async function performAccountDelete(
  userId: string,
  store: AccountDeleteStore
): Promise<Exclude<DeleteAccountResult, { code: "reauth_required" }>> {
  const { data: existingProfile, error: fetchError } = await store.fetchProfile(userId);
  if (fetchError) return { ok: false, code: "delete_failed" };
  if (existingProfile?.deleted_at) return { ok: false, code: "already_deleted" };

  const rollbackSnapshot = {
    display_name: existingProfile?.display_name ?? null,
    name: existingProfile?.name ?? null,
    avatar_url: existingProfile?.avatar_url ?? null
  };

  const { error: profileError } = await store.softDelete(userId);
  if (profileError) return { ok: false, code: "delete_failed" };

  const { error: authError } = await store.deleteAuthUser(userId);
  if (authError) {
    await store.rollback(userId, rollbackSnapshot);
    return { ok: false, code: "auth_delete_failed" };
  }

  const { data: avatarFiles, error: listError } = await store.listAvatarFiles(userId);
  if (!listError && avatarFiles && avatarFiles.length > 0) {
    await store.removeAvatarPaths(avatarFiles.map((file) => `${userId}/${file.name}`));
  }

  return { ok: true };
}

export async function deleteAccountWithReauth(input: {
  userId: string;
  email: string | null | undefined;
  password: string | null;
  signInWithPassword: PasswordSignIn;
  store: AccountDeleteStore;
}): Promise<DeleteAccountResult> {
  const reauth = await verifyCurrentPassword({
    email: input.email,
    password: input.password,
    signInWithPassword: input.signInWithPassword
  });
  if (!reauth.ok) return reauth;
  return performAccountDelete(input.userId, input.store);
}
