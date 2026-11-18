import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function scanBoxes() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  for (let s = 10; s <= 38; s += 2) {
    const fn = `frame_${s.toString().padStart(2, '0')}s.jpg`;
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v04_detailed', fn);
    if (!fs.existsSync(fullPath)) continue;

    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
    const res = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = url; });
      const c = document.createElement('canvas');
      c.width = 360; c.height = 640;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Check for bright colored banners anywhere in upper half (y: 20..250)
      const data = ctx.getImageData(20, 20, 320, 230).data;
      let orange = 0, blue = 0, green = 0, red = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r > 200 && g > 70 && g < 160 && b < 50) orange++;
        if (b > 180 && r < 80) blue++;
        if (g > 180 && r < 80 && b < 80) green++;
        if (r > 200 && g < 60 && b < 60) red++;
      }
      return { orange, blue, green, red };
    }, dataUrl);

    console.log(`t=${s}s: orange=${res.orange}, blue=${res.blue}, green=${res.green}, red=${res.red}`);
  }

  await browser.close();
}

scanBoxes().catch(console.error);
