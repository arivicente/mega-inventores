import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

// Load .env
const env = {};
const envLines = fs.readFileSync('mega-inventores/.env', 'utf8').split('\n');
for (const line of envLines) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) env[m[1]] = m[2].trim();
}

const token = env.META_ACCESS_TOKEN;
const actId = env.META_AD_ACCOUNT_ID; // act_898705452000785
const pageId = env.META_PAGE_ID; // 1407050532499881 (Mega Inventores)
const pixelId = env.META_PIXEL_ID; // 1864964467859741 (Mega Inventores - Pixel Oficial)
const destinationUrl = 'https://mega-inventores.codhun.workers.dev/';

console.log("=== SCRIPT DE SUBIDA DA CAMPANHA META ADS ===");
console.log(`Conta: ${actId}`);
console.log(`Página: ${pageId}`);
console.log(`Pixel: ${pixelId}`);
console.log(`URL de Destino: ${destinationUrl}`);

// Configuração dos 5 Anúncios
const adsConfig = [
  {
    num: "01",
    name: "Anúncio 01 - Telas vs Curiosidade (Portão & Robô)",
    videoFile: "ad_01_modelado_br.mp4",
    title: "120 Projetos de Robótica com Sucata",
    message: "📱 Seu filho passa horas grudado no celular?\n\nTroque as telas por algo que devolva o brilho nos olhos dele! Com o Mega Pack de Inventores, ele constrói seu primeiro robô com as próprias mãos usando papelão e o que já tem em casa.\n\n🤖 Mais de 120 projetos ilustrados passo a passo com vídeos práticos.\n\nClique em 'Saiba Mais' e garanta o Mega Pack com 62% OFF e 5 Super Bônus por apenas R$ 37,00."
  },
  {
    num: "02",
    name: "Anúncio 02 - Robôs Articulados & Engenharia Caseira",
    videoFile: "ad_02_modelado_br.mp4",
    title: "Robôs que Andam de Verdade com Papelão",
    message: "🤖 Veja esse robô articulado feito inteiramente com caixa de papelão e materiais de casa!\n\nO Mega Pack de Inventores ensina crianças de 5 a 12 anos a construir brinquedos que andam, se movem e funcionam de verdade.\n\n✨ Estimula o foco, raciocínio lógico e pura criatividade longe das telas.\n\nAcesso vitalício imediato no seu e-mail por apenas R$ 37,00 com garantia incondicional de 7 dias."
  },
  {
    num: "03",
    name: "Anúncio 03 - Conexão Pai & Filho Sem Telas",
    videoFile: "ad_03_modelado_br.mp4",
    title: "Momentos Mágicos em Família Longe das Telas",
    message: "❤️ Chega de ver as crianças hipnotizadas no celular o dia todo.\n\nCom uma caixa de sapatos, tesoura e cola, vocês constroem projetos incríveis de engenharia e robótica juntos na mesa da cozinha.\n\n📦 São mais de 120 inventos práticos para imprimir e montar.\n\nClique em 'Saiba Mais' e aproveite a oferta especial de lançamento por R$ 37,00 com 5 super bônus inclusos."
  },
  {
    num: "04",
    name: "Anúncio 04 - Oficina com Recicláveis & 120 Projetos",
    videoFile: "ad_04_modelado_br.mp4",
    title: "Transforme Recicláveis em Robôs Incríveis",
    message: "💡 Você não precisa comprar brinquedos caros de tecnologia.\n\nCom o Mega Pack de Inventores, seu filho aprende conceitos reais de física e robótica construindo engenhocas com materiais recicláveis.\n\n🚀 Desenvolve a coordenação motora, foco e autonomia.\n\nToque em 'Saiba Mais' e baixe agora por apenas R$ 37,00 com acesso vitalício."
  },
  {
    num: "05",
    name: "Anúncio 05 - Dinâmico 18s (Não é só Brincar)",
    videoFile: "ad_05_modelado_br.mp4",
    title: "Não é Só Brincar, é Construir o Futuro Dele!",
    message: "🚀 Não é apenas uma brincadeira: é o futuro do seu filho ganhando vida!\n\nMais de 120 projetos de robótica e ciência para montar em casa com papelão e recicláveis. Brinquedos que andam e funcionam de verdade!\n\nHoje com 62% de desconto por apenas R$ 37,00 + 5 bônus de presente.\n\nToque em 'Saiba Mais' e receba o acesso imediato no seu e-mail."
  }
];

export { adsConfig, token, actId, pageId, pixelId, destinationUrl };
