import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require(path.resolve('mega-inventores', 'node_modules', '@ffmpeg-installer', 'ffmpeg'));
const { MsEdgeTTS, OUTPUT_FORMAT } = require(path.resolve('mega-inventores', 'node_modules', 'msedge-tts'));
const ffmpegPath = ffmpeg.path;

const videosDir = path.resolve('mega-inventors-us', 'public', 'anuncios', 'videos');
const tempRoot = path.resolve('mega-inventors-us', 'public', 'anuncios', 'videos', 'temp_render_us');
if (!fs.existsSync(tempRoot)) fs.mkdirSync(tempRoot, { recursive: true });

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

const ADS_DEFINITIONS = [
  {
    num: "01",
    inputFile: "concorrente_video_01.mp4",
    outputFile: "ad_01_english.mp4",
    targetDuration: 37.5,
    script: [
      { id: "01", fala: "Does your child spend hours glued to screens? Trade the tablet for something that brings the spark back to their eyes!", legenda: "TRADE SCREENS FOR REAL CURIOSITY!" },
      { id: "02", fala: "With The Young Inventor's Mega Pack, they build their first working robot with their own two hands, using simple cardboard and household items.", legenda: "THEY BUILD ROBOTS THAT ACTUALLY WORK!" },
      { id: "03", fala: "Over one hundred and twenty illustrated projects with step-by-step video guides. They walk, grasp, and move for real!", legenda: "120+ STEP-BY-STEP PROJECTS & VIDEOS" },
      { id: "04", fala: "Less screen addiction, more focus, problem-solving, and genuine family bonding.", legenda: "LESS SCREENS, DEEPER FOCUS & LOGIC" },
      { id: "05", fala: "Tap Learn More below and claim instant lifetime access for just twenty-seven dollars with five free bonuses today!", legenda: "TAP LEARN MORE FOR JUST $27 TODAY!" }
    ]
  },
  {
    num: "02",
    inputFile: "concorrente_video_02.mp4",
    outputFile: "ad_02_english.mp4",
    targetDuration: 58.8,
    script: [
      { id: "01", fala: "Thousands of parents agree: kids put their iPads down the exact second this starts!", legenda: "KIDS PUT PHONES DOWN INSTANTLY!" },
      { id: "02", fala: "Imagine your child swapping hours of screen zombie mode for genuine focus and tactile curiosity.", legenda: "HOURS OF FOCUS INSTEAD OF SCREENS" },
      { id: "03", fala: "Look at the sheer pride in their eyes when they shout: Look Mom, I built this myself!", legenda: "THE PRIDE OF SAYING: I BUILT THIS!" },
      { id: "04", fala: "With The Young Inventor's Mega Pack, you get over one hundred and twenty hands-on projects.", legenda: "OVER 120 HANDS-ON PROJECTS" },
      { id: "05", fala: "Just print, cut, and start inventing with materials you already have around the house.", legenda: "JUST PRINT AND BUILD AT HOME" },
      { id: "06", fala: "All you need is cardboard, safety scissors, and simple recyclables.", legenda: "USING CARDBOARD & RECYCLABLES" },
      { id: "07", fala: "They learn real physics, mechanics, and spatial reasoning while having the time of their life!", legenda: "LEARNING REAL PHYSICS & LOGIC" },
      { id: "08", fala: "Perfect for kids ages four to twelve to unleash their inner engineer.", legenda: "PERFECT FOR KIDS AGES 4 TO 12" },
      { id: "09", fala: "Every single project includes full-color blueprints and clear video walkthroughs.", legenda: "BLUEPRINTS & VIDEO GUIDES INCLUDED" },
      { id: "10", fala: "Safe, wholesome, and exciting family fun for rainy weekends and afternoons.", legenda: "SAFE & FUN FAMILY WEEKENDS" },
      { id: "11", fala: "And best of all: these cardboard robots and simple machines actually move and work!", legenda: "THEY ACTUALLY WALK AND MOVE!" },
      { id: "12", fala: "Your little inventor will spend hours happily focused and building.", legenda: "HOURS OF DEEP ENGAGEMENT" },
      { id: "13", fala: "Life skills that last forever, free from digital addiction.", legenda: "CONFIDENCE THAT LASTS A LIFETIME" },
      { id: "14", fala: "You get instant, lifetime digital access sent straight to your email.", legenda: "INSTANT LIFETIME ACCESS" },
      { id: "15", fala: "Tap Learn More right below and get the complete Mega Pack for just twenty-seven dollars with five free super bonuses today!", legenda: "TAP LEARN MORE FOR $27 TODAY!" }
    ]
  },
  {
    num: "03",
    inputFile: "concorrente_video_03.mp4",
    outputFile: "ad_03_english.mp4",
    targetDuration: 54.8,
    script: [
      { id: "01", fala: "Never hear 'Mom, I'm bored' again this weekend!", legenda: "NEVER HEAR 'I'M BORED' AGAIN!" },
      { id: "02", fala: "Turn an empty Amazon box into a family robotics workshop on your kitchen table.", legenda: "TURN CARDBOARD INTO ROBOTS!" },
      { id: "03", fala: "Instead of mindless gaming, your child learns how levers, hydraulics, and pulleys really work.", legenda: "LEARN HOW MECHANISMS WORK" },
      { id: "04", fala: "Over one hundred and twenty illustrated step-by-step DIY engineering projects.", legenda: "120+ ILLUSTRATED CHALLENGES" },
      { id: "05", fala: "No expensive tools, no complicated electronics, zero frustration.", legenda: "NO EXPENSIVE KITS REQUIRED" },
      { id: "06", fala: "Watch their eyes light up when their first robotic arm actually grabs an object!", legenda: "ROBOTIC ARMS THAT ACTUALLY GRAB!" },
      { id: "07", fala: "Parents of neurodivergent and high-energy kids report incredible focus and calm.", legenda: "IDEAL FOR FOCUS & ADHD" },
      { id: "08", fala: "Includes printable inventor badges, daily challenges, and parent cheat sheets.", legenda: "BADGES & PRINTABLE CERTIFICATES" },
      { id: "09", fala: "Instant digital access to the entire library right to your inbox.", legenda: "INSTANT EMAIL ACCESS" },
      { id: "10", fala: "Tap Learn More below and get sixty-two percent off today for only twenty-seven dollars!", legenda: "GET 62% OFF FOR JUST $27 TODAY!" }
    ]
  },
  {
    num: "04",
    inputFile: "concorrente_video_04.mp4",
    outputFile: "ad_04_english.mp4",
    targetDuration: 43.5,
    script: [
      { id: "01", fala: "You don't need expensive plastic toys to teach your kids real physics and engineering.", legenda: "REAL ENGINEERING WITHOUT EXPENSIVE TOYS" },
      { id: "02", fala: "With The Young Inventor's Mega Pack, your child turns everyday cardboard into incredible moving inventions.", legenda: "TURN BOXES INTO MOVING INVENTIONS" },
      { id: "03", fala: "Over one hundred and twenty blueprints with clear video guides and science breakdowns.", legenda: "120+ BLUEPRINTS & VIDEO GUIDES" },
      { id: "04", fala: "Builds problem-solving skills, motor coordination, and deep screen-free focus.", legenda: "DEEP FOCUS & MOTOR SKILLS" },
      { id: "05", fala: "Tap Learn More below and download the complete pack for just twenty-seven dollars today!", legenda: "TAP LEARN MORE FOR JUST $27 TODAY!" }
    ]
  },
  {
    num: "05",
    inputFile: "concorrente_video_05.mp4",
    outputFile: "ad_05_english.mp4",
    targetDuration: 18.5,
    script: [
      { id: "01", fala: "It's not just playing—it's building your child's future with their own two hands!", legenda: "BUILD YOUR CHILD'S FUTURE!" },
      { id: "02", fala: "With The Young Inventor's Mega Pack, they create over one hundred and twenty working projects!", legenda: "120+ WORKING PROJECTS!" },
      { id: "03", fala: "Using cardboard boxes and recyclables. Robots that actually walk and mechanical claws that grasp!", legenda: "ROBOTS THAT WALK & MOVE!" },
      { id: "04", fala: "Tap Learn More below and get instant lifetime access for just twenty-seven dollars with five free bonuses today!", legenda: "TAP LEARN MORE FOR $27 TODAY!" }
    ]
  }
];

