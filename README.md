# 📌 Colinha QA — Playwright, Cypress e Git

----------------------------------------------------------------------------------------------------------

## 📋 Modelo de Ficha / Caso de Teste

```ts
/**
 * FICHA 475854
 * CASO DE TESTE ,,,
 * Problema Detectado: OrcaWeb não está validando telefone dos clientes.
 * Ambiente: 10.10.11.65
 * BANCO DE DADOS: -
 * Versão: -

 * OBJETIVOS DO TESTES:
 * CASO DE TESTE 1º:
 -
 * CASO DE TESTE 2º:
 -
 * CASO DE TESTE 3º:
 -
 
 * RESULTADO ESPERADO:

  * CASO DE TESTE 1º
 - 
  * CASO DE TESTE 2º
 - 
  * CASO DE TESTE 3º
 - 

 
/* =========================
   COMANDOS SQL  AUXILIARES

   ========================= */


----------------------------------------------------------------------------------------------------------

🧪 Template Playwright
import { selectors,test,expect } from '@playwright/test';

test('CASO DE TESTE 1', async ({ page }) => {
  await selectors.setTestIdAttribute("id");
  await page.goto('http://localhost:9999/Login');

  // await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO
});

----------------------------------------------------------------------------------------------------------

🧪 Template Playwright
git status
git add .
git commit -m "mensagem"
git push
👉 SUBIR = sua máquina → GitHub

----------------------------------------------------------------------------------------------------------

⬇️ Git — Descer / Atualizar código

Projeto já existe:
git pull
Projeto do zero:
git clone https://github.com/Diegosnow1/vendas-e2e-play.git

----------------------------------------------------------------------------------------------------------

🧪 Playwright — Comandos principais
#---- //Executa todos os testes
npx playwright test

#---//Executa um arquivo específico
npx playwright test tests/Formatto.spec.ts

#---//Executa um arquivo específico com navegador visível (1 navegador, sequência)
npx playwright test tests/Fermacom.spec.ts --headed

#---//Executa um arquivo específico em modo debug (pausa a cada passo)
npx playwright test tests/Fermacom.spec.ts --project=chromium --debug

#---//Executa todos os testes em modo debug
npx playwright test --debug

#---//Abre o relatório HTML da última execução
npx playwright show-report

#---//Gera testes automaticamente (grava ações do navegador)
npx playwright codegen http://URL_DO_SISTEMA

#---//Gera testes usando atributo id como test-id
npx playwright codegen --test-id-attribute id http://URL_DO_SISTEMA

----------------------------------------------------------------------------------------------------------

❄️ Cypress — Comandos principais
npx cypress open
npx cypress run
npx cypress run --spec "cypress/e2e/login-vendas.cy.js"
