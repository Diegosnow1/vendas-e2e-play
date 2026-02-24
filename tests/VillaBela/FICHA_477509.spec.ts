/**
 * FICHA 477509
 * CASO DE TESTE 1
 * Problema Detectado:
 * Pedido de representação gravando como Simples Faturamentos.
 * Ambiente: Homologação
 * BANCO DE DADOS: VillaBelaPA
 * Versão: Branch 477509_Jeremias_VendaRepresentacao_Villa_Bela_Pisos

 * OBJETIVOS DO TESTES:
 * CASO DE TESTE 1º:
 -A partir deste ajuste:
 - Venda por representação não participa do fluxo de simples faturamento;
 - Não é exibida pergunta de simples faturamento “Deseja emitir nota fiscal de simples faturamento?”;

 * RESULTADO ESPERADO:

* CASO DE TESTE 1º
 - Ao salvar não é exibida pergunta de simples faturamento “Deseja emitir nota fiscal de simples faturamento?”
 
/* =========================
   COMANDOS SQL  AUXILIARES
- Não grava SIMPLESFATURAMENTO = 1
- Não permite emissão de nota, mantendo apenas VENDAREPRESENTACAO = 1
-select VendaRepresentacao,NUMPED ,SIMPLESFATURAMENTO, * from PEDICLICOMPLEMENTO where  numped	= '2766'
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
  await page.getByTestId('abrirMenuPrincipal').click();
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
  await page.getByTestId('PesquisaOrcamento_Coluna_DataPedido_349_DataPedido').click();
  await page.getByTestId('PesquisaOrcamento_botaoDuplicar').click();
  }

  async function FinalizarOrcamento(page) {
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_OrcamentoConfirmado').click();
  await page.getByTestId('FinalizarOrcamento_botaoEncerrarOrcamento').click();
  await expect(page.getByTestId('OrcamentoConcluido_Situacao')).toContainText('Situação: Aguardando faturamento');
  ///await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO */
  }

  test('CASO DE TESTE 1', async ({ page }) => {
    await selectors.setTestIdAttribute("id");
    await fazerLogin(page,'LARISSA','m');
    await pesquisarOrcamento(page,'349');
    await FinalizarOrcamento(page);

});
