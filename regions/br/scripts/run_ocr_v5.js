import { createWorker } from 'tesseract.js';
import path from 'path';

async function ocrV5() {
  const worker = await createWorker('spa');
  
  const files = [
    'crop_top_1s.jpg',
    'crop_top_9s.jpg',
    'crop_top_14s.jpg',
    'crop_sub_6s.jpg',
    'crop_sub_11s.jpg',
    'crop_sub_16s.jpg'
  ];

  for (const f of files) {
    const fullPath = path.resolve('mega-inventores/public/anuncios/videos/frames_v05', f);
    const { data: { text } } = await worker.recognize(fullPath);
    console.log(`=== ${f} ===\n${text.trim()}\n`);
  }

  await worker.terminate();
}

ocrV5().catch(console.error);
