import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const upDir = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/.user_uploaded/';

const srcFiles = {
  hero: path.join(upDir, 'media_1794262837527_29f12679.png'),
  p1: path.join(upDir, 'media_1794262843462_fd0c90e9.jpg'),
  p2: path.join(upDir, 'media_1794262846206_b295d718.jpg'),
  p3: path.join(upDir, 'media_1794262849642_1b6f0b7c.jpg'),
  p4: path.join(upDir, 'media_1794262853322_f19f3cce.png'),
  b1: path.join(upDir, 'media_1794262886323_2f0b934a.jpg'),
  b2: path.join(upDir, 'media_1794262889893_a5259642.jpg'),
  b3: path.join(upDir, 'media_1794262892524_c160cf37.jpg'),
  b4: path.join(upDir, 'media_1794262894510_469cf8f9.jpg'),
  b5: path.join(upDir, 'media_1794262896503_4732c64a.jpg')
};

// Base64 encode sources
const base64Src = {};
for (const [k, v] of Object.entries(srcFiles)) {
  base64Src[k] = fs.readFileSync(v).toString('base64');
}

const targetDestMap = {
  hero: 'mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png',
  heroAlt: 'mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png',
  p1: 'duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png',
  p2: 'dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png',
  p3: 'mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png',
  p4: 'duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png',
  b1: 'composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png',
  b2: 'plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png',
  b3: 'bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png',
  b4: 'bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png',
  b5: 'bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png'
};

