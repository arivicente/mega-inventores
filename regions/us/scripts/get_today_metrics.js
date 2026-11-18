const token = "EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD";
const actId = "act_898705452000785";
const campId = "120252644518370168";

async function run() {
  console.log("=== RELATÓRIO META ADS HOJE (10/11/2026) ===\n");

  // 1. Account Total
  const resAct = await fetch(`https://graph.facebook.com/v21.0/${actId}/insights?date_preset=today&fields=spend,impressions,clicks,cpc,cpm,ctr,actions,cost_per_action_type&access_token=${token}`);
  const dataAct = await resAct.json();
  const acc = dataAct.data?.[0];
  if (acc) {
    const lpv = acc.actions?.find(a => a.action_type === 'landing_page_view')?.value || 0;
    const linkClicks = acc.actions?.find(a => a.action_type === 'link_click')?.value || 0;
    const purchases = acc.actions?.find(a => a.action_type === 'purchase')?.value || 0;
    const initCheckout = acc.actions?.find(a => a.action_type === 'initiate_checkout')?.value || 0;
    console.log(`TOTAL CONTA HOJE:`);
    console.log(`  Gasto: R$ ${parseFloat(acc.spend).toFixed(2)}`);
    console.log(`  Impressões: ${acc.impressions} | CPM: R$ ${parseFloat(acc.cpm||0).toFixed(2)}`);
    console.log(`  Cliques no Link: ${linkClicks} | Cliques Totais: ${acc.clicks}`);
    console.log(`  CTR: ${parseFloat(acc.ctr||0).toFixed(2)}% | CPC: R$ ${parseFloat(acc.cpc||0).toFixed(2)}`);
    console.log(`  Landing Page Views (LPV): ${lpv}`);
    console.log(`  Checkouts Iniciados: ${initCheckout} | Compras Registradas: ${purchases}`);
  } else {
    console.log("Nenhum dado consolidado na conta hoje.");
  }

  // 2. Individual Ads
  console.log("\n--- DETALHAMENTO DE CADA ANÚNCIO (ADS) HOJE ---");
  const resAds = await fetch(`https://graph.facebook.com/v21.0/${campId}/ads?fields=id,name,status,effective_status,adset{name},insights.date_preset(today){spend,impressions,clicks,cpc,cpm,ctr,actions,cost_per_action_type}&limit=40&access_token=${token}`);
  const dataAds = await resAds.json();
  
  if (dataAds.data) {
    for (const ad of dataAds.data) {
      const ins = ad.insights?.data?.[0];
      const linkClicks = ins?.actions?.find(a => a.action_type === 'link_click')?.value || 0;
      const lpv = ins?.actions?.find(a => a.action_type === 'landing_page_view')?.value || 0;
      const purchases = ins?.actions?.find(a => a.action_type === 'purchase')?.value || 0;
      const initCheckout = ins?.actions?.find(a => a.action_type === 'initiate_checkout')?.value || 0;

      console.log(`\n• Anúncio: ${ad.name} [${ad.effective_status}]`);
      console.log(`  Adset: ${ad.adset?.name}`);
      if (ins) {
        console.log(`  Gasto: R$ ${parseFloat(ins.spend).toFixed(2)} | Impr: ${ins.impressions} | CPM: R$ ${parseFloat(ins.cpm||0).toFixed(2)}`);
        console.log(`  Link Clicks: ${linkClicks} | CTR: ${parseFloat(ins.ctr||0).toFixed(2)}% | CPC: R$ ${parseFloat(ins.cpc||0).toFixed(2)}`);
        console.log(`  LPVs: ${lpv} | Checkouts: ${initCheckout} | Purchases: ${purchases}`);
      } else {
        console.log(`  Gasto: R$ 0.00 (Ainda sem impressões registradas hoje)`);
      }
    }
  }

  // 3. Check live audit sales in Cloudflare KV
  console.log("\n--- CONSULTA DE VENDAS AUDITADAS HOJE (KV / STRIPE) ---");
  try {
    const resSales = await fetch('https://mega-inventors-us.codhun.workers.dev/api/audit-sales?secret=inventors_audit_2026');
    const salesData = await resSales.json();
    console.log("Resumo de Vendas:", JSON.stringify(salesData.summary, null, 2));
    if (salesData.sales) {
      console.log(`Total de vendas no banco: ${salesData.sales.length}`);
      salesData.sales.forEach(s => {
        console.log(`  - [${s.createdAt}] ${s.name} (${s.email}): $${s.amount} USD | Bumps: ${s.items.length - 1} | CAPI: ${s.capiStatus}`);
      });
    }
  } catch (err) {
    console.log("Erro ao consultar audit-sales:", err.message);
  }
}

run().catch(console.error);
