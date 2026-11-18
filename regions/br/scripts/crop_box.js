import puppeteer from 'puppeteer';
import path from 'path';

async function cropOrangeBox() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640 });

  const fullPath = path.resolve('mega-inventores/public/anuncios/videos/scenes_v4/s_09s.jpg');
  await page.goto('file:///' + fullPath.replace(/\\/g, '/'));
  
  await page.screenshot({
    path: `mega-inventores/public/anuncios/videos/scenes_v4/crop_orange_box.jpg`,
    clip: { x: 70, y: 40, width: 220, height: 80 }
  });

  await browser.close();
  console.log("Orange box crop saved!");
}

cropOrangeBox().catch(console.error);
