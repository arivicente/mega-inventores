import fs from 'fs';
import path from 'path';
import { ApifyClient } from '../../kit-pastoral/node_modules/apify-client/dist/index.js';

// Load .env
if (fs.existsSync('mega-inventores/.env')) {
  const envContent = fs.readFileSync('mega-inventores/.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) process.env[match[1]] = match[2].trim();
  }
}

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const client = new ApifyClient({ token: APIFY_TOKEN });

async function spyVideoAds() {
  console.log('=====================================================');
  console.log('🎯 MINERANDO ANÚNCIOS EM VÍDEO NA META ADS LIBRARY');
  console.log('=====================================================');

  const targetUrls = [
    {
      url: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&media_type=video&q=Mega%20Pack%20de%20Inventores&search_type=keyword_unordered"
    },
    {
      url: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&media_type=video&q=grandesinventores.online&search_type=keyword_unordered"
    },
    {
      url: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&media_type=video&q=InventaLab&search_type=keyword_unordered"
    }
  ];

  console.log('Disparando scraper Apify para anúncios em vídeo...');

  try {
    const run = await client.actor("curious_coder/facebook-ads-library-scraper").call({
      urls: targetUrls,
      count: 50,
      scrapeAdDetails: true
    });

    console.log(`Execução concluída! ID: ${run.id}. Acessando dataset: ${run.defaultDatasetId}...`);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    console.log(`Coletados ${items.length} anúncios brutos da Meta Ads Library.`);

    const videoAds = [];
    const agora = new Date();

    for (const ad of items) {
      const dataInicioRaw = ad.startDate || ad.start_date || ad.ad_delivery_start_time;
      let diasAtivo = 0;
      if (dataInicioRaw) {
        let ts = Number(dataInicioRaw);
        if (!isNaN(ts)) {
          if (ts < 1e11) ts = ts * 1000;
          diasAtivo = Math.floor((agora - new Date(ts)) / (1000 * 60 * 60 * 24));
        } else {
          diasAtivo = Math.floor((agora - new Date(dataInicioRaw)) / (1000 * 60 * 60 * 24));
        }
      }

      // Extract video URLs and snapshots
      const videoUrl = ad.snapshot?.videos?.[0]?.video_sd_url || 
                       ad.snapshot?.videos?.[0]?.video_hd_url || 
                       ad.videoUrl || 
                       ad.video_url || 
                       ad.snapshot?.ad_creative_thumbnail_url || '';

      const adText = ad.adCreativeBody || ad.ad_creative_body || ad.snapshot?.body?.text || '';
      const headline = ad.adCreativeTitle || ad.snapshot?.title || '';

      videoAds.push({
        pageName: ad.pageName || ad.page_name || 'Inventores',
        diasAtivo,
        headline,
        adText,
        videoUrl,
        linkUrl: ad.linkUrl || ad.link_url || ad.snapshot?.link_url || '',
        adArchiveId: ad.adArchiveId || ad.ad_archive_id || ad.adId || '',
        languages: ad.languages || []
      });
    }

    videoAds.sort((a, b) => b.diasAtivo - a.diasAtivo);

    const outPath = 'mega-inventores/videos_minerados.json';
    fs.writeFileSync(outPath, JSON.stringify(videoAds, null, 2));
    console.log(`✅ Salvo ${videoAds.length} anúncios minerados em ${outPath}!`);

    // Let's summarize the top video scripts
    console.log('\n--- TOP ANÚNCIOS MAIS ESCALADOS (VÍDEO) ---');
    videoAds.slice(0, 5).forEach((v, i) => {
      console.log(`\n#${i+1} [${v.pageName}] Ativo há ${v.diasAtivo} dias:`);
      console.log(`Título: ${v.headline}`);
      console.log(`Copy: ${v.adText.substring(0, 200)}...`);
      console.log(`Vídeo: ${v.videoUrl ? 'Possui link de vídeo' : 'Sem link direto'}`);
    });

  } catch (e) {
    console.error('Erro na espionagem via Apify:', e.message);
  }
}

spyVideoAds();
