import fetch from 'node-fetch';
import fs from 'fs';

const env = {};
const lines = fs.readFileSync('mega-inventores/.env', 'utf8').split('\n');
for (const l of lines) {
  const m = l.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) env[m[1]] = m[2].trim();
}

const token = env.META_ACCESS_TOKEN;
const actId = env.META_AD_ACCOUNT_ID;
const stripeKey = env.STRIPE_SECRET_KEY;

async function checkAll() {
  console.log('=== METRICAS META ADS HOJE (09/11/2026 - 10:00) ===\n');

  // 1. Account Total
  const resAct = await fetch(`https://graph.facebook.com/v21.0/${actId}/insights?date_preset=today&fields=spend,impressions,clicks,cpc,cpm,ctr,actions,cost_per_action_type&access_token=${token}`);
  const dataAct = await resAct.json();
  const acc = dataAct.data ? dataAct.data[0] : null;
  if (acc) {
    const lpv = acc.actions?.find(a => a.action_type === 'landing_page_view')?.value || 0;
    const linkClicks = acc.actions?.find(a => a.action_type === 'link_click')?.value || 0;
    console.log(`TOTAL CONTA: Gasto R$ ${parseFloat(acc.spend).toFixed(2)} | Impr: ${acc.impressions} | Clicks: ${acc.clicks} | LinkClicks: ${linkClicks} | CTR: ${parseFloat(acc.ctr||0).toFixed(2)}% | CPC: R$ ${parseFloat(acc.cpc||0).toFixed(2)} | CPM: R$ ${parseFloat(acc.cpm||0).toFixed(2)} | LPVs: ${lpv}`);
  } else {
    console.log('Sem dados consolidados da conta hoje.');
  }

  // 2. Campaigns
  const resCamp = await fetch(`https://graph.facebook.com/v21.0/${actId}/campaigns?fields=id,name,status,effective_status,insights.date_preset(today){spend,impressions,clicks,cpc,cpm,ctr,actions,cost_per_action_type}&access_token=${token}`);
  const dataCamp = await resCamp.json();
  console.log('\n--- RESUMO POR CAMPANHA ---');
  for (const c of dataCamp.data) {
    const ins = c.insights?.data?.[0];
    if (ins || c.effective_status === 'ACTIVE') {
      console.log(`\nCampanha: ${c.name} [${c.effective_status}]`);
      if (ins) {
        const linkClicks = ins.actions?.find(a => a.action_type === 'link_click')?.value || 0;
        const lpv = ins.actions?.find(a => a.action_type === 'landing_page_view')?.value || 0;
        const purchases = ins.actions?.find(a => a.action_type === 'purchase')?.value || 0;
        const initCheckout = ins.actions?.find(a => a.action_type === 'initiate_checkout')?.value || 0;
        console.log(`  Gasto: R$ ${parseFloat(ins.spend).toFixed(2)} | Impr: ${ins.impressions} | Clicks: ${ins.clicks} | LinkClicks: ${linkClicks} | CTR: ${parseFloat(ins.ctr||0).toFixed(2)}% | CPC: R$ ${parseFloat(ins.cpc||0).toFixed(2)} | CPM: R$ ${parseFloat(ins.cpm||0).toFixed(2)} | LPVs: ${lpv} | InitCheckouts: ${initCheckout} | Purchases: ${purchases}`);
      } else {
        console.log('  Sem gasto registrado hoje.');
      }
    }
  }

  // 3. Adsets
  const resAdsets = await fetch(`https://graph.facebook.com/v21.0/${actId}/adsets?fields=id,name,status,effective_status,daily_budget,campaign{name},insights.date_preset(today){spend,impressions,clicks,cpc,cpm,ctr,actions,cost_per_action_type}&limit=40&access_token=${token}`);
  const dataAdsets = await resAdsets.json();
  console.log('\n--- DETALHAMENTO DE CONJUNTOS (ADSETS) ATIVOS ---');
  for (const s of dataAdsets.data) {
    const ins = s.insights?.data?.[0];
    if (s.effective_status === 'ACTIVE') {
      const linkClicks = ins?.actions?.find(a => a.action_type === 'link_click')?.value || 0;
      const lpv = ins?.actions?.find(a => a.action_type === 'landing_page_view')?.value || 0;
      console.log(`\n[${s.campaign.name}] ${s.name}`);
      console.log(`  Status: ${s.effective_status} | Budget: R$ ${(parseInt(s.daily_budget||0)/100).toFixed(2)}/dia`);
      if (ins) {
        console.log(`  Gasto: R$ ${parseFloat(ins.spend).toFixed(2)} | Impr: ${ins.impressions} | Clicks: ${ins.clicks} | LinkClicks: ${linkClicks} | CTR: ${parseFloat(ins.ctr||0).toFixed(2)}% | CPC: R$ ${parseFloat(ins.cpc||0).toFixed(2)} | LPVs: ${lpv}`);
      } else {
        console.log('  Sem gasto ainda hoje.');
      }
    }
  }

  // 4. Individual Ads
  const resAds = await fetch(`https://graph.facebook.com/v21.0/${actId}/ads?fields=id,name,status,effective_status,campaign{name},adset{name},insights.date_preset(today){spend,impressions,clicks,cpc,cpm,ctr,actions,cost_per_action_type}&limit=40&access_token=${token}`);
  const dataAds = await resAds.json();
  console.log('\n--- ANUNCIOS QUE GASTARAM HOJE ---');
  for (const ad of dataAds.data) {
    const ins = ad.insights?.data?.[0];
    if (ins && parseFloat(ins.spend) > 0) {
      const linkClicks = ins.actions?.find(a => a.action_type === 'link_click')?.value || 0;
      const lpv = ins.actions?.find(a => a.action_type === 'landing_page_view')?.value || 0;
      console.log(`\n[${ad.campaign.name}] ${ad.name}`);
      console.log(`  Gasto: R$ ${parseFloat(ins.spend).toFixed(2)} | Impr: ${ins.impressions} | Clicks: ${ins.clicks} | LinkClicks: ${linkClicks} | CTR: ${parseFloat(ins.ctr||0).toFixed(2)}% | CPC: R$ ${parseFloat(ins.cpc||0).toFixed(2)} | LPVs: ${lpv}`);
    }
  }

  // 5. Stripe Checkouts / Balance
  if (stripeKey) {
    try {
      const resStripe = await fetch('https://api.stripe.com/v1/checkout/sessions?limit=10', {
        headers: { 'Authorization': `Bearer ${stripeKey}` }
      });
      const dataStripe = await resStripe.json();
      console.log('\n--- ULTIMAS SESSOES DE CHECKOUT NO STRIPE ---');
      if (dataStripe.data && dataStripe.data.length > 0) {
        for (const sess of dataStripe.data) {
          const dt = new Date(sess.created * 1000).toISOString();
          console.log(`Sessao: ${sess.id} | Status: ${sess.status} | Payment: ${sess.payment_status} | Valor: ${(sess.amount_total||0)/100} ${sess.currency?.toUpperCase()} | Email: ${sess.customer_details?.email || sess.customer_email || 'N/A'} | Data: ${dt}`);
        }
      } else {
        console.log('Nenhuma sessao Stripe recente encontrada.');
      }

      // Check Payment Intents
      const resPI = await fetch('https://api.stripe.com/v1/payment_intents?limit=5', {
        headers: { 'Authorization': `Bearer ${stripeKey}` }
      });
      const dataPI = await resPI.json();
      console.log('\n--- ULTIMOS PAGAMENTOS NO STRIPE (PAYMENT INTENTS) ---');
      for (const pi of (dataPI.data || [])) {
        const dt = new Date(pi.created * 1000).toISOString();
        console.log(`PI: ${pi.id} | Status: ${pi.status} | Valor: ${(pi.amount||0)/100} ${pi.currency?.toUpperCase()} | Data: ${dt}`);
      }
    } catch(err) {
      console.error('Erro Stripe:', err.message);
    }
  }
}

checkAll().catch(console.error);
