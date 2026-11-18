import fs from 'fs';
import path from 'path';

const TRANSLATIONS = {
  de: {
    lang: 'de',
    title: 'Die Jungen Erfinder • Mega-Paket (120+ MINT-Baupläne & Roboter)',
    description: 'Tauschen Sie Bildschirme gegen echte Neugier. Über 120 praktische MINT-Projekte für Kinder aus einfacher Pappe und Haushaltsgegenständen.',
    bannerText: '⚡ <strong>SONDERANGEBOT ZUR EINFÜHRUNG:</strong> 62% RABATT + 5 Kostenlose Boni reserviert für:',
    ratingText: 'Von über 14.800 bildschirmfreien Familien geschätzt',
    headline: 'Ihr Kind wird das Smartphone weglegen und dieses Wochenende seinen ersten <span class="text-blue-600 underline decoration-yellow-400 decoration-wavy decoration-2">funktionierenden Roboter</span> bauen.',
    subheadline: 'Über <strong class="text-slate-900 font-bold">120 Schritt-für-Schritt MINT-Projekte</strong> mit einfachen Kartons und Haushaltsgegenständen, die Sie bereits zu Hause haben. Keine teuren Bausätze. Reine haptische Kreativität.',
    badge1: '✓ Sofort-Download (PDF + Videos)',
    badge2: '✓ Nur einfache Haushaltsgegenstände',
    badge3: '✓ 30-Tage "Erster Roboter" Garantie',
    ctaHero: 'SOFORT-ZUGANG SICHERN (27€)',
    trustHero: '🔒 256-Bit SSL Checkout • ⚡ Sofortiger E-Mail-Zugang • 💳 Apple Pay / Google Pay / Karten',
    probTag: 'Kommt Ihnen das bekannt vor?',
    probTitle: 'Der ständige Kampf um Bildschirmzeiten ist anstrengend.',
    probSub: 'Alle Eltern möchten, dass ihre Kinder weniger Zeit vor Bildschirmen verbringen – doch ruhige, fesselnde Alternativen zu finden, ist schwer.',
    prob1Title: '"Darf ich ans Tablet?"',
    prob1Text: 'Sobald Langeweile aufkommt, wird nach dem Smartphone gegriffen. Herkömmliche Malbücher fesseln oft nur 5 Minuten.',
    prob2Title: 'Dopamin-Überreizung',
    prob2Text: 'Kurzvideos und Handyspiele überfluten das junge Gehirn mit schnellem Dopamin, sodass ruhiges, handwerkliches Lernen frustrierend wirkt.',
    prob3Title: 'Teure Spielzeug-Fehlkäufe',
    prob3Text: 'Man kauft teure 80€ Roboter-Sets mit zerbrechlichen Plastikteilen und komplizierten Apps, die nach zwei Tagen im Schrank landen.',
    peekTag: 'Kein Rätselraten nötig',
    peekTitle: 'Ein Blick in die Erfinder-Baupläne',
    peekSub: 'Jedes einzelne Projekt enthält farbige Foto-Bauanleitungen, Material-Checklisten und die kindgerechte Erklärung, warum es funktioniert.',
    peek1Title: '100% Visuelle Schritt-für-Schritt-Fotos',
    peek1Desc: 'Kinder können den Bildern problemlos folgen, selbst wenn sie noch nicht flüssig lesen können.',
    peek2Title: 'Gegenstände aus dem Haushalt',
    peek2Desc: 'Gebaut aus Versandkartons, Flaschendeckeln, Holzspießen, Schnur und Gummibändern. Kein teurer Spezialkauf nötig.',
    peek3Title: 'Roboter, die sich wirklich bewegen',
    peek3Desc: 'Keine starren Pappbasteleien – echte Mechanismen mit Kurbeln, Schwerkraft-Läufern, Wasserkolben und Hebeln.',
    modTag: 'Lehrplan-Übersicht',
    modTitle: '120 Projekte in 6 Meister-Modulen',
    modSub: 'Didaktisch gestaffelt von 20-Minuten-Starterprojekten bis hin zu spannenden Getriebemechanismen.',
    mod1Title: 'Roboter & Laufende Automaten',
    mod1Desc: '20 mechanische Modelle: Schwerkraft-Läufer, bewegliche Roboter-Greifhände und Tisch-Tanzroboter.',
    mod2Title: 'Einfache Maschinen & Hebel',
    mod2Desc: '20 Physik-Herausforderungen: funktionierende Kräne, Katapulte, Seilzug-Aufzüge und Zahnradgetriebe.',
    mod3Title: 'Hochgeschwindigkeits-Fahrzeuge',
    mod3Desc: '20 Gummi- und Luftdruck-Flitzer: Luftkissenboote, Ballon-Rennwagen und Schaufelradboote.',
    mod4Title: 'Hydraulik & Wasserkraft',
    mod4Desc: '20 Strömungsmechanik-Modelle: spritzenbetriebene Bagger, Hebebrücken und Wasserdruck-Raketen.',
    mod5Title: 'Akustik- & Optik-Labor',
    mod5Desc: '20 Sinneswunder: Periskope, Kaleidoskope, Karton-Gitarren und Spionage-Vergrößerer.',
    mod6Title: 'Karton-Spielhalle & Flipper',
    mod6Desc: '20 interaktive Spiele: mechanische Flipper, Basketball-Körbe, Greifautomaten und Kugelbahnen.',
    bonusTag: 'HEUTE KOSTENLOS ENTHALTEN',
    bonusTitle: '5 Exklusive Super-Boni (Wert 68€ — Heute GRATIS)',
    bonus1Title: 'Bonus 1: Offizielle Erfinder-Diplome & Abzeichen',
    bonus1Desc: 'Ausdruckbare Erfolgszertifikate nach dem Meistern der Projekte.',
    bonus2Title: 'Bonus 2: 7-Tage-Kickstart-Routine ohne Bildschirm',
    bonus2Desc: 'Eine spielerische 30-Minuten-Aufgabe pro Tag mit Fortschrittsplaner.',
    bonus3Title: 'Bonus 3: Schritt-für-Schritt Video-Tresor',
    bonus3Desc: 'Sehen Sie die Mechanismen in echter Aktion für einen kinderleichten Zusammenbau.',
    bonus4Title: 'Bonus 4: Die Wissenschaft dahinter (Eltern-Spickzettel)',
    bonus4Desc: 'Einfache 2-Satz-Erklärungen für die Physik hinter jedem Projekt.',
    compTag: 'Clevere Eltern-Mathematik',
    compTitle: 'Warum tausende Familien auf Karton-MINT umsteigen',
    compCol1: 'Merkmal',
    compCol2: 'Das Junge Erfinder Mega-Paket',
    compCol3: 'Teure Spielzeugladen-Bausätze',
    compCol4: 'Zufällige YouTube-Videos',
    compRow1A: 'Gesamtpreis',
    compRow1B: 'Einmalig 27€ (120 Projekte)',
    compRow1C: '80€ - 150€ pro Einzelset',
    compRow1D: 'Kostenlos, aber stundenlanges Suchen',
    compRow2A: 'Benötigte Materialien',
    compRow2B: 'Kartonboxen & Haushaltsreste',
    compRow2C: 'Kleine Plastikteile, die verloren gehen',
    compRow2D: 'Seltene Teile, die man nicht zu Hause hat',
    compRow3A: 'Bildschirmfrei-Garantie',
    compRow3B: '✅ 100% Offline & Haptisch',
    compRow3C: '❌ Oft an iPad-Apps gebunden',
    compRow3D: '❌ Fesselt die Kinder an YouTube',
    compRow4A: 'Frustrationsgrad',
    compRow4B: 'Null: Klare Fotopläne + Videos',
    compRow4C: 'Hoch: Verwirrende Software',
    compRow4D: 'Hoch: Unvollständige Tutorials',
    reviewsTag: 'Echte Familien, Echte Ergebnisse',
    reviewsTitle: 'Was Eltern über das Mega-Paket sagen',
    reviewsSub: 'Erfahren Sie, wie über 14.800 Familien ihre Nachmittage und Wochenenden verändert haben.',
    rev1Text: '"Mein 7-jähriger Sohn hat ADHS und gibt Bastelarbeiten normalerweise nach 5 Minuten auf. Am Samstag hat er 3 Stunden am Stück an der Roboter-Greifhand getüftelt! Das ganze Wochenende kein Bildschirm."',
    rev1Author: 'Sabine M.',
    rev1City: 'München, Deutschland',
    rev2Text: '"Die einfachen Physikerklärungen sind Gold wert. Viel besser als der 120€ Roboterbausatz vom letzten Weihnachten, der nur verstaubt ist. Wir bauen jetzt jeden Sonntag nach dem Mittagessen ein neues Modell!"',
    rev2Author: 'Markus & Leon K.',
    rev2City: 'Wien, Österreich',
    rev3Text: '"Ich unterrichte Sachunterricht in der Grundschule und habe das Paket für die Klasse gekauft. Die Baupläne sind so anschaulich, dass die Kinder den Fotos fast ohne Hilfe folgen können."',
    rev3Author: 'Elena W. (Grundschullehrerin)',
    rev3City: 'Zürich, Schweiz',
    guarTitle: 'Die 30-Tage 100% "Erster Roboter oder Geld zurück" Garantie',
    guarText: 'Laden Sie das Mega-Paket jetzt herunter. Wählen Sie dieses Wochenende ein Projekt mit Ihrem Kind aus. Wenn es nicht sofort das Smartphone beiseitelegt oder Sie nicht restlos begeistert sind, senden Sie uns innerhalb von 30 Tagen eine E-Mail an <strong>support@younginventorspack.com</strong>.',
    guarSub: 'Wir erstatten Ihnen sofort 100% des Kaufpreises zurück – ohne Wenn und Aber. Alle Baupläne und Boni dürfen Sie trotzdem behalten.',
    faqTag: 'Häufige Fragen',
    faqTitle: 'Fragen & Antworten',
    faq1Q: 'Brauche ich Spezialwerkzeuge, Heißklebepistolen oder Lötkolben?',
    faq1A: 'Nein! Jedes Projekt ist auf maximale Sicherheit ausgelegt. Sie benötigen lediglich eine gewöhnliche Kinderschere, Papierkleber oder Klebeband, Versandkartons und Haushaltsreste wie Strohhalme und Flaschendeckel.',
    faq2Q: 'Für welche Altersgruppe ist das Paket geeignet?',
    faq2A: 'Ideal für Kinder von 4 bis 12 Jahren. Jüngere Kinder (4–7) bauen mit Begeisterung gemeinsam mit den Eltern, während Kinder ab 8 Jahren die meisten Projekte dank der Farbfotos völlig eigenständig bauen können.',
    faq3Q: 'Handelt es sich um ein physisches Paket per Post oder einen Download?',
    faq3A: 'Es ist eine sofortige digitale Bibliothek (druckbare PDF-Baupläne + Video-Walkthrough-Tresor). Sie erhalten die Zugangsdaten direkt nach dem Kauf per E-Mail und können in 2 Minuten ohne Lieferzeiten loslegen!',
    faq4Q: 'Funktioniert das auch bei Kindern mit hoher Energie oder ADHS?',
    faq4A: 'Ja! Viele unserer glücklichsten Eltern haben Kinder mit lebhaftem Geist. Das taktile Schneiden, Falten und Zusammensetzen von Pappe bietet die tiefe Sinnesrückmeldung, nach der aktive Köpfe suchen.',
    faq5Q: 'Wie funktioniert die 30-Tage-Garantie?',
    faq5A: 'Sollten Sie oder Ihr Kind aus irgendeinem Grund nicht absolut begeistert sein, schreiben Sie uns einfach eine kurze Nachricht und wir erstatten den vollen Betrag sofort zurück.',
    chkBadge: 'Schneller & Sicherer Checkout',
    chkTitle: 'Mega-Paket der Jungen Erfinder freischalten',
    chkSub: 'Sofortige digitale Bereitstellung direkt an Ihre E-Mail nach dem Kauf.',
    chkProdName: 'Das Mega-Paket der Jungen Erfinder',
    chkProdSub: '120 MINT-Projekte + 5 Exklusive Super-Boni Inklusive',
    chkStep1: '1. Wohin sollen wir Ihre Materialien senden?',
    chkNameLabel: 'Ihr vollständiger Name:',
    chkEmailLabel: 'Ihre beste E-Mail-Adresse (für den Download-Link):',
    chkStep2: '2. Empfohlene Zusatzpakete (43% Rabatt):',
    chkStep2Sub: 'Mit einem Klick hinzufügen',
    chkBump1Title: '🛠️ Kleine Ingenieure (5–7 Jahre)',
    chkBump1Desc: '10 sanfte Einsteiger-Projekte mit großen Steckverbindungen.',
    chkBump2Title: '🤖 Robotik in Bewegung: 24 Mechanismen',
    chkBump2Desc: 'Motorisierte Karton-Roboter mit Kurbeln, Riemenantrieben und Vorlagen.',
    chkBump3Title: '🔬 Wissenschaftler zu Hause (60 Experimente)',
    chkBump3Desc: 'Sichere Küchenexperimente mit Backpulver, Milch und Haushaltsmitteln.',
    chkBump4Title: '🏆 Bildschirmfreie Technik: 40 Herausforderungen',
    chkBump4Desc: 'Gamifiziertes Belohnungssystem mit Fortschrittstafel und Erfinder-Diplomen.',
    chkBump5Title: '🚀 Hydraulik-Maschinen: 10 Herausforderungen mit Wasser',
    chkBump5Desc: 'Spritzen und Wasserkolben treiben Hebebrücken und Greifarme an.',
    chkBump6Title: '🎉 Erfinder-Geburtstagsfeier: Komplett-Set',
    chkBump6Desc: 'Druckbare editierbare Einladungen, Erfinder-Ausweise, Deko und 5 Team-Spiele.',
    chkBump7Title: '📓 Mein Erfinder-Tagebuch: 30 Tage voller Ideen',
    chkBump7Desc: 'Ein illustriertes Tagebuch zum Skizzieren und Weiterentwickeln eigener Ideen.',
    chkTotalLabel: 'GESAMTBETRAG:',
    chkBtn: 'BESTELLUNG AUF STRIPE ABSCHLIESSEN',
    chkSecurity: '🔒 256-Bit SSL-Verschlüsselung • 🛡️ 30-Tage Geld-zurück-Garantie',
    stickyAccess: 'ZUGANG SICHERN',
    stickyProjects: '62% RABATT • 120 PROJEKTE',
    footerRights: 'Die Jungen Erfinder™ • Alle Rechte vorbehalten © 2026',
    footerDisclaimer: 'Diese Website ist kein Teil der Meta-, Facebook- oder Instagram-Website. Zudem wird diese Website in keiner Weise von Meta, Inc. unterstützt.',
    footerSupport: 'Kundenservice: support@younginventorspack.com'
  },
  fr: {
    lang: 'fr',
    title: 'Les Jeunes Inventeurs • Méga Pack (120+ Projets STEM & Robotique en Carton)',
    description: 'Échangez les écrans contre la créativité. Plus de 120 projets STEM pratiques pour enfants avec du simple carton et des objets du quotidien.',
    bannerText: '⚡ <strong>OFFRE SPÉCIALE DE LANCEMENT :</strong> 62% DE RÉDUCTION + 5 Bonus Offerts réservés pendant :',
    ratingText: 'Recommandé par plus de 14 800 familles sans écran',
    headline: 'Votre enfant va poser son écran et construire son tout premier <span class="text-blue-600 underline decoration-yellow-400 decoration-wavy decoration-2">robot fonctionnel</span> ce week-end.',
    subheadline: 'Plus de <strong class="text-slate-900 font-bold">120 projets d\'ingénierie STEM pas à pas</strong> avec de simples cartons et des objets que vous avez déjà à la maison. Zéro kit coûteux. Une créativité 100% pratique.',
    badge1: '✓ Téléchargement Immédiat (PDF + Vidéos)',
    badge2: '✓ Objets du quotidien uniquement',
    badge3: '✓ Garantie 30 Jours "Premier Robot"',
    ctaHero: 'OBTENIR L\'ACCÈS IMMÉDIAT (27€)',
    trustHero: '🔒 Paiement Sécurisé SSL 256-Bit • ⚡ Accès Immédiat par E-mail • 💳 Apple Pay / Google Pay / Cartes',
    probTag: 'Est-ce que cela vous parle ?',
    probTitle: 'La bataille quotidienne contre les écrans est épuisante.',
    probSub: 'Tous les parents souhaitent réduire le temps d\'écran de leurs enfants, mais trouver des activités calmes et captivantes est un vrai défi.',
    prob1Title: '"Je peux avoir la tablette ?"',
    prob1Text: 'Dès que l\'ennui pointe, le téléphone est réclamé. Les coloriages classiques ne retiennent l\'attention que 5 minutes.',
    prob2Title: 'Surcharge de Dopamine',
    prob2Text: 'Les vidéos courtes et jeux vidéo saturent les jeunes cerveaux de dopamine rapide, rendant les activités manuelles frustrantes.',
    prob3Title: 'La déception des jouets coûteux',
    prob3Text: 'Vous achetez des kits de robotique à 90€ avec des pièces en plastique fragiles et des applications qui finissent au placard en 48 heures.',
    peekTag: 'Aucune place au doute',
    peekTitle: 'Un coup d\'œil dans les plans d\'inventeur',
    peekSub: 'Chaque projet comprend des étapes d\'assemblage illustrées en couleur, la liste du matériel et l\'explication scientifique du fonctionnement.',
    peek1Title: '100% de Photos Étape par Étape',
    peek1Desc: 'Les enfants peuvent suivre visuellement, même avant de savoir lire couramment.',
    peek2Title: 'Matériaux Recyclés de la Maison',
    peek2Desc: 'Construit avec des cartons de livraison, bouchons, piques à brochette et élastiques. Aucun achat spécifique en magasin.',
    peek3Title: 'Des robots qui bougent réellement',
    peek3Desc: 'Pas de simples découpages en carton : de véritables mécanismes à bielles, marcheurs par gravité, pistons et leviers.',
    modTag: 'Programme Complet',
    modTitle: '120 Projets Répartis en 6 Modules Majeurs',
    modSub: 'Une progression soignée, des constructions de démarrage de 20 minutes aux mécanismes à engrenages.',
    mod1Title: 'Robots & Automates Marcheurs',
    mod1Desc: '20 constructions mécaniques : marcheurs à gravité, mains robotiques articulées et robots danseurs.',
    mod2Title: 'Machines Simples & Leviers',
    mod2Desc: '20 défis de physique : grues fonctionnelles, catapultes, ascenseurs à poulies et engrenages.',
    mod3Title: 'Véhicules à Grande Vitesse',
    mod3Desc: '20 bolides à élastique et air comprimé : aéroglisseurs, dragsters à ballon et bateaux à aubes.',
    mod4Title: 'Hydraulique & Énergie de l\'Eau',
    mod4Desc: '20 modèles de mécanique des fluides : pelleteuses à seringues, ponts levants et fusées à eau.',
    mod5Title: 'Laboratoire d\'Optique & Acoustique',
    mod5Desc: '20 merveilles sensorielles : périscopes, kaléidoscopes, guitares en carton et loupes d\'espion.',
    mod6Title: 'Salle d\'Arcade en Carton & Flippers',
    mod6Desc: '20 jeux interactifs : flippers mécaniques, paniers de basket, machines à pince et circuits à billes.',
    bonusTag: 'OFFERT AUJOURD\'HUI',
    bonusTitle: '5 Super Bonus Exclusifs (Valeur 68€ — GRATUITS Aujourd\'hui)',
    bonus1Title: 'Bonus 1 : Diplômes & Badges Officiels d\'Inventeur',
    bonus1Desc: 'Certificats de réussite à imprimer pour célébrer chaque projet terminé.',
    bonus2Title: 'Bonus 2 : Défi 7 Jours Sans Écran',
    bonus2Desc: 'Un défi amusant de 30 minutes par jour avec fiche de suivi des progrès.',
    bonus3Title: 'Bonus 3 : Vidéothèque Complète Pas à Pas',
    bonus3Desc: 'Découvrez le fonctionnement des mécanismes en vidéo pour un montage sans erreur.',
    bonus4Title: 'Bonus 4 : La Science Derrière le Jouet (Fiche Parents)',
    bonus4Desc: 'Des explications simples en 2 phrases pour répondre au "Pourquoi ?" de votre enfant.',
    compTag: 'Le Calcul Malin des Parents',
    compTitle: 'Pourquoi des milliers de familles adoptent les STEM en carton',
    compCol1: 'Caractéristique',
    compCol2: 'Le Méga Pack des Jeunes Inventeurs',
    compCol3: 'Kits Commerciaux en Magasin',
    compCol4: 'Vidéos Aléatoires sur YouTube',
    compRow1A: 'Prix Total',
    compRow1B: 'Paiement unique 27€ (120 projets)',
    compRow1C: '80€ à 150€ par kit unique',
    compRow1D: 'Gratuit, mais des heures perdues à chercher',
    compRow2A: 'Matériaux Requis',
    compRow2B: 'Cartons d\'emballage & objets de la maison',
    compRow2C: 'Petites pièces en plastique vite perdues',
    compRow2D: 'Pièces rares introuvables chez soi',
    compRow3A: 'Garantie Sans Écran',
    compRow3B: '✅ 100% Hors Écran & Manuel',
    compRow3C: '❌ Nécessite souvent une tablette',
    compRow3D: '❌ Colle les enfants devant YouTube',
    compRow4A: 'Niveau de Frustration',
    compRow4B: 'Zéro : Plans illustrés + Vidéos',
    compRow4C: 'Élevé : Logiciels déroutants',
    compRow4D: 'Élevé : Tutoriels incomplets',
    reviewsTag: 'Familles Réelles, Résultats Concrets',
    reviewsTitle: 'Ce que disent les parents',
    reviewsSub: 'Découvrez comment plus de 14 800 familles ont transformé leurs après-midis et week-ends.',
    rev1Text: '"Mon fils de 7 ans a un TDAH et abandonne d\'habitude les bricolages après 5 minutes. Il a passé 3 heures d\'affilée samedi à monter la pince robotique articulée ! Pas d\'écran de tout le week-end."',
    rev1Author: 'Céline B.',
    rev1City: 'Lyon, France',
    rev2Text: '"Les explications simples de physique sont géniales. Bien mieux que le kit de robotique à 120€ de Noël dernier qui prenait la poussière. On construit un nouveau projet chaque dimanche après le repas !"',
    rev2Author: 'Marc & Julien D.',
    rev2City: 'Bordeaux, France',
    rev3Text: '"J\'enseigne en école primaire et j\'ai acheté ce pack pour ma classe. Les plans sont tellement clairs que les enfants suivent les étapes en totale autonomie. Rapport qualité-prix imbattable."',
    rev3Author: 'Sophie L. (Professeure des écoles)',
    rev3City: 'Bruxelles, Belgique',
    guarTitle: 'Garantie 30 Jours 100% "Premier Robot Réussi ou Remboursé"',
    guarText: 'Téléchargez le Méga Pack dès maintenant. Choisissez un projet ce week-end avec votre enfant. S\'il ne délaisse pas immédiatement son écran, ou si vous n\'êtes pas comblé par la clarté des plans, écrivez-nous dans les 30 jours à <strong>support@younginventorspack.com</strong>.',
    guarSub: 'Nous vous rembourserons intégralement et sans aucune question. Vous pourrez même conserver l\'ensemble des plans PDF et des bonus.',
    faqTag: 'Des Questions ?',
    faqTitle: 'Foire Aux Questions',
    faq1Q: 'Faut-il des outils spéciaux, un pistolet à colle chaude ou un fer à souder ?',
    faq1A: 'Non ! Chaque projet a été pensé pour la sécurité des enfants. Tout ce dont vous avez besoin : ciseaux d\'écolier, colle ou ruban adhésif, cartons de livraison et objets recyclés simples.',
    faq2Q: 'À quelle tranche d\'âge s\'adresse ce pack ?',
    faq2A: 'Idéal de 4 à 12 ans. Les plus jeunes (4-7 ans) adoreront construire avec l\'aide de leurs parents, tandis que les 8 ans et plus réaliseront la plupart des projets seuls grâce aux photos pas à pas.',
    faq3Q: 'Est-ce un kit envoyé par la poste ou un téléchargement numérique ?',
    faq3A: 'C\'est une bibliothèque numérique instantanée (fiches PDF imprimables + vidéothèque). Vous recevez vos accès par e-mail immédiatement après paiement pour commencer dans 2 minutes sans attendre de livraison !',
    faq4Q: 'Est-ce adapté aux enfants débordants d\'énergie ou avec TDAH ?',
    faq4A: 'Absolument ! De nombreux parents d\'enfants neuroatypiques témoignent de l\'effet apaisant du découpage et de la manipulation du carton, remplaçant la dopamine rapide par une concentration profonde.',
    faq5Q: 'Comment fonctionne la garantie 30 jours ?',
    faq5A: 'Si vous n\'êtes pas pleinement satisfait, un simple e-mail suffit pour recevoir un remboursement intégral immédiat, sans complication.',
    chkBadge: 'Paiement Rapide & Sécurisé',
    chkTitle: 'Débloquez le Méga Pack des Jeunes Inventeurs',
    chkSub: 'Accès numérique immédiat envoyé par e-mail dès la validation.',
    chkProdName: 'Le Méga Pack des Jeunes Inventeurs',
    chkProdSub: '120 Projets MINT + 5 Super Bonus Exclusifs Inclus',
    chkStep1: '1. Où devons-nous vous envoyer vos accès ?',
    chkNameLabel: 'Votre Nom Complet :',
    chkEmailLabel: 'Votre Meilleur E-mail (où vous recevrez l\'accès) :',
    chkStep2: '2. Packs Complémentaires Recommandés (43% de Réduction) :',
    chkStep2Sub: 'Ajoutez en un clic',
    chkBump1Title: '🛠️ Petits Ingénieurs (5-7 ans)',
    chkBump1Desc: '10 projets d\'initiation faciles avec grands emboîtements.',
    chkBump2Title: '🤖 Robotique en Mouvement : 24 Mécanismes',
    chkBump2Desc: 'Mécanismes motorisés en carton avec moteurs DC, poulies et gabarits.',
    chkBump3Title: '🔬 Scientifiques à la Maison (60 Expériences)',
    chkBump3Desc: 'Expériences sûres en cuisine avec du bicarbonate, de l\'huile et du lait.',
    chkBump4Title: '🏆 Technologie Sans Écran : 40 Défis',
    chkBump4Desc: 'Système de progression ludique avec tableau de score et diplômes.',
    chkBump5Title: '🚀 Machines Hydrauliques : 10 Défis avec l\'Eau',
    chkBump5Desc: 'Seringues et pistons actionnant ponts-levis et bras articulés.',
    chkBump6Title: '🎉 Fête des Inventeurs : Kit Anniversaire Complet',
    chkBump6Desc: 'Invitations modifiables, badges d\'équipe, déco et 5 grands jeux.',
    chkBump7Title: '📓 Mon Journal d\'Inventeur : 30 Jours de Création',
    chkBump7Desc: 'Un journal illustré pour imaginer, dessiner et tester chaque idée.',
    chkTotalLabel: 'TOTAL À PAYER :',
    chkBtn: 'FINALISER LA COMMANDE SUR STRIPE',
    chkSecurity: '🔒 Cryptage Bancaire SSL 256-Bit • 🛡️ Garantie Satisfait ou Remboursé 30 Jours',
    stickyAccess: 'OBTENIR L\'ACCÈS',
    stickyProjects: '62% DE RÉDUCTION • 120 PROJETS',
    footerRights: 'Les Jeunes Inventeurs™ • Tous droits réservés © 2026',
    footerDisclaimer: 'Ce site ne fait pas partie du site web de Meta, Facebook ou Instagram. De plus, ce site n\'est en aucun cas approuvé par Meta, Inc.',
    footerSupport: 'Support client : support@younginventorspack.com'
  },
  it: {
    lang: 'it',
    title: 'I Giovani Inventori • Mega Pacchetto (120+ Progetti STEM & Robotica di Cartone)',
    description: 'Sostituisci gli schermi con la curiosità attiva. Oltre 120 progetti STEM pratici per bambini con semplice cartone e oggetti di casa.',
    bannerText: '⚡ <strong>OFFERTA SPECIALE DI LANCIO:</strong> 62% DI SCONTO + 5 Bonus Gratuiti riservati per:',
    ratingText: 'Scelto da oltre 14.800 famiglie senza schermi',
    headline: 'Tuo figlio lascerà lo smartphone e costruirà il suo primo <span class="text-blue-600 underline decoration-yellow-400 decoration-wavy decoration-2">robot funzionante</span> questo fine settimana.',
    subheadline: 'Oltre <strong class="text-slate-900 font-bold">120 progetti pratici STEM passo dopo passo</strong> usando scatole di cartone e oggetti che hai già in casa. Nessun kit costoso. Pura creatività manuale.',
    badge1: '✓ Download Immediato (PDF + Video)',
    badge2: '✓ Solo materiali di uso comune',
    badge3: '✓ Garanzia 30 Giorni "Primo Robot"',
    ctaHero: 'ACCEDI SUBITO (27€)',
    trustHero: '🔒 Pagamento Sicuro SSL 256-Bit • ⚡ Accesso Immediato via Email • 💳 Apple Pay / Google Pay / Carte',
    probTag: 'Ti suona familiare?',
    probTitle: 'La battaglia quotidiana contro gli schermi è sfiancante.',
    probSub: 'Ogni genitore vorrebbe che i propri figli staccassero gli occhi dai display, ma trovare alternative silenziose e appassionanti sembra impossibile.',
    prob1Title: '"Posso usare il tablet?"',
    prob1Text: 'Appena sentono un momento di noia, scatta la richiesta del cellulare. I classici album da colorare durano meno di 5 minuti.',
    prob2Title: 'Sovraccarico di Dopamina',
    prob2Text: 'Video brevi e giochi su smartphone inondano il cervello di dopamina facile, rendendo le attività pratiche lente e frustranti.',
    prob3Title: 'La delusione dei giocattoli costosi',
    prob3Text: 'Compri kit di robotica da 90€ con parti in plastica delicate e app difettose che finiscono dimenticati nell\'armadio dopo due giorni.',
    peekTag: 'Nessun dubbio durante il montaggio',
    peekTitle: 'Uno sguardo all\'interno dei progetti',
    peekSub: 'Ogni progetto include guide illustrate a colori passo dopo passo, checklist dei materiali e la spiegazione scientifica del perché funziona.',
    peek1Title: '100% Foto Passo Passo',
    peek1Desc: 'I bambini possono seguire visivamente ogni passaggio anche prima di saper leggere con disinvoltura.',
    peek2Title: 'Materiali Riciclati di Casa',
    peek2Desc: 'Costruito con cartoni delle spedizioni, tappi di bottiglia, stecchini di legno e elastici. Nessuna spesa extra.',
    peek3Title: 'Robot che si muovono davvero',
    peek3Desc: 'Non sono lavoretti statici di carta: sono veri meccanismi a manovella, deambulatori a gravità, cilindri ad acqua e leve.',
    modTag: 'Programma Completo',
    modTitle: '120 Progetti Divisi in 6 Moduli Principali',
    modSub: 'Graduati con cura da facili costruzioni iniziali di 20 minuti fino a complessi meccanismi a ingranaggi.',
    mod1Title: 'Robot & Automi Deambulatori',
    mod1Desc: '20 modelli meccanici: deambulatori a gravità, mani bioniche articolate e robot ballerini da tavolo.',
    mod2Title: 'Macchine Semplici & Leve',
    mod2Desc: '20 sfide di fisica: gru funzionanti, catapulte, ascensori a puleggia e ingranaggi planetari.',
    mod3Title: 'Veicoli ad Alta Velocità',
    mod3Desc: '20 bolidi a elastico e aria compressa: hovercraft, dragster a palloncino e barche a pale.',
    mod4Title: 'Idraulica & Forza dell\'Acqua',
    mod4Desc: '20 costruzioni di fluidodinamica: escavatori a siringhe, ponti sollevabili e razzi ad acqua.',
    mod5Title: 'Laboratorio di Acustica & Ottica',
    mod5Desc: '20 meraviglie sensoriali: periscopi, caleidoscopi, chitarre di cartone e lenti da spia.',
    mod6Title: 'Sala Giochi di Cartone & Flipper',
    mod6Desc: '20 giochi interattivi: flipper meccanici, canestri da basket, macchine acchiappasogni e piste per biglie.',
    bonusTag: 'INCLUSO GRATIS OGGI',
    bonusTitle: '5 Super Bonus Esclusivi (Valore 68€ — GRATIS Oggi)',
    bonus1Title: 'Bonus 1: Diplomi Ufficiali & Distintivi di Merito',
    bonus1Desc: 'Certificati stampabili per premiare ogni progetto completato con successo.',
    bonus2Title: 'Bonus 2: Routine Kickstart 7 Giorni Senza Schermi',
    bonus2Desc: 'Una sfida coinvolgente di 30 minuti al giorno con tabella di marcia dei progressi.',
    bonus3Title: 'Bonus 3: Archivio Video Passo dopo Passo',
    bonus3Desc: 'Guarda i meccanismi in funzione nei video per un montaggio al 100% a prova di errore.',
    bonus4Title: 'Bonus 4: La Scienza Dietro il Gioco (Guida Genitori)',
    bonus4Desc: 'Spiegazioni semplici in 2 frasi per rispondere a ogni "Perché?" di tuo figlio.',
    compTag: 'Il Calcolo Intelligente dei Genitori',
    compTitle: 'Perché migliaia di famiglie scelgono lo STEM di cartone',
    compCol1: 'Caratteristica',
    compCol2: 'Il Mega Pacchetto dei Giovani Inventori',
    compCol3: 'Kit Commerciali dei Negozi',
    compCol4: 'Video a Caso su YouTube',
    compRow1A: 'Prezzo Totale',
    compRow1B: 'Una tantum 27€ (120 progetti)',
    compRow1C: '80€ - 150€ per un singolo kit',
    compRow1D: 'Gratis, ma ore sprecate a cercare',
    compRow2A: 'Materiali Richiesti',
    compRow2B: 'Scatole di cartone e materiali di casa',
    compRow2C: 'Minuscoli pezzi di plastica facili da perdere',
    compRow2D: 'Pezzi introvabili che non hai a casa',
    compRow3A: 'Garanzia Senza Schermi',
    compRow3B: '✅ 100% Offline e Manuale',
    compRow3C: '❌ Spesso richiede app per tablet',
    compRow3D: '❌ Incolla i bambini allo schermo',
    compRow4A: 'Livello di Frustrazione',
    compRow4B: 'Zero: Schede illustrate + Video',
    compRow4C: 'Alto: Software complessi e buggati',
    compRow4D: 'Alto: Tutorial incompleti',
    reviewsTag: 'Famiglie Vere, Risultati Veri',
    reviewsTitle: 'Cosa dicono i genitori',
    reviewsSub: 'Scopri come oltre 14.800 famiglie hanno trasformato i loro pomeriggi piovosi e i fine settimana.',
    rev1Text: '"Mio figlio di 7 anni ha l\'ADHD e di solito abbandona qualsiasi lavoretto dopo 5 minuti. Sabato ha passato 3 ore consecutive a montare la mano robotica articolata! Niente schermi per tutto il weekend."',
    rev1Author: 'Chiara R.',
    rev1City: 'Milano, Italia',
    rev2Text: '"Le spiegazioni semplici di fisica sono pura genialità. Molto meglio del kit di robotica da 120€ dell\'anno scorso che ha preso solo polvere. Costruiamo un nuovo modello ogni domenica dopo pranzo!"',
    rev2Author: 'Marco & Matteo P.',
    rev2City: 'Torino, Italia',
    rev3Text: '"Insegno scienze alla scuola primaria e ho preso questo pacchetto per la mia classe. Le schede sono così intuitive che i bambini seguono le immagini in totale autonomia."',
    rev3Author: 'Alessia F. (Insegnante)',
    rev3City: 'Bologna, Italia',
    guarTitle: 'Garanzia 30 Giorni 100% "Primo Robot o Rimborsato"',
    guarText: 'Scarica subito il Mega Pacchetto. Scegli un progetto questo weekend insieme a tuo figlio. Se non metterà subito da parte lo smartphone o se non sarai entusiasta della qualità dei materiali, inviaci un\'email entro 30 giorni a <strong>support@younginventorspack.com</strong>.',
    guarSub: 'Ti rimborseremo subito il 100% dell\'importo senza fare domande. Potrai comunque tenere tutti i file PDF e i bonus come nostro ringraziamento.',
    faqTag: 'Hai Domande?',
    faqTitle: 'Domande Frequenti',
    faq1Q: 'Servono attrezzi speciali, colle a caldo o saldatori?',
    faq1A: 'No! Ogni progetto è progettato per garantire la massima sicurezza. Servono solo forbici con punte arrotondate, colla per carta o nastro adesivo, scatole di cartone e semplici oggetti di casa.',
    faq2Q: 'A quale fascia d\'età è rivolto?',
    faq2A: 'Ideale per bambini dai 4 ai 12 anni. I più piccoli (4-7 anni) ameranno costruire insieme a genitori o fratelli maggiori, mentre dai 8 anni in su realizzeranno la maggior parte dei modelli in piena autonomia.',
    faq3Q: 'Si tratta di un kit fisico spedito a casa o di un download digitale?',
    faq3A: 'È una libreria digitale istantanea (schede PDF stampabili + archivio video guidati). Ricevi le credenziali via email subito dopo l\'ordine, così potrai iniziare a costruire tra 2 minuti senza attese!',
    faq4Q: 'Funziona con bambini iperattivi o con ADHD?',
    faq4A: 'Assolutamente sì! Molti dei nostri genitori più entusiasti hanno bambini neurodivergenti. Il taglio, la piegatura e il montaggio del cartone forniscono il feedback tattile e la concentrazione profonda che cercano.',
    faq5Q: 'Come funziona la Garanzia 30 Giorni?',
    faq5A: 'Se per qualsiasi motivo non sarai soddisfatto al 100%, scrivici entro 30 giorni e riceverai il rimborso completo immediato, senza moduli complicati.',
    chkBadge: 'Checkout Rapido e Sicuro',
    chkTitle: 'Sblocca il Mega Pacchetto dei Giovani Inventori',
    chkSub: 'Consegna digitale istantanea via email subito dopo l\'ordine.',
    chkProdName: 'Il Mega Pacchetto dei Giovani Inventori',
    chkProdSub: '120 Progetti STEM + 5 Super Bonus Esclusivi Inclusi',
    chkStep1: '1. Dove dobbiamo inviare i tuoi materiali?',
    chkNameLabel: 'Il Tuo Nome Completo:',
    chkEmailLabel: 'La Tua Migliore Email (dove riceverai il link di accesso):',
    chkStep2: '2. Pacchetti Aggiuntivi Consigliati (43% di Sconto):',
    chkStep2Sub: 'Aggiungi con un clic',
    chkBump1Title: '🛠️ Piccoli Ingegneri (5-7 anni)',
    chkBump1Desc: '10 progetti di primo contatto con incastri grandi.',
    chkBump2Title: '🤖 Robotica in Movimento: 24 Meccanismi',
    chkBump2Desc: 'Meccanismi motorizzati in cartone con motori DC, pulegge e schemi.',
    chkBump3Title: '🔬 Scienziati a Casa (60 Esperimenti)',
    chkBump3Desc: 'Esperimenti scientifici sicuri in cucina con bicarbonato, olio e latte.',
    chkBump4Title: '🏆 Tecnologia Senza Schermi: 40 Sfide',
    chkBump4Desc: 'Sistema a livelli con tabellone di punteggio e diplomi ufficiali.',
    chkBump5Title: '🚀 Macchine Idrauliche: 10 Sfide ad Acqua',
    chkBump5Desc: 'Siringhe e pistoni ad acqua per muovere ponti levatoi e bracci meccanici.',
    chkBump6Title: '🎉 Festa degli Inventori: Kit per Compleanni',
    chkBump6Desc: 'Inviti modificabili, badge da scienziato, decorazioni e giochi a squadre.',
    chkBump7Title: '📓 Il Mio Diario dell\'Inventore: 30 Giorni',
    chkBump7Desc: 'Un diario illustrato per disegnare schemi e registrare ogni collaudo.',
    chkTotalLabel: 'TOTALE DA PAGARE:',
    chkBtn: 'COMPLETA L\'ORDINE SU STRIPE',
    chkSecurity: '🔒 Crittografia Bancaria SSL a 256 Bit • 🛡️ Garanzia Soddisfatti o Rimborsati di 30 Giorni',
    stickyAccess: 'ACCEDI ORA',
    stickyProjects: '62% DI SCONTO • 120 PROGETTI',
    footerRights: 'I Giovani Inventori™ • Tutti i diritti riservati © 2026',
    footerDisclaimer: 'Questo sito non fa parte del sito Meta, Facebook o Instagram. Inoltre, questo sito non è in alcun modo approvato da Meta, Inc.',
    footerSupport: 'Assistenza Clienti: support@younginventorspack.com'
  },
  es: {
    lang: 'es',
    title: 'Los Pequeños Inventores • Mega Pack (120+ Proyectos STEM y Robótica con Cartón)',
    description: 'Cambia las pantallas por verdadera curiosidad. Más de 120 proyectos STEM prácticos para niños con simple cartón y cosas de casa.',
    bannerText: '⚡ <strong>OFERTA ESPECIAL DE LANZAMIENTO:</strong> 62% DE DESCUENTO + 5 Bonos Gratis reservados durante:',
    ratingText: 'Elegido por más de 14.800 familias sin pantallas',
    headline: 'Tu hijo dejará el móvil a un lado y construirá su primer <span class="text-blue-600 underline decoration-yellow-400 decoration-wavy decoration-2">robot funcional</span> este fin de semana.',
    subheadline: 'Más de <strong class="text-slate-900 font-bold">120 proyectos prácticos de ingeniería STEM paso a paso</strong> usando cajas de cartón y objetos que ya tienes en casa. Cero kits costosos. Pura creatividad tangible.',
    badge1: '✓ Descarga Inmediata (PDF + Vídeos)',
    badge2: '✓ Solo materiales cotidianos del hogar',
    badge3: '✓ Garantía de 30 Días "Primer Robot"',
    ctaHero: 'ACCEDER AHORA (27€)',
    trustHero: '🔒 Pago Seguro SSL de 256 Bits • ⚡ Acceso Inmediato por Correo • 💳 Apple Pay / Google Pay / Tarjetas',
    probTag: '¿Te suena familiar?',
    probTitle: 'La batalla diaria contra las pantallas es agotadora.',
    probSub: 'Todos los padres quieren que sus hijos suelten las pantallas, pero encontrar alternativas entretenidas y enriquecedoras es muy difícil.',
    prob1Title: '"¿Me dejas el móvil?"',
    prob1Text: 'Apenas sienten un minuto de aburrimiento, piden el teléfono. Los libros de colorear convencionales solo retienen su atención 5 minutos.',
    prob2Title: 'Sobrecarga de Dopamina',
    prob2Text: 'Los vídeos cortos y juegos móviles inundan sus cerebros de dopamina instantánea, haciendo que las manualidades parezcan aburridas.',
    prob3Title: 'La decepción de los juguetes caros',
    prob3Text: 'Compras kits de robótica de 90€ con piezas plásticas frágiles y aplicaciones que terminan abandonados en un armario a los dos días.',
    peekTag: 'Sin dudas durante el armado',
    peekTitle: 'Un vistazo al interior de los planos de inventor',
    peekSub: 'Cada proyecto incluye pasos de montaje ilustrados a todo color, lista de materiales y la explicación científica de por qué funciona.',
    peek1Title: '100% Fotos Paso a Paso',
    peek1Desc: 'Los niños pueden seguir el montaje visualmente incluso antes de aprender a leer con soltura.',
    peek2Title: 'Materiales Reciclados del Hogar',
    peek2Desc: 'Construido con cajas de cartón, tapones de botella, palillos y gomas elásticas. Sin compras complicadas en tiendas.',
    peek3Title: 'Robots que se mueven de verdad',
    peek3Desc: 'No son manualidades estáticas de papel: son mecanismos reales con manivelas, caminadores por gravedad, pistones de agua y palancas.',
    modTag: 'Plan de Aprendizaje',
    modTitle: '120 Proyectos Divididos en 6 Módulos Maestros',
    modSub: 'Graduados cuidadosamente desde proyectos sencillos de 20 minutos hasta fascinantes mecanismos con engranajes.',
    mod1Title: 'Robots & Autómatas Caminadores',
    mod1Desc: '20 construcciones mecánicas: caminadores por gravedad, manos robóticas articuladas y robots bailarines.',
    mod2Title: 'Máquinas Simples & Palancas',
    mod2Desc: '20 retos de física: grúas funcionales, catapultas, elevadores de polea y engranajes planetarios.',
    mod3Title: 'Vehículos de Alta Velocidad',
    mod3Desc: '20 bólidos de goma y aire comprimido: aerodeslizadores, bólidos a globo y barcos de palas.',
    mod4Title: 'Hidráulica & Fuerza del Agua',
    mod4Desc: '20 modelos de física de fluidos: excavadoras con jeringas, puentes levadizos y cohetes de agua.',
    mod5Title: 'Laboratorio de Acústica y Óptica',
    mod5Desc: '20 maravillas sensoriales: periscopios, caleidoscopios, guitarras de cartón y lupas de espía.',
    mod6Title: 'Sala de Juegos de Cartón y Pinball',
    mod6Desc: '20 juegos interactivos: pinballs mecánicos, canastas de baloncesto, máquinas de garra y pistas de canicas.',
    bonusTag: 'INCLUIDO GRATIS HOY',
    bonusTitle: '5 Super Bonos Exclusivos (Valor 68€ — GRATIS Hoy)',
    bonus1Title: 'Bono 1: Diplomas Oficiales y Medallas de Inventor',
    bonus1Desc: 'Certificados imprimibles para celebrar el éxito de cada invento terminado.',
    bonus2Title: 'Bono 2: Reto de 7 Días Sin Pantallas',
    bonus2Desc: 'Un reto divertido de 30 minutos al día con tablero para registrar logros.',
    bonus3Title: 'Bono 3: Videoteca de Montaje Paso a Paso',
    bonus3Desc: 'Observa los mecanismos en acción en vídeo para un montaje 100% infalible.',
    bonus4Title: 'Bono 4: La Ciencia del Juguete (Guía para Padres)',
    bonus4Desc: 'Explicaciones sencillas en 2 frases para responder a cada "¿Por qué?" de tu hijo.',
    compTag: 'La Cuenta Inteligente de los Padres',
    compTitle: 'Por qué miles de familias eligen el STEM con cartón',
    compCol1: 'Característica',
    compCol2: 'El Mega Pack de los Pequeños Inventores',
    compCol3: 'Kits Comerciales de Juguetería',
    compCol4: 'Vídeos Aleatorios de YouTube',
    compRow1A: 'Precio Total',
    compRow1B: 'Pago único 27€ (120 proyectos)',
    compRow1C: '80€ - 150€ por un solo kit',
    compRow1D: 'Gratis, pero horas perdidas buscando',
    compRow2A: 'Materiales Requeridos',
    compRow2B: 'Cajas de cartón y cosas de casa',
    compRow2C: 'Piezas diminutas de plástico que se pierden',
    compRow2D: 'Piezas difíciles que no tienes en casa',
    compRow3A: 'Garantía Sin Pantallas',
    compRow3B: '✅ 100% Desconectado y Tangible',
    compRow3C: '❌ A menudo requiere app para tablet',
    compRow3D: '❌ Engancha a los niños a YouTube',
    compRow4A: 'Nivel de Frustración',
    compRow4B: 'Cero: Planos ilustrados + Vídeos',
    compRow4C: 'Alto: Software confuso',
    compRow4D: 'Alto: Tutoriales incompletos',
    reviewsTag: 'Familias Reales, Resultados Reales',
    reviewsTitle: 'Lo que opinan los padres',
    reviewsSub: 'Descubre cómo más de 14.800 familias transformaron sus tardes y fines de semana.',
    rev1Text: '"Mi hijo de 7 años tiene TDAH y normalmente abandona cualquier manualidad a los 5 minutos. ¡El sábado pasó 3 horas seguidas construyendo la mano robótica articulada! Cero pantallas en todo el fin de semana."',
    rev1Author: 'Patricia M.',
    rev1City: 'Madrid, España',
    rev2Text: '"Las explicaciones sencillas de ciencia valen oro. Mucho mejor que el kit de robótica de 120€ de las navidades pasadas que se quedó cogiendo polvo. ¡Construimos un invento nuevo cada domingo después de comer!"',
    rev2Author: 'Carlos y Daniel G.',
    rev2City: 'Valencia, España',
    rev3Text: '"Soy profesora de primaria y compré este pack para inspirar mis clases. Las guías son tan claras que los niños pueden seguir las fotos con total autonomía. Una compra imprescindible."',
    rev3Author: 'Laura S. (Maestra de Primaria)',
    rev3City: 'Sevilla, España',
    guarTitle: 'Garantía de 30 Días 100% "Primer Robot o Devolución Completa"',
    guarText: 'Descarga el Mega Pack ahora mismo. Elige cualquier proyecto este fin de semana con tu hijo. Si no suelta de inmediato el móvil, o si no quedas maravillado con la calidad de los planos, envíanos un correo en un plazo de 30 días a <strong>support@younginventorspack.com</strong>.',
    guarSub: 'Te devolveremos el 100% del dinero de inmediato y sin preguntas. Además, podrás conservar todos los planos en PDF y los bonos como agradecimiento.',
    faqTag: '¿Tienes Dudas?',
    faqTitle: 'Preguntas Frecuentes',
    faq1Q: '¿Se necesitan herramientas especiales, pistola de silicona o soldadores?',
    faq1A: '¡No! Cada proyecto está diseñado para máxima seguridad. Solo necesitas tijeras de punta roma, pegamento escolar o cinta adhesiva, cajas de cartón y materiales reciclables cotidianos.',
    faq2Q: '¿Para qué edades está recomendado?',
    faq2A: 'Ideal para niños de 4 a 12 años. Los más pequeños (4-7) disfrutarán construyendo con sus padres, mientras que a partir de 8 años pueden armar casi todos los modelos solos gracias a las fotos paso a paso.',
    faq3Q: '¿Es un kit físico por correo o una descarga digital?',
    faq3A: 'Es una biblioteca digital de descarga inmediata (fichas en PDF para imprimir + videoteca). Recibes tus accesos al correo justo tras pagar, por lo que puedes empezar en 2 minutos sin esperar envíos.',
    faq4Q: '¿Sirve para niños con mucha energía o TDAH?',
    faq4A: '¡Totalmente! Muchos de nuestros clientes más satisfechos tienen niños neurodivergentes. Cortar, doblar y encajar cartón proporciona el estímulo táctil y la concentración profunda que necesitan.',
    faq5Q: '¿Cómo funciona la Garantía de 30 Días?',
    faq5A: 'Si por cualquier motivo no quedas 100% fascinado, simplemente escríbenos y te reembolsaremos el importe íntegro de inmediato, sin trámites molestos.',
    chkBadge: 'Checkout Rápido y Seguro',
    chkTitle: 'Desbloquear El Mega Pack de Pequeños Inventores',
    chkSub: 'Entrega digital inmediata a tu correo electrónico al completar el pago.',
    chkProdName: 'El Mega Pack de los Pequeños Inventores',
    chkProdSub: '120 Proyectos STEM + 5 Super Bonos Exclusivos Incluidos',
    chkStep1: '1. ¿A dónde debemos enviar tus materiales?',
    chkNameLabel: 'Tu Nombre Completo:',
    chkEmailLabel: 'Tu Mejor Correo (donde recibirás el acceso):',
    chkStep2: '2. Packs Adicionales Recomendados (43% de Descuento):',
    chkStep2Sub: 'Añade con un solo clic',
    chkBump1Title: '🛠️ Pequeños Ingenieros (5-7 años)',
    chkBump1Desc: '10 proyectos de iniciación con piezas de encaje grande.',
    chkBump2Title: '🤖 Robótica con Movimiento: 24 Mecanismos',
    chkBump2Desc: 'Mecanismos motorizados de cartón con motores DC, poleas y plantillas.',
    chkBump3Title: '🔬 Científicos en Casa (60 Experimentos)',
    chkBump3Desc: 'Experimentos caseros seguros con bicarbonato, aceite y leche.',
    chkBump4Title: '🏆 Tecnología sin Pantallas: 40 Retos',
    chkBump4Desc: 'Sistema de misiones con tablero de puntos y diplomas de honor.',
    chkBump5Title: '🚀 Máquinas Hidráulicas: 10 Desafíos con Agua',
    chkBump5Desc: 'Jeringas y pistones de agua que mueven puentes levadizos y brazos.',
    chkBump6Title: '🎉 Fiesta de Inventores: Kit de Cumpleaños',
    chkBump6Desc: 'Invitaciones editables, credenciales, decoración y 5 juegos de taller.',
    chkBump7Title: '📓 Mi Diario de Inventor: 30 Días de Creación',
    chkBump7Desc: 'Un diario ilustrado para diseñar bocetos y perfeccionar inventos.',
    chkTotalLabel: 'TOTAL A PAGAR:',
    chkBtn: 'FINALIZAR PEDIDO EN STRIPE',
    chkSecurity: '🔒 Cifrado Bancario SSL de 256 Bits • 🛡️ Garantía de Devolución de 30 Días',
    stickyAccess: 'ACCEDER AHORA',
    stickyProjects: '62% DE DESCUENTO • 120 PROYECTOS',
    footerRights: 'Los Pequeños Inventores™ • Todos los derechos reservados © 2026',
    footerDisclaimer: 'Este sitio web no forma parte del sitio web de Meta, Facebook o Instagram. Además, este sitio no está avalado por Meta, Inc. de ninguna manera.',
    footerSupport: 'Atención al Cliente: support@younginventorspack.com'
  }
};

