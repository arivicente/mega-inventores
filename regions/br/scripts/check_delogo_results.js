import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function checkDelogoResults() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const testTimes = [3, 6, 9, 15, 18, 21, 24];
  for (const t of testTimes) {
    const orig = path.resolve(`mega-inventores/public/anuncios/videos/test_delogo_v4/orig_${t}s.jpg`);
    const delog = path.resolve(`mega-inventores/public/anuncios/videos/test_delogo_v4/delog_${t}s.jpg`);
    
    const countPixels = async (filePath) => {
      const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(filePath).toString('base64');
      return await page.evaluate(async (url) => {
        const img = new Image();
        await new Promise(r => { img.onload = r; img.src = url; });
        const c = document.createElement('canvas');
        c.width = 360; c.height = 640;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(20, 475, 320, 65).data;
        let whiteCount = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 220 && data[i+1] > 220 && data[i+2] > 220) whiteCount++;
        }
        return whiteCount;
      }, dataUrl);
    };

    const origWhite = await countPixels(orig);
    const delogWhite = await countPixels(delog);
    console.log(`t=${t}s: Orig white pixels=${origWhite} -> Delog white pixels=${delogWhite}`);
  }

  await browser.close();
}

checkDelogoResults().catch(console.error);
