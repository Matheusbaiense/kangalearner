import { expect, test } from "@playwright/test";

test.describe("public smoke", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/KangaLearner/i);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("practice page loads", async ({ page }) => {
    await page.goto("/practice");
    await expect(page).toHaveTitle(/Practice/i);
    await expect(page.locator(".app-page").first()).toBeVisible();
  });

  test("mock test setup loads", async ({ page }) => {
    await page.goto("/mock-test");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("guest can open mock test session", async ({ page }) => {
    await page.goto("/mock-test/session");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("login page loads", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("protected dashboard redirects unauthenticated users", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test("admin API rejects unauthenticated access", async ({ request }) => {
    const res = await request.get("/api/admin/users");
    expect([401, 403]).toContain(res.status());
  });
});
