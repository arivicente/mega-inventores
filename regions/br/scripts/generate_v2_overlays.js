import puppeteer from 'puppeteer';

async function generateOrangeOverlays() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });

  const commonStyle = `
    body { margin: 0; padding: 0; width: 360px; height: 640px; background: transparent; font-family: 'Impact', 'Arial Black', sans-serif; overflow: hidden; }
    .box {
      position: absolute;
      top: 45px;
      left: 20px;
      width: 320px;
      height: 145px;
      background: #FF6600;
      border-radius: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      text-shadow: 2.5px 2.5px 0px rgba(0,0,0,0.85), -1.5px -1.5px 0px rgba(0,0,0,0.85), 1.5px -1.5px 0px rgba(0,0,0,0.85), -1.5px 1.5px 0px rgba(0,0,0,0.85);
      box-shadow: 0 5px 18px rgba(0,0,0,0.35);
      padding: 10px 18px;
      box-sizing: border-box;
    }
  `;

  // 1. Overlay Pais Aprovaram (0 a 4s)
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>${commonStyle} .box { font-size: 26px; line-height: 1.25; }</style></head>
    <body>
      <div class="box">MILHARES DE PAIS<br>JÁ APROVARAM</div>
    </body>
    </html>
  `);
  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/overlay_v2_box1.png', omitBackground: true });

  // 2. Overlay Mega Pack (17 a 21s)
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>${commonStyle} .box { font-size: 27px; line-height: 1.2; }</style></head>
    <body>
      <div class="box">MEGA PACK DE<br>INVENTORES EM CASA</div>
    </body>
    </html>
  `);
  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/overlay_v2_box2.png', omitBackground: true });

  // 3. Overlay 5 a 12 Anos (29 a 32s)
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>${commonStyle} .box { font-size: 27px; line-height: 1.25; }</style></head>
    <body>
      <div class="box">PARA CRIANÇAS<br>DE 5 A 12 ANOS</div>
    </body>
    </html>
  `);
  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/overlay_v2_box3.png', omitBackground: true });

  // 4. Overlay Baixe Agora (56 a 58.9s)
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>${commonStyle} .box { font-size: 28px; line-height: 1.2; }</style></head>
    <body>
      <div class="box">BAIXE AGORA COM<br>61% DE DESCONTO</div>
    </body>
    </html>
  `);
  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/overlay_v2_box4.png', omitBackground: true });

  await browser.close();
  console.log("✅ Overlays perfeitamente alinhados gerados!");
}

generateOrangeOverlays().catch(console.error);
