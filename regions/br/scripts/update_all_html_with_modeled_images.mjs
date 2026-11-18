import fs from 'fs';
import path from 'path';

// Define localized text for sections 4 (Projects) and 5 (Bonuses)
const localizedSections = {
  en: {
    heroMockupAlt: "The Young Inventor's Mega Pack 3D Bundle with Step-by-Step Videos",
    projHeaderTag: "The Ultimate Children's DIY STEM Library",
    projTitle: "What Will Your Little Inventor Build?",
    projSub: "Step-by-step visual blueprints for kids ages 5 to 12. Projects organized by difficulty level.",
    cards: [
      {
        img: "assets/duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png",
        alt: "Cardboard Hydraulic Crane",
        title: "🏗️ Hydraulic Cranes & Pulley Systems",
        desc: "Hands-on discovery of how levers and pulleys multiply force to lift real weight using sticks, string, and cardboard."
      },
      {
        img: "assets/dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png",
        alt: "Bionic Robotic Hand & Official Diploma",
        title: "🦾 Bionic Hand & Articulated Robots",
        desc: "Create flexible tendons that move as you pull the strings, mimicking the real anatomy of a mechanical hand."
      },
      {
        img: "assets/mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png",
        alt: "Propulsion Vehicles & Speed Racers",
        title: "🏎️ Propulsion Vehicles & Speed Racers",
        desc: "Air-powered cars, elastic-tension dragsters, and battery circuits zooming across the room without expensive store kits."
      },
      {
        img: "assets/duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png",
        alt: "Illustrated Educational Science Sheets",
        title: "📐 Illustrated Didactic STEM Science Sheets",
        desc: "Every project explains the real physics behind it playfully: fluid hydraulics, electrical circuits, gravity, and gears."
      }
    ],
    bonusTag: "🎁 FREE GIFTS INCLUDED TODAY",
    bonusTitle: "Get These 5 Exclusive Super Bonuses For Free",
    bonusSub: "When you order the Mega Pack today, you get complimentary lifetime access to this entire bonus suite:",
    bonuses: [
      {
        img: "assets/composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png",
        alt: "7-Day Challenge",
        tag: "Bonus #1",
        title: "7-Day Inventor Challenge",
        desc: "One daily guided mission with a step-by-step tracker and final invention certification."
      },
      {
        img: "assets/plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png",
        alt: "14-Day Robotics",
        tag: "Bonus #2",
        title: "14-Day Home Robotics Plan",
        desc: "Progressive construction roadmap organized by age group and mechanical complexity."
      },
      {
        img: "assets/bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png",
        alt: "Testing Guide",
        tag: "Bonus #3",
        title: "Quick Testing & Calibration Guide",
        desc: "What to do if wheels get stuck, levers slip, or motors lose power. Instant troubleshooting."
      },
      {
        img: "assets/bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png",
        alt: "Recyclables Checklist",
        tag: "Bonus #4",
        title: "Recyclables Gathering Checklist",
        desc: "Illustrated guide to easily collect bottle caps, cardboard boxes, and skewers before starting."
      },
      {
        img: "assets/bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png",
        alt: "Backyard Inventions",
        tag: "Bonus #5",
        title: "40 Outdoor & Backyard Inventions",
        desc: "Compressed-air rockets, wind turbines, and safe catapults engineered for outdoor garden fun."
      }
    ]
  },
  de: {
    heroMockupAlt: "Die Jungen Erfinder Mega-Paket 3D-Bundle mit Schritt-für-Schritt Videos",
    projHeaderTag: "Die Größte MINT-Erfinderbibliothek Für Kinder",
    projTitle: "Was wird Ihr kleiner Erfinder bauen?",
    projSub: "Visuelle Schritt-für-Schritt-Anleitungen für Kinder von 5 bis 12 Jahren. Nach Schwierigkeitsgrad geordnet.",
    cards: [
      {
        img: "assets/duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png",
        alt: "Hydraulikkran aus Karton",
        title: "🏗️ Hydraulik-Kräne & Seilzugsysteme",
        desc: "Praktisches Entdecken, wie Hebel und Rollen Kräfte vervielfachen, um echte Gewichte mit Pappe und Schnüren zu heben."
      },
      {
        img: "assets/dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png",
        alt: "Bionische Hand und Erfinder-Diplom",
        title: "🦾 Bionische Hand & Gelenkroboter",
        desc: "Bauen Sie bewegliche Sehnen, die sich beim Ziehen an Schnüren bewegen und die echte Handanatomie imitieren."
      },
      {
        img: "assets/mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png",
        alt: "Antriebsfahrzeuge und Rennwagen",
        title: "🏎️ Antriebsfahrzeuge & Rennautos",
        desc: "Luftkissen- und Gummiband-Flitzer sowie einfache Batteriekreise, die durchs Wohnzimmer flitzen."
      },
      {
        img: "assets/duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png",
        alt: "Didaktische MINT-Lernkarten",
        title: "📐 MINT-Lernkarten mit verständlicher Physik",
        desc: "Jedes Projekt erklärt die physikalischen Gesetze spielerisch: Hydraulik, Stromkreise, Schwerkraft und Getriebe."
      }
    ],
    bonusTag: "🎁 HEUTE KOSTENLOS ENTHALTEN",
    bonusTitle: "Holen Sie sich diese 5 exklusiven Super-Boni gratis dazu",
    bonusSub: "Beim Kauf des Mega-Pakets erhalten Sie heute uneingeschränkten Zugriff auf alle 5 Boni:",
    bonuses: [
      {
        img: "assets/composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png",
        alt: "7-Tage-Challenge",
        tag: "Bonus #1",
        title: "7-Tage-Erfinder-Challenge",
        desc: "Ein geführtes Projekt pro Tag während einer Woche mit Fortschrittskarte und Abschlussurkunde."
      },
      {
        img: "assets/plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png",
        alt: "14-Tage-Robotik",
        tag: "Bonus #2",
        title: "14-Tage-Heim-Robotik-Fahrplan",
        desc: "Strukturierter Konstruktionsplan exakt sortiert nach Alter und mechanischer Komplexität."
      },
      {
        img: "assets/bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png",
        alt: "Fehlersuche & Tests",
        tag: "Bonus #3",
        title: "Schnellanleitung für Tests & Justierung",
        desc: "Was tun, wenn Räder klemmen oder Hebel nicht greifen. Schnelle Problemlösungen für zu Hause."
      },
      {
        img: "assets/bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png",
        alt: "Material-Checkliste",
        tag: "Bonus #4",
        title: "Recycling-Material-Checkliste",
        desc: "Illustrierte Liste zum Sammeln von Kartons, Flaschendeckeln und Holzspießen vor dem Start."
      },
      {
        img: "assets/bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png",
        alt: "Erfindungen im Freien",
        tag: "Bonus #5",
        title: "40 Erfindungen für Garten & Natur",
        desc: "Druckluft-Raketen, Mini-Windmühlen und sichere Katapulte für riesigen Spielspaß im Freien."
      }
    ]
  },
  fr: {
    heroMockupAlt: "Le Méga Pack du Petit Inventeur 3D avec Vidéos Étape par Étape",
    projHeaderTag: "La Plus Grande Bibliothèque STEM DIY Pour Enfants",
    projTitle: "Que va construire votre petit inventeur ?",
    projSub: "Instructions visuelles étape par étape pour les enfants de 5 à 12 ans. Projets classés par niveau de difficulté.",
    cards: [
      {
        img: "assets/duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png",
        alt: "Grue hydraulique en carton",
        title: "🏗️ Grues Hydrauliques & Systèmes à Poulies",
        desc: "Découvrez par la pratique comment les leviers et poulies multiplient la force pour soulever de vraies charges en carton."
      },
      {
        img: "assets/dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png",
        alt: "Main robotique bionique et diplôme officiel",
        title: "🦾 Main Bionique & Robots Articulés",
        desc: "Créez des tendons articulés qui bougent quand vous tirez sur les fils, reproduisant l'anatomie d'une vraie main."
      },
      {
        img: "assets/mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png",
        alt: "Véhicules à propulsion et bolides",
        title: "🏎️ Véhicules à Propulsion & Bolides",
        desc: "Voitures à propulsion pneumatique, à élastiques et petits circuits à pile qui filent à toute allure dans le salon."
      },
      {
        img: "assets/duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png",
        alt: "Fiches pédagogiques illustrées",
        title: "📐 Fiches Didactiques & Sciences Expliquées",
        desc: "Chaque projet explique simplement le concept physique réel : hydraulique, circuits, gravité et engrenages."
      }
    ],
    bonusTag: "🎁 CADEAUX OFFERTS AUJOURD'HUI",
    bonusTitle: "Recevez gratuitement ces 5 Super Bonus Exclusifs",
    bonusSub: "En commandant le Méga Pack aujourd'hui, vous accédez immédiatement et sans frais à ces 5 cadeaux :",
    bonuses: [
      {
        img: "assets/composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png",
        alt: "Défi 7 Jours",
        tag: "Bonus #1",
        title: "Défi 7 Jours d'Invention",
        desc: "Un projet guidé par jour pendant une semaine avec feuille de suivi et mission finale."
      },
      {
        img: "assets/plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png",
        alt: "Robotique 14 Jours",
        tag: "Bonus #2",
        title: "Plan de Robotique Maison en 14 Jours",
        desc: "Roteiro progressif avec ordre exact de construction selon l'âge et la complexité."
      },
      {
        img: "assets/bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png",
        alt: "Guide de réglages",
        tag: "Bonus #3",
        title: "Guide Rapide de Réglages et Tests",
        desc: "Que faire si une roue se bloque, le levier glisse ou le moteur faiblit. Dépannage minute."
      },
      {
        img: "assets/bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png",
        alt: "Checklist de recyclables",
        tag: "Bonus #4",
        title: "Checklist des Matériaux Recyclables",
        desc: "Guide illustré pour rassembler facilement boîtes en carton, bouchons et pailles avant de débuter."
      },
      {
        img: "assets/bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png",
        alt: "Inventions pour le jardin",
        tag: "Bonus #5",
        title: "40 Inventions pour le Jardin & Plein Air",
        desc: "Fusées à air comprimé, éoliennes et catapultes sécurisées conçues pour s'amuser dehors."
      }
    ]
  },
  it: {
    heroMockupAlt: "Il Mega Pack del Giovane Inventore 3D con Video Passo dopo Passo",
    projHeaderTag: "La Più Grande Raccolta STEM Fai-Da-Te Per Bambini",
    projTitle: "Cosa costruirà il tuo piccolo inventore?",
    projSub: "Istruzioni visive passo dopo passo per bambini dai 5 ai 12 anni. Progetti organizzati per livello di difficoltà.",
    cards: [
      {
        img: "assets/duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png",
        alt: "Gru idraulica in cartone",
        title: "🏗️ Gru Idrauliche & Meccanismi a Carrucola",
        desc: "Scopri con le tue mani come leve e carrucole moltiplicano la forza per sollevare carichi veri con cartone e spago."
      },
      {
        img: "assets/dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png",
        alt: "Mano bionica e diploma ufficiale",
        title: "🦾 Mano Bionica & Robot Articolati",
        desc: "Crea tendini snodabili che si flettono tirando i fili, replicando l'anatomia di una vera mano meccanica."
      },
      {
        img: "assets/mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png",
        alt: "Veicoli a propulsione e macchinine",
        title: "🏎️ Veicoli a Propulsione & Macchinine a Scatto",
        desc: "Auto ad aria, propulsione a elastico e circuiti con piletta che sfrecciano per casa senza kit costosi."
      },
      {
        img: "assets/duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png",
        alt: "Schede didattiche illustrate",
        title: "📐 Schede Didattiche con Scienza Spiegata",
        desc: "Ogni progetto illustra le nozioni fisiche con leggerezza: idraulica, circuiti, gravità e ingranaggi."
      }
    ],
    bonusTag: "🎁 REGALI INCLUSI OGGI",
    bonusTitle: "Ricevi gratuitamente questi 5 Super Bonus Esclusivi",
    bonusSub: "Ordinando il Mega Pack oggi, ottieni l'accesso a vita a questa collezione completa senza costi extra:",
    bonuses: [
      {
        img: "assets/composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png",
        alt: "Sfida 7 Giorni",
        tag: "Bonus #1",
        title: "Sfida 7 Giorni da Inventore",
        desc: "Un progetto guidato al giorno per una settimana con tabella di marcia e certificato finale."
      },
      {
        img: "assets/plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png",
        alt: "Robotica 14 Giorni",
        tag: "Bonus #2",
        title: "Piano di Robotica Domestica in 14 Giorni",
        desc: "Guida graduale ordinata per fasce di età e complessità dei meccanismi."
      },
      {
        img: "assets/bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png",
        alt: "Guida di test",
        tag: "Bonus #3",
        title: "Guida Rapida di Test e Calibrazione",
        desc: "Cosa fare se una ruota si blocca, la leva cede o il motorino perde spinta. Risoluzione immediata."
      },
      {
        img: "assets/bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png",
        alt: "Checklist materiali riciclabili",
        tag: "Bonus #4",
        title: "Checklist dei Materiali Riciclabili",
        desc: "Guida illustrata per raccogliere facilmente scatole di cartone, tappi e cannucce prima di iniziare."
      },
      {
        img: "assets/bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png",
        alt: "Invenzioni da cortile",
        tag: "Bonus #5",
        title: "40 Invenzioni da Giardino & all'Aperto",
        desc: "Razzi ad aria compressa, mulini a vento e catapulte sicure ideate per divertirsi all'aria aperta."
      }
    ]
  },
  es: {
    heroMockupAlt: "El Mega Pack del Pequeño Inventor 3D con Videos Paso a Paso",
    projHeaderTag: "La Mayor Biblioteca DIY Infantil",
    projTitle: "¿Qué construirá tu pequeño inventor?",
    projSub: "Instrucciones visuales paso a paso para niños de 5 a 12 años. Proyectos organizados por nivel de dificultad.",
    cards: [
      {
        img: "assets/duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png",
        alt: "Grúa Hidráulica de Cartón",
        title: "🏗️ Grúas Hidráulicas y Mecanismos con Poleas",
        desc: "Descubre en la práctica cómo palancas y poleas multiplican la fuerza para levantar peso real con cartón y cuerdas."
      },
      {
        img: "assets/dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png",
        alt: "Mano Robótica y Diploma Oficial",
        title: "🦾 Mano Biónica y Robots Articulados",
        desc: "Crea tendones que se mueven al tirar de los hilos, imitando la anatomía de una mano mecánica real."
      },
      {
        img: "assets/mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png",
        alt: "Vehículos a propulsión y coches veloces",
        title: "🏎️ Vehículos a Propulsión y Coches Veloces",
        desc: "Carros a propulsión de aire, elásticos de tensión y circuitos con pilas que corren por la sala sin kits caros."
      },
      {
        img: "assets/duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png",
        alt: "Fichas didácticas ilustradas",
        title: "📐 Fichas Didácticas con la Ciencia Explicada",
        desc: "Cada proyecto enseña el concepto físico real de forma divertida: hidráulica, circuitos, gravedad y engranajes."
      }
    ],
    bonusTag: "🎁 REGALOS INCLUIDOS HOY",
    bonusTitle: "Llévate gratis estos 5 Super Bonos Exclusivos",
    bonusSub: "Al adquirir el Mega Pack hoy, recibes acceso inmediato y de por vida a toda esta colección:",
    bonuses: [
      {
        img: "assets/composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png",
        alt: "Desafío 7 Días",
        tag: "Bono #1",
        title: "Desafío 7 Días de Invención",
        desc: "Un proyecto guiado al día durante una semana con hoja de seguimiento y diploma final."
      },
      {
        img: "assets/plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png",
        alt: "Robótica 14 Días",
        tag: "Bono #2",
        title: "Plan de Robótica Casera en 14 Días",
        desc: "Ruta de construcción con el orden exacto por edad y nivel de complejidad."
      },
      {
        img: "assets/bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png",
        alt: "Guía de ajustes",
        tag: "Bono #3",
        title: "Guía Rápida de Ajustes y Pruebas",
        desc: "Qué hacer si la rueda se atasca, la palanca falla o el motor pierde fuerza. Solución rápida."
      },
      {
        img: "assets/bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png",
        alt: "Checklist de reciclables",
        tag: "Bono #4",
        title: "Checklist de Materiales Reciclables",
        desc: "Lista ilustrada para reunir cajas de cartón, tapas y pajitas antes de empezar."
      },
      {
        img: "assets/bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png",
        alt: "Invenciones en el patio",
        tag: "Bono #5",
        title: "40 Invenciones para el Jardín y al Aire Libre",
        desc: "Cohetes de aire comprimido, molinos de viento y catapultas seguras para jugar en el patio."
      }
    ]
  }
};

