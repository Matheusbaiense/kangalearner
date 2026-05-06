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

  test("resources route renders official sources block", async ({ page }) => {
    await page.goto("/#resources");
    await expect(page.locator("#page-root")).toContainText(
      /Western Australia|New South Wales|Official/i,
      {
        timeout: 20000
      }
    );
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
