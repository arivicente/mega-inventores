import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { MsEdgeTTS, OUTPUT_FORMAT } = require('../node_modules/msedge-tts');

const tempDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'temp_tts_test');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

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
      console.log(`Tentativa ${attempt} falhou: ${err.message}. Tentando novamente...`);
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

async function testAll() {
  for (let i = 1; i <= 5; i++) {
    const dir = path.join(tempDir, `phrase_${i}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await synthesizeText(`Frase de teste número ${i}`, dir);
    console.log(`Frase ${i} sintetizada com sucesso!`);
  }
}

testAll().catch(console.error);
