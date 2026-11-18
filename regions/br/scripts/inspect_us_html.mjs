import fs from 'fs';

const html = fs.readFileSync('c:/Users/Star/Documents/espionagem1/mega-inventors-us/public/index.html', 'utf8');
const match = html.match(/<section[\s\S]*?id="checkout"/);
const imgs = [...match[0].matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Hero and body images before checkout:', imgs);
