import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function checkTiming() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  for (let t = 36.5; t <= 39.5; t += 0.5) {
    const fn = `t_${t.toFixed(1)}s.jpg`;
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/test_cta_timing', fn);
    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
    
    const count = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = url; });
      const c = document.createElement('canvas');
      c.width = 360; c.height = 640;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, 360, 640).data;
      let orange = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 200 && data[i+1] > 80 && data[i+1] < 150 && data[i+2] < 50) orange++;
      }
      return orange;
    }, dataUrl);

    console.log(`${fn}: orange pixels = ${count}`);
  }

  await browser.close();
}

checkTiming().catch(console.error);
