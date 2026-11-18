import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpegPath = require('c:/Users/Star/Documents/espionagem1/node_modules/@ffmpeg-installer/ffmpeg').path;
const { MsEdgeTTS, OUTPUT_FORMAT } = require('c:/Users/Star/Documents/espionagem1/node_modules/msedge-tts');

const videosDir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/public/anuncios/videos';
const overlaysDir = path.join(videosDir, 'overlays_clean_en');
const tempRoot = path.join(videosDir, 'temp_render_us');
if (!fs.existsSync(tempRoot)) fs.mkdirSync(tempRoot, { recursive: true });

function getAudioDuration(filePath) {
  const res = spawnSync(ffmpegPath, ['-i', filePath]);
  const output = (res.stderr || '').toString();
  const match = output.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2}\.\d{2})/i);
  if (match) {
    return parseFloat(match[2]) * 60 + parseFloat(match[3]);
  }
  return 3.5;
}

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
      if (tts) { try { tts.close(); } catch (e) {} }
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

function formatAssTime(seconds) {
  const sClamped = Math.max(0, seconds);
  const h = Math.floor(sClamped / 3600);
  const m = Math.floor((sClamped % 3600) / 60);
  const s = Math.floor(sClamped % 60);
  const cs = Math.floor((sClamped % 1) * 100);
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
}

