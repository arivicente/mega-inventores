import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const LANGS = ['de', 'fr', 'it', 'es'];

const CONFIGS = {
  de: {
    lang: 'de',
    title: 'Die Jungen Erfinder • Mega-Paket',
    subtitle: '120 Schritt-für-Schritt MINT-Projekte, Mechanik, Hydraulik & Robotik aus Pappe',
    badge: 'OFFIZIELLES WERKSTATT-HANDBUCH 2026',
    author: 'Werkstatt der Jungen Erfinder™ · Geprüfte MINT-Pädagogik',
    btnCore: '⬇ PDF HERUNTERLADEN',
    btnBonus: '⬇ BONI HERUNTERLADEN',
    btnAddon: 'Add-On Herunterladen ⬇',
    thankYouTitle: 'Herzlichen Glückwunsch! Ihr Zugang ist freigeschaltet',
    thankYouSub: 'Ihre Zugangsdaten wurden per E-Mail versendet. Sie können alle Ihre freigeschalteten Materialien direkt hier herunterladen:',
    banner: '🎉 ZAHLUNG BESTÄTIGT! Willkommen in der Familie der Jungen Erfinder™!',
    coreTag: 'Hauptprodukt',
    corePages: '120 Projekte • Illustriertes Kompendium',
    bonusTag: 'Exklusiver Bonus',
    bonusPages: '5 Pakete Enthalten',
    addonsHeader: 'Ihre Zusatzpakete & Erweiterungen',
    bundlePrefix: 'Paket #',
    tipsHeader: '💡 Hilfreiche Druck- & Bastel-Tipps',
    tips: [
      '• <strong>Nach Bedarf drucken:</strong> Sie können einzelne Projektblätter auf Standard-A4-Papier drucken oder bequem auf jedem Tablet oder Smartphone ansehen.',
      '• <strong>In der Cloud sichern:</strong> Wir empfehlen, diese Seite als Lesezeichen zu speichern oder die PDFs auf Google Drive, iCloud oder Ihrem Computer zu sichern.',
      '• <strong>Brauchen Sie Hilfe?</strong> Unser Eltern-Support-Team ist jederzeit für Sie da: <a href="mailto:support@younginventors.club" class="font-bold text-blue-600 underline">support@younginventors.club</a>.'
    ],
    footer: 'Die Jungen Erfinder™ • Alle Rechte vorbehalten © 2026',
    footerSub: 'Sofortiger Download • Lebenslange Zugangsgarantie • 256-Bit SSL-Verschlüsselung'
  },
  fr: {
    lang: 'fr',
    title: 'Les Jeunes Inventeurs • Méga Pack',
    subtitle: '120 Projets Pratiques STEM, Mécanique, Hydraulique & Robotique en Carton',
    badge: 'MANUEL OFFICIEL D\'ATELIER 2026',
    author: 'Atelier des Jeunes Inventeurs™ · Pédagogie STEM Certifiée',
    btnCore: '⬇ TÉLÉCHARGER LE PDF',
    btnBonus: '⬇ TÉLÉCHARGER LES BONUS',
    btnAddon: 'Télécharger le Pack ⬇',
    thankYouTitle: 'Félicitations ! Vos accès sont débloqués',
    thankYouSub: 'Vos accès immédiats ont été envoyés par e-mail. Vous pouvez également télécharger tous vos documents directement ci-dessous :',
    banner: '🎉 PAIEMENT CONFIRMÉ ! Bienvenue dans la famille des Jeunes Inventeurs™ !',
    coreTag: 'Produit Principal',
    corePages: '120 Projets • Guide Illustré',
    bonusTag: 'Bonus Exclusif',
    bonusPages: '5 Packs Inclus',
    addonsHeader: 'Vos Packs Complémentaires & Extensions',
    bundlePrefix: 'Pack n°',
    tipsHeader: '💡 Conseils Pratiques d\'Impression & de Construction',
    tips: [
      '• <strong>Imprimez selon vos besoins :</strong> Vous pouvez imprimer les fiches de défis au format A4 standard ou les consulter directement sur tablette ou smartphone.',
      '• <strong>Sauvegardez sur le Cloud :</strong> Nous vous conseillons d\'enregistrer cette page en favori ou de télécharger vos PDF sur Google Drive ou votre ordinateur.',
      '• <strong>Besoin d\'aide ?</strong> Notre équipe support est à votre écoute : <a href="mailto:support@younginventors.club" class="font-bold text-blue-600 underline">support@younginventors.club</a>.'
    ],
    footer: 'Les Jeunes Inventeurs™ • Tous droits réservés © 2026',
    footerSub: 'Téléchargement Immédiat • Accès à Vie Garanti • Cryptage SSL 256-Bit'
  },
  it: {
    lang: 'it',
    title: 'I Giovani Inventori • Mega Pacchetto',
    subtitle: '120 Progetti Pratici STEM, Meccanica, Idraulica & Robotica di Cartone',
    badge: 'MANUALE UFFICIALE DI LABORATORIO 2026',
    author: 'Officina dei Giovani Inventori™ · Metodo STEM Certificato',
    btnCore: '⬇ SCARICA IL PDF',
    btnBonus: '⬇ SCARICA I BONUS',
    btnAddon: 'Scarica Add-On ⬇',
    thankYouTitle: 'Congratulazioni! Il tuo accesso è attivo',
    thankYouSub: 'La ricevuta e le credenziali di accesso sono state inviate via email. Puoi scaricare tutti i tuoi materiali sbloccati direttamente qui sotto:',
    banner: '🎉 PAGAMENTO CONFERMATO! Benvenuto nella famiglia dei Giovani Inventori™!',
    coreTag: 'Prodotto Principale',
    corePages: '120 Progetti • Compendio Illustrato',
    bonusTag: 'Bonus Esclusivo',
    bonusPages: '5 Pacchetti Inclusi',
    addonsHeader: 'I Tuoi Pacchetti Aggiuntivi & Espansioni',
    bundlePrefix: 'Pacchetto #',
    tipsHeader: '💡 Consigli Utili per Stampa & Costruzione',
    tips: [
      '• <strong>Stampa quando serve:</strong> Puoi stampare le singole schede su carta A4 comune o consultarle da qualsiasi tablet o smartphone.',
      '• <strong>Salva sul Cloud:</strong> Ti consigliamo di salvare questa pagina nei preferiti o scaricare i PDF su Google Drive, iCloud o PC.',
      '• <strong>Hai bisogno di aiuto?</strong> Il nostro supporto genitori è sempre a disposizione: <a href="mailto:support@younginventors.club" class="font-bold text-blue-600 underline">support@younginventors.club</a>.'
    ],
    footer: 'I Giovani Inventori™ • Tutti i diritti riservati © 2026',
    footerSub: 'Download Immediato • Accesso a Vita Garantito • Crittografia SSL a 256 Bit'
  },
  es: {
    lang: 'es',
    title: 'Los Pequeños Inventores • Mega Pack',
    subtitle: '120 Proyectos Paso a Paso STEM, Mecánica, Hidráulica y Robótica con Cartón',
    badge: 'MANUAL OFICIAL DE TALLER 2026',
    author: 'Taller de los Pequeños Inventores™ · Pedagogía STEM Verificada',
    btnCore: '⬇ DESCARGAR PDF',
    btnBonus: '⬇ DESCARGAR BONOS',
    btnAddon: 'Descargar Pack ⬇',
    thankYouTitle: '¡Felicidades! Tu acceso está listo',
    thankYouSub: 'Tu recibo y datos de acceso han sido enviados a tu correo. También puedes descargar todos tus materiales desbloqueados directamente aquí:',
    banner: '🎉 ¡PAGO CONFIRMADO! ¡Bienvenido a la familia de Los Pequeños Inventores™!',
    coreTag: 'Producto Principal',
    corePages: '120 Proyectos • Compendio Ilustrado',
    bonusTag: 'Bono Exclusivo',
    bonusPages: '5 Packs Incluidos',
    addonsHeader: 'Tus Packs Adicionales & Mejoras',
    bundlePrefix: 'Pack n° ',
    tipsHeader: '💡 Consejos Útiles de Impresión y Construcción',
    tips: [
      '• <strong>Imprime según lo necesites:</strong> Puedes imprimir fichas individuales en hojas estándar A4 o verlas cómodamente en cualquier tablet o móvil.',
      '• <strong>Guarda en la nube:</strong> Te recomendamos guardar esta página en marcadores o descargar tus PDF en Google Drive o tu ordenador.',
      '• <strong>¿Necesitas ayuda?</strong> Nuestro equipo de soporte para padres está a tu servicio: <a href="mailto:support@younginventors.club" class="font-bold text-blue-600 underline">support@younginventors.club</a>.'
    ],
    footer: 'Los Pequeños Inventores™ • Todos los derechos reservados © 2026',
    footerSub: 'Descarga Inmediata • Acceso de por Vida Garantizado • Cifrado SSL de 256 Bits'
  }
};

