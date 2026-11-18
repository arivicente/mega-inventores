import { createRequire } from 'module';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const outDir = path.resolve('mega-inventores/public/anuncios/videos/verify_ad05');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const times = [2, 8, 13, 16];
for (const t of times) {
  const f = path.join(outDir, `frame_${t}s.jpg`);
  execSync(`"${ffmpeg.path}" -y -ss ${t} -i "mega-inventores/public/anuncios/videos/ad_05_modelado_br.mp4" -vframes 1 -q:v 2 "${f}"`, { stdio: 'pipe' });
  console.log(`Saved frame at ${t}s`);
}
