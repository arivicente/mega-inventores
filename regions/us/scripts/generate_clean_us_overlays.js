import fs from 'fs';
import path from 'path';
import puppeteer from 'file:///c:/Users/Star/Documents/espionagem1/mega-inventores_PARA_DELETAR/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const assetsDir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/public/assets';
const outDir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/public/anuncios/videos/overlays_clean_en';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function toDataUri(filePath, mime) {
  const b64 = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${b64}`;
}

const bundle3dUri = toDataUri(path.join(assetsDir, 'bundle-3d-en.png'), 'image/png');
const heroFatherSonUri = toDataUri(path.join(assetsDir, 'hero-father-son-bundle-en.jpg'), 'image/jpeg');

async function generateAll() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });

  // 1. Unified Top Orange Boxes (covers top 30..200px safely on v03, v02, v05)
  const orangeBoxes = [
    { file: 'box_en_cardboard.png', html: 'WITH CARDBOARD &amp; GLUE<br>BUILD AMAZING THINGS!', size: 22 },
    { file: 'box_en_parents.png', html: 'THOUSANDS OF PARENTS<br>ALREADY TRIED IT!', size: 23 },
    { file: 'box_en_future.png', html: "IT'S NOT JUST PLAY.<br>BUILD THEIR FUTURE!", size: 24 },
    { file: 'box_en_120_robotics.png', html: '120+ ROBOTICS &amp;<br>STEM PROJECTS', size: 26 },
    { file: 'box_en_home_kit.png', html: "HOME INVENTOR'S<br>WORKSHOP KIT", size: 26 },
    { file: 'box_en_ages.png', html: 'FOR KIDS AGES<br>5 TO 13 YEARS', size: 27 },
    { file: 'box_en_scissors.png', html: 'ONLY CARDBOARD,<br>SCISSORS &amp; GLUE', size: 25 },
    { file: 'box_en_print_build.png', html: 'PRINT. BUILD.<br>INVENT.', size: 29 }
  ];

  for (const box of orangeBoxes) {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; width: 360px; height: 640px; background: transparent; overflow: hidden; }
          .box {
            position: absolute;
            top: 30px;
            left: 14px;
            width: 332px;
            height: 170px;
            background: linear-gradient(180deg, #FF7315 0%, #F95700 100%);
            border-radius: 26px;
            border: 2px solid rgba(255,255,255,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: 'Impact', 'Arial Black', 'Segoe UI', sans-serif;
            font-weight: 900;
            font-size: ${box.size}px;
            line-height: 1.22;
            color: #FFFFFF;
            letter-spacing: 0.3px;
            text-shadow: 2.5px 2.5px 0px rgba(0,0,0,0.88), -1.5px -1.5px 0px rgba(0,0,0,0.88), 1.5px -1.5px 0px rgba(0,0,0,0.88), -1.5px 1.5px 0px rgba(0,0,0,0.88);
            box-shadow: 0 8px 22px rgba(0,0,0,0.4);
            padding: 12px 16px;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        <div class="box">${box.html}</div>
      </body>
      </html>
    `);
    await page.screenshot({ path: path.join(outDir, box.file), omitBackground: true });
  }

  // 2. Full-screen Product Showcase Card (card_en_mockup.png) - 100% opaque
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 14px 12px; width: 360px; height: 640px;
          background: linear-gradient(180deg, #FBF7F0 0%, #EFE5D5 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex; flex-direction: column; align-items: center; justify-content: space-between;
          overflow: hidden;
        }
        .header-pill {
          background: #0F172A; color: #FFFFFF; font-size: 10.5px; font-weight: 900;
          padding: 7px 12px; border-radius: 50px; letter-spacing: 0.35px;
          border: 1.5px solid #FF6600; text-transform: uppercase; text-align: center;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .title {
          font-size: 19px; font-weight: 900; color: #0F172A; text-align: center;
          line-height: 1.12; margin: 2px 0;
        }
        .title span { color: #EA580C; }
        .hero-wrap {
          width: 100%; display: flex; justify-content: center; align-items: center;
          overflow: hidden; margin: 0;
        }
        .hero-wrap img {
          width: 340px; height: 215px; object-fit: contain; object-position: center;
          transform: translateX(-24px) scale(1.08);
          filter: drop-shadow(0 8px 16px rgba(15,23,42,0.22));
        }
        .bonuses-header {
          font-size: 12px; font-weight: 900; color: #0F172A; text-transform: uppercase;
          letter-spacing: 0.6px; background: #FDE68A; padding: 4px 12px; border-radius: 8px;
          border: 1px solid #F59E0B;
        }
        .bonus-grid {
          width: 100%; display: flex; flex-direction: column; gap: 6px; margin-bottom: 4px;
        }
        .bonus-item {
          background: #FFFFFF; border: 1.5px solid #CBD5E1; border-left: 5px solid #FF6600;
          border-radius: 10px; padding: 7px 10px; display: flex; align-items: center; gap: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }
        .b-num {
          background: #0F172A; color: #FACC15; font-size: 11px; font-weight: 900;
          width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
        }
        .b-text { font-size: 12px; font-weight: 800; color: #1E293B; line-height: 1.2; }
        .b-sub { font-size: 10.5px; font-weight: 600; color: #64748B; }
        .b-free {
          margin-left: auto; background: #DCFCE7; color: #15803D; font-size: 10px;
          font-weight: 900; padding: 3px 6px; border-radius: 6px; flex-shrink: 0;
        }
      </style>
    </head>
    <body>
      <div class="header-pill">COMPLETE DIGITAL EDITION • FOR KIDS AGES 5–13</div>
      <div class="title">THE YOUNG INVENTOR'S<br><span>MEGA PACK (120+ BUILDS)</span></div>
      <div class="hero-wrap"><img src="${bundle3dUri}" /></div>
      <div class="bonuses-header">+ 5 FREE SCREEN-FREE BONUSES INCLUDED</div>
      <div class="bonus-grid">
        <div class="bonus-item"><div class="b-num">#1</div><div><div class="b-text">7-Day Inventor Action Plan</div><div class="b-sub">One quick, exciting mission per day</div></div><div class="b-free">FREE</div></div>
        <div class="bonus-item"><div class="b-num">#2</div><div><div class="b-text">Recycled Materials Checklist</div><div class="b-sub">Everything you already have at home</div></div><div class="b-free">FREE</div></div>
        <div class="bonus-item"><div class="b-num">#3</div><div><div class="b-text">Quick Tuning &amp; Testing Guide</div><div class="b-sub">Step-by-step fixes so every robot works</div></div><div class="b-free">FREE</div></div>
        <div class="bonus-item"><div class="b-num">#4</div><div><div class="b-text">40 Backyard &amp; Outdoor Builds</div><div class="b-sub">Ramps, launchers &amp; weekend tournaments</div></div><div class="b-free">FREE</div></div>
        <div class="bonus-item"><div class="b-num">#5</div><div><div class="b-text">Official Inventor Diplomas</div><div class="b-sub">Printable badges for proud young makers</div></div><div class="b-free">FREE</div></div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(outDir, 'card_en_mockup.png') });

  // 3. Full-screen English Blueprint Card (card_en_blueprint.png) - 100% opaque
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 10px 12px; width: 360px; height: 640px;
          background: #F1F5F9;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          display: flex; flex-direction: column; align-items: center; justify-content: space-between;
          overflow: hidden;
        }
        .top-orange {
          width: 100%; background: linear-gradient(180deg, #FF7315 0%, #F95700 100%);
          border-radius: 18px; padding: 10px 10px; text-align: center;
          color: #FFF; font-family: 'Impact', 'Arial Black', sans-serif; font-size: 20px;
          line-height: 1.15; border: 2px solid rgba(255,255,255,0.5);
          text-shadow: 2px 2px 0 rgba(0,0,0,0.85);
          box-shadow: 0 5px 15px rgba(0,0,0,0.25);
        }
        .sheet {
          width: 100%; flex: 1; margin: 7px 0; background: #FFFFFF;
          border: 2px solid #94A3B8; border-radius: 12px; padding: 9px 10px;
          display: flex; flex-direction: column; justify-content: space-between;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          background-image: linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px);
          background-size: 18px 18px;
        }
        .sheet-head {
          display: flex; justify-content: space-between; align-items: center;
          border-bottom: 2px solid #0F172A; padding-bottom: 5px;
        }
        .sheet-title { font-size: 12px; font-weight: 900; color: #0F172A; }
        .sheet-page {
          background: #0F172A; color: #FACC15; font-size: 10px; font-weight: 900;
          padding: 3px 8px; border-radius: 6px;
        }
        .blueprint-box {
          background: rgba(255,255,255,0.92); border: 1.5px dashed #334155;
          border-radius: 10px; padding: 6px; text-align: center;
        }
        .part-label { font-size: 10.5px; font-weight: 800; color: #334155; margin-bottom: 2px; }
        .legend-row {
          display: flex; justify-content: space-around; font-size: 10px; font-weight: 800;
          color: #1E293B; background: #FFFBEB; border: 1px solid #F59E0B; border-radius: 8px; padding: 5px;
        }
        .steps-card {
          background: #0F172A; color: #FFF; border-radius: 10px; padding: 8px 10px;
          font-size: 11px; line-height: 1.35;
        }
        .steps-card b { color: #FACC15; }
        .bottom-pill {
          width: 100%; background: #15803D; color: #FFF; font-size: 12px; font-weight: 900;
          text-align: center; padding: 8px; border-radius: 10px; letter-spacing: 0.3px;
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div class="top-orange">FOR KIDS AGES 5 TO 13<br>PRINTABLE PDF TEMPLATES</div>
      <div class="sheet">
        <div class="sheet-head">
          <div class="sheet-title">CUTTING TEMPLATE — PROJECT #01<br><span style="color:#EA580C">CARDBOARD HYDRAULIC CRANE</span></div>
          <div class="sheet-page">AGES 5–13</div>
        </div>

        <div class="blueprint-box">
          <div class="part-label">PART B &amp; C — GEAR WHEELS (CUT 2 FROM CARDBOARD)</div>
          <svg width="260" height="90" viewBox="0 0 260 90">
            <g transform="translate(70,45)">
              <circle r="34" fill="#FEF3C7" stroke="#0F172A" stroke-width="2" stroke-dasharray="4 3"/>
              <circle r="24" fill="#FFF" stroke="#0F172A" stroke-width="1.5"/>
              <circle r="5" fill="#EA580C"/>
              <text x="0" y="3" font-size="8" font-weight="bold" text-anchor="middle" dy="14">4.0 in</text>
            </g>
            <g transform="translate(190,45)">
              <circle r="34" fill="#FEF3C7" stroke="#0F172A" stroke-width="2" stroke-dasharray="4 3"/>
              <circle r="24" fill="#FFF" stroke="#0F172A" stroke-width="1.5"/>
              <circle r="5" fill="#EA580C"/>
              <text x="0" y="3" font-size="8" font-weight="bold" text-anchor="middle" dy="14">4.0 in</text>
            </g>
          </svg>
        </div>

        <div class="blueprint-box">
          <div class="part-label">PART D — FOLDABLE CRANE BASE &amp; GLUE TABS</div>
          <svg width="280" height="100" viewBox="0 0 280 100">
            <rect x="75" y="15" width="130" height="70" fill="#FFEDD5" stroke="#0F172A" stroke-width="2"/>
            <rect x="25" y="25" width="50" height="50" fill="#FED7AA" stroke="#0F172A" stroke-width="1.5" stroke-dasharray="4 2"/>
            <rect x="205" y="25" width="50" height="50" fill="#FED7AA" stroke="#0F172A" stroke-width="1.5" stroke-dasharray="4 2"/>
            <text x="140" y="48" font-size="10" font-weight="900" text-anchor="middle" fill="#0F172A">MAIN BASE PANEL</text>
            <text x="140" y="62" font-size="8.5" font-weight="700" text-anchor="middle" fill="#EA580C">Glue Side Tabs Here</text>
            <text x="50" y="54" font-size="8" font-weight="bold" text-anchor="middle">LEFT</text>
            <text x="230" y="54" font-size="8" font-weight="bold" text-anchor="middle">RIGHT</text>
          </svg>
        </div>

        <div class="legend-row">
          <span>- - - CUT LINE</span>
          <span>—— FOLD LINE</span>
          <span>█ GLUE TAB</span>
        </div>

        <div class="steps-card">
          <b>✓ STEP 1:</b> Print Page 1 at 100% scale on regular US Letter paper.<br>
          <b>✓ STEP 2:</b> Tape template to any recycled Amazon cardboard box.<br>
          <b>✓ STEP 3:</b> Cut, fold tabs &amp; watch your hydraulic crane lift!
        </div>
      </div>
      <div class="bottom-pill">120+ PRINTABLE BLUEPRINTS INCLUDED</div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(outDir, 'card_en_blueprint.png') });

  // 4. 3-Panel Split Overlay (card_en_categories.png) - transparent with exact strips covering Spanish labels & shifted watermark
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; width: 360px; height: 640px; background: transparent; font-family: 'Impact', 'Arial Black', sans-serif; overflow: hidden; }
        .cat-bar {
          position: absolute;
          left: 10px;
          width: 340px;
          background: rgba(11, 19, 38, 0.96);
          border: 2px solid #FF6600;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.65);
        }
        .cat-title { color: #FFFFFF; font-size: 24px; line-height: 1.05; letter-spacing: 0.8px; }
        .cat-sub { color: #FACC15; font-family: Arial, sans-serif; font-size: 11px; font-weight: 800; margin-top: 2px; }
        .wm-cover {
          position: absolute;
          top: 224px;
          left: 14px;
          width: 210px;
          height: 38px;
          background: rgba(15, 23, 42, 0.92);
          border: 1.5px solid #FF6600;
          border-radius: 8px;
          color: #FFFFFF;
          font-family: Arial, sans-serif;
          font-size: 11.5px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.4px;
        }
      </style>
    </head>
    <body>
      <div class="cat-bar" style="top: 146px; height: 68px;">
        <div class="cat-title">MECHANISMS</div>
        <div class="cat-sub">Home Inventor's Workshop Kit</div>
      </div>
      <div class="wm-cover">THE YOUNG INVENTOR'S PACK</div>
      <div class="cat-bar" style="top: 358px; height: 68px;">
        <div class="cat-title">MACHINES</div>
        <div class="cat-sub">Home Inventor's Workshop Kit</div>
      </div>
      <div class="cat-bar" style="top: 572px; height: 66px;">
        <div class="cat-title">LAUNCHERS</div>
        <div class="cat-sub">Home Inventor's Workshop Kit</div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(outDir, 'card_en_categories.png'), omitBackground: true });

  // 5. Full-screen Ultra CTA Card (card_en_ultra_cta.png) - 100% opaque, $27 US Offer
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 14px 12px; width: 360px; height: 640px;
          background: linear-gradient(180deg, #0F172A 0%, #070B19 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex; flex-direction: column; align-items: center; justify-content: space-between;
          overflow: hidden;
        }
        .top-badge {
          background: linear-gradient(135deg, #FF5500 0%, #FF2200 100%);
          color: #FFFFFF; font-weight: 900; font-size: 13px; text-transform: uppercase;
          letter-spacing: 0.6px; padding: 9px 18px; border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.45);
          box-shadow: 0 6px 20px rgba(255,34,0,0.5);
        }
        .hero-box {
          width: 100%; border-radius: 16px; overflow: hidden;
          border: 2px solid rgba(255,255,255,0.22);
          box-shadow: 0 10px 25px rgba(0,0,0,0.6);
        }
        .hero-box img { width: 100%; height: 248px; object-fit: cover; object-position: top center; display: block; }
        .cta-card {
          width: 100%; background: rgba(15, 23, 42, 0.98);
          border: 2.5px solid #22C55E; border-radius: 22px;
          padding: 14px 12px 12px; text-align: center;
          box-shadow: 0 12px 30px rgba(0,0,0,0.85), 0 0 28px rgba(34,197,94,0.35);
        }
        .offer-title { color: #FFFFFF; font-size: 15px; font-weight: 900; margin-bottom: 5px; letter-spacing: 0.2px; white-space: nowrap; }
        .price-row { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px; }
        .old-price { color: #94A3B8; font-size: 15px; text-decoration: line-through; font-weight: 700; }
        .new-price { color: #22C55E; font-size: 32px; font-weight: 900; letter-spacing: -0.5px; text-shadow: 0 0 14px rgba(34,197,94,0.45); }
        .discount-pill { background: #EF4444; color: #FFF; font-size: 11px; font-weight: 900; padding: 4px 8px; border-radius: 6px; }
        .cta-button {
          background: linear-gradient(180deg, #22C55E 0%, #15803D 100%);
          color: #FFFFFF; font-size: 17px; font-weight: 900; text-transform: uppercase;
          letter-spacing: 0.5px; padding: 13px 12px; border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.35);
          box-shadow: 0 8px 22px rgba(34,197,94,0.65); margin-bottom: 8px;
          text-shadow: 0 2px 3px rgba(0,0,0,0.4);
        }
        .bonus-tag { color: #FACC15; font-size: 12px; font-weight: 800; margin-bottom: 4px; }
        .guarantee-tag { color: #CBD5E1; font-size: 11px; font-weight: 600; margin-bottom: 6px; }
        .arrows-row { display: flex; justify-content: center; gap: 14px; }
        .arrow-svg { width: 20px; height: 20px; fill: #22C55E; }
      </style>
    </head>
    <body>
      <div class="top-badge">SPECIAL LAUNCH OFFER — 62% OFF</div>
      <div class="hero-box"><img src="${heroFatherSonUri}" /></div>
      <div class="cta-card">
        <div class="offer-title">THE YOUNG INVENTOR'S MEGA PACK</div>
        <div class="price-row">
          <span class="old-price">Reg. $71</span>
          <span class="new-price">$27.00</span>
          <span class="discount-pill">62% OFF</span>
        </div>
        <div class="cta-button">TAP "LEARN MORE" BELOW</div>
        <div class="bonus-tag">+ 5 FREE SUPER BONUSES INCLUDED TODAY</div>
        <div class="guarantee-tag">Instant Lifetime Digital Access • 30-Day Guarantee</div>
        <div class="arrows-row">
          <svg class="arrow-svg" viewBox="0 0 24 24"><path d="M12 21l-8-8 1.4-1.4 5.6 5.6V3h2v14.2l5.6-5.6 1.4 1.4-8 8z"/></svg>
          <svg class="arrow-svg" viewBox="0 0 24 24"><path d="M12 21l-8-8 1.4-1.4 5.6 5.6V3h2v14.2l5.6-5.6 1.4 1.4-8 8z"/></svg>
          <svg class="arrow-svg" viewBox="0 0 24 24"><path d="M12 21l-8-8 1.4-1.4 5.6 5.6V3h2v14.2l5.6-5.6 1.4 1.4-8 8z"/></svg>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(outDir, 'card_en_ultra_cta.png') });

  await browser.close();
  console.log('ALL 12 CLEAN ENGLISH OVERLAYS GENERATED AT:', outDir);
}

generateAll().catch(err => {
  console.error('Overlay generation error:', err);
  process.exit(1);
});
