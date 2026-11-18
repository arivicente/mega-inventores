import puppeteer from 'puppeteer';
import path from 'path';

async function cropRegions() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640 });

  const testFrames = [6, 14, 20, 26, 32, 36, 40];
  for (const s of testFrames) {
    const fn = `frame_${s.toString().padStart(2, '0')}s.jpg`;
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v04_detailed', fn);
    await page.goto('file:///' + fullPath.replace(/\\/g, '/'));
    
    // Save bottom half crop
    await page.screenshot({
      path: `mega-inventores/public/anuncios/videos/frames_v04_detailed/crop_bottom_${s}s.jpg`,
      clip: { x: 0, y: 350, width: 360, height: 250 }
    });
  }

  await browser.close();
  console.log("Crops saved!");
}

cropRegions().catch(console.error);
