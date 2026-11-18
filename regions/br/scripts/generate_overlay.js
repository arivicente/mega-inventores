import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const puppeteer = require('../../kit-pastoral/node_modules/puppeteer');

const overlayPath = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'overlay_traducao_br.png');

async function generateOverlayPng() {
  console.log("Gerando overlay gráfico calibrado com cobertura 100% dos botões...");
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 360px;
        height: 640px;
        background: transparent;
        position: relative;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .badge-topo {
        position: absolute;
        top: 30px;
        left: 15px;
        width: 330px;
        height: 54px;
        background: #0E5B4B;
        border-radius: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 16px;
        font-weight: 800;
        box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        letter-spacing: -0.2px;
      }
      .botao-cta {
        position: absolute;
        top: 450px;
        left: 65px;
        width: 230px;
        height: 56px;
        background: #0E5B4B;
        border-radius: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 16px;
        font-weight: 900;
        box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        letter-spacing: 0.3px;
      }
    </style>
  </head>
  <body>
    <div class="badge-topo">Acesso Imediato no seu E-mail</div>
    <div class="botao-cta">CLIQUE EM SAIBA MAIS</div>
  </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: overlayPath, omitBackground: true });
  await browser.close();
  console.log("✅ Overlay calibrado gerado com sucesso!");
}

generateOverlayPng().catch(console.error);
