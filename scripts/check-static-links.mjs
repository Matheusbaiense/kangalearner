import { readFile, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import process from "node:process";

const root = process.cwd();

function isExternalUrl(href) {
  return /^https?:\/\//i.test(href);
}

function isMailto(href) {
  return /^mailto:/i.test(href);
}

function isTel(href) {
  return /^tel:/i.test(href);
}

function isHashOnly(href) {
  return href.startsWith("#");
}

function stripQueryAndHash(p) {
  return p.split("#")[0].split("?")[0];
}

function extractAttrValues(html, attrName) {
  // Simple extractor: attrName="...".
  const re = new RegExp(`${attrName}\\s*=\\s*\"([^\"]+)\"`, "g");
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

async function fileExists(absPath) {
  try {
    await access(absPath);
    return true;
  } catch {
    return false;
  }
}

function isLikelyStaticAssetPath(p) {
  return (
    p.startsWith("assets/") ||
    p === "manifest.json" ||
    p === "sw.js" ||
    p === "robots.txt" ||
    p === "sitemap.xml" ||
    p === "CNAME" ||
    p === "_headers"
  );
}

async function main() {
  const indexPath = resolve(root, "index.html");
  const html = await readFile(indexPath, "utf8");

  const hrefs = extractAttrValues(html, "href");
  const srcs = extractAttrValues(html, "src");

  const allowedHashRoutes = new Set([
    // SPA pages (router.js)
    "home",
    "learn",
    "practice",
    "mock",
    "mock-results",
    "mock-run",
    "progress",
    "glossary",
    "resources",
    "about",
    "contact",
    // auth
    "login",
    "signup",
    "forgot-password",
    "reset-password",
    "verify-email",
    "auth-callback",
    "logout",
    "session-expired",
    // account
    "account",
    "profile",
    "settings",
    "security",
    "privacy-settings",
    "data-controls",
    "notifications",
    // premium
    "premium",
    "pricing",
    "billing",
    "upgrade-success",
    "upgrade-cancelled",
    // admin
    "admin",
    "admin-users",
    "admin-reports",
    "admin-content",
    "admin-support",
    "admin-data-requests",
    "admin-audit-log",
    // legal/trust
    "privacy-policy",
    "terms",
    "security-policy",
    "data-deletion",
    "not-official",
    "contact-support",
    // in-page sections on home
    "topics",
    "states",
    // common anchors
    "top"
  ]);

  const problems = [];
  const seen = new Set();

  function addProblem(kind, ref, detail) {
    const key = `${kind}::${ref}::${detail || ""}`;
    if (seen.has(key)) return;
    seen.add(key);
    problems.push({ kind, ref, detail });
  }

  // Validate src/href file paths that look local.
  for (const src of srcs) {
    if (!src || isExternalUrl(src) || isMailto(src) || isTel(src) || isHashOnly(src)) continue;
    const clean = stripQueryAndHash(src).replace(/^\/+/, "");
    if (!isLikelyStaticAssetPath(clean) && !clean.startsWith("src/")) continue; // allow Vite module too
    const abs = resolve(root, clean);
    if (!(await fileExists(abs))) addProblem("missing_file", src, abs);
  }

  for (const href of hrefs) {
    if (!href) continue;
    if (isExternalUrl(href) || isMailto(href) || isTel(href)) continue;
    if (isHashOnly(href)) continue; // SPA routes / in-page anchors

    const clean = stripQueryAndHash(href).replace(/^\/+/, "");
    if (!isLikelyStaticAssetPath(clean)) continue;
    const abs = resolve(root, clean);
    if (!(await fileExists(abs))) addProblem("missing_file", href, abs);
  }

  // In-page anchors: ensure any href="#id" points to an existing id in index.html.
  const idMatches = Array.from(html.matchAll(/\bid\s*=\s*"([^"]+)"/g)).map((m) => m[1]);
  const ids = new Set(idMatches);
  for (const href of hrefs) {
    if (!href || !href.startsWith("#")) continue;
    const id = href.slice(1);
    if (!id) continue;
    // allow hash routes that aren't DOM ids (router pages). Heuristic: if it contains "/" it's a route.
    if (id.includes("/")) continue;
    if (allowedHashRoutes.has(id)) continue;
    if (!ids.has(id)) addProblem("missing_anchor", href, "No matching id in index.html");
  }

  if (problems.length) {
    console.error("✗ Static link check failed:");
    for (const p of problems) {
      console.error(`- ${p.kind}: ${p.ref}${p.detail ? ` (${p.detail})` : ""}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("✓ Static link check OK");
}

await main();
