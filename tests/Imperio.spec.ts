import { test,expect } from '@playwright/test';

/**
 * FICHA 482462
 * CASO DE TESTE 1
 * Problema Detectado:
 * OrcaWeb não está validando telefone dos clientes.
 * Ambiente: 10.10.11.65
 * BANCO DE DADOS: Imperio_Diego
 * Versão: Branch 482462_marcio_outrSaida_Imperio
 *
 * RESULTADO ESPERADO:
 * Não ocorrerá mais o errro ao digitar a senha após ter seçionado o cliente na venda.
 * 
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
  await page.locator('#Login_Senha').press('Enter');
}

async function abrirvenda(page) {
  await page.getByText('Menu').click();
  await page.getByRole('link', { name: 'Venda', exact: true }).click();
  await page.locator('#senha-vendedor-input').fill('1');
  await page.locator('#senha-vendedor-input').press('Enter');
}
  
async function pesquisarcliente(page,cliente) {
  await page.locator('#PesquisaCliente_CpfCnpj').click();
  await page.locator('#PesquisaCliente_CpfCnpj').fill(cliente);
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('DEBORAH SERGIAO DUARTE (CJFBJCA)').click();
  await page.locator('#OrcamentoEmAberto_CampoSenha').click();
  await page.locator('#OrcamentoEmAberto_CampoSenha').fill('1');
  await page.locator('#VendedorRelacionado_CampoSenha').click();
  await page.locator('#VendedorRelacionado_CampoSenha').fill('1');
  await page.getByRole('button', { name: 'Ok' }).click();
 
  
  
  
// Aguarda página carregar
  await page.waitForLoadState('networkidle', { timeout: 10000 });
// Aguarda botão Salvar
const botaoSalvar = page.getByRole('button', { name: 'Salvar'});
  await botaoSalvar.waitFor({ state: 'visible' });
// Clica
  await botaoSalvar.click();
 
}

async function ValidarMensagemRegistroAtualizadoComSucesso(page) {
// Valida MENSAGEM DE SUCESSO
  
  await expect(page.locator('body')).toContainText('Registro atualizado com sucesso!');
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
}


  test('CASO DE TESTE 1', async ({ page }) => {
  await fazerLogin(page,'VENDAS01','1234');
  await abrirvenda(page);
  await pesquisarcliente(page,'459.280.616-68');
  await ValidarMensagemRegistroAtualizadoComSucesso(page);
  
}); 
   


/**
 * FICHA 475854
 * CASO DE TESTE 2
 * Problema Detectado:
 * OrcaWeb não está validando telefone dos clientes.
 * Ambiente: 10.10.11.98
 * BANCO DE DADOS: Imperio_Diego
 * Versão: 5.91.12
 *
 * RESULTADO ESPERADO:
 * Irá ocorrer o errro ao digitar a senha após ter seçionado o cliente na venda.
 * 
 */
/* =========================
   FUNÇÕES AUXILIARES
   ========================= */

  async function fazerLogin2(page,usuario,senha) {
  await page.goto('http://10.10.11.98:9999/Login');
  await page.locator('#Login_Usuario').click();
  await page.locator('#Login_Usuario').fill(usuario);
  await page.locator('#Login_Senha').click();
  await page.locator('#Login_Senha').fill(senha);
  await page.locator('#Login_Senha').press('Enter');
}

async function abrirvenda2(page) {
  await page.getByText('Menu').click();
  await page.getByRole('link', { name: 'Venda', exact: true }).click();
  await page.locator('#senha-vendedor-input').fill('1');
  await page.locator('#senha-vendedor-input').press('Enter');
}
  
async function pesquisarcliente2(page,cliente) {
  await page.locator('#PesquisaCliente_CpfCnpj').click();
  await page.locator('#PesquisaCliente_CpfCnpj').fill(cliente);
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('DEBORAH SERGIAO DUARTE (CJFBJCA)').click();
  await page.locator('#OrcamentoEmAberto_CampoSenha').click();
  await page.locator('#OrcamentoEmAberto_CampoSenha').fill('1');
  await page.locator('#VendedorRelacionado_CampoSenha').click();
  await page.locator('#VendedorRelacionado_CampoSenha').fill('1');
  await page.getByRole('button', { name: 'Ok' }).click();
 
  
  
  
// Aguarda página carregar
  await page.waitForLoadState('networkidle', { timeout: 10000 });
// Aguarda botão Salvar
const botaoSalvar = page.getByRole('button', { name: 'Salvar'});
  await botaoSalvar.waitFor({ state: 'visible' });
// Clica
  await botaoSalvar.click();
 
}

async function ValidarMensagemRegistroAtualizadoComSucesso2(page) {
// Valida MENSAGEM DE SUCESSO
  
  await expect(page.locator('body')).toContainText('Registro atualizado com sucesso!');
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
}


  test('CASO DE TESTE 2', async ({ page }) => {
  await fazerLogin2(page,'VENDAS01','1234');
  await abrirvenda2(page);
  await pesquisarcliente2(page,'459.280.616-68');
  await ValidarMensagemRegistroAtualizadoComSucesso2(page);
  
}); 
    