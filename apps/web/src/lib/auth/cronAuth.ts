/** Shared by `/api/ping` (readiness). Missing secret fails closed. */
export function isAuthorizedCron(
  authHeader: string | null | undefined,
  cronSecret: string | undefined
): boolean {
  if (!cronSecret) return false;
  return authHeader === `Bearer ${cronSecret}`;
}