async function renderAd(adDef) {
  console.log(`\n======================================================`);
  console.log(`🎬 RENDERING AD ${adDef.num}: ${adDef.outputFile}`);
  console.log(`======================================================`);

  const adTempDir = path.join(tempRoot, `ad_${adDef.num}`);
  if (!fs.existsSync(adTempDir)) fs.mkdirSync(adTempDir, { recursive: true });

  const audioItems = [];
  let currentTime = 0.0;

  for (let i = 0; i < adDef.script.length; i++) {
    const item = adDef.script[i];
    const phraseDir = path.join(adTempDir, `phrase_${item.id}`);
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
    console.log(`  - Phrase ${item.id}: [${startTime.toFixed(2)}s -> ${endTime.toFixed(2)}s] (${durSec.toFixed(2)}s)`);
  }

  const speedFactor = currentTime / adDef.targetDuration;
  console.log(`Raw duration: ${currentTime.toFixed(2)}s | Target: ${adDef.targetDuration}s (Speed factor: ${speedFactor.toFixed(3)}x)`);

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

  const assFile = path.join(adTempDir, `legendas_ad${adDef.num}.ass`);
  fs.writeFileSync(assFile, assContent);
  const escapedAss = assFile.replace(/\\/g, '/').replace(/:/g, '\\:');

  // Mix into final MP4 with clean audio track
  const inVideoPath = path.join(videosDir, adDef.inputFile);
  const outVideoPath = path.join(videosDir, adDef.outputFile);

  console.log(`Rendering final video: ${adDef.outputFile}...`);
  const cmd = `"${ffmpegPath}" -y -i "${inVideoPath}" -i "${syncedVoice}" -filter_complex "[0:v]ass='${escapedAss}'[vout]" -map "[vout]" -map 1:a -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest "${outVideoPath}"`;
  
  execSync(cmd, { stdio: 'pipe' });
  console.log(`✓ Video ${adDef.outputFile} rendered successfully!`);
}

async function main() {
  console.log("=== STARTING AUTONOMOUS RENDERING OF 5 ENGLISH ADS ===");
  for (const adDef of ADS_DEFINITIONS) {
    await renderAd(adDef);
  }
  console.log("\n=======================================================");
  console.log("🎉 ALL 5 ENGLISH ADS RENDERED SUCCESSFULLY IN US DOLLARS!");
  console.log("=======================================================");
}

main().catch(err => {
  console.error("Rendering error:", err);
  process.exit(1);
});
