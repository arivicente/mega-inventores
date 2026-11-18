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

function parseActions(actions = [], actionValues = []) {
  const getVal = (type) => {
    const item = actions.find(a => a.action_type === type);
    return item ? Number(item.value) : 0;
  };
  const getMoney = (type) => {
    const item = actionValues.find(a => a.action_type === type);
    return item ? Number(item.value) : 0;
  };

  return {
    linkClicks: getVal('link_click'),
    landingPageViews: getVal('landing_page_view') || getVal('omni_landing_page_view'),
    initiateCheckouts: getVal('initiate_checkout') || getVal('omni_initiated_checkout'),
    purchases: getVal('purchase') || getVal('omni_purchase'),
    purchaseValue: getMoney('purchase') || getMoney('omni_purchase'),
    videoViews: getVal('video_view')
  };
}

async function fetchInsights(params) {
  const fields = 'campaign_id,campaign_name,adset_id,adset_name,ad_id,ad_name,spend,impressions,clicks,cpc,cpm,ctr,reach,actions,action_values,cost_per_action_type,purchase_roas';
  const url = `https://graph.facebook.com/v21.0/${actId}/insights?${params}&fields=${fields}&access_token=${token}`;
  const res = await fetch(url);
  return (await res.json()).data || [];
}

async function run() {
  const todayAccount = await fetchInsights('date_preset=today');
  const todayCampaigns = await fetchInsights('level=campaign&date_preset=today');
  const todayAds = await fetchInsights('level=ad&date_preset=today');

  const maxAccount = await fetchInsights('date_preset=maximum');
  const maxCampaigns = await fetchInsights('level=campaign&date_preset=maximum');
  const maxAds = await fetchInsights('level=ad&date_preset=maximum');

  console.log('=== SUMMARY DATA ===\n');

  console.log('--- TODAY ACCOUNT ---');
  if (todayAccount.length) {
    const d = todayAccount[0];
    const acts = parseActions(d.actions, d.action_values);
    console.log({
      spend: 'R$ ' + Number(d.spend).toFixed(2),
      impressions: d.impressions,
      reach: d.reach,
      clicks: d.clicks,
      ctr: Number(d.ctr).toFixed(2) + '%',
      cpc: 'R$ ' + Number(d.cpc).toFixed(2),
      cpm: 'R$ ' + Number(d.cpm).toFixed(2),
      linkClicks: acts.linkClicks,
      landingPageViews: acts.landingPageViews,
      initiateCheckouts: acts.initiateCheckouts,
      costPerIC: acts.initiateCheckouts ? 'R$ ' + (Number(d.spend) / acts.initiateCheckouts).toFixed(2) : 'N/A',
      purchases: acts.purchases,
      purchaseValue: 'R$ ' + acts.purchaseValue.toFixed(2),
      costPerPurchase: acts.purchases ? 'R$ ' + (Number(d.spend) / acts.purchases).toFixed(2) : 'N/A'
    });
  } else {
    console.log('Sem dados para hoje ainda.');
  }

  console.log('\n--- TODAY CAMPAIGNS ---');
  todayCampaigns.forEach(c => {
    const acts = parseActions(c.actions, c.action_values);
    console.log({
      campaign: c.campaign_name,
      spend: 'R$ ' + Number(c.spend).toFixed(2),
      reach: c.reach,
      linkClicks: acts.linkClicks,
      cpc: 'R$ ' + Number(c.cpc).toFixed(2),
      ctr: Number(c.ctr).toFixed(2) + '%',
      landingPageViews: acts.landingPageViews,
      initiateCheckouts: acts.initiateCheckouts,
      costPerIC: acts.initiateCheckouts ? 'R$ ' + (Number(c.spend) / acts.initiateCheckouts).toFixed(2) : 'N/A',
      purchases: acts.purchases,
      purchaseValue: 'R$ ' + acts.purchaseValue.toFixed(2)
    });
  });

  console.log('\n--- TODAY TOP ADS ---');
  todayAds.sort((a,b) => Number(b.spend) - Number(a.spend)).forEach(a => {
    const acts = parseActions(a.actions, a.action_values);
    console.log({
      ad: a.ad_name,
      campaign: a.campaign_name,
      spend: 'R$ ' + Number(a.spend).toFixed(2),
      linkClicks: acts.linkClicks,
      cpc: a.cpc ? 'R$ ' + Number(a.cpc).toFixed(2) : 'N/A',
      ctr: Number(a.ctr).toFixed(2) + '%',
      landingPageViews: acts.landingPageViews,
      initiateCheckouts: acts.initiateCheckouts,
      costPerIC: acts.initiateCheckouts ? 'R$ ' + (Number(a.spend) / acts.initiateCheckouts).toFixed(2) : 'N/A',
      purchases: acts.purchases
    });
  });

  console.log('\n--- CUMULATIVE (MAXIMUM) ACCOUNT ---');
  if (maxAccount.length) {
    const d = maxAccount[0];
    const acts = parseActions(d.actions, d.action_values);
    console.log({
      spend: 'R$ ' + Number(d.spend).toFixed(2),
      impressions: d.impressions,
      reach: d.reach,
      clicks: d.clicks,
      ctr: Number(d.ctr).toFixed(2) + '%',
      cpc: 'R$ ' + Number(d.cpc).toFixed(2),
      cpm: 'R$ ' + Number(d.cpm).toFixed(2),
      linkClicks: acts.linkClicks,
      landingPageViews: acts.landingPageViews,
      initiateCheckouts: acts.initiateCheckouts,
      costPerIC: acts.initiateCheckouts ? 'R$ ' + (Number(d.spend) / acts.initiateCheckouts).toFixed(2) : 'N/A',
      purchases: acts.purchases,
      purchaseValue: 'R$ ' + acts.purchaseValue.toFixed(2),
      costPerPurchase: acts.purchases ? 'R$ ' + (Number(d.spend) / acts.purchases).toFixed(2) : 'N/A'
    });
  }

  console.log('\n--- CUMULATIVE CAMPAIGNS ---');
  maxCampaigns.forEach(c => {
    const acts = parseActions(c.actions, c.action_values);
    console.log({
      campaign: c.campaign_name,
      spend: 'R$ ' + Number(c.spend).toFixed(2),
      reach: c.reach,
      linkClicks: acts.linkClicks,
      ctr: Number(c.ctr).toFixed(2) + '%',
      cpc: c.cpc ? 'R$ ' + Number(c.cpc).toFixed(2) : 'N/A',
      landingPageViews: acts.landingPageViews,
      initiateCheckouts: acts.initiateCheckouts,
      costPerIC: acts.initiateCheckouts ? 'R$ ' + (Number(c.spend) / acts.initiateCheckouts).toFixed(2) : 'N/A',
      purchases: acts.purchases,
      purchaseValue: 'R$ ' + acts.purchaseValue.toFixed(2)
    });
  });
}

run();
