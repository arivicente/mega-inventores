import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('../node_modules/msedge-tts');
const ffmpegPath = ffmpeg.path;

console.log("=== ATUALIZANDO AD 02 COM ULTRA CTA FINAL ===");

const videosDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos');
const tempDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_ad02');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const inputVideo = path.join(videosDir, 'concorrente_video_02.mp4');
const box1 = path.join(videosDir, 'overlay_v2_box1.png');
const box2 = path.join(videosDir, 'overlay_v2_box2.png');
const box3 = path.join(videosDir, 'overlay_v2_box3.png');
const ultraCta = path.join(videosDir, 'overlay_ultra_cta.png');
const outputVideo = path.join(videosDir, 'ad_02_modelado_br.mp4');

// Roteiro calibrado
const scriptData = [
  { id: "01", fala: "Milhares de pais já comprovaram: as crianças largam o celular no mesmo instante!", legenda: "AS CRIANÇAS LARGAM O CELULAR NA HORA!" },
  { id: "02", fala: "Imagine o seu filho trocando horas de telas por curiosidade e foco real.", legenda: "TROCANDO AS TELAS POR FOCO REAL" },
  { id: "03", fala: "Olha só o orgulho nos olhos dele ao dizer: fui eu que construí!", legenda: "O ORGULHO DE DIZER: FUI EU QUE FIZ!" },
  { id: "04", fala: "Com o Mega Pack de Inventores, você recebe mais de cento e vinte projetos práticos.", legenda: "MAIS DE 120 PROJETOS PRÁTICOS" },
  { id: "05", fala: "É só imprimir, recortar e começar a criar com o que tem em casa.", legenda: "É SÓ IMPRIMIR E MONTAR EM CASA!" },
  { id: "06", fala: "Basta papelão, tesoura sem ponta e materiais recicláveis simples.", legenda: "USANDO PAPELÃO E RECICLÁVEIS" },
  { id: "07", fala: "Eles aprendem física, mecânica e raciocínio lógico brincando!", legenda: "APRENDEM CIÊNCIA E LÓGICA BRINCANDO" },
  { id: "08", fala: "Perfeito para crianças de cinco a doze anos explorarem a imaginação.", legenda: "PARA CRIANÇAS DE 5 A 12 ANOS" },
  { id: "09", fala: "Cada projeto tem guia ilustrado e vídeo passo a passo detalhado.", legenda: "COM GUIAS E VÍDEOS PASSO A PASSO" },
  { id: "10", fala: "Atividades fáceis e seguras que toda a família ama fazer junta.", legenda: "SEGURO, DIVERTIDO E EM FAMÍLIA" },
  { id: "11", fala: "E o melhor: os brinquedos andam, funcionam e se movem de verdade!", legenda: "FUNCIONAM E SE MOVEM DE VERDADE!" },
  { id: "12", fala: "Seu pequeno inventor vai passar tardes inteiras concentrado e criando.", legenda: "TARDES INTEIRAS CONCENTRADO E CRIANDO" },
  { id: "13", fala: "Um aprendizado para a vida toda, longe da dependência das telas.", legenda: "LONGE DAS TELAS E MAIS FELIZ" },
  { id: "14", fala: "Você tem acesso imediato e vitalício a todo o material.", legenda: "ACESSO IMEDIATO E VITALÍCIO" },
  { id: "15", fala: "Toque em Saiba Mais aqui embaixo e garanta o Mega Pack com mais de sessenta por cento de desconto e cinco super bônus hoje!", legenda: "TOQUE ABAIXO COM 61% DE DESCONTO HOJE!" }
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
    return 3.5;
  } catch (err) {
    const output = (err.output || []).join(' ') + ' ' + (err.stderr || '');
    const match = output.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2}\.\d{2})/i);
    if (match) {
      const mins = parseFloat(match[2]);
      const secs = parseFloat(match[3]);
      return mins * 60 + secs;
    }
    return 3.5;
  }
}

async function run() {
  const audioItems = [];
  let currentTime = 0.0;

  for (let i = 0; i < scriptData.length; i++) {
    const item = scriptData[i];
    const phraseDir = path.join(tempDir, `phrase_${item.id}`);
    if (!fs.existsSync(phraseDir)) fs.mkdirSync(phraseDir, { recursive: true });

    const audioPath = path.join(phraseDir, 'audio.mp3');
    if (item.id === "15" || !fs.existsSync(audioPath)) {
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

  const targetDuration = 58.5;
  const speedFactor = currentTime / targetDuration;

  // Concatenação
  const concatList = path.join(tempDir, 'concat_list.txt');
  fs.writeFileSync(concatList, audioItems.map(a => `file '${a.audioPath.replace(/\\/g, '/')}'`).join('\n'));

  const rawMasterAudio = path.join(tempDir, 'raw_master_voice.mp3');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i "${concatList}" -c copy "${rawMasterAudio}"`, { stdio: 'pipe' });

  const finalMasterAudio = path.join(tempDir, 'final_voice_58s.mp3');
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
Style: DynamicYellow, Arial, 15, &H0000FFFF, &H000000FF, &H00000000, &H80000000, -1, 0, 0, 0, 100, 100, 0, 0, 1, 2.8, 1.2, 2, 10, 10, 135, 1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  // Legendas até 53.0s, quando entra a Ultra CTA
  for (const item of audioItems) {
    const scaledStart = item.startTime / speedFactor;
    const scaledEnd = item.endTime / speedFactor;
    if (scaledStart >= 53.0) continue;
    const startStr = formatAssTime(scaledStart);
    const endStr = formatAssTime(Math.min(scaledEnd, 53.0));
    assContent += `Dialogue: 0,${startStr},${endStr},DynamicYellow,,0,0,0,,{\\b1}${item.legenda}{\\b0}\n`;
  }

  const assFile = path.join(tempDir, 'legendas_ad02.ass');
  fs.writeFileSync(assFile, assContent);

  const escapedAss = assFile.replace(/\\/g, '/').replace(/:/g, '\\:');

  // Filtro Ad 02 com Ultra CTA nos últimos 5.5s (gte(t,53))
  const filterGraph = [
    `[0:v]delogo=x=20:y=475:w=320:h=60[v1]`,
    `[v1]ass='${escapedAss}'[v2]`,
    `[v2][1:v]overlay=0:0:enable='between(t,0,4.2)'[v3]`,
    `[v3][2:v]overlay=0:0:enable='between(t,16.5,21.5)'[v4]`,
    `[v4][3:v]overlay=0:0:enable='between(t,28.5,32.5)'[v5]`,
    `[v5][4:v]overlay=0:0:enable='gte(t,53)'[vout]`
  ].join(';');

  console.log("Renderizando Ad 02 com Ultra CTA no FFmpeg...");
  const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -i "${box1}" -i "${box2}" -i "${box3}" -i "${ultraCta}" -i "${finalMasterAudio}" -filter_complex "${filterGraph}" -map "[vout]" -map 5:a -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 192k -shortest "${outputVideo}"`;

  execSync(cmd, { stdio: 'pipe' });

  const stats = fs.statSync(outputVideo);
  console.log("\n=======================================================");
  console.log("🎉 ANÚNCIO 02 COM ULTRA CTA RENDERIZADO COM SUCESSO!");
  console.log("Arquivo:", outputVideo);
  console.log("Tamanho:", (stats.size / 1024 / 1024).toFixed(2), "MB");
  console.log("=======================================================\n");
}

run().catch(console.error);
