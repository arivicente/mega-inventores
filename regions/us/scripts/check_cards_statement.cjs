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

  const serverDate = res.headers.get('date');
  if (serverDate) {
    const serverMs = new Date(serverDate).getTime();
    const localMs = Date.now();
    clockOffsetSeconds = Math.round((serverMs - localMs) / 1000);
  }

  const data = await res.json();
  return data.access_token;
}

function signatureHeaders(method, target, body) {
  const queryStart = target.indexOf("?");
  const path = queryStart === -1 ? target : target.slice(0, queryStart);
  const query = queryStart === -1 ? "?" : target.slice(queryStart);

  const components = ['"@method"', '"@path"', '"@query"'];
  const lines = [`"@method": ${method.toUpperCase()}`, `"@path": ${path}`, `"@query": ${query}`];
  const headers = {};

  if (body) {
    headers["Content-Digest"] = `sha-256=:${createHash("sha256").update(body, "utf8").digest("base64")}:`;
    components.push('"content-digest"');
    lines.push(`"content-digest": ${headers["Content-Digest"]}`);
  }

  const created = Math.floor(Date.now() / 1000) + clockOffsetSeconds;
  const nonce = randomUUID();
  const params = `(${components.join(" ")});created=${created};alg="rsa-v1_5-sha256";nonce="${nonce}"`;
  lines.push(`"@signature-params": ${params}`);

  const signature = createSign("RSA-SHA256")
    .update(lines.join("\n"), "utf8")
    .sign(PRIVATE_KEY, "base64");

  headers["Signature-Input"] = `sig=${params}`;
  headers["Signature"] = `sig=:${signature}:`;
  return headers;
}

async function signedRequest(method, target, token, payload) {
  const body = payload === undefined ? "" : JSON.stringify(payload);
  const sigHeaders = signatureHeaders(method, target, body);

  const reqHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    ...sigHeaders
  };

  return fetch(`${BASE_URL}${target}`, {
    method,
    headers: reqHeaders,
    body: body || undefined
  });
}

async function main() {
  const token = await getAccessToken();

  // 1. Cards
  const resCards = await signedRequest('GET', '/credit-cards/v1/cards', token);
  const dataCards = await resCards.json();

  console.log('--- CARTÕES REGISTRADOS ---');
  for (const card of dataCards.items || []) {
    console.log(`Cartão: ${card.alias} | Final: ${card.panLastDigits} | Status: ${card.status} | ID: ${card.id}`);
  }

  // 2. Extrato Geral de Cartão de Crédito (últimos 30 dias)
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
  
  const resStmt = await signedRequest('GET', `/statements/v1/credit-card?startDate=${thirtyDaysAgo}&endDate=${today}&limit=100`, token);
  const dataStmt = await resStmt.json();
  console.log('\n--- TRANSAÇÕES DE CARTÃO NOS ÚLTIMOS 30 DIAS ---');
  if (dataStmt.items && dataStmt.items.length) {
    dataStmt.items.forEach(t => {
      console.log(`- Data: ${t.transactionDate || t.date} | Valor: R$ ${t.amount} | Estabelecimento: ${t.merchantName || t.description} | Cartão Final: ${t.cardPanLastDigits || t.panLastDigits || t.cardId}`);
    });
  } else {
    console.log('Nenhuma transação retornada no endpoint /statements/v1/credit-card.');
    console.log('Resposta bruta:', JSON.stringify(dataStmt));
  }

  // Let's also check each card individually if card details / transactions endpoint exists
  console.log('\n--- VERIFICANDO DETALHES INDIVIDUAIS DOS CARTÕES ---');
  for (const card of dataCards.items || []) {
    const cardDetail = await signedRequest('GET', `/credit-cards/v1/cards/${card.id}`, token);
    const dJson = await cardDetail.json();
    console.log(`Card ${card.alias} (${card.panLastDigits}):`, {
      status: dJson.status,
      type: dJson.type,
      limits: dJson.limits,
      amountSpent: dJson.amountSpent
    });
  }
}

main().catch(console.error);
