import { defineConfig, loadEnv } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

/** @param {string | undefined} raw */
function viteBaseFromEnv(raw) {
  if (!raw || raw === "/") return "/";
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "/") return "/";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

/**
 * Dev + production bundle for the root static SPA (hash router).
 * GitHub Pages continues to use the copy-based workflow in pages.yml;
 * this build targets Vercel or local preview (`pnpm site:build`).
 *
 * Set `VITE_BASE_PATH=/repo-name/` in CI so emitted asset URLs are root-absolute
 * (`/repo-name/assets/...`) and do not depend on runtime `<base>` injection.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const kangaEnv = {
    VITE_SUPABASE_URL: env.VITE_SUPABASE_URL || "",
    VITE_SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY || ""
  };
  const base = viteBaseFromEnv(process.env.VITE_BASE_PATH);

  return {
    base,
    root: ".",
    appType: "spa",
    plugins: [
      {
        name: "kl-inject-kanga-env",
        transformIndexHtml(html) {
          const inject = `<script>window.__KANGA_ENV__=${JSON.stringify(kangaEnv)};<\/script>`;
          return html.replace(/<head>/i, `<head>${inject}`);
        }
      },
      ...(base !== "/"
        ? [
            {
              name: "kl-absolute-asset-urls",
              transformIndexHtml: {
                order: "post",
                handler(html) {
                  return html
                    .replaceAll('src="assets/', `src="${base}assets/`)
                    .replaceAll("src='assets/", `src='${base}assets/`)
                    .replaceAll('href="assets/', `href="${base}assets/`)
                    .replaceAll("href='assets/", `href='${base}assets/`);
                }
              }
            }
          ]
        : []),
      viteStaticCopy({
        targets: [
          /** `dest: "."` keeps `assets/js/...` at `dist-vite/assets/js/...` (not `assets/assets/...`). */
          { src: "assets", dest: "." },
          { src: "manifest.json", dest: "." },
          { src: "sw.js", dest: "." },
          { src: "robots.txt", dest: "." },
          { src: "sitemap.xml", dest: "." },
          { src: "CNAME", dest: "." },
          { src: "_headers", dest: "." }
        ],
        watch: {
          reloadPageOnChange: true
        }
      })
    ],
    server: {
      port: 5173,
      strictPort: false
    },
    build: {
      outDir: "dist-vite",
      /** Keep Rollup chunks out of `/assets` so legacy `assets/**` copies to `dist-vite/assets/`. */
      assetsDir: "_vite",
      emptyOutDir: true,
      rollupOptions: {
        input: "index.html"
      }
    }
  };
});
