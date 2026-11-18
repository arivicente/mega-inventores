import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/@ffmpeg-installer/ffmpeg');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('../node_modules/msedge-tts');
const ffmpegPath = ffmpeg.path;

console.log("=== RENDERIZADOR AD 03 COM ULTRA CTA FINAL ===");

const videosDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos');
const tempDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_ad03');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const inputVideo = path.join(videosDir, 'concorrente_video_03.mp4');
const box1 = path.join(videosDir, 'overlay_v3_box1.png');
const box2 = path.join(videosDir, 'overlay_v3_box2.png');
const box3 = path.join(videosDir, 'overlay_v3_box3.png');
const ultraCta = path.join(videosDir, 'overlay_ultra_cta.png');
const outputVideo = path.join(videosDir, 'ad_03_modelado_br.mp4');

// Roteiro com CTA ultra chamativa e persuasiva no final
const scriptData = [
  { id: "01", fala: "Com um pouco de papelão e cola, seu filho pode construir algo inacreditável!", legenda: "DÁ PRA CRIAR COISAS INCRÍVEIS COM PAPELÃO!" },
  { id: "02", fala: "Chega de ver as crianças o dia inteiro hipnotizadas no celular e na TV.", legenda: "CHEGA DE HIPNOSE NAS TELAS!" },
  { id: "03", fala: "Apresentamos o Mega Pack de Inventores: mais de cento e vinte projetos de robótica e ciência.", legenda: "MAIS DE 120 PROJETOS DE ROBÓTICA" },
  { id: "04", fala: "Tudo explicado passo a passo, de forma super simples e ilustrada.", legenda: "SUPER SIMPLES E ILUSTRADO PASSO A PASSO" },
  { id: "05", fala: "Você só precisa imprimir as folhas e usar o que já tem em casa.", legenda: "É SÓ IMPRIMIR E USAR O QUE TEM EM CASA" },
  { id: "06", fala: "São carrinhos com motor elétrico, guindastes e garras mecânicas.", legenda: "ROBÔS, GUINDASTES E GARRAS MECÂNICAS" },
  { id: "07", fala: "Eles aprendem conceitos reais de engenharia e física enquanto brincam!", legenda: "APRENDEM ENGENHARIA E FÍSICA BRINCANDO" },
  { id: "08", fala: "Ideal para crianças de cinco a doze anos desenvolverem criatividade pura.", legenda: "PARA CRIANÇAS DE 5 A 12 ANOS" },
  { id: "09", fala: "Estimula o foco, a concentração e a resolução de problemas.", legenda: "DESPERTA O FOCO E A CRIATIVIDADE PURA" },
  { id: "10", fala: "Brinquedos que andam, giram e funcionam de verdade na prática.", legenda: "ELES ANDAM E FUNCIONAM DE VERDADE!" },
  { id: "11", fala: "Momentos mágicos de conexão entre pais e filhos longe da tecnologia.", legenda: "CONEXÃO REAL ENTRE PAIS E FILHOS" },
  { id: "12", fala: "Acesso vitalício imediato no seu e-mail para imprimir quantas vezes quiser.", legenda: "ACESSO VITALÍCIO DIRETO NO SEU E-MAIL" },
  { id: "13", fala: "Satisfação garantida ou seu dinheiro de volta por sete dias.", legenda: "GARANTIA INCONDICIONAL DE 7 DIAS" },
  { id: "14", fala: "Toque em Saiba Mais aqui embaixo e garanta o Mega Pack com sessenta e um por cento de desconto e cinco super bônus hoje!", legenda: "CLIQUE EM SAIBA MAIS COM 61% OFF!" }
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
  console.log("1. Gerando cada frase com voz humana Antônio Neural...");
  const audioItems = [];
  let currentTime = 0.0;

  for (let i = 0; i < scriptData.length; i++) {
    const item = scriptData[i];
    const phraseDir = path.join(tempDir, `phrase_${item.id}`);
    if (!fs.existsSync(phraseDir)) fs.mkdirSync(phraseDir, { recursive: true });

    const audioPath = path.join(phraseDir, 'audio.mp3');
    // Para a frase 14 atualizada, regeramos com a nova fala mais chamativa
    if (item.id === "14" || !fs.existsSync(audioPath)) {
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
    console.log(`- Frase ${item.id}: [${startTime.toFixed(2)}s -> ${endTime.toFixed(2)}s] (${durSec.toFixed(2)}s)`);
  }

  console.log(`Duração bruta total: ${currentTime.toFixed(2)}s`);
  const targetDuration = 54.5;
  const speedFactor = currentTime / targetDuration;
  console.log(`Ajuste de velocidade: ${speedFactor.toFixed(3)}x para fechar em ${targetDuration}s`);

  // Concatenação
  const concatList = path.join(tempDir, 'concat_list.txt');
  fs.writeFileSync(concatList, audioItems.map(a => `file '${a.audioPath.replace(/\\/g, '/')}'`).join('\n'));

  const rawMasterAudio = path.join(tempDir, 'raw_master_voice.mp3');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i "${concatList}" -c copy "${rawMasterAudio}"`, { stdio: 'pipe' });

  // Ajuste com atempo
  const finalMasterAudio = path.join(tempDir, 'final_voice_54s.mp3');
  execSync(`"${ffmpegPath}" -y -i "${rawMasterAudio}" -filter:a "atempo=${speedFactor.toFixed(4)}" "${finalMasterAudio}"`, { stdio: 'pipe' });

  // Geração do arquivo ASS
  function formatAssTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const cs = Math.floor((seconds % 1) * 100);
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  }

  // MarginV = 135 (Y=505px cobrindo a legenda antiga)
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

  // As legendas correm de 0s até 49.5s. A partir de 49.5s entra a Ultra CTA final!
  for (const item of audioItems) {
    const scaledStart = item.startTime / speedFactor;
    const scaledEnd = item.endTime / speedFactor;
    if (scaledStart >= 49.5) continue; // não sobrepor legenda na Ultra CTA
    const startStr = formatAssTime(scaledStart);
    const endStr = formatAssTime(Math.min(scaledEnd, 49.5));
    assContent += `Dialogue: 0,${startStr},${endStr},DynamicYellow,,0,0,0,,{\\b1}${item.legenda}{\\b0}\n`;
  }

  const assFile = path.join(tempDir, 'legendas_ad03.ass');
  fs.writeFileSync(assFile, assContent);
  console.log("✅ Arquivo ASS Ad 03 gerado!");

  const escapedAss = assFile.replace(/\\/g, '/').replace(/:/g, '\\:');

  // Filtro FFmpeg do Ad 03 com Ultra CTA:
  // 1. delogo EXCLUSIVAMENTE NA LEGENDA (x=20, y=475, w=320, h=60)
  // 2. ass com a nova legenda dinâmica até os momentos finais
  // 3. overlays das 3 caixas laranjas iniciais
  // 4. Ultra CTA magnética nos últimos 5.5 segundos (>= 49.5s) cobrindo qualquer texto espanhol com alta conversão
  const filterGraph = [
    `[0:v]delogo=x=20:y=475:w=320:h=60[v1]`,
    `[v1]ass='${escapedAss}'[v2]`,
    `[v2][1:v]overlay=0:0:enable='between(t,0,4.2)'[v3]`,
    `[v3][2:v]overlay=0:0:enable='between(t,8,12.2)'[v4]`,
    `[v4][3:v]overlay=0:0:enable='between(t,16,20.2)'[v5]`,
    `[v5][4:v]overlay=0:0:enable='gte(t,49.5)'[vout]`
  ].join(';');

  console.log("Renderizando Ad 03 com Ultra CTA...");
  const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -i "${box1}" -i "${box2}" -i "${box3}" -i "${ultraCta}" -i "${finalMasterAudio}" -filter_complex "${filterGraph}" -map "[vout]" -map 5:a -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 192k -shortest "${outputVideo}"`;

  execSync(cmd, { stdio: 'pipe' });

  const stats = fs.statSync(outputVideo);
  console.log("\n=======================================================");
  console.log("🎉 ANÚNCIO 03 ATUALIZADO COM ULTRA CTA COM SUCESSO!");
  console.log("Arquivo final:", outputVideo);
  console.log("Tamanho:", (stats.size / 1024 / 1024).toFixed(2), "MB");
  console.log("=======================================================\n");
}

run().catch(console.error);
