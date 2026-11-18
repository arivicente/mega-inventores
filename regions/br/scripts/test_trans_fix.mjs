import puppeteer from 'puppeteer';
import fs from 'fs';

const itSrc = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/bundle_mockup_italian_v2_1794269891338.jpg';
const deSrc = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/german_product_bundle_mockup_refined_1794269937930.jpg';

const itB64 = fs.readFileSync(itSrc).toString('base64');
const deB64 = fs.readFileSync(deSrc).toString('base64');

const html = `
<!DOCTYPE html>
<html>
<body style="margin:0; background:transparent;">
<canvas id="c"></canvas>
<script>
window.processImage = (b64, threshold = 248) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById('c');
      const w = img.width;
      const h = img.height;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const visited = new Uint8Array(w * h);
      const queue = [];

      function isWhite(x, y) {
        const idx = (y * w + x) * 4;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        return r >= threshold && g >= threshold && b >= threshold;
      }

      // Seed all borders
      for (let x = 0; x < w; x++) {
        if (isWhite(x, 0)) { queue.push(x, 0); visited[x] = 1; }
        if (isWhite(x, h - 1)) { queue.push(x, h - 1); visited[(h - 1) * w + x] = 1; }
      }
      for (let y = 0; y < h; y++) {
        if (isWhite(0, y) && !visited[y * w]) { queue.push(0, y); visited[y * w] = 1; }
        if (isWhite(w - 1, y) && !visited[y * w + w - 1]) { queue.push(w - 1, y); visited[y * w + w - 1] = 1; }
      }

      let head = 0;
      while (head < queue.length) {
        const cx = queue[head++];
        const cy = queue[head++];
        const pIdx = (cy * w + cx) * 4;
        data[pIdx + 3] = 0;

        const neighbors = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1]
        ];

        for (let i = 0; i < 4; i++) {
          const nx = neighbors[i][0];
          const ny = neighbors[i][1];
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nPos = ny * w + nx;
            if (!visited[nPos]) {
              visited[nPos] = 1;
              if (isWhite(nx, ny)) {
                queue.push(nx, ny);
              }
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve({ w, h });
    };
    img.src = 'data:image/jpeg;base64,' + b64;
  });
};
</script>
</body>
</html>
`;

async function testBoth() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);

  // 1. Italian
  console.log('Processing IT...');
  await page.evaluate((b64) => window.processImage(b64, 250), itB64);
  const itCanvas = await page.$('#c');
  const itDest = 'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_it_trans.png';
  await itCanvas.screenshot({ path: itDest, omitBackground: true });
  console.log('Saved IT to', itDest);

  // 2. German
  console.log('Processing DE...');
  await page.evaluate((b64) => window.processImage(b64, 250), deB64);
  const deCanvas = await page.$('#c');
  const deDest = 'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_de_trans.png';
  await deCanvas.screenshot({ path: deDest, omitBackground: true });
  console.log('Saved DE to', deDest);

  await browser.close();
}

testBoth();