const translations = {
  en: {
    videoBadge: "10 step-by-step videos",
    bonusWord: "BONUS",
    p1: {
      leftHead: "HOW IT WORKS • PROJECT 069 • SCISSOR GRIPPER ROBOT",
      subHead: "WHAT YOUR CHILD LEARNS",
      b1: "Levers", b2: "Precision", b3: "Patience", b4: "Creativity",
      dykTitle: "DID YOU KNOW?",
      dykText: "Scissor linkage arms are used in heavy construction elevators & lifters.",
      chalTitle: "INVENTOR CHALLENGE",
      c1: "Ages 5-7: grab a small pompom",
      c2: "Ages 8-10: grab an item 20 cm away",
      c3: "Ages 11+: add an extra X linkage joint",
      famTitle: "FAMILY FUN:",
      famText: "clean up toys using only the gripper!",
      badge: "YOUNG INVENTORS • ED. 2026",
      projLabel: "PROJECT",
      t1: "HYDRAULIC", t2: "CRANE",
      desc: "A cardboard crane whose boom lifts and lowers powered by real water pressure.",
      sAge: "Age: 10 to 12 years",
      sTime: "Time: 60 minutes",
      sLevel: "Level: Medium",
      sAdult: "Parents: fill syringes",
      sTeach: "Teaches: fluid pressure",
      matBtn: "100% HOUSEHOLD MATERIALS"
    },
    p2: {
      badge: "YOUNG INVENTORS • ED. 2026",
      projLabel: "PROJECT",
      t1: "BIONIC", t2: "ROBOTIC HAND",
      desc: "Cardboard robotic hand with string tendons: pull strings to bend joints just like human fingers.",
      sAge: "Age: 7 to 12 years",
      sTime: "Time: 40 minutes",
      sLevel: "Level: Easy",
      sAdult: "Parents: not needed",
      sTeach: "Teaches: human anatomy",
      matBtn: "100% HOUSEHOLD MATERIALS",
      dipHead: "YOUNG INVENTORS CLUB OFFICIAL AWARD",
      dipTitle: "INVENTOR<br>DIPLOMA",
      dipAward: "Awarded to:",
      dipText: "for imagining, building, and testing their own working inventions with their own hands.",
      dipDate: "Date",
      dipSign: "Signature"
    },
    p3: {
      mapTitle: "MAP OF YOUR 120 PROJECTS",
      mapSub: "80 in this handbook + 40 in Backyard Bonus",
      cats: [
        { l: "Cranes & Building", id: "001-014" },
        { l: "Vehicles & Racers", id: "015-023" },
        { l: "Air, Water & Flight", id: "024-032" },
        { l: "Launchers & Games", id: "033-041" },
        { l: "Cams & Machines", id: "042-050" },
        { l: "Syringe Hydraulics", id: "051-057" },
        { l: "Electricity & Lights", id: "058-066" },
        { l: "Robots & Walkers", id: "067-076" },
        { l: "Science & Discovery", id: "077-080" }
      ],
      mapBonus: "BONUS • 40 Inventions for the Backyard & Outdoors",
      badge: "YOUNG INVENTORS • ED. 2026",
      projLabel: "PROJECT",
      t1: "ELECTRIC", t2: "RACE CAR",
      desc: "A car with a real motor: flip the switch and it zooms forward on its own.",
      sAge: "Age: 7 to 12 years",
      sTime: "Time: 60 minutes",
      sLevel: "Level: Medium",
      sAdult: "Parents: wire connection",
      sTeach: "Teaches: electric circuits",
      matBtn: "100% HOUSEHOLD MATERIALS"
    },
    p4: {
      leftTitle: "THE 5-STEP INVENTOR METHOD",
      steps: [
        { n: "1 IMAGINE:", d: "what do I want it to do?" },
        { n: "2 PLAN:", d: "materials and blueprints" },
        { n: "3 BUILD:", d: "step-by-step assembly" },
        { n: "4 TEST:", d: "does it work?" },
        { n: "5 IMPROVE:", d: "tweak one detail and test again" }
      ],
      vertText: "Mistakes are part of inventing!",
      bottomPill: "Every project in the book guides you in these 5 steps",
      rightTitle: "WHERE TO START ACCORDING TO AGE",
      ageGroups: ["AGES 5 TO 7", "AGES 8 TO 10", "AGES 11 TO 13"],
      rightBottomPill: "After these 5 starter builds, pick whichever they love most"
    },
    bonuses: [
      { t1: "7-DAY INVENTOR", t2: "BLUEPRINT PLAN", sub: "One week, seven builds, a child focused off screens", pill: "FROM ZERO TO INVENTOR IN 7 DAYS" },
      { t1: "14-DAY HOME", t2: "ROBOTICS PLAN", sub: "Build, test, and improve step-by-step", pill: "FROM IDEA TO YOUR FIRST ROBOT" },
      { t1: "QUICK TESTING &", t2: "TUNING GUIDE", sub: "When something gets stuck, here is the quick fix", pill: "MAKE EVERY INVENTOR BUILD WORK" },
      { t1: "RECYCLABLES &", t2: "MATERIALS CHECKLIST", sub: "Everything you already have at home", pill: "GATHER, SORT & STORE" },
      { t1: "40 INVENTIONS", t2: "FOR THE BACKYARD", sub: "Tracks, rescues, and outdoor competitions", pill: "COMPLETE YOUR 120 PROJECTS" }
    ]
  },
  de: {
    videoBadge: "10 Schritt-für-Schritt Videos",
    bonusWord: "BONUS",
    p1: {
      leftHead: "WIE ES FUNKTIONIERT • PROJEKT 069 • GREIFER-ROBOTER",
      subHead: "WAS IHR KIND LERNT",
      b1: "Hebel", b2: "Präzision", b3: "Geduld", b4: "Kreativität",
      dykTitle: "WUSSTEN SIE SCHON?",
      dykText: "Scherengelenkarme werden für echte Hebebühnen und Baumaschinen genutzt.",
      chalTitle: "ERFINDER-CHALLENGE",
      c1: "5-7 J.: ein kleines Spielzeug greifen",
      c2: "8-10 J.: Gegenstand in 20 cm greifen",
      c3: "11+ J.: ein zusätzliches Scherengelenk bauen",
      famTitle: "FAMILIEN-SPASS:",
      famText: "Spielsachen nur mit dem Greifer aufräumen!",
      badge: "JUNGE ERFINDER • AUSGABE 2026",
      projLabel: "PROJEKT",
      t1: "HYDRAULIK-", t2: "KRAN",
      desc: "Ein Kartonkran, dessen Ausleger durch echten Wasserdruck gehoben wird.",
      sAge: "Alter: 10 bis 12 Jahre",
      sTime: "Zeit: 60 Minuten",
      sLevel: "Level: Mittel",
      sAdult: "Eltern: Spritzen füllen",
      sTeach: "Fördert: Flüssigkeitsdruck",
      matBtn: "100% HAUSHALTSMATERIALIEN"
    },
    p2: {
      badge: "JUNGE ERFINDER • AUSGABE 2026",
      projLabel: "PROJEKT",
      t1: "BIONISCHE", t2: "ROBOTERHAND",
      desc: "Kartonhand mit Schnursehnen: am Faden ziehen und die Finger beugen sich wie echt.",
      sAge: "Alter: 7 bis 12 Jahre",
      sTime: "Zeit: 40 Minuten",
      sLevel: "Level: Leicht",
      sAdult: "Eltern: nicht nötig",
      sTeach: "Fördert: menschliche Anatomie",
      matBtn: "100% HAUSHALTSMATERIALIEN",
      dipHead: "OFFIZIELLES DIPLOM DES ERFINDERCLUBS",
      dipTitle: "ERFINDER-<br>DIPLOM",
      dipAward: "Verliehen an:",
      dipText: "für das Erdenken, Bauen und Testen eigener Erfindungen mit eigenen Händen.",
      dipDate: "Datum",
      dipSign: "Unterschrift"
    },
    p3: {
      mapTitle: "KARTE DEINER 120 PROJEKTE",
      mapSub: "80 im Hauptbuch + 40 im Garten-Bonus",
      cats: [
        { l: "Kräne & Hebel", id: "001-014" },
        { l: "Fahrzeuge & Renner", id: "015-023" },
        { l: "Luft, Wasser & Flug", id: "024-032" },
        { l: "Werfer & Geschick", id: "033-041" },
        { l: "Getriebe & Räder", id: "042-050" },
        { l: "Spritzen-Hydraulik", id: "051-057" },
        { l: "Strom & Lichter", id: "058-066" },
        { l: "Roboter & Läufer", id: "067-076" },
        { l: "MINT-Experimente", id: "077-080" }
      ],
      mapBonus: "BONUS • 40 Erfindungen für Garten & Natur",
      badge: "JUNGE ERFINDER • AUSGABE 2026",
      projLabel: "PROJEKT",
      t1: "ELEKTRO-", t2: "RENNWAGEN",
      desc: "Ein Auto mit echtem Motor: Schalter umlegen und es saust ganz von allein los.",
      sAge: "Alter: 7 bis 12 Jahre",
      sTime: "Zeit: 60 Minuten",
      sLevel: "Level: Mittel",
      sAdult: "Eltern: Kabelanschluss",
      sTeach: "Fördert: Stromkreise",
      matBtn: "100% HAUSHALTSMATERIALIEN"
    },
    p4: {
      leftTitle: "DIE 5-SCHRITTE ERFINDER-METHODE",
      steps: [
        { n: "1 VORSTELLEN:", d: "Was genau soll es können?" },
        { n: "2 PLANEN:", d: "Materialien und Entwurf" },
        { n: "3 BAUEN:", d: "Schritt für Schritt basteln" },
        { n: "4 TESTEN:", d: "Funktioniert es wie gedacht?" },
        { n: "5 VERBESSERN:", d: "Ein Detail anpassen & testen" }
      ],
      vertText: "Fehler gehören zum Erfinden dazu!",
      bottomPill: "Jedes Projekt im Buch leitet dich in diesen 5 Schritten",
      rightTitle: "WO NACH ALTER AM BESTEN STARTEN",
      ageGroups: ["5 BIS 7 JAHRE", "8 BIS 10 JAHRE", "11 BIS 13 JAHRE"],
      rightBottomPill: "Nach diesen 5 Starter-Projekten frei nach Interesse wählen"
    },
    bonuses: [
      { t1: "7-TAGE-ERFINDER", t2: "CHALLENGE-PLAN", sub: "Eine Woche, 7 Erfindungen, voller Fokus abseits von Bildschirmen", pill: "IN 7 TAGEN VOM ANFÄNGER ZUM ERFINDER" },
      { t1: "14-TAGE HEIM-", t2: "ROBOTIK-FAHRPLAN", sub: "Schritt für Schritt bauen, testen & verbessern", pill: "VON DER IDEE ZUM ERSTEN ROBOTER" },
      { t1: "SCHNELLANLEITUNG", t2: "TESTS & JUSTIERUNG", sub: "Wenn ein Rad klemmt: hier ist die sofortige Lösung", pill: "DAMIT JEDE ERFINDUNG FEHLERFREI KLAPPT" },
      { t1: "RECYCLING-MATERIAL", t2: "CHECKLISTE", sub: "Alles was Sie längst zu Hause haben", pill: "SAMMELN, SORTIEREN & AUFBEWAHREN" },
      { t1: "40 ERFINDUNGEN", t2: "FÜR DEN GARTEN", sub: "Rennstrecken, Bergungen & MINT-Wettbewerbe draußen", pill: "DEINE 120 PROJEKTE KOMPLETT" }
    ]
  },
  fr: {
    videoBadge: "10 vidéos pas à pas",
    bonusWord: "BONUS",
    p1: {
      leftHead: "COMMENT ÇA MARCHE • PROJET 069 • ROBOT À PINCE",
      subHead: "CE QUE VOTRE ENFANT DÉCOUVRE",
      b1: "Leviers", b2: "Précision", b3: "Patience", b4: "Créativité",
      dykTitle: "LE SAVIEZ-VOUS ?",
      dykText: "Les bras en ciseaux sont utilisés dans les vraies nacelles et chariots de levage.",
      chalTitle: "DÉFI D'INVENTEUR",
      c1: "5-7 ans : attraper un petit pompon",
      c2: "8-10 ans : attraper un objet à 20 cm",
      c3: "11+ ans : ajouter un croisillon en X",
      famTitle: "MOMENT EN FAMILLE :",
      famText: "ranger les jouets uniquement avec la pince !",
      badge: "PETITS INVENTEURS • ÉD. 2026",
      projLabel: "PROJET",
      t1: "GRUE", t2: "HYDRAULIQUE",
      desc: "Une grue en carton dont la flèche monte et descend sous la pression de l'eau.",
      sAge: "Âge : 10 à 12 ans",
      sTime: "Durée : 60 minutes",
      sLevel: "Niveau : Moyen",
      sAdult: "Parents : remplir seringues",
      sTeach: "Apprend : pression hydraulique",
      matBtn: "100% MATÉRIAUX DE LA MAISON"
    },
    p2: {
      badge: "PETITS INVENTEURS • ÉD. 2026",
      projLabel: "PROJET",
      t1: "MAIN ROBOTIQUE", t2: "BIONIQUE",
      desc: "Main articulée en carton avec tendons en ficelle : tirez et les doigts se plient.",
      sAge: "Âge : 7 à 12 ans",
      sTime: "Durée : 40 minutes",
      sLevel: "Niveau : Facile",
      sAdult: "Parents : pas besoin",
      sTeach: "Apprend : anatomie humaine",
      matBtn: "100% MATÉRIAUX DE LA MAISON",
      dipHead: "DISTINCTION OFFICIELLE DU CLUB DES INVENTEURS",
      dipTitle: "DIPLÔME<br>D'INVENTEUR",
      dipAward: "Décerné à :",
      dipText: "pour avoir imaginé, construit et testé ses propres inventions de ses propres mains.",
      dipDate: "Date",
      dipSign: "Signature"
    },
    p3: {
      mapTitle: "CARTE DE VOS 120 PROJETS",
      mapSub: "80 dans le guide + 40 dans le bonus Plein Air",
      cats: [
        { l: "Grues & Bâtiment", id: "001-014" },
        { l: "Véhicules & Bolides", id: "015-023" },
        { l: "Air, Eau & Vol", id: "024-032" },
        { l: "Lanceurs & Jeux", id: "033-041" },
        { l: "Mécanismes & Cames", id: "042-050" },
        { l: "Hydraulique Seringues", id: "051-057" },
        { l: "Électricité & Lumière", id: "058-066" },
        { l: "Robots & Automates", id: "067-076" },
        { l: "Sciences & Nature", id: "077-080" }
      ],
      mapBonus: "BONUS • 40 Inventions pour le Jardin & Plein Air",
      badge: "PETITS INVENTEURS • ÉD. 2026",
      projLabel: "PROJET",
      t1: "VOITURE", t2: "ÉLECTRIQUE",
      desc: "Une voiture avec vrai moteur : basculez l'interrupteur et elle s'élance seule.",
      sAge: "Âge : 7 à 12 ans",
      sTime: "Durée : 60 minutes",
      sLevel: "Niveau : Moyen",
      sAdult: "Parents : connexion fils",
      sTeach: "Apprend : circuits électriques",
      matBtn: "100% MATÉRIAUX DE LA MAISON"
    },
    p4: {
      leftTitle: "LA MÉTHODE EN 5 ÉTAPES",
      steps: [
        { n: "1 IMAGINER :", d: "que doit faire l'invention ?" },
        { n: "2 PLANIFIER :", d: "matériaux et mesures" },
        { n: "3 CONSTRUIRE :", d: "assembler pas à pas" },
        { n: "4 TESTER :", d: "est-ce que ça fonctionne ?" },
        { n: "5 AMÉLIORER :", d: "ajuster un détail et re-tester" }
      ],
      vertText: "L'erreur fait partie de l'invention !",
      bottomPill: "Chaque projet du livre vous guide dans ces 5 étapes",
      rightTitle: "PAR OÙ COMMENCER SELON L'ÂGE",
      ageGroups: ["5 À 7 ANS", "8 À 10 ANS", "11 À 13 ANS"],
      rightBottomPill: "Après ces 5 premiers projets, choisissez selon vos envies"
    },
    bonuses: [
      { t1: "PLAN D'INVENTEUR", t2: "SUR 7 JOURS", sub: "Une semaine, sept projets, un enfant passionné sans écran", pill: "DE ZÉRO À INVENTEUR EN UNE SEMAINE" },
      { t1: "PLAN DE ROBOTIQUE", t2: "MAISON 14 JOURS", sub: "Construisez, testez et perfectionnez pas à pas", pill: "DE L'IDÉE À VOTRE PREMIER ROBOT" },
      { t1: "GUIDE RAPIDE DE", t2: "RÉGLAGES & TESTS", sub: "Quand un rouage bloque : voici la solution minute", pill: "POUR QUE TOUS VOS PROJETS FONCTIONNENT" },
      { t1: "CHECKLIST DES", t2: "MATÉRIAUX MAISON", sub: "Tout ce que vous possédez déjà sans le savoir", pill: "RÉCUPÉRER, TRIER ET RANGER" },
      { t1: "40 INVENTIONS", t2: "POUR LE JARDIN", sub: "Circuits, sauvetages et défis en plein air", pill: "VOS 120 PROJETS AU COMPLET" }
    ]
  },
  it: {
    videoBadge: "10 video passo dopo passo",
    bonusWord: "BONUS",
    p1: {
      leftHead: "COME FUNZIONA • PROGETTO 069 • ROBOT CON PINZA",
      subHead: "COSA IMPARA TUO FIGLIO",
      b1: "Leve", b2: "Precisione", b3: "Pazienza", b4: "Creatività",
      dykTitle: "LO SAPEVI?",
      dykText: "I bracci a pantografo sono usati per sollevare piattaforme edili e carichi pesanti.",
      chalTitle: "SFIDA DA INVENTORE",
      c1: "5-7 anni: afferra un piccolo oggetto",
      c2: "8-10 anni: prendi un oggetto a 20 cm",
      c3: "11+ anni: aggiungi un modulo a X in più",
      famTitle: "MOMENTO IN FAMIGLIA:",
      famText: "riordinare i giocattoli solo con la pinza!",
      badge: "GIOVANI INVENTORI • ED. 2026",
      projLabel: "PROGETTO",
      t1: "GRU", t2: "IDRAULICA",
      desc: "Una gru di cartone il cui braccio si alza e si abbassa spinto dalla pressione dell'acqua.",
      sAge: "Età: 10 a 12 anni",
      sTime: "Tempo: 60 minuti",
      sLevel: "Livello: Medio",
      sAdult: "Genitori: caricare siringhe",
      sTeach: "Allena: pressione idraulica",
      matBtn: "100% MATERIALI DI CASA"
    },
    p2: {
      badge: "GIOVANI INVENTORI • ED. 2026",
      projLabel: "PROGETTO",
      t1: "MANO ROBOTICA", t2: "BIONICA",
      desc: "Mano articolata in cartone con tendini di spago: tiri e le dita si flettono come vere.",
      sAge: "Età: 7 a 12 anni",
      sTime: "Tempo: 40 minuti",
      sLevel: "Livello: Facile",
      sAdult: "Genitori: non necessario",
      sTeach: "Allena: anatomia umana",
      matBtn: "100% MATERIALI DI CASA",
      dipHead: "ATTESTATO UFFICIALE DEL CLUB DEGLI INVENTORI",
      dipTitle: "DIPLOMA DA<br>INVENTORE",
      dipAward: "Conferito a:",
      dipText: "per aver immaginato, costruito e collaudato le proprie invenzioni con le proprie mani.",
      dipDate: "Data",
      dipSign: "Firma"
    },
    p3: {
      mapTitle: "MAPPA DEI TUOI 120 PROGETTI",
      mapSub: "80 nel manuale + 40 nel bonus Giardino",
      cats: [
        { l: "Gru & Costruzioni", id: "001-014" },
        { l: "Veicoli & Gare", id: "015-023" },
        { l: "Aria, Acqua & Volo", id: "024-032" },
        { l: "Lanciatori & Giochi", id: "033-041" },
        { l: "Meccanismi & Camme", id: "042-050" },
        { l: "Idraulica a Siringhe", id: "051-057" },
        { l: "Elettricità & Luci", id: "058-066" },
        { l: "Robot & Meccanismi", id: "067-076" },
        { l: "Scienza & Scoperte", id: "077-080" }
      ],
      mapBonus: "BONUS • 40 Invenzioni per il Giardino & all'Aperto",
      badge: "GIOVANI INVENTORI • ED. 2026",
      projLabel: "PROGETTO",
      t1: "MACCHINA", t2: "ELETTRICA",
      desc: "Un'auto con motore vero: accendi l'interruttore e sfreccia per casa da sola.",
      sAge: "Età: 7 a 12 anni",
      sTime: "Tempo: 60 minuti",
      sLevel: "Livello: Medio",
      sAdult: "Genitori: fili elettrici",
      sTeach: "Allena: circuiti elettrici",
      matBtn: "100% MATERIALI DI CASA"
    },
    p4: {
      leftTitle: "IL METODO IN 5 PASSI",
      steps: [
        { n: "1 IMMAGINARE:", d: "cosa voglio che faccia?" },
        { n: "2 PIANIFICARE:", d: "materiali e misure" },
        { n: "3 COSTRUIRE:", d: "passo dopo passo" },
        { n: "4 COLLAUDO:", d: "funziona bene?" },
        { n: "5 MIGLIORARE:", d: "regola un dettaglio e riprova" }
      ],
      vertText: "Sbagliare fa parte dell'invenzione!",
      bottomPill: "Ogni progetto del libro ti guida in questi 5 passi",
      rightTitle: "DA DOVE INIZIARE IN BASE ALL'ETÀ",
      ageGroups: ["5 A 7 ANNI", "8 A 10 ANNI", "11 A 13 ANNI"],
      rightBottomPill: "Dopo questi 5 primi progetti, scegli quello che preferisci"
    },
    bonuses: [
      { t1: "PIANO INVENTORE", t2: "IN 7 GIORNI", sub: "Una settimana, 7 invenzioni, bambini concentrati senza schermi", pill: "DA ZERO A INVENTORE IN UNA SETTIMANA" },
      { t1: "PIANO DI ROBOTICA", t2: "IN 14 GIORNI", sub: "Costruisci, collauda e migliora passo dopo passo", pill: "DALL'IDEA AL TUO PRIMO ROBOT" },
      { t1: "GUIDA RAPIDA DI", t2: "TEST E CALIBRAZIONE", sub: "Quando un pezzo si blocca: ecco la soluzione immediata", pill: "PER FAR FUNZIONARE OGNI TUA INVENZIONE" },
      { t1: "CHECKLIST DEI", t2: "MATERIALI DI CASA", sub: "Tutto ciò che hai già a casa senza saperlo", pill: "RACCOGLI, SEPARA E CONSERVA" },
      { t1: "40 INVENZIONI", t2: "PER IL GIARDINO", sub: "Piste, salvataggi e sfide all'aperto", pill: "I TUOI 120 PROGETTI AL COMPLETO" }
    ]
  }
};