function generateLandingHtml(lang) {
  const t = TRANSLATIONS[lang];
  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${t.title}</title>
  <meta name="description" content="${t.description}">
  
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
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1864964467859741&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->

  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>">
  
  <!-- Google Fonts & Tailwind CDN -->
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
            brandBlueDark: '#1D4ED8',
            brandYellow: '#FBBF24',
            brandOrange: '#F97316',
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

  <style>
    html { scroll-behavior: smooth; }
    @keyframes pulse-green {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { box-shadow: 0 0 0 14px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .order-bump-card {
      transition: all 0.25s ease-in-out;
    }
    .order-bump-card.checked {
      background-color: #EFF6FF;
      border-color: #2563EB;
      box-shadow: 0 6px 16px -2px rgba(37, 99, 235, 0.15);
    }
    input[type="text"], input[type="email"], input[type="tel"] {
      font-size: 16px !important;
    }
  </style>
</head>
<body class="bg-brandBg text-slate-800 font-sans antialiased min-h-screen pt-10 pb-20 sm:pb-0">

  <!-- TOP URGENCY BANNER -->
  <aside class="fixed top-0 left-0 right-0 z-50 h-10 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white text-xs px-3 shadow-md flex items-center">
    <div class="max-w-5xl mx-auto w-full flex items-center justify-between sm:justify-center gap-2 sm:gap-4">
      <div class="flex items-center gap-2 truncate">
        <span class="relative flex h-2 w-2 flex-shrink-0">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
        </span>
        <span class="font-medium text-[11px] sm:text-xs tracking-tight truncate">
          ${t.bannerText}
        </span>
      </div>
      <div class="flex items-center gap-1 flex-shrink-0">
        <span id="countdown" class="bg-black/30 border border-white/20 text-yellow-300 px-2 py-0.5 rounded font-mono font-bold text-xs">14:59</span>
      </div>
    </div>
  </aside>

  <!-- HERO SECTION -->
  <header class="relative overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50/40 to-brandBg pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4 text-center">
      
      <!-- Social Proof Rating Pill -->
      <div class="inline-flex items-center gap-2 bg-white/90 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-4">
        <div class="flex text-amber-400 text-xs">★★★★★</div>
        <span class="font-bold">4.9/5</span>
        <span class="text-slate-400">•</span>
        <span class="text-slate-600">${t.ratingText}</span>
      </div>

      <!-- Main Headline -->
      <h1 class="font-display font-black text-3xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-[1.15] max-w-3xl mx-auto">
        ${t.headline}
      </h1>

      <!-- Subheadline -->
      <p class="text-base sm:text-xl text-slate-600 mt-5 max-w-2xl mx-auto leading-relaxed font-normal">
        ${t.subheadline}
      </p>

      <!-- Trust Badges -->
      <div class="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-6 text-xs sm:text-sm text-slate-700 font-medium">
        <span class="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
          <span class="text-green-600 font-bold">✓</span> ${t.badge1}
        </span>
        <span class="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
          <span class="text-green-600 font-bold">✓</span> ${t.badge2}
        </span>
        <span class="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
          <span class="text-green-600 font-bold">✓</span> ${t.badge3}
        </span>
      </div>

      <!-- Hero Mockup Image -->
      <div class="mt-8 relative max-w-2xl mx-auto">
        <img src="assets/mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png" 
             alt="${t.title}" 
             class="w-full h-auto drop-shadow-2xl rounded-2xl mx-auto transform hover:scale-[1.01] transition duration-300">
      </div>

      <!-- Primary CTA Button -->
      <div class="mt-8 max-w-md mx-auto">
        <a href="#checkout" 
           class="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-display font-extrabold text-lg sm:text-xl px-8 py-4 rounded-2xl shadow-xl shadow-green-500/30 transform hover:-translate-y-0.5 transition duration-200 uppercase tracking-wide">
          <span>${t.ctaHero}</span>
          <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
        <div class="flex items-center justify-center gap-3 text-[11px] text-slate-500 mt-2.5">
          <span>${t.trustHero}</span>
        </div>
      </div>

    </div>
  </header>

  <!-- THE PROBLEM / SCREEN ADDICTION -->
  <section class="py-12 sm:py-16 bg-white border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 border border-red-200 px-3 py-1 rounded-full">${t.probTag}</span>
        <h2 class="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-3">${t.probTitle}</h2>
        <p class="text-sm text-slate-600 mt-2">${t.probSub}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-red-50/60 border border-red-100 rounded-2xl p-6 text-center">
          <div class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📱</div>
          <h3 class="font-bold text-slate-900 text-base mb-2">${t.prob1Title}</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${t.prob1Text}</p>
        </div>

        <div class="bg-amber-50/60 border border-amber-100 rounded-2xl p-6 text-center">
          <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🤯</div>
          <h3 class="font-bold text-slate-900 text-base mb-2">${t.prob2Title}</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${t.prob2Text}</p>
        </div>

        <div class="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 text-center">
          <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📦</div>
          <h3 class="font-bold text-slate-900 text-base mb-2">${t.prob3Title}</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${t.prob3Text}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PEEK INSIDE -->
  <section class="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">${t.peekTag}</span>
        <h2 class="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-3">${t.peekTitle}</h2>
        <p class="text-sm text-slate-600 mt-2">${t.peekSub}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
          <img src="assets/duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png" 
               alt="Blueprint Sample" 
               class="w-full h-auto rounded-xl">
        </div>
        <div class="space-y-4">
          <div class="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">1</span>
            <div>
              <strong class="text-slate-900 font-bold text-sm block">${t.peek1Title}</strong>
              <p class="text-xs text-slate-500 mt-0.5">${t.peek1Desc}</p>
            </div>
          </div>

          <div class="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">2</span>
            <div>
              <strong class="text-slate-900 font-bold text-sm block">${t.peek2Title}</strong>
              <p class="text-xs text-slate-500 mt-0.5">${t.peek2Desc}</p>
            </div>
          </div>

          <div class="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">3</span>
            <div>
              <strong class="text-slate-900 font-bold text-sm block">${t.peek3Title}</strong>
              <p class="text-xs text-slate-500 mt-0.5">${t.peek3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- THE 6 PROGRESSIVE MODULES (120 PROJECTS) -->
  <section class="py-12 sm:py-16 bg-white border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">${t.modTag}</span>
        <h2 class="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-3">${t.modTitle}</h2>
        <p class="text-sm text-slate-600 mt-2">${t.modSub}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg mb-3">01</div>
          <h3 class="font-bold text-slate-900 text-base">${t.mod1Title}</h3>
          <p class="text-xs text-slate-500 mt-1">${t.mod1Desc}</p>
        </div>

        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg mb-3">02</div>
          <h3 class="font-bold text-slate-900 text-base">${t.mod2Title}</h3>
          <p class="text-xs text-slate-500 mt-1">${t.mod2Desc}</p>
        </div>

        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div class="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-bold text-lg mb-3">03</div>
          <h3 class="font-bold text-slate-900 text-base">${t.mod3Title}</h3>
          <p class="text-xs text-slate-500 mt-1">${t.mod3Desc}</p>
        </div>

        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold text-lg mb-3">04</div>
          <h3 class="font-bold text-slate-900 text-base">${t.mod4Title}</h3>
          <p class="text-xs text-slate-500 mt-1">${t.mod4Desc}</p>
        </div>

        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div class="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center font-bold text-lg mb-3">05</div>
          <h3 class="font-bold text-slate-900 text-base">${t.mod5Title}</h3>
          <p class="text-xs text-slate-500 mt-1">${t.mod5Desc}</p>
        </div>

        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div class="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center font-bold text-lg mb-3">06</div>
          <h3 class="font-bold text-slate-900 text-base">${t.mod6Title}</h3>
          <p class="text-xs text-slate-500 mt-1">${t.mod6Desc}</p>
        </div>
      </div>

      <!-- FREE BONUSES INCLUDED -->
      <div class="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div class="text-center max-w-xl mx-auto mb-6">
          <span class="bg-yellow-400 text-blue-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">${t.bonusTag}</span>
          <h3 class="font-display font-black text-2xl sm:text-3xl mt-2">${t.bonusTitle}</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div class="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm border border-white/20 flex items-start gap-3">
            <span class="text-xl">🎖️</span>
            <div>
              <strong class="font-bold block text-yellow-300">${t.bonus1Title}</strong>
              <span class="text-blue-100">${t.bonus1Desc}</span>
            </div>
          </div>

          <div class="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm border border-white/20 flex items-start gap-3">
            <span class="text-xl">📅</span>
            <div>
              <strong class="font-bold block text-yellow-300">${t.bonus2Title}</strong>
              <span class="text-blue-100">${t.bonus2Desc}</span>
            </div>
          </div>

          <div class="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm border border-white/20 flex items-start gap-3">
            <span class="text-xl">🎬</span>
            <div>
              <strong class="font-bold block text-yellow-300">${t.bonus3Title}</strong>
              <span class="text-blue-100">${t.bonus3Desc}</span>
            </div>
          </div>

          <div class="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm border border-white/20 flex items-start gap-3">
            <span class="text-xl">🧠</span>
            <div>
              <strong class="font-bold block text-yellow-300">${t.bonus4Title}</strong>
              <span class="text-blue-100">${t.bonus4Desc}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- COMPARISON TABLE -->
  <section class="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">${t.compTag}</span>
        <h2 class="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-3">${t.compTitle}</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full bg-white rounded-2xl border border-slate-200 shadow-sm text-left text-xs sm:text-sm overflow-hidden">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-100 text-slate-700">
              <th class="p-3.5 sm:p-4">${t.compCol1}</th>
              <th class="p-3.5 sm:p-4 bg-blue-50 text-blue-800 font-extrabold border-x border-blue-200">${t.compCol2}</th>
              <th class="p-3.5 sm:p-4 text-slate-500">${t.compCol3}</th>
              <th class="p-3.5 sm:p-4 text-slate-500">${t.compCol4}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-3.5 sm:p-4 font-semibold text-slate-900">${t.compRow1A}</td>
              <td class="p-3.5 sm:p-4 bg-blue-50/60 font-bold text-blue-700 border-x border-blue-200">${t.compRow1B}</td>
              <td class="p-3.5 sm:p-4 text-slate-600">${t.compRow1C}</td>
              <td class="p-3.5 sm:p-4 text-slate-600">${t.compRow1D}</td>
            </tr>
            <tr>
              <td class="p-3.5 sm:p-4 font-semibold text-slate-900">${t.compRow2A}</td>
              <td class="p-3.5 sm:p-4 bg-blue-50/60 font-bold text-blue-700 border-x border-blue-200">${t.compRow2B}</td>
              <td class="p-3.5 sm:p-4 text-slate-600">${t.compRow2C}</td>
              <td class="p-3.5 sm:p-4 text-slate-600">${t.compRow2D}</td>
            </tr>
            <tr>
              <td class="p-3.5 sm:p-4 font-semibold text-slate-900">${t.compRow3A}</td>
              <td class="p-3.5 sm:p-4 bg-blue-50/60 font-bold text-emerald-600 border-x border-blue-200">${t.compRow3B}</td>
              <td class="p-3.5 sm:p-4 text-slate-600">${t.compRow3C}</td>
              <td class="p-3.5 sm:p-4 text-slate-600">${t.compRow3D}</td>
            </tr>
            <tr>
              <td class="p-3.5 sm:p-4 font-semibold text-slate-900">${t.compRow4A}</td>
              <td class="p-3.5 sm:p-4 bg-blue-50/60 font-bold text-blue-700 border-x border-blue-200">${t.compRow4B}</td>
              <td class="p-3.5 sm:p-4 text-slate-600">${t.compRow4C}</td>
              <td class="p-3.5 sm:p-4 text-slate-600">${t.compRow4D}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- VERIFIED REVIEWS -->
  <section class="py-12 sm:py-16 bg-white border-b border-slate-200">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">${t.reviewsTag}</span>
        <h2 class="font-display font-black text-2xl sm:text-4xl text-slate-900 mt-3">${t.reviewsTitle}</h2>
        <p class="text-sm text-slate-600 mt-2">${t.reviewsSub}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex text-amber-400 text-sm mb-2">★★★★★</div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed italic">${t.rev1Text}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <strong class="text-slate-900 block font-bold">${t.rev1Author}</strong>
              <span class="text-slate-500">${t.rev1City}</span>
            </div>
            <span class="text-green-700 bg-green-100 font-bold text-[10px] px-2 py-0.5 rounded-full">✓ Verified</span>
          </div>
        </div>

        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex text-amber-400 text-sm mb-2">★★★★★</div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed italic">${t.rev2Text}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <strong class="text-slate-900 block font-bold">${t.rev2Author}</strong>
              <span class="text-slate-500">${t.rev2City}</span>
            </div>
            <span class="text-green-700 bg-green-100 font-bold text-[10px] px-2 py-0.5 rounded-full">✓ Verified</span>
          </div>
        </div>

        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex text-amber-400 text-sm mb-2">★★★★★</div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed italic">${t.rev3Text}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <strong class="text-slate-900 block font-bold">${t.rev3Author}</strong>
              <span class="text-slate-500">${t.rev3City}</span>
            </div>
            <span class="text-green-700 bg-green-100 font-bold text-[10px] px-2 py-0.5 rounded-full">✓ Verified</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 30-DAY FIRST ROBOT GUARANTEE -->
  <section class="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
    <div class="max-w-3xl mx-auto px-4">
      <div class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-xl text-center relative overflow-hidden">
        <div class="w-20 h-20 mx-auto mb-4">
          <img src="assets/garantia-YrDNbk5xkXtbRqee.png" alt="Guarantee Seal" class="w-full h-full object-contain">
        </div>

        <h3 class="font-display font-black text-2xl sm:text-3xl text-slate-900">
          ${t.guarTitle}
        </h3>

        <p class="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed max-w-xl mx-auto">
          ${t.guarText}
        </p>

        <p class="text-xs font-bold text-slate-900 mt-3">
          ${t.guarSub}
        </p>
      </div>
    </div>
  </section>

  <!-- FAQ SECTION -->
  <section class="py-12 sm:py-16 bg-white border-b border-slate-200">
    <div class="max-w-3xl mx-auto px-4">
      <div class="text-center mb-10">
        <span class="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">${t.faqTag}</span>
        <h2 class="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-3">${t.faqTitle}</h2>
      </div>

      <div class="space-y-3.5 text-xs sm:text-sm">
        <details class="group bg-slate-50 p-4 rounded-2xl border border-slate-200 cursor-pointer">
          <summary class="font-bold text-slate-900 flex justify-between items-center list-none">
            <span>${t.faq1Q}</span>
            <span class="text-blue-600 group-open:rotate-180 transition transform">▼</span>
          </summary>
          <p class="text-slate-600 mt-2.5 leading-relaxed pt-2 border-t border-slate-200/60">${t.faq1A}</p>
        </details>

        <details class="group bg-slate-50 p-4 rounded-2xl border border-slate-200 cursor-pointer">
          <summary class="font-bold text-slate-900 flex justify-between items-center list-none">
            <span>${t.faq2Q}</span>
            <span class="text-blue-600 group-open:rotate-180 transition transform">▼</span>
          </summary>
          <p class="text-slate-600 mt-2.5 leading-relaxed pt-2 border-t border-slate-200/60">${t.faq2A}</p>
        </details>

        <details class="group bg-slate-50 p-4 rounded-2xl border border-slate-200 cursor-pointer">
          <summary class="font-bold text-slate-900 flex justify-between items-center list-none">
            <span>${t.faq3Q}</span>
            <span class="text-blue-600 group-open:rotate-180 transition transform">▼</span>
          </summary>
          <p class="text-slate-600 mt-2.5 leading-relaxed pt-2 border-t border-slate-200/60">${t.faq3A}</p>
        </details>

        <details class="group bg-slate-50 p-4 rounded-2xl border border-slate-200 cursor-pointer">
          <summary class="font-bold text-slate-900 flex justify-between items-center list-none">
            <span>${t.faq4Q}</span>
            <span class="text-blue-600 group-open:rotate-180 transition transform">▼</span>
          </summary>
          <p class="text-slate-600 mt-2.5 leading-relaxed pt-2 border-t border-slate-200/60">${t.faq4A}</p>
        </details>

        <details class="group bg-slate-50 p-4 rounded-2xl border border-slate-200 cursor-pointer">
          <summary class="font-bold text-slate-900 flex justify-between items-center list-none">
            <span>${t.faq5Q}</span>
            <span class="text-blue-600 group-open:rotate-180 transition transform">▼</span>
          </summary>
          <p class="text-slate-600 mt-2.5 leading-relaxed pt-2 border-t border-slate-200/60">${t.faq5A}</p>
        </details>
      </div>
    </div>
  </section>

  <!-- CHECKOUT / ORDER SECTION -->
  <section id="checkout" class="py-12 sm:py-16 bg-white">
    <div class="max-w-2xl mx-auto px-4">
      
      <div class="text-center mb-8">
        <span class="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full uppercase tracking-wider">${t.chkBadge}</span>
        <h2 class="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-2">${t.chkTitle}</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">${t.chkSub}</p>
      </div>

      <!-- MAIN ORDER SUMMARY CARD -->
      <div class="bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl">
        
        <!-- Main Product Header -->
        <div class="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              🤖
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm sm:text-base leading-snug">${t.chkProdName}</h3>
              <p class="text-[11px] sm:text-xs text-slate-500">${t.chkProdSub}</p>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="text-xs text-slate-400 line-through block">72.00€</span>
            <span class="font-display font-black text-xl text-blue-600">27.00€</span>
          </div>
        </div>

        <!-- CUSTOMER FORM -->
        <div class="space-y-3 mb-6">
          <h4 class="font-bold text-slate-800 text-xs sm:text-sm mb-2">${t.chkStep1}</h4>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">${t.chkNameLabel}</label>
            <input type="text" id="cust-name" placeholder="Sarah Jenkins" 
                   class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">${t.chkEmailLabel}</label>
            <input type="email" id="cust-email" placeholder="sarah@gmail.com" 
                   class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
          </div>
        </div>

        <!-- ORDER BUMPS SECTION -->
        <div class="border-t border-slate-200 pt-5 mb-6">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-bold text-slate-800 text-xs sm:text-sm">${t.chkStep2}</h4>
            <span class="text-[11px] text-slate-400">${t.chkStep2Sub}</span>
          </div>

          <div class="space-y-3">
            
            <!-- BUMP 1 -->
            <label class="order-bump-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-blue-300 transition">
              <input type="checkbox" class="bump-chk mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" data-price="11.99">
              <div class="flex-1 text-xs">
                <div class="flex justify-between font-bold text-slate-900">
                  <span>${t.chkBump1Title}</span>
                  <span class="text-blue-600">+11.99€</span>
                </div>
                <p class="text-slate-500 text-[11px] mt-0.5">${t.chkBump1Desc}</p>
              </div>
            </label>

            <!-- BUMP 2 -->
            <label class="order-bump-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-blue-300 transition">
              <input type="checkbox" class="bump-chk mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" data-price="11.99">
              <div class="flex-1 text-xs">
                <div class="flex justify-between font-bold text-slate-900 items-center">
                  <span>${t.chkBump2Title}</span>
                  <span class="text-blue-600">+11.99€</span>
                </div>
                <p class="text-slate-500 text-[11px] mt-0.5">${t.chkBump2Desc}</p>
              </div>
            </label>

            <!-- BUMP 3 -->
            <label class="order-bump-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-blue-300 transition">
              <input type="checkbox" class="bump-chk mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" data-price="11.99">
              <div class="flex-1 text-xs">
                <div class="flex justify-between font-bold text-slate-900">
                  <span>${t.chkBump3Title}</span>
                  <span class="text-blue-600">+11.99€</span>
                </div>
                <p class="text-slate-500 text-[11px] mt-0.5">${t.chkBump3Desc}</p>
              </div>
            </label>

            <!-- BUMP 4 -->
            <label class="order-bump-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-blue-300 transition">
              <input type="checkbox" class="bump-chk mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" data-price="11.99">
              <div class="flex-1 text-xs">
                <div class="flex justify-between font-bold text-slate-900">
                  <span>${t.chkBump4Title}</span>
                  <span class="text-blue-600">+11.99€</span>
                </div>
                <p class="text-slate-500 text-[11px] mt-0.5">${t.chkBump4Desc}</p>
              </div>
            </label>

            <!-- BUMP 5 -->
            <label class="order-bump-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-blue-300 transition">
              <input type="checkbox" class="bump-chk mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" data-price="11.99">
              <div class="flex-1 text-xs">
                <div class="flex justify-between font-bold text-slate-900">
                  <span>${t.chkBump5Title}</span>
                  <span class="text-blue-600">+11.99€</span>
                </div>
                <p class="text-slate-500 text-[11px] mt-0.5">${t.chkBump5Desc}</p>
              </div>
            </label>

            <!-- BUMP 6 -->
            <label class="order-bump-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-blue-300 transition">
              <input type="checkbox" class="bump-chk mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" data-price="11.99">
              <div class="flex-1 text-xs">
                <div class="flex justify-between font-bold text-slate-900">
                  <span>${t.chkBump6Title}</span>
                  <span class="text-blue-600">+11.99€</span>
                </div>
                <p class="text-slate-500 text-[11px] mt-0.5">${t.chkBump6Desc}</p>
              </div>
            </label>

            <!-- BUMP 7 -->
            <label class="order-bump-card flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-blue-300 transition">
              <input type="checkbox" class="bump-chk mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" data-price="11.99">
              <div class="flex-1 text-xs">
                <div class="flex justify-between font-bold text-slate-900">
                  <span>${t.chkBump7Title}</span>
                  <span class="text-blue-600">+11.99€</span>
                </div>
                <p class="text-slate-500 text-[11px] mt-0.5">${t.chkBump7Desc}</p>
              </div>
            </label>

          </div>
        </div>

        <!-- TOTAL DISPLAY -->
        <div class="bg-blue-50 rounded-2xl p-4 border border-blue-200 flex items-center justify-between mb-6">
          <span class="font-bold text-slate-800 text-sm">${t.chkTotalLabel}</span>
          <span id="display-total" class="font-display font-black text-2xl text-blue-700">27.00€</span>
        </div>

        <!-- FINAL CTA BUTTON -->
        <button id="btn-finalizar" 
                class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-display font-extrabold text-lg py-4 rounded-2xl shadow-xl shadow-green-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 uppercase tracking-wide">
          <span>${t.chkBtn}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>

        <!-- SECURITY & CARDS FOOTER -->
        <div class="mt-5 text-center space-y-2">
          <div class="flex items-center justify-center gap-3 text-slate-400 text-xs">
            <span>${t.chkSecurity}</span>
          </div>
          <div class="flex items-center justify-center gap-2 text-slate-400 text-[11px]">
            <span>Apple Pay • Google Pay • Visa • Mastercard • Amex</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- STICKY MOBILE BOTTOM BAR -->
  <div id="sticky-bottom-bar" class="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl flex items-center justify-between gap-3">
    <div>
      <span class="font-display font-black text-lg text-blue-700 block leading-tight">27.00€</span>
      <span class="text-[10px] text-slate-500 block leading-tight">${t.stickyProjects}</span>
    </div>
    <a href="#checkout" class="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 flex-shrink-0">
      <span>${t.stickyAccess}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
    </a>
  </div>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 text-center">
    <div class="max-w-4xl mx-auto px-4">
      <p class="font-bold text-white mb-2">${t.footerRights}</p>
      <p class="text-slate-500 max-w-lg mx-auto">${t.footerDisclaimer}</p>
      <p class="text-slate-500 mt-2">${t.footerSupport}</p>
    </div>
  </footer>

  <!-- DYNAMIC STRIPE REDIRECTION SCRIPT -->
  <script>
    (function() {
      const BASE_PRICE = 27.00;
      const chks = document.querySelectorAll('.bump-chk');
      const displayTotal = document.getElementById('display-total');
      const btnFinalizar = document.getElementById('btn-finalizar');

      function updateTotal() {
        let total = BASE_PRICE;
        chks.forEach(chk => {
          const card = chk.closest('.order-bump-card');
          if (chk.checked) {
            total += parseFloat(chk.getAttribute('data-price'));
            if (card) card.classList.add('checked');
          } else {
            if (card) card.classList.remove('checked');
          }
        });
        displayTotal.textContent = total.toFixed(2) + '€';
      }

      chks.forEach(chk => chk.addEventListener('change', updateTotal));

      btnFinalizar.addEventListener('click', function() {
        const name = document.getElementById('cust-name').value.trim();
        const email = document.getElementById('cust-email').value.trim();

        if (!email || !email.includes('@')) {
          alert('Please enter a valid email address.');
          document.getElementById('cust-email').focus();
          return;
        }

        if (typeof fbq === 'function') {
          fbq('track', 'InitiateCheckout', {
            value: 27.00,
            currency: 'EUR'
          });
        }

        let checkoutUrl = 'https://buy.stripe.com/9B66oH4CDbk00F7aMv3Je05';
        const params = new URLSearchParams();
        params.append('prefilled_email', email);
        if (name) params.append('client_reference_id', encodeURIComponent(name));

        const finalUrl = checkoutUrl + '?' + params.toString();
        window.location.href = finalUrl;
      });

      let seconds = 14 * 60 + 59;
      const elCount = document.getElementById('countdown');
      setInterval(function() {
        if (seconds > 0) {
          seconds--;
          const m = Math.floor(seconds / 60);
          const s = seconds % 60;
          if (elCount) elCount.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        }
      }, 1000);
    })();
  </script>

</body>
</html>
`;
}

['de', 'fr', 'it', 'es'].forEach(lang => {
  const html = generateLandingHtml(lang);
  const p1 = `c:/Users/Star/Documents/espionagem1/mega-inventors/regions/${lang}/public/index.html`;
  fs.writeFileSync(p1, html, 'utf8');
  console.log(`Generated localized index.html for ${lang} (${html.length} chars)`);
});
