import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function checkAd05Frames() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const times = [2, 8, 13, 16];
  for (const t of times) {
    const fn = `frame_${t}s.jpg`;
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/verify_ad05', fn);
    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
    
    const res = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = url; });
      const c = document.createElement('canvas');
      c.width = 360; c.height = 640;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, 360, 640).data;
      let yellow = 0;
      let neonGreen = 0;
      let orange = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r > 200 && g > 200 && b < 80) yellow++;
        if (r < 60 && g > 220 && b < 60) neonGreen++;
        if (r > 200 && g > 80 && g < 160 && b < 50) orange++;
      }
      return { yellow, neonGreen, orange };
    }, dataUrl);

    console.log(`t=${t}s (${fn}): Yellow=${res.yellow}, NeonGreen=${res.neonGreen}, Orange=${res.orange}`);
  }

  await browser.close();
}

checkAd05Frames().catch(console.error);
