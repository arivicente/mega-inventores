import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Let's test overlay on Bonus 01 for English
const upDir = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/.user_uploaded/';
const b1Src = path.join(upDir, 'media_1794262886323_2f0b934a.jpg');
const b1Base64 = fs.readFileSync(b1Src).toString('base64');

const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1024px;
    height: 985px;
    position: relative;
    overflow: hidden;
    font-family: 'Arial Black', Arial, sans-serif;
  }
  .base {
    position: absolute;
    top: 0;
    left: 0;
    width: 1024px;
    height: 985px;
  }
  /* Top Banner patch */
  .top-banner {
    position: absolute;
    top: 25px;
    left: 360px;
    width: 304px;
    height: 52px;
    background: #eedefc; /* matching lavender top card */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    font-weight: 900;
    color: #111827;
    letter-spacing: 2px;
    z-index: 10;
  }
  /* Tablet Title patch */
  .tablet-title {
    position: absolute;
    top: 152px;
    left: 388px;
    width: 248px;
    height: 98px;
    background: #0d172e;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ffffff;
    z-index: 10;
  }
  .tablet-title .t1 {
    font-size: 20px;
    font-weight: 900;
    line-height: 1.1;
    color: #ffffff;
  }
  .tablet-title .t2 {
    font-size: 21px;
    font-weight: 900;
    line-height: 1.1;
    color: #facc15;
    margin-top: 2px;
  }
  /* Tablet Subtitle patch */
  .tablet-sub {
    position: absolute;
    top: 250px;
    left: 390px;
    width: 244px;
    height: 34px;
    background: #0d172e;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #e2e8f0;
    font-family: Arial, sans-serif;
    font-size: 10.5px;
    font-weight: bold;
    line-height: 1.2;
    z-index: 10;
  }
  /* Tablet bottom pill patch */
  .tablet-pill {
    position: absolute;
    top: 504px;
    left: 385px;
    width: 254px;
    height: 22px;
    background: #059669;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 9.5px;
    font-weight: 900;
    letter-spacing: 0.5px;
    z-index: 10;
  }
</style>
</head>
<body>
  <img class="base" src="data:image/jpeg;base64,${b1Base64}">
  <div class="top-banner">BONUS 01</div>
  <div class="tablet-title">
    <div class="t1">7-DAY INVENTOR</div>
    <div class="t2">BLUEPRINT PLAN</div>
  </div>
  <div class="tablet-sub">One week, seven builds,<br>a child focused off screens</div>
  <div class="tablet-pill">FROM ZERO TO INVENTOR IN 7 DAYS</div>
</body>
</html>
`;

async function test() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 985 });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 300));
  const outPath = 'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_b1_en.png';
  await page.screenshot({ path: outPath });
  await browser.close();
  console.log('Saved test b1 to', outPath);
}

test();
