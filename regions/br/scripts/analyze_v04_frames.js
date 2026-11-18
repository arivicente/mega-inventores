import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function inspectFrames() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const framesDir = path.resolve('mega-inventores/public/anuncios/videos/frames_v04_detailed');
  const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg'));

  for (const f of files) {
    const filePath = path.join(framesDir, f);
    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(filePath).toString('base64');
    
    const analysis = await page.evaluate(async (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          // Check for bright yellow pixels (captions) around y=350 to 550
          const yellowPixels = [];
          const imgData = ctx.getImageData(0, 0, img.width, img.height).data;
          
          for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
              const idx = (y * img.width + x) * 4;
              const r = imgData[idx];
              const g = imgData[idx+1];
              const b = imgData[idx+2];
              // Bright yellow: high R, high G, low B
              if (r > 200 && g > 200 && b < 100) {
                yellowPixels.push({x, y});
              }
            }
          }
          
          // Check for orange banner at the top (y < 200)
          let orangeCount = 0;
          for (let y = 30; y < 200; y++) {
            for (let x = 30; x < img.width - 30; x++) {
              const idx = (y * img.width + x) * 4;
              const r = imgData[idx];
              const g = imgData[idx+1];
              const b = imgData[idx+2];
              if (r > 220 && g > 80 && g < 150 && b < 50) {
                orangeCount++;
              }
            }
          }

          resolve({
            width: img.width,
            height: img.height,
            yellowCount: yellowPixels.length,
            yellowYRange: yellowPixels.length > 0 ? [
              Math.min(...yellowPixels.map(p => p.y)),
              Math.max(...yellowPixels.map(p => p.y))
            ] : null,
            yellowXRange: yellowPixels.length > 0 ? [
              Math.min(...yellowPixels.map(p => p.x)),
              Math.max(...yellowPixels.map(p => p.x))
            ] : null,
            orangeCount
          });
        };
        img.src = url;
      });
    }, dataUrl);

    console.log(`${f}: yellow=${analysis.yellowCount} (Y: ${JSON.stringify(analysis.yellowYRange)}, X: ${JSON.stringify(analysis.yellowXRange)}), orange=${analysis.orangeCount}`);
  }

  await browser.close();
}

inspectFrames().catch(console.error);
