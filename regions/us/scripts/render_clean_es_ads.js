import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpegPath = require('c:/Users/Star/Documents/espionagem1/node_modules/@ffmpeg-installer/ffmpeg').path;
const { MsEdgeTTS, OUTPUT_FORMAT } = require('c:/Users/Star/Documents/espionagem1/node_modules/msedge-tts');

const videosDir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/public/anuncios/videos';
const overlaysDir = path.join(videosDir, 'overlays_clean_es');
const tempRoot = path.join(videosDir, 'temp_render_es');
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
      await tts.setMetadata('es-US-AlonsoNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
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
    outputFile: 'ad_03_clean_es.mp4',
    targetDuration: 54.8,
    ctaStart: 49.85,
    subMarginV: 125,
    delogos: [
      'delogo=x=14:y=198:w=220:h=46',
      'delogo=x=10:y=466:w=340:h=92'
    ],
    overlays: [
      { file: 'box_es_cardboard.png', enable: 'between(t,0,3.60)' },
      { file: 'box_es_120_robotics.png', enable: 'between(t,8.60,12.95)' },
      { file: 'card_es_mockup.png', enable: 'between(t,15.60,17.40)' },
      { file: 'box_es_home_kit.png', enable: 'between(t,17.40,20.65)' },
      { file: 'card_es_blueprint.png', enable: 'between(t,25.60,29.15)' },
      { file: 'card_es_categories.png', enable: 'between(t,32.15,33.90)' },
      { file: 'box_es_scissors.png', enable: 'between(t,35.35,42.15)' },
      { file: 'box_es_print_build.png', enable: 'between(t,47.35,49.85)' },
      { file: 'card_es_ultra_cta.png', enable: 'gte(t,49.85)' }
    ],
    script: [
      { id: '01', fala: "¡No vuelvas a escuchar 'Papá, estoy aburrido' este fin de semana!", legenda: "¡ADIÓS AL 'ESTOY ABURRIDO'!" },
      { id: '02', fala: "Convierte una simple caja de cartón en un taller de robótica sobre la mesa de tu casa.", legenda: "¡TRANSFORMA CARTÓN EN ROBOTS!" },
      { id: '03', fala: "En lugar de horas pegados a las pantallas, tus hijos aprenden cómo funcionan las palancas, la hidráulica y los engranajes reales.", legenda: "APRENDEN MECÁNICA Y FÍSICA REAL" },
      { id: '04', fala: "Más de ciento veinte proyectos de ingeniería explicados paso a paso.", legenda: "MÁS DE 120 DESAFÍOS ILUSTRADOS" },
      { id: '05', fala: "Sin herramientas caras, sin electrónica complicada y con cero frustración.", legenda: "SIN KITS CAROS DE TIENDA" },
      { id: '06', fala: "¡Mira el brillo en sus ojos cuando su primer brazo robótico realmente atrapa un objeto!", legenda: "¡BRAZOS ROBÓTICOS QUE AGARRAN!" },
      { id: '07', fala: "Padres de niños con mucha energía reportan una concentración y una calma asombrosas.", legenda: "IDEAL PARA ENFOQUE Y CREATIVIDAD" },
      { id: '08', fala: "Incluye insignias imprimibles de inventor, desafíos diarios y diplomas oficiales.", legenda: "INSIGNIAS Y DIPLOMAS OFICIALES" },
      { id: '09', fala: "Acceso digital inmediato a toda la biblioteca directamente en tu correo electrónico.", legenda: "ACCESO DIGITAL INMEDIATO" },
      { id: '10', fala: "Toca Más Información abajo y llévate el sesenta y dos por ciento de descuento hoy por solo veintisiete dólares.", legenda: "¡62% OFF: SOLO $27 DÓLARES HOY!" }
    ]
  },
  {
    num: '02',
    inputFile: 'concorrente_video_02.mp4',
    outputFile: 'ad_02_clean_es.mp4',
    targetDuration: 58.8,
    ctaStart: 53.30,
    subMarginV: 125,
    delogos: [
      'delogo=x=14:y=198:w=220:h=46',
      'delogo=x=10:y=466:w=340:h=92'
    ],
    overlays: [
      { file: 'box_es_parents.png', enable: 'between(t,0,2.70)' },
      { file: 'box_es_120_robotics.png', enable: 'between(t,6.60,10.70)' },
      { file: 'card_es_mockup.png', enable: 'between(t,14.10,15.90)' },
      { file: 'box_es_home_kit.png', enable: 'between(t,15.90,19.15)' },
      { file: 'card_es_blueprint.png', enable: 'between(t,19.60,22.90)' },
      { file: 'box_es_ages.png', enable: 'between(t,26.85,31.65)' },
      { file: 'card_es_categories.png', enable: 'between(t,31.65,33.15)' },
      { file: 'box_es_scissors.png', enable: 'between(t,38.35,43.15)' },
      { file: 'box_es_print_build.png', enable: 'between(t,49.10,51.65)' },
      { file: 'card_es_ultra_cta.png', enable: 'gte(t,53.30)' }
    ],
    script: [
      { id: '01', fala: "Miles de familias lo confirman: ¡los niños dejan el teléfono en el segundo en que esto empieza!", legenda: "¡DEJAN LAS PANTALLAS AL INSTANTE!" },
      { id: '02', fala: "Imagina a tu hijo cambiando horas de pantalla por pura concentración y curiosidad creadora.", legenda: "HORAS DE ENFOQUE Y CURIOSIDAD" },
      { id: '03', fala: "Mira el orgullo en su mirada cuando grita: ¡Mira papá, lo construí yo solito!", legenda: "EL ORGULLO DE DECIR: ¡LO HICE YO!" },
      { id: '04', fala: "Con el Mega Pack del Joven Inventor, tienes más de ciento veinte proyectos prácticos.", legenda: "MÁS DE 120 PROYECTOS PRÁCTICOS" },
      { id: '05', fala: "Solo imprime, recorta y construye con cajas de cartón y materiales que ya tienes en casa.", legenda: "FÁCIL DE IMPRIMIR Y ARMAR EN CASA" },
      { id: '06', fala: "Solo necesitas cartón, tijeras de punta redonda y reciclables comunes.", legenda: "CON CARTÓN Y MATERIALES CASEROS" },
      { id: '07', fala: "Aprenderán física real, mecánica y razonamiento espacial mientras se divierten en grande.", legenda: "APRENDEN FÍSICA Y MECÁNICA REAL" },
      { id: '08', fala: "Perfecto para niños de cuatro a doce años para despertar al ingeniero que llevan dentro.", legenda: "PARA NIÑOS DE 4 A 12 AÑOS" },
      { id: '09', fala: "Cada proyecto incluye planos a color y guías claras en video.", legenda: "PLANOS Y VIDEOS PASO A PASO" },
      { id: '10', fala: "Diversión sana, segura y emocionante en familia para tardes y fines de semana.", legenda: "FINES DE SEMANA EN FAMILIA" },
      { id: '11', fala: "Y lo mejor de todo: ¡estos robots de cartón y máquinas realmente se mueven y funcionan!", legenda: "¡REALMENTE CAMINAN Y SE MUEVEN!" },
      { id: '12', fala: "Tu pequeño inventor pasará horas felizmente concentrado construyendo.", legenda: "HORAS DE ENFOQUE Y CREATIVIDAD" },
      { id: '13', fala: "Habilidades para toda la vida, libres de la adicción digital.", legenda: "SEGURIDAD PARA TODA LA VIDA" },
      { id: '14', fala: "Recibes acceso digital inmediato de por vida directamente en tu correo electrónico.", legenda: "ACCESO DIGITAL DE POR VIDA" },
      { id: '15', fala: "Toca Más Información aquí abajo y llévate el Mega Pack completo por solo veintisiete dólares con cinco bonos gratis hoy.", legenda: "¡TOCA AQUÍ POR SOLO $27 HOY!" }
    ]
  },
  {
    num: '05',
    inputFile: 'concorrente_video_05.mp4',
    outputFile: 'ad_05_clean_es.mp4',
    targetDuration: 18.5,
    ctaStart: 15.20,
    subMarginV: 195,
    delogos: [
      'delogo=x=12:y=396:w=336:h=72'
    ],
    overlays: [
      { file: 'box_es_future.png', enable: 'between(t,0,2.70)' },
      { file: 'card_es_mockup.png', enable: 'between(t,4.10,5.65)' },
      { file: 'box_es_120_robotics.png', enable: 'between(t,6.85,9.65)' },
      { file: 'card_es_blueprint.png', enable: 'between(t,9.65,12.65)' },
      { file: 'box_es_print_build.png', enable: 'between(t,12.85,14.65)' },
      { file: 'card_es_ultra_cta.png', enable: 'gte(t,15.20)' }
    ],
    script: [
      { id: '01', fala: "¡No es solo un juego de manualidades: es la creatividad y confianza de tu hijo cobrando vida!", legenda: "¡CONSTRUYE SU FUTURO!" },
      { id: '02', fala: "Con el Mega Pack del Joven Inventor, ¡crean más de ciento veinte proyectos funcionales!", legenda: "120+ PROYECTOS REALES!" },
      { id: '03', fala: "Usando cartón y reciclables. ¡Robots que caminan y pinzas mecánicas que atrapan objetos!", legenda: "¡ROBOTS QUE CAMINAN Y AGARRAN!" },
      { id: '04', fala: "Toca Más Información abajo y llévate acceso de por vida por solo veintisiete dólares con cinco bonos gratis hoy.", legenda: "¡SOLO $27 + 5 BONOS GRATIS!" }
    ]
  }
];

async function renderCleanAd(ad) {
  console.log(`\n========================================`);
  console.log(`Rendering CLEAN SPANISH AD ${ad.num}: ${ad.outputFile}`);
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

  // ASS subtitles with opaque dark box
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
    const inputIdx = idx + 2;
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
  console.log('ALL 3 CLEAN SPANISH (USD) VIDEOS RENDERED SUCCESSFULLY.');
}

main().catch(err => {
  console.error('Render failed:', err);
  process.exit(1);
});
