import puppeteer from 'puppeteer';
import fs from 'fs';

const html = `
<!DOCTYPE html>
<html>
<body>
<canvas id="c"></canvas>
<script>
const imgs = [
  'bundle_mockup_italian_v2_1794269891338.jpg',
  'german_product_bundle_mockup_refined_1794269937930.jpg'
];
window.results = [];

let loaded = 0;
imgs.forEach((name, i) => {
  const img = new Image();
  img.onload = () => {
    const c = document.getElementById('c');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const p1 = ctx.getImageData(0, 0, 1, 1).data;
    const p2 = ctx.getImageData(img.width - 1, 0, 1, 1).data;
    const p3 = ctx.getImageData(0, img.height - 1, 1, 1).data;
    window.results.push({ name, p1: Array.from(p1), p2: Array.from(p2), p3: Array.from(p3) });
    loaded++;
    if (loaded === imgs.length) window.__done = true;
  };
  img.src = 'http://localhost/' + name; // we will load via data uri
});
</script>
</body>
</html>
`;
