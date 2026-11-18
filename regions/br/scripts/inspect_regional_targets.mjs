import fs from 'fs';

const targets = [
  { lang: 'en', path: 'mega-inventors-us/public/index.html' },
  { lang: 'de', path: 'mega-inventors/regions/de/public/index.html' },
  { lang: 'fr', path: 'mega-inventors/regions/fr/public/index.html' },
  { lang: 'it', path: 'mega-inventors/regions/it/public/index.html' },
  { lang: 'es', path: 'mega-inventors/regions/es/public/index.html' },
];

targets.forEach(t => {
  const full = 'c:/Users/Star/Documents/espionagem1/' + t.path;
  const content = fs.readFileSync(full, 'utf8');
  console.log(`=== ${t.lang.toUpperCase()} (${t.path}) ===`);
  const secComments = [...content.matchAll(/<!--\s*([A-Z0-9\s:_\(\)\-\?\.&]+)\s*-->/g)].map(m => m[1].trim());
  console.log(secComments.slice(0, 15));
});
