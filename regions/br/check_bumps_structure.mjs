import fs from 'fs';

const bumpsCode = fs.readFileSync('mega-inventores/scripts/generate_all_bonuses_and_bumps.js', 'utf8');
console.log('generate_all_bonuses_and_bumps.js len:', bumpsCode.length);
const idxBumps = bumpsCode.indexOf('bumps = [');
if (idxBumps !== -1) {
  console.log(bumpsCode.substring(idxBumps, idxBumps + 2000));
}
