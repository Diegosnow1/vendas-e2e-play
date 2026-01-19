import { test,expect } from '@playwright/test';

/**
 * FICHA 475854
 * CASO DE TESTE 1
 * Problema Detectado:
 * OrcaWeb não está validando telefone dos clientes.
 * Ambiente: 10.10.11.65
 * BANCO DE DADOS: Comfergil_Diego
 * Versão: Branch 475854_Jeremias_ValidarTelefoneCliente_Clube_da_Casa_Silca
 *
 * RESULTADO ESPERADO:
 * Não será mais possível cadastrar telefone ou celular inválidos no cadastro do cliente.
 * Caso exista telefone inválido, o sistema deve impedir a finalização e exibir mensagem.
 */
/* =========================
   FUNÇÕES AUXILIARES
   ========================= */

async function fazerLogin(page,usuario,senha) {
  await page.goto('http://10.10.11.65:9999/Login');
  await page.locator('#Login_Usuario').click();
  await page.locator('#Login_Usuario').fill(usuario);
  await page.locator('#Login_Senha').click();
  await page.locator('#Login_Senha').fill(senha);
  await page.getByRole('button', { name: 'Entrar' }).click();
}

async function abrirvenda(page) {
  await page.locator('#abrirMenuPrincipal').click();
  await page.getByRole('link', { name: 'Venda', exact: true }).click();
  await page.locator('#senha-vendedor-input').click();
  await page.locator('#senha-vendedor-input').fill('1');
  await page.locator('#senha-vendedor-input').press('Enter');
  await page.getByRole('button', { name: 'Entrar' }).click();
}
  
async function pesquisarcliente(page,cliente) {
  await page.locator('#PesquisaCliente_CpfCnpj').click();
  await page.locator('#PesquisaCliente_CpfCnpj').fill(cliente);
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('DEBORAH SERGIAO DUARTE (CJFBJCA)').click();
// Aguarda página carregar
  await page.waitForLoadState('networkidle');
// Aguarda botão Salvar
const botaoSalvar = page.locator('#AbasPesquisaClienteContainer_BotaoSalvar');
  await botaoSalvar.waitFor({ state: 'visible' });
// Clica
  await botaoSalvar.click();
}

async function validarErroTelefone(page) {
// Valida erro
  await expect(page.locator('body')).toContainText('O campo "Telefone" é inválido.');
  await expect(page.locator('body')).toContainText('O campo "Celular" é inválido.');
}

  test('CASO DE TESTE 1', async ({ page }) => {
  await fazerLogin(page,'VENDAS01','1234');
  await abrirvenda(page);
  await pesquisarcliente(page,'459.280.616-68');
  await validarErroTelefone(page);
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
}); 
   


/**
 * FICHA 475854
 * CASO DE TESTE 1
 * Problema Detectado:
 * OrcaWeb não está validando telefone dos clientes.
 * Ambiente: 10.10.11.65
 * BANCO DE DADOS: Comfergil_Diego
 * Versão: 5.84.5
 *
 * RESULTADO ESPERADO:
 * Não será mais possível cadastrar telefone ou celular inválidos no cadastro do cliente.
 * Caso exista telefone inválido, o sistema deve impedir a finalização e exibir mensagem.
 */
/* =========================
   FUNÇÕES AUXILIARES
   ========================= */

/*  async function fazerLogin2(page,usuario) {
  await page.goto('http://10.10.11.98:9999/Login');
  await page.locator('#Login_Usuario').click();
  await page.locator('#Login_Usuario').fill(usuario);
  await page.locator('#Login_Senha').click();
  await page.locator('#Login_Senha').fill('m');
  await page.getByRole('button', { name: 'Entrar' }).click();
}

async function abrirvenda2(page) {
  await page.locator('#abrirMenuPrincipal').click();
  await page.getByRole('link', { name: 'Venda', exact: true }).click();
  await page.locator('#senha-vendedor-input').click();
  await page.locator('#senha-vendedor-input').fill('1');
  await page.locator('#senha-vendedor-input').press('Enter');
  await page.getByRole('button', { name: 'Entrar' }).click();
}
  
async function pesquisarcliente2(page,cliente) {
  await page.locator('#PesquisaCliente_CpfCnpj').click();
  await page.locator('#PesquisaCliente_CpfCnpj').fill(cliente);
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('Thiago Jose Ferreira').click();
// Aguarda página carregar
  await page.waitForLoadState('networkidle');
// Aguarda botão Salvar
const botaoSalvar = page.locator('#AbasPesquisaClienteContainer_BotaoSalvar');
  await botaoSalvar.waitFor({ state: 'visible' });
// Clica
  await botaoSalvar.click();
}

async function validarErroTelefone2(page) {
// Valida erro
  await expect(page.locator('body')).toContainText('O campo "Telefone" é inválido.');
  await expect(page.locator('body')).toContainText('O campo "Celular" é inválido.');
}

  test('CASO DE TESTE 2', async ({ page }) => {
  await fazerLogin2(page,'VENDAS01');
  await abrirvenda2(page);
  await pesquisarcliente2(page,'039.746.201-84_');
  await validarErroTelefone2(page);
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
});
    */