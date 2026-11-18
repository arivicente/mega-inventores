import fs from 'fs';

const pages = [
  'c:/Users/Star/Documents/espionagem1/mega-inventores/public/index.html',
  'c:/Users/Star/Documents/espionagem1/mega-inventors-us/public/index.html',
  'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/de/public/index.html'
];

pages.forEach(p => {
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    const matches = [...c.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
    console.log(`\n=== Images in ${p} ===`);
    matches.forEach(m => console.log(m[0]));
  }
});
