import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function inspectTextRegions() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  for (const s of ['f_06s.jpg', 'f_10s.jpg', 'f_15s.jpg']) {
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v05', s);
    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
    
    const info = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = url; });
      const c = document.createElement('canvas');
      c.width = 360; c.height = 640;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Let's divide into 5 vertical bands (0..120, 120..240, 240..360, 360..480, 480..640)
      // and check white pixels with black border (subtitles)
      const bands = [];
      for (let b = 0; b < 640; b += 100) {
        const h = Math.min(100, 640 - b);
        const data = ctx.getImageData(10, b, 340, h).data;
        let whiteCount = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 230 && data[i+1] > 230 && data[i+2] > 230) whiteCount++;
        }
        bands.push({ yRange: `${b}..${b+h}`, whiteCount });
      }
      return bands;
    }, dataUrl);

    console.log(`Regions in ${s}:`, info);
  }

  await browser.close();
}

inspectTextRegions().catch(console.error);
