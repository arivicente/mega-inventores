import puppeteer from 'puppeteer';

async function generateV5Overlays() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });

  const commonStyle = `
    body { margin: 0; padding: 0; width: 360px; height: 640px; background: transparent; font-family: 'Impact', 'Arial Black', sans-serif; overflow: hidden; }
    .box {
      position: absolute;
      background: #FF6600;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      text-shadow: 2.5px 2.5px 0px rgba(0,0,0,0.85), -1.5px -1.5px 0px rgba(0,0,0,0.85), 1.5px -1.5px 0px rgba(0,0,0,0.85), -1.5px 1.5px 0px rgba(0,0,0,0.85);
      box-shadow: 0 5px 18px rgba(0,0,0,0.35);
      padding: 10px 18px;
      box-sizing: border-box;
      border: 2px solid rgba(255, 255, 255, 0.4);
    }
  `;

  // 1. Box 1 (0 a 3.2s): "NÃO É SÓ BRINCAR, É CONSTRUIR O FUTURO DELE!"
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>${commonStyle} .box { top: 70px; left: 20px; width: 320px; height: 130px; font-size: 25px; line-height: 1.25; }</style></head>
    <body>
      <div class="box">NÃO É SÓ BRINCAR,<br>É CONSTRUIR O FUTURO!</div>
    </body>
    </html>
  `);
  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/overlay_v5_box1.png', omitBackground: true });

  // 2. Box 2 (7.5 a 10.2s): "+120 PROJETOS PASSO A PASSO"
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>${commonStyle} .box { top: 45px; left: 25px; width: 310px; height: 115px; font-size: 26px; line-height: 1.25; }</style></head>
    <body>
      <div class="box">+120 PROJETOS<br>PASSO A PASSO</div>
    </body>
    </html>
  `);
  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/overlay_v5_box2.png', omitBackground: true });

  // 3. Box 3 (12.0 a 14.5s): "IMPRIMA, MONTE, INVENTE!"
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>${commonStyle} .box { top: 35px; left: 20px; width: 320px; height: 140px; font-size: 28px; line-height: 1.2; }</style></head>
    <body>
      <div class="box">IMPRIMA, MONTE,<br>INVENTE!</div>
    </body>
    </html>
  `);
  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/overlay_v5_box3.png', omitBackground: true });

  await browser.close();
  console.log("✅ 3 Overlays do Vídeo 05 gerados com sucesso!");
}

generateV5Overlays().catch(console.error);
