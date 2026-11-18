import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('temp_lp.html', 'utf8');

// Get all unique file URLs
const imgMatches = Array.from(new Set(html.match(/https?:\/\/assets\.zyrosite\.com\/[^\s"'<>]+\.(?:png|jpe?g|webp)/gi) || []));

// Filter to original URLs without CDN resizing parameters
const uniqueFiles = new Map();
for (const url of imgMatches) {
  const fileName = path.basename(url.split('?')[0]);
  if (!uniqueFiles.has(fileName)) {
    // Prefer original direct asset URL (without /cdn-cgi/image/...)
    const cleanUrl = url.replace(/\/cdn-cgi\/image\/[^/]+/, '');
    uniqueFiles.set(fileName, cleanUrl);
  }
}

console.log(`Identificados ${uniqueFiles.size} arquivos de imagem únicos.`);

const assetsDir = path.resolve('mega-inventores', 'public', 'assets');

async function downloadAll() {
  let count = 0;
  for (const [fileName, url] of uniqueFiles.entries()) {
    try {
      const destPath = path.join(assetsDir, fileName);
      if (fs.existsSync(destPath)) continue;
      
      console.log(`Baixando [${count + 1}/${uniqueFiles.size}]: ${fileName}...`);
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(destPath, Buffer.from(buffer));
        count++;
      }
    } catch (e) {
      console.error(`Erro ao baixar ${fileName}:`, e.message);
    }
  }
  console.log(`Download finalizado! Total de novas imagens salvas: ${count}`);
}

downloadAll();
