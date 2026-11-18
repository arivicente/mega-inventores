import { createRequire } from 'module';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const outDir = path.resolve('mega-inventores/public/anuncios/videos/frames_v05');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (let s = 0; s <= 18; s += 1) {
  const pad = s.toString().padStart(2, '0');
  const outFile = path.join(outDir, `f_${pad}s.jpg`);
  execSync(`"${ffmpeg.path}" -y -ss ${s} -i "mega-inventores/public/anuncios/videos/concorrente_video_05.mp4" -vframes 1 -q:v 2 "${outFile}"`, { stdio: 'pipe' });
}

console.log("Frames v05 extracted!");
