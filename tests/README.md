# Tests

```bash
npm install
npx playwright install chromium   # once

npm test               # lint + Chromium desktop and mobile
npm run test:docker    # Chromium, Firefox, WebKit, mobile Chrome and Safari (needs Docker)
npm run screenshots    # same, and save every page to screenshots/<browser>/<css>/
npx playwright show-report
```

## What is checked

| Step | Checks |
|------|--------|
| `lint:structure` | line budget, numbered table of contents, list of feature blocks, each block deletable on its own |
| `lint:css` | unknown properties, values, units, selectors; no style/formatting rules |
| `lint:html` | validity of all HTML pages in `docs/` |
| `pages.spec.js` | every page with full and tiny CSS and the variants in `docs/tests/variants/`: stylesheet loads, no missing files or script errors, no text, image or control cut off horizontally |
| `content.spec.js` | content which must not disappear |

External requests are blocked, so the tests run offline (after installation).

After adding, renaming or removing a CSS block on purpose: `node tests/css-structure.js --update`.
The line budgets are in `css-structure.json`.

The deletability check is static: it proves that removing a block leaves valid CSS,
not that the remaining blocks look the same.

## Visual regression (optional)

Pixel baselines depend on fonts and platform, so they are created locally and not committed.
Run before and after a CSS change:

```bash
VISUAL=1 tests/docker.sh --update-snapshots   # before: create baselines
VISUAL=1 tests/docker.sh                      # after: compare
```


## Test pages

`docs/tests/generated/` contains real generator output from the sources in `src/`,
linked to the stylesheet. Open `docs/tests/index.html` to browse them.
Regenerate with `npm run generate` (all) or `tests/generate.sh hugo` (one).
This needs pandoc, node, uv and Docker (Jekyll); versions are pinned in `generate.sh`,
except pandoc, which is taken from your system.

Hugo, Eleventy, Jekyll, MkDocs and nbconvert use a minimal page template
(`<main><article>`), not one of their themes. Pandoc, Docutils and Asciidoctor use their
default templates; Sphinx uses its `basic` theme without its stylesheets.

## Style variants

`docs/tests/variants/` holds experimental replacements for `classless.css`
(Prash, Calm, Ink) and a copy of the demo page with a variant menu
(`variants/index.html?v=calm`). They keep the structure of `classless.css`, which
`lint:structure` checks with a budget of 480 lines each, and the same theme variables.
The browser tests run every page with every variant.

## Browser coverage

Playwright WebKit is close to, but not the same as, Safari on macOS/iOS; mobile projects
are emulations. Edge shares Chromium's engine. IE11 is not covered.
