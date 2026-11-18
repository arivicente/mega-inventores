import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const LANGS = ['en', 'de', 'fr', 'it', 'es'];

const LOCALES = {
  en: {
    title: "Young Inventor's",
    megaPack: "MEGA PACK",
    subtitle: "120 STEP-BY-STEP STEM PROJECTS",
    badge: "OFFICIAL 2026 WORKSHOP EDITION",
    bonusesText: "+ 5 EXCLUSIVE SUPER BONUSES",
    rating: "★★★★★ Over 14,800 Happy Families",
    bpTitle: "HYDRAULIC CRANE (PROJECT #04)",
    bpMaterials: "MATERIALS: Cardboard, 2x 10ml Syringes, Plastic Tube, Skewer, String",
    bpStep1: "1. Cut the base arm and reinforce the pivot joint with washers.",
    bpStep2: "2. Mount the hydraulic syringe cylinder and connect the water tube.",
    bpStep3: "3. Test the lifting mechanism and calibrate the counterweight balance.",
    bpExpl: "Fluid Pressure Principle (Pascal's Law) multiplies lifting force.",
    sealDays: "30 DAYS",
    sealTop: "100% MONEY BACK",
    sealBottom: "GUARANTEE"
  },
  de: {
    title: "Die Jungen Erfinder",
    megaPack: "MEGA-PAKET",
    subtitle: "120 SCHRITT-FÜR-SCHRITT MINT-PROJEKTE",
    badge: "OFFIZIELLE WERKSTATT-EDITION 2026",
    bonusesText: "+ 5 EXKLUSIVE SUPER-BONI INKLUSIVE",
    rating: "★★★★★ Über 14.800 begeisterte Familien",
    bpTitle: "HYDRAULIK-KRAN (PROJEKT #04)",
    bpMaterials: "MATERIALIEN: Wellpappe, 2x 10ml Spritzen, Schlauch, Holzspieße, Schnur",
    bpStep1: "1. Schneide den Hauptarm zu und verstärke den Drehpunkt mit Pappringen.",
    bpStep2: "2. Setze die Druckspritze ein und verbinde den wassergefüllten Schlauch.",
    bpStep3: "3. Teste den Hubmechanismus und justiere das Gegengewicht aus.",
    bpExpl: "Pascalsches Gesetz: Flüssigkeitsdruck vervielfacht die Hebekraft.",
    sealDays: "30 TAGE",
    sealTop: "GELD-ZURÜCK",
    sealBottom: "100% GARANTIE"
  },
  fr: {
    title: "Les Jeunes Inventeurs",
    megaPack: "MÉGA PACK",
    subtitle: "120 PROJETS STEM PAS À PAS",
    badge: "ÉDITION OFFICIELLE D'ATELIER 2026",
    bonusesText: "+ 5 SUPER BONUS EXCLUSIFS INCLUS",
    rating: "★★★★★ Plus de 14 800 familles conquises",
    bpTitle: "GRUE HYDRAULIQUE (PROJET n°04)",
    bpMaterials: "MATÉRIEL : Carton rigide, 2 seringues 10ml, tuyau souple, piques en bois",
    bpStep1: "1. Découpez le bras principal et renforcez l'axe pivot avec des rondelles.",
    bpStep2: "2. Fixez la seringue d'actionnement et raccordez le tuyau rempli d'eau.",
    bpStep3: "3. Testez le vérin hydraulique et équilibrez le contrepoids.",
    bpExpl: "Principe de Pascal : la pression de l'eau multiplie l'effort de levage.",
    sealDays: "30 JOURS",
    sealTop: "SATISFAIT OU",
    sealBottom: "100% REMBOURSÉ"
  },
  it: {
    title: "I Giovani Inventori",
    megaPack: "MEGA PACCHETTO",
    subtitle: "120 PROGETTI STEM PASSO DOPO PASSO",
    badge: "EDIZIONE UFFICIALE DI LABORATORIO 2026",
    bonusesText: "+ 5 SUPER BONUS ESCLUSIVI INCLUSI",
    rating: "★★★★★ Scelto da oltre 14.800 famiglie",
    bpTitle: "GRU IDRAULICA (PROGETTO #04)",
    bpMaterials: "MATERIALI: Cartone resistente, 2 siringhe da 10ml, tubicino, stecchini",
    bpStep1: "1. Ritaglia il braccio meccanico e rinforza il perno centrale.",
    bpStep2: "2. Alloggia il cilindro idraulico e collega il condotto ad acqua.",
    bpStep3: "3. Collauda il sollevamento carichi e calibra il contrappeso.",
    bpExpl: "Legge di Pascal: la pressione fluida moltiplica la forza di sollevamento.",
    sealDays: "30 GIORNI",
    sealTop: "SODDISFATTI O",
    sealBottom: "100% RIMBORSATI"
  },
  es: {
    title: "Los Pequeños Inventores",
    megaPack: "MEGA PACK",
    subtitle: "120 PROYECTOS STEM PASO A PASO",
    badge: "EDICIÓN OFICIAL DE TALLER 2026",
    bonusesText: "+ 5 SUPER BONOS EXCLUSIVOS INCLUIDOS",
    rating: "★★★★★ Más de 14.800 familias felices",
    bpTitle: "GRÚA HIDRÁULICA (PROYECTO #04)",
    bpMaterials: "MATERIALES: Cartón rígido, 2 jeringas de 10ml, tubo de plástico, palillos",
    bpStep1: "1. Recorta el brazo de elevación y refuerza el eje con arandelas de cartón.",
    bpStep2: "2. Fija el pistón hidráulico y conecta el conducto lleno de agua.",
    bpStep3: "3. Prueba el mecanismo de carga y calibra el contrapeso posterior.",
    bpExpl: "Principio de Pascal: la presión del agua multiplica la fuerza de elevación.",
    sealDays: "30 DÍAS",
    sealTop: "100% GARANTÍA DE",
    sealBottom: "DEVOLUCIÓN"
  }
};

