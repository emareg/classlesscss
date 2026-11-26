import { test, expect } from '@playwright/test';

// Docutils uses <aside> for footnotes and admonitions; they must not be hidden on narrow screens.
test('docutils: footnotes and admonitions stay visible', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 800 });
  await page.goto('/tests/generated/docutils.html');
  for (const aside of await page.locator('main aside').all()) await expect(aside).toBeVisible({ timeout: 1000 });
});
