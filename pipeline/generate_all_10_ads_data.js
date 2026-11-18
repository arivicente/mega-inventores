const fs = require('fs');
const path = require('path');

const adsScripts = {
  voices: {
    en: 'en-US-ChristopherNeural',
    de: 'de-DE-ConradNeural',
    fr: 'fr-FR-HenriNeural',
    it: 'it-IT-DiegoNeural',
    es: 'es-ES-AlvaroNeural'
  },
  ads: [
    // AD 01 (37.6s)
    {
      id: "01",
      inputFile: "concorrente_video_01.mp4",
      duration: 37.6,
      translations: {
        en: [
          { fala: "Does your child spend hours glued to screens? Trade the tablet for something that brings the spark back to their eyes!", legenda: "TRADE SCREENS FOR REAL CURIOSITY!" },
          { fala: "With The Young Inventor's Mega Pack, they build their first working robot with their own two hands, using simple cardboard and household items.", legenda: "THEY BUILD ROBOTS THAT ACTUALLY WORK!" },
          { fala: "Over one hundred and twenty illustrated projects with step-by-step video guides. They walk, grasp, and move for real!", legenda: "120+ STEP-BY-STEP PROJECTS & VIDEOS" },
          { fala: "Less screen addiction, more focus, problem-solving, and genuine family bonding.", legenda: "LESS SCREENS, DEEPER FOCUS & LOGIC" },
          { fala: "Tap Learn More below and claim instant lifetime access for just twenty-seven dollars with five free bonuses today!", legenda: "TAP LEARN MORE FOR JUST $27 TODAY!" }
        ],
        de: [
          { fala: "Verbringt Ihr Kind stundenlang vor Bildschirmen? Tauschen Sie das Tablet gegen echte Neugier und leuchtende Augen!", legenda: "TAUSCHE BILDSCHIRM GEGEN ECHTE NEUGIER!" },
          { fala: "Mit dem Mega-Paket der Jungen Erfinder bauen Kinder ihren ersten funktionierenden Roboter aus einfacher Pappe und Haushaltsgegenständen.", legenda: "SIE BAUEN ECHTE FUNKTIONIERENDE ROBOTER!" },
          { fala: "Über 120 bebilderte Baupläne mit einfachen Videoanleitungen. Sie greifen, bewegen sich und laufen wirklich!", legenda: "120+ SCHRITT-FÜR-SCHRITT PROJEKTE & VIDEOS" },
          { fala: "Weniger Bildschirmzeit, mehr Konzentration, echtes logisches Denken und wertvolle Familienzeit.", legenda: "WENIGER BILDSCHIRM, MEHR LOGIK & FOKUS" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und sichern Sie sich den lebenslangen Zugang für nur 27 Euro mit 5 Gratis-Boni!", legenda: "JETZT KLICKEN FÜR NUR 27€ INKL. 5 BONI!" }
        ],
        fr: [
          { fala: "Votre enfant passe des heures scotché aux écrans ? Échangez la tablette contre quelque chose qui rallume l'étincelle dans ses yeux !", legenda: "ÉCHANGEZ LES ÉCRANS CONTRE LA VRAIE CURIOSITÉ !" },
          { fala: "Avec le Méga Pack des Jeunes Inventeurs, il fabrique son premier robot articulé de ses propres mains, avec du simple carton.", legenda: "DES ROBOTS QUI BOUGENT VRAIMENT !" },
          { fala: "Plus de cent vingt projets illustrés avec guides vidéo pas à pas. Ils marchent, attrapent et fonctionnent pour de vrai !", legenda: "120+ PROJETS & VIDÉOS ÉTAPE PAR ÉTAPE" },
          { fala: "Moins d'addiction aux écrans, plus de concentration, de logique et de moments inoubliables en famille.", legenda: "MOINS D'ÉCRANS, PLUS DE LOGIQUE & FOCUS" },
          { fala: "Cliquez sur En savoir plus ci-dessous et obtenez un accès immédiat pour seulement 24 euros avec cinq super bonus offerts !", legenda: "CLIQUEZ ICI POUR SEULEMENT 24€ AUJOURD'HUI !" }
        ],
        it: [
          { fala: "Tuo figlio passa ore incollato allo smartphone o al tablet? Sostituisci gli schermi con qualcosa che gli accenda davvero gli occhi!", legenda: "ADDIO SCHERMI, BENVENUTA VERA CURIOSITÀ!" },
          { fala: "Con il Mega Pacchetto dei Giovani Inventori, costruirà il suo primo robot funzionante con le sue mani, usando semplice cartone riciclato.", legenda: "COSTRUISCONO ROBOT CHE FUNZIONANO DAVVERO!" },
          { fala: "Oltre centoventi progetti illustrati con video guide passo dopo passo. Camminano, afferrano e si muovono davvero!", legenda: "120+ PROGETTI E GUIDE VIDEO PASSO-PASSO" },
          { fala: "Meno dipendenza dai videogiochi, più concentrazione, problem solving e vero tempo di qualità in famiglia.", legenda: "PIÙ CONCENTRAZIONE E TEMPO IN FAMIGLIA" },
          { fala: "Clicca su Scopri di più qui sotto e ricevi l'accesso immediato a soli 24 euro con cinque super bonus inclusi!", legenda: "CLICCA QUI PER SOLI 24€ OGGI STESSO!" }
        ],
        es: [
          { fala: "¿Tu hijo pasa horas pegado a las pantallas? ¡Cambia la tableta por algo que devuelva el brillo y la curiosidad a sus ojos!", legenda: "¡CAMBIA PANTALLAS POR CURIOSIDAD REAL!" },
          { fala: "Con el Mega Pack de Los Pequeños Inventores, construirá su primer robot con sus propias manos usando simple cartón y reciclables.", legenda: "¡ROBOTS QUE SE MUEVEN DE VERDAD!" },
          { fala: "Más de ciento veinte proyectos ilustrados con videos paso a paso. ¡Caminan, agarran y funcionan de verdad!", legenda: "MÁS DE 120 PROYECTOS Y VIDEOS PASO A PASO" },
          { fala: "Menos pantallas, más concentración, lógica y momentos inolvidables en familia.", legenda: "MENOS MÓVILES, MÁS LÓGICA Y ENFOQUE" },
          { fala: "Toca Más Información abajo y llévate acceso de por vida por solo 24 euros con cinco bonos gratis hoy.", legenda: "¡TOCA AQUÍ POR SOLO 24€ HOY MISMO!" }
        ]
      }
    },
    // AD 02 (58.9s)
    {
      id: "02",
      inputFile: "concorrente_video_02.mp4",
      duration: 58.9,
      translations: {
        en: [
          { fala: "Thousands of parents agree: kids put their iPads down the exact second this starts!", legenda: "KIDS PUT PHONES DOWN INSTANTLY!" },
          { fala: "Imagine your child swapping hours of screen zombie mode for genuine focus and tactile curiosity.", legenda: "HOURS OF FOCUS INSTEAD OF SCREENS" },
          { fala: "Look at the sheer pride in their eyes when they shout: Look Mom, I built this myself!", legenda: "THE PRIDE OF SAYING: I BUILT THIS!" },
          { fala: "With The Young Inventor's Mega Pack, you get over one hundred and twenty hands-on projects.", legenda: "OVER 120 HANDS-ON PROJECTS" },
          { fala: "Just print, cut, and start inventing with materials you already have around the house.", legenda: "JUST PRINT AND BUILD AT HOME" },
          { fala: "All you need is cardboard, safety scissors, and simple recyclables.", legenda: "USING CARDBOARD & RECYCLABLES" },
          { fala: "They learn real physics, mechanics, and spatial reasoning while having the time of their life!", legenda: "LEARNING REAL PHYSICS & LOGIC" },
          { fala: "Tap Learn More right below and get the complete Mega Pack for just twenty-seven dollars today!", legenda: "TAP LEARN MORE FOR $27 TODAY!" }
        ],
        de: [
          { fala: "Tausende Eltern bestätigen: Kinder legen das Tablet sofort weg, sobald das Basteln beginnt!", legenda: "KINDER LEGEN DAS TABLET SOFORT WEG!" },
          { fala: "Stellen Sie sich vor, Ihr Kind tauscht stundenlange Bildschirmzeit gegen echte Neugier und höchste Konzentration.", legenda: "STUNDENLANGER FOKUS STATT BILDSCHIRM" },
          { fala: "Sehen Sie den Stolz in ihren Augen, wenn sie rufen: Schau mal, das habe ich ganz alleine gebaut!", legenda: "DER STOLZ: DAS HABE ICH GEBAUT!" },
          { fala: "Mit dem Mega-Paket der Jungen Erfinder erhalten Sie über 120 praktische MINT-Projekte.", legenda: "ÜBER 120 PRAKTISCHE MINT-PROJEKTE" },
          { fala: "Einfach ausdrucken, ausschneiden und mit Dingen basteln, die Sie ohnehin zu Hause haben.", legenda: "EINFACH DRUCKEN UND ZU HAUSE BAUEN" },
          { fala: "Sie lernen spielerisch echte Mechanik, Hebelgesetze und räumliches Vorstellungsvermögen.", legenda: "SPIELERISCH ECHTE PHYSIK LERNEN" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und sichern Sie sich den Zugang für nur 27 Euro!", legenda: "JETZT SICHERN FÜR NUR 27€!" }
        ],
        fr: [
          { fala: "Des milliers de parents confirment : les enfants lâchent leur tablette dès la première minute !", legenda: "ILS LÂCHENT LA TABLETTE IMMÉDIATEMENT !" },
          { fala: "Imaginez votre enfant échangeant les jeux vidéo contre deux heures de concentration absolue.", legenda: "DEUX HEURES DE CONCENTRATION TOTALE" },
          { fala: "Regardez la fierté dans ses yeux quand il crie : Regarde maman, c'est moi qui l'ai fait !", legenda: "LA FIERTÉ DE DIRE : JE L'AI FAIT !" },
          { fala: "Avec le Méga Pack des Jeunes Inventeurs, vous recevez plus de 120 défis d'ingénierie.", legenda: "PLUS DE 120 DÉFIS D'INGÉNIERIE" },
          { fala: "Il suffit d'imprimer, découper et assembler avec du simple carton et des ciseaux.", legenda: "IMPRIMEZ ET CRÉEZ À LA MAISON" },
          { fala: "Ils découvrent la vraie physique et développent leur logique tout en s'amusant.", legenda: "DÉVELOPPE LA LOGIQUE ET LA PHYSIQUE" },
          { fala: "Cliquez sur En savoir plus et profitez du pack complet pour seulement 24 euros aujourd'hui !", legenda: "PROFITEZ DU PACK POUR SEULEMENT 24€ !" }
        ],
        it: [
          { fala: "Migliaia di genitori confermano: i bambini lasciano lo smartphone all'istante!", legenda: "METTONO VIA LO SMARTPHONE SUBITO!" },
          { fala: "Immagina tuo figlio che scambia ore di ipnosi da schermo con una concentrazione e creatività pura.", legenda: "MASSIMA CONCENTRAZIONE E CREATIVITÀ" },
          { fala: "Guarda l'orgoglio nei suoi occhi quando grida: Guarda mamma, l'ho costruito tutto da solo!", legenda: "L'ORGOGLIO: L'HO COSTRUITO DA SOLO!" },
          { fala: "Con il Mega Pacchetto dei Giovani Inventori, hai oltre 120 progetti pratici illustrati.", legenda: "OLTRE 120 PROGETTI PRATICI" },
          { fala: "Basta stampare, ritagliare e costruire con materiali di riciclo che hai già a casa.", legenda: "FACILE DA STAMPARE E MONTARE" },
          { fala: "Imparano le basi della meccanica e della fisica divertendosi un mondo.", legenda: "IMPARANO MECCANICA E FISICA REALE" },
          { fala: "Clicca su Scopri di più e scarica il Mega Pacchetto completo per soli 24 euro oggi!", legenda: "CLICCA QUI PER SOLI 24€ OGGI!" }
        ],
        es: [
          { fala: "Miles de padres lo confirman: ¡los niños sueltan el móvil en el segundo en que esto empieza!", legenda: "¡DEJAN LAS PANTALLAS AL INSTANTE!" },
          { fala: "Imagina a tu hijo cambiando horas de pantalla por pura concentración y curiosidad creativa.", legenda: "CONCENTRACIÓN PURA SIN PANTALLAS" },
          { fala: "Mira el orgullo en su mirada cuando grita: ¡Mira mamá, lo he construido yo solito!", legenda: "EL ORGULLO DE DECIR: ¡LO HICE YO!" },
          { fala: "Con el Mega Pack de Los Pequeños Inventores, tienes más de 120 proyectos prácticos.", legenda: "MÁS DE 120 PROYECTOS PRÁCTICOS" },
          { fala: "Solo imprime, recorta y monta con cartón y cosas que ya tienes en casa.", legenda: "FÁCIL DE IMPRIMIR Y MONTAR" },
          { fala: "Aprenderán física, palancas e hidráulica mientras pasan una tarde inolvidable.", legenda: "APRENDEN FÍSICA Y MECÁNICA JUGANDO" },
          { fala: "Toca Más Información y consigue el Mega Pack completo por solo 24 euros hoy.", legenda: "¡CONSIGUE EL PACK POR 24€ HOY!" }
        ]
      }
    },
    // AD 03 (54.9s)
    {
      id: "03",
      inputFile: "concorrente_video_03.mp4",
      duration: 54.9,
      translations: {
        en: [
          { fala: "Never hear 'Mom, I'm bored' again this weekend!", legenda: "NEVER HEAR 'I'M BORED' AGAIN!" },
          { fala: "Turn an empty Amazon box into a family robotics workshop on your kitchen table.", legenda: "TURN CARDBOARD INTO ROBOTS!" },
          { fala: "Instead of mindless gaming, your child learns how levers, hydraulics, and pulleys really work.", legenda: "LEARN HOW MECHANISMS WORK" },
          { fala: "Over one hundred and twenty illustrated step-by-step DIY engineering projects.", legenda: "120+ ILLUSTRATED CHALLENGES" },
          { fala: "No expensive tools, no complicated electronics, zero frustration.", legenda: "NO EXPENSIVE KITS REQUIRED" },
          { fala: "Tap Learn More below and get sixty-two percent off today for only twenty-seven dollars!", legenda: "GET 62% OFF FOR JUST $27 TODAY!" }
        ],
        de: [
          { fala: "Nie wieder 'Mama, mir ist langweilig' am Wochenende hören!", legenda: "NIE WIEDER LANGEWEILE AM WOCHENENDE!" },
          { fala: "Verwandeln Sie einen leeren Versandkarton in eine echte Roboter-Werkstatt am Küchentisch.", legenda: "VERWANDLE PAPPE IN ROBOTER!" },
          { fala: "Statt stumpfsinniger Videospiele lernt Ihr Kind, wie Hebel, Hydraulik und Seilzüge funktionieren.", legenda: "LERNE WIE MECHANIK WIRKLICH FUNKTIONIERT" },
          { fala: "Über 120 bebilderte Schritt-für-Schritt Baupläne für kleine Ingenieure.", legenda: "120+ SCHRITT-FÜR-SCHRITT BAUPLÄNE" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und sichern Sie sich das Mega-Paket für nur 27 Euro!", legenda: "JETZT KLICKEN FÜR NUR 27€!" }
        ],
        fr: [
          { fala: "Ne plus jamais entendre 'Maman, je m'ennuie' ce week-end !", legenda: "FINI LE 'MAMAN JE M'ENNUIE' !" },
          { fala: "Transformez un simple carton d'emballage en atelier de robotique sur la table du salon.", legenda: "TRANSFORMEZ LE CARTON EN ROBOTS !" },
          { fala: "Au lieu des écrans passifs, votre enfant comprend le fonctionnement des engrenages et de l'hydraulique.", legenda: "DÉCOUVREZ L'HYDRAULIQUE ET LES LEVIERS" },
          { fala: "Plus de 120 projets illustrés pas à pas, faciles et sans frustration.", legenda: "120+ PROJETS FACILES ET AMUSANTS" },
          { fala: "Cliquez sur En savoir plus ci-dessous et accédez au Méga Pack pour 24 euros aujourd'hui !", legenda: "CLIQUEZ ICI POUR SEULEMENT 24€ !" }
        ],
        it: [
          { fala: "Mai più sentire 'Mamma, mi annoio' durante il fine settimana!", legenda: "MAI PIÙ 'MI ANNOIO' NEL WEEKEND!" },
          { fala: "Trasforma un comune scatolone di cartone in un laboratorio di robotica sul tavolo di casa.", legenda: "TRASFORMA IL CARTONE IN ROBOT!" },
          { fala: "Invece di fissare uno schermo, tuo figlio scopre come funzionano leve, carrucole e pistoni ad acqua.", legenda: "COME FUNZIONANO LEVE E PISTONI" },
          { fala: "Oltre centoventi progetti educativi illustrati passo dopo passo.", legenda: "120+ SFIDE DI COSTRUZIONE CREATIVA" },
          { fala: "Clicca su Scopri di più e scarica subito l'intero pacchetto a soli 24 euro!", legenda: "ACCEDI ADESSO A SOLI 24€!" }
        ],
        es: [
          { fala: "¡Se acabó escuchar 'Mamá, me aburro' este fin de semana!", legenda: "¡NUNCA MÁS 'ME ABURRO' EN CASA!" },
          { fala: "Convierte una simple caja de cartón en un taller familiar de robótica en tu propia mesa.", legenda: "CONVIERTE CARTÓN EN ROBOTS REALES" },
          { fala: "En lugar de videojuegos, tu hijo aprende cómo funcionan las poleas, la hidráulica y las palancas.", legenda: "APRENDE PALANCAS, POLEAS E HIDRÁULICA" },
          { fala: "Más de 120 planos ilustrados con instrucciones claras paso a paso.", legenda: "MÁS DE 120 PROYECTOS ILUSTRADOS" },
          { fala: "Haz clic en Más Información y consigue el paquete completo por solo 24 euros.", legenda: "¡PÍDELO HOY POR SOLO 24€!" }
        ]
      }
    },
    // AD 04 (43.5s)
    {
      id: "04",
      inputFile: "concorrente_video_04.mp4",
      duration: 43.5,
      translations: {
        en: [
          { fala: "You don't need expensive plastic toys to teach your kids real physics and engineering.", legenda: "REAL ENGINEERING WITHOUT EXPENSIVE TOYS" },
          { fala: "With The Young Inventor's Mega Pack, your child turns everyday cardboard into incredible moving inventions.", legenda: "TURN BOXES INTO MOVING INVENTIONS" },
          { fala: "Over one hundred and twenty blueprints with clear video guides and science breakdowns.", legenda: "120+ BLUEPRINTS & VIDEO GUIDES" },
          { fala: "Builds problem-solving skills, motor coordination, and deep screen-free focus.", legenda: "DEEP FOCUS & MOTOR SKILLS" },
          { fala: "Tap Learn More below and download the complete pack for just twenty-seven dollars today!", legenda: "TAP LEARN MORE FOR JUST $27 TODAY!" }
        ],
        de: [
          { fala: "Sie brauchen kein teures Plastikspielzeug, um Ihren Kindern echte Physik und Mechanik beizubringen.", legenda: "ECHTE TECHNIK OHNE TEURES PLASTIK" },
          { fala: "Mit dem Mega-Paket der Jungen Erfinder verwandelt Ihr Kind Altpapier in faszinierende Maschinen.", legenda: "KARTON WIRD ZU BEWEGLICHEN MASCHINEN" },
          { fala: "Über 120 Baupläne mit Video-Anleitungen und einfachen Erklärungen.", legenda: "120+ BAUPLÄNE MIT VIDEO-GUIDES" },
          { fala: "Fördert logisches Denken, Feinmotorik und langanhaltende Konzentration.", legenda: "FÖRDERT KONZENTRATION & LOGIK" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und laden Sie das Paket für nur 27 Euro herunter!", legenda: "JETZT HERUNTERLADEN FÜR NUR 27€!" }
        ],
        fr: [
          { fala: "Pas besoin de jouets en plastique coûteux pour enseigner la physique et l'ingénierie.", legenda: "L'INGÉNIERIE SANS JOUETS COÛTEUX" },
          { fala: "Avec le Méga Pack des Jeunes Inventeurs, votre enfant transforme du carton en incroyables inventions articulées.", legenda: "DU CARTON EN INVENTIONS QUI BOUGENT" },
          { fala: "Plus de 120 fiches pratiques avec vidéos explicatives adaptées aux enfants.", legenda: "120+ FICHES ET GUIDES VIDÉO" },
          { fala: "Développe la motricité fine, la créativité et la concentration loin des écrans.", legenda: "MOTRICITÉ FINE ET FOCUS SANS ÉCRAN" },
          { fala: "Cliquez sur En savoir plus et téléchargez le pack complet pour seulement 24 euros !", legenda: "TÉLÉCHARGEZ LE PACK POUR 24€ !" }
        ],
        it: [
          { fala: "Non servono giocattoli di plastica costosi per insegnare ai bambini la scienza e l'ingegneria.", legenda: "VERA SCIENZA SENZA GIOCATTOLI COSTOSI" },
          { fala: "Con I Giovani Inventori, tuo figlio trasforma semplici scatole in incredibili robot semoventi.", legenda: "LE SCATOLE DIVENTANO ROBOT" },
          { fala: "Oltre centoventi progetti con schede didattiche e video passo dopo passo.", legenda: "120+ SCHEDE PRATICHE E VIDEO" },
          { fala: "Sviluppa concentrazione, motricità fine e abilità di pensiero critico.", legenda: "CONCENTRAZIONE E MOTRICITÀ FINE" },
          { fala: "Clicca su Scopri di più e scarica il kit completo a soli 24 euro oggi stesso!", legenda: "SCARICA IL KIT A SOLI 24€ OGGI!" }
        ],
        es: [
          { fala: "No necesitas juguetes caros de plástico para enseñar a tus hijos ciencia e ingeniería real.", legenda: "CIENCIA REAL SIN JUGUETES CAROS" },
          { fala: "Con Los Pequeños Inventores, tu hijo convierte cartón en alucinantes máquinas que funcionan.", legenda: "EL CARTÓN SE CONVIERTE EN MÁQUINAS" },
          { fala: "Más de 120 planos con guías en video y explicaciones sencillas.", legenda: "120+ PLANOS CON GUÍAS EN VIDEO" },
          { fala: "Desarrolla el pensamiento lógico, la motricidad fina y un enfoque sin pantallas.", legenda: "ENFOQUE Y LÓGICA SIN PANTALLAS" },
          { fala: "Toca Más Información y descarga el paquete completo por solo 24 euros hoy.", legenda: "¡DESCÁRGALO HOY POR SOLO 24€!" }
        ]
      }
    },
    // AD 05 (18.8s)
    {
      id: "05",
      inputFile: "concorrente_video_05.mp4",
      duration: 18.8,
      translations: {
        en: [
          { fala: "This isn't just about cutting cardboard. It's about raising a child who knows they can build anything they imagine.", legenda: "IT'S NOT JUST CARDBOARD. IT'S CONFIDENCE!" },
          { fala: "One hundred and twenty engineering projects that spark real pride.", legenda: "120+ ENGINEERING CHALLENGES" },
          { fala: "Click Learn More and grab The Young Inventor's Mega Pack for twenty-seven dollars today!", legenda: "GET THE MEGA PACK FOR $27 TODAY!" }
        ],
        de: [
          { fala: "Es geht nicht nur um Pappe. Es geht darum, ein Kind großzuziehen, das weiß, dass es alles selbst erschaffen kann.", legenda: "NICHT NUR BASTELN. ECHTE INGENIEURSKUNST!" },
          { fala: "Über 120 MINT-Projekte, die echten Stolz und lösungsorientiertes Denken wecken.", legenda: "120+ HERAUSFORDERUNGEN FÜR KINDER" },
          { fala: "Klicken Sie jetzt auf Mehr dazu und sichern Sie sich das Mega-Paket für 27 Euro!", legenda: "JETZT SICHERN FÜR NUR 27€!" }
        ],
        fr: [
          { fala: "Il ne s'agit pas seulement de découper du carton. Il s'agit de donner à votre enfant la fierté d'avoir tout créé lui-même.", legenda: "PLUS QU'UN JEU : UNE FIERTÉ POUR LA VIE !" },
          { fala: "Plus de cent vingt défis d'ingénierie et de bricolage sans aucun écran.", legenda: "120+ PROJETS D'INGÉNIERIE SANS ÉCRAN" },
          { fala: "Cliquez sur En savoir plus et recevez le Méga Pack complet pour 24 euros aujourd'hui !", legenda: "RECEVEZ LE PACK POUR 24€ AUJOURD'HUI !" }
        ],
        it: [
          { fala: "Non si tratta solo di ritagliare cartone. Si tratta di crescere un bambino sicuro di poter creare tutto ciò che immagina.", legenda: "NON SOLO CARTONE: VERA SICUREZZA IN SE STESSI!" },
          { fala: "Oltre centoventi sfide di ingegneria creativa che accendono l'orgoglio e la concentrazione.", legenda: "120+ SFIDE DI INGEGNERIA PER BAMBINI" },
          { fala: "Clicca su Scopri di più e prendi il Mega Pacchetto a soli 24 euro oggi stesso!", legenda: "CLICCA QUI E ACCEDI A SOLI 24€!" }
        ],
        es: [
          { fala: "No se trata solo de recortar cartón. Se trata de criar a un niño seguro de que puede construir todo lo que imagine.", legenda: "¡NO ES SOLO CARTÓN, ES CONFIANZA Y FUTURO!" },
          { fala: "Más de ciento veinte desafíos de ingeniería y creatividad sin pantallas.", legenda: "120+ DESAFÍOS DE INGENIERÍA CASERA" },
          { fala: "Haz clic en Más Información y consigue el Mega Pack completo por solo 24 euros hoy.", legenda: "¡CONSIGUE EL MEGA PACK POR 24€ HOY!" }
        ]
      }
    },
    // AD 06 (31.4s) - The Mechanical Claw
    {
      id: "06",
      inputFile: "concorrente_video_06.mp4",
      duration: 31.4,
      translations: {
        en: [
          { fala: "Look at what an ordinary shoebox and a piece of string can do!", legenda: "WHAT A SHOEBOX & STRING CAN DO!" },
          { fala: "With simple cardboard ribs and articulated joints, your child builds an ergonomic mechanical claw that grabs real items.", legenda: "ERGONOMIC MECHANICAL CLAW" },
          { fala: "They master manual dexterity and real structural engineering.", legenda: "MASTER DEXTERITY & MECHANICS" },
          { fala: "Tap Learn More below and get instant access to 120 projects for just twenty-seven dollars!", legenda: "TAP LEARN MORE FOR JUST $27!" }
        ],
        de: [
          { fala: "Sehen Sie, was ein normaler Schuhkarton und eine Schnur können!", legenda: "WAS EIN SCHUHKARTON KANN!" },
          { fala: "Mit einfachen Pappstreifen baut Ihr Kind einen echten mechanischen Greifarm, der Gegenstände packt.", legenda: "MECHANISCHER GREIFARM AUS PAPPE" },
          { fala: "Fördert die Motorik und grundlegendes Verständnis für Gelenkmechanik.", legenda: "FÖRDERT FEINMOTORIK & MECHANIK" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und sichern Sie sich 120 Projekte für nur 27 Euro!", legenda: "JETZT 120 PROJEKTE FÜR NUR 27€ SICHERN!" }
        ],
        fr: [
          { fala: "Regardez ce qu'une simple boîte à chaussures et un morceau de ficelle peuvent faire !", legenda: "UNE BOÎTE ET DE LA FICELLE !" },
          { fala: "Avec du carton articulé, votre enfant fabrique une véritable pince mécanique capable d'attraper des objets.", legenda: "UNE VRAIE PINCE MÉCANIQUE" },
          { fala: "Il développe sa motricité fine et comprend le fonctionnement des articulations.", legenda: "DÉVELOPPE LA MOTRICITÉ ET LA LOGIQUE" },
          { fala: "Cliquez sur En savoir plus et accédez à 120 projets pour seulement 24 euros !", legenda: "ACCÉDEZ À 120 PROJETS POUR 24€ !" }
        ],
        it: [
          { fala: "Guarda cosa possono fare una semplice scatola di scarpe e un pezzo di spago!", legenda: "UNA SCATOLA E UN PO' DI SPAGO!" },
          { fala: "Con semplici snodi di cartone, tuo figlio costruisce un artiglio meccanico che afferra oggetti veri.", legenda: "ARTIGLIO MECCANICO FUNZIONANTE" },
          { fala: "Sviluppa destrezza manuale e ingegno costruttivo.", legenda: "DESTREZZA MANUALE E INGEGNO" },
          { fala: "Clicca su Scopri di più e accedi a oltre 120 progetti per soli 24 euro!", legenda: "ACCEDI A 120 PROGETTI PER 24€!" }
        ],
        es: [
          { fala: "¡Mira lo que una caja de zapatos y un trozo de cuerda pueden hacer!", legenda: "¡UNA CAJA Y UN TROZO DE CUERDA!" },
          { fala: "Con simples tiras de cartón articuladas, tu hijo crea una pinza mecánica que agarra objetos de verdad.", legenda: "PINZA MECÁNICA QUE AGARRA DE VERDAD" },
          { fala: "Desarrolla la destreza manual y la creatividad técnica.", legenda: "DESTREZA MANUAL Y CREATIVIDAD" },
          { fala: "Haz clic en Más Información y consigue más de 120 proyectos por solo 24 euros.", legenda: "¡120 PROYECTOS POR SOLO 24€!" }
        ]
      }
    },
    // AD 07 (46.7s) - Hydraulic Crane
    {
      id: "07",
      inputFile: "concorrente_video_07.mp4",
      duration: 46.7,
      translations: {
        en: [
          { fala: "No batteries, no motors: just the power of water lifting heavy loads!", legenda: "NO BATTERIES: WATER POWER!" },
          { fala: "Using simple syringes and colored water, your child discovers how real hydraulic excavators and cranes operate.", legenda: "HOW REAL HYDRAULICS WORK" },
          { fala: "Every push of the piston creates powerful, smooth movement that leaves kids absolutely mesmerized.", legenda: "POWERFUL HYDRAULIC PISTONS" },
          { fala: "Over one hundred and twenty illustrated challenges to spark lifelong curiosity.", legenda: "120+ CHALLENGES FOR CURIOUS MINDS" },
          { fala: "Tap Learn More below and claim your complete pack for twenty-seven dollars today!", legenda: "GET THE COMPLETE PACK FOR $27 TODAY!" }
        ],
        de: [
          { fala: "Keine Batterien, keine Motoren: Nur reine Wasserkraft, die echte Lasten hebt!", legenda: "REINE WASSERKRAFT STATT BATTERIEN!" },
          { fala: "Mit einfachen Spritzen und farbigem Wasser lernt Ihr Kind, wie echte Bagger und Kräne funktionieren.", legenda: "SO FUNKTIONIERT ECHTE HYDRAULIK" },
          { fala: "Jeder Kolbenhub erzeugt eine kraftvolle Bewegung, die Kinder absolut fasziniert.", legenda: "FASZINIERENDE KOLBEN-BEWEGUNG" },
          { fala: "Über 120 illustrierte Baupläne für unvergessliche Nachmittage.", legenda: "120+ BAUPLÄNE FÜR KINDER" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und sichern Sie sich das Paket für 27 Euro!", legenda: "JETZT SICHERN FÜR NUR 27€!" }
        ],
        fr: [
          { fala: "Sans piles ni moteurs : juste la puissance de l'eau pour soulever de vraies charges !", legenda: "SANS PILES : LA FORCE DE L'EAU !" },
          { fala: "Avec de simples seringues et de l'eau colorée, votre enfant comprend le fonctionnement des grues hydrauliques.", legenda: "LE SECRET DES GRUES HYDRAULIQUES" },
          { fala: "Chaque pression sur le piston déclenche un mouvement fluide qui émerveille petits et grands.", legenda: "DES PISTONS HYDRAULIQUES FLUIDES" },
          { fala: "Plus de cent vingt projets illustrés pour stimuler la curiosité scientifique.", legenda: "120+ DÉFIS SCIENTIFIQUES" },
          { fala: "Cliquez sur En savoir plus et commandez votre Méga Pack pour 24 euros aujourd'hui !", legenda: "COMMANDEZ LE PACK POUR 24€ !" }
        ],
        it: [
          { fala: "Senza pile e senza motori: solo la potenza dell'acqua per sollevare carichi veri!", legenda: "SENZA BATTERIE: LA FORZA DELL'ACQUA!" },
          { fala: "Usando semplici siringhe e acqua colorata, tuo figlio scopre come funzionano gli escavatori idraulici.", legenda: "COME FUNZIONA L'IDRAULICA REALE" },
          { fala: "Ogni pressione dello stantuffo genera un movimento fluido che lascia i bambini a bocca aperta.", legenda: "MOVIMENTI FLUIDI E POTENTI" },
          { fala: "Oltre 120 progetti illustrati per accendere una passione duratura.", legenda: "120+ PROGETTI PER PICCOLI INVENTORI" },
          { fala: "Clicca su Scopri di più e ricevi il pacchetto completo per soli 24 euro!", legenda: "RICEVI IL PACCHETTO PER 24€!" }
        ],
        es: [
          { fala: "¡Sin pilas ni motores: solo la fuerza del agua levantando peso de verdad!", legenda: "¡SIN PILAS: EL PODER DEL AGUA!" },
          { fala: "Con jeringuillas y agua con colorante, tu hijo descubre cómo funcionan las grúas y excavadoras reales.", legenda: "CÓMO FUNCIONA LA HIDRÁULICA REAL" },
          { fala: "Cada empuje de los émbolos crea un movimiento suave que deja a los niños fascinados.", legenda: "MOVIMIENTO FLUIDO Y POTENTE" },
          { fala: "Más de ciento veinte desafíos ilustrados para despertar su curiosidad.", legenda: "MÁS DE 120 RETOS ILUSTRADOS" },
          { fala: "Haz clic en Más Información y llévate el pack completo por solo 24 euros hoy.", legenda: "¡LLÉVATE EL PACK POR 24€ HOY!" }
        ]
      }
    },
    // AD 08 (25.7s) - Family 30-min Challenge
    {
      id: "08",
      inputFile: "concorrente_video_08.mp4",
      duration: 25.7,
      translations: {
        en: [
          { fala: "The ultimate 30-minute family challenge: who can build the strongest bridge or tallest crane?", legenda: "30-MINUTE FAMILY CHALLENGE!" },
          { fala: "Step-by-step blueprints designed for instant family bonding and zero screen time.", legenda: "INSTANT BONDING & ZERO SCREENS" },
          { fala: "Tap Learn More below and get instant access to all 120 projects for twenty-seven dollars today!", legenda: "GET ALL 120 PROJECTS FOR $27!" }
        ],
        de: [
          { fala: "Die 30-Minuten-Familien-Challenge: Wer baut die stärkste Brücke oder den höchsten Kran?", legenda: "DIE 30-MINUTEN FAMILIEN-CHALLENGE!" },
          { fala: "Schritt-für-Schritt Baupläne für wertvolle Familienzeit ganz ohne Bildschirme.", legenda: "WERTVOLLE FAMILIENZEIT OHNE BILDSCHIRM" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und sichern Sie sich 120 Projekte für 27 Euro!", legenda: "ALLE 120 PROJEKTE FÜR 27€ SICHERN!" }
        ],
        fr: [
          { fala: "Le grand défi famille en 30 minutes : qui construira la grue la plus haute ou le pont le plus solide ?", legenda: "DÉFI FAMILLE EN 30 MINUTES !" },
          { fala: "Des plans étape par étape pour des moments inoubliables loin de tous les écrans.", legenda: "DES MOMENTS MAGIQUES LOIN DES ÉCRANS" },
          { fala: "Cliquez sur En savoir plus et accédez à tous les projets pour seulement 24 euros !", legenda: "ACCÉDEZ À TOUS LES PROJETS POUR 24€ !" }
        ],
        it: [
          { fala: "La sfida in famiglia di 30 minuti: chi costruirà la gru più alta o il ponte più resistente?", legenda: "SFIDA IN FAMIGLIA DI 30 MINUTI!" },
          { fala: "Progetti passo-passo studiati per divertirsi insieme senza nessun dispositivo digitale.", legenda: "DIVERTIMENTO INSIEME SENZA SCHERMI" },
          { fala: "Clicca su Scopri di più e accedi a tutti i 120 progetti per soli 24 euro!", legenda: "TUTTI I 120 PROGETTI A 24€!" }
        ],
        es: [
          { fala: "El reto familiar de 30 minutos: ¿quién construirá la grúa más alta o el puente más resistente?", legenda: "¡RETO FAMILIAR EN 30 MINUTOS!" },
          { fala: "Planos paso a paso pensados para conectar en familia sin ninguna pantalla de por medio.", legenda: "CONEXIÓN EN FAMILIA SIN PANTALLAS" },
          { fala: "Toca Más Información y accede a los 120 proyectos por solo 24 euros hoy.", legenda: "¡ACCEDE A LOS 120 PROYECTOS POR 24€!" }
        ]
      }
    },
    // AD 09 (48.7s) - Propeller Electric Car
    {
      id: "09",
      inputFile: "concorrente_video_09.mp4",
      duration: 48.7,
      translations: {
        en: [
          { fala: "Turn a popsicle stick, a rubber band, and cardboard wheels into a rocket-fast racer!", legenda: "TURN RUBBER BANDS INTO RACERS!" },
          { fala: "Kids explore propulsion, kinetic energy, and aerodynamics with hands-on speed tests across the hallway.", legenda: "EXPLORE PROPULSION & AERODYNAMICS" },
          { fala: "Every project comes with full-color blueprints and easy video guides.", legenda: "BLUEPRINTS & EASY VIDEO GUIDES" },
          { fala: "Hours of healthy, creative excitement without a single tablet in sight.", legenda: "HOURS OF CREATIVE EXCITEMENT" },
          { fala: "Tap Learn More below and claim your complete Mega Pack for just twenty-seven dollars today!", legenda: "CLAIM YOUR MEGA PACK FOR $27 TODAY!" }
        ],
        de: [
          { fala: "Verwandeln Sie Eisstiele, ein Gummiband und Pappräder in einen blitzschnellen Rennwagen!", legenda: "VOM GUMMIBAND ZUM RENNWAGEN!" },
          { fala: "Kinder erforschen Antriebskraft, kinetische Energie und Aerodynamik mit spannenden Speed-Tests.", legenda: "ANTRIEBSKRAFT & AERODYNAMIK ERFORSCHEN" },
          { fala: "Jedes Projekt enthält bunte Baupläne und kindgerechte Videoanleitungen.", legenda: "BUNTE BAUPLÄNE & VIDEOANLEITUNGEN" },
          { fala: "Stundenlanger gesunder Bastelspaß ganz ohne digitale Ablenkung.", legenda: "STUNDENLANGER KREATIVER BASTELSPASS" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und sichern Sie sich das Mega-Paket für 27 Euro!", legenda: "JETZT MEGA-PAKET FÜR 27€ SICHERN!" }
        ],
        fr: [
          { fala: "Transformez des bâtonnets, un élastique et des roues en carton en un bolide ultra-rapide !", legenda: "UN BOLIDE PROPULSÉ PAR ÉLASTIQUE !" },
          { fala: "Les enfants explorent la propulsion, l'énergie cinétique et l'aérodynamique avec des courses endiablées.", legenda: "ÉNERGIE CINÉTIQUE ET PROPULSION" },
          { fala: "Chaque projet contient des fiches détaillées et des vidéos pas à pas très claires.", legenda: "FICHES COULEUR ET GUIDES VIDÉO" },
          { fala: "Des heures de pur plaisir créatif sans aucune console à l'horizon.", legenda: "DU PUR PLAISIR SANS JEUX VIDÉO" },
          { fala: "Cliquez sur En savoir plus et recevez le pack complet pour seulement 24 euros !", legenda: "RECEVEZ LE PACK COMPLET POUR 24€ !" }
        ],
        it: [
          { fala: "Trasforma stecchini di legno, un elastico e ruote di cartone in un'auto da corsa velocissima!", legenda: "UN'AUTO DA CORSA CON ELASTICO!" },
          { fala: "I bambini scoprono l'energia cinetica, la propulsione e l'aerodinamica con gare nel corridoio di casa.", legenda: "PROPULSIONE E AERODINAMICA REALE" },
          { fala: "Ogni progetto include schede a colori e video dimostrativi chiarissimi.", legenda: "SCHEDE A COLORI E VIDEO GUIDA" },
          { fala: "Ore di sano divertimento inventivo senza nessun tablet nei paraggi.", legenda: "DIVERTIMENTO SANO SENZA TABLET" },
          { fala: "Clicca su Scopri di più e prendi il Mega Pacchetto a soli 24 euro oggi stesso!", legenda: "PRENDI IL MEGA PACCHETTO A 24€!" }
        ],
        es: [
          { fala: "¡Transforma palitos de madera, una goma elástica y ruedas de cartón en un bólido veloz!", legenda: "¡UN BÓLIDO VELOZ CON GOMA ELÁSTICA!" },
          { fala: "Los niños exploran la propulsión, la energía cinética y la aerodinámica con carreras en el pasillo.", legenda: "PROPULSIÓN Y ENERGÍA CINÉTICA" },
          { fala: "Cada proyecto incluye planos a todo color y videos explicativos paso a paso.", legenda: "PLANOS A COLOR Y VIDEOS PASO A PASO" },
          { fala: "Horas de entretenimiento creativo y sano sin ninguna pantalla cerca.", legenda: "ENTRETENIMIENTO SANO Y CREATIVO" },
          { fala: "Haz clic en Más Información y consigue tu Mega Pack por solo 24 euros hoy.", legenda: "¡CONSIGUE TU MEGA PACK POR 24€ HOY!" }
        ]
      }
    },
    // AD 10 (24.8s) - Little Engineer Pride
    {
      id: "10",
      inputFile: "concorrente_video_10.mp4",
      duration: 24.8,
      translations: {
        en: [
          { fala: "Look at the genuine pride in their eyes when they shout: Mom, look! I built this myself!", legenda: "THE PRIDE OF SAYING: I BUILT THIS!" },
          { fala: "Give your child lifelong confidence and real problem-solving skills away from screens.", legenda: "CONFIDENCE THAT LASTS A LIFETIME" },
          { fala: "Tap Learn More below and get all 120 projects for just twenty-seven dollars today!", legenda: "GET ALL 120 PROJECTS FOR JUST $27!" }
        ],
        de: [
          { fala: "Sehen Sie den echten Stolz in ihren Augen, wenn sie rufen: Mama, schau mal! Das habe ich ganz alleine gebaut!", legenda: "DER STOLZ: DAS HABE ICH GEBAUT!" },
          { fala: "Schenken Sie Ihrem Kind lebenslanges Selbstvertrauen und echtes Erfinder-Wissen ohne Bildschirme.", legenda: "SELBSTVERTRAUEN FÜRS GANZE LEBEN" },
          { fala: "Klicken Sie jetzt unten auf Mehr dazu und sichern Sie sich alle 120 Baupläne für 27 Euro!", legenda: "ALLE 120 PROJEKTE FÜR NUR 27€!" }
        ],
        fr: [
          { fala: "Regardez la fierté authentique dans ses yeux quand il s'exclame : Maman, regarde ! Je l'ai construit tout seul !", legenda: "LA FIERTÉ DE CRÉER DE SES MAINS !" },
          { fala: "Offrez à votre enfant une confiance en lui durable et un esprit d'inventeur loin des écrans.", legenda: "UNE VRAIE CONFIANCE POUR LA VIE" },
          { fala: "Cliquez sur En savoir plus et accédez aux 120 défis pour seulement 24 euros aujourd'hui !", legenda: "ACCÉDEZ AUX 120 PROJETS POUR 24€ !" }
        ],
        it: [
          { fala: "Guarda l'orgoglio autentico nei suoi occhi quando grida: Mamma, guarda! L'ho costruito tutto con le mie mani!", legenda: "L'ORGOGLIO: L'HO COSTRUITO IO!" },
          { fala: "Regala a tuo figlio una sicurezza che dura per sempre e una vera mente da inventore lontano dagli schermi.", legenda: "SICUREZZA E MENTE DA INVENTORE" },
          { fala: "Clicca su Scopri di più e scarica tutti i 120 progetti per soli 24 euro!", legenda: "SCARICA TUTTI I 120 PROGETTI A 24€!" }
        ],
        es: [
          { fala: "Mira el orgullo auténtico en su mirada cuando grita: ¡Mamá, mira! ¡Lo construí todo yo solito!", legenda: "¡EL ORGULLO DE CONSTRUIRLO ÉL SOLO!" },
          { fala: "Regala a tu hijo una confianza para toda la vida y una mente resolutiva lejos de las pantallas.", legenda: "CONFIANZA PARA TODA LA VIDA" },
          { fala: "Toca Más Información y descarga los 120 proyectos por solo 24 euros hoy.", legenda: "¡LOS 120 PROYECTOS POR SOLO 24€!" }
        ]
      }
    }
  ]
};

const targetPath = path.resolve('mega-inventors', 'assets', 'translations', 'ads_scripts.json');
fs.writeFileSync(targetPath, JSON.stringify(adsScripts, null, 2));
console.log('ads_scripts.json com todos os 10 anúncios em 5 idiomas gravado com sucesso em:', targetPath);
