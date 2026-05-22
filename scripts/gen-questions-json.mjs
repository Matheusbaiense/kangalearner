import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "apps/web/public/data");
const outFile = join(outDir, "questions.json");

execSync(
  `pnpm exec tsx -e "import { QUESTIONS } from './packages/core/src/index.ts'; import { writeFileSync, mkdirSync } from 'fs'; mkdirSync('${outDir.replace(/\\/g, "/")}', { recursive: true }); writeFileSync('${outFile.replace(/\\/g, "/")}', JSON.stringify(QUESTIONS)); console.log('Wrote', QUESTIONS.length, 'questions');"`,
  { cwd: root, stdio: "inherit", shell: true }
);
