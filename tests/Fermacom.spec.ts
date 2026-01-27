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
 -Validar campos (telefone e celular) com dados válidos (3333412207).
 * CASO DE TESTE 3º:
 -Validar campos (telefone e celular) com dados inválidos (33334122).
 
 * RESULTADO ESPERADO:

  * CASO DE TESTE 1º
 - Usuario conseguira salvar os dados do cliente ao clicar no botão salvar, mensagem na cor verde, relatando o  sucesso sera exibida.
  * CASO DE TESTE 2º
 - Usuario conseguira salvar os dados do cliente ao clicar no botão salvar, mensagem na cor verde, relatando o  sucesso sera exibida.
  * CASO DE TESTE 3º
 - Usuario não conseguira salvar os dados do cliente ao clicar no botão salvar, uma mensagem em vermelho com os erros de validação sera exibida.

 
/* =========================
   COMANDOS SQL  AUXILIARES
select   * from COMUNICACAO_R where RITEM = '7810233'
select   * from ITEM  where OID =  7810233
select  * from PESSOAFISICA_R  WHERE NOME LIKE '%THIAGO%'
UPDATE COMUNICACAO_R  SET VALOR = '(33)99872-00' where RITEM = '7810233'  ---and OID = '9072487'
delete from COMUNICACAO_R  where RITEM = '7810233'
UPDATE ITEMFILEST SET quant = '1000.00' WHERE codpro = '00012'
   ========================= */


import { selectors,test,expect } from '@playwright/test';

test('CASO DE TESTE ', async ({ page }) => {

 
  //LOGIN NO SISTEMA
  await selectors.setTestIdAttribute("id");
  await page.goto('http://10.10.11.137:9999/Login');
  await page.getByTestId('Login_Usuario').click();
  await page.getByTestId('Login_Usuario').fill('vendas01');
  await page.getByTestId('Login_Usuario').press('Tab');
  await page.getByTestId('Login_Senha').fill('m');
  await page.getByTestId('Login_Senha').press('Enter');
  await page.getByTestId('abrirMenuPrincipal').click({force: true});
  await page.getByTestId('MenuPrincipal_OrcamentoVenda').click();
  await page.getByTestId('senha-vendedor-input').click();
  await page.getByTestId('senha-vendedor-input').fill('1');
  await page.getByTestId('senha-vendedor-input').press('Enter');
  await page.getByTestId('iniciar-orcamento-botao-entrar').click();


 
  //caso de teste 1 - telefone e celular vazios
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('thiago jose ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().fill('');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('Tab');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).fill('');
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await page.getByTestId('logotipoClienteIndexOrcamento').click();
  await expect(page.getByTestId('toast-container')).toContainText('×Registro atualizado com sucesso!');
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO


  //caso de teste 2 - telefone e celular válido
  await page.getByTestId('AbasPesquisaClienteContainer_Breadcrumb_BtnLimpar').click();
  await page.getByTestId('PesquisarClienteContainer_Breadcrumb_BtnLimpar').click();
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('thiago jose ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().click();
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().fill('(33) 9987-9987_');
  await page.getByRole('textbox', { name: '(99) 99999-' }).first().press('Tab');
  await page.getByRole('textbox', { name: '(99) 99999-' }).nth(1).fill('(33) 9987-20036');
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await expect(page.getByTestId('toast-container')).toContainText('×Registro atualizado com sucesso!');
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
  

   //caso de teste 3 - telefone e celular invalido
  await page.getByTestId('AbasPesquisaClienteContainer_Breadcrumb_BtnLimpar').click();
  await page.getByTestId('PesquisarClienteContainer_Breadcrumb_BtnLimpar').click();
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
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO




   //caso de teste 4 -  sobrescrita com CTRL+A no campo telefone e celular.
  await page.getByTestId('AbasPesquisaClienteContainer_Breadcrumb_BtnLimpar').click();
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('Thiago Jose Ferreira');
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
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
  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
 





  //Finalizar o pedido como orcamento confirmado
  await page.getByTestId('AbasPesquisaClienteContainer_Breadcrumb_BtnLimpar').click();
  await page.getByTestId('PesquisaCliente_CampoNome').click();
  await page.getByTestId('PesquisaCliente_CampoNome').fill('thiago jose ferreira');
  await page.locator('form').click();
  await page.getByTestId('PesquisaCliente_BarraFerramenta_BotaoPesquisar').click();
  await page.getByTestId('PesquisarCliente_Coluna_Nome_0').click();
  await page.getByTestId('AbasPesquisaClienteContainer_BotaoSalvar').click();
  await page.getByTestId('orcamento_menu_itens').click({force: true});
  await page.getByTestId('PesquisaProdutos_EstoqueDisponivelFilialCorrente').check();
  await page.getByTestId('PaginaPesquisaProduto_botaoPesquisar').click();
  await page.getByTestId('itemPesquisaProduto_ColunaCodigo_01009            ').click();
  await page.getByTestId('BarraFerramentasGrid_botaoOk').first().click();
  await page.getByTestId('barra-ferramentas__botao-tipo-entrega-padrao').click();
  await page.getByTestId('barra-ferramentas__menu-entrega-padrao__expedicao').click();
  await page.getByTestId('input-Quantidade-item-Linha-1').click();
  await page.getByTestId('input-Quantidade-item-Linha-1').fill('2');
  await page.getByTestId('input-Quantidade-item-Linha-1').press('Enter');
  await page.getByTestId('orcamento_menu_finalizar').click();
  await page.getByTestId('FinalizarOrcamento_GrupoOpcaoOrcamento_OrcamentoConfirmado').check();
  await page.getByTestId('FinalizarOrcamento_botaoEncerrarOrcamento').click();
  await page.waitForTimeout(3000);
  await expect(page.getByTestId('OrcamentoConcluido_Situacao')).toContainText('Situação: Aguardando faturamento');

  await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
});

  
  





  
  