const CLEAN_ADS = [
  {
    num: '03',
    inputFile: 'concorrente_video_03.mp4',
    outputFile: 'ad_03_clean_en.mp4',
    targetDuration: 54.8,
    ctaStart: 49.85,
    subMarginV: 125,
    delogos: [
      'delogo=x=14:y=198:w=220:h=46',
      'delogo=x=10:y=466:w=340:h=92'
    ],
    overlays: [
      { file: 'box_en_cardboard.png', enable: 'between(t,0,3.60)' },
      { file: 'box_en_120_robotics.png', enable: 'between(t,8.60,12.95)' },
      { file: 'card_en_mockup.png', enable: 'between(t,15.60,17.40)' },
      { file: 'box_en_home_kit.png', enable: 'between(t,17.40,20.65)' },
      { file: 'card_en_blueprint.png', enable: 'between(t,25.60,29.15)' },
      { file: 'card_en_categories.png', enable: 'between(t,32.15,33.90)' },
      { file: 'box_en_scissors.png', enable: 'between(t,35.35,42.15)' },
      { file: 'box_en_print_build.png', enable: 'between(t,47.35,49.85)' },
      { file: 'card_en_ultra_cta.png', enable: 'gte(t,49.85)' }
    ],
    script: [
      { id: '01', fala: "Never hear 'Mom, I'm bored' again this weekend!", legenda: "NEVER HEAR 'I'M BORED' AGAIN!" },
      { id: '02', fala: "Turn an empty Amazon box into a family robotics workshop on your kitchen table.", legenda: "TURN CARDBOARD INTO ROBOTS!" },
      { id: '03', fala: "Instead of mindless gaming, your child learns how levers, hydraulics, and pulleys really work.", legenda: "LEARN HOW MECHANISMS WORK" },
      { id: '04', fala: "Over one hundred and twenty illustrated step-by-step DIY engineering projects.", legenda: "120+ ILLUSTRATED CHALLENGES" },
      { id: '05', fala: "No expensive tools, no complicated electronics, zero frustration.", legenda: "NO EXPENSIVE KITS REQUIRED" },
      { id: '06', fala: "Watch their eyes light up when their first robotic arm actually grabs an object!", legenda: "ROBOTIC ARMS THAT ACTUALLY GRAB!" },
      { id: '07', fala: "Parents of neurodivergent and high-energy kids report incredible focus and calm.", legenda: "IDEAL FOR FOCUS & ADHD" },
      { id: '08', fala: "Includes printable inventor badges, daily challenges, and parent cheat sheets.", legenda: "BADGES & PRINTABLE CERTIFICATES" },
      { id: '09', fala: "Instant digital access to the entire library right to your inbox.", legenda: "INSTANT EMAIL ACCESS" },
      { id: '10', fala: "Tap Learn More below and get sixty-two percent off today for only twenty-seven dollars!", legenda: "GET 62% OFF FOR JUST $27 TODAY!" }
    ]
  },
  {
    num: '02',
    inputFile: 'concorrente_video_02.mp4',
    outputFile: 'ad_02_clean_en.mp4',
    targetDuration: 58.8,
    ctaStart: 53.30,
    subMarginV: 125,
    delogos: [
      'delogo=x=14:y=198:w=220:h=46',
      'delogo=x=10:y=466:w=340:h=92'
    ],
    overlays: [
      { file: 'box_en_parents.png', enable: 'between(t,0,2.70)' },
      { file: 'box_en_120_robotics.png', enable: 'between(t,6.60,10.70)' },
      { file: 'card_en_mockup.png', enable: 'between(t,14.10,15.90)' },
      { file: 'box_en_home_kit.png', enable: 'between(t,15.90,19.15)' },
      { file: 'card_en_blueprint.png', enable: 'between(t,19.60,22.90)' },
      { file: 'box_en_ages.png', enable: 'between(t,26.85,31.65)' },
      { file: 'card_en_categories.png', enable: 'between(t,31.65,33.15)' },
      { file: 'box_en_scissors.png', enable: 'between(t,38.35,43.15)' },
      { file: 'box_en_print_build.png', enable: 'between(t,49.10,51.65)' },
      { file: 'card_en_ultra_cta.png', enable: 'gte(t,53.30)' }
    ],
    script: [
      { id: '01', fala: "Thousands of parents agree: kids put their iPads down the exact second this starts!", legenda: "KIDS PUT PHONES DOWN INSTANTLY!" },
      { id: '02', fala: "Imagine your child swapping hours of screen zombie mode for genuine focus and tactile curiosity.", legenda: "HOURS OF FOCUS INSTEAD OF SCREENS" },
      { id: '03', fala: "Look at the sheer pride in their eyes when they shout: Look Mom, I built this myself!", legenda: "THE PRIDE OF SAYING: I BUILT THIS!" },
      { id: '04', fala: "With The Young Inventor's Mega Pack, you get over one hundred and twenty hands-on projects.", legenda: "OVER 120 HANDS-ON PROJECTS" },
      { id: '05', fala: "Just print, cut, and start inventing with materials you already have around the house.", legenda: "JUST PRINT AND BUILD AT HOME" },
      { id: '06', fala: "All you need is cardboard, safety scissors, and simple recyclables.", legenda: "USING CARDBOARD & RECYCLABLES" },
      { id: '07', fala: "They learn real physics, mechanics, and spatial reasoning while having the time of their life!", legenda: "LEARNING REAL PHYSICS & LOGIC" },
      { id: '08', fala: "Perfect for kids ages four to twelve to unleash their inner engineer.", legenda: "PERFECT FOR KIDS AGES 4 TO 12" },
      { id: '09', fala: "Every single project includes full-color blueprints and clear video walkthroughs.", legenda: "BLUEPRINTS & VIDEO GUIDES INCLUDED" },
      { id: '10', fala: "Safe, wholesome, and exciting family fun for rainy weekends and afternoons.", legenda: "SAFE & FUN FAMILY WEEKENDS" },
      { id: '11', fala: "And best of all: these cardboard robots and simple machines actually move and work!", legenda: "THEY ACTUALLY WALK AND MOVE!" },
      { id: '12', fala: "Your little inventor will spend hours happily focused and building.", legenda: "HOURS OF DEEP ENGAGEMENT" },
      { id: '13', fala: "Life skills that last forever, free from digital addiction.", legenda: "CONFIDENCE THAT LASTS A LIFETIME" },
      { id: '14', fala: "You get instant, lifetime digital access sent straight to your email.", legenda: "INSTANT LIFETIME ACCESS" },
      { id: '15', fala: "Tap Learn More right below and get the complete Mega Pack for just twenty-seven dollars with five free super bonuses today!", legenda: "TAP LEARN MORE FOR $27 TODAY!" }
    ]
  },
  {
    num: '05',
    inputFile: 'concorrente_video_05.mp4',
    outputFile: 'ad_05_clean_en.mp4',
    targetDuration: 18.5,
    ctaStart: 15.20,
    subMarginV: 195,
    delogos: [
      'delogo=x=12:y=396:w=336:h=72'
    ],
    overlays: [
      { file: 'box_en_future.png', enable: 'between(t,0,2.70)' },
      { file: 'card_en_mockup.png', enable: 'between(t,4.10,5.65)' },
      { file: 'box_en_120_robotics.png', enable: 'between(t,6.85,9.65)' },
      { file: 'card_en_blueprint.png', enable: 'between(t,9.65,12.65)' },
      { file: 'box_en_print_build.png', enable: 'between(t,12.85,14.65)' },
      { file: 'card_en_ultra_cta.png', enable: 'gte(t,15.20)' }
    ],
    script: [
      { id: '01', fala: "It's not just playing—it's building your child's future with their own two hands!", legenda: "BUILD YOUR CHILD'S FUTURE!" },
      { id: '02', fala: "With The Young Inventor's Mega Pack, they create over one hundred and twenty working projects!", legenda: "120+ WORKING PROJECTS!" },
      { id: '03', fala: "Using cardboard boxes and recyclables. Robots that actually walk and mechanical claws that grasp!", legenda: "ROBOTS THAT WALK & MOVE!" },
      { id: '04', fala: "Tap Learn More below and get instant lifetime access for just twenty-seven dollars with five free bonuses today!", legenda: "TAP LEARN MORE FOR $27 TODAY!" }
    ]
  }
];