// HTML Generators for each image
function getHeroHtml(loc) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 768px; height: 683px; position: relative; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .base { position: absolute; top: 0; left: 0; width: 768px; height: 683px; }
  .video-seal {
    position: absolute;
    top: 0px;
    right: 80px;
    width: 190px;
    height: 25px;
    background: #1d4ed8;
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 10px 10px;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
</style>
</head>
<body>
  <img class="base" src="data:image/png;base64,${base64Src.hero}">
  <div class="video-seal">▶ ${loc.videoBadge}</div>
</body>
</html>`;
}

function getP1Html(loc) {
  const p = loc.p1;
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1024px; height: 682px; position: relative; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .base { position: absolute; top: 0; left: 0; width: 1024px; height: 682px; }
  .top-banner {
    position: absolute; top: 12px; left: 68px; width: 442px; height: 53px;
    background: #fed000; display: flex; align-items: center; justify-content: center;
    font-size: 13.5px; font-weight: 900; color: #111827; z-index: 10;
  }
  .subhead {
    position: absolute; top: 86px; left: 300px; width: 198px; height: 26px;
    background: #fdfbf7; display: flex; align-items: center; justify-content: center;
    font-size: 13.5px; font-weight: 900; color: #0c1b33; z-index: 10;
  }
  .ben1 { position: absolute; top: 215px; left: 300px; width: 88px; height: 20px; background: #fff; font-size: 12px; font-weight: 800; color: #0c1b33; display: flex; align-items: center; justify-content: center; z-index: 10; }
  .ben2 { position: absolute; top: 215px; left: 405px; width: 88px; height: 20px; background: #fff; font-size: 12px; font-weight: 800; color: #0c1b33; display: flex; align-items: center; justify-content: center; z-index: 10; }
  .ben3 { position: absolute; top: 345px; left: 300px; width: 88px; height: 20px; background: #fff; font-size: 12px; font-weight: 800; color: #0c1b33; display: flex; align-items: center; justify-content: center; z-index: 10; }
  .ben4 { position: absolute; top: 345px; left: 405px; width: 88px; height: 20px; background: #fff; font-size: 12px; font-weight: 800; color: #0c1b33; display: flex; align-items: center; justify-content: center; z-index: 10; }
  .dyk-box {
    position: absolute; top: 517px; left: 78px; width: 213px; height: 87px;
    background: #fff; border-radius: 6px; padding: 8px 10px; z-index: 10;
    display: flex; flex-direction: column; justify-content: center;
  }
  .dyk-box .h { font-size: 12px; font-weight: 900; color: #0c1b33; }
  .dyk-box .d { font-size: 10.5px; font-weight: 700; color: #334155; margin-top: 3px; line-height: 1.25; }
  .chal-box {
    position: absolute; top: 502px; left: 300px; width: 198px; height: 102px;
    background: #fff; border-radius: 6px; padding: 6px 8px; z-index: 10;
  }
  .chal-box .h { text-align: center; font-size: 11.5px; font-weight: 900; color: #0c1b33; margin-bottom: 3px; }
  .chal-box .l { font-size: 9.5px; font-weight: 700; color: #334155; padding: 2px 0; border-top: 1px solid #e2e8f0; }
  .fam-bar {
    position: absolute; top: 615px; left: 78px; width: 422px; height: 38px;
    background: #0c1b33; border-radius: 6px; display: flex; align-items: center; justify-content: center;
    color: #fed000; font-size: 11.5px; font-weight: 900; z-index: 10;
  }
  .fam-bar span { color: #fff; font-weight: 700; margin-left: 4px; }
  .r-card {
    position: absolute; top: 20px; left: 520px; width: 224px; height: 642px;
    background: #0c1b33; border-radius: 18px 0 0 18px; padding: 14px;
    display: flex; flex-direction: column; justify-content: space-between; z-index: 10;
  }
  .r-top { font-size: 9.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
  .r-circle {
    width: 78px; height: 78px; background: #fed000; border-radius: 50%;
    margin: 4px auto 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #0c1b33;
  }
  .r-circle .t1 { font-size: 9.5px; font-weight: 900; }
  .r-circle .t2 { font-size: 26px; font-weight: 900; line-height: 1; }
  .r-title h1 { font-size: 32px; font-weight: 900; color: #fff; line-height: 0.95; }
  .r-title h2 { font-size: 24px; font-weight: 900; color: #fed000; line-height: 0.95; margin-top: 2px; }
  .r-desc { font-size: 11px; color: #cbd5e1; line-height: 1.35; margin-top: 4px; font-weight: 500; }
  .r-specs { background: #0f1d38; border: 1px solid #1e3a6a; border-radius: 12px; padding: 8px 10px; display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
  .r-spec-row { display: flex; align-items: center; gap: 6px; font-size: 9.5px; font-weight: 700; color: #fff; }
  .r-btn { background: #00aa6c; border-radius: 999px; padding: 8px; text-align: center; color: #fff; font-size: 10px; font-weight: 900; }
</style>
</head>
<body>
  <img class="base" src="data:image/jpeg;base64,${base64Src.p1}">
  <div class="top-banner">${p.leftHead}</div>
  <div class="subhead">${p.subHead}</div>
  <div class="ben1">${p.b1}</div>
  <div class="ben2">${p.b2}</div>
  <div class="ben3">${p.b3}</div>
  <div class="ben4">${p.b4}</div>
  <div class="dyk-box">
    <div class="h">${p.dykTitle}</div>
    <div class="d">${p.dykText}</div>
  </div>
  <div class="chal-box">
    <div class="h">${p.chalTitle}</div>
    <div class="l">${p.c1}</div>
    <div class="l">${p.c2}</div>
    <div class="l">${p.c3}</div>
  </div>
  <div class="fam-bar">${p.famTitle} <span>${p.famText}</span></div>

  <div class="r-card">
    <div class="r-top">${p.badge}</div>
    <div class="r-circle">
      <span class="t1">${p.projLabel}</span>
      <span class="t2">052</span>
    </div>
    <div class="r-title">
      <h1>${p.t1}</h1>
      <h2>${p.t2}</h2>
    </div>
    <p class="r-desc">${p.desc}</p>
    <div class="r-specs">
      <div class="r-spec-row"><span>👶</span> <span>${p.sAge}</span></div>
      <div class="r-spec-row"><span>⏱️</span> <span>${p.sTime}</span></div>
      <div class="r-spec-row"><span>📊</span> <span>${p.sLevel}</span></div>
      <div class="r-spec-row"><span>👨‍👩‍👧</span> <span>${p.sAdult}</span></div>
      <div class="r-spec-row"><span>🧠</span> <span>${p.sTeach}</span></div>
    </div>
    <div class="r-btn">${p.matBtn}</div>
  </div>
</body>
</html>`;
}

