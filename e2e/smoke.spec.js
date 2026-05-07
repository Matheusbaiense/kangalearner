// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("static site smoke", () => {
  test("home hero and brand visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hero")).toBeVisible();
    await expect(page.locator("#top .brand-wordmark")).toContainText("KangaLearner");
  });

  test("practice route shows quiz shell", async ({ page }) => {
    await page.goto("/#practice");
    await expect(page.locator("#quiz-root")).toBeVisible({ timeout: 20000 });
  });

  test("resources route: WA links and other states coming soon", async ({ page }) => {
    await page.goto("/#resources");
    await expect(page.locator("#page-root")).toContainText("Western Australia", { timeout: 20000 });
    await expect(page.locator("#page-root a.resource-link").first()).toHaveAttribute(
      "href",
      /transport\.wa\.gov\.au/
    );
    await expect(page.locator("#page-root .resource-card--disabled")).toHaveCount(7);
    const soonBtn = page.locator(".resource-coming-btn[disabled]").first();
    await expect(soonBtn).toBeVisible();
  });

  test("learn road rules: NSW coming soon opens practice empty state", async ({ page }) => {
    await page.goto("/#learn");
    await expect(page.locator("#road-rules .state-card.coming-soon[data-state='NSW']")).toBeVisible(
      {
        timeout: 20000
      }
    );
    await page.locator("#road-rules .state-card.coming-soon[data-state='NSW']").click();
    await expect(page.locator("#quiz-root .empty-state")).toBeVisible({ timeout: 20000 });
    await expect(page.locator("#quiz-root .empty-title")).toContainText(
      /coming soon|estarão disponíveis/i
    );
    await expect(page.locator('#quiz-root [data-action="empty-wa"]')).toBeVisible();
  });

  test("practice: first option can be chosen with keyboard", async ({ page }) => {
    await page.goto("/#practice");
    await expect(page.locator("#quiz-root")).toBeVisible({ timeout: 20000 });
    const firstOpt = page.locator("#quiz-root .qcard .opt").first();
    await expect(firstOpt).toBeVisible({ timeout: 20000 });
    await firstOpt.focus();
    await page.keyboard.press("Enter");
    await expect(firstOpt).toHaveAttribute("aria-checked", "true", { timeout: 5000 });
    const rg = page.locator("#quiz-root .qcard .opts[role='radiogroup']").first();
    await expect(rg).toBeVisible();
  });

  test("bilingual PT+EN and ES+EN: body mode, DW lang, no translation-line in header/footer", async ({
    page
  }) => {
    await page.goto("/#practice");
    await expect(page.locator("#quiz-root")).toBeVisible({ timeout: 20000 });
    await page.locator("#ld-trigger").click();
    await page.locator('.ld-option[data-lang="pten"]').click();
    await expect(page.locator("body")).toHaveClass(/mode-pt/);
    let info = await page.evaluate(() => ({
      dwLang: window.DW && window.DW.lang,
      tLang: window.KL_I18N && window.KL_I18N.getTranslationLang(window.DW && window.DW.lang)
    }));
    expect(info.dwLang).toBe("pten");
    expect(info.tLang).toBe("en");
    await expect(page.locator(".site-header .translation-line")).toHaveCount(0);
    await expect(page.locator("#site-footer-resources .translation-line")).toHaveCount(0);

    await page.locator("#ld-trigger").click();
    await page.locator('.ld-option[data-lang="esen"]').click();
    await expect(page.locator("body")).toHaveClass(/mode-es/);
    info = await page.evaluate(() => ({
      dwLang: window.DW && window.DW.lang,
      tLang: window.KL_I18N && window.KL_I18N.getTranslationLang(window.DW && window.DW.lang)
    }));
    expect(info.dwLang).toBe("esen");
    expect(info.tLang).toBe("en");
    await expect(page.locator(".site-header .translation-line")).toHaveCount(0);
    await expect(page.locator("#site-footer-resources .translation-line")).toHaveCount(0);
  });

  test("states hash routes into Learn road rules section", async ({ page }) => {
    await page.goto("/#states");
    await expect(page.locator('.main-nav a[href="#learn"]')).toHaveClass(/active/);
    await expect(page.locator("#road-rules")).toBeVisible({ timeout: 20000 });
  });

  test("learn hub renders stroke icons instead of emoji", async ({ page }) => {
    await page.goto("/#learn");
    await expect(page.locator(".learn-hub .learn-hub-icon svg").first()).toBeVisible({
      timeout: 20000
    });
  });

  test("responsive screenshots home", async ({ page }) => {
    const widths = [375, 768, 1024, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(page.locator(".hero")).toBeVisible();
      await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: false });
    }
  });
});
