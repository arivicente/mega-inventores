import fs from 'fs';

const code = fs.readFileSync('scripts/generate_full_catalog.js', 'utf8');
const lines = code.split('\n');
console.log('Total lines:', lines.length);
// print module titles
lines.forEach((l, i) => {
  if (l.includes('name: "Módulo')) console.log(`Line ${i}: ${l.trim()}`);
});
