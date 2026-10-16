const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  timeout: 120000,
  use: {
    baseURL: 'http://127.0.0.1:8088',
    viewport: { width: 430, height: 932 },
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chromium',
  },
  webServer: {
    command: 'npx expo start --web --port 8088',
    url: 'http://127.0.0.1:8088',
    reuseExistingServer: true,
    timeout: 180000,
  },
});
