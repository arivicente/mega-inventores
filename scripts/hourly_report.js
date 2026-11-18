const fs = require('fs');
const path = require('path');

function loadEnv(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        env[trimmed.substring(0, idx).trim()] = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
      }
    });
    return env;
  } catch (e) { return {}; }
}

const env1 = loadEnv(path.join(__dirname, '../../.env'));
const env2 = loadEnv(path.join(__dirname, '../regions/us/.env'));
const env3 = loadEnv(path.join(process.cwd(), 'mega-inventors/regions/us/.env'));
const env = { ...env1, ...env2, ...env3 };

const fbToken = env.META_ACCESS_TOKEN || env.FB_ACCESS_TOKEN || env.FB_TOKEN;
const stripeKey = env.STRIPE_SECRET_KEY;

async function generateReport() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  // 1. Meta Adset Insights
  let metaData = null;
  let adDetails = [];
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/120252715725420168/insights?date_preset=today&fields=spend,impressions,reach,clicks,inline_link_clicks,cpc,cpm,actions&access_token=${fbToken}`);
    const j = await res.json();
    metaData = j.data?.[0];

    const adsRes = await fetch(`https://graph.facebook.com/v21.0/120252715725420168/ads?fields=id,name&access_token=${fbToken}`);
    const ads = await adsRes.json();
    for (const ad of ads.data || []) {
      const aIns = await fetch(`https://graph.facebook.com/v21.0/${ad.id}/insights?date_preset=today&fields=spend,impressions,inline_link_clicks,actions&access_token=${fbToken}`);
      const aJson = await aIns.json();
      const d = aJson.data?.[0];
      const ics = d?.actions?.find(a => a.action_type === 'initiate_checkout')?.value || 0;
      const pur = d?.actions?.find(a => a.action_type === 'purchase')?.value || 0;
      adDetails.push({
        name: ad.name.replace(/Ad \d+ - /, '').slice(0, 20),
        idShort: ad.name.slice(0, 5),
        spend: parseFloat(d?.spend || 0).toFixed(2),
        clicks: d?.inline_link_clicks || 0,
        ic: ics,
        pur: pur
      });
    }
  } catch(e) {
    console.error('Meta fetch error', e);
  }

  // 2. Stripe Sales Today
  let stripeSales = 0;
  let stripeRevenueUSD = 0;
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startSec = Math.floor(startOfDay.getTime() / 1000);
    const sRes = await fetch(`https://api.stripe.com/v1/payment_intents?created[gte]=${startSec}&limit=20`, {
      headers: { 'Authorization': `Bearer ${stripeKey}` }
    });
    const sData = await sRes.json();
    (sData.data || []).forEach(pi => {
      if (pi.status === 'succeeded') {
        stripeSales++;
        stripeRevenueUSD += (pi.amount / 100);
      }
    });
  } catch(e) {
    console.error('Stripe error', e);
  }

  // 3. Funnel Telemetry (Cloudflare)
  let funnel = null;
  try {
    const cfRes = await fetch('https://mega-inventors-us.codhun.workers.dev/api/audit-funnel?secret=inventors_audit_2026');
    const cf = await cfRes.json();
    funnel = cf.metrics;
  } catch(e) {}

  // Format message
  const lines = [
    `📊 *MEGA PACK USA - RELATÓRIO HORÁRIO*`,
    `⏰ *${timeStr}* (${dateStr})`,
    ``,
    `💰 *Vendas Hoje (Stripe):* ${stripeSales} venda(s) | *$${stripeRevenueUSD.toFixed(2)} USD*`,
    `📈 *Investimento Hoje (Meta):* *R$ ${metaData?.spend || '0.00'}*`,
    `⚡ *Cliques no Link:* ${metaData?.inline_link_clicks || 0} | *CPC:* R$ ${parseFloat(metaData?.cpc || 0).toFixed(2)}`,
    `🛒 *Checkouts Meta:* ${metaData?.actions?.find(a => a.action_type === 'initiate_checkout')?.value || 0}`,
    ``,
    `🎯 *Desempenho por Anúncio:*`
  ];

  adDetails.forEach(a => {
    lines.push(`• ${a.idShort}: R$ ${a.spend} | ${a.clicks} cliq | ${a.ic} IC | ${a.pur} vend (${a.name})`);
  });

  if (funnel) {
    lines.push(``);
    lines.push(`🌐 *Funil da Página (Hoje):*`);
    lines.push(`• Visitas: ${funnel.page_view || 0} | Rolou Checkout: ${funnel.scroll_checkout || 0} | Início Checkout: ${funnel.checkout_start || 0}`);
  }

  return lines.join('\n');
}

if (require.main === module) {
  generateReport().then(console.log);
}

module.exports = { generateReport };
