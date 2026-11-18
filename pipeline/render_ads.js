import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require(path.resolve('mega-inventores', 'node_modules', '@ffmpeg-installer', 'ffmpeg'));
const { MsEdgeTTS, OUTPUT_FORMAT } = require(path.resolve('mega-inventores', 'node_modules', 'msedge-tts'));
const ffmpegPath = ffmpeg.path;

const rootDir = path.resolve('mega-inventors');
const rawVideosDir = path.join(rootDir, 'assets', 'raw_videos');
const tempRoot = path.join(rootDir, 'temp_render');
const outputRoot = path.join(rootDir, 'rendered_ads');

if (!fs.existsSync(tempRoot)) fs.mkdirSync(tempRoot, { recursive: true });
if (!fs.existsSync(outputRoot)) fs.mkdirSync(outputRoot, { recursive: true });

const scriptsData = JSON.parse(fs.readFileSync(path.join(rootDir, 'assets', 'translations', 'ads_scripts.json'), 'utf8'));

async function synthesizeText(text, voice, targetDir) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      await tts.toFile(targetDir, text);
      tts.close();
      return;
    } catch (err) {
      if (tts) {
        try { tts.close(); } catch(e){}
      }
      console.log(`TTS Attempt ${attempt} failed: ${err.message}. Retrying...`);
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

function getAudioDuration(filePath) {
  const res = spawnSync(ffmpegPath, ['-i', filePath]);
  const output = res.stderr.toString();
  const match = output.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2}\.\d{2})/i);
  if (match) {
    const mins = parseFloat(match[2]);
    const secs = parseFloat(match[3]);
    return mins * 60 + secs;
  }
  return 3.5;
}

function formatAssTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const cs = Math.floor((seconds % 1) * 100);
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
}

async function renderAdForLanguage(lang, adDef) {
  const voice = scriptsData.voices[lang];
  const phrases = adDef.translations[lang];
  if (!phrases || phrases.length === 0) {
    console.log(`Pulos sem tradução para [${lang}] no anúncio ${adDef.id}`);
    return;
  }

  const langOutDir = path.join(outputRoot, lang);
  if (!fs.existsSync(langOutDir)) fs.mkdirSync(langOutDir, { recursive: true });

  const outputFile = `ad_${adDef.id}_${lang}.mp4`;
  const outVideoPath = path.join(langOutDir, outputFile);
  const inVideoPath = path.join(rawVideosDir, adDef.inputFile);

  // If already rendered and valid, skip
  if (fs.existsSync(outVideoPath) && fs.statSync(outVideoPath).size > 500000) {
    console.log(`⏩ [${lang.toUpperCase()}] Ad ${adDef.id} já existe (${outputFile}). Pulando.`);
    return;
  }

  console.log(`\n======================================================`);
  console.log(`🎬 RENDERIZANDO [${lang.toUpperCase()}] AD ${adDef.id}: ${outputFile}`);
  console.log(`Voz: ${voice} | Input: ${adDef.inputFile} (${adDef.duration}s)`);
  console.log(`======================================================`);

  const adTempDir = path.join(tempRoot, `${lang}_ad_${adDef.id}`);
  if (!fs.existsSync(adTempDir)) fs.mkdirSync(adTempDir, { recursive: true });

  const audioItems = [];
  let currentTime = 0.0;

  for (let i = 0; i < phrases.length; i++) {
    const item = phrases[i];
    const phraseDir = path.join(adTempDir, `phrase_${i + 1}`);
    if (!fs.existsSync(phraseDir)) fs.mkdirSync(phraseDir, { recursive: true });

    const audioPath = path.join(phraseDir, 'audio.mp3');
    if (!fs.existsSync(audioPath)) {
      await synthesizeText(item.fala, voice, phraseDir);
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
    console.log(`  - Frase ${i + 1}: [${startTime.toFixed(2)}s -> ${endTime.toFixed(2)}s] (${durSec.toFixed(2)}s)`);
  }

  const speedFactor = currentTime / adDef.duration;
  console.log(`Voz bruta: ${currentTime.toFixed(2)}s | Alvo: ${adDef.duration}s (Velocidade: ${speedFactor.toFixed(3)}x)`);

  // Concat raw audio
  const concatList = path.join(adTempDir, 'concat_list.txt');
  fs.writeFileSync(concatList, audioItems.map(a => `file '${a.audioPath.replace(/\\/g, '/')}'`).join('\n'));

  const rawMasterAudio = path.join(adTempDir, 'raw_master_voice.mp3');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i "${concatList}" -c copy "${rawMasterAudio}"`, { stdio: 'pipe' });

  // Speed adjust with atempo
  let atempoFilter = '';
  if (speedFactor > 2.0) {
    atempoFilter = `atempo=2.0,atempo=${(speedFactor / 2.0).toFixed(3)}`;
  } else if (speedFactor < 0.5) {
    atempoFilter = `atempo=0.5,atempo=${(speedFactor / 0.5).toFixed(3)}`;
  } else {
    atempoFilter = `atempo=${speedFactor.toFixed(3)}`;
  }

  const syncedVoice = path.join(adTempDir, 'synced_voice.mp3');
  execSync(`"${ffmpegPath}" -y -i "${rawMasterAudio}" -filter:a "${atempoFilter}" "${syncedVoice}"`, { stdio: 'pipe' });

  // Generate ASS Subtitles
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

  for (const item of audioItems) {
    const scaledStart = item.startTime / speedFactor;
    const scaledEnd = item.endTime / speedFactor;
    const startStr = formatAssTime(scaledStart);
    const endStr = formatAssTime(scaledEnd);
    assContent += `Dialogue: 0,${startStr},${endStr},DynamicYellow,,0,0,0,,{\\b1}${item.legenda}{\\b0}\n`;
  }

  const assFile = path.join(adTempDir, `legendas_${lang}_ad${adDef.id}.ass`);
  fs.writeFileSync(assFile, assContent);
  const escapedAss = assFile.replace(/\\/g, '/').replace(/:/g, '\\:');

  // Mix into final MP4
  console.log(`Renderizando MP4 final: ${outVideoPath}...`);
  const cmd = `"${ffmpegPath}" -y -i "${inVideoPath}" -i "${syncedVoice}" -filter_complex "[0:v]ass='${escapedAss}'[vout]" -map "[vout]" -map 1:a -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest "${outVideoPath}"`;

  execSync(cmd, { stdio: 'pipe' });
  console.log(`✓ Vídeo ${outputFile} concluído com sucesso em ${outVideoPath}!`);
}

async function main() {
  const targetLang = process.argv[2] ? process.argv[2].replace('--lang=', '') : 'all';
  const languages = targetLang === 'all' ? ['en', 'de', 'fr', 'it', 'es'] : [targetLang];

  console.log(`=== PIPELINE CENTRAL DE RENDERIZAÇÃO MEGA INVENTORS ===`);
  console.log(`Idiomas a processar: ${languages.join(', ')}`);

  for (const lang of languages) {
    console.log(`\n>>> PROCESSANDO IDIOMA: [${lang.toUpperCase()}] <<<`);
    for (const adDef of scriptsData.ads) {
      await renderAdForLanguage(lang, adDef);
    }
  }

  console.log(`\n🎉 PROCESSO CONCLUÍDO COM SUCESSO!`);
}

main().catch(err => {
  console.error('Erro no pipeline:', err);
  process.exit(1);
});
