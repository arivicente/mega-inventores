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
const actId = 'act_898705452000785';

async function auditMonth() {
  const url = `https://graph.facebook.com/v21.0/${actId}/insights?level=ad&date_preset=this_month&fields=ad_id,ad_name,spend,impressions,reach,clicks,inline_link_clicks,ctr,inline_link_click_ctr,cpc,cpm,actions&limit=100&access_token=${fbToken}`;
  const res = await fetch(url);
  const data = await res.json();

  const adsMap = {};

  for (const item of data.data || []) {
    let cleanName = item.ad_name;
    let group = 'Outro';
    if (/Ad 01|Ad01|Screens/i.test(cleanName)) group = 'Ad 01 - Screens vs Curiosity';
    else if (/Ad 02|Ad02|Robots/i.test(cleanName)) group = 'Ad 02 - Articulated Robots';
    else if (/Ad 03|Ad03|Parent/i.test(cleanName)) group = 'Ad 03 - Parent & Child Weekend';
    else if (/Ad 04|Ad04|Cardboard/i.test(cleanName)) group = 'Ad 04 - Cardboard Workshop 120 Projects';
    else if (/Ad 05|Ad05|Dynamic/i.test(cleanName)) group = 'Ad 05 - Dynamic 18s Build Future';

    if (!adsMap[group]) {
      adsMap[group] = {
        name: group,
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        linkClicks: 0,
        checkouts: 0,
        purchases: 0,
        instances: []
      };
    }

    const spend = parseFloat(item.spend || 0);
    const imp = parseInt(item.impressions || 0);
    const linkClicks = parseInt(item.inline_link_clicks || 0);
    const clicks = parseInt(item.clicks || 0);
    const ics = parseInt(item.actions?.find(a => a.action_type === 'initiate_checkout')?.value || 0);
    const purs = parseInt(item.actions?.find(a => a.action_type === 'purchase')?.value || 0);

    adsMap[group].spend += spend;
    adsMap[group].impressions += imp;
    adsMap[group].linkClicks += linkClicks;
    adsMap[group].clicks += clicks;
    adsMap[group].checkouts += ics;
    adsMap[group].purchases += purs;
    adsMap[group].instances.push({
      ad_id: item.ad_id,
      name: item.ad_name,
      spend,
      linkClicks,
      ics,
      purs
    });
  }

  console.log('=== AUDITORIA MENSAL CONSOLIDADA (01/11 A 13/11) ===');
  for (const [key, g] of Object.entries(adsMap)) {
    const cpc = g.linkClicks > 0 ? (g.spend / g.linkClicks).toFixed(2) : 'N/A';
    const cpaIC = g.checkouts > 0 ? (g.spend / g.checkouts).toFixed(2) : 'N/A';
    const cpaPurchase = g.purchases > 0 ? (g.spend / g.purchases).toFixed(2) : 'N/A';
    const ctrLink = g.impressions > 0 ? ((g.linkClicks / g.impressions) * 100).toFixed(2) + '%' : '0%';

    console.log(`\n==============================================`);
    console.log(`🎯 ${g.name}`);
    console.log(`   Gasto Total no Mês: R$ ${g.spend.toFixed(2)}`);
    console.log(`   Impressões: ${g.impressions} | Cliques no Link: ${g.linkClicks} | CTR Link: ${ctrLink}`);
    console.log(`   CPC Médio do Link: R$ ${cpc}`);
    console.log(`   Inícios de Checkout: ${g.checkouts} (Custo por Checkout: R$ ${cpaIC})`);
    console.log(`   Compras (Pixel Meta): ${g.purchases} (CPA Compra: R$ ${cpaPurchase})`);
    console.log(`   Qtd de campanhas/conjuntos onde rodou: ${g.instances.length}`);
  }
}

auditMonth().catch(console.error);
