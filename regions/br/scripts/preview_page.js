import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const puppeteer = require('../../kit-pastoral/node_modules/puppeteer');

async function previewPage() {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const filePath = 'file:///' + path.resolve('mega-inventores', 'public', 'index.html').replace(/\\/g, '/');

  // Preview Mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto(filePath, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'mega-inventores/preview_mobile.png', fullPage: false });
  console.log("✅ Mobile preview salvo!");

  // Preview Checkout Section
  const checkoutEl = await page.$('#checkout-section');
  if (checkoutEl) {
    await checkoutEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'mega-inventores/preview_checkout.png', fullPage: false });
    console.log("✅ Checkout preview salvo!");
  }

  await browser.close();
}

previewPage().catch(console.error);
