import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { MsEdgeTTS, OUTPUT_FORMAT } = require('../node_modules/msedge-tts');
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');

const ffmpegPath = ffmpeg.path;
console.log("=== SISTEMA DE LEGENDA DINÂMICA & VOZ HUMANA ===");

const videosDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos');
const tempDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_legendas');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// As 11 frases rítmicas com emojis e formatação Reels/TikTok
const frases = [
  { id: "01", textoFala: "Seu filho também passa horas vidrado no celular?", textoLegenda: "Seu filho passa horas no celular? 📱" },
  { id: "02", textoFala: "Troque as telas por algo que devolva o brilho nos olhos dele!", textoLegenda: "Troque as telas por curiosidade real! ✨" },
  { id: "03", textoFala: "Com o Mega Pack de Inventores,", textoLegenda: "Com o Mega Pack de Inventores 🤖" },
  { id: "04", textoFala: "ele constrói seu primeiro robô com as próprias mãos,", textoLegenda: "Ele constrói seu 1º robô com as mãos! 🦾" },
  { id: "05", textoFala: "usando papelão e o que já tem em casa.", textoLegenda: "Usando papelão e recicláveis de casa 📦" },
  { id: "06", textoFala: "São mais de cento e vinte projetos ilustrados,", textoLegenda: "Mais de 120 projetos ilustrados 📚" },
  { id: "07", textoFala: "com vídeos fáceis passo a passo.", textoLegenda: "Com vídeos fáceis passo a passo 🎥" },
  { id: "08", textoFala: "Eles andam, se movem e funcionam de verdade!", textoLegenda: "Eles andam e funcionam de verdade! ⚙️" },
  { id: "09", textoFala: "Menos telas, mais criatividade", textoLegenda: "Menos telas, mais criatividade! 💡" },
  { id: "10", textoFala: "e momentos inesquecíveis juntos em família.", textoLegenda: "Momentos inesquecíveis em família 👨‍👩‍👧" },
  { id: "11", textoFala: "Toque em Saiba Mais e garanta o acesso vitalício com sessenta e um por cento de desconto hoje!", textoLegenda: "Aproveite 61% OFF com acesso vitalício! 🚀" }
];

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

async function generateSyncedAudioAndAss() {
  console.log("1. Gerando cada frase com Antônio Neural...");
  const tts = new MsEdgeTTS();
  await tts.setMetadata('pt-BR-AntonioNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const audioItems = [];
  let currentTime = 0.0;

  for (let i = 0; i < frases.length; i++) {
    const item = frases[i];
    const outAudioDir = path.join(tempDir, `phrase_${item.id}`);
    if (!fs.existsSync(outAudioDir)) fs.mkdirSync(outAudioDir, { recursive: true });

    await tts.toFile(outAudioDir, item.textoFala);
    const audioPath = path.join(outAudioDir, 'audio.mp3');

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
    console.log(`- Frase ${item.id}: [${startTime.toFixed(2)}s -> ${endTime.toFixed(2)}s] (${durSec.toFixed(2)}s)`);
  }

  tts.close();

  // Concatenação de todos os áudios
  const concatList = path.join(tempDir, 'concat_list.txt');
  fs.writeFileSync(concatList, audioItems.map(a => `file '${a.audioPath.replace(/\\/g, '/')}'`).join('\n'));

  const masterAudio = path.join(tempDir, 'master_voice.mp3');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i "${concatList}" -c copy "${masterAudio}"`, { stdio: 'pipe' });
  console.log("✅ Áudio master gerado! Duração total:", currentTime.toFixed(2), "s");

  function formatAssTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const cs = Math.floor((seconds % 1) * 100);
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  }

  // Estilo ASS:
  // Cor primária: Amarelo (&H0000FFFF)
  // Borda preta grossa (Outline=2.8)
  // Posicionamento Y=400: em vídeo de 360x640 com MarginV=230 (640-230 = 410px)
  let assContent = `[Script Info]
ScriptType: v4.00+
PlayResX: 360
PlayResY: 640
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: DynamicYellow, Arial, 17, &H0000FFFF, &H000000FF, &H00000000, &H80000000, -1, 0, 0, 0, 100, 100, 0, 0, 1, 2.8, 1.2, 2, 12, 12, 230, 1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  for (const item of audioItems) {
    const start = formatAssTime(item.startTime);
    const end = formatAssTime(item.endTime);
    assContent += `Dialogue: 0,${start},${end},DynamicYellow,,0,0,0,,{\\b1}${item.textoLegenda}{\\b0}\n`;
  }

  const assPath = path.join(tempDir, 'legendas_dinamicas.ass');
  fs.writeFileSync(assPath, assContent);
  console.log("✅ Arquivo de legendas dinâmicas ASS gerado!");

  return { masterAudio, assPath };
}

generateSyncedAudioAndAss().catch(console.error);
