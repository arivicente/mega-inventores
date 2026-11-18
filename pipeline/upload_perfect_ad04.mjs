import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

const token = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';
const actId = 'act_898705452000785';
const pageId = '1407050532499881';
const adsetId = '120252644535670168'; // Ad 04 Adset
const existingAdId = '120252644536160168'; // Ad 04 Ad
const destinationUrl = 'https://mega-inventors-us.codhun.workers.dev/';

const videoPath = 'C:/Users/Star/Documents/espionagem1/mega-inventors/rendered_ads/en/ad_04_en.mp4';

console.log("=== UPLOADING PERFECTED AD 04 TO META ADS ===");
console.log(`Video File: ${videoPath} (${(fs.statSync(videoPath).size / 1024 / 1024).toFixed(2)} MB)`);

async function waitVideoReady(videoId, maxWaitMs = 120000) {
  const start = Date.now();
  console.log(`Waiting for Meta video processing (${videoId})...`);
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${videoId}?fields=status&access_token=${token}`);
      const data = await res.json();
      if (data.status && data.status.video_status === 'ready') {
        console.log(`✓ Video ${videoId} is READY!`);
        return true;
      }
      console.log(`Current status: ${data.status ? data.status.video_status : 'processing'}...`);
    } catch(e) {}
    await new Promise(r => setTimeout(r, 4000));
  }
  return false;
}

async function run() {
  // 1. Upload video to Meta
  console.log("\n1. Uploading video to Meta Advideos endpoint...");
  const form = new FormData();
  form.append('access_token', token);
  form.append('source', fs.createReadStream(videoPath));
  form.append('title', "Turn Cardboard Boxes Into Working Inventions (Ad 04 Perfect EN)");

  const resVideo = await fetch(`https://graph-video.facebook.com/v21.0/${actId}/advideos`, {
    method: 'POST',
    body: form
  });
  const dataVideo = await resVideo.json();
  if (dataVideo.error) {
    throw new Error(`Error uploading video: ${JSON.stringify(dataVideo.error)}`);
  }
  const videoId = dataVideo.id;
  console.log(`✓ Video uploaded successfully! Video ID: ${videoId}`);

  await waitVideoReady(videoId);

  // 2. Fetch thumbnail
  let thumbUrl = `${destinationUrl}assets/mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png`;
  try {
    const resThumbs = await fetch(`https://graph.facebook.com/v21.0/${videoId}/thumbnails?access_token=${token}`);
    const dataThumbs = await resThumbs.json();
    if (dataThumbs.data && dataThumbs.data.length > 0 && dataThumbs.data[0].uri) {
      thumbUrl = dataThumbs.data[0].uri;
    }
  } catch(e) {}
  console.log(`Using Thumbnail URL: ${thumbUrl}`);

  // 3. Create new Creative
  console.log("\n2. Creating new Ad Creative...");
  const creativeParams = new URLSearchParams();
  creativeParams.append('name', `Creative - Ad 04 - Cardboard Inventions Perfect EN ${Date.now()}`);
  creativeParams.append('object_story_spec', JSON.stringify({
    page_id: pageId,
    video_data: {
      video_id: videoId,
      image_url: thumbUrl,
      call_to_action: {
        type: 'LEARN_MORE',
        value: { link: destinationUrl }
      },
      message: "💡 You don't need $100 plastic kits to teach your kids real physics.\n\nWith The Young Inventor's Mega Pack, your child explores levers, hydraulics, and mechanical gears using simple recyclables.\n\n🎯 Builds problem-solving skills, hand-eye coordination, and deep screen-free focus.\n\nTap 'Learn More' and download the full library now for just $27 with lifetime access.",
      title: "Turn Cardboard Boxes Into Working Inventions"
    }
  }));
  creativeParams.append('access_token', token);

  const resCreative = await fetch(`https://graph.facebook.com/v21.0/${actId}/adcreatives`, {
    method: 'POST',
    body: creativeParams
  });
  const dataCreative = await resCreative.json();
  if (dataCreative.error) {
    throw new Error(`Error creating creative: ${JSON.stringify(dataCreative.error)}`);
  }
  const creativeId = dataCreative.id;
  console.log(`✓ Creative created! Creative ID: ${creativeId}`);

  // 4. Update Adset: status ACTIVE, budget R$ 50/day (5000)
  console.log("\n3. Updating Adset to ACTIVE with R$ 50/day...");
  const adsetParams = new URLSearchParams();
  adsetParams.append('name', '[ABO R$50] Ad 04 - Recycled Cardboard Workshop & 120 Projects');
  adsetParams.append('daily_budget', '5000');
  adsetParams.append('status', 'ACTIVE');
  adsetParams.append('access_token', token);

  const resAdset = await fetch(`https://graph.facebook.com/v21.0/${adsetId}`, {
    method: 'POST',
    body: adsetParams
  });
  const dataAdset = await resAdset.json();
  console.log(`✓ Adset updated:`, dataAdset);

  // 5. Update Ad with new Creative and status ACTIVE
  console.log("\n4. Updating Ad with new creative and setting to ACTIVE...");
  const adParams = new URLSearchParams();
  adParams.append('name', 'Ad 04 - Recycled Cardboard Workshop & 120 Projects (English Perfect)');
  adParams.append('creative', JSON.stringify({ creative_id: creativeId }));
  adParams.append('status', 'ACTIVE');
  adParams.append('access_token', token);

  const resAd = await fetch(`https://graph.facebook.com/v21.0/${existingAdId}`, {
    method: 'POST',
    body: adParams
  });
  const dataAd = await resAd.json();
  console.log(`✓ Ad updated:`, dataAd);

  console.log("\n=======================================================");
  console.log("🚀 AD 04 UPLOADED AND ACTIVATED SUCCESSFULLY!");
  console.log(`Adset ID: ${adsetId}`);
  console.log(`Ad ID: ${existingAdId}`);
  console.log(`Creative ID: ${creativeId}`);
  console.log(`Video ID: ${videoId}`);
  console.log("Daily Budget: R$ 50,00 | Status: ACTIVE");
  console.log("=======================================================\n");
}

run().catch(console.error);
