import fs from 'fs';

const brHtml = fs.readFileSync('c:/Users/Star/Documents/espionagem1/mega-inventores/public/index.html', 'utf8');

const sections = [...brHtml.matchAll(/<!-- (.*?) -->/g)].map(m => m[1]);
console.log('BR sections:\n', sections);
