import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // 🚫 NÃO rodar testes em paralelo
  fullyParallel: false,

  // 🚫 Apenas 1 navegador / 1 worker
  workers: 1,

  reporter: 'html',

  use: {
    viewport: { width: 1920, height: 1080 },

    // abre navegador com interface
    headless: false,

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
    },
  ],
});
