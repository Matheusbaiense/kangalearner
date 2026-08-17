/** Admins must complete TOTP (aal2). Learners are not gated. */
export function adminRequiresAal2(
  role: string | null | undefined,
  currentLevel: string | null | undefined
): boolean {
  if (role !== "admin" && role !== "super_admin") return false;
  return currentLevel !== "aal2";
}
