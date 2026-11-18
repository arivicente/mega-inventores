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
const oldAd03Id = '120252715726920168';
const destinationUrl = 'https://mega-inventors-us.codhun.workers.dev/';
const videosDir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/public/anuncios/videos';
const outJsonPath = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/us/clean_ads_published.json';

const CLEAN_AD_DEFS = [
  {
    key: 'ad_03_clean',
    name: 'Ad 03 V2 - Parent & Child Weekend Connection [100% Clean EN]',
    videoFile: 'ad_03_clean_en.mp4',
    title: 'Wholesome Screen-Free Family Weekend Bonding',
    message: "Tired of seeing kids in screen zombie mode all weekend?\n\nTurn an empty Amazon box, safety scissors, and glue into a full robotics workshop on your kitchen table.\n\nOver 120 zero-prep science & engineering projects to print and assemble (for kids ages 5 to 13).\n\nTap 'Learn More' below to claim 62% OFF today — just $27 with 5 Free Super Bonuses included!"
  },
  {
    key: 'ad_02_clean',
    name: 'Ad 02 V2 - Articulated Robots & DIY Engineering [100% Clean EN]',
    videoFile: 'ad_02_clean_en.mp4',
    title: 'Robots That Actually Walk & Move with Cardboard',
    message: "Check out these articulated cardboard robots made entirely from everyday household recyclables!\n\nThe Young Inventor's Mega Pack teaches kids ages 5 to 13 how to build mechanical toys that actually grasp, walk, and function.\n\nSparks deep focus, spatial reasoning, and real engineering confidence away from screens.\n\nTap 'Learn More' below for instant lifetime access ($27 + 5 Free Bonuses, 30-day guarantee)."
  },
  {
    key: 'ad_05_clean',
    name: 'Ad 05 V2 - Dynamic 18s Build Their Future [100% Clean EN]',
    videoFile: 'ad_05_clean_en.mp4',
    title: 'Not Just Playing — Building Their Future!',
    message: "It's not just a craft project: it's your child's creativity & confidence coming to life!\n\nOver 120 cardboard robotics, hydraulic cranes, and engineering builds you can print and assemble at home.\n\nToday 62% OFF for only $27 + 5 Free Super Bonuses!\n\nTap 'Learn More' below to get instant digital access."
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
  console.log(`Uploading 3 Clean EN ads to AdSet ${targetAdsetId} (${actId})...`);

  // Check existing url_tags on old Ad 03 so tracking stays 100% consistent
  let existingUrlTags = 'utm_source=facebook&utm_medium={{adset.id}}&utm_campaign={{campaign.id}}&utm_content={{ad.id}}';
  try {
    const resOld = await fetch(`https://graph.facebook.com/v21.0/${oldAd03Id}?fields=creative{url_tags}&access_token=${token}`);
    const dataOld = await resOld.json();
    if (dataOld.creative && dataOld.creative.url_tags) {
      existingUrlTags = dataOld.creative.url_tags;
    }
  } catch (e) {}
  console.log(`Using url_tags: ${existingUrlTags}`);

  const results = [];

  for (const ad of CLEAN_AD_DEFS) {
    const filePath = path.join(videosDir, ad.videoFile);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing rendered file: ${filePath}`);
    }

    console.log(`\n1. Uploading video ${ad.videoFile}...`);
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

    // Get video thumbnail
    let thumbUrl = `${destinationUrl}assets/hero-father-son-bundle-en.jpg`;
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

  // Pause old Ad 03 with Spanish residue only after all 3 clean EN ads are active
  console.log(`\n4. Pausing old Ad 03 (${oldAd03Id})...`);
  const pauseParams = new URLSearchParams();
  pauseParams.append('status', 'PAUSED');
  pauseParams.append('access_token', token);
  const resPause = await fetch(`https://graph.facebook.com/v21.0/${oldAd03Id}`, {
    method: 'POST',
    body: pauseParams
  });
  const dataPause = await resPause.json();
  console.log(`   Old Ad 03 pause response:`, JSON.stringify(dataPause));

  // Verify live ad statuses in AdSet
  const resVerify = await fetch(`https://graph.facebook.com/v21.0/${targetAdsetId}/ads?fields=id,name,status,effective_status&access_token=${token}`);
  const dataVerify = await resVerify.json();

  const summary = {
    publishedAt: new Date().toISOString(),
    adAccountId: actId,
    adsetId: targetAdsetId,
    pausedOldAdId: oldAd03Id,
    publishedAds: results,
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
