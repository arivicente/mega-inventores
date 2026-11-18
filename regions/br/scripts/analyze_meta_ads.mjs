import fetch from 'node-fetch';
import fs from 'fs';

// Load .env
const env = {};
const envLines = fs.readFileSync('mega-inventores/.env', 'utf8').split('\n');
for (const line of envLines) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) env[m[1]] = m[2].trim();
}

const token = env.META_ACCESS_TOKEN;
const actId = env.META_AD_ACCOUNT_ID; // act_898705452000785

async function getAccountInfo() {
  const res = await fetch(`https://graph.facebook.com/v21.0/${actId}?fields=id,name,account_status,currency,amount_spent,timezone_name&access_token=${token}`);
  return await res.json();
}

async function getInsights(datePreset) {
  const fields = 'account_id,spend,impressions,clicks,cpc,cpm,ctr,reach,actions,action_values,cost_per_action_type,purchase_roas';
  const url = `https://graph.facebook.com/v21.0/${actId}/insights?date_preset=${datePreset}&fields=${fields}&access_token=${token}`;
  const res = await fetch(url);
  return await res.json();
}

async function getCampaignInsights(datePreset) {
  const fields = 'campaign_id,campaign_name,spend,impressions,clicks,cpc,cpm,ctr,reach,actions,action_values,cost_per_action_type,purchase_roas';
  const url = `https://graph.facebook.com/v21.0/${actId}/insights?level=campaign&date_preset=${datePreset}&fields=${fields}&access_token=${token}`;
  const res = await fetch(url);
  return await res.json();
}

async function getAdInsights(datePreset) {
  const fields = 'ad_id,ad_name,campaign_name,spend,impressions,clicks,cpc,cpm,ctr,reach,actions,action_values,cost_per_action_type,purchase_roas';
  const url = `https://graph.facebook.com/v21.0/${actId}/insights?level=ad&date_preset=${datePreset}&fields=${fields}&access_token=${token}`;
  const res = await fetch(url);
  return await res.json();
}

async function getActiveCampaigns() {
  const url = `https://graph.facebook.com/v21.0/${actId}/campaigns?fields=id,name,status,effective_status,daily_budget,lifetime_budget,objective&limit=25&access_token=${token}`;
  const res = await fetch(url);
  return await res.json();
}

async function run() {
  console.log('Fetching Meta Ads data...');
  const actInfo = await getAccountInfo();
  console.log('Account Info:', JSON.stringify(actInfo, null, 2));

  console.log('\n--- ACTIVE CAMPAIGNS ---');
  const campaigns = await getActiveCampaigns();
  console.log(JSON.stringify(campaigns, null, 2));

  console.log('\n--- TODAY INSIGHTS (date_preset=today) ---');
  const today = await getInsights('today');
  console.log(JSON.stringify(today, null, 2));

  console.log('\n--- TODAY CAMPAIGN INSIGHTS ---');
  const todayCamp = await getCampaignInsights('today');
  console.log(JSON.stringify(todayCamp, null, 2));

  console.log('\n--- TODAY AD INSIGHTS ---');
  const todayAd = await getAdInsights('today');
  console.log(JSON.stringify(todayAd, null, 2));

  console.log('\n--- MAXIMUM (CUMULATIVE / LIFETIME) INSIGHTS ---');
  const maxInsights = await getInsights('maximum');
  console.log(JSON.stringify(maxInsights, null, 2));

  console.log('\n--- MAXIMUM CAMPAIGN INSIGHTS ---');
  const maxCamp = await getCampaignInsights('maximum');
  console.log(JSON.stringify(maxCamp, null, 2));

  console.log('\n--- MAXIMUM AD INSIGHTS ---');
  const maxAd = await getAdInsights('maximum');
  console.log(JSON.stringify(maxAd, null, 2));
}

run();
