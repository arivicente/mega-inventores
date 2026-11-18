import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function findWatermarkBox() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const fullPath = path.resolve('mega-inventores/public/anuncios/videos/scenes_v4/s_00s.jpg');
  const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
  
  const box = await page.evaluate(async (url) => {
    const img = new Image();
    await new Promise(r => { img.onload = r; img.src = url; });
    const c = document.createElement('canvas');
    c.width = 360; c.height = 640;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Scan between y=200 and 300, x=50 and 310
    const matched = [];
    const data = ctx.getImageData(0, 0, 360, 640).data;
    for (let y = 200; y < 300; y++) {
      for (let x = 50; x < 310; x++) {
        const i = (y * 360 + x) * 4;
        const r = data[i], g = data[i+1], b = data[i+2];
        // Watermark text in @licandrajosefina is light gray/white with transparency
        if (r > 165 && g > 165 && b > 165 && Math.abs(r-g)<10 && Math.abs(g-b)<10) {
          matched.push({x, y});
        }
      }
    }
    if (matched.length === 0) return null;
    return {
      minX: Math.min(...matched.map(p => p.x)),
      maxX: Math.max(...matched.map(p => p.x)),
      minY: Math.min(...matched.map(p => p.y)),
      maxY: Math.max(...matched.map(p => p.y)),
      count: matched.length
    };
  }, dataUrl);

  console.log("Watermark box in s_00s:", box);
  await browser.close();
}

findWatermarkBox().catch(console.error);
