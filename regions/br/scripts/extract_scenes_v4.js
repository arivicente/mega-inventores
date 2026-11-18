import { createRequire } from 'module';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

// Let's extract frames at every 3s with high quality
const dir = path.resolve('mega-inventores/public/anuncios/videos/scenes_v4');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

for (let i = 0; i <= 42; i += 3) {
  const pad = i.toString().padStart(2, '0');
  execSync(`"${ffmpeg.path}" -y -ss ${i} -i "mega-inventores/public/anuncios/videos/concorrente_video_04.mp4" -vframes 1 -q:v 2 "${path.join(dir, `s_${pad}s.jpg`)}"`, { stdio: 'pipe' });
}
console.log("Extracted scenes!");
