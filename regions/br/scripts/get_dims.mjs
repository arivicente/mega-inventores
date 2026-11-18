import fs from 'fs';

function getPngDimensions(buf) {
  if (buf.toString('ascii', 12, 16) === 'IHDR') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return null;
}

function getJpgDimensions(buf) {
  for (let i = 0; i < buf.length - 8; i++) {
    if (buf[i] === 0xFF && (buf[i+1] === 0xC0 || buf[i+1] === 0xC2)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
  }
  return null;
}

function getDim(filepath) {
  const buf = fs.readFileSync(filepath);
  if (filepath.endsWith('.png')) return getPngDimensions(buf);
  return getJpgDimensions(buf);
}

const uploads = {
  hero: 'media_1794262837527_29f12679.png',
  p1: 'media_1794262843462_fd0c90e9.jpg',
  p2: 'media_1794262846206_b295d718.jpg',
  p3: 'media_1794262849642_1b6f0b7c.jpg',
  p4: 'media_1794262853322_f19f3cce.png',
  b1: 'media_1794262886323_2f0b934a.jpg',
  b2: 'media_1794262889893_a5259642.jpg',
  b3: 'media_1794262892524_c160cf37.jpg',
  b4: 'media_1794262894510_469cf8f9.jpg',
  b5: 'media_1794262896503_4732c64a.jpg'
};

const brDir = 'c:/Users/Star/Documents/espionagem1/mega-inventores/public/assets/';
const upDir = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/.user_uploaded/';

const brAssets = {
  hero: 'mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png',
  p1: 'duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png',
  p2: 'dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png',
  p3: 'mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png',
  p4: 'duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png',
  b1: 'composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png',
  b2: 'plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png',
  b3: 'bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png',
  b4: 'bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png',
  b5: 'bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png'
};

for (const k of Object.keys(uploads)) {
  const upDim = getDim(upDir + uploads[k]);
  const brDim = getDim(brDir + brAssets[k]);
  console.log(`${k}: upload=${JSON.stringify(upDim)}, br=${JSON.stringify(brDim)}`);
}
