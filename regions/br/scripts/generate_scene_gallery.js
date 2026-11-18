import fs from 'fs';
import path from 'path';

const framesDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'mapa_cenas');
const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.png'));

let html = `<!DOCTYPE html><html><body style="background:#111;color:#fff;font-family:sans-serif;padding:20px;">
<h2>Mapeamento de Cenas e Textos (concorrente_video_01.mp4)</h2>
<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;">`;

for (const file of files) {
  const data = fs.readFileSync(path.join(framesDir, file)).toString('base64');
  html += `<div>
    <h4>${file}</h4>
    <img src="data:image/png;base64,${data}" style="width:100%;border-radius:12px;border:1px solid #444;" />
  </div>`;
}

html += `</div></body></html>`;

fs.writeFileSync('mega-inventores/public/anuncios/videos/mapa_cenas.html', html);
console.log("Arquivo mapa_cenas.html gerado!");
