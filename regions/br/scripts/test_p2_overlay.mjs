import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const upDir = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/.user_uploaded/';
const p2Base64 = fs.readFileSync(path.join(upDir, 'media_1794262846206_b295d718.jpg')).toString('base64');

const htmlP2 = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1024px;
    height: 682px;
    position: relative;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  .base { position: absolute; top: 0; left: 0; width: 1024px; height: 682px; }
  
  /* Left panel overlay */
  .p2-badge {
    position: absolute;
    top: 24px;
    left: 36px;
    width: 220px;
    height: 20px;
    background: #09132a;
    color: #ffffff;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.5px;
    z-index: 10;
  }
  .p2-circle {
    position: absolute;
    top: 80px;
    left: 105px;
    width: 70px;
    height: 18px;
    background: #fed000;
    color: #09132a;
    font-size: 11px;
    font-weight: 900;
    text-align: center;
    z-index: 10;
  }
  .p2-title {
    position: absolute;
    top: 232px;
    left: 32px;
    width: 220px;
    height: 80px;
    background: #09132a;
    color: #fed000;
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10;
  }
  .p2-title span { color: #ffffff; font-size: 36px; }
  .p2-desc {
    position: absolute;
    top: 316px;
    left: 34px;
    width: 215px;
    height: 55px;
    background: #09132a;
    color: #ffffff;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.35;
    z-index: 10;
  }
  .p2-specs {
    position: absolute;
    top: 382px;
    left: 34px;
    width: 215px;
    height: 195px;
    background: #09132a;
    border-radius: 12px;
    border: 1px solid #1c3560;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }
  .spec-row { display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 700; color: #ffffff; }
  .p2-btn {
    position: absolute;
    top: 602px;
    left: 32px;
    width: 218px;
    height: 38px;
    background: #00aa6c;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 11px;
    font-weight: 900;
    z-index: 10;
  }

  /* Right panel: Diploma */
  .dip-head {
    position: absolute;
    top: 94px;
    left: 642px;
    width: 320px;
    height: 18px;
    background: #ffffff;
    text-align: center;
    font-size: 11.5px;
    font-weight: 800;
    color: #111827;
    letter-spacing: 0.5px;
    z-index: 10;
  }
  .dip-title {
    position: absolute;
    top: 155px;
    left: 550px;
    width: 420px;
    height: 90px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #0c1b33;
    font-size: 38px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 1px;
    z-index: 10;
  }
  .dip-to {
    position: absolute;
    top: 366px;
    left: 680px;
    width: 160px;
    height: 25px;
    background: #ffffff;
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    color: #111827;
    z-index: 10;
  }
  .dip-reason {
    position: absolute;
    top: 495px;
    left: 545px;
    width: 430px;
    height: 50px;
    background: #ffffff;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.3;
    z-index: 10;
  }
  .dip-date {
    position: absolute;
    top: 660px;
    left: 602px;
    width: 70px;
    height: 20px;
    background: #ffffff;
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
    z-index: 10;
  }
  .dip-sign {
    position: absolute;
    top: 660px;
    left: 855px;
    width: 90px;
    height: 20px;
    background: #ffffff;
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
    z-index: 10;
  }
</style>
</head>
<body>
  <img class="base" src="data:image/jpeg;base64,${p2Base64}">

  <!-- Left Side: Robotic Hand -->
  <div class="p2-badge">YOUNG INVENTORS • ED. 2026</div>
  <div class="p2-circle">PROJECT</div>
  <div class="p2-title">
    <span>BIONIC</span>
    ROBOTIC HAND
  </div>
  <div class="p2-desc">
    Cardboard robotic hand with string tendons: pull strings to bend joints just like human fingers.
  </div>
  <div class="p2-specs">
    <div class="spec-row"><span>👶</span> <span>Age: 7 to 12 years</span></div>
    <div class="spec-row"><span>⏱️</span> <span>Time: 40 minutes</span></div>
    <div class="spec-row"><span>📊</span> <span>Level: Easy</span></div>
    <div class="spec-row"><span>👨‍👩‍👧</span> <span>Parents: not needed</span></div>
    <div class="spec-row"><span>🧠</span> <span>Teaches: human anatomy</span></div>
  </div>
  <div class="p2-btn">100% HOUSEHOLD ITEMS</div>

  <!-- Right Side: Official Diploma -->
  <div class="dip-head">OFFICIAL STEM INVENTORS CLUB</div>
  <div class="dip-title">INVENTOR DIPLOMA</div>
  <div class="dip-to">Awarded to:</div>
  <div class="dip-reason">
    for imagining, building, and testing their own inventions with their own hands.
  </div>
  <div class="dip-date">Date</div>
  <div class="dip-sign">Signature</div>
</body>
</html>
`;

async function testP2() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 682 });
  await page.setContent(htmlP2, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 300));
  const outPath = 'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_p2_en.png';
  await page.screenshot({ path: outPath });
  await browser.close();
  console.log('Saved test p2 to', outPath);
}

testP2();
