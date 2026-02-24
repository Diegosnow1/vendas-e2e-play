/**
 * FICHA 478180
 * CASO DE TESTE 1
 * Problema Detectado:
 * Sistema está permitindo alterar um pedido que já foi faturado no caixa.
 * Ambiente: Homologação
 * BANCO DE DADOS: Centrao_Diego
 * Versão: Branch 478180_Jeremias_AlterarPedidoJaComVenda_Centrao

 * OBJETIVOS DO TESTES:
 * CASO DE TESTE 1º:
 -A partir deste ajuste:
 -Implementação de funcionalidade de não deixar mais editar um orçamento caso já tenha registro de vendas no mesmo.


 * RESULTADO ESPERADO:

* CASO DE TESTE 1º
 - Ao salvar pedido o tost irá apresentar a mensagem de “informando que já existe registro de venda.”
 
/* =========================
   COMANDOS SQL  AUXILIARES
--update pediclicad set sitven = '1' where NumPed= ?
   ========================= */



import { selectors,test,expect } from '@playwright/test';

  async function fazerLogin(page,usuario,senha) {
  await page.goto('http://localhost:9999/Login');
  await page.getByTestId('Login_Usuario').click();
  await page.getByTestId('Login_Usuario').fill(usuario);
  await page.getByTestId('Login_Usuario').press('Tab');
  await page.getByTestId('Login_Senha').fill('');
  await page.getByTestId('Login_Senha').press('CapsLock');
  await page.getByTestId('Login_Senha').fill(senha);
  await page.getByTestId('Login_BotaoEntrar').click();
  await page.waitForLoadState('networkidle');
  await page.getByTestId('abrirMenuPrincipal').click();
  await page.waitForTimeout(1000);
  }

  async function pesquisarOrcamento(page,numeroPedido) {
  await page.getByTestId('MenuPrincipal_PesquisaOrcamento').click();
  await page.getByTestId('senha-vendedor-input').click();
  await page.getByTestId('senha-vendedor-input').fill('1');
  await page.getByTestId('senha-vendedor-input').press('Enter');
  await page.getByTestId('PesquisaOrcamento_CampoFiltro_NumeroPedido').click();
  await page.getByTestId('PesquisaOrcamento_CampoFiltro_NumeroPedido').fill(numeroPedido);
  await page.getByTestId('geral').click();
  await page.getByTestId('PesquisaOrcamento_BotaoPesquisar').click();
  await page.getByTestId('PesquisaOrcamento_Coluna_DataPedido_2491084_DataPedido').click();
  await page.getByTestId('PesquisaOrcamento_botaoAlterar').click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('toast-container')).toContainText('Orçamento do dia 28/11/2025.Data de Vencimento das parcelas foram recalculadas.Orçamento com data de validade expirada.Os preços dos itens serão recalculados.Data validade alterada para "24/02/2026"Orçamento já possui registro de vendas.Será aberto somente para consulta.');

  }

/*   async function FinalizarOrcamento(page) {
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_OrcamentoConfirmado').click();
  await page.getByTestId('FinalizarOrcamento_botaoEncerrarOrcamento').click();
  await expect(page.getByTestId('OrcamentoConcluido_Situacao')).toContainText('Situação: Aguardando faturamento');
  ///await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO 
  } */

  test('CASO DE TESTE 1', async ({ page }) => {
    await selectors.setTestIdAttribute("id");
    await fazerLogin(page,'ORC01','m');
    await pesquisarOrcamento(page,'2491084');
    ///await FinalizarOrcamento(page);

});
