// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * QA visual capture for I1 Auth/Account/Roles skeleton.
 * Outputs to test-results/ (gitignored).
 */
test.describe("qa screenshots — auth/account/premium/admin/legal", () => {
  test("capture key pages (desktop + mobile)", async ({ page }) => {
    await page.goto("/#login");
    await expect(page.locator("#kl-login-form")).toBeVisible({ timeout: 20000 });

    await page.evaluate(() => {
      localStorage.setItem("kl-mock-role", "guest");
    });

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#login");
    await page.screenshot({ path: "test-results/qa/en-login.png", fullPage: true });

    await page.locator("#ld-trigger").click();
    await page.locator('.ld-option[data-lang="pt"]').click();
    await page.goto("/#login");
    await page.screenshot({ path: "test-results/qa/pt-login.png", fullPage: true });

    await page.locator("#ld-trigger").click();
    await page.locator('.ld-option[data-lang="es"]').click();
    await page.goto("/#login");
    await page.screenshot({ path: "test-results/qa/es-login.png", fullPage: true });

    await page.locator("#ld-trigger").click();
    await page.locator('.ld-option[data-lang="en"]').click();
    await page.goto("/#signup");
    await expect(page.locator("#kl-signup-form")).toBeVisible({ timeout: 20000 });
    await page.screenshot({ path: "test-results/qa/en-signup.png", fullPage: true });

    // Set mock user for account/settings/security/privacy/data-controls
    await page.evaluate(() => {
      localStorage.setItem("kl-mock-role", "user");
    });

    await page.goto("/#account");
    await page.screenshot({ path: "test-results/qa/en-account.png", fullPage: true });

    await page.goto("/#settings");
    await page.screenshot({ path: "test-results/qa/en-settings.png", fullPage: true });

    await page.goto("/#security");
    await page.screenshot({ path: "test-results/qa/en-security.png", fullPage: true });

    await page.goto("/#privacy-settings");
    await page.screenshot({ path: "test-results/qa/en-privacy-settings.png", fullPage: true });

    await page.goto("/#data-controls");
    await page.screenshot({ path: "test-results/qa/en-data-controls.png", fullPage: true });

    await page.goto("/#privacy-policy");
    await page.screenshot({ path: "test-results/qa/en-privacy-policy.png", fullPage: true });

    await page.goto("/#terms");
    await page.screenshot({ path: "test-results/qa/en-terms.png", fullPage: true });

    // Mobile captures
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#login");
    await page.screenshot({ path: "test-results/qa/mobile-login.png", fullPage: true });

    await page.goto("/#signup");
    await page.screenshot({ path: "test-results/qa/mobile-signup.png", fullPage: true });

    await page.evaluate(() => {
      localStorage.setItem("kl-mock-role", "user");
    });
    await page.goto("/#settings");
    await page.screenshot({ path: "test-results/qa/mobile-settings.png", fullPage: true });
  });
});
