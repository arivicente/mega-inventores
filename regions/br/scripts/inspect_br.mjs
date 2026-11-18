import fs from 'fs';
const html = fs.readFileSync('c:/Users/Star/Documents/espionagem1/mega-inventores/public/index.html', 'utf8');
const imgs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('BR total images:', imgs.length);
imgs.forEach(i => console.log(' - ' + i));
