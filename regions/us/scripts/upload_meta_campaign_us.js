import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

// Load .env from mega-inventores or mega-inventors-us
const env = {};
const envPath = fs.existsSync('mega-inventors-us/.env') ? 'mega-inventors-us/.env' : 'mega-inventores/.env';
const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
for (const line of envLines) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) env[m[1]] = m[2].trim();
}

const token = env.META_ACCESS_TOKEN;
const actId = env.META_AD_ACCOUNT_ID; // act_898705452000785
const pageId = env.META_PAGE_ID; // 1407050532499881
const pixelId = env.META_PIXEL_ID; // 1864964467859741
const destinationUrl = 'https://mega-inventors-us.codhun.workers.dev/';

console.log("=== META MARKETING API - US GLOBAL CAMPAIGN (5 ADSETS ABO R$20) ===");
console.log(`Ad Account: ${actId}`);
console.log(`Page ID: ${pageId}`);
console.log(`Pixel ID: ${pixelId}`);
console.log(`Destination URL: ${destinationUrl}`);

const adsConfig = [
  {
    num: "01",
    name: "Ad 01 - Screens vs Curiosity (Robot & Cardboard)",
    adsetName: "[ABO R$20] Ad 01 - Screens vs Curiosity (Robot & Cardboard)",
    videoFile: "ad_01_english.mp4",
    title: "120+ DIY Robotics & STEM Projects for Kids",
    message: "📱 Does your child spend hours glued to tablets & video games?\n\nReplace the endless screen battles with real tactile curiosity! With The Young Inventor's Mega Pack, your child builds their first working robot using everyday cardboard boxes and items you already have at home.\n\n🤖 120+ step-by-step illustrated blueprints with easy video guides.\n\nTap 'Learn More' below to get instant lifetime access with 62% OFF and 5 Free Bonuses for just $27 today!"
  },
  {
    num: "02",
    name: "Ad 02 - Articulated Robots & DIY Engineering",
    adsetName: "[ABO R$20] Ad 02 - Articulated Robots & DIY Engineering",
    videoFile: "ad_02_english.mp4",
    title: "Robots That Actually Walk & Move with Cardboard",
    message: "🤖 Check out this articulated walker made entirely from household cardboard!\n\nThe Young Inventor's Mega Pack teaches kids ages 4 to 12 how to build mechanical toys that actually grasp, walk, and function.\n\n✨ Sparks deep focus, spatial reasoning, and real engineering confidence away from screens.\n\nInstant digital download to your email for just $27 with a 30-day money-back guarantee."
  },
  {
    num: "03",
    name: "Ad 03 - Parent & Child Weekend Connection",
    adsetName: "[ABO R$20] Ad 03 - Parent & Child Weekend Connection",
    videoFile: "ad_03_english.mp4",
    title: "Wholesome Screen-Free Family Weekend Bonding",
    message: "👨‍👩‍👧‍👦 Tired of seeing kids in screen zombie mode all weekend?\n\nTurn an empty Amazon box, safety scissors, and glue into a full robotics workshop on your kitchen table.\n\n📦 Over 120 zero-prep science & engineering projects to print and assemble.\n\nTap 'Learn More' to claim the special launch discount of just $27 with 5 free super bonuses included."
  },
  {
    num: "04",
    name: "Ad 04 - Recycled Cardboard Workshop & 120 Projects",
    adsetName: "[ABO R$20] Ad 04 - Recycled Cardboard Workshop & 120 Projects",
    videoFile: "ad_04_english.mp4",
    title: "Turn Cardboard Boxes Into Working Inventions",
    message: "💡 You don't need $100 plastic kits to teach your kids real physics.\n\nWith The Young Inventor's Mega Pack, your child explores levers, hydraulics, and mechanical gears using simple recyclables.\n\n🎯 Builds problem-solving skills, hand-eye coordination, and deep screen-free focus.\n\nTap 'Learn More' and download the full library now for just $27 with lifetime access."
  },
  {
    num: "05",
    name: "Ad 05 - Dynamic 18s (Build Their Future)",
    adsetName: "[ABO R$20] Ad 05 - Dynamic 18s (Build Their Future)",
    videoFile: "ad_05_english.mp4",
    title: "Not Just Playing — Building Their Future!",
    message: "🚀 It's not just a craft project: it's your child's future coming to life!\n\nOver 120 cardboard robotics and science builds you can assemble at home. Moving robots, hydraulic arms, and pneumatic racers.\n\nToday with 62% off for only $27 + 5 free bonuses.\n\nTap 'Learn More' and get instant digital access!"
  }
];

