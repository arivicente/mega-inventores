import { createWorker } from 'tesseract.js';
import path from 'path';

async function locateWords() {
  const worker = await createWorker('spa');
  
  for (const s of ['f_06s.jpg', 'f_10s.jpg', 'f_15s.jpg']) {
    const f = path.resolve('mega-inventores/public/anuncios/videos/frames_v05', s);
    const { data } = await worker.recognize(f);
    console.log(`=== Words in ${s} ===`);
    if (data.lines) {
      data.lines.forEach(l => {
        console.log(`"${l.text.trim()}" at bbox: x=${l.bbox.x0}..${l.bbox.x1}, y=${l.bbox.y0}..${l.bbox.y1}`);
      });
    }

  }

  await worker.terminate();
}

locateWords().catch(console.error);