function getP2Html(loc) {
  const p = loc.p2;
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1024px; height: 682px; position: relative; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .base { position: absolute; top: 0; left: 0; width: 1024px; height: 682px; }
  .left-card {
    position: absolute; top: 20px; left: 20px; width: 236px; height: 642px;
    background: #091428; border-radius: 18px 0 0 18px; padding: 16px 14px;
    display: flex; flex-direction: column; justify-content: space-between; z-index: 10;
  }
  .card-top { font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: 0.5px; text-transform: uppercase; }
  .proj-circle {
    width: 82px; height: 82px; background: #fed000; border-radius: 50%; margin: 6px auto 0 auto;
    display: flex; flex-direction: column; align-items: center; justify-content: center; color: #091428;
  }
  .proj-circle .t1 { font-size: 10px; font-weight: 900; }
  .proj-circle .t2 { font-size: 28px; font-weight: 900; line-height: 1; }
  .proj-title h1 { font-size: 34px; font-weight: 900; color: #fff; line-height: 0.95; }
  .proj-title h2 { font-size: 24px; font-weight: 900; color: #fed000; line-height: 0.95; margin-top: 2px; }
  .proj-desc { font-size: 11px; color: #cbd5e1; line-height: 1.35; margin-top: 5px; font-weight: 500; }
  .proj-specs { background: #0f1d38; border: 1px solid #1e3a6a; border-radius: 12px; padding: 9px; display: flex; flex-direction: column; gap: 6px; margin-top: 5px; }
  .spec-item { display: flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 700; color: #fff; }
  .proj-btn { background: #00aa6c; border-radius: 999px; padding: 9px; text-align: center; color: #fff; font-size: 10px; font-weight: 900; letter-spacing: 0.5px; }
  .diploma-card {
    position: absolute; top: 28px; left: 520px; width: 480px; height: 626px;
    background: #fff; border: 5px solid #fed000; border-radius: 14px; padding: 24px 28px;
    display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; z-index: 10;
  }
  .dip-badge { font-size: 11px; font-weight: 800; color: #475569; letter-spacing: 1px; text-transform: uppercase; }
  .dip-title { font-size: 38px; font-weight: 900; color: #0c1b33; line-height: 1.05; letter-spacing: 1px; margin-top: 6px; }
  .dip-awarded { font-size: 16px; font-weight: 700; color: #334155; margin-top: 14px; }
  .dip-line { width: 320px; height: 2px; background: #0c1b33; margin: 8px auto 14px auto; }
  .dip-text { font-size: 15px; font-weight: 600; color: #1e293b; max-width: 380px; line-height: 1.4; }
  .dip-seal {
    width: 105px; height: 105px; background: radial-gradient(circle, #fde047 0%, #ca8a04 100%);
    border-radius: 50%; border: 3px solid #fef08a; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 10px auto;
  }
  .dip-seal .s-icon { font-size: 30px; }
  .dip-seal .s-text { font-size: 8px; font-weight: 900; color: #713f12; letter-spacing: 1px; }
  .dip-footer { width: 100%; display: flex; justify-content: space-between; padding: 0 20px; margin-top: 6px; }
  .dip-sign-block { text-align: center; }
  .dip-sign-line { width: 120px; height: 1.5px; background: #0c1b33; margin-bottom: 4px; }
  .dip-sign-lbl { font-size: 12px; font-weight: 700; color: #475569; }
</style>
</head>
<body>
  <img class="base" src="data:image/jpeg;base64,${base64Src.p2}">
  <div class="left-card">
    <div class="card-top">${p.badge}</div>
    <div class="proj-circle">
      <span class="t1">${p.projLabel}</span>
      <span class="t2">070</span>
    </div>
    <div class="proj-title">
      <h1>${p.t1}</h1>
      <h2>${p.t2}</h2>
    </div>
    <p class="proj-desc">${p.desc}</p>
    <div class="proj-specs">
      <div class="spec-item"><span>👶</span> <span>${p.sAge}</span></div>
      <div class="spec-item"><span>⏱️</span> <span>${p.sTime}</span></div>
      <div class="spec-item"><span>📊</span> <span>${p.sLevel}</span></div>
      <div class="spec-item"><span>👨‍👩‍👧</span> <span>${p.sAdult}</span></div>
      <div class="spec-item"><span>🧠</span> <span>${p.sTeach}</span></div>
    </div>
    <div class="proj-btn">${p.matBtn}</div>
  </div>

  <div class="diploma-card">
    <div class="dip-badge">${p.dipHead}</div>
    <div class="dip-title">${p.dipTitle}</div>
    <div>
      <div class="dip-awarded">${p.dipAward}</div>
      <div class="dip-line"></div>
    </div>
    <div class="dip-text">${p.dipText}</div>
    <div class="dip-seal">
      <span class="s-icon">💡</span>
      <span class="s-text">STEM CLUB</span>
    </div>
    <div class="dip-footer">
      <div class="dip-sign-block">
        <div class="dip-sign-line"></div>
        <div class="dip-sign-lbl">${p.dipDate}</div>
      </div>
      <div class="dip-sign-block">
        <div class="dip-sign-line"></div>
        <div class="dip-sign-lbl">${p.dipSign}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function getP3Html(loc) {
  const p = loc.p3;
  const catsHtml = p.cats.map(c => `
    <div class="map-cell">
      <span class="map-tag">${c.l}</span>
      <span class="map-id">${c.id}</span>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1024px; height: 682px; position: relative; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .base { position: absolute; top: 0; left: 0; width: 1024px; height: 682px; }
  .map-card {
    position: absolute; top: 20px; left: 20px; width: 476px; height: 642px;
    background: #091428; border-radius: 18px; padding: 18px; border: 2px solid #1e3a6a;
    display: flex; flex-direction: column; justify-content: space-between; z-index: 10;
  }
  .map-title { font-size: 26px; font-weight: 900; color: #fed000; letter-spacing: 0.5px; line-height: 1.1; }
  .map-sub { font-size: 13.5px; font-weight: 800; color: #ffffff; margin-top: 3px; }
  .map-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 12px 0; flex: 1; }
  .map-cell {
    background: #0f1f3d; border: 1.5px solid #25447a; border-radius: 10px; padding: 8px 6px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
  }
  .map-tag { font-size: 11px; font-weight: 800; color: #fed000; line-height: 1.2; }
  .map-id { font-size: 9px; font-weight: 700; color: #94a3b8; margin-top: 3px; }
  .map-bonus-bar {
    background: #059669; border-radius: 10px; padding: 9px; text-align: center;
    color: #ffffff; font-size: 12px; font-weight: 900; letter-spacing: 0.5px;
  }
  .r-card {
    position: absolute; top: 20px; left: 512px; width: 230px; height: 642px;
    background: #091428; border-radius: 18px 0 0 18px; padding: 16px 14px;
    display: flex; flex-direction: column; justify-content: space-between; z-index: 10;
  }
  .r-top { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
  .r-circle {
    width: 82px; height: 82px; background: #fed000; border-radius: 50%; margin: 6px auto 0 auto;
    display: flex; flex-direction: column; align-items: center; justify-content: center; color: #091428;
  }
  .r-circle .t1 { font-size: 10px; font-weight: 900; }
  .r-circle .t2 { font-size: 28px; font-weight: 900; line-height: 1; }
  .r-title h1 { font-size: 30px; font-weight: 900; color: #fff; line-height: 0.95; }
  .r-title h2 { font-size: 24px; font-weight: 900; color: #fed000; line-height: 0.95; margin-top: 2px; }
  .r-desc { font-size: 11px; color: #cbd5e1; line-height: 1.35; margin-top: 5px; font-weight: 500; }
  .r-specs { background: #0f1d38; border: 1px solid #1e3a6a; border-radius: 12px; padding: 9px; display: flex; flex-direction: column; gap: 6px; margin-top: 5px; }
  .spec-item { display: flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 700; color: #fff; }
  .r-btn { background: #00aa6c; border-radius: 999px; padding: 9px; text-align: center; color: #fff; font-size: 10px; font-weight: 900; }
</style>
</head>
<body>
  <img class="base" src="data:image/jpeg;base64,${base64Src.p3}">
  <div class="map-card">
    <div>
      <div class="map-title">${p.mapTitle}</div>
      <div class="map-sub">${p.mapSub}</div>
    </div>
    <div class="map-grid">${catsHtml}</div>
    <div class="map-bonus-bar">${p.mapBonus}</div>
  </div>

  <div class="r-card">
    <div class="r-top">${p.badge}</div>
    <div class="r-circle">
      <span class="t1">${p.projLabel}</span>
      <span class="t2">019</span>
    </div>
    <div class="r-title">
      <h1>${p.t1}</h1>
      <h2>${p.t2}</h2>
    </div>
    <p class="r-desc">${p.desc}</p>
    <div class="r-specs">
      <div class="spec-item"><span>👶</span> <span>${p.sAge}</span></div>
      <div class="spec-item"><span>⏱️</span> <span>${p.sTime}</span></div>
      <div class="spec-item"><span>📊</span> <span>${p.sLevel}</span></div>
      <div class="spec-item"><span>👨‍👩‍👧</span> <span>${p.sAdult}</span></div>
      <div class="spec-item"><span>🧠</span> <span>${p.sTeach}</span></div>
    </div>
    <div class="r-btn">${p.matBtn}</div>
  </div>
</body>
</html>`;
}

function getP4Html(loc) {
  const p = loc.p4;
  const stepsHtml = p.steps.map(s => `
    <div class="step-item">
      <span class="s-n">${s.n}</span>
      <span class="s-d">${s.d}</span>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 768px; height: 512px; position: relative; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .base { position: absolute; top: 0; left: 0; width: 768px; height: 512px; }
  .l-head {
    position: absolute; top: 18px; left: 35px; width: 335px; height: 52px;
    background: #091428; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    color: #fed000; font-size: 15px; font-weight: 900; letter-spacing: 0.5px; text-align: center; z-index: 10;
  }
  .l-steps {
    position: absolute; top: 80px; left: 160px; width: 210px; height: 260px;
    display: flex; flex-direction: column; justify-content: space-between; z-index: 10;
  }
  .step-item { background: rgba(255,255,255,0.92); border-radius: 6px; padding: 4px 6px; }
  .s-n { font-size: 11px; font-weight: 900; color: #091428; display: block; }
  .s-d { font-size: 9.5px; font-weight: 600; color: #475569; }
  .l-pill {
    position: absolute; top: 460px; left: 30px; width: 345px; height: 28px;
    background: #059669; border-radius: 999px; display: flex; align-items: center; justify-content: center;
    color: #ffffff; font-size: 10px; font-weight: 800; z-index: 10; text-align: center;
  }
  .r-head {
    position: absolute; top: 18px; left: 400px; width: 335px; height: 52px;
    background: #091428; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    color: #fed000; font-size: 15px; font-weight: 900; letter-spacing: 0.5px; text-align: center; z-index: 10;
  }
  .age-b1 { position: absolute; top: 226px; left: 395px; width: 102px; height: 26px; background: #059669; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 10px; font-weight: 900; z-index: 10; }
  .age-b2 { position: absolute; top: 226px; left: 510px; width: 102px; height: 26px; background: #eab308; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 10px; font-weight: 900; z-index: 10; }
  .age-b3 { position: absolute; top: 226px; left: 625px; width: 102px; height: 26px; background: #2563eb; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 10px; font-weight: 900; z-index: 10; }
  .r-pill {
    position: absolute; top: 448px; left: 440px; width: 280px; height: 28px;
    background: #ffffff; border-radius: 999px; display: flex; align-items: center; justify-content: center;
    color: #091428; font-size: 9px; font-weight: 800; border: 1.5px solid #cbd5e1; z-index: 10; text-align: center;
  }
</style>
</head>
<body>
  <img class="base" src="data:image/png;base64,${base64Src.p4}">
  <div class="l-head">${p.leftTitle}</div>
  <div class="l-steps">${stepsHtml}</div>
  <div class="l-pill">${p.bottomPill}</div>

  <div class="r-head">${p.rightTitle}</div>
  <div class="age-b1">${p.ageGroups[0]}</div>
  <div class="age-b2">${p.ageGroups[1]}</div>
  <div class="age-b3">${p.ageGroups[2]}</div>
  <div class="r-pill">${p.rightBottomPill}</div>
</body>
</html>`;
}

function getBonusHtml(loc, idx) {
  const b = loc.bonuses[idx];
  const numStr = (idx + 1).toString().padStart(2, '0');
  const baseImg = base64Src[`b${idx + 1}`];

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1024px; height: 985px; position: relative; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .base { position: absolute; top: 0; left: 0; width: 1024px; height: 985px; }
  .top-banner {
    position: absolute; top: 25px; left: 360px; width: 304px; height: 52px;
    background: #eedefc; display: flex; align-items: center; justify-content: center;
    font-size: 38px; font-weight: 900; color: #111827; letter-spacing: 2px; z-index: 10;
  }
  .tablet-title {
    position: absolute; top: 152px; left: 386px; width: 252px; height: 98px;
    background: #0d172e; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; z-index: 10;
  }
  .tablet-title .t1 { font-size: 19px; font-weight: 900; color: #ffffff; line-height: 1.1; }
  .tablet-title .t2 { font-size: 20px; font-weight: 900; color: #fed000; line-height: 1.1; margin-top: 2px; }
  .tablet-sub {
    position: absolute; top: 250px; left: 388px; width: 248px; height: 35px;
    background: #0d172e; display: flex; align-items: center; justify-content: center; text-align: center;
    color: #e2e8f0; font-size: 10.5px; font-weight: 700; line-height: 1.2; z-index: 10;
  }
  .tablet-pill {
    position: absolute; top: 504px; left: 385px; width: 254px; height: 23px;
    background: #059669; border-radius: 999px; display: flex; align-items: center; justify-content: center;
    color: #ffffff; font-size: 9.5px; font-weight: 900; letter-spacing: 0.5px; z-index: 10; text-align: center;
  }
</style>
</head>
<body>
  <img class="base" src="data:image/jpeg;base64,${baseImg}">
  <div class="top-banner">${loc.bonusWord} ${numStr}</div>
  <div class="tablet-title">
    <div class="t1">${b.t1}</div>
    <div class="t2">${b.t2}</div>
  </div>
  <div class="tablet-sub">${b.sub}</div>
  <div class="tablet-pill">${b.pill}</div>
</body>
</html>`;
}

// Master rendering runner
async function renderAll() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const regions = [
    { code: 'en', dir: 'mega-inventors-us' },
    { code: 'de', dir: 'mega-inventors/regions/de' },
    { code: 'fr', dir: 'mega-inventors/regions/fr' },
    { code: 'it', dir: 'mega-inventors/regions/it' }
  ];

  for (const reg of regions) {
    const loc = translations[reg.code];
    const outDir = path.join('c:/Users/Star/Documents/espionagem1', reg.dir, 'public/assets');

    console.log(`\nRendering assets for [${reg.code.toUpperCase()}] -> ${outDir}`);

    // 1. Hero Mockup
    await page.setViewport({ width: 768, height: 683 });
    await page.setContent(getHeroHtml(loc), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    const heroOut = path.join(outDir, targetDestMap.hero);
    const heroAltOut = path.join(outDir, targetDestMap.heroAlt);
    await page.screenshot({ path: heroOut });
    fs.copyFileSync(heroOut, heroAltOut);
    console.log(` - Saved Hero Mockup: ${targetDestMap.hero}`);

    // 2. Project 1 (Crane & Gripper)
    await page.setViewport({ width: 1024, height: 682 });
    await page.setContent(getP1Html(loc), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.join(outDir, targetDestMap.p1) });
    console.log(` - Saved P1: ${targetDestMap.p1}`);

    // 3. Project 2 (Robotic Hand & Diploma)
    await page.setViewport({ width: 1024, height: 682 });
    await page.setContent(getP2Html(loc), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.join(outDir, targetDestMap.p2) });
    console.log(` - Saved P2: ${targetDestMap.p2}`);

    // 4. Project 3 (Map & Electric Car)
    await page.setViewport({ width: 1024, height: 682 });
    await page.setContent(getP3Html(loc), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.join(outDir, targetDestMap.p3) });
    console.log(` - Saved P3: ${targetDestMap.p3}`);

    // 5. Project 4 (5 Steps & Ages)
    await page.setViewport({ width: 768, height: 512 });
    await page.setContent(getP4Html(loc), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.join(outDir, targetDestMap.p4) });
    console.log(` - Saved P4: ${targetDestMap.p4}`);

    // 6-10. Bonuses 1 to 5
    await page.setViewport({ width: 1024, height: 985 });
    for (let i = 0; i < 5; i++) {
      const bHtml = getBonusHtml(loc, i);
      await page.setContent(bHtml, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 200));
      const bKey = `b${i + 1}`;
      await page.screenshot({ path: path.join(outDir, targetDestMap[bKey]) });
      console.log(` - Saved ${bKey.toUpperCase()}: ${targetDestMap[bKey]}`);
    }
  }

  await browser.close();
  console.log('\nAll images rendered and synchronized for EN, DE, FR, IT!');
}

renderAll().catch(err => {
  console.error('Fatal render error:', err);
  process.exit(1);
});
