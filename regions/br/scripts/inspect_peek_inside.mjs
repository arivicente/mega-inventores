import fs from 'fs';

const html = fs.readFileSync('c:/Users/Star/Documents/espionagem1/mega-inventors-us/public/index.html', 'utf8');

const sIdx = html.indexOf('<!-- PEEK INSIDE');
const eIdx = html.indexOf('<!-- COMPARISON TABLE');

console.log(html.substring(sIdx, eIdx));
