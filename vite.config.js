import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

/**
 * Dev + production bundle for the root static SPA (hash router).
 * GitHub Pages continues to use the copy-based workflow in pages.yml;
 * this build targets Vercel or local preview (`pnpm site:build`).
 */
export default defineConfig({
  root: ".",
  appType: "spa",
  plugins: [
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
});