function renderMockupHtml(loc) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width: 1200px;
      height: 900px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
      perspective: 1600px;
    }
    .bundle-wrapper {
      position: relative;
      width: 1050px;
      height: 750px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* Main 3D Book / Binder */
    .book-3d {
      width: 520px;
      height: 680px;
      position: relative;
      transform-style: preserve-3d;
      transform: rotateY(-18deg) rotateX(8deg) rotateZ(-2deg);
      box-shadow: 25px 35px 60px rgba(15, 23, 42, 0.45);
      border-radius: 18px 28px 28px 18px;
    }
    .book-cover {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 45%, #60A5FA 100%);
      border-radius: 18px 28px 28px 18px;
      padding: 40px 35px;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 4px solid #93C5FD;
      position: relative;
      overflow: hidden;
    }
    .book-cover::before {
      content: "";
      position: absolute;
      top: 0; left: 0; bottom: 0; width: 45px;
      background: linear-gradient(to right, rgba(0,0,0,0.35), transparent);
    }
    .book-spine {
      position: absolute;
      left: 0; top: 0; bottom: 0; width: 55px;
      background: #1E3A8A;
      transform: rotateY(-90deg) translateX(-55px);
      transform-origin: left;
      border-radius: 8px 0 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #93C5FD;
      font-weight: 800;
      font-size: 18px;
      writing-mode: vertical-rl;
      letter-spacing: 3px;
    }
    .badge {
      display: inline-block;
      align-self: flex-start;
      background: #FBBF24;
      color: #1E3A8A;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 1.2px;
      padding: 6px 16px;
      border-radius: 30px;
      text-transform: uppercase;
      box-shadow: 0 4px 14px rgba(251, 191, 36, 0.4);
    }
    .robot-icon {
      font-size: 85px;
      margin: 10px 0;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.25));
    }
    .author {
      font-size: 24px;
      font-weight: 800;
      color: #DBEAFE;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .mega-title {
      font-family: 'Outfit', sans-serif;
      font-size: 52px;
      font-weight: 900;
      line-height: 1.05;
      color: #FFFFFF;
      text-shadow: 0 4px 15px rgba(0,0,0,0.3);
      margin-top: 4px;
    }
    .sub-box {
      background: rgba(15, 23, 42, 0.4);
      border: 2px solid rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      padding: 16px 20px;
      backdrop-filter: blur(8px);
    }
    .sub-title {
      font-size: 16px;
      font-weight: 800;
      color: #FDE047;
      letter-spacing: 0.5px;
    }
    .bonuses-pill {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 700;
      color: #E2E8F0;
    }

    /* Floating Bonus Cards */
    .bonus-card {
      position: absolute;
      width: 250px;
      height: 310px;
      background: #FFFFFF;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.28);
      border: 3px solid #E2E8F0;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transform-style: preserve-3d;
    }
    .card-1 {
      right: 40px;
      top: 60px;
      transform: rotateY(-10deg) rotateZ(6deg);
      border-color: #F59E0B;
    }
    .card-2 {
      right: 15px;
      bottom: 70px;
      transform: rotateY(-12deg) rotateZ(-4deg);
      border-color: #10B981;
    }
    .card-badge {
      font-size: 11px;
      font-weight: 900;
      padding: 4px 10px;
      border-radius: 20px;
      display: inline-block;
      align-self: flex-start;
      text-transform: uppercase;
    }
    .badge-gold { background: #FEF3C7; color: #B45309; }
    .badge-green { background: #D1FAE5; color: #047857; }
    .card-title {
      font-size: 20px;
      font-weight: 900;
      color: #0F172A;
      margin-top: 10px;
      line-height: 1.2;
    }
    .card-sub {
      font-size: 13px;
      color: #64748B;
      margin-top: 6px;
      line-height: 1.4;
    }

    /* Floating Ribbon / Seal on Cover */
    .corner-ribbon {
      position: absolute;
      top: 30px;
      right: -35px;
      background: #EF4444;
      color: white;
      font-weight: 900;
      font-size: 12px;
      padding: 6px 40px;
      transform: rotate(45deg);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="bundle-wrapper">
    <div class="book-3d">
      <div class="book-spine">120 PROJ</div>
      <div class="book-cover">
        <div class="corner-ribbon">120+ MINT</div>
        <div>
          <span class="badge">${loc.badge}</span>
          <div class="robot-icon">🤖</div>
          <div class="author">${loc.title}</div>
          <div class="mega-title">${loc.megaPack}</div>
        </div>
        <div class="sub-box">
          <div class="sub-title">${loc.subtitle}</div>
          <div class="bonuses-pill">${loc.bonusesText}</div>
        </div>
      </div>
    </div>

    <!-- Floating Mini Cards -->
    <div class="bonus-card card-1">
      <div>
        <span class="card-badge badge-gold">SUPER BONUS #1</span>
        <div style="font-size:40px; margin:10px 0;">🎖️</div>
        <div class="card-title">Inventor Diplomas</div>
        <div class="card-sub">Printable badges & certificates for completed builds.</div>
      </div>
      <div style="font-size:11px; font-weight:800; color:#F59E0B;">FREE WITH PACK</div>
    </div>

    <div class="bonus-card card-2">
      <div>
        <span class="card-badge badge-green">SUPER BONUS #3</span>
        <div style="font-size:40px; margin:10px 0;">🎬</div>
        <div class="card-title">Video Vault</div>
        <div class="card-sub">Real moving assembly videos for 100% foolproof builds.</div>
      </div>
      <div style="font-size:11px; font-weight:800; color:#10B981;">FREE WITH PACK</div>
    </div>
  </div>
</body>
</html>`;
}

function renderSealHtml(loc) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@800;900&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width: 400px;
      height: 400px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .seal-circle {
      width: 360px;
      height: 360px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #FDE047 0%, #EAB308 50%, #CA8A04 100%);
      box-shadow: 0 20px 40px rgba(202, 138, 4, 0.4), inset 0 2px 6px rgba(255,255,255,0.8);
      border: 8px solid #FEF08A;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      position: relative;
    }
    .inner-ring {
      width: 310px;
      height: 310px;
      border-radius: 50%;
      border: 3px dashed #713F12;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px;
    }
    .seal-top {
      font-size: 14px;
      font-weight: 900;
      color: #713F12;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .seal-days {
      font-family: 'Outfit', sans-serif;
      font-size: 58px;
      font-weight: 900;
      line-height: 1;
      color: #422006;
      text-shadow: 0 2px 4px rgba(255,255,255,0.4);
      margin: 4px 0;
    }
    .seal-bottom {
      font-size: 15px;
      font-weight: 900;
      color: #713F12;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .stars {
      color: #854D0E;
      font-size: 20px;
      margin-top: 4px;
      letter-spacing: 4px;
    }
  </style>
</head>
<body>
  <div class="seal-circle">
    <div class="inner-ring">
      <div class="seal-top">${loc.sealTop}</div>
      <div class="seal-days">${loc.sealDays}</div>
      <div class="seal-bottom">${loc.sealBottom}</div>
      <div class="stars">★★★★★</div>
    </div>
  </div>
</body>
</html>`;
}

function renderBlueprintHtml(loc) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width: 1000px;
      height: 650px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .blueprint-paper {
      width: 940px;
      height: 590px;
      background: #0F172A;
      background-image: 
        linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px);
      background-size: 24px 24px;
      border: 6px solid #3B82F6;
      border-radius: 20px;
      box-shadow: 0 25px 60px rgba(15, 23, 42, 0.5);
      padding: 35px 40px;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .bp-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #3B82F6;
      padding-bottom: 15px;
    }
    .bp-title {
      font-family: 'Outfit', sans-serif;
      font-size: 26px;
      font-weight: 900;
      color: #60A5FA;
      letter-spacing: 1px;
    }
    .bp-stamp {
      background: rgba(59, 130, 246, 0.2);
      border: 1.5px solid #60A5FA;
      color: #93C5FD;
      padding: 4px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }
    .bp-materials {
      background: rgba(30, 58, 138, 0.4);
      border-left: 4px solid #60A5FA;
      padding: 10px 16px;
      border-radius: 0 8px 8px 0;
      font-size: 13px;
      color: #E2E8F0;
      margin: 12px 0;
    }
    .bp-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
      margin: 10px 0;
    }
    .bp-step {
      background: rgba(15, 23, 42, 0.7);
      border: 1.5px solid #1E3A8A;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .bp-step-num {
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      font-weight: 900;
      color: #FBBF24;
      text-transform: uppercase;
    }
    .bp-step-desc {
      font-size: 13px;
      color: #CBD5E1;
      line-height: 1.45;
    }
    .bp-footer {
      border-top: 1px solid rgba(59, 130, 246, 0.4);
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #94A3B8;
    }
  </style>
