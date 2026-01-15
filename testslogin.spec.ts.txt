import { test, expect } from '@playwright/test';

test('Abrir tela de login', async ({ page }) => {
  // 1. Acessa a URL
  await page.goto('http://10.10.11.65:9999/Login');

  // 2. Aguarda a página carregar
  await page.waitForLoadState('networkidle');

  // 3. Valida que a URL é a correta
  await expect(page).toHaveURL(/Login/);

  // 4. Exemplo de validação visual básica
  await expect(page).toHaveTitle(/login/i);
});
