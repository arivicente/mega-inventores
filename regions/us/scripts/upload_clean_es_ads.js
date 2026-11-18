import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const fetch = require('c:/Users/Star/Documents/espionagem1/node_modules/node-fetch');
const FormData = require('c:/Users/Star/Documents/espionagem1/node_modules/form-data');

const envPath = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/.env';
const env = {};
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) env[m[1]] = m[2].trim();
});

const token = env.META_ACCESS_TOKEN;
const actId = env.META_AD_ACCOUNT_ID || 'act_898705452000785';
const pageId = env.META_PAGE_ID || '1407050532499881';
const targetAdsetId = '120252715725420168';

// English ads to pause so 100% of traffic goes to Spanish US
const englishAdsToPause = [
  '120252749471520168', // Ad 02 V2
  '120252749467340168', // Ad 03 V2
  '120252749473690168'  // Ad 05 V2
];

const destinationUrl = 'https://mega-inventors-us.codhun.workers.dev/es';
const videosDir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/public/anuncios/videos';
const outJsonPath = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/clean_es_ads_published.json';

const CLEAN_ES_ADS = [
  {
    key: 'ad_03_es',
    name: 'Ad 03 ES - Conexión Padre e Hijo en Fin de Semana [100% Limpio US/USD]',
    videoFile: 'ad_03_clean_es.mp4',
    title: 'Momentos Inolvidables en Familia Lejos de las Pantallas',
    message: `¿Cansado de ver a tus hijos en modo zombi pegados a las pantallas todo el fin de semana?

Convierte una caja de cartón de Amazon, tijeras y pegamento en un taller de robótica real sobre la mesa de tu casa.

Más de 120 proyectos de ciencia e ingeniería para imprimir y armar paso a paso (para niños de 5 a 13 años).

Toca "Más Información" abajo para aprovechar el 62% de descuento hoy — solo $27 USD con 5 Super Bonos gratis incluidos.`
  },
  {
    key: 'ad_02_es',
    name: 'Ad 02 ES - Robótica Articulada y Creatividad Táctil [100% Limpio US/USD]',
    videoFile: 'ad_02_clean_es.mp4',
    title: 'Robots de Cartón que Realmente Caminan y se Mueven',
    message: `¡Mira estos robots articulados de cartón hechos con materiales que ya tienes en casa!

El Mega Pack del Joven Inventor enseña a niños de 5 a 13 años a construir juguetes mecánicos que agarran objetos, caminan y funcionan de verdad.

Despierta una concentración profunda, razonamiento espacial y verdadera confianza lejos de los teléfonos.

Toca "Más Información" abajo para acceso de por vida inmediato ($27 USD + 5 Bonos de Regalo, garantía total de 30 días).`
  },
  {
    key: 'ad_05_es',
    name: 'Ad 05 ES - Dinámico Construye Su Futuro [100% Limpio US/USD]',
    videoFile: 'ad_05_clean_es.mp4',
    title: '¡No Solo Juegan — Están Construyendo Su Futuro!',
    message: `¡No es solo una manualidad: es la creatividad y confianza de tu hijo cobrando vida!

Más de 120 proyectos de robótica en cartón, grúas hidráulicas y experimentos para armar en casa.

¡Hoy con 62% de descuento por solo $27 USD + 5 Super Bonos gratis!

Toca "Más Información" abajo para obtener acceso digital inmediato.`
  }
];

