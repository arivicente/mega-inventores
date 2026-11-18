import puppeteer from 'puppeteer';

async function generateV4Overlay() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; width: 360px; height: 640px; background: transparent; font-family: 'Impact', 'Arial Black', sans-serif; overflow: hidden; }
        .box {
          position: absolute;
          top: 50px;
          left: 75px;
          width: 210px;
          height: 64px;
          background: #FF6600;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          font-size: 19px;
          line-height: 1.2;
          font-weight: 900;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.85), -1px -1px 0px rgba(0,0,0,0.85), 1px -1px 0px rgba(0,0,0,0.85), -1px 1px 0px rgba(0,0,0,0.85);
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          padding: 6px 12px;
          box-sizing: border-box;
          border: 2px solid rgba(255, 255, 255, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="box">+120 PROJETOS<br>PRÁTICOS</div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/overlay_v4_box1.png', omitBackground: true });
  await browser.close();
  console.log("✅ Overlay do Vídeo 04 calibrado e gerado!");
}

generateV4Overlay().catch(console.error);
