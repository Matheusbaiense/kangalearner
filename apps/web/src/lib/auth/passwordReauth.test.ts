import { describe, expect, it, vi } from "vitest";
import {
  parsePasswordChangeBody,
  parseReauthPassword,
  verifyCurrentPassword
} from "./passwordReauth";

describe("parseReauthPassword", () => {
  it("returns null when password is missing", () => {
    expect(parseReauthPassword(null)).toBeNull();
    expect(parseReauthPassword({})).toBeNull();
    expect(parseReauthPassword({ password: "" })).toBeNull();
    expect(parseReauthPassword({ password: 12 })).toBeNull();
  });

  it("returns the password string without logging it", () => {
    expect(parseReauthPassword({ password: "hunter2-secret" })).toBe("hunter2-secret");
  });
});

describe("verifyCurrentPassword", () => {
  it("fails closed without email or password", async () => {
    const signIn = vi.fn();
    await expect(
      verifyCurrentPassword({ email: null, password: "x", signInWithPassword: signIn })
    ).resolves.toEqual({ ok: false, code: "reauth_required" });
    await expect(
      verifyCurrentPassword({
        email: "a@b.co",
        password: null,
        signInWithPassword: signIn
      })
    ).resolves.toEqual({ ok: false, code: "reauth_required" });
    expect(signIn).not.toHaveBeenCalled();
  });

  it("returns reauth_required when sign-in fails", async () => {
    const signIn = vi.fn().mockResolvedValue({ error: { message: "Invalid login" } });
    await expect(
      verifyCurrentPassword({
        email: "a@b.co",
        password: "wrong",
        signInWithPassword: signIn
      })
    ).resolves.toEqual({ ok: false, code: "reauth_required" });
    expect(signIn).toHaveBeenCalledWith({ email: "a@b.co", password: "wrong" });
  });

  it("succeeds when sign-in has no error", async () => {
    const signIn = vi.fn().mockResolvedValue({ error: null });
    await expect(
      verifyCurrentPassword({
        email: "a@b.co",
        password: "correct-horse",
        signInWithPassword: signIn
      })
    ).resolves.toEqual({ ok: true });
  });
});

describe("parsePasswordChangeBody", () => {
  it("requires current and new passwords", () => {
    expect(parsePasswordChangeBody({ newPassword: "abcdefgh" })).toEqual({
      ok: false,
      code: "reauth_required"
    });
    expect(parsePasswordChangeBody({ currentPassword: "old" })).toEqual({
      ok: false,
      code: "invalid_payload"
    });
  });

  it("rejects a short new password", () => {
    expect(parsePasswordChangeBody({ currentPassword: "old-pass", newPassword: "short" })).toEqual({
      ok: false,
      code: "invalid_payload"
    });
  });

  it("accepts a valid pair", () => {
    expect(
      parsePasswordChangeBody({ currentPassword: "old-pass", newPassword: "new-pass-9" })
    ).toEqual({
      ok: true,
      currentPassword: "old-pass",
      newPassword: "new-pass-9"
    });
  });
});
