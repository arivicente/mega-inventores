import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const upDir = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/.user_uploaded/';
const p1Base64 = fs.readFileSync(path.join(upDir, 'media_1794262843462_fd0c90e9.jpg')).toString('base64');

const html = `
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
  .base {
    position: absolute;
    top: 0;
    left: 0;
    width: 1024px;
    height: 682px;
  }
  /* Left Top Yellow Banner */
  .p1-top-banner {
    position: absolute;
    top: 14px;
    left: 69px;
    width: 442px;
    height: 52px;
    background: #fed000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14.5px;
    font-weight: 900;
    color: #111827;
    letter-spacing: 0.5px;
    z-index: 10;
  }
  /* Left Subtitle */
  .p1-sub {
    position: absolute;
    top: 85px;
    left: 302px;
    width: 195px;
    height: 25px;
    background: #fdfbf7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 900;
    color: #0d2040;
    z-index: 10;
  }
  /* 4 Benefit Labels */
  .p1-ben-1 {
    position: absolute;
    top: 215px;
    left: 300px;
    width: 88px;
    height: 20px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    color: #0d2040;
    z-index: 10;
  }
  .p1-ben-2 {
    position: absolute;
    top: 215px;
    left: 405px;
    width: 88px;
    height: 20px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    color: #0d2040;
    z-index: 10;
  }
  .p1-ben-3 {
    position: absolute;
    top: 345px;
    left: 300px;
    width: 88px;
    height: 20px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    color: #0d2040;
    z-index: 10;
  }
  .p1-ben-4 {
    position: absolute;
    top: 345px;
    left: 405px;
    width: 88px;
    height: 20px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    color: #0d2040;
    z-index: 10;
  }
  /* Scissor Labels */
  .p1-scis-1 {
    position: absolute;
    top: 363px;
    left: 205px;
    width: 48px;
    height: 18px;
    background: #fdfbf7;
    font-size: 12px;
    font-weight: 700;
    color: #0d2040;
    z-index: 10;
  }
  .p1-scis-2 {
    position: absolute;
    top: 476px;
    left: 260px;
    width: 50px;
    height: 18px;
    background: #fdfbf7;
    font-size: 12px;
    font-weight: 700;
    color: #0d2040;
    z-index: 10;
  }
  .p1-scis-3 {
    position: absolute;
    top: 476px;
    left: 362px;
    width: 50px;
    height: 18px;
    background: #fdfbf7;
    font-size: 12px;
    font-weight: 700;
    color: #0d2040;
    z-index: 10;
  }
  /* Did You Know Box */
  .p1-box-didyouknow {
    position: absolute;
    top: 517px;
    left: 78px;
    width: 213px;
    height: 87px;
    background: #ffffff;
    border-radius: 6px;
    padding: 8px 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .p1-box-didyouknow .head {
    font-size: 12px;
    font-weight: 900;
    color: #0d2040;
    line-height: 1.2;
  }
  .p1-box-didyouknow .desc {
    font-size: 10.5px;
    font-weight: 700;
    color: #1e293b;
    margin-top: 3px;
    line-height: 1.2;
  }
  /* Challenge Box */
  .p1-box-chal {
    position: absolute;
    top: 502px;
    left: 300px;
    width: 198px;
    height: 102px;
    background: #ffffff;
    border-radius: 6px;
    padding: 6px 8px;
    z-index: 10;
  }
  .p1-box-chal .head {
    text-align: center;
    font-size: 11.5px;
    font-weight: 900;
    color: #0d2040;
    margin-bottom: 4px;
  }
  .p1-box-chal .line {
    font-size: 9.5px;
    font-weight: 700;
    color: #334155;
    padding: 2.5px 0;
    border-top: 1px solid #e2e8f0;
  }
  /* Bottom Family Bar */
  .p1-family-bar {
    position: absolute;
    top: 615px;
    left: 78px;
    width: 422px;
    height: 38px;
    background: #0d2040;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fed000;
    font-size: 11.5px;
    font-weight: 900;
    z-index: 10;
    text-align: center;
  }
  .p1-family-bar span {
    color: #ffffff;
    font-weight: 700;
    margin-left: 4px;
  }

  /* Right Side: Hydraulic Crane Card */
  .p1-r-badge {
    position: absolute;
    top: 30px;
    left: 545px;
    width: 180px;
    height: 18px;
    background: #0c1b33;
    font-size: 10px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.5px;
    z-index: 10;
  }
  .p1-r-circle {
    position: absolute;
    top: 80px;
    left: 560px;
    width: 60px;
    height: 16px;
    background: #fed000;
    font-size: 10px;
    font-weight: 900;
    color: #0c1b33;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .p1-r-title {
    position: absolute;
    top: 155px;
    left: 540px;
    width: 185px;
    height: 105px;
    background: #0c1b33;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10;
  }
  .p1-r-title h1 {
    font-size: 34px;
    font-weight: 900;
    color: #ffffff;
    line-height: 0.95;
    letter-spacing: 1px;
  }
  .p1-r-title h2 {
    font-size: 26px;
    font-weight: 900;
    color: #fed000;
    line-height: 0.95;
    letter-spacing: 1px;
  }
  .p1-r-desc {
    position: absolute;
    top: 268px;
    left: 542px;
    width: 180px;
    height: 70px;
    background: #0c1b33;
    font-size: 11.5px;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.35;
    z-index: 10;
  }
  .p1-r-specs {
    position: absolute;
    top: 375px;
    left: 540px;
    width: 182px;
    height: 200px;
    background: #0c1b33;
    border-radius: 14px;
    border: 1px solid #1e3a6a;
    padding: 12px 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .spec-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
  }
  .spec-icon {
    font-size: 13px;
  }
  .p1-r-btn {
    position: absolute;
    top: 615px;
    left: 540px;
    width: 185px;
    height: 38px;
    background: #00aa6c;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 10.5px;
    font-weight: 900;
    letter-spacing: 0.5px;
    z-index: 10;
  }
</style>
</head>
<body>
  <img class="base" src="data:image/jpeg;base64,${p1Base64}">

  <!-- Left Header -->
  <div class="p1-top-banner">HOW IT WORKS • PROJECT 069 • SCISSOR GRIPPER ROBOT</div>
  <div class="p1-sub">WHAT YOUR CHILD LEARNS</div>

  <!-- Benefits -->
  <div class="p1-ben-1">Levers</div>
  <div class="p1-ben-2">Precision</div>
  <div class="p1-ben-3">Patience</div>
  <div class="p1-ben-4">Creativity</div>

  <!-- Diagram Labels -->
  <div class="p1-scis-1">handles</div>
  <div class="p1-scis-2">pivot</div>
  <div class="p1-scis-3">gripper</div>

  <!-- Did You Know -->
  <div class="p1-box-didyouknow">
    <div class="head">DID YOU KNOW?</div>
    <div class="desc">Scissor linkage arms are used in real construction lifts & heavy loaders.</div>
  </div>

  <!-- Challenge -->
  <div class="p1-box-chal">
    <div class="head">INVENTOR CHALLENGE</div>
    <div class="line"><strong>Ages 5-7:</strong> grab a small toy</div>
    <div class="line"><strong>Ages 8-10:</strong> reach 20 cm away</div>
    <div class="line"><strong>Ages 11+:</strong> add an extra X joint</div>
  </div>

  <!-- Family Fun Bar -->
  <div class="p1-family-bar">
    FAMILY FUN: <span>tidy up toys using only the gripper!</span>
  </div>

  <!-- Right Side: Crane -->
  <div class="p1-r-badge">YOUNG INVENTORS • ED. 2026</div>
  <div class="p1-r-circle">PROJECT</div>
  <div class="p1-r-title">
    <h1>HYDRAULIC</h1>
    <h2>CRANE</h2>
  </div>
  <div class="p1-r-desc">
    A cardboard crane whose boom lifts and lowers powered by real water pressure.
  </div>

  <div class="p1-r-specs">
    <div class="spec-item"><span class="spec-icon">👶</span> <span>Age: 10 to 12 years</span></div>
    <div class="spec-item"><span class="spec-icon">⏱️</span> <span>Time: 60 minutes</span></div>
    <div class="spec-item"><span class="spec-icon">📊</span> <span>Level: Medium</span></div>
    <div class="spec-item"><span class="spec-icon">👨‍👩‍👧</span> <span>Parents: fill syringes</span></div>
    <div class="spec-item"><span class="spec-icon">🧠</span> <span>Teaches: fluid pressure</span></div>
  </div>

  <div class="p1-r-btn">100% HOUSEHOLD ITEMS</div>
</body>
</html>
`;

async function testP1() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 682 });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 300));
  const outPath = 'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_p1_en.png';
  await page.screenshot({ path: outPath });
  await browser.close();
  console.log('Saved test p1 to', outPath);
}

testP1();
