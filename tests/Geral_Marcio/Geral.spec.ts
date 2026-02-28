import { test, expect, selectors } from '@playwright/test';

async function fazerLogin(page, usuario, senha) {
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
  await page.getByTestId('senha-vendedor-input').fill('1');
  await page.getByTestId('SenhaVendedor_BotaoOk').click();
  //await page.getByTestId('iniciar-orcamento-botao-entrar').click();
}

async function adicionarProdutoForaEstoque(page) {
  await page.getByTestId('orcamento_menu_itens').click();
  await page.getByTestId('PaginaPesquisaProduto_botaoProdutosForaDeEstoque').click();
  await page.getByTestId('TabelaProdForaEstoque_Codigo_0').click();
  await page.getByTestId('ProdutoForaEstoque_BotaoOk1').click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('1');
  await page.getByRole('textbox').nth(3).press('Tab');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  await page.getByTestId('Select_Item_Coluna_DescricaoTipoEntrega_Linha-1').selectOption('E');
}

async function FormaPagamento(page) {
  await page.getByTestId('orcamento_menu_formapagamento_react').click();
  await page.getByTestId('AbaFormaDePagamento_FormaDePagamento').selectOption('2365558');
  await page.waitForTimeout(10000);
  await page.getByTestId('AbaFormaDePagamento_TipoDeDocumento').selectOption('2366067');
  await page.waitForTimeout(10000);
  await page.waitForLoadState('networkidle');
  

  //await page.pause();
 
  
  //await page.pause();
  //await page.getByTestId('AbaFormaDePagamento_TipoDeDocumento').selectOption('7271698');
}


async function Cliente(page) {
  await page.getByTestId('orcamento_menu_cliente_react').click();
  await page.getByTestId('PesquisaCliente_CpfCnpj').click();
  await page.getByTestId('PesquisaCliente_CpfCnpj').fill('26.333.047/0001-60');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  
 
  //await page.pause();
}


async function Endereco(page) {
  await page.getByTestId('orcamento_menu_enderecos_react').click();
  await page.waitForLoadState('networkidle');
  //await page.pause();
}

async function adicionarProdutoTintometrico(page) {
  await page.getByTestId('orcamento_menu_itens').click();
  //await page.pause();

  await page.waitForLoadState('networkidle');
  await page.getByText('Mais Filtros').click({ force: true });
  await page.getByTestId('MaisFiltros_ProdutoFinal').check();
  await page.getByTestId('PaginaPesquisaProduto_botaoPesquisar').click();
  await page.getByTestId('Paginacao_Pagina_3_PaginaPesquisaProduto_Paginacao').click();
  await page.getByTestId('ItemPesquisaProduto_LinhaTabela_76720').getByRole('cell', { name: 'TINTOMETRICO TEXTURA DESIGN' }).click();
  await page.getByTestId('ItemPesquisaProduto_BotaoTinta_76720').click();
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('ABACATE').click();
  await page.getByRole('button', { name: 'OK' }).nth(1).click();
  await page.getByTestId('BarraFerramentasGrid_botaoOk').first().click();
  //await page.getByTestId('Select_Item_Coluna_DescricaoTipoEntrega_Linha-1').selectOption('E');
}

async function FinalizarOrcamentoApenas(page) {
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_ApenasOrcando').check();
  await page.getByTestId('FinalizarOrcamento_botaoEncerrarOrcamento').click();
  await page.getByTestId('FinalizarOrcamento_Inconsistencias_TabelaPergunta_Dados_InputPergunta_#ID_PERGUNTA_OCORREU_AJUDA_DE_PROFISSIONAL_INTERNO_EXTERNO#_Nao').check();
}

async function FinalizarOrcamentoConfirmado(page) {
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.waitForLoadState('networkidle');
  await page.getByText('Orçamento Confirmado').click();
  await page.waitForLoadState('networkidle');
  await page.getByTestId('FinalizarOrcamento_botaoEncerrarOrcamento').click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('OrcamentoConcluido_Situacao')).toContainText('Situação: Aguardando faturamento');
  await page.waitForLoadState('networkidle');
  
}

// agrupar testes reutilizando setup comum
const usuarioPadrao = 'ORC01';
const senhaPadrao = 'm';

test.describe('Orçamentos - Geral Marcio', () => {
  test.beforeEach(async ({ page }) => {
    await selectors.setTestIdAttribute('id');
    await fazerLogin(page, usuarioPadrao, senhaPadrao);
  });

  test('(1-A) PEDIDO COM PRODUTO FORA DE ESTOQUE', async ({ page }) => {
    await MenuVenda(page);
    await adicionarProdutoForaEstoque(page);
    await FormaPagamento(page);
    await Cliente(page);
    await Endereco(page);
    await FinalizarOrcamentoApenas(page);
    // await page.pause();
  });

  test('(1-B) PEDIDO COM PRODUTO TINTOMETRICO', async ({ page }) => {
    await MenuVenda(page);
    await adicionarProdutoTintometrico(page);
    await FormaPagamento(page);
    await Cliente(page);
    await Endereco(page);
    // await page.pause();
    
    await FinalizarOrcamentoConfirmado(page);
  });
});