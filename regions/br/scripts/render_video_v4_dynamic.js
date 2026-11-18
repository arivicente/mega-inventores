import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('../node_modules/msedge-tts');
const ffmpegPath = ffmpeg.path;

console.log("=== RENDERIZADOR AD 01 COM ULTRA CTA FINAL ===");

const videosDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos');
const tempDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_v4');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const inputVideo = path.join(videosDir, 'concorrente_video_01.mp4');
const ultraCta = path.join(videosDir, 'overlay_ultra_cta.png');
const outputVideo = path.join(videosDir, 'ad_01_modelado_br.mp4');

const scriptData = [
  { id: "01", fala: "Seu filho passa horas vidrado no celular?", legenda: "SEU FILHO PASSA HORAS NO CELULAR?" },
  { id: "02", fala: "Troque as telas por algo que devolva o brilho nos olhos dele!", legenda: "TROQUE AS TELAS POR CURIOSIDADE REAL!" },
  { id: "03", fala: "Com o Mega Pack de Inventores,", legenda: "COM O MEGA PACK DE INVENTORES" },
  { id: "04", fala: "ele constrói seu primeiro robô com as próprias mãos,", legenda: "ELE CONSTRÓI SEU 1º ROBÔ COM AS MÃOS!" },
  { id: "05", fala: "usando papelão e o que já tem em casa.", legenda: "USANDO PAPELÃO E RECICLÁVEIS DE CASA" },
  { id: "06", fala: "São mais de cento e vinte projetos ilustrados,", legenda: "MAIS DE 120 PROJETOS ILUSTRADOS" },
  { id: "07", fala: "com vídeos fáceis passo a passo.", legenda: "COM VÍDEOS FÁCEIS PASSO A PASSO" },
  { id: "08", fala: "Eles andam, se movem e funcionam de verdade!", legenda: "ELES ANDAM E FUNCIONAM DE VERDADE!" },
  { id: "09", fala: "Menos telas, mais criatividade", legenda: "MENOS TELAS, MAIS CRIATIVIDADE!" },
  { id: "10", fala: "e momentos inesquecíveis juntos em família.", legenda: "MOMENTOS INESQUECÍVEIS EM FAMÍLIA" },
  { id: "11", fala: "Toque em Saiba Mais aqui embaixo e garanta o Mega Pack com sessenta e um por cento de desconto e cinco bônus hoje!", legenda: "APROVEITE 61% OFF COM ACESSO VITALÍCIO!" }
];

async function synthesizeText(text, targetDir) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata('pt-BR-AntonioNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      await tts.toFile(targetDir, text);
      tts.close();
      return;
    } catch (err) {
      if (tts) {
        try { tts.close(); } catch(e){}
      }
      console.log(`Tentativa ${attempt} falhou: ${err.message}. Repetindo...`);
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

function getAudioDuration(filePath) {
  try {
    execSync(`"${ffmpegPath}" -i "${filePath}" -f null -`, { stdio: 'pipe' });
    return 3.0;
  } catch (err) {
    const output = (err.output || []).join(' ') + ' ' + (err.stderr || '');
    const match = output.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2}\.\d{2})/i);
    if (match) {
      const mins = parseFloat(match[2]);
      const secs = parseFloat(match[3]);
      return mins * 60 + secs;
    }
    return 3.0;
  }
}

async function run() {
  console.log("1. Gerando cada trecho de áudio com Antônio Neural...");
  const audioItems = [];
  let currentTime = 0.0;

  for (let i = 0; i < scriptData.length; i++) {
    const item = scriptData[i];
    const phraseDir = path.join(tempDir, `phrase_${item.id}`);
    if (!fs.existsSync(phraseDir)) fs.mkdirSync(phraseDir, { recursive: true });

    const audioPath = path.join(phraseDir, 'audio.mp3');
    if (item.id === "11" || !fs.existsSync(audioPath)) {
      await synthesizeText(item.fala, phraseDir);
    }

    const durSec = getAudioDuration(audioPath);
    const startTime = currentTime;
    const endTime = currentTime + durSec;
    currentTime = endTime;

    audioItems.push({
      ...item,
      audioPath,
      startTime,
      endTime,
      durSec
    });
  }

  const targetDuration = 37.0;
  const speedFactor = currentTime / targetDuration;

  // Concatenação
  const concatList = path.join(tempDir, 'concat_list.txt');
  fs.writeFileSync(concatList, audioItems.map(a => `file '${a.audioPath.replace(/\\/g, '/')}'`).join('\n'));

  const rawMasterAudio = path.join(tempDir, 'raw_master_voice.mp3');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i "${concatList}" -c copy "${rawMasterAudio}"`, { stdio: 'pipe' });

  const finalMasterAudio = path.join(tempDir, 'final_voice_37s.mp3');
  execSync(`"${ffmpegPath}" -y -i "${rawMasterAudio}" -filter:a "atempo=${speedFactor.toFixed(4)}" "${finalMasterAudio}"`, { stdio: 'pipe' });

  function formatAssTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const cs = Math.floor((seconds % 1) * 100);
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  }

  let assContent = `[Script Info]
ScriptType: v4.00+
PlayResX: 360
PlayResY: 640
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: DynamicYellow, Arial, 16, &H0000FFFF, &H000000FF, &H00000000, &H80000000, -1, 0, 0, 0, 100, 100, 0, 0, 1, 2.8, 1.2, 2, 10, 10, 230, 1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  // Legendas até 31.0s (quando a Ultra CTA entra)
  for (const item of audioItems) {
    const scaledStart = item.startTime / speedFactor;
    const scaledEnd = item.endTime / speedFactor;
    if (scaledStart >= 31.0) continue;
    const startStr = formatAssTime(scaledStart);
    const endStr = formatAssTime(Math.min(scaledEnd, 31.0));
    assContent += `Dialogue: 0,${startStr},${endStr},DynamicYellow,,0,0,0,,{\\b1}${item.legenda}{\\b0}\n`;
  }

  const assFile = path.join(tempDir, 'legendas_br.ass');
  fs.writeFileSync(assFile, assContent);

  const escapedAss = assFile.replace(/\\/g, '/').replace(/:/g, '\\:');

  // Filtro FFmpeg do Ad 01 com Ultra CTA:
  // 1. delogo na legenda em espanhol (x=35, y=385, w=290, h=45)
  // 2. ass com a legenda dinâmica
  // 3. overlay da Ultra CTA nos últimos segundos (gte(t,31))
  const filterGraph = [
    `[0:v]delogo=x=35:y=385:w=290:h=45[v1]`,
    `[v1]ass='${escapedAss}'[v2]`,
    `[v2][1:v]overlay=0:0:enable='gte(t,31)'[vout]`
  ].join(';');

  console.log("Renderizando Ad 01 com Ultra CTA no FFmpeg...");
  const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -i "${ultraCta}" -i "${finalMasterAudio}" -filter_complex "${filterGraph}" -map "[vout]" -map 2:a -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 192k -shortest "${outputVideo}"`;

  execSync(cmd, { stdio: 'pipe' });

  const stats = fs.statSync(outputVideo);
  console.log("\n=======================================================");
  console.log("🎉 AD 01 COM ULTRA CTA FINAL RENDERIZADO COM SUCESSO!");
  console.log("Arquivo:", outputVideo);
  console.log("Tamanho:", (stats.size / 1024 / 1024).toFixed(2), "MB");
  console.log("=======================================================\n");
}

run().catch(console.error);
