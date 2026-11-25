import { test, expect } from '@playwright/test';

// Docutils uses <aside> for footnotes and admonitions. classless.css treats "main aside"
// as optional margin note and hides it below 70rem, so this content disappears.
test('docutils: footnotes and admonitions stay visible', async ({ page }) => {
  test.fail(true, 'known issue: "main aside" is hidden on narrow screens');
  await page.setViewportSize({ width: 800, height: 800 });
  await page.goto('/tests/generated/docutils.html');
  for (const aside of await page.locator('main aside').all()) await expect(aside).toBeVisible({ timeout: 1000 });
});
