const fs = require('fs');

const indexHtml = fs.readFileSync('mega-inventors/regions/us/public/index.html', 'utf8');
const esHtml = fs.readFileSync('mega-inventors/regions/us/public/es.html', 'utf8');

console.log('--- INDEX.HTML (US) ---');
console.log('Length:', indexHtml.length);
console.log('Tailwind config match:', indexHtml.match(/tailwind\.config\s*=\s*\{[\s\S]*?\}\s*;/)?.[0]?.slice(0, 300));

console.log('\n--- ES.HTML (CURRENT) ---');
console.log('Length:', esHtml.length);
console.log('Tailwind config match:', esHtml.match(/tailwind\.config\s*=\s*\{[\s\S]*?\}\s*;/)?.[0]?.slice(0, 300));
