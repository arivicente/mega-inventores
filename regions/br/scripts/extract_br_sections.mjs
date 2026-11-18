import fs from 'fs';

const brHtml = fs.readFileSync('c:/Users/Star/Documents/espionagem1/mega-inventores/public/index.html', 'utf8');

const s4Start = brHtml.indexOf('<!-- O QUE É O MEGA PACK: PROVA VISUAL DOS 120 PROJETOS -->');
const s6Start = brHtml.indexOf('<!-- PROVA SOCIAL BRASILEIRA 100% NATIVA');

console.log('--- SECTIONS 4 & 5 FROM BR ---');
console.log(brHtml.substring(s4Start, s6Start));
