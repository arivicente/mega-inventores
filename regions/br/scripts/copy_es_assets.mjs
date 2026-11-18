import fs from 'fs';
import path from 'path';

const upDir = 'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/.user_uploaded/';
const esDir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/es/public/assets/';

const mapping = [
  { up: 'media_1794262837527_29f12679.png', dest: 'mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png' },
  { up: 'media_1794262837527_29f12679.png', dest: 'mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png' },
  { up: 'media_1794262843462_fd0c90e9.jpg', dest: 'duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png' },
  { up: 'media_1794262846206_b295d718.jpg', dest: 'dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png' },
  { up: 'media_1794262849642_1b6f0b7c.jpg', dest: 'mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png' },
  { up: 'media_1794262853322_f19f3cce.png', dest: 'duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png' },
  { up: 'media_1794262886323_2f0b934a.jpg', dest: 'composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png' },
  { up: 'media_1794262889893_a5259642.jpg', dest: 'plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png' },
  { up: 'media_1794262892524_c160cf37.jpg', dest: 'bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png' },
  { up: 'media_1794262894510_469cf8f9.jpg', dest: 'bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png' },
  { up: 'media_1794262896503_4732c64a.jpg', dest: 'bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png' }
];

mapping.forEach(m => {
  const src = path.join(upDir, m.up);
  const dst = path.join(esDir, m.dest);
  fs.copyFileSync(src, dst);
  console.log(`Copied ${m.up} -> ES:${m.dest}`);
});
console.log('ES assets updated successfully!');
