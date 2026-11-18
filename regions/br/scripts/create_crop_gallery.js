import fs from 'fs';
import path from 'path';

const dir = path.resolve('mega-inventores/public/anuncios/videos/frames_v05');
const files = fs.readdirSync(dir).filter(f => f.startsWith('crop_'));

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Crops Video 05</title>
  <style>
    body { background: #111; color: white; font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; }
    .card { background: #222; border-radius: 8px; padding: 10px; width: 360px; text-align: center; }
    img { width: 100%; border-radius: 4px; border: 1px solid #444; }
    h3 { margin: 5px 0; font-size: 14px; }
  </style>
</head>
<body>
  ${files.map(f => `
    <div class="card">
      <h3>${f}</h3>
      <img src="${f}" />
    </div>
  `).join('')}
</body>
</html>
`;

fs.writeFileSync(path.join(dir, 'gallery_crops.html'), html);
console.log("Crops gallery created!");
