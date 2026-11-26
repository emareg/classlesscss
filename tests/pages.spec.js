import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';

const generated = readdirSync(new URL('../docs/tests/generated', import.meta.url))
  .filter((f) => f.endsWith('.html'))
  .map((f) => `tests/generated/${f}`);
const pages = ['index.html', 'tests/input-tests.html', ...generated];
const stylesheets = ['classless.css', 'classless-tiny.css'];


// Content (text, images, controls) which reaches beyond the viewport and cannot be
// scrolled to. body has "overflow-x: hidden", so such content is silently cut off.
// Boxes alone are not checked: a full-width background may extend off-screen on purpose.
function findClipped() {
  const width = document.documentElement.clientWidth;
  const contained = (el) => {
    for (let p = el; p && p !== document.body; p = p.parentElement)
      if (p !== el && getComputedStyle(p).overflowX !== 'visible' && p.getBoundingClientRect().right <= width + 1) return true;
    return false;
  };
  const items = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent.trim()) continue;
    const range = document.createRange();
    range.selectNodeContents(n);
    items.push([n.parentElement, range.getBoundingClientRect()]);
  }
  for (const el of document.body.querySelectorAll('img, svg, video, canvas, iframe, input, select, textarea, button, meter, progress'))
    items.push([el, el.getBoundingClientRect()]);
  return items
    .filter(([el, r]) => r.width > 1 && r.height > 1 && r.right > width + 1 && !el.closest('aside, math, script, style') && !contained(el))
    .map(([el, r]) => `<${el.localName} class="${el.getAttribute('class') ?? ''}"> +${Math.round(r.right - width)}px "${el.textContent.trim().slice(0, 40)}"`)
    .filter((v, i, all) => all.indexOf(v) === i)
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
