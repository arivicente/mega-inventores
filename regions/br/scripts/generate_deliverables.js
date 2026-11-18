import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const puppeteer = require('../../kit-pastoral/node_modules/puppeteer');

const downloadsDir = path.resolve('mega-inventores', 'public', 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

function createPdfHtml(title, subtitle, badge, contentHtml) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: A4; margin: 1.5cm; }
    body { font-family: sans-serif; color: #1e293b; margin: 0; padding: 0; line-height: 1.5; font-size: 13px; }
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 90vh;
      border: 8px solid #2563eb;
      border-radius: 24px;
      padding: 40px;
      background: #f8fafc;
    }
    .badge {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      font-weight: 800;
      font-size: 11px;
      padding: 6px 16px;
      border-radius: 50px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }
    .cover-title {
      font-size: 36px;
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 12px;
      color: #1e3a8a;
    }
    .cover-sub {
      font-size: 16px;
      color: #475569;
      max-width: 480px;
      margin-bottom: 30px;
    }
    .cover-seal {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #f59e0b;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: 900;
      font-size: 14px;
      margin-top: 20px;
    }
    .card-project {
      page-break-inside: avoid;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .proj-title { font-size: 18px; font-weight: 800; color: #1e40af; margin-bottom: 8px; }
    .proj-meta { display: flex; gap: 12px; margin-bottom: 12px; font-size: 11px; font-weight: 700; color: #64748b; }
    .meta-tag { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; }
    .step-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 10px 14px; margin-bottom: 8px; }
    .step-num { font-weight: 800; color: #2563eb; }
    .science-explain { background: #fef3c7; border: 1px solid #fde68a; border-radius: 10px; padding: 10px 14px; margin-top: 12px; font-size: 12px; color: #92400e; }
  </style>
</head>
<body>
  <div class="cover-page">
    <div class="badge">${badge}</div>
    <div class="cover-title">${title}</div>
    <div class="cover-sub">${subtitle}</div>
    <div class="cover-seal">
      <span>100%</span>
      <span>PRÁTICO</span>
    </div>
    <p style="margin-top: 40px; font-size: 11px; color: #94a3b8;">Oficina do Pequeno Inventor · Edição 2026</p>
  </div>

  <div class="content">
    ${contentHtml}
  </div>
</body>
</html>`;
}

async function buildAllPdfs() {
  console.log("Iniciando Puppeteer...");
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // 1. MEGA PACK 120 PROJETOS
  console.log("Gerando PDF 1: Mega Pack 120 Projetos...");
  const projContent = `
    <h2 style="font-size: 22px; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 20px;">Módulo 1: Robótica & Mecânica de Papelão</h2>
    
    <div class="card-project">
      <div class="proj-title">🦾 Projeto 01: Garra Mecânica Articulada Biônica</div>
      <div class="proj-meta">
        <span class="meta-tag">⏱️ 30 Minutos</span>
        <span class="meta-tag">👶 Nível: Fácil (5-9 anos)</span>
        <span class="meta-tag">📦 Material: Papelão, Barbante e Canudos</span>
      </div>
      <p>Construa uma mão articulada que simula tendões mecânicos e consegue agarrar pequenos brinquedos ao puxar os anéis.</p>
      <div class="step-box"><span class="step-num">Passo 1:</span> Coloque a mão da criança sobre o papelão, trace o contorno e recorte deixando as pontas retas.</div>
      <div class="step-box"><span class="step-num">Passo 2:</span> Dobre o papelão nos pontos exatos das articulações dos nós dos dedos.</div>
      <div class="step-box"><span class="step-num">Passo 3:</span> Cole pequenos pedaços de canudo em cada falange e passe o barbante por dentro até a ponta de cada dedo.</div>
      <div class="step-box"><span class="step-num">Passo 4:</span> Amarre argolas nas pontas dos barbantes e teste a pegada.</div>
      <div class="science-explain"><strong>🔬 Como funciona a ciência:</strong> Alavancas de 3ª classe convertendo tração linear em flexão angular. O princípio básico da mecatrônica!</div>
    </div>

    <div class="card-project">
      <div class="proj-title">🏗️ Projeto 02: Guindaste de Polias com Trava Mecânica</div>
      <div class="proj-meta">
        <span class="meta-tag">⏱️ 45 Minutos</span>
        <span class="meta-tag">👶 Nível: Médio (7-12 anos)</span>
        <span class="meta-tag">📦 Material: Caixa de sapatos, carretel de linha e clipes</span>
      </div>
      <p>Um guindaste rotativo com manivela capaz de erguer blocos de montar e carrinhos com trava automática.</p>
      <div class="step-box"><span class="step-num">Passo 1:</span> Monte a torre triangular de papelão com base alargada para estabilidade.</div>
      <div class="step-box"><span class="step-num">Passo 2:</span> Fure o topo e atravesse um palito com o carretel servindo de roldana móvel.</div>
      <div class="step-box"><span class="step-num">Passo 3:</span> Instale a manivela na base com trava de clipe.</div>
      <div class="science-explain"><strong>🔬 Como funciona a ciência:</strong> Vantagem mecânica de roldanas e sistema de catraca para conservação de energia.</div>
    </div>

    <div class="card-project">
      <div class="proj-title">🏎️ Projeto 03: Super Carro Turbo a Propulsão Pneumática</div>
      <div class="proj-meta">
        <span class="meta-tag">⏱️ 20 Minutos</span>
        <span class="meta-tag">👶 Nível: Super Fácil (5-10 anos)</span>
        <span class="meta-tag">📦 Material: 4 Tampinhas, Palitos, Bexiga e Caixa de leite</span>
      </div>
      <p>Ao inflar a bexiga pelo bocal, ele dispara a toda velocidade através da sala.</p>
      <div class="step-box"><span class="step-num">Passo 1:</span> Fure as tampinhas e fixe-as nas pontas dos eixos para girarem livres.</div>
      <div class="step-box"><span class="step-num">Passo 2:</span> Fixe um canudo com a bexiga amarrada por elástico na parte superior.</div>
      <div class="step-box"><span class="step-num">Passo 3:</span> Encha a bexiga, solte no chão liso e divirta-se!</div>
      <div class="science-explain"><strong>🔬 Como funciona a ciência:</strong> 3ª Lei de Newton (Ação e Reação) — o ar expelido gera propulsão para a frente.</div>
    </div>
  `;

  const html1 = createPdfHtml(
    "Mega Pack de Inventores",
    "120 Projetos Passo a Passo de Robótica, Ciência & Mecânica Prática com Materiais Recicláveis",
    "Manual Oficial de Instruções",
    projContent
  );

  await page.setContent(html1, { waitUntil: 'domcontentloaded' });
  await page.pdf({
    path: path.join(downloadsDir, 'mega_pack_120_projetos.pdf'),
    format: 'A4',
    printBackground: true
  });
  console.log("✅ PDF 1 gerado!");

  // 2. PACOTE 5 SUPER BÔNUS
  console.log("Gerando PDF 2: Pacote 5 Super Bônus...");
  const bonusContent = `
    <h2 style="font-size: 22px; border-bottom: 2px solid #f59e0b; padding-bottom: 8px; margin-bottom: 20px;">Coleção de Bônus de Lançamento</h2>

    <div class="card-project">
      <div class="proj-title">📅 Bônus 1: Desafio dos 7 Dias de Invenções</div>
      <p><strong>Dia 1:</strong> Laboratório na Caixa (organizador de tampas e ferramentas).<br>
         <strong>Dia 2:</strong> Catapulta de Colher e Elástico com alvo de pontos.<br>
         <strong>Dia 3:</strong> Submarino na Garrafa PET (Princípio de Pascal).<br>
         <strong>Dia 4:</strong> Periscópio Espião com 2 Espelhos e Caixa de Leite.<br>
         <strong>Dia 5:</strong> Mão Mecânica de Pegada Rápida.<br>
         <strong>Dia 6:</strong> Mini Pista de Bolinhas de Gude com Tubos.<br>
         <strong>Dia 7:</strong> Grande Feira de Invenções em Família com Entrega do Diploma.</p>
    </div>

    <div class="card-project">
      <div class="proj-title">🛠️ Bônus 3: Guia Rápido de Solução de Problemas</div>
      <p><strong>"A roda do carro derrapa e não anda":</strong> Envolva a tampinha com um elástico para criar aderência com o piso.<br>
         <strong>"A alavanca do guindaste dobrou":</strong> Cole duas tiras de papelão com as ondas cruzadas (3x mais resistente).<br>
         <strong>"A cola soltou no plástico":</strong> Lixe levemente o plástico com uma lixa de unha antes de colar.</p>
    </div>

    <div class="card-project">
      <div class="proj-title">🌲 Bônus 5: 40 Projetos ao Ar Livre & Quintal</div>
      <p>Foguete de Vinagre e Bicarbonato (sobe até 8 metros!), Anemômetro para medir vento e Bússola Caseira.</p>
    </div>
  `;

  const html2 = createPdfHtml(
    "Pacote 5 Super Bônus",
    "Desafio 7 Dias, Plano de Robótica 14 Dias, Guia de Ajustes Rápidos & Projetos no Quintal",
    "Bônus Exclusivos de Lançamento",
    bonusContent
  );

  await page.setContent(html2, { waitUntil: 'domcontentloaded' });
  await page.pdf({
    path: path.join(downloadsDir, 'pacote_5_super_bonus.pdf'),
    format: 'A4',
    printBackground: true
  });
  console.log("✅ PDF 2 gerado!");

  // 3. EXTRAS & EXPERIMENTOS
  console.log("Gerando PDF 3: Robótica com Movimento & Cientistas na Cozinha...");
  const extrasContent = `
    <h2 style="font-size: 22px; border-bottom: 2px solid #10b981; padding-bottom: 8px; margin-bottom: 20px;">Edição Especial de Upgrades</h2>

    <div class="card-project">
      <div class="proj-title">🧪 Experimento 01: A Erupção do Vulcão Cromático</div>
      <p><strong>Materiais:</strong> Bicarbonato de sódio, detergente, vinagre e corante alimentício.</p>
      <div class="step-box">Misture 2 colheres de bicarbonato com 1 colher de detergente e corante. Despeje 50ml de vinagre e observe a espuma densa borbulhar!</div>
      <div class="science-explain"><strong>Reação Ácido-Base:</strong> Liberação rápida de gás dióxido de carbono ($CO_2$) encapsulado pelo detergente.</div>
    </div>

    <div class="card-project">
      <div class="proj-title">💧 Máquinas Hidráulicas: Braço com Seringas e Água</div>
      <p><strong>Materiais:</strong> 2 Seringas descartáveis, mangueirinha plástica e papelão.</p>
      <div class="step-box">Preencha a mangueira com água colorida. Conecte as seringas. Ao empurrar uma, a outra se expande com força instantaneamente.</div>
      <div class="science-explain"><strong>Princípio de Pascal:</strong> A pressão exercida em fluido confinado transmite-se integralmente. A mecânica das escavadeiras reais!</div>
    </div>
  `;

  const html3 = createPdfHtml(
    "Robótica & Cientistas na Cozinha",
    "Coleção Premium de Experimentos Práticos & Mecanismos Hidráulicos com Seringas",
    "Edição Especial Completa",
    extrasContent
  );

  await page.setContent(html3, { waitUntil: 'domcontentloaded' });
  await page.pdf({
    path: path.join(downloadsDir, 'robotica_e_experimentos_especiais.pdf'),
    format: 'A4',
    printBackground: true
  });
  console.log("✅ PDF 3 gerado!");

  await browser.close();
  console.log("🎉 Todos os 3 PDFs entregáveis foram gerados com sucesso!");
}

buildAllPdfs().catch(err => {
  console.error("Erro na geração de PDFs:", err);
  process.exit(1);
});
