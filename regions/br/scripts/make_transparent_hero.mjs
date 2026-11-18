import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const srcJpg = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/mockup_translated_english_1794268501528.jpg';
const destPng = 'c:/Users/Star/Documents/espionagem1/mega-inventors-us/public/assets/mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png';
const destAltPng = 'c:/Users/Star/Documents/espionagem1/mega-inventors-us/public/assets/mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png';

const base64 = fs.readFileSync(srcJpg).toString('base64');

const html = `
<!DOCTYPE html>
<html>
<body style="margin:0; background:transparent;">
<canvas id="c"></canvas>
<script>
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

  // BFS flood-fill from all 4 borders to remove outer white/near-white background
  const visited = new Uint8Array(w * h);
  const queue = [];

  function isWhite(x, y) {
    const idx = (y * w + x) * 4;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    return r > 245 && g > 245 && b > 245;
  }

  // Seed borders
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
    data[pIdx + 3] = 0; // Transparent

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
  window.__done = true;
};
img.src = 'data:image/jpeg;base64,${base64}';
</script>
</body>
</html>
`;

async function convert() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);
  await page.waitForFunction('window.__done === true');

  const canvasHandle = await page.$('#c');
  await canvasHandle.screenshot({
    path: destPng,
    omitBackground: true
  });
  fs.copyFileSync(destPng, destAltPng);
  await browser.close();
  console.log('Saved transparent PNG to', destPng);
}

convert();
