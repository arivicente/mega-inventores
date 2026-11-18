import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('C:/Users/Star/Documents/espionagem1/node_modules/@ffmpeg-installer/ffmpeg');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('C:/Users/Star/Documents/espionagem1/node_modules/msedge-tts');
const ffmpegPath = ffmpeg.path;

console.log("=== RENDERING PERFECT AD 04 EN (FAST PACING + ZERO SPANISH) ===");

const rootDir = path.resolve('C:/Users/Star/Documents/espionagem1/mega-inventors');
const rawVideo = path.join(rootDir, 'assets', 'raw_videos', 'concorrente_video_04.mp4');
const overlaysDir = path.join(rootDir, 'rendered_ads', 'en', 'overlays');
const box1Overlay = path.join(overlaysDir, 'overlay_v4_box1_en.png');
const ctaOverlay = path.join(overlaysDir, 'overlay_ultra_cta_en.png');

const tempDir = path.join(rootDir, 'temp_render', 'en_ad_04_perfect');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const outputVideo = path.join(rootDir, 'rendered_ads', 'en', 'ad_04_en.mp4');

// High-converting 10-beat script in native English matching all scene cuts
const scriptData = [
  { id: "01", fala: "Does your child spend hours glued to screens without creating anything?", legenda: "DOES YOUR CHILD JUST STARE AT SCREENS?" },
  { id: "02", fala: "Swap the tablet for something that brings their spark and curiosity back!", legenda: "SWAP SCREENS FOR REAL CURIOSITY!" },
  { id: "03", fala: "Introducing The Young Inventor's Mega Pack: over 120 hands-on projects!", legenda: "OVER 120 HANDS-ON PROJECTS!" },
  { id: "04", fala: "They build real robots, mechanical cranes, and moving machines with their own hands.", legenda: "THEY BUILD REAL ROBOTS & CRANES!" },
  { id: "05", fala: "Everything is explained step-by-step with clear, illustrated printable blueprints.", legenda: "STEP-BY-STEP ILLUSTRATED BLUEPRINTS" },
  { id: "06", fala: "Just print the sheets and use cardboard and items you already have at home.", legenda: "JUST PRINT & USE EVERYDAY BOXES!" },
  { id: "07", fala: "They walk, grab, and move for real in the real world!", legenda: "THEY MOVE AND WORK FOR REAL!" },
  { id: "08", fala: "Builds problem-solving skills, deep screen-free focus, and unforgettable family memories.", legenda: "BUILDS PROBLEM-SOLVING & FOCUS" },
  { id: "09", fala: "Instant lifetime digital access in your email with a risk-free seven-day guarantee.", legenda: "INSTANT ACCESS & 7-DAY GUARANTEE" },
  { id: "10", fala: "Tap Learn More below and claim the complete Mega Pack for just twenty-seven dollars with five free bonuses today!", legenda: "TAP LEARN MORE FOR JUST $27 TODAY!" }
];

async function synthesizeText(text, targetDir) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata('en-US-ChristopherNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
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

async function run() {
  console.log("1. Synthesizing energetic Christopher Neural voice for all 10 beats...");
  const audioItems = [];
  let currentTime = 0.0;

  for (let i = 0; i < scriptData.length; i++) {
    const item = scriptData[i];
    const phraseDir = path.join(tempDir, `phrase_${item.id}`);
    if (!fs.existsSync(phraseDir)) fs.mkdirSync(phraseDir, { recursive: true });

    const audioPath = path.join(phraseDir, 'audio.mp3');
    if (!fs.existsSync(audioPath)) {
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
    console.log(`  - Beat ${item.id}: [${startTime.toFixed(2)}s -> ${endTime.toFixed(2)}s] (${durSec.toFixed(2)}s)`);
  }

  const targetDuration = 43.5;
  const speedFactor = currentTime / targetDuration;
  console.log(`\nRaw Voice Duration: ${currentTime.toFixed(2)}s | Target: ${targetDuration}s (Speed Factor: ${speedFactor.toFixed(3)}x)`);

  // Concat raw audio
  const concatList = path.join(tempDir, 'concat_list.txt');
  fs.writeFileSync(concatList, audioItems.map(a => `file '${a.audioPath.replace(/\\/g, '/')}'`).join('\n'));

  const rawMasterAudio = path.join(tempDir, 'raw_master_voice.mp3');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i "${concatList}" -c copy "${rawMasterAudio}"`, { stdio: 'pipe' });

  // Pacing adjustment via atempo
  const finalMasterAudio = path.join(tempDir, 'final_voice_synced.mp3');
  execSync(`"${ffmpegPath}" -y -i "${rawMasterAudio}" -filter:a "atempo=${speedFactor.toFixed(4)}" "${finalMasterAudio}"`, { stdio: 'pipe' });

  // Generate ASS dynamic subtitles
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
    if (scaledStart >= 37.0) continue; // Don't collide with final Ultra CTA
    const startStr = formatAssTime(scaledStart);
    const endStr = formatAssTime(Math.min(scaledEnd, 37.0));
    assContent += `Dialogue: 0,${startStr},${endStr},DynamicYellow,,0,0,0,,{\\b1}${item.legenda}{\\b0}\n`;
  }

  const assFile = path.join(tempDir, 'legendas_ad04_en.ass');
  fs.writeFileSync(assFile, assContent);
  console.log("✅ Generated ASS subtitle file");

  const escapedAss = assFile.replace(/\\/g, '/').replace(/:/g, '\\:');

  // FilterGraph:
  // 1. delogo cleans bottom Spanish subtitles: x=20, y=475, w=320, h=65
  // 2. ass applies new dynamic yellow subtitles
  // 3. overlay box1 covers top orange badge with "+120 PRINTABLE PROJECTS" between 6.5s and 11.2s
  // 4. overlay ultra CTA covers final call to action from 37.5s onwards
  const filterGraph = [
    `[0:v]delogo=x=20:y=475:w=320:h=65[v1]`,
    `[v1]ass='${escapedAss}'[v2]`,
    `[v2][1:v]overlay=0:0:enable='between(t,6.5,11.2)'[v3]`,
    `[v3][2:v]overlay=0:0:enable='gte(t,37.5)'[vout]`
  ].join(';');

  console.log("\nRendering final Ad 04 with FFmpeg...");
  const cmd = `"${ffmpegPath}" -y -i "${rawVideo}" -i "${box1Overlay}" -i "${ctaOverlay}" -i "${finalMasterAudio}" -filter_complex "${filterGraph}" -map "[vout]" -map 3:a -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 192k -shortest "${outputVideo}"`;

  execSync(cmd, { stdio: 'inherit' });

  const stats = fs.statSync(outputVideo);
  console.log("\n=======================================================");
  console.log("🎉 AD 04 EN RENDERED SUCCESSFULLY!");
  console.log("Output File:", outputVideo);
  console.log("File Size:", (stats.size / 1024 / 1024).toFixed(2), "MB");
  console.log("=======================================================\n");
}

run().catch(console.error);
