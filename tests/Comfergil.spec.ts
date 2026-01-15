import { test,expect } from '@playwright/test';
/**
 * FICHA 48200
 * CASO DE TESTE 1
 * Problema Detectado:
 * O sistema não está calculando corretamente o valor para gerar a base de cálculo e valor da comissão de indicadores
 * Ambiente 10.10.11.65
 * BANCO DE DADOS:Comfergil_Diego
 * 
 * RESULTADO ESPERADO APÓS CORREÇÃO DO BUG:
 * Base de Cálculo: R$ 106,72
 * Valor da Comissão: R$ 1,07
 */


test('FICHA 48200-Branch: 482002_marcio_ComissIndicadorOfertaDesc_Comfergil', async ({ page }) => {
  await page.goto('http://10.10.11.65:9999/Login');
  await page.locator('#Login_Usuario').click();
  await page.locator('#Login_Usuario').fill('microuni');
  await page.locator('#Login_Senha').click();
  await page.locator('#Login_Senha').fill('m');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Menu').click();
  await page.getByRole('link', { name: 'Venda' }).click();
  await page.locator('#senha-vendedor-input').fill('1');
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.locator('#PesquisaProdutos_Codigo').click();
  await page.locator('#PesquisaProdutos_Codigo').fill('03222');
  await page.getByRole('button', { name: 'Pesquisar', exact: true }).click();
  await page.getByRole('button', { name: 'Ok' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Inserção rápida do produto no' }).click();
  await page.getByRole('textbox', { name: 'Inserção rápida do produto no' }).fill('00918');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await page.locator('#Totalizador_PercentualDesconto').click();
  await page.locator('#Totalizador_PercentualDesconto').fill('11');
  await page.locator('#Totalizador_PercentualDesconto').press('Tab');
  await page.getByRole('link', { name: ' Cliente' }).click();
  await page.locator('#PesquisaCliente_CampoNome').click();
  await page.locator('#PesquisaCliente_CampoNome').fill('PEDRO KLEBIM SANTANA (HAGBEBB)');
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('PEDRO KLEBIM SANTANA (HAGBEBB)').click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('link', { name: ' Comissões' }).click()
  await page.getByRole('checkbox', { name: 'Não Relacionados' }).check();
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('NADYA ISABELINDA LIMA (').click();
  await page.locator('#pesquisaIndicador-campoPesquisaNomeIndicador').click();

  
  ///VALOR ESPERADO APÓS CORREÇÃO DO BUG
  await expect(page.locator('body')).toContainText('R$ 106,72');
  await expect(page.locator('body')).toContainText('R$ 1,07'); 


 
  //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
  });





 
/**
 * FICHA 48200
 * CASO DE TESTE 1
 * Problema Detectado:
 * O sistema não está calculando corretamente o valor para gerar a base de cálculo e valor da comissão de indicadores
 * Ambiente 10.10.11.65
 * BANCO DE DADOS:Comfergil_Diego
 * 
 * RESULTADO ESPERADO APÓS CORREÇÃO DO BUG:
 * Base de Cálculo: R$ 106,72
 * Valor da Comissão: R$ 1,07
 */

 test('FICHA 482002-Versão que o erro foi simulado:...: 5.91.9', async ({ page }) => {
  await page.goto('http://10.10.11.98:9999/Login');
  await page.locator('#Login_Usuario').click();
  await page.locator('#Login_Usuario').fill('microuni');
  await page.locator('#Login_Senha').click();
  await page.locator('#Login_Senha').fill('m');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Menu').click();
  await page.getByRole('link', { name: 'Venda' }).click();
  await page.locator('#senha-vendedor-input').fill('1');
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.locator('#PesquisaProdutos_Codigo').click();
  await page.locator('#PesquisaProdutos_Codigo').fill('03222');
  await page.getByRole('button', { name: 'Pesquisar', exact: true }).click();
  await page.getByRole('button', { name: 'Ok' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Inserção rápida do produto no' }).click();
  await page.getByRole('textbox', { name: 'Inserção rápida do produto no' }).fill('00918');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await page.locator('#Totalizador_PercentualDesconto').click();
  await page.locator('#Totalizador_PercentualDesconto').fill('11');
  await page.locator('#Totalizador_PercentualDesconto').press('Tab');
  await page.getByRole('link', { name: ' Cliente' }).click();
  await page.locator('#PesquisaCliente_CampoNome').click();
  await page.locator('#PesquisaCliente_CampoNome').fill('PEDRO KLEBIM SANTANA (HAGBEBB)');
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('PEDRO KLEBIM SANTANA (HAGBEBB)').click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('link', { name: ' Comissões' }).click()
  await page.getByRole('checkbox', { name: 'Não Relacionados' }).check();
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('NADYA ISABELINDA LIMA (').click();
  await page.locator('#pesquisaIndicador-campoPesquisaNomeIndicador').click();




  ///VALOR ESPERADO APÓS CORREÇÃO DO BUG
  await expect(page.locator('body')).toContainText('R$ 106,72');
  await expect(page.locator('body')).toContainText('R$ 1,07'); 


 
  //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
  }); 