import fs from 'fs';

const regions = ['de', 'fr', 'it', 'es'];

regions.forEach(r => {
  const path = `c:/Users/Star/Documents/espionagem1/mega-inventors/regions/${r}/public/index.html`;
  const html = fs.readFileSync(path, 'utf8');
  console.log(`Region: ${r}`);
  console.log('has PEEK INSIDE:', html.includes('PEEK INSIDE'));
  console.log('has MODULES:', html.includes('MODULES'));
  console.log('has COMPARISON TABLE:', html.includes('COMPARISON TABLE'));
});
