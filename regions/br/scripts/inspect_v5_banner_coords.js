import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function inspectBannerCoords() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const testFrames = [1, 8, 13];
  for (const s of testFrames) {
    const fn = `f_${s.toString().padStart(2, '0')}s.jpg`;
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v05', fn);
    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
    
    const res = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = url; });
      const c = document.createElement('canvas');
      c.width = 360; c.height = 640;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const matched = [];
      const data = ctx.getImageData(0, 0, 360, 640).data;
      for (let y = 10; y < 250; y++) {
        for (let x = 10; x < 350; x++) {
          const i = (y * 360 + x) * 4;
          const r = data[i], g = data[i+1], b = data[i+2];
          if (r > 200 && g > 70 && g < 160 && b < 50) {
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
        w: Math.max(...matched.map(p => p.x)) - Math.min(...matched.map(p => p.x)),
        h: Math.max(...matched.map(p => p.y)) - Math.min(...matched.map(p => p.y)),
        count: matched.length
      };
    }, dataUrl);

    console.log(`Banner in frame ${s}s:`, res);
  }

  await browser.close();
}

inspectBannerCoords().catch(console.error);
