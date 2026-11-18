import fetch from 'node-fetch';
import fs from 'fs';

const env = {};
const envLines = fs.readFileSync('mega-inventores/.env', 'utf8').split('\n');
for (const line of envLines) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) env[m[1]] = m[2].trim();
}

const token = env.META_ACCESS_TOKEN;
const actId = env.META_AD_ACCOUNT_ID;

async function checkCampaigns() {
  const res = await fetch(`https://graph.facebook.com/v21.0/${actId}/campaigns?fields=id,name,status,daily_budget,objective&access_token=${token}`);
  const data = await res.json();
  console.log("Campanhas na conta:", JSON.stringify(data, null, 2));

  // Check ads to see destination URL of active ads
  const resAds = await fetch(`https://graph.facebook.com/v21.0/${actId}/ads?fields=id,name,status,creative{id,name,asset_feed_spec,object_story_spec}&access_token=${token}`);
  const dataAds = await resAds.json();
  console.log("Anúncios:", JSON.stringify(dataAds, null, 2));
}

checkCampaigns().catch(console.error);
