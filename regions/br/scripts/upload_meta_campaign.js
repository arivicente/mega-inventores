import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import { adsConfig, token, actId, pageId, pixelId, destinationUrl } from './meta_campaign_config.js';

async function waitVideoReady(videoId, maxWaitMs = 60000) {
  const start = Date.now();
  console.log(`Aguardando processamento do vídeo ${videoId} pela Meta...`);
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${videoId}?fields=status&access_token=${token}`);
      const data = await res.json();
      if (data.status && data.status.video_status === 'ready') {
        console.log(`✅ Vídeo ${videoId} processado e pronto!`);
        return true;
      }
    } catch(e) {}
    await new Promise(r => setTimeout(r, 4000));
  }
  console.log(`Aviso: Tempo limite de espera para vídeo ${videoId}, prosseguindo...`);
  return false;
}

async function uploadCampaign() {
  console.log("==================================================");
  console.log("🚀 INICIANDO SUBIDA DA CAMPANHA MEGA INVENTORES");
  console.log("==================================================");

  let campaignId = '120252633565190168';
  try {
    // Verificar se a campanha 120252633565190168 existe e está ativa
    const checkRes = await fetch(`https://graph.facebook.com/v21.0/${campaignId}?fields=id,name&access_token=${token}`);
    const checkData = await checkRes.json();
    if (checkData.id) {
      console.log(`Reutilizando campanha criada: ${checkData.name} (ID: ${campaignId})`);
    } else {
      campaignId = null;
    }
  } catch(e) {
    campaignId = null;
  }

  if (!campaignId) {
    console.log("\n1. Criando Campanha (OUTCOME_SALES)...");
    const campaignParams = new URLSearchParams();
    campaignParams.append('name', '[Mega Inventores] 01. Vendas & Conversao Direta (Purchase)');
    campaignParams.append('objective', 'OUTCOME_SALES');
    campaignParams.append('status', 'ACTIVE');
    campaignParams.append('special_ad_categories', '[]');
    campaignParams.append('is_adset_budget_sharing_enabled', 'false');
    campaignParams.append('access_token', token);

    const resCamp = await fetch(`https://graph.facebook.com/v21.0/${actId}/campaigns`, {
      method: 'POST',
      body: campaignParams
    });
    const dataCamp = await resCamp.json();
    if (dataCamp.error) {
      throw new Error(`Erro ao criar campanha: ${JSON.stringify(dataCamp.error)}`);
    }
    campaignId = dataCamp.id;
    console.log(`✅ Campanha criada com sucesso! ID: ${campaignId}`);
  }

  // 2. Criar Conjunto de Anúncios (ABO R$ 50/dia com Pixel Oficial e Evento PURCHASE)
  console.log("\n2. Criando Conjunto de Anúncios (R$ 50/dia, Pixel 1864964467859741, Purchase)...");
  const adsetParams = new URLSearchParams();
  adsetParams.append('name', '[ABO] Brasil 25-55+ • Pais & Mães • Feed + Reels + Stories');
  adsetParams.append('campaign_id', campaignId);
  adsetParams.append('daily_budget', '5000'); // R$ 50,00
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
    throw new Error(`Erro ao criar adset: ${JSON.stringify(dataAdset.error)}`);
  }
  const adsetId = dataAdset.id;
  console.log(`✅ Adset criado com sucesso! ID: ${adsetId}`);

  // 3. Upload dos Vídeos e Criação dos Criativos
  console.log("\n3. Fazendo upload dos vídeos e criando anúncios...");
  const videosDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos');
  const uploadedAds = [];

  for (const ad of adsConfig) {
    console.log(`\n--- Processando ${ad.name} ---`);
    const filePath = path.join(videosDir, ad.videoFile);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Arquivo não encontrado: ${filePath}`);
      continue;
    }

    // Upload do Vídeo
    console.log(`Enviando vídeo ${ad.videoFile} para a Meta...`);
    const form = new FormData();
    form.append('access_token', token);
    form.append('source', fs.createReadStream(filePath));
    form.append('title', ad.title);

    const resVideo = await fetch(`https://graph-video.facebook.com/v21.0/${actId}/advideos`, {
      method: 'POST',
      body: form
    });
    const dataVideo = await resVideo.json();
    if (dataVideo.error) {
      console.error(`Erro ao subir vídeo ${ad.videoFile}:`, dataVideo.error);
      continue;
    }
    const videoId = dataVideo.id;
    console.log(`✅ Vídeo enviado! ID: ${videoId}`);

    // Aguardar processamento
    await waitVideoReady(videoId);

    // Pegar thumbnail automático ou fallback
    let thumbUrl = `${destinationUrl}anuncios/videos/overlay_ultra_cta.png`;
    try {
      const resThumbs = await fetch(`https://graph.facebook.com/v21.0/${videoId}/thumbnails?access_token=${token}`);
      const dataThumbs = await resThumbs.json();
      if (dataThumbs.data && dataThumbs.data.length > 0 && dataThumbs.data[0].uri) {
        thumbUrl = dataThumbs.data[0].uri;
      }
    } catch(e) {}

    // Criar Creative
    console.log(`Criando Ad Creative para ${ad.name}...`);
    const creativeParams = new URLSearchParams();
    creativeParams.append('name', `Criativo - ${ad.name}`);
    creativeParams.append('object_story_spec', JSON.stringify({
      page_id: pageId,
      video_data: {
        video_id: videoId,
        image_url: thumbUrl,
        call_to_action: {
          type: 'LEARN_MORE',
          value: { link: destinationUrl }
        },
        message: ad.message,
        title: ad.title
      }
    }));
    creativeParams.append('access_token', token);

    const resCreative = await fetch(`https://graph.facebook.com/v21.0/${actId}/adcreatives`, {
      method: 'POST',
      body: creativeParams
    });
    const dataCreative = await resCreative.json();
    if (dataCreative.error) {
      console.error(`Erro ao criar creative:`, dataCreative.error);
      continue;
    }
    const creativeId = dataCreative.id;
    console.log(`✅ Creative criado! ID: ${creativeId}`);

    // Criar Anúncio
    console.log(`Criando Anúncio ${ad.name}...`);
    const adParams = new URLSearchParams();
    adParams.append('name', ad.name);
    adParams.append('adset_id', adsetId);
    adParams.append('creative', JSON.stringify({ creative_id: creativeId }));
    adParams.append('status', 'ACTIVE');
    adParams.append('access_token', token);

    const resAd = await fetch(`https://graph.facebook.com/v21.0/${actId}/ads`, {
      method: 'POST',
      body: adParams
    });
    const dataAd = await resAd.json();
    if (dataAd.error) {
      console.error(`Erro ao criar ad:`, dataAd.error);
      continue;
    }
    console.log(`🎉 Anúncio criado com sucesso! ID: ${dataAd.id}`);
    uploadedAds.push({ name: ad.name, adId: dataAd.id, creativeId, videoId });
  }

  console.log("\n==================================================");
  console.log("🏆 CAMPANHA E ANÚNCIOS SUBIDOS COM SUCESSO!");
  console.log(`Campanha ID: ${campaignId}`);
  console.log(`Adset ID: ${adsetId}`);
  console.log(`Total de Anúncios Ativos: ${uploadedAds.length}`);
  console.log("==================================================");

  // Salvar registro de subida
  fs.writeFileSync('mega-inventores/campanha_publicada.json', JSON.stringify({
    campaignId,
    adsetId,
    pixelId,
    pageId,
    dailyBudget: 'R$ 50,00',
    publishedAt: new Date().toISOString(),
    ads: uploadedAds
  }, null, 2));
}

// Executar
uploadCampaign().catch(console.error);
