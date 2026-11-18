import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const video = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'concorrente_video_01.mp4');
const assFile = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_legendas', 'legendas_dinamicas.ass');
const testFrameOut = path.resolve('mega-inventores', 'teste_legenda_dinamica_frame_10s.png');

// Escape windows path for ffmpeg filter: C\:/path/to/file.ass
const escapedAss = assFile.replace(/\\/g, '/').replace(/:/g, '\\:');

console.log("Caminho do ASS escapado:", escapedAss);

// Filtro:
// 1. delogo na marca d'água
// 2. delogo na legenda em espanhol
// 3. ass com a nova legenda dinâmica brasileira no lugar
const filter = [
  'delogo=x=35:y=285:w=220:h=45',
  'delogo=x=45:y=385:w=270:h=40',
  `ass='${escapedAss}'`
].join(',');

const cmd = `"${ffmpeg.path}" -ss 00:00:10 -i "${video}" -vf "${filter}" -frames:v 1 -q:v 2 "${testFrameOut}" -y`;
console.log("Executando teste no frame 10s...");
execSync(cmd, { stdio: 'pipe' });

console.log("✅ Frame 10s com legenda dinâmica gerado com sucesso em:", testFrameOut);
