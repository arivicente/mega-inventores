import fs from 'fs';
import path from 'path';

const framesDir = path.resolve('mega-inventores/public/anuncios/videos/frames_v04_detailed');
const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg'));

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Frames Video 04</title>
  <style>
    body { background: #111; color: white; font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 15px; padding: 20px; }
    .card { background: #222; border-radius: 8px; padding: 10px; width: 220px; text-align: center; }
    img { width: 100%; border-radius: 4px; }
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

fs.writeFileSync(path.join(framesDir, 'gallery.html'), html);
console.log("Gallery created!");
