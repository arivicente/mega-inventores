const { createHash, createSign, randomUUID } = require('node:crypto');
const fs = require('node:fs');

const metaToken = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';
const actId = 'act_898705452000785';

const csApiKey = '1a5109ce-79d8-4841-ae1d-aae1a785bd9c';
const csApiSecret = '2bfb84f1-d6c1-424c-9c6b-55f6df465a2d';
const csPrivateKey = fs.readFileSync('C:\\Users\\Star\\.gemini\\config\\contasimples_private_key.pem', 'utf8');

async function getCSAccessToken() {
  const auth = Buffer.from(`${csApiKey}:${csApiSecret}`).toString('base64');
  const res = await fetch('https://api.contasimples.com/oauth/v1/access-token', {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials'
  });
  const serverDate = res.headers.get('date');
  const offset = serverDate ? Math.round((new Date(serverDate).getTime() - Date.now()) / 1000) : 0;
  const data = await res.json();
  return { token: data.access_token, offset };
}

function csSignature(method, target, body, offset) {
  const queryStart = target.indexOf('?');
  const path = queryStart === -1 ? target : target.slice(0, queryStart);
  const query = queryStart === -1 ? '?' : target.slice(queryStart);

  const components = ['"@method"', '"@path"', '"@query"'];
  const lines = [`"@method": ${method.toUpperCase()}`, `"@path": ${path}`, `"@query": ${query}`];
  const headers = {};

  if (body) {
    headers['Content-Digest'] = `sha-256=:${createHash('sha256').update(body, 'utf8').digest('base64')}:`;
    components.push('"content-digest"');
    lines.push(`"content-digest": ${headers['Content-Digest']}`);
  }

  const created = Math.floor(Date.now() / 1000) + offset;
  const params = `(${components.join(' ')});created=${created};alg="rsa-v1_5-sha256";nonce="${randomUUID()}"`;
  lines.push(`"@signature-params": ${params}`);

  const sig = createSign('RSA-SHA256').update(lines.join('\n'), 'utf8').sign(csPrivateKey, 'base64');
  headers['Signature-Input'] = `sig=${params}`;
  headers['Signature'] = `sig=:${sig}:`;
  return headers;
}

async function csFetch(method, target, token, offset, body = null) {
  const bodyStr = body ? JSON.stringify(body) : '';
  const sigHeaders = csSignature(method, target, bodyStr, offset);
  const res = await fetch(`https://api.contasimples.com${target}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'meu-app/1.0',
      ...sigHeaders
    },
    body: bodyStr || undefined
  });
  return res.json();
}

async function monitor() {
  console.log('=== MONITORAMENTO FINANCEIRO & TRÁFEGO ===\n');

  // 1. Meta Ads Account Details
  const metaAccRes = await fetch(`https://graph.facebook.com/v21.0/${actId}?fields=name,account_status,amount_spent,balance&access_token=${metaToken}`);
  const metaAcc = await metaAccRes.json();

  // 2. Meta Ads Spend Today
  const metaTodayRes = await fetch(`https://graph.facebook.com/v21.0/${actId}/insights?date_preset=today&fields=spend&access_token=${metaToken}`);
  const metaToday = await metaTodayRes.json();
  const todaySpend = parseFloat(metaToday.data?.[0]?.spend || 0);

  // 3. Conta Simples Balance
  const { token, offset } = await getCSAccessToken();
  const csBalance = await csFetch('GET', '/accounts/v1/balance', token, offset);
  const csCards = await csFetch('GET', '/credit-cards/v1/cards', token, offset);

  console.log('1. META ADS:');
  console.log(`  Conta: ${metaAcc.name} (Status: ${metaAcc.account_status === 1 ? 'ATIVO ✅' : 'ALERTA ⚠️ ' + metaAcc.account_status})`);
  console.log(`  Gasto Hoje: R$ ${todaySpend.toFixed(2)}`);
  console.log(`  Saldo Pendente de Cobrança no Cartão: R$ ${(parseInt(metaAcc.balance || 0)/100).toFixed(2)}`);

  console.log('\n2. CONTA SIMPLES:');
  console.log(`  Saldo Disponível na Conta: R$ ${(csBalance.amount || 0).toFixed(2)}`);
  console.log(`  Cartões Ativos: ${csCards.items?.length || 0}`);

  return {
    metaStatus: metaAcc.account_status,
    todaySpend,
    pendingBalance: parseInt(metaAcc.balance || 0) / 100,
    csBalance: csBalance.amount || 0
  };
}

monitor().catch(console.error);
