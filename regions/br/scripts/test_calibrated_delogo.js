import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const video = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'concorrente_video_01.mp4');
const outTest10 = path.resolve('mega-inventores', 'teste_frame_perfeito_10s.png');
const outTest01 = path.resolve('mega-inventores', 'teste_frame_perfeito_01s.png');

// Coordenadas calibradas milimetricamente
const cleanFilters = [
  'delogo=x=35:y=290:w=215:h=35',
  'delogo=x=50:y=385:w=260:h=40'
].join(',');

execSync(`"${ffmpeg.path}" -ss 00:00:10 -i "${video}" -vf "${cleanFilters}" -frames:v 1 -q:v 2 "${outTest10}" -y`, { stdio: 'pipe' });
execSync(`"${ffmpeg.path}" -ss 00:00:01 -i "${video}" -vf "${cleanFilters}" -frames:v 1 -q:v 2 "${outTest01}" -y`, { stdio: 'pipe' });

console.log("Frames calibrados gerados!");
