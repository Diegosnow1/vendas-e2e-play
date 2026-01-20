

/**
 * FICHA 476948
 * CASO DE TESTE 1
 * Problema Detectado:
 * O Vendas não está solicitando senha para pendência de LOTE(Liberar pendencia de venda sem reserva de lote.) quando é reservado uma quantidade parcial do pedido.
 * Ambiente: 10.10.11.65
 * BANCO DE DADOS: Fermacom_Diego
 * Versão: 476948_marcio_lote_Formatto
 *
 * RESULTADO ESPERADO:
 * Alterado para fazer igual ao tradorca, nao vai deixar gravar o pedido se selecionar apenas parte da quantidade do lote.
 * Ou seleciona tudo ou nao seleciona nada(palavras do Marcio).
 * 
 * 
 * RESULTADO OBTIDO:
 * Ao salvar o pedido, o sistema não solicita senha para pendência de lote, nem mesmo deixa salvar como orçamento pendente, alertando com a mensagem "A quantidade reservada do lote não confere com a quantidade do produto".
 *
/* =========================
   FUNÇÕES AUXILIARES
   ========================= */
  import { selectors,test,expect } from '@playwright/test';

 test('CASO DE TESTE 1', async ({ page }) => {
  await selectors.setTestIdAttribute("id");
  await page.goto('http://localhost:9999/Login');
  await page.getByTestId('Login_Usuario').click();
  await page.getByTestId('Login_Usuario').fill('rodrigo');
  await page.getByTestId('Login_Usuario').press('Tab');
  await page.getByTestId('Login_Senha').fill('m');
  await page.getByTestId('Login_Senha').press('Enter');
  await page.getByTestId('abrirMenuPrincipal').click({ force: true });
  await page.getByTestId('MenuPrincipal_OrcamentoVenda').click();
  await page.getByTestId('senha-vendedor-input').fill('1');
  await page.getByTestId('senha-vendedor-input').press('Enter');
  await page.getByTestId('iniciar-orcamento-botao-entrar').click();
  await page.getByTestId('orcamento_menu_itens').click();
  await page.getByTestId('PesquisaProdutos_Referencia').click();
  await page.getByTestId('PesquisaProdutos_Referencia').fill('15409-x');
  await page.getByTestId('PesquisaProdutos_Referencia').press('Enter');
  await page.getByTestId('BarraFerramentasGrid_botaoOk').nth(1).click();
  await page.getByTestId('input-Quantidade-item-Linha-1').click();
  await page.getByTestId('input-Quantidade-item-Linha-1').fill('84,87');
  await page.getByTestId('input-Quantidade-item-Linha-1').press('Enter');
  await page.getByTestId('orcamento_menu_cliente_react').click();
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('rodrigo antonio rotta');
  await page.getByTestId('PesquisaCliente_CampoNome').press('Enter');
  await page.getByTestId('geral').click();
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByTestId('orcamento_menu_itens').click();
  await page.getByRole('button', { name: 'Reserva / Lote' }).click();
  await page.locator('path').nth(3).click();
  await page.getByTestId('ProdutoLote_tabela_Lote').locator('path').click();
  await page.getByTestId('ProdutoLoteEditar_inputQuantidadeReservar').fill('82,80');
  await page.getByTestId('ProdutoLoteEditar_BotaoSalvar').click();
  await page.getByTestId('ProdutoLoteContainer_Breadcrumb_BtnVoltar').click();
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_OrcamentoConfirmado').check({ force: true });
  //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
  await expect(page.locator('body')).toContainText('A quantidade reservada do lote não confere com a quantidade do produto: 15409-X - AFFETO ACT 83X83 A HELENA-(Desc.Longa)');
  
 }); 
/*   test('CASO DE TESTE 2', async ({ page }) => {
  await selectors.setTestIdAttribute("id");
  await page.goto('http://10.10.11.98:9999/Login');
  await page.getByTestId('Login_Usuario').click();
  await page.getByTestId('Login_Usuario').fill('rodrigo');
  await page.getByTestId('Login_Usuario').press('Tab');
  await page.getByTestId('Login_Senha').fill('m');
  await page.getByTestId('Login_Senha').press('Enter');
  await page.getByTestId('abrirMenuPrincipal').click({ force: true });
  await page.getByTestId('MenuPrincipal_OrcamentoVenda').click();
  await page.getByTestId('senha-vendedor-input').fill('1');
  await page.getByTestId('senha-vendedor-input').press('Enter');
  await page.getByTestId('iniciar-orcamento-botao-entrar').click();
  await page.getByTestId('orcamento_menu_itens').click();
  await page.getByTestId('PesquisaProdutos_Referencia').click();
  await page.getByTestId('PesquisaProdutos_Referencia').fill('15409-x');
  await page.getByTestId('PesquisaProdutos_Referencia').press('Enter');
  await page.getByTestId('BarraFerramentasGrid_botaoOk').nth(1).click();
  await page.getByTestId('input-Quantidade-item-Linha-1').click();
  await page.getByTestId('input-Quantidade-item-Linha-1').fill('84,87');
  await page.getByTestId('input-Quantidade-item-Linha-1').press('Enter');
  await page.getByTestId('orcamento_menu_cliente_react').click();
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('rodrigo antonio rotta');
  await page.getByTestId('PesquisaCliente_CampoNome').press('Enter');
  await page.getByTestId('geral').click();
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByTestId('orcamento_menu_itens').click();
  await page.getByRole('button', { name: 'Reserva / Lote' }).click();
  await page.locator('path').nth(3).click();
  await page.getByTestId('ProdutoLote_tabela_Lote').locator('path').click();
  await page.getByTestId('ProdutoLoteEditar_inputQuantidadeReservar').fill('82,80');
  await page.getByTestId('ProdutoLoteEditar_BotaoSalvar').click();
  await page.getByTestId('ProdutoLoteContainer_Breadcrumb_BtnVoltar').click();
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_OrcamentoConfirmado').check({ force: true });
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
  await expect(page.locator('body')).toContainText('A quantidade reservada do lote não confere com a quantidade do produto: 15409-X - AFFETO ACT 83X83 A HELENA-(Desc.Longa)');
}); */