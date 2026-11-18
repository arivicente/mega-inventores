import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const LANGS = ['en', 'de', 'fr', 'it', 'es'];

const DICT = {
  en: {
    heroTitle: "YOUNG INVENTOR'S",
    heroMega: "MEGA PACK",
    heroSub: "120 STEM PROJECTS PASSPORT",
    heroBadge: "OFFICIAL 2026 EDITION",
    heroVideoSeal1: "10 GUIDED VIDEOS",
    heroVideoSeal2: "WATCH & BUILD FLAWLESSLY",

    p1Title: "HYDRAULIC CRANES & PULLEYS",
    p1Sub: "Multiply lifting force with cardboard cylinders & syringes",
    p1Step1: "1. Assemble rigid base arm & reinforcing rings",
    p1Step2: "2. Connect water-filled 10ml hydraulic syringes",
    p1Step3: "3. Calibrate counterweight & test mechanical advantage",

    p2Title: "BIONIC ROBOTIC HAND & DIPLOMA",
    p2Sub: "Pull tendons to grasp objects just like real human anatomy",
    p2CertTitle: "OFFICIAL INVENTOR DIPLOMA",
    p2CertSub: "Awarded for excellence in cardboard engineering & STEM",

    p3Title: "PROPULSION VEHICLES & RACERS",
    p3Sub: "Rubber-band & air-powered racers zooming across the room",
    p3MapTitle: "6-MODULE PROGRESS ROADMAP",
    p3MapSub: "From 20-min beginner builds to complex gear automata",

    p4Title: "ILLUSTRATED SCIENCE THEORY SHEETS",
    p4Sub: "Didactic physics explanations behind every project",
    p4Card1: "PASCAL'S LAW & FLUID PRESSURE",
    p4Card2: "GRAVITY, LEVERS & GEAR RATIOS",

    b1Title: "7-DAY INVENTOR CHALLENGE",
    b1Sub: "One daily guided mission with progress tracker",
    b2Title: "14-DAY HOME ROBOTICS PLAN",
    b2Sub: "Step-by-step construction roadmap by age & skill",
    b3Title: "QUICK TESTING & CALIBRATION GUIDE",
    b3Sub: "What to do if gears jam or levers lose power",
    b4Title: "RECYCLABLES CHECKLIST",
    b4Sub: "Sort boxes, caps & straws before building",
    b5Title: "40 BACKYARD & OUTDOOR INVENTIONS",
    b5Sub: "Air rockets, windmills & safe catapults for the garden",

    sealDays: "30 DAYS",
    sealTop: "100% MONEY BACK",
    sealBottom: "UNCONDITIONAL GUARANTEE"
  },
  de: {
    heroTitle: "DIE JUNGEN ERFINDER",
    heroMega: "MEGA-PAKET",
    heroSub: "120 MINT-PROJEKTE HANDBUCH",
    heroBadge: "OFFIZIELLE WERKSTATT-EDITION 2026",
    heroVideoSeal1: "10 SCHRITT-FÜR-SCHRITT VIDEOS",
    heroVideoSeal2: "ANSCHAUEN & FEHLERFREI BAUEN",

    p1Title: "HYDRAULIK-KRAN & SEILZUG-SYSTEME",
    p1Sub: "Hebekräfte vervielfachen mit Wasserspritzen & Pappe",
    p1Step1: "1. Hauptarm und Verstärkungsringe zuschneiden",
    p1Step2: "2. Wassergefüllte 10ml Druckspritzen anschließen",
    p1Step3: "3. Gegengewicht austarieren & Hebekraft testen",

    p2Title: "BIONISCHE ROBOTERHAND & ERFINDER-DIPLOM",
    p2Sub: "Sehnen ziehen und Gegenstände greifen wie eine echte Hand",
    p2CertTitle: "OFFIZIELLES ERFINDER-DIPLOM",
    p2CertSub: "Auszeichnung für herausragende Leistungen in MINT",

    p3Title: "ANTRIEBS-FAHRZEUGE & FLITZER",
    p3Sub: "Gummi- und luftgetriebene Rennwagen ohne teure Batterien",
    p3MapTitle: "6-MODULE ERFINDER-FAHRPLAN",
    p3MapSub: "Von 20-Minuten-Startern bis zu Getriebemechanismen",

    p4Title: "DIDAKTISCHE WISSENSCHAFTS-BLÄTTER",
    p4Sub: "Verständliche Physik-Erklärungen hinter jedem Bauplan",
    p4Card1: "PASCALSCHES GESETZ & FLÜSSIGKEITSDRUCK",
    p4Card2: "SCHWERKRAFT, HEBEL & ZAHNRADÜBERSETZUNG",

    b1Title: "7-TAGE ERFINDER-CHALLENGE",
    b1Sub: "Tägliche Mission mit Fortschrittstabelle",
    b2Title: "14-TAGE HEIM-ROBOTIK-PLAN",
    b2Sub: "Schritt-für-Schritt Bauplan nach Alter & Schwierigkeit",
    b3Title: "SCHNELL-LEITFADEN FÜR TESTS & JUSTIERUNG",
    b3Sub: "Fehlerbehebung bei blockierten Rädern & Hebeln",
    b4Title: "CHECKLISTE FÜR RECYCLING-MATERIALIEN",
    b4Sub: "Kartons, Deckel & Strohhalme griffbereit vorbereiten",
    b5Title: "40 OUTDOOR- & GARTEN-ERFINDUNGEN",
    b5Sub: "Luftdruck-Raketen, Windräder & Katapulte für den Garten",

    sealDays: "30 TAGE",
    sealTop: "100% GELD-ZURÜCK",
    sealBottom: "BEDINGUNGSLOSE GARANTIE"
  },
  fr: {
    heroTitle: "LES JEUNES INVENTEURS",
    heroMega: "MÉGA PACK",
    heroSub: "120 PROJETS STEM PAS À PAS",
    heroBadge: "ÉDITION OFFICIELLE D'ATELIER 2026",
    heroVideoSeal1: "10 VIDÉOS GUIDÉES",
    heroVideoSeal2: "REGARDEZ & MONTEZ SANS ERREUR",

    p1Title: "GRUES HYDRAULIQUES & POULIES",
    p1Sub: "Démultiplier la force de levage avec seringues & carton",
    p1Step1: "1. Découpez le mât et renforcez l'axe pivot",
    p1Step2: "2. Raccordez les seringues 10ml remplies d'eau",
    p1Step3: "3. Ajustez le contrepoids et testez le levage",

    p2Title: "MAIN ROBOTIQUE BIONIQUE & DIPLÔME",
    p2Sub: "Actionnez les tendons pour attraper des objets comme une vraie main",
    p2CertTitle: "DIPLÔME OFFICIEL D'INVENTEUR",
    p2CertSub: "Décerné pour l'excellence en ingénierie carton & STEM",

    p3Title: "VÉHICULES À PROPULSION & BOLIDES",
    p3Sub: "Voitures propulsées par élastiques et air comprimé",
    p3MapTitle: "CARTE DE PROGRESSION EN 6 MODULES",
    p3MapSub: "Des défis de 20 minutes aux engrenages complexes",

    p4Title: "FICHES DIDACTIQUES DES PRINCIPES SCIENTIFIQUES",
    p4Sub: "La science expliquée simplement derrière chaque projet",
    p4Card1: "PRINCIPE DE PASCAL & PRESSION DES FLUIDES",
    p4Card2: "GRAVITÉ, LEVIERS & ENGRENAGES",

    b1Title: "DÉFI 7 JOURS D'INVENTION",
    b1Sub: "Un projet guidé par jour avec fiche de suivi",
    b2Title: "PLAN 14 JOURS DE ROBOTIQUE MAISON",
    b2Sub: "Progression par âge et complexité pas à pas",
    b3Title: "GUIDE RAPIDE DE TESTS & RÉGLAGES",
    b3Sub: "Que faire si une roue bloque ou un piston perd sa pression",
    b4Title: "CHECKLIST DES MATÉRIAUX RECYCLÉS",
    b4Sub: "Triez cartons, bouchons & pailles avant de démarrer",
    b5Title: "40 INVENTIONS PLEIN AIR & JARDIN",
    b5Sub: "Fusées à eau, moulins à vent & catapultes de jardin",

    sealDays: "30 JOURS",
    sealTop: "100% SATISFAIT OU",
    sealBottom: "REMBOURSÉ SANS CONDITION"
  },
  it: {
    heroTitle: "I GIOVANI INVENTORI",
    heroMega: "MEGA PACCHETTO",
    heroSub: "120 PROGETTI STEM PASSO DOPO PASSO",
    heroBadge: "EDIZIONE UFFICIALE DI LABORATORIO 2026",
    heroVideoSeal1: "10 VIDEO GUIDATI",
    heroVideoSeal2: "GUARDA E COSTRUISCI SENZA ERRORI",

    p1Title: "GRU IDRAULICHE & SISTEMI A PULEGGIA",
    p1Sub: "Moltiplica la forza di sollevamento con siringhe e cartone",
    p1Step1: "1. Ritaglia il braccio meccanico e rinforza il perno",
    p1Step2: "2. Collega le siringhe da 10ml riempite d'acqua",
    p1Step3: "3. Calibra il contrappeso e collauda il carico",

    p2Title: "MANO BIONICA & DIPLOMA DI INVENTORE",
    p2Sub: "Muovi i tendini per afferrare oggetti reali come una mano umana",
    p2CertTitle: "DIPLOMA UFFICIALE DI INVENTORE",
    p2CertSub: "Conferito per merito scientifico e creatività STEM",

    p3Title: "VEICOLI A PROPULSIONE & BOLIDI",
    p3Sub: "Macchinine a reazione d'aria e trazione a elastico",
    p3MapTitle: "MAPPA DEI 6 MODULI DI APPRENDIMENTO",
    p3MapSub: "Dalle prime costruzioni ai meccanismi ad ingranaggi",

    p4Title: "SCHEDE DIDATTICHE CON LA SCIENZA SPIEGATA",
    p4Sub: "I concetti fisici spiegati in modo chiaro e intuitivo",
    p4Card1: "LEGGE DI PASCAL & PRESSIONE DEI FLUIDI",
    p4Card2: "GRAVITÀ, LEVE & RAPPORTI DI TRASMISSIONE",

    b1Title: "SFIDA 7 GIORNI DI INVENZIONE",
    b1Sub: "Una missione guidata al giorno con tabella dei progressi",
    b2Title: "PIANO 14 GIORNI DI ROBOTICA A CASA",
    b2Sub: "Percorso guidato di montaggio per fascia d'età",
    b3Title: "GUIDA RAPIDA DI TEST & CALIBRAZIONE",
    b3Sub: "Cosa fare se una ruota slitta o il pistone perde forza",
    b4Title: "CHECKLIST DEI MATERIALI DI RECUPERO",
    b4Sub: "Scatole, tappi e stecchini pronti prima di montare",
    b5Title: "40 INVENZIONI ALL'APERTO E IN GIARDINO",
    b5Sub: "Razzi ad aria, mulini a vento e catapulte sicure",

    sealDays: "30 GIORNI",
    sealTop: "100% SODDISFATTI O",
    sealBottom: "RIMBORSATI INCONDIZIONATAMENTE"
  },
  es: {
    heroTitle: "LOS PEQUEÑOS INVENTORES",
    heroMega: "MEGA PACK",
    heroSub: "120 PROYECTOS STEM PASO A PASO",
    heroBadge: "EDICIÓN OFICIAL DE TALLER 2026",
    heroVideoSeal1: "10 VÍDEOS GUIADOS",
    heroVideoSeal2: "MIRA Y CONSTRUYE SIN ERRORES",

    p1Title: "GRÚAS HIDRÁULICAS & POLEAS",
    p1Sub: "Multiplica la fuerza de elevación con jeringas y cartón",
    p1Step1: "1. Recorta el brazo principal y refuerza las uniones",
    p1Step2: "2. Conecta las jeringas de 10ml llenas de agua",
    p1Step3: "3. Calibra el contrapeso y prueba el mecanismo",

    p2Title: "MANO ROBÓTICA BIÓNICA & DIPLOMA",
    p2Sub: "Tira de los tendones para agarrar objetos imitando una mano real",
    p2CertTitle: "DIPLOMA OFICIAL DE INVENTOR",
    p2CertSub: "Otorgado por excelencia en ingeniería con cartón y STEM",

    p3Title: "VEHÍCULOS A PROPULSIÓN & BÓLIDOS",
    p3Sub: "Coches propulsados por aire y gomas elásticas por toda la casa",
    p3MapTitle: "MAPA DE PROGRESO DE 6 MÓDULOS",
    p3MapSub: "Desde proyectos de 20 minutos hasta engranajes avanzados",

    p4Title: "FICHAS DIDÁCTICAS CON LA CIENCIA EXPLICADA",
    p4Sub: "La explicación física sencilla detrás de cada invento",
    p4Card1: "PRINCIPIO DE PASCAL & PRESIÓN DE FLUIDOS",
    p4Card2: "GRAVEDAD, PALANCAS & ENGRANAJES",

    b1Title: "RETO 7 DÍAS DE INVENCIÓN",
    b1Sub: "Un invento guiado al día con hoja de progreso",
    b2Title: "PLAN 14 DÍAS DE ROBÓTICA CASERA",
    b2Sub: "Orden de construcción paso a paso por edad y dificultad",
    b3Title: "GUÍA RÁPIDA DE AJUSTES Y PRUEBAS",
    b3Sub: "Qué hacer si una rueda patina o una palanca pierde fuerza",
    b4Title: "CHECKLIST DE MATERIALES RECICLABLES",
    b4Sub: "Separa cajas, tapones y pajitas antes de empezar",
    b5Title: "40 INVENCIONES AL AIRE LIBRE Y JARDÍN",
    b5Sub: "Cohetes de aire comprimido, molinos de viento y catapultas",

    sealDays: "30 DÍAS",
    sealTop: "100% GARANTÍA TOTAL",
    sealBottom: "DEVOLUCIÓN INCONDICIONAL"
  }
};

