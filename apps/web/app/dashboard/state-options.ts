export const AU_STATE_OPTIONS = [
  { code: "WA",  name: "Western Australia" },
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "SA",  name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT",  name: "Northern Territory" },
] as const;

export type AuStateCode = typeof AU_STATE_OPTIONS[number]["code"];

const VALID_CODES = new Set<string>(AU_STATE_OPTIONS.map((s) => s.code));

export function normalizeAuState(value: string | null | undefined): AuStateCode | null {
  if (value && VALID_CODES.has(value)) return value as AuStateCode;
  return null;
}
