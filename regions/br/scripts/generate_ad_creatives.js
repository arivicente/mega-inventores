import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const puppeteer = require('../../kit-pastoral/node_modules/puppeteer');

const adsDir = path.resolve('mega-inventores', 'public', 'anuncios');
if (!fs.existsSync(adsDir)) {
  fs.mkdirSync(adsDir, { recursive: true });
}

const ADS_CONFIG = [
  {
    id: "ad_01_apaga_celular",
    tag: "ÂNGULO DA DOR & SUBSTITUIÇÃO",
    hook: "«Larga esse celular!»",
    subhook: "Quantas vezes você repetiu isso hoje? Até que coloquei essa garra mecânica de papelão na mesa...",
    cta: "120 Projetos Práticos Passo a Passo · Deixe as Telas de Lado",
    bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
    accentColor: "#f43f5e",
    highlightBadge: "MÉTODO ANTI-TELAS INFANTIL",
    icon: "📱 ➔ 🦾"
  },
  {
    id: "ad_02_robos_que_se_mexem",
    tag: "QUEBRA DE OBJEÇÃO: NÃO É SÓ PDF",
    hook: "Eles andam, giram e agarram de verdade!",
    subhook: "Não compre mais um PDF esquecido. São 120 engenhocas com passo a passo ilustrado e vídeos práticos.",
    cta: "De R$ 97 por R$ 37 · Acesso Imediato Vitalício",
    bgGradient: "linear-gradient(135deg, #042f2e 0%, #022c22 100%)",
    accentColor: "#10b981",
    highlightBadge: "ROBÓTICA CASEIRA COM RECICLÁVEIS",
    icon: "⚙️ 🤖 🏎️"
  },
  {
    id: "ad_03_tardes_em_familia",
    tag: "CONEXÃO & MEMÓRIA AFETIVA",
    hook: "Você não está comprando projetos...",
    subhook: "Está comprando as tardes de sábado sem telas com seu filho. Momentos que ele vai lembrar para sempre.",
    cta: "A Oficina do Pequeno Inventor em Casa",
    bgGradient: "linear-gradient(135deg, #451a03 0%, #1c1917 100%)",
    accentColor: "#f59e0b",
    highlightBadge: "CONEXÃO REAL EM FAMÍLIA",
    icon: "👨‍👩‍👧 🛠️ 🏆"
  },
  {
    id: "ad_04_caixa_de_papelao",
    tag: "CUSTO ZERO: RECICLAGEM",
    hook: "Tudo o que você precisa já está no lixo reciclável da sua cozinha.",
    subhook: "Tampinhas, caixas velhas, elásticos e canudos viram guindastes, catapultas e carros turbo.",
    cta: "Economize em brinquedos plásticos caros · Crie em Casa",
    bgGradient: "linear-gradient(135deg, #172554 0%, #0f172a 100%)",
    accentColor: "#3b82f6",
    highlightBadge: "100% MATERIAIS RECICLÁVEIS",
    icon: "📦 ♻️ 💡"
  },
  {
    id: "ad_05_desafio_7_dias",
    tag: "GAMIFICAÇÃO & DESAFIO",
    hook: "Desafio 7 Dias: Do Papelão ao Primeiro Robô Funcional!",
    subhook: "Uma missão por dia com selos, emblemas e diploma oficial de inventor mirim para imprimir.",
    cta: "Inicie o Desafio neste Final de Semana com 61% OFF",
    bgGradient: "linear-gradient(135deg, #3b0764 0%, #0f172a 100%)",
    accentColor: "#a855f7",
    highlightBadge: "SISTEMA GAMIFICADO COM DIPLOMA",
    icon: "🏆 🌟 📜"
  }
];

function createAdHtml(ad) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1350px;
      background: ${ad.bgGradient};
      color: #ffffff;
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 70px 60px;
      position: relative;
      overflow: hidden;
    }
    .badge-top {
      align-self: flex-start;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid ${ad.accentColor};
      color: ${ad.accentColor};
      font-size: 22px;
      font-weight: 800;
      padding: 12px 28px;
      border-radius: 50px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .icon-hero {
      font-size: 80px;
      margin: 30px 0 10px 0;
    }
    .hook-title {
      font-size: 64px;
      font-weight: 900;
      line-height: 1.1;
      color: #ffffff;
      margin-bottom: 24px;
    }
    .subhook-text {
      font-size: 32px;
      font-weight: 500;
      line-height: 1.4;
      color: #cbd5e1;
      margin-bottom: 40px;
    }
    .features-card {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 28px;
      padding: 36px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .feat-item {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 26px;
      font-weight: 700;
      color: #f8fafc;
    }
    .feat-item span.check {
      color: ${ad.accentColor};
      font-size: 30px;
    }
    .cta-button {
      background: ${ad.accentColor};
      color: #ffffff;
      font-size: 34px;
      font-weight: 900;
      padding: 30px 40px;
      border-radius: 24px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .footer-sub {
      text-align: center;
      font-size: 20px;
      color: #94a3b8;
      margin-top: 14px;
    }
  </style>
</head>
<body>
  <div>
    <div class="badge-top">${ad.highlightBadge}</div>
    <div class="icon-hero">${ad.icon}</div>
    <div class="hook-title">${ad.hook}</div>
    <div class="subhook-text">${ad.subhook}</div>
  </div>

  <div class="features-card">
    <div class="feat-item"><span class="check">✓</span> 120 Projetos Passo a Passo (Robôs, Veículos, Guindastes)</div>
    <div class="feat-item"><span class="check">✓</span> Usa Papelão, Tampinhas e Itens que você já tem em casa</div>
    <div class="feat-item"><span class="check">✓</span> Vídeos Curtos Demonstrativos de Cada Invenção</div>
    <div class="feat-item"><span class="check">✓</span> Acesso Imediato Vitalício + 5 Bônus Exclusivos Inclusos</div>
  </div>

  <div>
    <div class="cta-button">🚀 ${ad.cta}</div>
    <div class="footer-sub">Toque em 'Saiba Mais' e garanta o desconto de lançamento</div>
  </div>
</body>
</html>`;
}

async function renderAds() {
  console.log("Iniciando renderizador de criativos Meta Ads (1080x1350)...");
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });

  for (const ad of ADS_CONFIG) {
    console.log(`Renderizando ${ad.id}...`);
    const html = createAdHtml(ad);
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const outPath = path.join(adsDir, `${ad.id}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`✅ Salvo: ${ad.id}.png`);
  }

  await browser.close();
  console.log("🎉 Todos os 5 anúncios de alta resolução foram renderizados em public/anuncios/!");
}

renderAds().catch(err => {
  console.error("Erro ao renderizar anúncios:", err);
  process.exit(1);
});
