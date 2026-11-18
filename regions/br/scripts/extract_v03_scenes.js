import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg').path;
const video = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'concorrente_video_03.mp4');
const outDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'frames_v03');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (let s = 2; s <= 54; s += 4) {
  const pad = s.toString().padStart(2, '0');
  const out = path.join(outDir, `f_${pad}s.png`);
  execSync(`"${ffmpeg}" -ss 00:00:${pad} -i "${video}" -frames:v 1 -q:v 2 "${out}" -y`, { stdio: 'pipe' });
  console.log(`Frame ${pad}s extraído`);
}
