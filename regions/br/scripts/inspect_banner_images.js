import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function inspectBannerImages() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Let's create an HTML that displays the 3 cropped banners in large view
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="background: black; color: white; display: flex; flex-direction: column; gap: 20px; align-items: center; padding: 20px;">
      <h2>Banner 1 (t=1s)</h2>
      <img src="crop_top_1s.jpg" style="width: 500px; border: 2px solid white;">
      <h2>Banner 2 (t=9s)</h2>
      <img src="crop_top_9s.jpg" style="width: 500px; border: 2px solid white;">
      <h2>Banner 3 (t=14s)</h2>
      <img src="crop_top_14s.jpg" style="width: 500px; border: 2px solid white;">
      <h2>Sub 1 (t=6s)</h2>
      <img src="crop_sub_6s.jpg" style="width: 500px; border: 2px solid white;">
      <h2>Sub 2 (t=11s)</h2>
      <img src="crop_sub_11s.jpg" style="width: 500px; border: 2px solid white;">
      <h2>Sub 3 (t=16s)</h2>
      <img src="crop_sub_16s.jpg" style="width: 500px; border: 2px solid white;">
    </body>
    </html>
  `;
  const dir = path.resolve('mega-inventores/public/anuncios/videos/frames_v05');
  fs.writeFileSync(path.join(dir, 'view_banners.html'), html);

  await page.setViewport({ width: 800, height: 1800 });
  await page.goto('file:///' + path.join(dir, 'view_banners.html').replace(/\\/g, '/'));
  await page.screenshot({ path: path.join(dir, 'view_banners_captured.jpg'), fullPage: true });

  await browser.close();
  console.log("View banners captured!");
}

inspectBannerImages().catch(console.error);
