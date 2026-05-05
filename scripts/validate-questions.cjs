/**
 * Validates assets/js/data/questions.js (loads via vm + window shim).
 * Run: node scripts/validate-questions.cjs
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.join(__dirname, "..", "assets", "js", "data", "questions.js");
const code = fs.readFileSync(file, "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
try {
  vm.runInContext(code, sandbox, {
    timeout: 3000,
    breakOnSigint: true
  });
} catch (err) {
  if (err && err.code === "ERR_SCRIPT_EXECUTION_TIMEOUT") {
    console.error("ERRO: questions.js excedeu 3s — possível loop ou código suspeito");
  } else {
    console.error("ERRO ao executar questions.js:", err && err.message ? err.message : err);
  }
  process.exit(1);
}

const expectedKeys = new Set(["QUESTIONS", "CATEGORIES", "__KANGA_DATA__"]);
const unexpectedKeys = Object.keys(sandbox.window).filter((k) => !expectedKeys.has(k));
if (unexpectedKeys.length > 0) {
  console.warn(`AVISO: propriedades inesperadas em window: ${unexpectedKeys.join(", ")}`);
}

const QUESTIONS = sandbox.window.QUESTIONS;
const CATEGORIES = sandbox.window.CATEGORIES;

if (!Array.isArray(QUESTIONS) || !Array.isArray(CATEGORIES)) {
  console.error("Could not load QUESTIONS or CATEGORIES from questions.js");
  process.exit(1);
}

const catKeys = new Set(CATEGORIES.map((c) => c.key));
const issues = [];
const seenIds = new Set();

for (const q of QUESTIONS) {
  if (!q.id) issues.push({ id: q.id, msg: "missing id" });
  if (seenIds.has(q.id)) issues.push({ id: q.id, msg: "duplicate id" });
  seenIds.add(q.id);

  if (!catKeys.has(q.cat)) issues.push({ id: q.id, msg: `unknown category: ${q.cat}` });

  ["en", "pt", "es"].forEach((lang) => {
    const t = q.q?.[lang];
    if (!t || String(t).trim() === "") issues.push({ id: q.id, msg: `empty q.${lang}` });
  });

  const exp = q.exp || {};
  ["en", "pt", "es"].forEach((lang) => {
    if (!exp[lang] || String(exp[lang]).trim() === "")
      issues.push({ id: q.id, msg: `empty exp.${lang}` });
  });

  if (!Array.isArray(q.opts) || q.opts.length === 0) issues.push({ id: q.id, msg: "no options" });
  else {
    let okCount = 0;
    for (const o of q.opts) {
      ["en", "pt", "es"].forEach((lang) => {
        const ot = o.t?.[lang];
        if (!ot || String(ot).trim() === "")
          issues.push({ id: q.id, msg: `empty option ${o.l} t.${lang}` });
      });
      if (o.ok) okCount++;
    }
    if (okCount === 0) issues.push({ id: q.id, msg: "no correct option" });
    if (okCount > 1) issues.push({ id: q.id, msg: "multiple correct options" });
  }

  if (!Array.isArray(q.states) || q.states.length === 0)
    issues.push({ id: q.id, msg: "missing states[]" });
}

function looksUnsafeHtml(s) {
  const lower = String(s || "").toLowerCase();
  if (lower.includes("<script")) return true;
  if (lower.includes("<iframe")) return true;
  if (/\son\w+\s*=/.test(lower)) return true;
  if (lower.includes("javascript:")) return true;
  return false;
}

for (const q of QUESTIONS) {
  const exp = q.exp || {};
  ["en", "pt", "es"].forEach((lang) => {
    const s = exp[lang];
    if (s && looksUnsafeHtml(s)) issues.push({ id: q.id, msg: `unsafe html in exp.${lang}` });
  });
}

if (issues.length) {
  console.error(`Found ${issues.length} issue(s):`);
  for (const i of issues) console.error(`  ${i.id}: ${i.msg}`);
  process.exit(1);
}

console.log(
  `OK: ${QUESTIONS.length} questions, ${CATEGORIES.length} categories — no issues found.`
);
