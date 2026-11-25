import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';

const generated = readdirSync(new URL('../docs/tests/generated', import.meta.url))
  .filter((f) => f.endsWith('.html'))
  .map((f) => `tests/generated/${f}`);
const pages = ['index.html', 'tests/input-tests.html', ...generated];
const stylesheets = ['classless.css', 'classless-tiny.css'];

// Elements which reach beyond the viewport and cannot be scrolled to. body has
// "overflow-x: hidden", so such content is silently cut off.
function findClipped() {
  const width = document.documentElement.clientWidth;
  const contained = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement)
      if (getComputedStyle(p).overflowX !== 'visible' && p.getBoundingClientRect().right <= width + 1) return true;
    return false;
  };
  return [...document.body.querySelectorAll('*')]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 1 && r.height > 1 && r.right > width + 1 && !el.closest('aside, math') && !contained(el);
    })
    .map((el) => `<${el.localName} class="${el.getAttribute('class') ?? ''}"> +${Math.round(el.getBoundingClientRect().right - width)}px "${el.textContent.trim().slice(0, 40)}"`)
    .slice(0, 8);
}

// keep the tests offline and deterministic
test.beforeEach(async ({ page }) => {
  await page.route((url) => url.hostname !== '127.0.0.1', (route) => route.abort());
});

for (const css of stylesheets) {
  test.describe(css, () => {
    for (const path of pages) {
      test(path, async ({ page }, info) => {
        if (process.env.VISUAL) test.slow();
        const errors = [];
        // index.html needs CDN scripts, which are blocked here
        if (path !== 'index.html') page.on('pageerror', (e) => errors.push(e.message));
        page.on('response', (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
        if (css !== 'classless.css')
          await page.route('**/classless.css', async (route) =>
            route.fulfill({ response: await route.fetch({ url: route.request().url().replace('classless.css', css) }) }));

        await page.goto(`/${path}`);
        const applied = await page.evaluate(() => getComputedStyle(document.body).maxWidth);
        expect(applied, 'stylesheet is applied').not.toBe('none');
        expect(errors).toEqual([]);

        if (process.env.SCREENSHOTS) {
          // WebKit cannot capture images higher than 32767px: cut very long pages
          const { width, height } = await page.evaluate(() => ({ width: innerWidth, height: document.documentElement.scrollHeight }));
          await page.screenshot({
            path: `screenshots/${info.project.name}/${css.replace('.css', '')}/${path.replace(/\W+/g, '-')}.png`,
            fullPage: true,
            scale: 'css',
            clip: { x: 0, y: 0, width, height: Math.min(height, 30000) },
          });
        }
        // opt-in pixel comparison against locally created baselines
        if (process.env.VISUAL)
          // the long timeout is needed for index.html in Firefox
          await expect(page).toHaveScreenshot(`${css}-${path.replace(/\W+/g, '-')}.png`, { fullPage: true, timeout: 30_000 });

        expect(await page.evaluate(findClipped), 'no content is cut off horizontally').toEqual([]);
      });
    }
  });
}
