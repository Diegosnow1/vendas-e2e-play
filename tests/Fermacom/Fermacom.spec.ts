/**
 * FICHA 475854
 * CASO DE TESTE 1
 * Problema Detectado:
 * OrcaWeb não está validando telefone dos clientes.
 * Ambiente: 10.10.11.109
 * BANCO DE DADOS: Fermacom_Diego
 * Versão: Branch 475854_Jeremias_ValidarTelefoneCliente_Clube_da_Casa_Silca

 * OBJETIVOS DO TESTES:
 * CASO DE TESTE 1º:
 -Validar campos (telefone e celular) com dados vazios.
 * CASO DE TESTE 2º:
 -Validar campos (telefone e celular) com dados válidos 
 * CASO DE TESTE 3º:
 -Validar campos (telefone e celular) com dados inválidos 
 * CASO DE TESTE 4º:
 -Validar sobrescrita com CTRL+A no campo telefone e celular.
 * CASO DE TESTE 5º:
 -Finalizar o pedido como orcamento confirmado
 
 * RESULTADO ESPERADO:

  * CASO DE TESTE 1º
 - Usuario conseguira salvar os dados do cliente ao clicar no botão salvar, mensagem na cor verde, relatando o  sucesso sera exibida.
  * CASO DE TESTE 2º
 - Usuario conseguira salvar os dados do cliente ao clicar no botão salvar, mensagem na cor verde, relatando o  sucesso sera exibida.
  * CASO DE TESTE 3º
 - Usuario não conseguira salvar os dados do cliente ao clicar no botão salvar, uma mensagem em vermelho com os erros de validação sera exibida.
  * CASO DE TESTE 4
 -Utilizar o recurso de  selecionar tudo e logo conseguir  subscrever em cima do texto selecioando.
  * CASO DE TESTE 5º:
 -salvar oçamento sem erros como confirmado.
  * CASO DE TESTE 6º:
 -finalizar orçamento com o campo telefone inválido,com 10 digitos já salvo no banco VIA SCRIPT, mensagem de erro informando que o celular do cliente é inválido sera exibida, impedindo a finalização do orçamento.
 
/* =========================
   COMANDOS SQL  AUXILIARES
select   * from COMUNICACAO_R where RITEM = '7810233'
select   * from ITEM  where OID =  7810233
select  * from PESSOAFISICA_R  WHERE NOME LIKE '%THIAGO%'
UPDATE COMUNICACAO_R  SET VALOR = '(33)99872-00' where RITEM = '7810233'  ---and OID = '9072487'
delete from COMUNICACAO_R  where RITEM = '7810233'
UPDATE ITEMFILEST SET quant = '1000.00' WHERE codpro = '00012'
   ========================= */


  import { selectors, test, expect } from '@playwright/test';
  import { atualizarTelefoneCliente } from '../utils/database';

// estende tempo limite para casos demorados (carregamento lento do ERP)
test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
  await selectors.setTestIdAttribute("id");
  await page.goto('localhost:9999/Login');
  await page.getByTestId('Login_Usuario').fill('vendas01');
  await page.getByTestId('Login_Usuario').press('Tab');
  await page.getByTestId('Login_Senha').fill('m');
  await page.getByTestId('Login_Senha').press('Enter');
  await page.getByTestId('abrirMenuPrincipal').click({ force: true });
  const orcamento = page.getByTestId('MenuPrincipal_OrcamentoVenda');
  await orcamento.scrollIntoViewIfNeeded();            // ⬅️ garante visibilidade
  await orcamento.click();                             // sem erro de viewport
  await page.getByTestId('senha-vendedor-input').fill('1');
  await page.getByTestId('senha-vendedor-input').press('Enter');
  await page.getByTestId('iniciar-orcamento-botao-entrar').click();
  // aguarda o formulário de pesquisa de cliente ficar visível antes de prosseguir
  await expect(page.getByTestId('PesquisaCliente_CampoNome')).toBeVisible({ timeout: 10000 });
  });



  test('CT01 - telefone e celular vazios', async ({ page }) => {
  // pesquisar cliente e aguardar resultado
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('thiago jose ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await expect(page.getByTestId('PesquisarCliente_Coluna_Nome_0')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  // aguarda carregamento dos dados do cliente sumir antes de interagir
  const loader = page.getByText('Carregando dados do cliente. Aguarde...');
  if (await loader.isVisible()) {
    await loader.waitFor({ state: 'detached', timeout: 15000 });
  }
  const phoneInput = page.getByRole('textbox', { name: '(99) 99999-' }).first();
  await phoneInput.waitFor({ state: 'visible', timeout: 20000 });
  await phoneInput.click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().fill('');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('Tab');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).fill('');
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await page.getByTestId('logotipoClienteIndexOrcamento').click();
  await expect(page.getByTestId('toast-container')).toContainText('×Registro atualizado com sucesso!');
  });


  test('CT02 - telefone e celular válidos', async ({ page }) => {
  // pesquisar cliente e aguardar resultado
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('thiago jose ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await expect(page.getByTestId('PesquisarCliente_Coluna_Nome_0')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  const loader = page.getByText('Carregando dados do cliente. Aguarde...');
  if (await loader.isVisible()) {
    await loader.waitFor({ state: 'detached', timeout: 15000 });
  }
  const phoneInput = page.getByRole('textbox', { name: '(99) 99999-' }).first();
  await phoneInput.waitFor({ state: 'visible', timeout: 20000 });
  await phoneInput.click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().fill('(33) 9987-9987_');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('Tab');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).fill('(33) 9987-20036');
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await expect(page.getByTestId('toast-container')).toContainText('×Registro atualizado com sucesso!');
  });
 
  

