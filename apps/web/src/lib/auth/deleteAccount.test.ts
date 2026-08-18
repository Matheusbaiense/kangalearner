import { describe, expect, it, vi } from "vitest";
import {
  deleteAccountWithReauth,
  performAccountDelete,
  type AccountDeleteStore
} from "./deleteAccount";

function memoryStore(initial?: { deletedAt?: string | null }): AccountDeleteStore & {
  authDeleted: string[];
} {
  const authDeleted: string[] = [];
  let deletedAt = initial?.deletedAt ?? null;
  const store: AccountDeleteStore & { authDeleted: string[] } = {
    authDeleted,
    fetchProfile: async () => ({
      data: {
        display_name: "Ada",
        name: "Ada",
        avatar_url: null,
        deleted_at: deletedAt
      },
      error: null
    }),
    softDelete: async () => {
      deletedAt = "2026-08-17T00:00:00.000Z";
      return { error: null };
    },
    deleteAuthUser: async (userId) => {
      authDeleted.push(userId);
      return { error: null };
    },
    rollback: async () => {
      deletedAt = null;
      return { error: null };
    },
    listAvatarFiles: async () => ({ data: [], error: null }),
    removeAvatarPaths: async () => ({ error: null })
  };
  return store;
}

describe("deleteAccountWithReauth", () => {
  it("returns reauth_required and does not delete the user without a password", async () => {
    const store = memoryStore();
    const signIn = vi.fn();
    const result = await deleteAccountWithReauth({
      userId: "user-1",
      email: "ada@example.com",
      password: null,
      signInWithPassword: signIn,
      store
    });
    expect(result).toEqual({ ok: false, code: "reauth_required" });
    expect(signIn).not.toHaveBeenCalled();
    expect(store.authDeleted).toEqual([]);
  });

  it("returns reauth_required when the password is wrong", async () => {
    const store = memoryStore();
    const result = await deleteAccountWithReauth({
      userId: "user-1",
      email: "ada@example.com",
      password: "nope",
      signInWithPassword: async () => ({ error: { message: "invalid" } }),
      store
    });
    expect(result).toEqual({ ok: false, code: "reauth_required" });
    expect(store.authDeleted).toEqual([]);
  });

  it("deletes the auth user after a successful password reauth", async () => {
    const store = memoryStore();
    const result = await deleteAccountWithReauth({
      userId: "user-1",
      email: "ada@example.com",
      password: "correct-horse",
      signInWithPassword: async () => ({ error: null }),
      store
    });
    expect(result).toEqual({ ok: true });
    expect(store.authDeleted).toEqual(["user-1"]);
  });

  it("rolls back the profile when auth delete fails", async () => {
    const store = memoryStore();
    store.deleteAuthUser = async () => ({ error: { message: "gotrue down" } });
    const rolledBack: string[] = [];
    store.rollback = async (userId) => {
      rolledBack.push(userId);
      return { error: null };
    };
    const result = await performAccountDelete("user-1", store);
    expect(result).toEqual({ ok: false, code: "auth_delete_failed" });
    expect(rolledBack).toEqual(["user-1"]);
    expect(store.authDeleted).toEqual([]);
  });

  it("returns already_deleted without touching auth", async () => {
    const store = memoryStore({ deletedAt: "2026-01-01T00:00:00.000Z" });
    const result = await performAccountDelete("user-1", store);
    expect(result).toEqual({ ok: false, code: "already_deleted" });
    expect(store.authDeleted).toEqual([]);
  });
});
