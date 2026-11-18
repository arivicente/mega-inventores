import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const ffmpegPath = ffmpeg.path;
console.log("=== RENDERIZANDO VÍDEO 01 V3 DEFINITIVO ===");

const videosDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos');
const tempDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_modelagem_v3');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const inputVideo = path.join(videosDir, 'concorrente_video_01.mp4');
const overlayImg = path.join(videosDir, 'overlay_traducao_br.png');
const voiceAudio = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_modelagem_v2', 'antonio_full_voice.mp3');
const outputVideo = path.join(videosDir, 'ad_01_modelado_br.mp4');

// Se o áudio do Antônio já existe, reaproveitamos; senão avisamos
if (!fs.existsSync(voiceAudio)) {
  console.log("Gerando áudio do Antônio novamente...");
  const { MsEdgeTTS, OUTPUT_FORMAT } = require('../node_modules/msedge-tts');
  const tts = new MsEdgeTTS();
  await tts.setMetadata('pt-BR-AntonioNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  await tts.toFile(tempDir, 'Seu filho também passa horas vidrado no celular? Troque as telas por algo que devolva o brilho nos olhos dele! Com o Mega Pack de Inventores, ele constrói seu primeiro robô com as próprias mãos, usando papelão e o que já tem em casa. São mais de cento e vinte projetos ilustrados com vídeos passo a passo. Eles andam, se movem e funcionam de verdade! Menos telas, mais criatividade e momentos inesquecíveis juntos em família. Toque em Saiba Mais e garanta o acesso vitalício com mais de sessenta por cento de desconto hoje!');
  tts.close();
}

const finalVoice = fs.existsSync(voiceAudio) ? voiceAudio : path.join(tempDir, 'audio.mp3');

// Filtro complexo do FFmpeg:
// 1. Delogo suave na legenda em espanhol (sem tarja preta!)
// 2. Delogo suave na marca d'água @licandrajosefina
// 3. Sobreposição do overlay PNG traduzido nos segundos finais (30s a 37s)
const filterGraph = [
  // Delogo na marca d'água no meio da tela
  `[0:v]delogo=x=35:y=285:w=220:h=45[v1]`,
  // Delogo na marca d'água mais alta (carrinho)
  `[v1]delogo=x=80:y=200:w=220:h=45[v2]`,
  // Delogo na legenda amarela em espanhol
  `[v2]delogo=x=40:y=380:w=280:h=45[v3]`,
  // Sobrepor o overlay PNG nos segundos finais (>= 30s)
  `[v3][1:v]overlay=0:0:enable='gte(t,30)'[vout]`
].join(';');

console.log("Executando pipeline de renderização no FFmpeg...");
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -i "${overlayImg}" -i "${finalVoice}" -filter_complex "${filterGraph}" -map "[vout]" -map 2:a -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 192k -shortest "${outputVideo}"`;

execSync(cmd, { stdio: 'pipe' });

const finalStats = fs.statSync(outputVideo);
console.log("\n=======================================================");
console.log("🎉 VÍDEO 01 V3 DEFINITIVO RENDERIZADO COM SUCESSO!");
console.log("Arquivo:", outputVideo);
console.log("Tamanho:", (finalStats.size / 1024 / 1024).toFixed(2), "MB");
console.log("=======================================================\n");
