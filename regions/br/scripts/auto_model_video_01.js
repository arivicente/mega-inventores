import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const googleTTS = require('../node_modules/google-tts-api');
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const ffmpegPath = ffmpeg.path;
console.log("=== INICIANDO MODELAGEM AUTÔNOMA DO VÍDEO 01 ===");
console.log("Binário FFmpeg:", ffmpegPath);

const videosDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos');
const tempDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_modelagem');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const inputVideo = path.join(videosDir, 'concorrente_video_01.mp4');
const outputVideo = path.join(videosDir, 'ad_01_modelado_br.mp4');

const scriptParts = [
  {
    id: "part_01",
    text: "Seu filho também passa horas vidrado nas telas? Troque o celular por algo que devolva o brilho nos olhos dele!"
  },
  {
    id: "part_02",
    text: "Com o Mega Pack de Inventores, ele constrói seu primeiro robô com as próprias mãos, usando papelão e materiais que você já tem em casa."
  },
  {
    id: "part_03",
    text: "São mais de cento e vinte projetos passo a passo com vídeos fáceis. Eles andam, se movem e funcionam de verdade!"
  },
  {
    id: "part_04",
    text: "Menos telas, mais criatividade e momentos inesquecíveis em família."
  },
  {
    id: "part_05",
    text: "Toque em Saiba Mais e garanta o acesso vitalício com sessenta e um por cento de desconto agora mesmo!"
  }
];

async function generateVoiceovers() {
  console.log("\n1. Gerando áudios da locução em Português do Brasil...");
  const audioFiles = [];

  for (let i = 0; i < scriptParts.length; i++) {
    const part = scriptParts[i];
    const outAudio = path.join(tempDir, `${part.id}.mp3`);
    console.log(`- Gerando áudio ${part.id}...`);

    const base64Audio = await googleTTS.getAudioBase64(part.text, {
      lang: 'pt',
      slow: false,
      timeout: 10000,
    });

    fs.writeFileSync(outAudio, Buffer.from(base64Audio, 'base64'));
    audioFiles.push(outAudio);
  }

  // Criar arquivo de lista para concatenação do FFmpeg
  const concatList = path.join(tempDir, 'concat_list.txt');
  const fileLines = audioFiles.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(concatList, fileLines);

  const fullNarration = path.join(tempDir, 'full_narration.mp3');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i "${concatList}" -c copy "${fullNarration}"`, { stdio: 'pipe' });
  console.log("✅ Faixa completa de locução gerada em:", fullNarration);

  return fullNarration;
}

async function renderModelado(narrationAudio) {
  console.log("\n2. Processando vídeo e substituindo áudio espanhol pelo português...");

  // Passo A: Remover áudio original do vídeo concorrente
  const videoNoAudio = path.join(tempDir, 'video_no_audio.mp4');
  execSync(`"${ffmpegPath}" -y -i "${inputVideo}" -an -c:v copy "${videoNoAudio}"`, { stdio: 'pipe' });
  console.log("✅ Áudio em espanhol removido!");

  // Passo B: Mesclar vídeo sem áudio com a nova locução em português
  execSync(`"${ffmpegPath}" -y -i "${videoNoAudio}" -i "${narrationAudio}" -c:v copy -c:a aac -b:a 192k "${outputVideo}"`, { stdio: 'pipe' });
  
  const finalSize = fs.statSync(outputVideo).size;
  console.log("\n=======================================================");
  console.log("🎉 VÍDEO MODELADO 100% AUTÔNOMO CRIADO COM SUCESSO!");
  console.log("Arquivo Final:", outputVideo);
  console.log("Tamanho:", (finalSize / 1024 / 1024).toFixed(2), "MB");
  console.log("=======================================================\n");
}

async function main() {
  const narration = await generateVoiceovers();
  await renderModelado(narration);
}

main().catch(err => {
  console.error("Erro na modelagem autônoma:", err);
  process.exit(1);
});
