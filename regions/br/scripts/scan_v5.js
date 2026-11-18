import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function scanV5() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const files = fs.readdirSync('mega-inventores/public/anuncios/videos/frames_v05').filter(f => f.endsWith('.jpg'));
  
  for (const f of files) {
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v05', f);
    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
    
    const info = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = url; });
      const c = document.createElement('canvas');
      c.width = 360; c.height = 640;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Check text in subtitle region (y: 450..550)
      const sub = ctx.getImageData(20, 450, 320, 100).data;
      let yellowSub = 0, whiteSub = 0;
      for (let i = 0; i < sub.length; i += 4) {
        const r = sub[i], g = sub[i+1], b = sub[i+2];
        if (r > 200 && g > 200 && b < 80) yellowSub++;
        if (r > 220 && g > 220 && b > 220) whiteSub++;
      }

      // Check top area (y: 20..200) for orange/colored banners
      const top = ctx.getImageData(20, 20, 320, 180).data;
      let orangeBanner = 0;
      for (let i = 0; i < top.length; i += 4) {
        const r = top[i], g = top[i+1], b = top[i+2];
        if (r > 200 && g > 70 && g < 160 && b < 50) orangeBanner++;
      }

      // Check middle area (y: 200..450)
      const mid = ctx.getImageData(20, 200, 320, 250).data;
      let midYellow = 0;
      for (let i = 0; i < mid.length; i += 4) {
        const r = mid[i], g = mid[i+1], b = mid[i+2];
        if (r > 200 && g > 200 && b < 80) midYellow++;
      }

      return { yellowSub, whiteSub, orangeBanner, midYellow };
    }, dataUrl);

    console.log(`${f}: sub(y=450..550): yellow=${info.yellowSub}, white=${info.whiteSub} | top orange=${info.orangeBanner} | mid yellow=${info.midYellow}`);
  }

  await browser.close();
}

scanV5().catch(console.error);