function generateSectionsHtml(loc) {
  const cardsHtml = loc.cards.map(c => `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition">
          <img src="${c.img}" alt="${c.alt}" class="w-full h-auto rounded-xl object-cover mb-3">
          <h3 class="font-display font-bold text-slate-900 text-lg">${c.title}</h3>
          <p class="text-xs text-slate-600 mt-1">${c.desc}</p>
        </div>`).join('\n');

  const bonusesHtml = loc.bonuses.map((b, idx) => `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center text-center ${idx === 4 ? 'sm:col-span-2 lg:col-span-2' : ''}">
          <img src="${b.img}" alt="${b.alt}" class="h-32 object-contain mb-3">
          <span class="text-[10px] font-bold text-blue-600 uppercase">${b.tag}</span>
          <h4 class="font-display font-bold text-slate-900 text-sm mt-0.5">${b.title}</h4>
          <p class="text-xs text-slate-600 mt-1">${b.desc}</p>
        </div>`).join('\n');

  return `<!-- O QUE É O MEGA PACK: PROVA VISUAL DOS 120 PROJETOS -->
  <section class="py-12 bg-brandBg border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-10">
        <span class="text-blue-600 font-bold text-xs uppercase tracking-wider">${loc.projHeaderTag}</span>
        <h2 class="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-1">${loc.projTitle}</h2>
        <p class="text-sm text-slate-600 max-w-xl mx-auto mt-2">${loc.projSub}</p>
      </div>

      <!-- Grid com Imagens Reais dos Projetos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
${cardsHtml}
      </div>

    </div>
  </section>

  <!-- 5 SUPER BÔNUS EXCLUSIVOS -->
  <section class="py-12 bg-white border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-8">
        <span class="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">${loc.bonusTag}</span>
        <h2 class="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-2">${loc.bonusTitle}</h2>
        <p class="text-sm text-slate-600 mt-1">${loc.bonusSub}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
${bonusesHtml}
      </div>

    </div>
  </section>
`;
}