// HTML Templates for each graphic:
function getHeroMockup(d) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width: 1000px; height: 750px; background: transparent; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; perspective: 1800px; }
    .wrap { position:relative; width: 920px; height: 680px; display:flex; align-items:center; justify-content:center; }
    .book {
      width: 460px; height: 600px; position:relative; transform-style:preserve-3d;
      transform: rotateY(-20deg) rotateX(10deg) rotateZ(-2deg);
      box-shadow: 30px 40px 70px rgba(15,23,42,0.45);
      border-radius: 16px 26px 26px 16px;
    }
    .cover {
      width: 100%; height:100%;
      background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 40%, #60A5FA 100%);
      border-radius: 16px 26px 26px 16px; padding: 36px 30px; color:white;
      display:flex; flex-direction:column; justify-content:space-between;
      border: 4px solid #BFDBFE; position:relative; overflow:hidden;
    }
    .cover::before {
      content:""; position:absolute; left:0; top:0; bottom:0; width:45px;
      background: linear-gradient(to right, rgba(0,0,0,0.35), transparent);
    }
    .spine {
      position:absolute; left:0; top:0; bottom:0; width:50px; background:#1E3A8A;
      transform: rotateY(-90deg) translateX(-50px); transform-origin:left;
      border-radius:6px 0 0 6px; display:flex; align-items:center; justify-content:center;
      color:#93C5FD; font-weight:900; font-size:16px; writing-mode:vertical-rl; letter-spacing:2px;
    }
    .badge {
      display:inline-block; background:#F59E0B; color:#0F172A; font-size:12px; font-weight:900;
      padding:6px 14px; border-radius:20px; text-transform:uppercase; letter-spacing:1px;
    }
    .author { font-size:20px; font-weight:800; color:#DBEAFE; letter-spacing:1px; margin-top:8px; }
    .mega { font-family:'Outfit',sans-serif; font-size:46px; font-weight:900; line-height:1; color:#FFF; margin-top:4px; text-shadow:0 3px 10px rgba(0,0,0,0.3); }
    .subbox { background:rgba(15,23,42,0.5); border:2px solid rgba(255,255,255,0.3); border-radius:14px; padding:14px 16px; }
    .subtext { font-size:14px; font-weight:800; color:#FDE047; }
    
    /* Big Video Seal (Golden/Red Circle) */
    .video-seal {
      position:absolute; right: 40px; top: 70px;
      width: 220px; height: 220px; border-radius:50%;
      background: radial-gradient(circle at 30% 30%, #EF4444 0%, #DC2626 60%, #991B1B 100%);
      border: 6px solid #FDE047; box-shadow: 0 15px 35px rgba(220,38,38,0.5);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      text-align:center; padding: 15px; color:white;
      transform: rotate(12deg); z-index:20;
    }
    .video-seal .play-icon { font-size: 38px; margin-bottom: 2px; }
    .video-seal .seal-t1 { font-family:'Outfit',sans-serif; font-size: 16px; font-weight:900; color:#FEF08A; line-height:1.15; }
    .video-seal .seal-t2 { font-size: 10px; font-weight:800; color:#FFFFFF; margin-top:4px; letter-spacing:0.5px; text-transform:uppercase; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="book">
      <div class="spine">120 STEM</div>
      <div class="cover">
        <div>
          <span class="badge">${d.heroBadge}</span>
          <div style="font-size:70px; margin: 8px 0;">🤖</div>
          <div class="author">${d.heroTitle}</div>
          <div class="mega">${d.heroMega}</div>
        </div>
        <div class="subbox">
          <div class="subtext">${d.heroSub}</div>
        </div>
      </div>
    </div>
    <div class="video-seal">
      <div class="play-icon">▶️</div>
      <div class="seal-t1">${d.heroVideoSeal1}</div>
      <div class="seal-t2">${d.heroVideoSeal2}</div>
    </div>
  </div>
</body>
</html>`;
}

function getProject1Card(d) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width: 800px; height: 500px; background: transparent; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; }
    .card {
      width: 760px; height: 460px;
      background: #0F172A;
      background-image: linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px);
      background-size: 20px 20px;
      border: 5px solid #3B82F6; border-radius: 20px;
      padding: 30px; color: white; display:flex; flex-direction:column; justify-content:space-between;
      box-shadow: 0 20px 45px rgba(0,0,0,0.4);
    }
    .head { display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #3B82F6; padding-bottom:12px; }
    .title { font-family:'Outfit',sans-serif; font-size:24px; font-weight:900; color:#60A5FA; }
    .badge { background: #1E3A8A; color: #93C5FD; font-size:11px; font-weight:800; padding:4px 12px; border-radius:6px; border:1px solid #60A5FA; }
    .sub { font-size:13px; color:#CBD5E1; margin: 10px 0; }
    .steps { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
    .step-box { background: rgba(30,58,138,0.35); border:1.5px solid #2563EB; border-radius:10px; padding:14px; font-size:12px; color:#E2E8F0; line-height:1.4; }
    .icon { font-size:30px; margin-bottom:6px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="head">
      <div class="title">🏗️ ${d.p1Title}</div>
      <div class="badge">BLUEPRINT #04</div>
    </div>
    <div class="sub">${d.p1Sub}</div>
    <div class="steps">
      <div class="step-box"><div class="icon">📐</div>${d.p1Step1}</div>
      <div class="step-box"><div class="icon">💧</div>${d.p1Step2}</div>
      <div class="step-box"><div class="icon">⚙️</div>${d.p1Step3}</div>
    </div>
    <div style="font-size:11px; color:#94A3B8; border-top:1px solid rgba(59,130,246,0.3); padding-top:8px;">
      THE YOUNG INVENTOR'S WORKSHOP • 100% HANDS-ON STEM
    </div>
  </div>
</body>
</html>`;
}

function getProject2Card(d) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width: 800px; height: 500px; background: transparent; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; }
    .card {
      width: 760px; height: 460px; background: linear-gradient(135deg, #064E3B 0%, #065F46 60%, #047857 100%);
      border: 5px solid #34D399; border-radius: 20px; padding: 30px; color: white;
      display:flex; flex-direction:column; justify-content:space-between; box-shadow: 0 20px 45px rgba(0,0,0,0.4);
    }
    .cert-box { background: #FEF3C7; border: 3px solid #D97706; border-radius: 12px; padding: 18px; color: #78350F; text-align:center; }
    .cert-title { font-family:'Outfit',sans-serif; font-size: 20px; font-weight:900; color:#92400E; }
    .cert-sub { font-size: 12px; margin-top:4px; font-weight:700; color:#B45309; }
  </style>
</head>
<body>
  <div class="card">
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #34D399; padding-bottom:10px;">
      <div style="font-family:'Outfit',sans-serif; font-size:24px; font-weight:900; color:#A7F3D0;">🦾 ${d.p2Title}</div>
      <div style="font-size:32px;">🎖️</div>
    </div>
    <div style="font-size:14px; color:#D1FAE5; margin:8px 0;">${d.p2Sub}</div>
    <div class="cert-box">
      <div style="font-size:32px; margin-bottom:4px;">📜</div>
      <div class="cert-title">${d.p2CertTitle}</div>
      <div class="cert-sub">${d.p2CertSub}</div>
    </div>
    <div style="font-size:11px; color:#A7F3D0; border-top:1px solid rgba(52,211,153,0.3); padding-top:8px;">
      PROJECT MODULE 01: ROBOTICS & ANATOMICAL MECHANISMS
    </div>
  </div>
</body>
</html>`;
}

function getProject3Card(d) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width: 800px; height: 500px; background: transparent; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; }
    .card {
      width: 760px; height: 460px; background: linear-gradient(135deg, #7C2D12 0%, #9A3412 60%, #C2410C 100%);
      border: 5px solid #FB923C; border-radius: 20px; padding: 30px; color: white;
      display:flex; flex-direction:column; justify-content:space-between; box-shadow: 0 20px 45px rgba(0,0,0,0.4);
    }
    .map-box { background: rgba(0,0,0,0.3); border:2px dashed #FED7AA; border-radius:12px; padding:16px; display:flex; justify-content:space-around; align-items:center; }
  </style>
</head>
<body>
  <div class="card">
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #FB923C; padding-bottom:10px;">
      <div style="font-family:'Outfit',sans-serif; font-size:24px; font-weight:900; color:#FED7AA;">🏎️ ${d.p3Title}</div>
      <div style="font-size:32px;">⚡</div>
    </div>
    <div style="font-size:14px; color:#FFEDD5;">${d.p3Sub}</div>
    <div class="map-box">
      <div style="text-align:center;"><div style="font-size:28px;">🚗</div><div style="font-size:12px; font-weight:800; margin-top:4px;">PROPULSION</div></div>
      <div style="font-size:20px; color:#FED7AA;">➔</div>
      <div style="text-align:center;"><div style="font-size:28px;">⚙️</div><div style="font-size:12px; font-weight:800; margin-top:4px;">GEAR BOX</div></div>
      <div style="font-size:20px; color:#FED7AA;">➔</div>
      <div style="text-align:center;"><div style="font-size:28px;">🏆</div><div style="font-size:12px; font-weight:800; margin-top:4px;">MASTER</div></div>
    </div>
    <div style="font-size:11px; color:#FED7AA; border-top:1px solid rgba(251,146,60,0.3); padding-top:8px;">
      ${d.p3MapTitle} • ${d.p3MapSub}
    </div>
  </div>
</body>
</html>`;
}

function getProject4Card(d) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width: 800px; height: 500px; background: transparent; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; }
    .card {
      width: 760px; height: 460px; background: linear-gradient(135deg, #312E81 0%, #3730A3 60%, #4F46E5 100%);
      border: 5px solid #818CF8; border-radius: 20px; padding: 30px; color: white;
      display:flex; flex-direction:column; justify-content:space-between; box-shadow: 0 20px 45px rgba(0,0,0,0.4);
    }
    .two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .card-sheet { background: white; border-radius:12px; padding:16px; color:#1E1B4B; }
  </style>
</head>
<body>
  <div class="card">
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #818CF8; padding-bottom:10px;">
      <div style="font-family:'Outfit',sans-serif; font-size:24px; font-weight:900; color:#C7D2FE;">📐 ${d.p4Title}</div>
      <div style="font-size:32px;">🔬</div>
    </div>
    <div style="font-size:14px; color:#E0E7FF;">${d.p4Sub}</div>
    <div class="two-col">
      <div class="card-sheet">
        <div style="font-size:11px; font-weight:900; color:#4338CA;">THEORY SHEET #01</div>
        <div style="font-size:14px; font-weight:800; margin-top:4px;">${d.p4Card1}</div>
      </div>
      <div class="card-sheet">
        <div style="font-size:11px; font-weight:900; color:#4338CA;">THEORY SHEET #02</div>
        <div style="font-size:14px; font-weight:800; margin-top:4px;">${d.p4Card2}</div>
      </div>
    </div>
    <div style="font-size:11px; color:#C7D2FE; border-top:1px solid rgba(129,140,248,0.3); padding-top:8px;">
      CHILD-FRIENDLY PHYSICS & ENGINEERING PRINCIPLES
    </div>
  </div>
</body>
</html>`;
}

function getBonusCover(bonusNum, title, sub, colorGrad, borderColor) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width: 350px; height: 480px; background: transparent; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; }
    .book {
      width: 320px; height: 440px; background: ${colorGrad}; border: 4px solid ${borderColor};
      border-radius: 12px 20px 20px 12px; padding: 24px; color:white; display:flex; flex-direction:column; justify-content:space-between;
      box-shadow: 15px 25px 45px rgba(0,0,0,0.35); position:relative; overflow:hidden;
    }
    .book::before { content:""; position:absolute; left:0; top:0; bottom:0; width:28px; background:linear-gradient(to right, rgba(0,0,0,0.35), transparent); }
    .tag { font-size:11px; font-weight:900; background:#F59E0B; color:#0F172A; padding:4px 10px; border-radius:12px; display:inline-block; }
    .title { font-family:'Outfit',sans-serif; font-size:22px; font-weight:900; line-height:1.2; margin-top:10px; }
    .sub { font-size:12px; color:rgba(255,255,255,0.85); line-height:1.4; margin-top:6px; }
  </style>
</head>
<body>
  <div class="book">
    <div>
      <span class="tag">SUPER BONUS #${bonusNum}</span>
      <div style="font-size:50px; margin: 12px 0;">🎁</div>
      <div class="title">${title}</div>
      <div class="sub">${sub}</div>
    </div>
    <div style="font-size:11px; font-weight:800; color:#FDE047; border-top:1px solid rgba(255,255,255,0.25); padding-top:8px;">
      100% FREE WITH MEGA PACK
    </div>
  </div>
</body>
</html>`;
}

function getGuaranteeSeal(d) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@800;900&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width: 380px; height: 380px; background: transparent; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; }
    .seal {
      width: 340px; height: 340px; border-radius:50%;
      background: radial-gradient(circle at 35% 35%, #FDE047 0%, #EAB308 55%, #A16207 100%);
      border: 8px solid #FEF08A; box-shadow: 0 16px 36px rgba(161,98,7,0.45);
      display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:15px;
    }
    .ring { width:290px; height:290px; border-radius:50%; border:3px dashed #713F12; display:flex; flex-direction:column; align-items:center; justify-content:center; }
    .top { font-size:13px; font-weight:900; color:#713F12; letter-spacing:1px; }
    .days { font-family:'Outfit',sans-serif; font-size:54px; font-weight:900; color:#422006; margin:4px 0; line-height:1; }
    .bot { font-size:14px; font-weight:900; color:#713F12; letter-spacing:1px; }
  </style>
</head>
<body>
  <div class="seal">
    <div class="ring">
      <div class="top">${d.sealTop}</div>
      <div class="days">${d.sealDays}</div>
      <div class="bot">${d.sealBottom}</div>
      <div style="font-size:18px; color:#854D0E; margin-top:4px;">★★★★★</div>
    </div>
  </div>
</body>
</html>`;
}

async function renderAll() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const lang of LANGS) {
    const d = DICT[lang];
    const page = await browser.newPage();

    const targetDirs = [
      path.resolve(`c:/Users/Star/Documents/espionagem1/mega-inventors/regions/${lang}/public/assets`),
      lang === 'en' ? path.resolve(`c:/Users/Star/Documents/espionagem1/mega-inventors-us/public/assets`) : null
    ].filter(Boolean);

    targetDirs.forEach(dir => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    console.log(`\n========================================`);
    console.log(`🎨 Rendering all 11 images for [${lang.toUpperCase()}]`);
    console.log(`========================================`);

    async function capture(html, filename, width, height) {
      await page.setViewport({ width, height, deviceScaleFactor: 2 });
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));
      const buf = await page.screenshot({ type: 'png', omitBackground: true });
      targetDirs.forEach(dir => {
        fs.writeFileSync(path.join(dir, filename), buf);
      });
      console.log(`✓ [${lang}] ${filename} generated`);
    }

    // 1. Hero Mockup
    await capture(getHeroMockup(d), 'mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png', 1000, 750);

    // 2. Project 1 - Crane Blueprints
    await capture(getProject1Card(d), 'duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png', 800, 500);

    // 3. Project 2 - Robotic Hand & Diploma
    await capture(getProject2Card(d), 'dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png', 800, 500);

    // 4. Project 3 - Electric Car & Map
    await capture(getProject3Card(d), 'mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png', 800, 500);

    // 5. Project 4 - Illustrated Science Sheets
    await capture(getProject4Card(d), 'duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png', 800, 500);

    // 6. Bonus 1 Cover
    await capture(getBonusCover(1, d.b1Title, d.b1Sub, 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)', '#60A5FA'), 'composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png', 350, 480);

    // 7. Bonus 2 Cover
    await capture(getBonusCover(2, d.b2Title, d.b2Sub, 'linear-gradient(135deg, #065F46 0%, #10B981 100%)', '#34D399'), 'plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png', 350, 480);

    // 8. Bonus 3 Cover
    await capture(getBonusCover(3, d.b3Title, d.b3Sub, 'linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)', '#FB923C'), 'bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png', 350, 480);

    // 9. Bonus 4 Cover
    await capture(getBonusCover(4, d.b4Title, d.b4Sub, 'linear-gradient(135deg, #581C87 0%, #8B5CF6 100%)', '#A78BFA'), 'bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png', 350, 480);

    // 10. Bonus 5 Cover
    await capture(getBonusCover(5, d.b5Title, d.b5Sub, 'linear-gradient(135deg, #831843 0%, #EC4899 100%)', '#F472B6'), 'bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png', 350, 480);

    // 11. Guarantee Seal
    await capture(getGuaranteeSeal(d), 'garantia-YrDNbk5xkXtbRqee.png', 380, 380);

    await page.close();
  }

  await browser.close();
  console.log('\n🎉 ALL 11 IMAGES FOR ALL 5 LANGUAGES GENERATED PERFECTLY!');
}

renderAll().catch(console.error);
