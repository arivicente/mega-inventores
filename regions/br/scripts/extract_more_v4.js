import { createRequire } from 'module';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const outDir = path.resolve('mega-inventores/public/anuncios/videos/frames_v04_detailed');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Extrair um frame a cada 2 segundos
for (let sec = 0; sec <= 43; sec += 2) {
  const pad = sec.toString().padStart(2, '0');
  const outFile = path.join(outDir, `frame_${pad}s.jpg`);
  try {
    execSync(`"${ffmpeg.path}" -y -ss ${sec} -i "mega-inventores/public/anuncios/videos/concorrente_video_04.mp4" -vframes 1 -q:v 2 "${outFile}"`, { stdio: 'pipe' });
  } catch(e) {}
}
console.log("Frames extraídos com sucesso!");
