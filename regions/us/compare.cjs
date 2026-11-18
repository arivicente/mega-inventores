const fs = require('fs');

const indexHtml = fs.readFileSync('mega-inventors/regions/us/public/index.html', 'utf8');
const esHtml = fs.readFileSync('mega-inventors/regions/us/public/es.html', 'utf8');

console.log('--- INDEX.HTML (US) ---');
console.log('Length:', indexHtml.length);
const indexTw = indexHtml.match(/tailwind\.config\s*=\s*\{[\s\S]*?\}\s*;/);
console.log('Tailwind config:\n', indexTw ? indexTw[0] : 'None');

console.log('\n--- ES.HTML (CURRENT) ---');
console.log('Length:', esHtml.length);
const esTw = esHtml.match(/tailwind\.config\s*=\s*\{[\s\S]*?\}\s*;/);
console.log('Tailwind config:\n', esTw ? esTw[0] : 'None');
