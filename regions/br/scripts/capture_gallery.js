import puppeteer from 'puppeteer';
import path from 'path';

async function captureGallery() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  const galleryPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v04_detailed/gallery.html');
  await page.goto('file:///' + galleryPath.replace(/\\/g, '/'));
  await page.screenshot({ path: 'mega-inventores/public/anuncios/videos/frames_v04_detailed/gallery_full.jpg', fullPage: true });
  await browser.close();
  console.log("Full gallery captured!");
}

captureGallery().catch(console.error);
