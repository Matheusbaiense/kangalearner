import { CATEGORIES } from "@kanga/core";

const PRACTICE_CAT_KEYS = new Set<string>(["all", ...CATEGORIES.map((c) => c.key)]);

const VALID_MODES = ["all", "wrong", "unanswered", "saved"] as const;
export type PracticeMode = (typeof VALID_MODES)[number];

export function parsePracticeMode(raw: string | undefined): PracticeMode {
  return (VALID_MODES as readonly string[]).includes(raw ?? "") ? (raw as PracticeMode) : "all";
}

/** Canonical query param is `cat`; `category` is accepted as an alias. */
export function parsePracticeCat(rawCat: string | undefined, rawCategory?: string): string {
  const raw = rawCat || rawCategory;
  if (!raw) return "all";
  return PRACTICE_CAT_KEYS.has(raw) ? raw : "all";
}

export function practiceQueryHref(mode: string, cat: string): string {
  const params = new URLSearchParams();
  if (mode && mode !== "all") params.set("mode", mode);
  if (cat && cat !== "all") params.set("cat", cat);
  const qs = params.toString();
  return qs ? `/practice?${qs}` : "/practice";
}
