import { execSync } from "node:child_process";
import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
mkdirSync(join(dist, "assets", "css"), { recursive: true });
mkdirSync(join(dist, "assets", "js", "data"), { recursive: true });
mkdirSync(join(dist, "assets", "icons"), { recursive: true });
mkdirSync(join(dist, "assets", "img"), { recursive: true });

cpSync(join(root, "assets", "icons"), join(dist, "assets", "icons"), { recursive: true });
cpSync(join(root, "assets", "img"), join(dist, "assets", "img"), { recursive: true });

execSync(
  "npx cleancss -o dist/assets/css/tokens.css assets/css/tokens.css && npx cleancss -o dist/assets/css/base.css assets/css/base.css && npx cleancss -o dist/assets/css/components.css assets/css/components.css && npx cleancss -o dist/assets/css/quiz.css assets/css/quiz.css",
  { stdio: "inherit" }
);

execSync(
  "npx terser assets/js/app.js -c -m -o dist/assets/js/app.js && npx terser assets/js/quiz-engine.js -c -m -o dist/assets/js/quiz-engine.js && npx terser assets/js/data/questions.js -c -m -o dist/assets/js/data/questions.js",
  { stdio: "inherit" }
);

const minifiedHtml = execSync(
  "npx html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true index.html",
  { encoding: "utf8" }
);
writeFileSync(join(dist, "index.html"), minifiedHtml, "utf8");

const srcHtml = readFileSync(join(root, "index.html"), "utf8");
if (!srcHtml.includes("assets/js/data/questions.js")) {
  throw new Error("Unexpected HTML structure while building.");
}

console.log("Build completed: dist/");
