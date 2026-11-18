import fs from 'fs';
import path from 'path';

// Let's inspect frames 01, 10, 28, 31, 34
const framesDir = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'mapa_cenas');
console.log("Arquivos disponíveis:", fs.readdirSync(framesDir));
