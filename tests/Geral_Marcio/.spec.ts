/**
 * 
 * CASO DE TESTE 1

 * Ambiente: Homologação
 * BANCO DE DADOS: ?
 * Versão: ?

 * OBJETIVOS DO TESTES:
 * CASO DE TESTE 1º:
 *                     ----------------------------RECOMENDAÇÕES DO DEV------------------------
1 - quando forem homologar qualquer coisas, sempre inserir um "produto fora de estoque", "madeira" e "tinta", porque as 
    alteracoes podem afetar essa funcionalidade no sistema e se nao testar, so vai dar erro no cliente

  (1-A)PEDIDO COM  PRODUTO FORA DE ESTOQUE
  (1-B)PEDIDO COM  PRODUTO TINTOMETRICO
  (1-C)PEDIDO COM  PRODUTO MADEIRA

 * RESULTADO ESPERADO:
 * CASO DE TESTE 1-A: Pedido com produto fora de estoque, o sistema deve finalizar o orçamento com a situação de apenas orçando e sem erros.
   

 
/* =========================
   COMANDOS SQL  AUXILIARES

   ========================= */



  import { selectors,test,expect } from '@playwright/test';

  async function fazerLogin(page,usuario,senha) {
  await page.goto('http://10.10.11.83:9999/Login');
  await page.getByTestId('Login_Usuario').click();
  await page.getByTestId('Login_Usuario').fill(usuario);
  await page.getByTestId('Login_Usuario').press('Tab');
  await page.getByTestId('Login_Senha').fill('');
  await page.getByTestId('Login_Senha').press('CapsLock');
  await page.getByTestId('Login_Senha').fill(senha);
  await page.getByTestId('Login_BotaoEntrar').click();
  await page.waitForLoadState('networkidle');
 
  }

  async function MenuVenda(page) {
  await page.getByTestId('abrirMenuPrincipal').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('MenuPrincipal_OrcamentoVenda').click();
  await page.getByTestId('senha-vendedor-input').fill('99998');
  await page.getByTestId('SenhaVendedor_BotaoOk').click();
  await page.getByTestId('iniciar-orcamento-botao-entrar').click();

  //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO 

  }

  async function adicionarProdutoForaEstoque(page) {
  await page.getByTestId('orcamento_menu_itens').click();
  await page.getByTestId('PaginaPesquisaProduto_botaoProdutosForaDeEstoque').click();
  await page.getByTestId('TabelaProdForaEstoque_Codigo_0').click();
  await page.getByTestId('ProdutoForaEstoque_BotaoOk1').click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('99998');
  await page.getByRole('textbox').nth(3).press('Tab');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  await page.getByTestId('Select_Item_Coluna_DescricaoTipoEntrega_Linha-1').selectOption('E');
  //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO 

  }

  async function FormaPagamento(page) {
  await page.getByTestId('orcamento_menu_formapagamento_react').click();
  await page.waitForLoadState('networkidle');
  await page.getByTestId('AbaFormaDePagamento_TipoDeDocumento').selectOption('7276906');
  await page.waitForLoadState('networkidle');
  
 }

  async function adicionarProdutoTintometrico(page) {
  await page.getByTestId('orcamento_menu_itens').click();
  await page.getByText('Mais Filtros').click();
  await page.getByTestId('MaisFiltros_ProdutoFinal').check();
  await page.getByTestId('PaginaPesquisaProduto_botaoPesquisar').click();
  await page.getByTestId('Paginacao_Pagina_3_PaginaPesquisaProduto_Paginacao').click();
  await page.getByTestId('ItemPesquisaProduto_LinhaTabela_76720').getByRole('cell', { name: 'TINTOMETRICO TEXTURA DESIGN' }).click();
  await page.getByTestId('ItemPesquisaProduto_BotaoTinta_76720').click();
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('ABACATE').click();
  await page.getByRole('button', { name: 'OK' }).nth(1).click();
  await page.getByTestId('BarraFerramentasGrid_botaoOk').first().click();
  await page.getByTestId('Select_Item_Coluna_DescricaoTipoEntrega_Linha-1').selectOption('E');
  //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO 


  

  //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO 
 }

  async function FinalizarOrcamentoApenas(page) {
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_ApenasOrcando').click();
  //await page.getByTestId('FinalizarOrcamento_Inconsistencias_TabelaPergunta_Dados_InputPergunta_#ID_PERGUNTA_OCORREU_AJUDA_DE_PROFISSIONAL_INTERNO_EXTERNO#_Nao').check();
  await page.getByTestId('FinalizarOrcamento_botaoEncerrarOrcamento').click();
  await expect(page.getByTestId('OrcamentoConcluido_Situacao')).toContainText('Situação: Apenas orçando');
  //await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_OrcamentoConfirmado').click();
  //await expect(page.getByTestId('OrcamentoConcluido_Situacao')).toContainText('Situação: Aguardando faturamento');
  //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO 
  
  } 

  async function FinalizarOrcamentoConfirmado(page) {
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.waitForLoadState('networkidle');
  
  // Click na opção do radio "Orçamento Confirmado"
  await page.getByText('Orçamento Confirmado').click();
  await page.waitForLoadState('networkidle');
  
  // Click no botão "Encerrar Orçamento"
  await page.getByTestId('FinalizarOrcamento_botaoEncerrarOrcamento').click();
  await page.waitForLoadState('networkidle');
  
  // Validar resultado
  await expect(page.getByTestId('OrcamentoConcluido_Situacao')).toContainText('Situação: Aguardando faturamento');
  
  }

// agrupar testes reutilizando setup comum
// o beforeEach faz login antes de cada caso

const usuarioPadrao = 'VENDAS01';
const senhaPadrao   = 'm';

test.describe('Orçamentos - Geral Marcio', () => {
  test.beforeEach(async ({ page }) => {
    await selectors.setTestIdAttribute("id");
    await fazerLogin(page, usuarioPadrao, senhaPadrao);
  });

  test('(1-A)PEDIDO COM  PRODUTO FORA DE ESTOQUE', async ({ page }) => {
    await MenuVenda(page);
    await adicionarProdutoForaEstoque(page);
    await FormaPagamento(page);
    await FinalizarOrcamentoApenas(page);
    //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO 
  });

  test('(1-B)PEDIDO COM  PRODUTO TINTOMETRICO', async ({ page }) => {
    // já logado pelo beforeEach
    await MenuVenda(page);
    await adicionarProdutoTintometrico(page);
    await FormaPagamento(page);
    await FinalizarOrcamentoConfirmado(page); 
    //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO 
   
  });


  });
