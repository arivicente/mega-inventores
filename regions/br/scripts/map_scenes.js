import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import { execSync } from 'child_process';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const framesDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'mapa_cenas');
if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

const video = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'concorrente_video_01.mp4');

for (let s = 1; s <= 36; s += 3) {
  const ss = (s < 10 ? '0' : '') + s;
  const out = path.join(framesDir, `frame_sec_${ss}.png`);
  execSync(`"${ffmpeg.path}" -ss 00:00:${ss} -i "${video}" -frames:v 1 -q:v 2 "${out}" -y`, { stdio: 'pipe' });
  console.log(`Frame ${ss}s capturado.`);
}
console.log("Todos os frames mapeados com sucesso!");
