import { createRequire } from 'module';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const outDir = path.resolve('mega-inventores/public/anuncios/videos/test_delogo_v4');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const testTimes = [3, 6, 9, 15, 18, 21, 24];
for (const t of testTimes) {
  const orig = path.join(outDir, `orig_${t}s.jpg`);
  const delog = path.join(outDir, `delog_${t}s.jpg`);
  
  execSync(`"${ffmpeg.path}" -y -ss ${t} -i "mega-inventores/public/anuncios/videos/concorrente_video_04.mp4" -vframes 1 -q:v 2 "${orig}"`, { stdio: 'pipe' });
  execSync(`"${ffmpeg.path}" -y -ss ${t} -i "mega-inventores/public/anuncios/videos/concorrente_video_04.mp4" -vf "delogo=x=20:y=475:w=320:h=65" -vframes 1 -q:v 2 "${delog}"`, { stdio: 'pipe' });
}

console.log("Delogo test frames generated!");