async function waitVideoReady(videoId, maxWaitMs = 90000) {
  const start = Date.now();
  console.log(`Waiting for Meta to process video ${videoId}...`);
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${videoId}?fields=status&access_token=${token}`);
      const data = await res.json();
      if (data.status && data.status.video_status === 'ready') {
        console.log(`✓ Video ${videoId} processed and ready!`);
        return true;
      }
    } catch(e) {}
    await new Promise(r => setTimeout(r, 4000));
  }
  console.log(`Warning: Video processing wait timeout for ${videoId}, proceeding...`);
  return false;
}

async function uploadCampaign() {
  console.log("\n1. Creating Meta Ads Campaign (OUTCOME_SALES)...");
  const campaignParams = new URLSearchParams();
  campaignParams.append('name', '[The Young Inventors] 01. Sales & Purchase (Global US)');
  campaignParams.append('objective', 'OUTCOME_SALES');
  campaignParams.append('status', 'ACTIVE');
  campaignParams.append('special_ad_categories', '[]');
  campaignParams.append('is_adset_budget_sharing_enabled', 'false'); // ABO
  campaignParams.append('access_token', token);

  const resCamp = await fetch(`https://graph.facebook.com/v21.0/${actId}/campaigns`, {
    method: 'POST',
    body: campaignParams
  });
  const dataCamp = await resCamp.json();
  if (dataCamp.error) {
    throw new Error(`Error creating campaign: ${JSON.stringify(dataCamp.error)}`);
  }
  const campaignId = dataCamp.id;
  console.log(`✓ Campaign created successfully! ID: ${campaignId}`);

  const videosDir = path.resolve('mega-inventors-us', 'public', 'anuncios', 'videos');
  const publishedAdsets = [];

  // 2. Loop through each of the 5 ads: upload video, create creative, create adset (ABO R$20), create ad
  for (const ad of adsConfig) {
    console.log(`\n======================================================`);
    console.log(`Processing: ${ad.name}`);
    console.log(`======================================================`);

    const filePath = path.join(videosDir, ad.videoFile);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    // A. Upload Video
    console.log(`Uploading video ${ad.videoFile} to Meta...`);
    const form = new FormData();
    form.append('access_token', token);
    form.append('source', fs.createReadStream(filePath));
    form.append('title', ad.title);

    const resVideo = await fetch(`https://graph-video.facebook.com/v21.0/${actId}/advideos`, {
      method: 'POST',
      body: form
    });
    const dataVideo = await resVideo.json();
    if (dataVideo.error) {
      console.error(`Error uploading video ${ad.videoFile}:`, dataVideo.error);
      continue;
    }
    const videoId = dataVideo.id;
    console.log(`✓ Video uploaded! ID: ${videoId}`);

    await waitVideoReady(videoId);

    // B. Get Thumbnail
    let thumbUrl = `${destinationUrl}assets/mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png`;
    try {
      const resThumbs = await fetch(`https://graph.facebook.com/v21.0/${videoId}/thumbnails?access_token=${token}`);
      const dataThumbs = await resThumbs.json();
      if (dataThumbs.data && dataThumbs.data.length > 0 && dataThumbs.data[0].uri) {
        thumbUrl = dataThumbs.data[0].uri;
      }
    } catch(e) {}

    // C. Create Ad Creative
    console.log(`Creating Ad Creative for ${ad.name}...`);
    const creativeParams = new URLSearchParams();
    creativeParams.append('name', `Creative - ${ad.name}`);
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
      console.error(`Error creating creative:`, dataCreative.error);
      continue;
    }
    const creativeId = dataCreative.id;
    console.log(`✓ Creative created! ID: ${creativeId}`);

    // D. Create AdSet (ABO R$ 20,00 per day, targeting US, CA, GB, AU, Purchase event)
    console.log(`Creating ABO AdSet: ${ad.adsetName} (R$ 20/day)...`);
    const adsetParams = new URLSearchParams();
    adsetParams.append('name', ad.adsetName);
    adsetParams.append('campaign_id', campaignId);
    adsetParams.append('daily_budget', '2000'); // R$ 20,00 per day
    adsetParams.append('billing_event', 'IMPRESSIONS');
    adsetParams.append('optimization_goal', 'OFFSITE_CONVERSIONS');
    adsetParams.append('bid_strategy', 'LOWEST_COST_WITHOUT_CAP');
    adsetParams.append('promoted_object', JSON.stringify({
      pixel_id: pixelId,
      custom_event_type: 'PURCHASE'
    }));
    adsetParams.append('targeting', JSON.stringify({
      geo_locations: { countries: ['US', 'CA', 'GB', 'AU'] },
      age_min: 25,
      age_max: 65,
      device_platforms: ['mobile', 'desktop'],
      targeting_automation: { advantage_audience: 1 }
    }));
    adsetParams.append('status', 'ACTIVE');
    adsetParams.append('access_token', token);

    const resAdset = await fetch(`https://graph.facebook.com/v21.0/${actId}/adsets`, {
      method: 'POST',
      body: adsetParams
    });
    const dataAdset = await resAdset.json();
    if (dataAdset.error) {
      console.error(`Error creating adset:`, dataAdset.error);
      continue;
    }
    const adsetId = dataAdset.id;
    console.log(`✓ AdSet created! ID: ${adsetId}`);

    // E. Create Ad inside this AdSet
    console.log(`Creating Ad inside AdSet...`);
    const adParams = new URLSearchParams();
    adParams.append('name', ad.name);
    adParams.append('adset_id', adsetId);
    adParams.append('creative', JSON.stringify({ creative_id: creativeId }));
    adParams.append('status', 'ACTIVE');
    adParams.append('access_token', token);

    const resAd = await fetch(`https://graph.facebook.com/v21.0/${actId}/ads`, {
      method: 'POST',
      body: adParams
    });
    const dataAd = await resAd.json();
    if (dataAd.error) {
      console.error(`Error creating ad:`, dataAd.error);
      continue;
    }
    const adId = dataAd.id;
    console.log(`🚀 Ad created successfully! ID: ${adId}`);

    publishedAdsets.push({
      adsetName: ad.adsetName,
      adsetId,
      adName: ad.name,
      adId,
      creativeId,
      videoId,
      dailyBudget: "R$ 20,00"
    });
  }

  const campaignSummary = {
    campaignName: '[The Young Inventors] 01. Sales & Purchase (Global US)',
    campaignId,
    pixelId,
    totalDailyBudget: `R$ ${(publishedAdsets.length * 20).toFixed(2)}`,
    publishedAt: new Date().toISOString(),
    destinationUrl,
    adsets: publishedAdsets
  };

  const outSummary = path.resolve('mega-inventors-us', 'campanha_5_adsets_publicada.json');
  fs.writeFileSync(outSummary, JSON.stringify(campaignSummary, null, 2));

  console.log("\n=======================================================");
  console.log("🎉 META ADS CAMPAIGN PUBLISHED WITH 5 ADSETS ABO (R$ 20/DAY EACH)!");
  console.log(`Campaign ID: ${campaignId}`);
  console.log(`Total Adsets: ${publishedAdsets.length}`);
  console.log(`Summary saved: ${outSummary}`);
  console.log("=======================================================\n");
}

uploadCampaign().catch(err => {
  console.error("Fatal upload error:", err);
  process.exit(1);
});
