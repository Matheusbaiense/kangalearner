export const AU_STATE_OPTIONS = [
  { code: "WA", name: "Western Australia" },
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" }
] as const;

export type AuStateCode = (typeof AU_STATE_OPTIONS)[number]["code"];

export function normalizeAuState(value: unknown): AuStateCode | null {
  if (typeof value !== "string") return null;
  const upper = value.toUpperCase();
  return AU_STATE_OPTIONS.some((state) => state.code === upper) ? (upper as AuStateCode) : null;
}
