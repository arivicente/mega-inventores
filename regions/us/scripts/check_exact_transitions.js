import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpegPath = require('c:/Users/Star/Documents/espionagem1/node_modules/@ffmpeg-installer/ffmpeg').path;
const videosDir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/public/anuncios/videos';
const outRoot = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/public/anuncios/videos/temp_transitions';

if (!fs.existsSync(outRoot)) fs.mkdirSync(outRoot, { recursive: true });

function makeSheets(videoFile, tag, durationSec) {
  const inPath = path.join(videosDir, videoFile);
  // Generate 15-second chunks at 4 fps (60 frames per 10x6 sheet) with crisp timestamp overlay
  const chunkLen = 15;
  let chunkIdx = 1;
  for (let start = 0; start < durationSec; start += chunkLen) {
    const outPath = path.join(outRoot, `${tag}_part${chunkIdx}.jpg`);
    const dur = Math.min(chunkLen, durationSec - start + 0.25);
    const vf = `fps=4,scale=180:320,drawtext=text='%{pts\\:flt\\:${start.toFixed(2)}}':x=5:y=5:fontsize=18:fontcolor=yellow:box=1:boxcolor=black@0.8,tile=10x6`;
    execSync(`"${ffmpegPath}" -y -ss ${start.toFixed(2)} -t ${dur.toFixed(2)} -i "${inPath}" -vf "${vf}" -frames:v 1 -q:v 3 "${outPath}"`, { stdio: 'pipe' });
    console.log(`Generated ${outPath}`);
    chunkIdx++;
  }
}

makeSheets('concorrente_video_03.mp4', 'v03', 55.0);
makeSheets('concorrente_video_02.mp4', 'v02', 59.0);
makeSheets('concorrente_video_05.mp4', 'v05', 19.0);
console.log('ALL CONTACT SHEETS GENERATED.');