async function waitVideoReady(videoId, maxWaitMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${videoId}?fields=status&access_token=${token}`);
      const data = await res.json();
      if (data.status && data.status.video_status === 'ready') {
        return true;
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 4000));
  }
  return false;
}

async function main() {
  console.log(`\n======================================================`);
  console.log(`Uploading 3 Clean Spanish (USD) ads to AdSet ${targetAdsetId}...`);
  console.log(`Destination: ${destinationUrl}`);
  console.log(`======================================================\n`);

  const existingUrlTags = 'utm_source=facebook&utm_medium={{adset.id}}&utm_campaign={{campaign.id}}&utm_content={{ad.id}}';
  const results = [];

  for (const ad of CLEAN_ES_ADS) {
    const filePath = path.join(videosDir, ad.videoFile);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing rendered file: ${filePath}`);
    }

    console.log(`\n1. Uploading video ${ad.videoFile} (${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB)...`);
    const form = new FormData();
    form.append('access_token', token);
    form.append('source', fs.createReadStream(filePath));
    form.append('title', ad.name);

    const resVid = await fetch(`https://graph-video.facebook.com/v21.0/${actId}/advideos`, {
      method: 'POST',
      body: form
    });
    const dataVid = await resVid.json();
    if (dataVid.error) {
      throw new Error(`Video upload error (${ad.videoFile}): ${JSON.stringify(dataVid.error)}`);
    }
    const videoId = dataVid.id;
    console.log(`   Video uploaded: ${videoId}. Waiting for processing...`);
    await waitVideoReady(videoId);

    // Get thumbnail
    let thumbUrl = `https://mega-inventors-us.codhun.workers.dev/assets/hero-father-son-bundle-en.jpg`;
    try {
      const resThumbs = await fetch(`https://graph.facebook.com/v21.0/${videoId}/thumbnails?access_token=${token}`);
      const dataThumbs = await resThumbs.json();
      if (dataThumbs.data && dataThumbs.data.length > 0 && dataThumbs.data[0].uri) {
        thumbUrl = dataThumbs.data[0].uri;
      }
    } catch (e) {}

    console.log(`2. Creating AdCreative for ${ad.name}...`);
    const creativeParams = new URLSearchParams();
    creativeParams.append('name', `Creative - ${ad.name}`);
    creativeParams.append('url_tags', existingUrlTags);
    creativeParams.append('object_story_spec', JSON.stringify({
      page_id: pageId,
      video_data: {
        video_id: videoId,
        image_url: thumbUrl,
        call_to_action: {
          type: 'LEARN_MORE',
          value: { link: destinationUrl }
        },
        message: ad.message,
        title: ad.title
      }
    }));
    creativeParams.append('access_token', token);

    const resCreative = await fetch(`https://graph.facebook.com/v21.0/${actId}/adcreatives`, {
      method: 'POST',
      body: creativeParams
    });
    const dataCreative = await resCreative.json();
    if (dataCreative.error) {
      throw new Error(`Creative error (${ad.name}): ${JSON.stringify(dataCreative.error)}`);
    }
    const creativeId = dataCreative.id;
    console.log(`   Creative created: ${creativeId}`);

    console.log(`3. Creating ACTIVE Ad inside AdSet ${targetAdsetId}...`);
    const adParams = new URLSearchParams();
    adParams.append('name', ad.name);
    adParams.append('adset_id', targetAdsetId);
    adParams.append('creative', JSON.stringify({ creative_id: creativeId }));
    adParams.append('status', 'ACTIVE');
    adParams.append('access_token', token);

    const resAd = await fetch(`https://graph.facebook.com/v21.0/${actId}/ads`, {
      method: 'POST',
      body: adParams
    });
    const dataAd = await resAd.json();
    if (dataAd.error) {
      throw new Error(`Ad creation error (${ad.name}): ${JSON.stringify(dataAd.error)}`);
    }
    const adId = dataAd.id;
    console.log(`   ACTIVE Ad created: ${adId}`);

    results.push({
      key: ad.key,
      name: ad.name,
      videoFile: ad.videoFile,
      videoId,
      creativeId,
      adId,
      adsetId: targetAdsetId,
      status: 'ACTIVE'
    });
  }

  // 4. Pause previous English ads to complete the pivot to 100% Spanish US
  console.log(`\n4. Pausing previous English ads to focus 100% of budget on Spanish US...`);
  for (const enAdId of englishAdsToPause) {
    try {
      const pauseParams = new URLSearchParams();
      pauseParams.append('status', 'PAUSED');
      pauseParams.append('access_token', token);
      const resPause = await fetch(`https://graph.facebook.com/v21.0/${enAdId}`, {
        method: 'POST',
        body: pauseParams
      });
      const dataPause = await resPause.json();
      console.log(`   Ad ${enAdId} paused:`, JSON.stringify(dataPause));
    } catch (err) {
      console.error(`   Error pausing ad ${enAdId}:`, err);
    }
  }

  // Verify live ad statuses
  const resVerify = await fetch(`https://graph.facebook.com/v21.0/${targetAdsetId}/ads?fields=id,name,status,effective_status&access_token=${token}`);
  const dataVerify = await resVerify.json();

  const summary = {
    publishedAt: new Date().toISOString(),
    adAccountId: actId,
    adsetId: targetAdsetId,
    pausedEnglishAds: englishAdsToPause,
    publishedSpanishAds: results,
    liveAdsetAds: dataVerify.data || []
  };
  fs.writeFileSync(outJsonPath, JSON.stringify(summary, null, 2));
  console.log(`\nSaved summary to ${outJsonPath}`);
  console.log('LIVE ADSET ADS STATUS:');
  console.log(JSON.stringify(summary.liveAdsetAds, null, 2));
}

main().catch(err => {
  console.error('Upload error:', err);
  process.exit(1);
});
