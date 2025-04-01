import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    timeout: 0,
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});