const targetSites = [
  { lang: 'en', dir: 'mega-inventors-us' },
  { lang: 'de', dir: 'mega-inventors/regions/de' },
  { lang: 'fr', dir: 'mega-inventors/regions/fr' },
  { lang: 'it', dir: 'mega-inventors/regions/it' },
  { lang: 'es', dir: 'mega-inventors/regions/es' }
];

targetSites.forEach(target => {
  const baseDir = path.join('c:/Users/Star/Documents/espionagem1', target.dir);
  const htmlPath = path.join(baseDir, 'public/index.html');
  const assetsDir = path.join(baseDir, 'public/assets');

  // 1. Ensure copy of mockup to mega-pack-3d...
  const srcMockup = path.join(assetsDir, 'mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png');
  const dstMockup = path.join(assetsDir, 'mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png');
  if (fs.existsSync(srcMockup)) {
    fs.copyFileSync(srcMockup, dstMockup);
    console.log(`[${target.lang}] Synchronized mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png with hero mockup.`);
  }

  let html = fs.readFileSync(htmlPath, 'utf8');

  // 2. Ensure Hero image uses the official transparent mockup with video seal
  html = html.replace(
    /assets\/mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk\.png/g,
    'assets/mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png'
  );

  // 3. Locate where to replace between PEEK INSIDE (or earlier) and COMPARISON TABLE
  const startComment = html.indexOf('<!-- PEEK INSIDE');
  const endComment = html.indexOf('<!-- COMPARISON TABLE');

  if (startComment !== -1 && endComment !== -1) {
    const locHtml = generateSectionsHtml(localizedSections[target.lang]);
    html = html.substring(0, startComment) + locHtml + '\n  ' + html.substring(endComment);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`[${target.lang}] Replaced sections between PEEK INSIDE and COMPARISON TABLE successfully.`);
  } else {
    console.error(`[${target.lang}] Markers not found! startComment: ${startComment}, endComment: ${endComment}`);
  }
});
