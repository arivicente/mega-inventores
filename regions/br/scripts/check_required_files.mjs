import fs from 'fs';

const requiredFiles = [
  'mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png',
  'duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png',
  'dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png',
  'mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png',
  'duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png',
  'composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png',
  'plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png',
  'bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png',
  'bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png',
  'bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png',
  'garantia-YrDNbk5xkXtbRqee.png'
];

const dirs = [
  'mega-inventors-us/public/assets',
  'mega-inventors/regions/de/public/assets',
  'mega-inventors/regions/fr/public/assets',
  'mega-inventors/regions/it/public/assets',
  'mega-inventors/regions/es/public/assets'
];

dirs.forEach(d => {
  const full = 'c:/Users/Star/Documents/espionagem1/' + d;
  const missing = requiredFiles.filter(f => !fs.existsSync(`${full}/${f}`));
  console.log(d, 'missing:', missing.length === 0 ? 'NONE! ALL PRESENT' : missing);
});
