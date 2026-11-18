import { createRequire } from 'module';
import { execSync } from 'child_process';
import path from 'path';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const outDir = path.resolve('mega-inventores/public/anuncios/videos/test_cta_timing');
const fs = require('fs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (let t = 36.5; t <= 39.5; t += 0.5) {
  const f = path.join(outDir, `t_${t.toFixed(1)}s.jpg`);
  execSync(`"${ffmpeg.path}" -y -ss ${t} -i "mega-inventores/public/anuncios/videos/concorrente_video_04.mp4" -vframes 1 -q:v 2 "${f}"`, { stdio: 'pipe' });
}
console.log("CTA timing frames generated!");
