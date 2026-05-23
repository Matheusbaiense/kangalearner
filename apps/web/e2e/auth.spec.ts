import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should show login and signup forms', async ({ page }) => {
    // Navigate to login
    await page.goto('/auth/login');
    await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();

    // Navigate to signup
    await page.goto('/auth/signup');
    await expect(page.getByRole('heading', { name: /Create your account/i })).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
  });
});
