const { createHash, createSign, randomUUID } = require('node:crypto');
const fs = require('node:fs');

const apiKey = '1a5109ce-79d8-4841-ae1d-aae1a785bd9c';
const apiSecret = '2bfb84f1-d6c1-424c-9c6b-55f6df465a2d';
const PRIVATE_KEY = fs.readFileSync('C:\\Users\\Star\\.gemini\\config\\contasimples_private_key.pem', 'utf8');
const BASE_URL = 'https://api.contasimples.com';
const USER_AGENT = 'meu-app/1.0';

let clockOffsetSeconds = 0;

async function getAccessToken() {
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const res = await fetch('https://api.contasimples.com/oauth/v1/access-token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  const data = await res.json();
  return data.access_token;
}

function signatureHeaders(method, target) {
  const queryStart = target.indexOf("?");
  const path = queryStart === -1 ? target : target.slice(0, queryStart);
  const query = queryStart === -1 ? "?" : target.slice(queryStart);

  const components = ['"@method"', '"@path"', '"@query"'];
  const lines = [`"@method": ${method.toUpperCase()}`, `"@path": ${path}`, `"@query": ${query}`];

  const created = Math.floor(Date.now() / 1000) + clockOffsetSeconds;
  const nonce = randomUUID();
  const params = `(${components.join(" ")});created=${created};alg="rsa-v1_5-sha256";nonce="${nonce}"`;
  lines.push(`"@signature-params": ${params}`);

  const signature = createSign("RSA-SHA256")
    .update(lines.join("\n"), "utf8")
    .sign(PRIVATE_KEY, "base64");

  return {
    "Signature-Input": `sig=${params}`,
    "Signature": `sig=:${signature}:`
  };
}

async function signedRequest(method, target, token) {
  const sigHeaders = signatureHeaders(method, target);
  return fetch(`${BASE_URL}${target}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      ...sigHeaders
    }
  });
}

async function run() {
  const token = await getAccessToken();
  const resCards = await signedRequest('GET', '/credit-cards/v1/cards', token);
  const dataCards = await resCards.json();
  console.log('CARDS RAW [0]:', JSON.stringify(dataCards.items?.[0] || dataCards));

  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
  const resStmt = await signedRequest('GET', `/statements/v1/credit-card?startDate=${thirtyDaysAgo}&endDate=${today}&limit=100`, token);
  const dataStmt = await resStmt.json();
  console.log('TRANSACTIONS COUNT:', (dataStmt.transactions || []).length);
  
  // Map cards
  const cards = dataCards.items || [];
  const txs = dataStmt.transactions || [];

  for (const c of cards) {
    const cardId = c.id;
    const lastDigits = c.maskedNumber ? c.maskedNumber.slice(-4) : (c.alias || '');
    const matchingTxs = txs.filter(t => t.card?.id === cardId || t.card?.maskedNumber?.includes(lastDigits));
    const metaTxs = matchingTxs.filter(t => /FACEBK|META|FACEBOOK/i.test(t.merchant || ''));
    console.log(`\n========================================`);
    console.log(`💳 Cartão: "${c.alias || c.name || 'Sem Nome'}"`);
    console.log(`   Número Mascarado: ${c.maskedNumber}`);
    console.log(`   Status: ${c.status} | Tipo: ${c.type}`);
    console.log(`   ID: ${c.id}`);
    console.log(`   Total Transações (30d): ${matchingTxs.length}`);
    console.log(`   Transações na Meta: ${metaTxs.length} ${metaTxs.length > 0 ? '⚠️ (JÁ USADO NA META)' : '✅ (NUNCA USADO NA META NOS ÚLTIMOS 30 DIAS)'}`);
    if (matchingTxs.length > 0) {
      console.log(`   Histórico de compras deste cartão:`);
      matchingTxs.forEach(t => {
        console.log(`     - ${t.transactionDate?.slice(0,10)} | R$ ${t.amountBrl} | ${t.merchant} [${t.status}]`);
      });
    }
  }
}

run().catch(console.error);