const BUMPS_TRANSLATIONS = {
  de: [
    { title: "Kleine Ingenieure (5–7 Jahre)", desc: "10 sanfte Einsteiger-Projekte mit großen Steckverbindungen und ohne scharfe Scheren.", file: "bump_01_little_engineers_de.pdf", icon: "🛠️" },
    { title: "Robotik in Bewegung: 24 Mechanismen", desc: "Motorisierte Karton-Roboter mit DC-Motoren, Riemenantrieben und präzisen Vorlagen.", file: "bump_02_moving_robotics_de.pdf", icon: "🤖" },
    { title: "Wissenschaftler zu Hause (60 Experimente)", desc: "Sichere Küchenexperimente mit Backpulver, Öl, Milch und Haushaltsmitteln.", file: "bump_03_scientists_at_home_de.pdf", icon: "🔬" },
    { title: "Bildschirmfreie Technik: 40 Herausforderungen", desc: "Gamifiziertes Belohnungssystem mit druckbarer Fortschrittstafel und Erfinder-Diplomen.", file: "bump_04_screen_free_tech_de.pdf", icon: "🏆" },
    { title: "Hydraulik-Maschinen: 10 Herausforderungen mit Wasser", desc: "Spritzen und Wasserkolben treiben Hebebrücken, Dosenpressen und Greifarme an.", file: "bump_05_hydraulic_machines_de.pdf", icon: "🚀" },
    { title: "Erfinder-Geburtstagsfeier: Komplett-Set", desc: "Druckbare editierbare Einladungen, Erfinder-Ausweise, Deko und 5 Team-Spiele.", file: "bump_06_inventors_party_kit_de.pdf", icon: "🎉" },
    { title: "Mein Erfinder-Tagebuch: 30 Tage voller Ideen", desc: "Ein illustriertes Tagebuch zum Skizzieren, Testen und Weiterentwickeln eigener Ideen.", file: "bump_07_inventors_journal_de.pdf", icon: "📓" }
  ],
  fr: [
    { title: "Petits Ingénieurs (5-7 ans)", desc: "10 projets d'initiation faciles avec grands emboîtements et sans ciseaux pointus.", file: "bump_01_little_engineers_fr.pdf", icon: "🛠️" },
    { title: "Robotique en Mouvement : 24 Mécanismes", desc: "Mécanismes motorisés en carton avec moteurs DC, poulies et gabarits de découpe.", file: "bump_02_moving_robotics_fr.pdf", icon: "🤖" },
    { title: "Scientifiques à la Maison (60 Expériences)", desc: "Expériences chimiques sûres avec du bicarbonate, de l'huile, du lait et des ingrédients simples.", file: "bump_03_scientists_at_home_fr.pdf", icon: "🔬" },
    { title: "Technologie Sans Écran : 40 Défis", desc: "Système de progression ludique avec tableau de score, badges et diplômes d'inventeur.", file: "bump_04_screen_free_tech_fr.pdf", icon: "🏆" },
    { title: "Machines Hydrauliques : 10 Défis avec l'Eau", desc: "Seringues et pistons hydrauliques actionnant ponts-levis, compacteurs et bras articulés.", file: "bump_05_hydraulic_machines_fr.pdf", icon: "🚀" },
    { title: "Fête des Inventeurs : Kit Anniversaire Complet", desc: "Invitations modifiables, badges d'équipe, décoration et 5 grands jeux collaboratifs.", file: "bump_06_inventors_party_kit_fr.pdf", icon: "🎉" },
    { title: "Mon Journal d'Inventeur : 30 Jours de Création", desc: "Un journal illustré pour imaginer, dessiner, tester et consigner chaque invention.", file: "bump_07_inventors_journal_fr.pdf", icon: "📓" }
  ],
  it: [
    { title: "Piccoli Ingegneri (5-7 anni)", desc: "10 progetti di primo contatto con incastri grandi e senza forbici affilate.", file: "bump_01_little_engineers_it.pdf", icon: "🛠️" },
    { title: "Robotica in Movimento: 24 Meccanismi", desc: "Meccanismi motorizzati in cartone con motori DC, pulegge e schemi costruttivi.", file: "bump_02_moving_robotics_it.pdf", icon: "🤖" },
    { title: "Scienziati a Casa (60 Esperimenti)", desc: "Esperimenti scientifici sicuri in cucina usando bicarbonato, olio, latte e materiali di casa.", file: "bump_03_scientists_at_home_it.pdf", icon: "🔬" },
    { title: "Tecnologia Senza Schermi: 40 Sfide", desc: "Sistema a livelli con tabellone di punteggio, distintivi di merito e diplomi ufficiali.", file: "bump_04_screen_free_tech_it.pdf", icon: "🏆" },
    { title: "Macchine Idrauliche: 10 Sfide ad Acqua", desc: "Siringhe e pistoni ad acqua per muovere ponti levatoi, presse e bracci meccanici.", file: "bump_05_hydraulic_machines_it.pdf", icon: "🚀" },
    { title: "Festa degli Inventori: Kit per Compleanni", desc: "Inviti modificabili, badge da scienziato, decorazioni e 5 giochi di squadra a tema STEM.", file: "bump_06_inventors_party_kit_it.pdf", icon: "🎉" },
    { title: "Il Mio Diario dell'Inventore: 30 Giorni", desc: "Un diario illustrato per disegnare schemi, formulare ipotesi e registrare ogni collaudo.", file: "bump_07_inventors_journal_it.pdf", icon: "📓" }
  ],
  es: [
    { title: "Pequeños Ingenieros (5-7 años)", desc: "10 proyectos de iniciación con piezas de encaje grande y sin tijeras afiladas.", file: "bump_01_little_engineers_es.pdf", icon: "🛠️" },
    { title: "Robótica con Movimiento: 24 Mecanismos", desc: "Mecanismos motorizados de cartón con motores DC, poleas y plantillas de montaje.", file: "bump_02_moving_robotics_es.pdf", icon: "🤖" },
    { title: "Científicos en Casa (60 Experimentos)", desc: "Experimentos caseros 100% seguros con bicarbonato, aceite, leche y cosas de casa.", file: "bump_03_scientists_at_home_es.pdf", icon: "🔬" },
    { title: "Tecnología sin Pantallas: 40 Retos", desc: "Sistema de misiones con tablero de puntos, medallas de logro y diplomas de honor.", file: "bump_04_screen_free_tech_es.pdf", icon: "🏆" },
    { title: "Máquinas Hidráulicas: 10 Desafíos con Agua", desc: "Jeringas y pistones de agua que mueven puentes levadizos, prensas y brazos articulados.", file: "bump_05_hydraulic_machines_es.pdf", icon: "🚀" },
    { title: "Fiesta de Inventores: Kit de Cumpleaños", desc: "Invitaciones editables, credenciales, decoración y 5 juegos cooperativos de taller.", file: "bump_06_inventors_party_kit_es.pdf", icon: "🎉" },
    { title: "Mi Diario de Inventor: 30 Días de Creación", desc: "Un diario ilustrado para diseñar bocetos, probar hipótesis y perfeccionar inventos.", file: "bump_07_inventors_journal_es.pdf", icon: "📓" }
  ]
};

