import fs from 'fs';

const usHtml = fs.readFileSync('c:/Users/Star/Documents/espionagem1/mega-inventors-us/public/index.html', 'utf8');

// Find start of the section that replaced visual projects
console.log('Search for curriculum overview:');
const startIdx = usHtml.indexOf('<!-- THE 6 PROGRESSIVE MODULES');
const endIdx = usHtml.indexOf('<!-- PROVA SOCIAL', startIdx > -1 ? startIdx : 0);
const altEndIdx = usHtml.indexOf('<!-- SOCIAL PROOF', startIdx > -1 ? startIdx : 0);

console.log('startIdx:', startIdx);
console.log('endIdx:', endIdx, 'altEndIdx:', altEndIdx);

const finalEnd = endIdx !== -1 ? endIdx : altEndIdx;
if (startIdx !== -1 && finalEnd !== -1) {
  console.log('Replaced block length:', finalEnd - startIdx);
  console.log('First 200 chars:\n', usHtml.substring(startIdx, startIdx + 200));
  console.log('Last 200 chars:\n', usHtml.substring(finalEnd - 200, finalEnd));
}
