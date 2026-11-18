import fs from 'fs';
['de', 'fr', 'it', 'es'].forEach(lang => {
  const p = `c:/Users/Star/Documents/espionagem1/mega-inventors/regions/${lang}/public/index.html`;
  const c = fs.readFileSync(p, 'utf8');
  console.log(lang, 'bumps:', (c.match(/order-bump-card/g) || []).length);
});
