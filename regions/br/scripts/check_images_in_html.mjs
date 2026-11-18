import fs from 'fs';

const files = [
  'mega-inventors-us/public/index.html',
  'mega-inventors/regions/de/public/index.html',
  'mega-inventors/regions/fr/public/index.html',
  'mega-inventors/regions/it/public/index.html',
  'mega-inventors/regions/es/public/index.html'
];

files.forEach(f => {
  const p = 'c:/Users/Star/Documents/espionagem1/' + f;
  const content = fs.readFileSync(p, 'utf8');
  console.log(f, 'has garantia img:', content.includes('garantia-YrDNbk5xkXtbRqee.png'));
  console.log(f, 'has hero mockup:', content.includes('mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png') || content.includes('mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png'));
});
