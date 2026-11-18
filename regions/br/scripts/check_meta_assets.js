import fetch from 'node-fetch';
import fs from 'fs';

// Read .env
const env = {};
const envLines = fs.readFileSync('mega-inventores/.env', 'utf8').split('\n');
for (const line of envLines) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) env[m[1]] = m[2].trim();
}

const token = env.META_ACCESS_TOKEN;
const actId = env.META_AD_ACCOUNT_ID;

async function checkMetaAssets() {
  console.log("=== VERIFICANDO ATIVOS DA META (PÁGINAS E PIXELS) ===");
  
  // 1. Check Pages
  console.log("\n1. Verificando Páginas acessíveis (/me/accounts):");
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/me/accounts?access_token=${token}`);
    const data = await res.json();
    console.log("Páginas encontradas:", JSON.stringify(data.data, null, 2));
  } catch (e) {
    console.error("Erro páginas:", e.message);
  }

  // 2. Check Pixels on Ad Account
  console.log("\n2. Verificando Pixels / Datasets (/act_.../customconversions e /adspixels):");
  try {
    const resPixels = await fetch(`https://graph.facebook.com/v21.0/${actId}/adspixels?fields=id,name,is_unavailable&access_token=${token}`);
    const dataPixels = await resPixels.json();
    console.log("Pixels encontrados:", JSON.stringify(dataPixels.data, null, 2));
  } catch (e) {
    console.error("Erro pixels:", e.message);
  }

  // 3. Check Datasets
  try {
    const resDatasets = await fetch(`https://graph.facebook.com/v21.0/${actId}/datasets?fields=id,name&access_token=${token}`);
    const dataDatasets = await resDatasets.json();
    console.log("Datasets encontrados:", JSON.stringify(dataDatasets.data, null, 2));
  } catch (e) {
    console.error("Erro datasets:", e.message);
  }

  // 4. Check Business Manager / User details
  try {
    const resMe = await fetch(`https://graph.facebook.com/v21.0/me?fields=id,name&access_token=${token}`);
    const dataMe = await resMe.json();
    console.log("\nUsuário Token:", dataMe);
  } catch (e) {
    console.error("Erro me:", e.message);
  }
}

checkMetaAssets().catch(console.error);
