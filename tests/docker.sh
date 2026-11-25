#!/usr/bin/env bash
# Run the browser tests in the official Playwright image: Chromium, Firefox and WebKit
# with all system libraries, no sudo needed. Arguments are passed to "playwright test".
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION=$(node -p "require('@playwright/test/package.json').version")
exec docker run --rm --ipc=host -u "$(id -u):$(id -g)" -e HOME=/tmp \
  -e SCREENSHOTS -e VISUAL -e CI -v "$PWD:/work" -w /work \
  "mcr.microsoft.com/playwright:v$VERSION-noble" npx playwright test "$@"
