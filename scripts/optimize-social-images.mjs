/**
 * Gera variantes WebP/PNG para partilha social e ícones PWA (quando executado após G6).
 * Uso: node scripts/optimize-social-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const socialDir = path.join(root, "assets", "img", "social");
const brandDir = path.join(root, "assets", "img", "brand");

async function main() {
  const ogPng = path.join(socialDir, "og-image.png");
  if (!fs.existsSync(ogPng)) {
    console.error("Missing", ogPng);
    process.exit(1);
  }
  await sharp(ogPng).webp({ quality: 82 }).toFile(path.join(socialDir, "og-image.webp"));
  console.log("Wrote assets/img/social/og-image.webp");

  const markSvg = path.join(brandDir, "logo-mark.svg");
  if (fs.existsSync(markSvg)) {
    for (const size of [192, 512]) {
      const out = path.join(brandDir, `pwa-icon-${size}.png`);
      await sharp(markSvg).resize(size, size).png().toFile(out);
      console.log("Wrote", path.relative(root, out));
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
