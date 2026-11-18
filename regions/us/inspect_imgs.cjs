const fs = require('fs');

const indexHtml = fs.readFileSync('mega-inventors/regions/us/public/index.html', 'utf8');
const imgs = [...indexHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
const unique = [...new Set(imgs)];
console.log('Unique images in index.html (' + unique.length + '):');
unique.forEach(img => {
  const exists = fs.existsSync('mega-inventors/regions/us/public/' + img);
  console.log(img, exists ? 'EXISTS' : 'MISSING');
});