async function renderCleanAd(ad) {
  console.log(`\n========================================`);
  console.log(`Rendering CLEAN AD ${ad.num}: ${ad.outputFile}`);
  console.log(`========================================`);

  const adTempDir = path.join(tempRoot, `ad_${ad.num}`);
  if (!fs.existsSync(adTempDir)) fs.mkdirSync(adTempDir, { recursive: true });

  const audioItems = [];
  let currentTime = 0.0;
  for (const item of ad.script) {
    const phraseDir = path.join(adTempDir, `phrase_${item.id}`);
    if (!fs.existsSync(phraseDir)) fs.mkdirSync(phraseDir, { recursive: true });
    const audioPath = path.join(phraseDir, 'audio.mp3');
    if (!fs.existsSync(audioPath)) {
      await synthesizeText(item.fala, phraseDir);
    }
    const durSec = getAudioDuration(audioPath);
    audioItems.push({ ...item, audioPath, startTime: currentTime, endTime: currentTime + durSec });
    currentTime += durSec;
  }

  const speedFactor = currentTime / ad.targetDuration;
  const syncedVoice = path.join(adTempDir, 'synced_voice.mp3');
  if (!fs.existsSync(syncedVoice)) {
    const concatList = path.join(adTempDir, 'concat_list.txt');
    fs.writeFileSync(concatList, audioItems.map(a => `file '${a.audioPath.replace(/\\/g, '/')}'`).join('\n'));
    const rawMasterAudio = path.join(adTempDir, 'raw_master_voice.mp3');
    execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i "${concatList}" -c copy "${rawMasterAudio}"`, { stdio: 'pipe' });
    const atempoFilter = speedFactor > 2.0
      ? `atempo=2.0,atempo=${(speedFactor / 2.0).toFixed(3)}`
      : `atempo=${speedFactor.toFixed(3)}`;
    execSync(`"${ffmpegPath}" -y -i "${rawMasterAudio}" -filter:a "${atempoFilter}" "${syncedVoice}"`, { stdio: 'pipe' });
  }

  // ASS subtitles with opaque dark box (BorderStyle=3 uses OutlineColour as box fill in libass)
  let assContent = `[Script Info]
ScriptType: v4.00+
PlayResX: 360
PlayResY: 640
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: CleanDarkPill, Arial, 14, &H0000FFFF, &H000000FF, &H08000000, &H08000000, -1, 0, 0, 0, 100, 100, 0, 0, 3, 6, 0, 2, 14, 14, ${ad.subMarginV}, 1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  const cutoff = ad.ctaStart - 0.15;
  for (const item of audioItems) {
    const scaledStart = item.startTime / speedFactor;
    const scaledEnd = item.endTime / speedFactor;
    if (scaledStart >= cutoff) continue;
    const clampedEnd = Math.min(scaledEnd, cutoff);
    if (clampedEnd <= scaledStart) continue;
    assContent += `Dialogue: 0,${formatAssTime(scaledStart)},${formatAssTime(clampedEnd)},CleanDarkPill,,0,0,0,,{\\b1}${item.legenda}{\\b0}\n`;
  }

  const assFile = path.join(adTempDir, `legendas_clean_ad${ad.num}.ass`);
  fs.writeFileSync(assFile, assContent);
  const escapedAss = assFile.replace(/\\/g, '/').replace(/:/g, '\\:');

  const inVideoPath = path.join(videosDir, ad.inputFile);
  const outVideoPath = path.join(videosDir, ad.outputFile);

  const inputs = [`-i "${inVideoPath}"`, `-i "${syncedVoice}"`];
  ad.overlays.forEach(ov => {
    inputs.push(`-i "${path.join(overlaysDir, ov.file)}"`);
  });

  // Filter graph: base video -> delogos -> ass subtitles -> overlays (in order, so full-screen cards sit cleanly on top)
  const chains = [];
  let curLabel = '0:v';
  ad.delogos.forEach((dl, idx) => {
    const nextLabel = `vd${idx}`;
    chains.push(`[${curLabel}]${dl}[${nextLabel}]`);
    curLabel = nextLabel;
  });

  chains.push(`[${curLabel}]ass='${escapedAss}'[vsub]`);
  curLabel = 'vsub';

  ad.overlays.forEach((ov, idx) => {
    const inputIdx = idx + 2; // 0=video, 1=audio
    const isLast = idx === ad.overlays.length - 1;
    const nextLabel = isLast ? 'vout' : `vo${idx}`;
    chains.push(`[${curLabel}][${inputIdx}:v]overlay=0:0:enable='${ov.enable}'[${nextLabel}]`);
    curLabel = nextLabel;
  });

  const filterGraph = chains.join(';');
  const cmd = `"${ffmpegPath}" -y ${inputs.join(' ')} -filter_complex "${filterGraph}" -map "[vout]" -map 1:a -t ${ad.targetDuration} -c:v libx264 -preset fast -crf 19 -pix_fmt yuv420p -c:a aac -b:a 160k "${outVideoPath}"`;

  execSync(cmd, { stdio: 'pipe' });
  const sizeMb = (fs.statSync(outVideoPath).size / 1024 / 1024).toFixed(2);
  console.log(`Rendered ${ad.outputFile} (${sizeMb} MB)`);
}

async function main() {
  for (const ad of CLEAN_ADS) {
    await renderCleanAd(ad);
  }
  console.log('ALL 3 CLEAN ENGLISH VIDEOS RENDERED SUCCESSFULLY.');
}

main().catch(err => {
  console.error('Render failed:', err);
  process.exit(1);
});
