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

  // 1. Balance
  const resBalance = await signedRequest('GET', '/accounts/v1/balance', token);
  const dataBalance = await resBalance.json();

  // 2. Cards
  const resCards = await signedRequest('GET', '/credit-cards/v1/cards', token);
  const dataCards = await resCards.json();

  // 3. Statements (Extrato bancário dos últimos 7 dias)
  const today = new Date().toISOString().split('T')[0];
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
  const resStatements = await signedRequest('GET', `/statements/v1/banking?startDate=${sevenDaysAgo}&endDate=${today}`, token);
  const dataStatements = await resStatements.json();

  console.log('=== DADOS OFICIAIS CONTA SIMPLES ===');
  console.log('Saldo Disponível:', `R$ ${(dataBalance.amount || 0).toFixed(2)}`);
  console.log('Total de Cartões Cadastrados:', dataCards.items?.length || 0);
  console.log('\nLista de Cartões:');
  (dataCards.items || []).forEach(c => {
    console.log(`- [${c.status}] ${c.name} (${c.maskedNumber}) | Titular: ${c.cardHolderName} | Exp: ${c.formattedExpirationDate} | ID: ${c.id}`);
  });

  console.log('\nExtrato Bancário Recente:');
  if (dataStatements.items && dataStatements.items.length > 0) {
    dataStatements.items.forEach(st => {
      console.log(`- [${st.date}] ${st.description}: R$ ${st.amount} (${st.type})`);
    });
  } else {
    console.log('Nenhuma movimentação bancária no período informado.');
  }
}

main().catch(console.error);
