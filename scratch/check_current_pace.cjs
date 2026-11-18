const fs = require('fs');

function loadEnv(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) env[trimmed.substring(0, idx).trim()] = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
    });
    return env;
  } catch (e) { return {}; }
}

const env = { ...loadEnv('.env'), ...loadEnv('mega-inventors/regions/us/.env') };
const fbToken = env.META_ACCESS_TOKEN || env.FB_ACCESS_TOKEN || env.FB_TOKEN;
const stripeKey = env.STRIPE_SECRET_KEY;

async function checkNow() {
  const adsetId = '120252715725420168';
  const insRes = await fetch(`https://graph.facebook.com/v21.0/${adsetId}/insights?date_preset=today&fields=spend,impressions,reach,clicks,inline_link_clicks,cpc,actions&access_token=${fbToken}`);
  const ins = await insRes.json();
  console.log('Adset Today:', ins.data?.[0]);

  const adsRes = await fetch(`https://graph.facebook.com/v21.0/${adsetId}/ads?fields=id,name,status,effective_status&access_token=${fbToken}`);
  const ads = await adsRes.json();
  for (const a of ads.data || []) {
    const aIns = await fetch(`https://graph.facebook.com/v21.0/${a.id}/insights?date_preset=today&fields=spend,impressions,inline_link_clicks,actions&access_token=${fbToken}`);
    const aData = (await aIns.json()).data?.[0];
    console.log(`- ${a.name} [${a.status}] | Spend: R$ ${aData?.spend || 0} | Link Clicks: ${aData?.inline_link_clicks || 0}`);
  }

  // Check Stripe
  const startOfDay = Math.floor(new Date('2026-11-13T00:00:00-03:00').getTime() / 1000);
  const sRes = await fetch(`https://api.stripe.com/v1/payment_intents?created[gte]=${startOfDay}&limit=5`, {
    headers: { Authorization: `Bearer ${stripeKey}` }
  });
  const sData = await sRes.json();
  console.log('Stripe sales today:', (sData.data || []).map(p => ({ id: p.id, status: p.status, amount: p.amount/100 })));
}

checkNow().catch(console.error);
