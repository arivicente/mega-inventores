import { createWorker } from 'tesseract.js';
import path from 'path';

async function ocrFullFrames() {
  const worker = await createWorker('spa');
  
  const frames = ['f_03s.jpg', 'f_06s.jpg', 'f_10s.jpg', 'f_15s.jpg'];

  for (const f of frames) {
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v05', f);
    const { data: { text } } = await worker.recognize(fullPath);
    console.log(`=== FULL ${f} ===\n${text.trim()}\n`);
  }

  await worker.terminate();
}

ocrFullFrames().catch(console.error);
