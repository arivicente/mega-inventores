import { createRequire } from 'module';
import { spawnSync } from 'child_process';
const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const res = spawnSync(ffmpeg.path, ['-i', 'mega-inventores/public/anuncios/videos/concorrente_video_05.mp4'], { encoding: 'utf-8' });
console.log(res.stderr);
