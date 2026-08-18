import { expect, test } from "@playwright/test";
import { assertNotProductionTarget, readStagingLogin } from "../src/lib/e2e/stagingAuth";

const login = readStagingLogin();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

function isSmokeB(email: string): boolean {
  return email.trim().toLowerCase().startsWith("smoke-b@");
}

test.describe("staging auth (6.2)", () => {
  test.beforeAll(() => {
    if (!login) return;
    assertNotProductionTarget({
      baseUrl: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
      supabaseUrl
    });
  });

  test("login cookie reaches /dashboard; logout returns to login", async ({ page }) => {
    test.skip(
      !login,
      "Set E2E_STAGING_EMAIL + E2E_STAGING_PASSWORD (smoke-a@ fixture) against staging, never prod"
    );

    await page.goto("/auth/login");
    await page.getByLabel(/Email/i).fill(login!.email);
    await page.getByLabel(/Password/i).fill(login!.password);
    await page.getByRole("button", { name: /Sign in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });

    await page.getByRole("button", { name: /Account/i }).click();
    await page.getByRole("menuitem", { name: /Sign out/i }).click();
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test("free user gets 403 on admin API", async ({ page }) => {
    test.skip(!login, "Set E2E_STAGING_EMAIL + E2E_STAGING_PASSWORD");
    test.skip(!!login && isSmokeB(login.email), "Use smoke-a@ (free user), not smoke-b@ admin");

    await page.goto("/auth/login");
    await page.getByLabel(/Email/i).fill(login!.email);
    await page.getByLabel(/Password/i).fill(login!.password);
    await page.getByRole("button", { name: /Sign in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });

    const res = await page.request.get("/api/admin/users");
    expect(res.status()).toBe(403);
  });
});
