export const LANGS = ["en", "pt", "es"] as const;
export type Lang = (typeof LANGS)[number];

export type LocalizedText = Record<Lang, string>;

export type QuestionOption = {
  l: string;
  t: LocalizedText;
  ok?: boolean;
};

export type Question = {
  id: string;
  cat: string;
  q: LocalizedText;
  exp: LocalizedText;
  opts: QuestionOption[];
  states: string[];
  sign?: string;
  cap?: string | null;
  tip?: LocalizedText | null;
};

export type Category = {
  key: string;
  icon?: string;
  label: LocalizedText;
};

export type QuestionsDataset = {
  QUESTIONS: readonly Question[];
  CATEGORIES: readonly Category[];
};

export type DatasetIssue = { id?: string; msg: string };

function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object";
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isLocalizedText(v: unknown): v is LocalizedText {
  if (!isObject(v)) return false;
  return LANGS.every((l) => isNonEmptyString(v[l]));
}

function isOption(v: unknown): v is QuestionOption {
  if (!isObject(v)) return false;
  if (!isNonEmptyString(v.l)) return false;
  if (!isLocalizedText(v.t)) return false;
  if (typeof v.ok !== "undefined" && typeof v.ok !== "boolean") return false;
  return true;
}

function htmlLooksUnsafe(s: string): boolean {
  // Conservative guardrails: block scripts, iframes, inline handlers and javascript: URLs.
  const lower = s.toLowerCase();
  if (lower.includes("<script")) return true;
  if (lower.includes("<iframe")) return true;
  if (/\son\w+\s*=/.test(lower)) return true;
  if (lower.includes("javascript:")) return true;
  return false;
}

export function validateQuestionsDataset(dataset: unknown): DatasetIssue[] {
  const issues: DatasetIssue[] = [];
  if (!isObject(dataset)) return [{ msg: "dataset is not an object" }];
  const QUESTIONS = dataset.QUESTIONS;
  const CATEGORIES = dataset.CATEGORIES;
  if (!Array.isArray(QUESTIONS) || !Array.isArray(CATEGORIES)) {
    return [{ msg: "missing QUESTIONS or CATEGORIES arrays" }];
  }

  const catKeys = new Set<string>();
  CATEGORIES.forEach((c, idx) => {
    if (!isObject(c)) {
      issues.push({ msg: `CATEGORIES[${idx}] is not an object` });
      return;
    }
    if (!isNonEmptyString(c.key)) issues.push({ msg: `CATEGORIES[${idx}].key missing` });
    else catKeys.add(c.key);
    if (!isLocalizedText(c.label)) issues.push({ msg: `CATEGORIES[${idx}].label invalid` });
  });

  const seenIds = new Set<string>();
  QUESTIONS.forEach((q, idx) => {
    if (!isObject(q)) {
      issues.push({ msg: `QUESTIONS[${idx}] is not an object` });
      return;
    }
    const id = isNonEmptyString(q.id) ? q.id : undefined;
    if (!id) issues.push({ msg: `QUESTIONS[${idx}].id missing` });
    else {
      if (seenIds.has(id)) issues.push({ id, msg: "duplicate id" });
      seenIds.add(id);
    }

    if (!isNonEmptyString(q.cat)) issues.push({ id, msg: "missing cat" });
    else if (!catKeys.has(q.cat)) issues.push({ id, msg: `unknown category: ${q.cat}` });

    const qText = q.q;
    if (!isLocalizedText(qText)) issues.push({ id, msg: "invalid q (localized text)" });

    const expText = q.exp;
    if (!isLocalizedText(expText)) issues.push({ id, msg: "invalid exp (localized text)" });
    else {
      LANGS.forEach((l) => {
        const s = expText[l];
        if (htmlLooksUnsafe(s)) issues.push({ id, msg: `exp.${l} contains unsafe html` });
      });
    }

    if (!Array.isArray(q.opts) || q.opts.length === 0) issues.push({ id, msg: "no options" });
    else {
      let okCount = 0;
      q.opts.forEach((o, oIdx) => {
        if (!isOption(o)) issues.push({ id, msg: `invalid option at opts[${oIdx}]` });
        if (isObject(o) && o.ok) okCount++;
      });
      if (okCount === 0) issues.push({ id, msg: "no correct option" });
      if (okCount > 1) issues.push({ id, msg: "multiple correct options" });
    }

    if (!Array.isArray(q.states) || q.states.length === 0)
      issues.push({ id, msg: "missing states[]" });
  });

  return issues;
}
