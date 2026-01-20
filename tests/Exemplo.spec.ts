/**
 * FICHA ?
 * CASO DE TESTE ?
 * Problema Detectado:
 * ?
 * Ambiente: 10.10.11.65
 * BANCO DE DADOS: ?
 * Versão: ?
 *
 * RESULTADO ESPERADO:
 * ?
 * 
 * RESULTADO OBTIDO:
 * ?
 */
/* =========================
   FUNÇÕES AUXILIARES
   ========================= */


   import { selectors,test,expect } from '@playwright/test';

   test('CASO DE TESTE 1', async ({ page }) => {
     await selectors.setTestIdAttribute("id");
     await page.goto('http://localhost:9999/Login');

       //await page.pause(); // ⬅️ PAUSA NO LUGAR CERTO

});



--- README GIT RÁPIDO ---

/* 🚀 ESSES COMANDOS SÃO PARA SUBIR O CÓDIGO (ENVIAR PARA O GIT)
git status                           # ver o que mudou
git add .                            # preparar os arquivos
git commit -m "mensagem"             # criar o commit
git push                             # enviar para o GitHub


👉 Isso é SUBIR o código
👉 Da sua máquina → para a nuvem (GitHub)

⬇️ PARA DESCER / BAIXAR / ATUALIZAR O CÓDIGO
Quando o projeto já existe na máquina:
git pull


👉 Isso é DESCER o código
👉 Da nuvem (GitHub) → para sua máquina

Quando você não tem o projeto ainda (ou apagou tudo):
git clone https://github.com/Diegosnow1/vendas-e2e-play.git


👉 Isso baixa tudo do zero
 */