/*    test('CT03 - telefone e celular inválidos', async ({ page }) => {
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('thiago jose ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().fill('(33) 9987-20___');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('Tab');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).fill('(33) 9987-20___');
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await expect(page.getByTestId('toast-container')).toContainText('O campo "Telefone" é inválido.O campo "Celular" é inválido.');
 }); */
   



  test('CT04 - sobrescrita com CTRL+A', async ({ page }) => {
  // pesquisar cliente antes de testar sobrescrita
  await page.getByTestId('PesquisaCliente_CampoNome').fill('Thiago Jose Ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await expect(page.getByTestId('PesquisarCliente_Coluna_Nome_0')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().fill('(11) 1111-1111_');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('Tab');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).fill('(22) 2222-22222_');
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await expect(page.getByRole('textbox', { name: '(99) 99999-' }).first()).toHaveValue('(11) 1111-1111');
  await expect(page.getByRole('textbox', { name: '(99) 99999-' }).nth(1)).toHaveValue('(22) 22222-2222');
 });


  test('CT05 - finalizar orçamento', async ({ page }) => {
  // selecionar cliente
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('thiago jose ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await expect(page.getByTestId('PesquisarCliente_Coluna_Nome_0')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  // aguarda o loader de cliente desaparecer antes de interagir com o botão Salvar
  const loaderCliente = page.getByText('Carregando dados do cliente. Aguarde...');
  if (await loaderCliente.isVisible()) {
    await loaderCliente.waitFor({ state: 'detached', timeout: 15000 });
  }
  await expect(page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await page.getByTestId('orcamento_menu_itens').click({ force: true });
  // aguarda painel de produto aparecer
  await expect(page.getByTestId('PesquisaProdutos_EstoqueDisponivelFilialCorrente')).toBeVisible();
  await page.getByTestId('PesquisaProdutos_EstoqueDisponivelFilialCorrente').check();
  await page.getByTestId('PaginaPesquisaProduto_botaoPesquisar').click();
  await expect(page.getByTestId('itemPesquisaProduto_ColunaCodigo_01009            ')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('itemPesquisaProduto_ColunaCodigo_01009            ').click();
  await expect(page.getByTestId('BarraFerramentasGrid_botaoOk').first()).toBeVisible();
  await page.getByTestId('BarraFerramentasGrid_botaoOk').first().click();
  await expect(page.getByTestId('barra-ferramentas__botao-tipo-entrega-padrao')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('barra-ferramentas__botao-tipo-entrega-padrao').click();
  await page.getByTestId('barra-ferramentas__menu-entrega-padrao__expedicao').click();
  await page.getByTestId('input-Quantidade-item-Linha-1').click();
  await page.getByTestId('input-Quantidade-item-Linha-1').fill('2');
  await page.getByTestId('input-Quantidade-item-Linha-1').press('Enter');
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_OrcamentoConfirmado').click();
  await page.getByTestId('FinalizarOrcamento_botaoEncerrarOrcamento').click();
  // aguarda o status de conclusão aparecer em vez de usar timeout fixo
  await expect(page.getByTestId('OrcamentoConcluido_Situacao')).toContainText(
    'Situação: Aguardando faturamento',
    { timeout: 10000 }
  );
 });  


  test('CT06 - finalizar orçamento com o campo telefone inválido,com 10 digitos já salvo no banco', async ({ page }) => {
  await atualizarTelefoneCliente();
  // selecionar cliente
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('thiago jose ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await expect(page.getByTestId('PesquisarCliente_Coluna_Nome_0')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await expect(page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar')).toBeVisible();
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await page.getByTestId('orcamento_menu_itens').click({ force: true });
  await expect(page.getByTestId('PesquisaProdutos_EstoqueDisponivelFilialCorrente')).toBeVisible({ timeout: 60000 });
  await page.getByTestId('PesquisaProdutos_EstoqueDisponivelFilialCorrente').check({ timeout: 60000 });
  await page.getByTestId('PaginaPesquisaProduto_botaoPesquisar').click();
  await expect(page.getByTestId('itemPesquisaProduto_ColunaCodigo_01009            ')).toBeVisible({ timeout: 60000 });
  await expect(page.getByTestId('itemPesquisaProduto_ColunaCodigo_01009            ')).toBeEnabled({ timeout: 60000 });
  await page.getByTestId('itemPesquisaProduto_ColunaCodigo_01009            ').click({ timeout: 60000 });
  await expect(page.getByTestId('BarraFerramentasGrid_botaoOk').first()).toBeVisible({ timeout: 60000 });
  await page.getByTestId('BarraFerramentasGrid_botaoOk').first().click();
  await expect(page.getByTestId('barra-ferramentas__botao-tipo-entrega-padrao')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('barra-ferramentas__botao-tipo-entrega-padrao').click();
  await page.getByTestId('barra-ferramentas__menu-entrega-padrao__expedicao').click();
  await page.getByTestId('input-Quantidade-item-Linha-1').click();
  await page.getByTestId('input-Quantidade-item-Linha-1').fill('2');
  await page.getByTestId('input-Quantidade-item-Linha-1').press('Enter')
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_OrcamentoConfirmado').click();
  await expect(page.getByTestId('FinalizarOrcamento_Conteudo')).toContainText('Celular do cliente inválido. Atualize os dados do cliente para finalizar o orçamento.');
  });



















