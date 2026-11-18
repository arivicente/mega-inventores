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
      if (idx !== -1) env[trimmed.substring(0, idx).trim()] = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
    });
    return env;
  } catch (e) { return {}; }
}

const env = { 
  ...loadEnv(path.join(__dirname, '../../.env')), 
  ...loadEnv(path.join(__dirname, '../regions/us/.env')) 
};

const fbToken = env.META_ACCESS_TOKEN || env.FB_ACCESS_TOKEN || env.FB_TOKEN;
const stripeKey = env.STRIPE_SECRET_KEY;
const phoneId = '1443829242138375';
const recipient = '5521987552460';
const ad04Id = '120252715727030168';

async function sendWhatsApp(text) {
  try {
    await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${fbToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipient,
        type: 'text',
        text: { body: text }
      })
    });
  } catch(e) {
    console.error('WhatsApp send error:', e);
  }
}

async function evaluate() {
  console.log(`[${new Date().toLocaleTimeString('pt-BR')}] Executando avaliação do Ad 04...`);

  // 1. Check Stripe sales today
  const startOfDay = Math.floor(new Date('2026-11-13T00:00:00-03:00').getTime() / 1000);
  const sRes = await fetch(`https://api.stripe.com/v1/payment_intents?created[gte]=${startOfDay}&limit=20`, {
    headers: { Authorization: `Bearer ${stripeKey}` }
  });
  const sData = await sRes.json();
  const successfulIntents = (sData.data || []).filter(p => p.status === 'succeeded');

  let ad04Sold = false;
  let totalRevenue = 0;

  for (const pi of successfulIntents) {
    totalRevenue += (pi.amount / 100);
    // Check checkout session metadata if available
    const csRes = await fetch(`https://api.stripe.com/v1/checkout/sessions?payment_intent=${pi.id}`, {
      headers: { Authorization: `Bearer ${stripeKey}` }
    });
    const csData = await csRes.json();
    const session = csData.data?.[0];
    if (session?.metadata?.utm_content === ad04Id) {
      ad04Sold = true;
    }
  }

  // Also check Meta Insights for Ad 04 today
  const insRes = await fetch(`https://graph.facebook.com/v21.0/${ad04Id}/insights?date_preset=today&fields=spend,actions&access_token=${fbToken}`);
  const ins = await insRes.json();
  const d = ins.data?.[0];
  const spend = d?.spend || '0.00';
  const metaPurchases = d?.actions?.find(a => a.action_type === 'purchase')?.value || 0;
  if (parseInt(metaPurchases) > 0) ad04Sold = true;

  if (ad04Sold) {
    const msg = `🎉 *DECISÃO 20H - AD 04 VENDEU!* 🎉\n\nO anúncio Ad 04 converteu uma venda nos EUA!\nEle permanecerá ATIVO junto com o Ad 03 para a noite americana.`;
    console.log(msg);
    await sendWhatsApp(msg);
  } else {
    // PAUSE AD 04
    console.log(`Pausando Ad 04 (${ad04Id}). Gasto hoje: R$ ${spend} com 0 vendas.`);
    const pRes = await fetch(`https://graph.facebook.com/v21.0/${ad04Id}?status=PAUSED&access_token=${fbToken}`, {
      method: 'POST'
    });
    const pData = await pRes.json();
    console.log('Pause result:', pData);

    const msg = `🛑 *DECISÃO DAS 20H EXECUTADA* 🛑\n\nO *Ad 04 (Cardboard Workshop)* atingiu a deadline das 20h sem vendas (Gasto hoje: R$ ${spend} | Acumulado no mês: R$ 380+ com 0 vendas).\n\n✅ *Ação:* Ad 04 foi **PAUSADO**.\n🏆 *Foco Total:* 100% da verba agora está concentrada exclusivamente no **Ad 03 (Parent & Child Weekend - Campeão de Vendas)** para a noite dos EUA!`;
    console.log(msg);
    await sendWhatsApp(msg);
  }
}

if (require.main === module) {
  evaluate().catch(console.error);
}

module.exports = { evaluate };
