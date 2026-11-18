import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const video = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'concorrente_video_01.mp4');
const outTest = path.resolve('mega-inventores', 'teste_frame_limpo_10s.png');
const outTest34 = path.resolve('mega-inventores', 'teste_frame_limpo_34s.png');

// 1. Testar frame 10s (onde tem a mão mecânica, marca d'água e legenda)
// Delogo na marca d'água + Delogo na legenda (SEM CAIXA PRETA!)
const filter10 = [
  'delogo=x=60:y=200:w=220:h=45',
  'delogo=x=40:y=385:w=280:h=45'
].join(',');

execSync(`"${ffmpeg.path}" -ss 00:00:10 -i "${video}" -vf "${filter10}" -frames:v 1 -q:v 2 "${outTest}" -y`, { stdio: 'pipe' });
console.log("Frame 10s limpo gerado:", outTest);

// 2. Testar frame 34s (onde tem o texto fixo do topo e do botão)
// Delogo na marca d'água e legenda + sobreposição dos textos traduzidos em português
const filter34 = [
  'delogo=x=60:y=200:w=220:h=45',
  'delogo=x=40:y=385:w=280:h=45',
  // Tradução do topo: pílula verde sobre "Lo Descargás Al Instante" com texto em português
  `drawbox=x=25:y=35:w=310:h=48:color=#0E5B4B:t=fill`,
  `drawtext=text='Acesso Imediato no E-mail':fontcolor=white:fontsize=18:x=(w-text_w)/2:y=50`,
  // Tradução do botão: pílula verde sobre "TOCÁ EL BOTÓN" com texto em português
  `drawbox=x=85:y=470:w=190:h=45:color=#0E5B4B:t=fill`,
  `drawtext=text='TOQUE NO BOTÃO':fontcolor=white:fontsize=17:x=(w-text_w)/2:y=483`
].join(',');

execSync(`"${ffmpeg.path}" -ss 00:00:34 -i "${video}" -vf "${filter34}" -frames:v 1 -q:v 2 "${outTest34}" -y`, { stdio: 'pipe' });
console.log("Frame 34s traduzido gerado:", outTest34);
