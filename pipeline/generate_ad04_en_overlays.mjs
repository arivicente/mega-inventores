import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/Star/Documents/espionagem1/kit-pastoral/node_modules/puppeteer');

const outDir = 'C:/Users/Star/Documents/espionagem1/mega-inventors/rendered_ads/en/overlays';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function generateOverlays() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });

  // 1. Top Orange Badge (English: +120 PRINTABLE PROJECTS)
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; width: 360px; height: 640px; background: transparent; font-family: 'Impact', 'Arial Black', sans-serif; overflow: hidden; }
        .box {
          position: absolute;
          top: 54px;
          left: 82px;
          width: 196px;
          height: 56px;
          background: #FF6600;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          font-size: 18px;
          line-height: 1.15;
          font-weight: 900;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.85), -1px -1px 0px rgba(0,0,0,0.85), 1px -1px 0px rgba(0,0,0,0.85), -1px 1px 0px rgba(0,0,0,0.85);
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          padding: 4px 8px;
          box-sizing: border-box;
          border: 2px solid rgba(255, 255, 255, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="box">+120 PRINTABLE<br>PROJECTS</div>
    </body>
    </html>
  `);
  const box1Path = path.join(outDir, 'overlay_v4_box1_en.png');
  await page.screenshot({ path: box1Path, omitBackground: true });
  console.log('✅ Generated overlay_v4_box1_en.png');

  // 2. Bottom Ultra CTA in English ($27 TODAY + 5 BONUSES)
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          width: 360px;
          height: 640px;
          background: transparent;
          font-family: -apple-system, BlinkMacSystemFont, "Montserrat", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
          position: relative;
        }

        .bottom-shadow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 380px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0) 100%);
        }

        .top-badge {
          position: absolute;
          top: 35px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #FF5500 0%, #FF2200 100%);
          color: #FFF;
          font-weight: 900;
          font-size: 13.5px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 10px 22px;
          border-radius: 50px;
          box-shadow: 0 6px 20px rgba(255, 34, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          border: 1.5px solid rgba(255,255,255,0.4);
          text-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }

        .cta-container {
          position: absolute;
          bottom: 18px;
          left: 12px;
          right: 12px;
          background: rgba(11, 19, 38, 0.96);
          border: 2.5px solid #22C55E;
          border-radius: 24px;
          padding: 16px 14px 12px 14px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.9), 0 0 30px rgba(34, 197, 94, 0.4);
        }

        .offer-title {
          color: #FFFFFF;
          font-size: 17px;
          font-weight: 900;
          margin-bottom: 4px;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .old-price {
          color: #94A3B8;
          font-size: 14px;
          text-decoration: line-through;
          font-weight: 700;
        }

        .new-price {
          color: #22C55E;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.5px;
          text-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
        }

        .discount-pill {
          background: #EF4444;
          color: #FFF;
          font-size: 11px;
          font-weight: 900;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
        }

        .cta-button {
          background: linear-gradient(180deg, #22C55E 0%, #15803D 100%);
          color: #FFFFFF;
          font-size: 17px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 14px 12px;
          border-radius: 14px;
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.7), inset 0 2px 0 rgba(255,255,255,0.4);
          border: 1.5px solid rgba(255,255,255,0.3);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-shadow: 0 2px 3px rgba(0,0,0,0.4);
        }

        .bonus-tag {
          color: #FACC15;
          font-size: 12.5px;
          font-weight: 800;
          margin-bottom: 5px;
          letter-spacing: 0.2px;
        }

        .guarantee-tag {
          color: #94A3B8;
          font-size: 11.5px;
          font-weight: 600;
          margin-bottom: 8px;
        }
      </style>
    </head>
    <body>
      <div class="bottom-shadow"></div>

      <div style="position: absolute; top: 46px; left: 0; right: 0; width: 100%; background: linear-gradient(135deg, #FF5500 0%, #FF2200 100%); color: #FFF; font-weight: 900; font-size: 13px; text-transform: uppercase; padding: 12px 16px; border-top: 1.5px solid rgba(255,255,255,0.4); border-bottom: 1.5px solid rgba(255,255,255,0.4); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7); text-shadow: 0 1px 2px rgba(0,0,0,0.4); display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span>⚡ SPECIAL LAUNCH OFFER</span>
        <span style="background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 12px; font-size: 11px;">AGES 5-12</span>
      </div>

      <div class="cta-container">
        <div class="offer-title">
          <span>THE YOUNG INVENTOR'S MEGA PACK</span>
        </div>
        <div class="price-row">
          <span class="old-price">$67.00</span>
          <span class="new-price">$27.00</span>
          <span class="discount-pill">60% OFF</span>
        </div>

        <div class="cta-button">
          <span>👉 TAP LEARN MORE BELOW 👈</span>
        </div>

        <div class="bonus-tag">🎁 INCLUDES 5 EXCLUSIVE BONUSES TODAY</div>
        <div class="guarantee-tag">🔒 100% Risk-Free 7-Day Money-Back Guarantee</div>
      </div>
    </body>
    </html>
  `);
  const ctaPath = path.join(outDir, 'overlay_ultra_cta_en.png');
  await page.screenshot({ path: ctaPath, omitBackground: true });
  console.log('✅ Generated overlay_ultra_cta_en.png');

  await browser.close();
}

generateOverlays().catch(console.error);
