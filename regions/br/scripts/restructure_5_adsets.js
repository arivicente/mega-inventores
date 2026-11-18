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
const pixelId = env.META_PIXEL_ID; // 1864964467859741
const campaignId = '120252633565190168'; // [Mega Inventores] 01. Vendas & Conversao Direta (Purchase)
const oldAdsetId = '120252633580120168';

const adsData = [
  {
    num: "01",
    name: "Anúncio 01 - Telas vs Curiosidade (Portão & Robô)",
    adsetName: "[ABO R$20] Ad 01 - Telas vs Curiosidade (Portão & Robô)",
    creativeId: "2339352433525048"
  },
  {
    num: "02",
    name: "Anúncio 02 - Robôs Articulados & Engenharia Caseira",
    adsetName: "[ABO R$20] Ad 02 - Robôs Articulados & Engenharia Caseira",
    creativeId: "1676067437481575"
  },
  {
    num: "03",
    name: "Anúncio 03 - Conexão Pai & Filho Sem Telas",
    adsetName: "[ABO R$20] Ad 03 - Conexão Pai & Filho Sem Telas",
    creativeId: "1808795680335569"
  },
  {
    num: "04",
    name: "Anúncio 04 - Oficina com Recicláveis & 120 Projetos",
    adsetName: "[ABO R$20] Ad 04 - Oficina com Recicláveis & 120 Projetos",
    creativeId: "1136950918748483"
  },
  {
    num: "05",
    name: "Anúncio 05 - Dinâmico 18s (Não é só Brincar)",
    adsetName: "[ABO R$20] Ad 05 - Dinâmico 18s (Não é só Brincar)",
    creativeId: "1158003670016475"
  }
];

async function restructure() {
  console.log("==========================================================");
  console.log("🚀 REESTRUTURANDO META ADS: 5 CONJUNTOS DE R$ 20/DIA CADA");
  console.log("==========================================================");

  // 1. Pausar Adset Antigo
  console.log(`\n1. Pausando conjunto antigo compartilhado (${oldAdsetId})...`);
  try {
    const pauseParams = new URLSearchParams();
    pauseParams.append('status', 'PAUSED');
    pauseParams.append('access_token', token);
    const resPause = await fetch(`https://graph.facebook.com/v21.0/${oldAdsetId}`, {
      method: 'POST',
      body: pauseParams
    });
    const dataPause = await resPause.json();
    console.log("Resultado da pausa do adset antigo:", dataPause);
  } catch (e) {
    console.error("Erro ao pausar adset antigo:", e.message);
  }

  // 2. Criar 5 AdSets com R$ 20/dia e 1 Anúncio em cada
  const newStructure = [];

  for (const item of adsData) {
    console.log(`\n--- Criando Conjunto para ${item.name} ---`);
    const adsetParams = new URLSearchParams();
    adsetParams.append('name', item.adsetName);
    adsetParams.append('campaign_id', campaignId);
    adsetParams.append('daily_budget', '2000'); // R$ 20,00 por dia
    adsetParams.append('billing_event', 'IMPRESSIONS');
    adsetParams.append('optimization_goal', 'OFFSITE_CONVERSIONS');
    adsetParams.append('bid_strategy', 'LOWEST_COST_WITHOUT_CAP');
    adsetParams.append('promoted_object', JSON.stringify({
      pixel_id: pixelId,
      custom_event_type: 'PURCHASE'
    }));
    adsetParams.append('targeting', JSON.stringify({
      geo_locations: { countries: ['BR'] },
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
      console.error(`❌ Erro ao criar adset para ${item.name}:`, dataAdset.error);
      continue;
    }
    const newAdsetId = dataAdset.id;
    console.log(`✅ Adset criado! ID: ${newAdsetId} (Orçamento: R$ 20,00/dia)`);

    // Criar Anúncio no AdSet
    console.log(`Criando anúncio ${item.name} no adset ${newAdsetId}...`);
    const adParams = new URLSearchParams();
    adParams.append('name', item.name);
    adParams.append('adset_id', newAdsetId);
    adParams.append('creative', JSON.stringify({ creative_id: item.creativeId }));
    adParams.append('status', 'ACTIVE');
    adParams.append('access_token', token);

    const resAd = await fetch(`https://graph.facebook.com/v21.0/${actId}/ads`, {
      method: 'POST',
      body: adParams
    });
    const dataAd = await resAd.json();
    if (dataAd.error) {
      console.error(`❌ Erro ao criar ad no novo adset:`, dataAd.error);
      continue;
    }
    const newAdId = dataAd.id;
    console.log(`🎉 Anúncio alocado com sucesso! ID: ${newAdId}`);

    newStructure.push({
      adsetName: item.adsetName,
      adsetId: newAdsetId,
      adName: item.name,
      adId: newAdId,
      creativeId: item.creativeId,
      dailyBudget: "R$ 20,00"
    });
  }

  console.log("\n==========================================================");
  console.log("🏆 REESTRUTURAÇÃO CONCLUÍDA COM SUCESSO!");
  console.log(`Total de Conjuntos Ativos: ${newStructure.length}`);
  console.log(`Orçamento Diário Total: R$ ${newStructure.length * 20},00/dia (5 x R$ 20)`);
  console.log("==========================================================");

  // Salvar registro
  fs.writeFileSync('mega-inventores/campanha_5_adsets_publicada.json', JSON.stringify({
    campaignId,
    pixelId,
    totalDailyBudget: `R$ ${newStructure.length * 20},00`,
    updatedAt: new Date().toISOString(),
    adsets: newStructure
  }, null, 2));
}

restructure().catch(console.error);
