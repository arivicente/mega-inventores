import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function checkSubtitles() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const files = fs.readdirSync('mega-inventores/public/anuncios/videos/scenes_v4').filter(f => f.endsWith('.jpg'));
  
  for (const f of files) {
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/scenes_v4', f);
    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(fullPath).toString('base64');
    
    const info = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = url; });
      const c = document.createElement('canvas');
      c.width = 360; c.height = 640;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Let's check if there is text in delogo region (y: 470-530, x: 20-340)
      const subData = ctx.getImageData(20, 470, 320, 70).data;
      let yellowCount = 0;
      let whiteCount = 0;
      let blackCount = 0;
      for (let i = 0; i < subData.length; i += 4) {
        const r = subData[i], g = subData[i+1], b = subData[i+2];
        if (r > 190 && g > 190 && b < 100) yellowCount++;
        if (r > 220 && g > 220 && b > 220) whiteCount++;
        if (r < 30 && g < 30 && b < 30) blackCount++;
      }
      
      // Also check y: 380-450
      const midData = ctx.getImageData(20, 380, 320, 70).data;
      let midYellow = 0;
      for (let i = 0; i < midData.length; i += 4) {
        const r = midData[i], g = midData[i+1], b = midData[i+2];
        if (r > 190 && g > 190 && b < 100) midYellow++;
      }

      // Check watermark @licandrajosefina around y: 220-270
      const wm = ctx.getImageData(80, 220, 200, 50).data;
      let wmPixels = 0;
      for (let i = 0; i < wm.length; i += 4) {
        const r = wm[i], g = wm[i+1], b = wm[i+2];
        // Faint white/gray watermark
        if (Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && r > 160 && r < 230) wmPixels++;
      }

      return { yellowCount, whiteCount, blackCount, midYellow, wmPixels };
    }, dataUrl);

    console.log(`${f}: sub(y=470..540): yellow=${info.yellowCount}, white=${info.whiteCount} | mid(y=380..450): yellow=${info.midYellow} | wm: ${info.wmPixels}`);
  }

  await browser.close();
}

checkSubtitles().catch(console.error);