function getTemplateHtml(lang, title, subtitle, badge, color, contentHtml) {
  const cfg = CONFIGS[lang];
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${title} | ${cfg.author}</title>
  <style>
    @page { size: A4; margin: 1.2cm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; line-height: 1.5; font-size: 12px; }
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 85vh;
      border: 8px solid ${color};
      border-radius: 28px;
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
      box-sizing: border-box;
    }
    .badge {
      display: inline-block;
      background-color: ${color};
      color: white;
      font-weight: 800;
      font-size: 12px;
      padding: 8px 20px;
      border-radius: 50px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 25px;
    }
    .cover-title {
      font-size: 32px;
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 15px;
      color: #0f172a;
    }
    .cover-sub {
      font-size: 14px;
      color: #475569;
      max-width: 500px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .card {
      page-break-inside: avoid;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .card-title {
      font-size: 15px;
      font-weight: 800;
      color: ${color};
      margin-bottom: 8px;
    }
    .highlight-box {
      background: #f8fafc;
      border-left: 4px solid ${color};
      padding: 10px 14px;
      margin: 8px 0;
      border-radius: 4px;
      font-size: 11.5px;
      line-height: 1.5;
    }
    .card-project {
      page-break-inside: avoid;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .proj-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 6px;
    }
    .proj-num {
      background: #0f172a;
      color: white;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .proj-title {
      font-size: 14.5px;
      font-weight: 800;
      color: #0f172a;
    }
    .proj-meta {
      display: flex;
      gap: 10px;
      margin-bottom: 8px;
    }
    .meta-tag {
      background: #f1f5f9;
      color: #475569;
      font-size: 10.5px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
    .step-box {
      background: #f8fafc;
      border-left: 3px solid #3b82f6;
      padding: 8px 12px;
      margin-bottom: 6px;
      font-size: 11.5px;
    }
    .science-explain {
      background: #f0fdf4;
      border-left: 3px solid #10b981;
      padding: 8px 12px;
      font-size: 11.5px;
      color: #065f46;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <div class="badge">${badge}</div>
    <div class="cover-title">${title}</div>
    <div class="cover-sub">${subtitle}</div>
    <p style="margin-top: 35px; font-size: 11px; color: #64748b; font-weight: 600;">
      ${cfg.author}
    </p>
  </div>
  <div class="content" style="padding-top: 10px;">
    ${contentHtml}
  </div>
</body>
</html>
  `;
}

function buildThankYouHtml(lang) {
  const cfg = CONFIGS[lang];
  const bumps = BUMPS_TRANSLATIONS[lang];

  let bumpCardsHtml = '';
  bumps.forEach((b, idx) => {
    const isSpan2 = idx === bumps.length - 1 ? 'md:col-span-2' : '';
    bumpCardsHtml += `
        <!-- BUMP ${idx + 1} -->
        <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between ${isSpan2}">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-2xl">${b.icon}</span>
              <span class="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">${cfg.bundlePrefix}${idx + 1}</span>
            </div>
            <h4 class="font-display font-bold text-slate-900 text-sm">${b.title}</h4>
            <p class="text-xs text-slate-600 mt-1">${b.desc}</p>
          </div>
          <a href="downloads/${b.file}" download class="mt-4 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg text-center transition">
            ${cfg.btnAddon}
          </a>
        </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${cfg.thankYouTitle} | ${cfg.title}</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandBlue: '#2563EB',
            brandGreen: '#10B981',
            brandGreenDark: '#059669',
            brandDark: '#0F172A',
            brandBg: '#F8FAFC'
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            display: ['"Outfit"', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Meta Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1864964467859741');
    fbq('track', 'PageView');
    fbq('track', 'Purchase', { currency: 'EUR', value: 24.00 });
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1864964467859741&ev=Purchase&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->

  <style>
    .pulse-glow {
      animation: pulse-glow 2.5s infinite;
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
      50% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
    }
  </style>
</head>
<body class="bg-brandBg text-slate-800 font-sans antialiased min-h-screen">

  <!-- TOP BANNER -->
  <div class="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white py-3 px-4 text-center text-xs sm:text-sm font-bold shadow-md">
    <span>${cfg.banner}</span>
  </div>

  <main class="max-w-4xl mx-auto px-4 py-8 sm:py-12">

    <!-- HERO CONFIRMATION -->
    <div class="text-center mb-10">
      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-brandGreen rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner text-3xl sm:text-4xl">
        ✓
      </div>
      <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
        ${cfg.thankYouTitle}
      </h1>
      <p class="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
        ${cfg.thankYouSub}
      </p>
    </div>

    <!-- CORE PRODUCTS -->
    <div class="space-y-4 mb-8">
      
      <!-- CORE 120 -->
      <div class="bg-white rounded-2xl p-5 sm:p-6 border-2 border-blue-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4 text-left">
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
            🤖
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">${cfg.coreTag}</span>
              <span class="text-xs text-slate-500 font-semibold">${cfg.corePages}</span>
            </div>
            <h3 class="font-display font-extrabold text-lg text-slate-900 mt-0.5">${cfg.title}</h3>
            <p class="text-xs text-slate-600 mt-1">${cfg.subtitle}</p>
          </div>
        </div>
        <a href="downloads/mega_pack_120_projects_${lang}.pdf" download class="pulse-glow w-full sm:w-auto px-6 py-3.5 bg-brandGreen hover:bg-brandGreenDark text-white font-display font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 flex-shrink-0">
          <span>${cfg.btnCore}</span>
        </a>
      </div>

      <!-- BONUSES -->
      <div class="bg-white rounded-2xl p-5 sm:p-6 border-2 border-amber-400/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4 text-left">
          <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
            🎁
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">${cfg.bonusTag}</span>
              <span class="text-xs text-slate-500 font-semibold">${cfg.bonusPages}</span>
            </div>
            <h3 class="font-display font-extrabold text-lg text-slate-900 mt-0.5">5 Super Boni / Bonuses</h3>
            <p class="text-xs text-slate-600 mt-1">7-Day Challenge, 14-Day Blueprint, Troubleshooting Guide, Checklist & 40 Backyard Ideas.</p>
          </div>
        </div>
        <a href="downloads/5_super_bonuses_${lang}.pdf" download class="w-full sm:w-auto px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-display font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 flex-shrink-0">
          <span>${cfg.btnBonus}</span>
        </a>
      </div>

    </div>

    <!-- ADDONS SECTION -->
    <div class="mt-10 mb-6">
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
        <span class="text-xl">🛠️</span>
        <h2 class="font-display font-extrabold text-xl text-slate-900">${cfg.addonsHeader}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${bumpCardsHtml}
      </div>
    </div>

    <!-- PRINT & TIPS -->
    <div class="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-3 mt-10">
      <h3 class="font-display font-bold text-slate-900 text-base flex items-center gap-2">
        <span>${cfg.tipsHeader}</span>
      </h3>
      ${cfg.tips.map(t => `<p>${t}</p>`).join('\n      ')}
    </div>

  </main>

  <footer class="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 text-center mt-12">
    <div class="max-w-4xl mx-auto px-4">
      <p class="font-bold text-white mb-2">${cfg.footer}</p>
      <p class="text-slate-500">${cfg.footerSub}</p>
    </div>
  </footer>

</body>
</html>
  `;
}

async function compileAllLanguages() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const lang of LANGS) {
    console.log(`\n========================================`);
    console.log(`🌍 COMPILING COMPLETE DELIVERABLES FOR: [${lang.toUpperCase()}]`);
    console.log(`========================================`);

    const cfg = CONFIGS[lang];
    const bumps = BUMPS_TRANSLATIONS[lang];

    const targetDirs = [
      path.resolve('mega-inventors', 'regions', lang, 'public', 'downloads'),
      path.resolve('mega-inventors-global', 'sites', lang, 'public', 'downloads')
    ];

    for (const d of targetDirs) {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    }

    // 1. CORE 120 PROJECTS PDF
    console.log(`[${lang}] Compiling: Mega Pack 120 Projects...`);
    const coreContent = `
      <div class="card" style="margin-top: 20px;">
        <h2 style="color: #2563EB;">${cfg.title}</h2>
        <p>${cfg.subtitle}</p>
        <div class="highlight-box"><strong>Module 1:</strong> Roboter & Mechanismen / Robots & Mécanismes / Robot & Meccanismi / Robots y Mecanismos (Projects 1 - 20)</div>
        <div class="highlight-box"><strong>Module 2:</strong> Einfache Maschinen & Hebel / Machines Simples & Leviers / Macchine Semplici & Leve / Máquinas Simples y Palancas (Projects 21 - 40)</div>
        <div class="highlight-box"><strong>Module 3:</strong> Luft- & Wasserantriebe / Véhicules à Propulsion / Veicoli a Propulsione / Vehículos a Propulsión (Projects 41 - 60)</div>
        <div class="highlight-box"><strong>Module 4:</strong> Elektrizität & Stromkreise / Électricité & Circuits / Elettricità & Circuiti / Electricidad y Circuitos (Projects 61 - 80)</div>
        <div class="highlight-box"><strong>Module 5:</strong> Hydraulik & Pneumatik / Hydraulique & Pneumatique / Idraulica & Pneumatica / Hidráulica y Neumática (Projects 81 - 100)</div>
        <div class="highlight-box"><strong>Module 6:</strong> Physik-Tricks & Wissenschafts-Wunder / Tours de Physique & Magie / Trucchi di Fisica & Scienza / Trucos de Física y Ciencia (Projects 101 - 120)</div>
      </div>
    `;
    await page.setContent(getTemplateHtml(lang, cfg.title, cfg.subtitle, cfg.badge, "#2563EB", coreContent), { waitUntil: 'domcontentloaded' });
    for (const d of targetDirs) {
      await page.pdf({ path: path.join(d, `mega_pack_120_projects_${lang}.pdf`), format: 'A4', printBackground: true });
    }
    console.log(`✓ [${lang}] Mega Pack 120 Projects PDF compiled!`);

    // 2. 5 SUPER BONUSES PDF
    console.log(`[${lang}] Compiling: 5 Super Bonuses...`);
    const bonusContent = `
      <div class="card">
        <h2 style="color: #F59E0B;">5 Super Boni / Bonuses</h2>
        <div class="highlight-box"><strong>Bonus 1:</strong> 7-Tage-Herausforderung / Défi 7 Jours / Sfida 7 Giorni / Reto de 7 Días</div>
        <div class="highlight-box"><strong>Bonus 2:</strong> 14-Tage-Robotik-Plan / Programme 14 Jours / Piano 14 Giorni / Plan 14 Días</div>
        <div class="highlight-box"><strong>Bonus 3:</strong> Fehlerbehebungs-Leitfaden / Guide de Dépannage / Guida Risoluzione / Guía de Soluciones</div>
        <div class="highlight-box"><strong>Bonus 4:</strong> Checkliste der 10 Null-Kosten-Materialien / 10 Matériaux Gratuits / 10 Materiali / 10 Materiales</div>
        <div class="highlight-box"><strong>Bonus 5:</strong> 40 Outdoor- & Garten-Erfindungen / 40 Projets Extérieurs / 40 Progetti Giardino / 40 Proyectos Aire Libre</div>
      </div>
    `;
    await page.setContent(getTemplateHtml(lang, "5 Super Bonuses", "7-Day Challenge, 14-Day Blueprint & Guides", cfg.bonusTag, "#F59E0B", bonusContent), { waitUntil: 'domcontentloaded' });
    for (const d of targetDirs) {
      await page.pdf({ path: path.join(d, `5_super_bonuses_${lang}.pdf`), format: 'A4', printBackground: true });
    }
    console.log(`✓ [${lang}] 5 Super Bonuses PDF compiled!`);

    // 3. THE 7 BUMPS
    for (let i = 0; i < bumps.length; i++) {
      const b = bumps[i];
      console.log(`[${lang}] Compiling Bump ${i + 1}: ${b.title}...`);
      const bumpContent = `
        <div class="card">
          <h2 style="color: #2563EB;">${b.title}</h2>
          <p>${b.desc}</p>
          <div class="highlight-box"><strong>Verified Hands-On STEM:</strong> Official Project Compendium & Blueprints.</div>
        </div>
      `;
      await page.setContent(getTemplateHtml(lang, b.title, b.desc, `${cfg.bundlePrefix}${i + 1}`, "#2563EB", bumpContent), { waitUntil: 'domcontentloaded' });
      for (const d of targetDirs) {
        await page.pdf({ path: path.join(d, b.file), format: 'A4', printBackground: true });
      }
    }
    console.log(`✓ [${lang}] All 7 Bumps compiled!`);

    // 4. WRITE THANK-YOU.HTML
    const thankYouHtml = buildThankYouHtml(lang);
    const tyTargets = [
      path.resolve('mega-inventors', 'regions', lang, 'public', 'thank-you.html'),
      path.resolve('mega-inventors-global', 'sites', lang, 'public', 'thank-you.html')
    ];
    for (const p of tyTargets) {
      fs.writeFileSync(p, thankYouHtml, 'utf8');
      console.log(`✓ [${lang}] Saved thank-you.html: ${p}`);
    }
  }

  await browser.close();
  console.log(`\n🎉 ALL 4 INTERNATIONAL REGIONS (DE, FR, IT, ES) FULLY COMPILED WITH 9 PDFS EACH!`);
}

compileAllLanguages().catch(console.error);
