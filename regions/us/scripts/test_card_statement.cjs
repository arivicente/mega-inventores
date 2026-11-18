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
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials'
  });
  const serverDate = res.headers.get('date');
  if (serverDate) {
    const serverMs = new Date(serverDate).getTime();
    clockOffsetSeconds = Math.round((serverMs - Date.now()) / 1000);
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
  return fetch(`${BASE_URL}${target}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      ...sigHeaders
    },
    body: body || undefined
  });
}

async function main() {
  const token = await getAccessToken();

  // Check Card Transactions (extrato do cartão)
  const today = new Date().toISOString().split('T')[0];
  const res = await signedRequest('GET', `/statements/v1/credit-cards?startDate=2026-11-01&endDate=${today}`, token);
  console.log('Status Extrato Cartão:', res.status);
  const data = await res.json();
  console.log('Extrato dos Cartões:');
  if (data.items) {
    data.items.slice(0, 8).forEach(t => {
      console.log(`- [${t.date || t.createdAt}] ${t.merchantName || t.description || 'Transação'}: R$ ${t.amount || t.value} (Cartão: ${t.cardLast4 || t.maskedNumber || 'N/A'}) - Status: ${t.status}`);
    });
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

main().catch(console.error);
