import { defineConfig, devices } from '@playwright/test';

process.loadEnvFile('.env');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    process.env.CI
      ? [
          './node_modules/playwright-slack-report/dist/src/SlackReporter.js',
          {
            slackWebHookUrl: process.env.SLACK_WEBHOOK_URL,
            sendResults: 'always',
          },
        ]
      : ['null'],
  ],
  use: {
    trace: 'on',
    testIdAttribute: 'data-test',
  },
  expect: {
    timeout: 10_000,
  },
  timeout: 60_000,

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
