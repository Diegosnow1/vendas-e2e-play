/**
 * FICHA 482002
 * CASO DE TESTE 1
 * Problema Detectado:
 * O sistema não está calculando corretamente o valor para gerar a base de cálculo e valor da comissão de indicadores.
 * Ambiente: 10.10.11.65
 * BANCO DE DADOS: Comfergil_Diego
 * Versão: 5.91.12
 *
 * RESULTADO ESPERADO:
 * Base de Cálculo: R$ 106,72
 * Valor da Comissão: R$ 1,07
 * 
 * RESULTADO OBTIDO:
 * Base de Cálculo: R$ 106,72
 * Valor da Comissão: R$ 1,07
 */
/* =========================
   FUNÇÕES AUXILIARES
   ========================= */

  import { selectors,test,expect } from '@playwright/test';

  //FAZER LOGIN
  async function fazerLogin(page,usuario,senha) {
  await selectors.setTestIdAttribute("id");
  await page.goto('http://localhost:9999/Login');
  await page.getByTestId('Login_Usuario').click();
  await page.getByTestId('Login_Usuario').fill(usuario);
  await page.getByTestId('Login_Usuario').press('Tab');
  await page.getByTestId('Login_Senha').fill(senha);
  await page.getByTestId('Login_Senha').press('Enter');
  await page.getByTestId('abrirMenuPrincipal').click();
  await page.getByTestId('MenuPrincipal_OrcamentoVenda').click();
  await page.getByTestId('senha-vendedor-input').fill('1');
  await page.getByTestId('senha-vendedor-input').press('Enter');
  }
 
  //INSERIR PRODUTOS  
  async function InserirProduto(page,codigo) {
  await page.getByTestId('PesquisaProdutos_Codigo').click();
  await page.getByTestId('PesquisaProdutos_Codigo').fill(codigo);
  await page.getByTestId('PesquisaProdutos_Codigo').press('Enter');
  await page.getByTestId('BarraFerramentasGrid_botaoOk').nth(1).click();
  await page.getByTestId('grid-itens__barra-ferramentas__input-referencia').fill('00918');
  await page.getByTestId('grid-itens__barra-ferramentas__input-referencia').press('Enter');
  await page.getByTestId('Totalizador_PercentualDesconto').click();
  await page.getByTestId('Totalizador_PercentualDesconto').fill('11');
  await page.getByTestId('Totalizador_PercentualDesconto').press('Tab');
 
 }

 //INSERIR CLIENTE  
 async function InserirCliente(page,cliente) {
  await page.getByTestId('orcamento_menu_cliente_react').click();
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill(cliente);
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByTestId('DadosBasicosCliente_CampoApelido').click();
  await page.getByTestId('DadosBasicosCliente_CampoApelido').fill('a');
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
 
 }

 //INSERIR INDICADOR
  async function InserirIndicador(page,indicador) {
  await page.getByTestId('orcamento_menu_comissoes_react').click();
  await page.getByTestId('pesquisaIndicador-NaoRelacionado').check();
  await page.getByTestId('pesquisaIndicador-botaoPesquisarIndicador').click();
  await page.getByText(indicador).click();
  await page.getByTestId('DetalhesComissao_botaoAplicarComissao').click();
 }
 
  test('CASO DE TESTE 1', async ({ page }) => {
  await fazerLogin(page,'VENDAS01','1234');
  await InserirProduto(page,'03222');
  await InserirCliente(page,'CARLOS CONFLITSON MENDES');
  await InserirIndicador(page,'NADYA ISABELINDA LIMA');
 
  ///VALOR ESPERADO APÓS CORREÇÃO DO BUG
  await expect(page.locator('body')).toContainText('R$ 106,72');
  await expect(page.locator('body')).toContainText('R$ 1,07'); 

 //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
  });

 