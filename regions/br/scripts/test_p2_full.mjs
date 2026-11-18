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

  /* FULL LEFT BLUE CARD COVER */
  .left-card {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 236px;
    height: 642px;
    background: #091428;
    border-radius: 18px 0 0 18px;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }
  .card-top {
    font-size: 10px;
    font-weight: 800;
    color: #94a3b8;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .proj-circle {
    width: 82px;
    height: 82px;
    background: #fed000;
    border-radius: 50%;
    margin: 8px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #091428;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
  .proj-circle .t1 { font-size: 10px; font-weight: 900; letter-spacing: 0.5px; }
  .proj-circle .t2 { font-size: 28px; font-weight: 900; line-height: 1; }
  .proj-title {
    margin-top: 8px;
    text-align: left;
  }
  .proj-title h1 {
    font-size: 34px;
    font-weight: 900;
    color: #ffffff;
    line-height: 0.95;
    letter-spacing: 0.5px;
  }
  .proj-title h2 {
    font-size: 26px;
    font-weight: 900;
    color: #fed000;
    line-height: 0.95;
    letter-spacing: 0.5px;
    margin-top: 2px;
  }
  .proj-desc {
    font-size: 11px;
    color: #cbd5e1;
    line-height: 1.35;
    margin-top: 6px;
    font-weight: 500;
  }
  .proj-specs {
    background: #0f1d38;
    border: 1px solid #1e3a6a;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 6px;
  }
  .spec-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
  }
  .proj-btn {
    background: #00aa6c;
    border-radius: 999px;
    padding: 9px;
    text-align: center;
    color: #ffffff;
    font-size: 10.5px;
    font-weight: 900;
    letter-spacing: 0.5px;
    margin-top: 6px;
  }

  /* FULL RIGHT DIPLOMA INNER COVER */
  .diploma-card {
    position: absolute;
    top: 28px;
    left: 520px;
    width: 480px;
    height: 626px;
    background: #ffffff;
    border: 5px solid #fed000;
    border-radius: 14px;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    z-index: 10;
  }
  .dip-badge {
    font-size: 11px;
    font-weight: 800;
    color: #475569;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .dip-title {
    font-size: 38px;
    font-weight: 900;
    color: #0c1b33;
    line-height: 1.05;
    letter-spacing: 1px;
    margin-top: 6px;
  }
  .dip-awarded {
    font-size: 16px;
    font-weight: 700;
    color: #334155;
    margin-top: 14px;
  }
  .dip-line {
    width: 320px;
    height: 2px;
    background: #0c1b33;
    margin: 8px auto 14px auto;
  }
  .dip-text {
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
    max-width: 380px;
    line-height: 1.4;
  }
  .dip-seal {
    width: 110px;
    height: 110px;
    background: radial-gradient(circle, #fde047 0%, #ca8a04 100%);
    border-radius: 50%;
    border: 3px solid #fef08a;
    box-shadow: 0 4px 14px rgba(202, 138, 4, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
  }
  .dip-seal .s-icon { font-size: 32px; }
  .dip-seal .s-text { font-size: 8px; font-weight: 900; color: #713f12; letter-spacing: 1px; }
  .dip-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 8px;
  }
  .dip-sign-block {
    text-align: center;
  }
  .dip-sign-line {
    width: 120px;
    height: 1.5px;
    background: #0c1b33;
    margin-bottom: 4px;
  }
  .dip-sign-lbl {
    font-size: 12px;
    font-weight: 700;
    color: #475569;
  }
</style>
</head>
<body>
  <!-- The photo of the real hand in the center background -->
  <img class="base" src="data:image/jpeg;base64,${p2Base64}">

  <!-- Left Card: Bionic Hand -->
  <div class="left-card">
    <div class="card-top">YOUNG INVENTORS • ED. 2026</div>
    <div class="proj-circle">
      <span class="t1">PROJECT</span>
      <span class="t2">070</span>
    </div>
    <div class="proj-title">
      <h1>BIONIC</h1>
      <h2>ROBOTIC HAND</h2>
    </div>
    <p class="proj-desc">
      Cardboard robotic hand with string tendons: pull strings to flex joints just like human anatomy.
    </p>
    <div class="proj-specs">
      <div class="spec-item"><span>👶</span> <span>Age: 7 to 12 years</span></div>
      <div class="spec-item"><span>⏱️</span> <span>Time: 40 minutes</span></div>
      <div class="spec-item"><span>📊</span> <span>Level: Easy</span></div>
      <div class="spec-item"><span>👨‍👩‍👧</span> <span>Parents: not needed</span></div>
      <div class="spec-item"><span>🧠</span> <span>Teaches: human anatomy</span></div>
    </div>
    <div class="proj-btn">100% HOUSEHOLD MATERIALS</div>
  </div>

  <!-- Right Card: Diploma -->
  <div class="diploma-card">
    <div class="dip-badge">Young Inventors Club Official Award</div>
    <div class="dip-title">INVENTOR<br>DIPLOMA</div>
    <div>
      <div class="dip-awarded">Awarded to:</div>
      <div class="dip-line"></div>
    </div>
    <div class="dip-text">
      for imagining, building, and testing their own working inventions with their own hands.
    </div>
    <div class="dip-seal">
      <span class="s-icon">💡</span>
      <span class="s-text">CERTIFIED</span>
    </div>
    <div class="dip-footer">
      <div class="dip-sign-block">
        <div class="dip-sign-line"></div>
        <div class="dip-sign-lbl">Date</div>
      </div>
      <div class="dip-sign-block">
        <div class="dip-sign-line"></div>
        <div class="dip-sign-lbl">Signature</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

async function testP2Full() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 682 });
  await page.setContent(htmlP2, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 300));
  const outPath = 'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_p2_full_en.png';
  await page.screenshot({ path: outPath });
  await browser.close();
  console.log('Saved test p2 full to', outPath);
}

testP2Full();
