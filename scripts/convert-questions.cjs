const fs = require("fs");
const path = require("path");
const vm = require("vm");

const srcPath = path.join(__dirname, "..", "assets", "js", "data", "questions.js");
const src = fs.readFileSync(srcPath, "utf8");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { timeout: 2000 });

const QUESTIONS = sandbox.window.QUESTIONS;
const CATEGORIES = sandbox.window.CATEGORIES;

if (!Array.isArray(QUESTIONS) || !Array.isArray(CATEGORIES)) {
  throw new Error("Failed to load QUESTIONS/CATEGORIES from legacy file.");
}

const outDir = path.join(__dirname, "..", "packages", "core", "src", "data");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "questions.ts");

const content =
  "// AUTO-GENERATED from legacy assets/js/data/questions.js\n" +
  `export const QUESTIONS = ${JSON.stringify(QUESTIONS, null, 2)} as const;\n\n` +
  `export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)} as const;\n\n` +
  "export type Question = (typeof QUESTIONS)[number];\n" +
  "export type Category = (typeof CATEGORIES)[number];\n";

fs.writeFileSync(outPath, content, "utf8");
console.log(`Wrote ${outPath}`);
console.log(`Questions: ${QUESTIONS.length}, Categories: ${CATEGORIES.length}`);
