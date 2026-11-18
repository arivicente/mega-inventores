import fs from 'fs';

const brHtml = fs.readFileSync('c:/Users/Star/Documents/espionagem1/mega-inventores/public/index.html', 'utf8');
const lines = brHtml.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('<img') || l.includes('assets/')) {
    console.log(`L${idx+1}: ${l.trim()}`);
  }
});