</head>
<body>
  <div class="blueprint-paper">
    <div class="bp-header">
      <div class="bp-title">${loc.bpTitle}</div>
      <div class="bp-stamp">LEVEL 2 • TIME: 35 MIN</div>
    </div>
    <div class="bp-materials">
      <strong>${loc.bpMaterials}</strong>
    </div>
    <div class="bp-grid">
      <div class="bp-step">
        <div class="bp-step-num">STEP 01</div>
        <div class="bp-step-desc">${loc.bpStep1}</div>
      </div>
      <div class="bp-step">
        <div class="bp-step-num">STEP 02</div>
        <div class="bp-step-desc">${loc.bpStep2}</div>
      </div>
      <div class="bp-step">
        <div class="bp-step-num">STEP 03</div>
        <div class="bp-step-desc">${loc.bpStep3}</div>
      </div>
    </div>
    <div class="bp-footer">
      <div>💡 <strong>STEM Physics:</strong> ${loc.bpExpl}</div>
      <div>SHEET 04/120</div>
    </div>
  </div>
</body>
</html>`;
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const lang of LANGS) {
    const loc = LOCALES[lang];
    const page = await browser.newPage();

    // Target directory:
    const targetDirs = [
      path.resolve(`mega-inventors/regions/${lang}/public/assets`),
      lang === 'en' ? path.resolve(`mega-inventors-us/public/assets`) : null
    ].filter(Boolean);

    targetDirs.forEach(d => {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    });

    console.log(`\nRendering localized images for [${lang}]...`);

    // 1. Mockup
    await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
    await page.setContent(renderMockupHtml(loc), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));
    const mockupBuffer = await page.screenshot({ type: 'png', omitBackground: true });
    for (const d of targetDirs) {
      fs.writeFileSync(path.join(d, `bundle-3d-${lang}.png`), mockupBuffer);
      fs.writeFileSync(path.join(d, `mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png`), mockupBuffer);
    }
    console.log(`✓ [${lang}] bundle-3d-${lang}.png saved`);

    // 2. Guarantee Seal
    await page.setViewport({ width: 400, height: 400, deviceScaleFactor: 2 });
    await page.setContent(renderSealHtml(loc), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));
    const sealBuffer = await page.screenshot({ type: 'png', omitBackground: true });
    for (const d of targetDirs) {
      fs.writeFileSync(path.join(d, `seal-${lang}.png`), sealBuffer);
      fs.writeFileSync(path.join(d, `garantia-YrDNbk5xkXtbRqee.png`), sealBuffer);
    }
    console.log(`✓ [${lang}] seal-${lang}.png saved`);

    // 3. Blueprint Sample
    await page.setViewport({ width: 1000, height: 650, deviceScaleFactor: 2 });
    await page.setContent(renderBlueprintHtml(loc), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));
    const bpBuffer = await page.screenshot({ type: 'png', omitBackground: true });
    for (const d of targetDirs) {
      fs.writeFileSync(path.join(d, `blueprint-${lang}.png`), bpBuffer);
      fs.writeFileSync(path.join(d, `duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png`), bpBuffer);
    }
    console.log(`✓ [${lang}] blueprint-${lang}.png saved`);

    await page.close();
  }

  await browser.close();
  console.log('\n🎉 ALL LOCALIZED IMAGES GENERATED SUCCESSFULLY FOR ALL REGIONS!');
}

run().catch(console.error);
