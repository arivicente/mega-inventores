import fs from 'fs';

['en', 'de', 'fr', 'it', 'es'].forEach(lang => {
  const p = lang === 'en' 
    ? 'c:/Users/Star/Documents/espionagem1/mega-inventors-us/public/index.html'
    : `c:/Users/Star/Documents/espionagem1/mega-inventors/regions/${lang}/public/index.html`;
  const c = fs.readFileSync(p, 'utf8');
  const matches = [...c.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log(`[${lang}] total images: ${matches.length}`);
  matches.forEach(m => console.log('  -', m));
});
