import puppeteer from "puppeteer";

const url = process.argv[2];
if (!url) {
  console.error("Usage: smoke-static-site.puppeteer.mjs <url>");
  process.exit(2);
}

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const consoleErrors = [];
page.on("pageerror", (err) => consoleErrors.push(String(err)));
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const text = msg.text();
  // Ignore common noise for missing static assets in local smoke server (icons, favicons).
  if (text.includes("Failed to load resource: the server responded with a status of 404")) return;
  consoleErrors.push(text);
});

async function assertVisible(selector) {
  const el = await page.$(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  const box = await el.boundingBox();
  if (!box) throw new Error(`Not visible: ${selector}`);
}

async function assertHiddenByAttr(selector) {
  const val = await page.$eval(selector, (el) => el.hasAttribute("hidden"));
  if (!val) throw new Error(`Expected hidden attribute on ${selector}`);
}

async function assertNotHiddenByAttr(selector) {
  const val = await page.$eval(selector, (el) => el.hasAttribute("hidden"));
  if (val) throw new Error(`Expected NOT hidden attribute on ${selector}`);
}

async function assertPageRootRendered() {
  await page.waitForFunction(() => {
    const el = document.getElementById("page-root");
    return !!el && el.innerHTML.trim().length > 20;
  });
}

try {
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

  await assertVisible("#page-root");
  // quiz root exists but should start hidden on page routes
  await page.waitForSelector("#quiz-root");
  await assertHiddenByAttr("#quiz-root");

  // Wait for router boot
  await page.waitForFunction(
    () => typeof window.KL_ROUTER === "object" && typeof window.KL_PAGES === "object"
  );

  // Router should render something into page-root on #home
  await assertPageRootRendered();

  // Practice shows quiz-root and hides page-root
  await page.evaluate(() => (location.hash = "#practice"));
  await page.waitForFunction(() => {
    const el = document.getElementById("quiz-root");
    return !!el && !el.hasAttribute("hidden");
  });
  await assertVisible("#filter-bar");
  await assertVisible("#quiz-cards");

  // Mock page (page-root) visible again
  await page.evaluate(() => (location.hash = "#mock"));
  await sleep(250);
  await assertHiddenByAttr("#quiz-root");
  await assertVisible("#page-root");

  // Other pages render (basic existence checks)
  for (const hash of ["#progress", "#glossary", "#resources", "#about", "#contact", "#learn"]) {
    await page.evaluate((h) => (location.hash = h), hash);
    await assertPageRootRendered();
    await assertHiddenByAttr("#quiz-root");
  }

  // Learn detail route
  await page.evaluate(() => (location.hash = "#learn/speed-limits"));
  await assertPageRootRendered();

  // Refresh at hash restores route
  await page.evaluate(() => (location.hash = "#mock"));
  await assertPageRootRendered();
  await page.reload({ waitUntil: "networkidle2" });
  await page.waitForFunction(() => location.hash === "#mock");
  await assertPageRootRendered();

  // Back/forward works
  await page.evaluate(() => (location.hash = "#home"));
  await assertPageRootRendered();
  await page.goBack({ waitUntil: "networkidle2" });
  await page.waitForFunction(() => location.hash === "#mock");
  await assertPageRootRendered();
  await page.goForward({ waitUntil: "networkidle2" });
  await page.waitForFunction(() => location.hash === "#home");
  await assertPageRootRendered();

  if (consoleErrors.length) {
    throw new Error("Console errors detected:\n" + consoleErrors.join("\n"));
  }

  console.log("✓ Router + quiz smoke assertions passed");
} finally {
  await browser.close();
}
