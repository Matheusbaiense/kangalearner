export const PROFILE_ROLES = ["free", "premium", "admin", "super_admin"] as const;
export type ProfileRole = (typeof PROFILE_ROLES)[number];

export type AdminRolePatchFailure = {
  ok: false;
  code: "premium_managed_by_billing" | "only_super_admin_assign" | "only_super_admin_modify";
  error: string;
};

export function evaluateAdminRolePatch(input: {
  callerRole: string | null | undefined;
  targetRole: string | null | undefined;
  nextRole: ProfileRole;
}): { ok: true } | AdminRolePatchFailure {
  const caller = input.callerRole ?? "";
  const target = input.targetRole ?? "";
  const isSuper = caller === "super_admin";

  if (input.nextRole === "premium") {
    return {
      ok: false,
      code: "premium_managed_by_billing",
      error: "Premium role is managed by Stripe billing"
    };
  }

  if (target === "premium") {
    return {
      ok: false,
      code: "premium_managed_by_billing",
      error: "Premium role is managed by Stripe billing"
    };
  }

  if ((input.nextRole === "admin" || input.nextRole === "super_admin") && !isSuper) {
    return {
      ok: false,
      code: "only_super_admin_assign",
      error: "Only super_admin can assign admin roles"
    };
  }

  if ((target === "admin" || target === "super_admin") && !isSuper) {
    return {
      ok: false,
      code: "only_super_admin_modify",
      error: "Only super_admin can modify admin users"
    };
  }

  return { ok: true };
}

export function adminRolePatchUserMessage(code: string): string {
  switch (code) {
    case "premium_managed_by_billing":
      return "Premium role is managed by Stripe billing";
    case "only_super_admin_assign":
      return "Only super_admin can assign admin roles";
    case "only_super_admin_modify":
      return "Only super_admin can modify admin users";
    case "forbidden":
      return "Forbidden";
    case "too_many_requests":
      return "Too many requests";
    default:
      return "Failed to update role";
  }
}
