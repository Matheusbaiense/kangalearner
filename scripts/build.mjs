import { execSync } from "node:child_process";
import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

// PRÉ-BUILD — validar estrutura do index.html antes de tocar em dist/
const srcHtml = readFileSync(join(root, "index.html"), "utf8");
const requiredRefs = [
  "assets/js/storage.js",
  "assets/js/locales.js",
  "assets/js/data/questions-loader.js",
  "assets/js/data/learn-topics.js",
  "assets/js/pages/home-page.js",
  "assets/js/pages/learn-page.js",
  "assets/js/pages/mock-page.js",
  "assets/js/pages/progress-page.js",
  "assets/js/pages/glossary-page.js",
  "assets/js/pages/resources-page.js",
  "assets/js/router.js",
  "assets/js/app.js"
];
for (const ref of requiredRefs) {
  if (!srcHtml.includes(ref)) {
    throw new Error(
      `PRÉ-BUILD FALHOU: "${ref}" não encontrado no index.html — abortando antes de limpar dist/`
    );
  }
}
console.log("✓ Pré-build: estrutura do HTML validada");

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
mkdirSync(join(dist, "assets", "css"), { recursive: true });
mkdirSync(join(dist, "assets", "js", "pages"), { recursive: true });
mkdirSync(join(dist, "assets", "js", "data"), { recursive: true });
mkdirSync(join(dist, "assets", "icons"), { recursive: true });
mkdirSync(join(dist, "assets", "img"), { recursive: true });

cpSync(join(root, "assets", "icons"), join(dist, "assets", "icons"), { recursive: true });
cpSync(join(root, "assets", "img"), join(dist, "assets", "img"), { recursive: true });

execSync(
  "npx cleancss -o dist/assets/css/tokens.css assets/css/tokens.css && npx cleancss -o dist/assets/css/base.css assets/css/base.css && npx cleancss -o dist/assets/css/components.css assets/css/components.css && npx cleancss -o dist/assets/css/quiz.css assets/css/quiz.css && npx cleancss -o dist/assets/css/pages.css assets/css/pages.css",
  { stdio: "inherit" }
);

execSync(
  [
    "npx terser assets/js/storage.js -c -m -o dist/assets/js/storage.js",
    "&& npx terser assets/js/locales.js -c -m -o dist/assets/js/locales.js",
    "&& npx terser assets/js/router.js -c -m -o dist/assets/js/router.js",
    "&& npx terser assets/js/pages/home-page.js -c -m -o dist/assets/js/pages/home-page.js",
    "&& npx terser assets/js/pages/learn-page.js -c -m -o dist/assets/js/pages/learn-page.js",
    "&& npx terser assets/js/pages/mock-page.js -c -m -o dist/assets/js/pages/mock-page.js",
    "&& npx terser assets/js/pages/progress-page.js -c -m -o dist/assets/js/pages/progress-page.js",
    "&& npx terser assets/js/pages/glossary-page.js -c -m -o dist/assets/js/pages/glossary-page.js",
    "&& npx terser assets/js/pages/resources-page.js -c -m -o dist/assets/js/pages/resources-page.js",
    "&& npx terser assets/js/app.js -c -m -o dist/assets/js/app.js",
    "&& npx terser assets/js/quiz-engine.js -c -m -o dist/assets/js/quiz-engine.js",
    "&& npx terser assets/js/learn-engine.js -c -m -o dist/assets/js/learn-engine.js",
    "&& npx terser assets/js/data/questions-loader.js -c -m -o dist/assets/js/data/questions-loader.js",
    "&& npx terser assets/js/data/questions.js -c -m -o dist/assets/js/data/questions.js",
    "&& npx terser assets/js/data/learn-topics.js -c -m -o dist/assets/js/data/learn-topics.js"
  ].join(" "),
  { stdio: "inherit" }
);

const minifiedHtml = execSync(
  "npx html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true index.html",
  { encoding: "utf8" }
);
writeFileSync(join(dist, "index.html"), minifiedHtml, "utf8");

console.log("Build completed: dist/");
