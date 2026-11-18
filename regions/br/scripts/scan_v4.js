import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function scanVideo4() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Let's inspect frames at 0s, 4s, 8s, 12s, 16s, 20s, 24s, 28s, 32s, 36s, 40s
  const checkSecs = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42];
  
  for (const s of checkSecs) {
    const filename = `frame_${s.toString().padStart(2, '0')}s.jpg`;
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v04_detailed', filename);
    if (!fs.existsSync(fullPath)) continue;

    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
    
    const res = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = url; });
      const c = document.createElement('canvas');
      c.width = 360; c.height = 640;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Check text-like regions:
      // 1. Top box (y between 30 and 180) - orange or colored banner?
      const topData = ctx.getImageData(20, 30, 320, 150).data;
      let orangePixels = 0;
      for (let i = 0; i < topData.length; i += 4) {
        if (topData[i] > 200 && topData[i+1] > 70 && topData[i+1] < 160 && topData[i+2] < 60) orangePixels++;
      }

      // 2. Center watermark (@licandrajosefina: y between 230 and 280, x between 80 and 280)
      // Watermark is usually faint white or gray text
      
      // 3. Bottom subtitle (y between 450 and 550) - yellow text or white text with black border?
      const botData = ctx.getImageData(20, 450, 320, 120).data;
      let yellowSubPixels = 0;
      let whiteSubPixels = 0;
      for (let i = 0; i < botData.length; i += 4) {
        const r = botData[i], g = botData[i+1], b = botData[i+2];
        if (r > 200 && g > 190 && b < 100) yellowSubPixels++;
        if (r > 230 && g > 230 && b > 230) whiteSubPixels++;
      }

      // 4. Middle subtitle (y between 370 and 450)
      const midData = ctx.getImageData(20, 370, 320, 80).data;
      let midYellow = 0;
      for (let i = 0; i < midData.length; i += 4) {
        if (midData[i] > 200 && midData[i+1] > 190 && midData[i+2] < 100) midYellow++;
      }

      return { orangePixels, yellowSubPixels, midYellow };
    }, dataUrl);

    console.log(`Frame ${s}s (${filename}): orange=${res.orangePixels}, botYellow=${res.yellowSubPixels}, midYellow=${res.midYellow}`);
  }

  await browser.close();
}

scanVideo4().catch(console.error);
