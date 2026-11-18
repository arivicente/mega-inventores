import { spawnSync } from 'child_process';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require(path.resolve('mega-inventores', 'node_modules', '@ffmpeg-installer', 'ffmpeg'));

for (let i = 1; i <= 5; i++) {
  const f = path.resolve('mega-inventors-us', 'public', 'anuncios', 'videos', `concorrente_video_0${i}.mp4`);
  const res = spawnSync(ffmpeg.path, ['-i', f]);
  const stderr = res.stderr.toString();
  const m = stderr.match(/Duration:\s*(\d{2}:\d{2}:\d{2}\.\d{2})/);
  console.log(`Video 0${i}: ${m ? m[1] : 'unknown'}`);
}
