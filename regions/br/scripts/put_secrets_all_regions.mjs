import fs from 'fs';
import { execSync } from 'child_process';

const env = fs.readFileSync('c:/Users/Star/Documents/espionagem1/mega-inventors-us/.env', 'utf8');
let secretKey = '';
env.split('\n').forEach(line => {
  if (line.startsWith('STRIPE_SECRET_KEY=')) {
    secretKey = line.split('=')[1].trim().replace(/^['"]|['"]$/g, '');
  }
});

console.log('Secret key ready, length:', secretKey.length, 'prefix:', secretKey.substring(0, 8));

const targets = ['mega-inventors-de', 'mega-inventors-fr', 'mega-inventors-it', 'mega-inventors-es'];

targets.forEach(name => {
  console.log(`Setting STRIPE_SECRET_KEY for ${name}...`);
  try {
    const res = execSync(`echo ${secretKey} | npx wrangler secret put STRIPE_SECRET_KEY --name ${name}`, {
      encoding: 'utf8',
      cwd: 'c:/Users/Star/Documents/espionagem1/mega-inventores'
    });
    console.log(`✓ ${name}:`, res.trim());
  } catch (err) {
    console.error(`✗ ${name} failed:`, err.message);
  }
});
