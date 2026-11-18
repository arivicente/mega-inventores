import puppeteer from 'puppeteer';
import path from 'path';

async function cropV5Boxes() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640 });

  const frames = [1, 6, 9, 11, 14, 16, 18];
  for (const s of frames) {
    const fn = `f_${s.toString().padStart(2, '0')}s.jpg`;
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v05', fn);
    await page.goto('file:///' + fullPath.replace(/\\/g, '/'));
    
    // Top banner crop
    await page.screenshot({
      path: `mega-inventores/public/anuncios/videos/frames_v05/crop_top_${s}s.jpg`,
      clip: { x: 10, y: 20, width: 340, height: 160 }
    });

    // Subtitle crop
    await page.screenshot({
      path: `mega-inventores/public/anuncios/videos/frames_v05/crop_sub_${s}s.jpg`,
      clip: { x: 10, y: 450, width: 340, height: 120 }
    });
  }

  await browser.close();
  console.log("Crops v05 saved!");
}

cropV5Boxes().catch(console.error);
