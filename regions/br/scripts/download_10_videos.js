import fs from 'fs';
import path from 'path';

const ads = JSON.parse(fs.readFileSync('mega-inventores/videos_minerados.json', 'utf8'));
const dir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Extrair vídeos únicos
const withVideo = ads.filter(a => a.videoUrl && a.videoUrl.startsWith('http'));
const uniqueVideos = [];
const seenUrls = new Set();
for (const ad of withVideo) {
  if (!seenUrls.has(ad.videoUrl)) {
    seenUrls.add(ad.videoUrl);
    uniqueVideos.push(ad);
  }
}

console.log(`Disponíveis ${uniqueVideos.length} vídeos únicos para download.`);

async function downloadTop10() {
  const top10 = uniqueVideos.slice(0, 10);
  const metadataList = [];

  for (let i = 0; i < top10.length; i++) {
    const item = top10[i];
    const num = (i + 1).toString().padStart(2, '0');
    const fileName = `concorrente_video_${num}.mp4`;
    const filePath = path.join(dir, fileName);

    let fileSizeMb = '0';

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      fileSizeMb = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`[${num}/10] Já existe: ${fileName} (${fileSizeMb} MB)`);
    } else {
      console.log(`[${num}/10] Baixando ${fileName} (Ativo há ${item.diasAtivo} dias)...`);
      try {
        const res = await fetch(item.videoUrl);
        if (res.ok) {
          const buffer = await res.arrayBuffer();
          fs.writeFileSync(filePath, Buffer.from(buffer));
          fileSizeMb = (buffer.byteLength / 1024 / 1024).toFixed(2);
          console.log(`✅ Salvo ${fileName} (${fileSizeMb} MB)`);
        } else {
          console.log(`❌ Erro HTTP ${res.status} ao baixar ${fileName}`);
        }
      } catch (e) {
        console.error(`Erro ao baixar ${fileName}:`, e.message);
      }
    }

    metadataList.push({
      videoIndex: i + 1,
      fileName,
      filePath: `public/anuncios/videos/${fileName}`,
      fileSizeMb: fileSizeMb + ' MB',
      pageName: item.pageName,
      diasAtivo: item.diasAtivo,
      adArchiveId: item.adArchiveId,
      headline: item.headline,
      copy: item.adText,
      linkUrl: item.linkUrl
    });
  }

  // Salvar catálogo dos 10 vídeos com todos os detalhes
  const catPath = 'mega-inventores/catalogo_10_videos.json';
  fs.writeFileSync(catPath, JSON.stringify(metadataList, null, 2));
  console.log(`\n🎉 Catálogo dos 10 vídeos salvo com sucesso em: ${catPath}`);
}

downloadTop10().catch(console.error);
