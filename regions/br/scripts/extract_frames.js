import http from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const puppeteer = require('../../kit-pastoral/node_modules/puppeteer');

const framesDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'frames_video_01');
if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

const videoPath = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'concorrente_video_01.mp4');

// 1. Criar servidor HTTP para servir o arquivo MP4
const server = http.createServer((req, res) => {
  if (req.url === '/video.mp4') {
    const stat = fs.statSync(videoPath);
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': stat.size,
      'Accept-Ranges': 'bytes'
    });
    fs.createReadStream(videoPath).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html><body style="margin:0;background:#000;"><video id="v" src="/video.mp4" controls autoplay muted style="width:100%;height:100vh;"></video></body></html>`);
  }
});

server.listen(3333, async () => {
  console.log("Servidor local iniciado na porta 3333.");

  try {
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 720, height: 1280 });

    await page.goto('http://localhost:3333/', { waitUntil: 'domcontentloaded' });
    console.log("Página do vídeo carregada.");

    await page.waitForFunction(() => {
      const v = document.getElementById('v');
      return v && v.duration > 0;
    }, { timeout: 10000 });

    const duration = await page.evaluate(() => document.getElementById('v').duration);
    console.log(`Duração do vídeo: ${duration.toFixed(1)} segundos.`);

    const timestamps = [1.0, 5.0, 10.0, 15.0, 20.0, 26.0, 32.0];

    for (let i = 0; i < timestamps.length; i++) {
      const t = timestamps[i];
      await page.evaluate((seekTime) => {
        const v = document.getElementById('v');
        v.pause();
        v.currentTime = seekTime;
      }, t);

      await new Promise(r => setTimeout(r, 600));

      const frameFile = path.join(framesDir, `frame_${i+1}_sec_${t}s.png`);
      await page.screenshot({ path: frameFile });
      console.log(`📸 Frame ${i+1} capturado em ${t}s -> ${path.basename(frameFile)}`);
    }

    await browser.close();
    console.log("✅ Todos os frames capturados!");
  } catch(e) {
    console.error("Erro na captura:", e.message);
  } finally {
    server.close();
  }
});
