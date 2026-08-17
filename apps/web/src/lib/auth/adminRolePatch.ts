export const PROFILE_ROLES = ["free", "premium", "admin", "super_admin"] as const;
export type ProfileRole = (typeof PROFILE_ROLES)[number];

export function evaluateAdminRolePatch(input: {
  callerRole: string | null | undefined;
  targetRole: string | null | undefined;
  nextRole: ProfileRole;
}): { ok: true } | { ok: false; error: string } {
  const caller = input.callerRole ?? "";
  const target = input.targetRole ?? "";
  const isSuper = caller === "super_admin";

  if (input.nextRole === "premium") {
    return { ok: false, error: "Premium role is managed by Stripe billing" };
  }

  if (target === "premium") {
    return { ok: false, error: "Premium role is managed by Stripe billing" };
  }

  if ((input.nextRole === "admin" || input.nextRole === "super_admin") && !isSuper) {
    return { ok: false, error: "Only super_admin can assign admin roles" };
  }

  if ((target === "admin" || target === "super_admin") && !isSuper) {
    return { ok: false, error: "Only super_admin can modify admin users" };
  }

  return { ok: true };
}
