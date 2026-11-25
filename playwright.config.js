import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  testMatch: '*.spec.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:8123' },
  webServer: {
    command: 'npx http-server docs -p 8123 -a 127.0.0.1 -s -c-1',
    url: 'http://127.0.0.1:8123/classless.css',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] },
    { name: 'webkit', use: devices['Desktop Safari'] },
    { name: 'mobile-chrome', use: devices['Pixel 7'] },
    { name: 'mobile-safari', use: devices['iPhone 14'] },
  ],
});
