// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout : 30*1000,
  expect : {
    timeout : 5000,
  },
  reporter : 'html',
  use: {
    browserName : 'chromium',
    headless : false,
    actionTimeout: 15*1000,
    navigationTimeout: 30*1000,
   
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  });

