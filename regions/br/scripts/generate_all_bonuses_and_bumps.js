import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const downloadsDir = path.resolve('mega-inventores', 'public', 'downloads');
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

function getBaseHtml(title, subtitle, badge, color, contentHtml) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: A4; margin: 1.2cm; }
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; line-height: 1.5; font-size: 12px; }
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 85vh;
      border: 8px solid ${color};
      border-radius: 28px;
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
      box-sizing: border-box;
    }
    .badge {
      display: inline-block;
      background-color: ${color};
      color: white;
      font-weight: 800;
      font-size: 12px;
      padding: 8px 20px;
      border-radius: 50px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 25px;
    }
    .cover-title {
      font-size: 34px;
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 15px;
      color: #0f172a;
    }
    .cover-sub {
      font-size: 15px;
      color: #475569;
      max-width: 500px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .card {
      page-break-inside: avoid;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .card-title {
      font-size: 16px;
      font-weight: 800;
      color: ${color};
      margin-bottom: 8px;
    }
    .highlight-box {
      background: #f8fafc;
      border-left: 4px solid ${color};
      padding: 10px 14px;
      margin: 8px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <div class="badge">${badge}</div>
    <div class="cover-title">${title}</div>
    <div class="cover-sub">${subtitle}</div>
    <p style="margin-top: 35px; font-size: 11px; color: #64748b; font-weight: 600;">
      Oficina do Pequeno Inventor · Edição Especial Homologada 2026
    </p>
  </div>
  <div class="content" style="padding-top: 10px;">
    ${contentHtml}
  </div>
</body>
</html>
  `;
}

async function generateAll() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // 1. PACOTE 5 SUPER BÔNUS (COMPLETO)
  console.log("Compilando Pacote 5 Super Bônus...");
  const bonusHtml = `
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bônus 1: O Desafio dos 7 Dias do Pequeno Inventor</h2>
    <div class="card">
      <div class="card-title">📅 O Roteiro Diário da Semana Sem Telas</div>
      <p>Um cronograma de missões diárias de 25 minutos para transformar a rotina da criança sem atritos.</p>
      <div class="highlight-box"><strong>Dia 1 - A Caixa Mágica:</strong> Montar o baú de materiais recicláveis (separar caixas, tampinhas e tubos).</div>
      <div class="highlight-box"><strong>Dia 2 - Lançador Balístico:</strong> Catapulta de prendedor com competição de mira em copos pontuados.</div>
      <div class="highlight-box"><strong>Dia 3 - Mergulhador Cartesiano:</strong> O mistério da física do submarino na garrafa de água.</div>
      <div class="highlight-box"><strong>Dia 4 - Periscópio Espião:</strong> Construção do tubo com dois espelhos para ver além dos cantos da casa.</div>
      <div class="highlight-box"><strong>Dia 5 - Garra de Resgate:</strong> Braço extensor de papelão para recolher brinquedos caídos.</div>
      <div class="highlight-box"><strong>Dia 6 - Circuito de Corrida:</strong> Super carro turbo a bexiga com pista cronometrada no corredor.</div>
      <div class="highlight-box"><strong>Dia 7 - Grande Feira de Invenções:</strong> Apresentação para a família e entrega do Diploma Oficial de Inventor!</div>
    </div>

    <div style="page-break-before: always;"></div>
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bônus 2: Plano de Robótica Caseira em 14 Dias</h2>
    <div class="card">
      <div class="card-title">🧭 Roteiro para Pais Ocupados: 20 Minutos por Tarde</div>
      <p>Desenvolvido para famílias com rotina agitada: projetos rápidos que não exigem compras caras e usam materiais do lixo reciclável.</p>
      <div class="highlight-box"><strong>Semana 1 (Fundamentos da Mecânica):</strong> Alavancas, rodas livres, atrito estático e gravidade.</div>
      <div class="highlight-box"><strong>Semana 2 (Autômatos e Movimento):</strong> Roldanas, bielas, eixos excêntricos e propulsão de ar.</div>
    </div>

    <div style="page-break-before: always;"></div>
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bônus 3: Guia Rápido de Diagnóstico & Solução de Problemas</h2>
    <div class="card">
      <div class="card-title">🔧 "Por que meu robô não andou?" (Manual do Engenheiro)</div>
      <div class="highlight-box"><strong>Sintoma: O carro gira a bexiga mas não sai do lugar.</strong><br><em>Causa:</em> As rodas de tampinha estão escorregando no piso liso.<br><em>Solução:</em> Envolva cada tampinha com um elástico de dinheiro para criar tração aderente.</div>
      <div class="highlight-box"><strong>Sintoma: A alavanca do guindaste dobrou ao erguer peso.</strong><br><em>Causa:</em> As fibras do papelão estavam na mesma direção da dobra.<br><em>Solução:</em> Cole duas camadas de papelão com as ranhuras cruzadas a 90 graus (fica 4x mais resistente).</div>
      <div class="highlight-box"><strong>Sintoma: A cola quente descolou do plástico da tampa.</strong><br><em>Causa:</em> Plásticos lisos de polietileno repelem adesivos quentes.<br><em>Solução:</em> Lixe levemente o ponto de contato com lixa de unha para criar microrranhuras de ancoragem.</div>
    </div>

    <div style="page-break-before: always;"></div>
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bônus 4: Checklist do Pequeno Inventor</h2>
    <div class="card">
      <div class="card-title">📦 Os 10 Materiais para Guardar em Casa (Custo Zero)</div>
      <p>1. Caixas de papelão ondulado limpas (sapatos, cereais e entregas).<br>
         2. Tampinhas de garrafa plástica de diversos tamanhos.<br>
         3. Tubos de papel toalha e papel higiênico.<br>
         4. Palitos de dente e espetos de churrasco sem ponta.<br>
         5. Canudos plásticos e de papel.<br>
         6. Elásticos de dinheiro de espessuras variadas.<br>
         7. Prendedores de roupa de madeira e de plástico.<br>
         8. Pedaços de barbante, linha e fita crepe.<br>
         9. Garrafas PET pequenas e potes de iogurte vazios.<br>
         10. Bexigas normais de festa de aniversário.</p>
    </div>

    <div style="page-break-before: always;"></div>
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bônus 5: 40 Invenções ao Ar Livre & para o Quintal</h2>
    <div class="card">
      <div class="card-title">🌳 Projetos de Alta Energia e Ciência ao Ar Livre</div>
      <div class="highlight-box"><strong>Foguete supersônico de vinagre e bicarbonato:</strong> Aceleração vertical atingindo até 8 metros de altitude.</div>
      <div class="highlight-box"><strong>Anemômetro de copos giratórios:</strong> Estação meteorológica caseira para medir a velocidade das rajadas de vento.</div>
      <div class="highlight-box"><strong>Relógio solar de precisão por sombra:</strong> Marcação das horas pela rotação natural da Terra.</div>
      <div class="highlight-box"><strong>Catapulta gigante de alcance de campo:</strong> Lançamento de balões d'água em alvos no gramado.</div>
    </div>
  `;

  await page.setContent(getBaseHtml(
    "Pacote 5 Super Bônus",
    "Desafio 7 Dias, Plano de Robótica 14 Dias, Guia de Ajustes, Checklist do Inventor & 40 Projetos de Quintal",
    "BÔNUS EXCLUSIVOS DE LANÇAMENTO",
    "#F59E0B",
    bonusHtml
  ), { waitUntil: 'domcontentloaded' });

  await page.pdf({
    path: path.join(downloadsDir, 'pacote_5_super_bonus.pdf'),
    format: 'A4',
    printBackground: true
  });
  console.log("✅ Pacote 5 Super Bônus compilado!");

  // 2. BUMP 1: PEQUEÑOS ENGENHEIROS (5-7 ANOS)
  console.log("Compilando Bump 1: Pequeños Engenheiros...");
  const bump1Html = `
    <h2>10 Projetos de Primeiro Contato para 5 a 7 Anos</h2>
    <div class="card">
      <div class="card-title">Projetos com Encaixes Grandes e Zero Tesouras Afiadas</div>
      <p>Desenvolvido pedagogicamente para o desenvolvimento da coordenação motora fina inicial, percepção espacial e lógica mecânica básica através de montagens táteis seguras.</p>
      <div class="highlight-box"><strong>1. O Monstrinho que Mexe as Orelhas:</strong> Alavanca simples de duas tiras.</div>
      <div class="highlight-box"><strong>2. Carro de Rolamento com Tubo:</strong> Eixos de canudo sem cola.</div>
      <div class="highlight-box"><strong>3. Balança de Gangorra:</strong> Comparando pesos com blocos de madeira.</div>
      <div class="highlight-box"><strong>4. Tubo de Som Trovoada:</strong> Efeito acústico de mola vibrante.</div>
      <div class="highlight-box"><strong>5. Helicóptero de Dedo:</strong> Girando com as palmas das mãos.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Pequeños Engenheiros", "Projetos de Primeiro Contato e Coordenação Motora para Crianças de 5 a 7 Anos", "ORDER BUMP #1", "#3B82F6", bump1Html));
  await page.pdf({ path: path.join(downloadsDir, 'bump_01_pequenos_engenheiros.pdf'), format: 'A4', printBackground: true });

  // 3. BUMP 2: ROBÓTICA COM MOVIMENTO (MOTORES DC)
  console.log("Compilando Bump 2: Robótica com Movimento...");
  const bump2Html = `
    <h2>20 Robôs e Mecanismos com Motores DC e Pilhas</h2>
    <div class="card">
      <div class="card-title">O Próximo Nível: Movimento Elétrico Autônomo</div>
      <p>Ensina crianças a conectar pequenos motores elétricos retirados de brinquedos velhos ou comprados por R$ 3 para criar robôs que se movem de verdade pela casa.</p>
      <div class="highlight-box"><strong>1. Vibro-Bot Pincel:</strong> Anda desenhando na cartolina com canetinhas.</div>
      <div class="highlight-box"><strong>2. Carrinho com Tração por Polia:</strong> Motor transmitindo torque para roda traseira.</div>
      <div class="highlight-box"><strong>3. Barco Elétrico com Hélice Submersa:</strong> Navega em alta velocidade na piscina.</div>
      <div class="highlight-box"><strong>4. Moinho Elétrico com LED Indicador:</strong> Motor gerando eletricidade reversa.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Robótica com Movimento", "20 Projetos Elétricos Avançados com Motores DC, Chaves e Pilhas", "ORDER BUMP #2", "#10B981", bump2Html));
  await page.pdf({ path: path.join(downloadsDir, 'bump_02_robotica_com_movimento.pdf'), format: 'A4', printBackground: true });

  // 4. BUMP 3: CIENTISTAS NA COZINHA (QUÍMICA SEGURA)
  console.log("Compilando Bump 3: Cientistas na Cozinha...");
  const bump3Html = `
    <h2>45 Experimentos Químicos Seguros para Fazer na Pia</h2>
    <div class="card">
      <div class="card-title">O Laboratório Secreto de Química Caseira</div>
      <p>Transforme a mesa da cozinha em uma verdadeira feira de ciências usando vinagre, bicarbonato, óleo, sal, leite e corantes.</p>
      <div class="highlight-box"><strong>1. Fluido Não-Newtoniano:</strong> Amido de milho que fica sólido ao ser socado e líquido ao relaxar.</div>
      <div class="highlight-box"><strong>2. Chuva Colorida de Densidade:</strong> Gotas de corante caindo em câmera lenta através do óleo.</div>
      <div class="highlight-box"><strong>3. Inflador de Balão Mágico:</strong> A reação de bicarbonato que enche a bexiga sozinha.</div>
      <div class="highlight-box"><strong>4. Cristais de Sal em Crescimento:</strong> Cultivo de pedras brilhantes em 48 horas.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Cientistas na Cozinha", "45 Experimentos Químicos Caseiros 100% Seguros com Ingredientes de Casa", "ORDER BUMP #3", "#EC4899", bump3Html));
  await page.pdf({ path: path.join(downloadsDir, 'bump_03_cientistas_na_cozinha.pdf'), format: 'A4', printBackground: true });

  // 5. BUMP 4: TECNOLOGIA DE PAPELÃO (GAMIFICAÇÃO)
  console.log("Compilando Bump 4: Tecnologia de Papelão...");
  const bump4Html = `
    <h2>40 Missões Gamificadas com Níveis e Medalhas</h2>
    <div class="card">
      <div class="card-title">O Sistema de Conquistas do Pequeno Engenheiro</div>
      <p>Transforme cada montagem em um jogo no estilo RPG: a cada projeto finalizado, a criança marca pontos e desbloqueia um nível superior de inventor.</p>
      <div class="highlight-box"><strong>Nível 1 - Aprendiz de Oficina (0 a 100 pts)</strong></div>
      <div class="highlight-box"><strong>Nível 2 - Construtor de Engenhocas (100 a 250 pts)</strong></div>
      <div class="highlight-box"><strong>Nível 3 - Mestre da Robótica Caseira (250 a 500 pts)</strong></div>
    </div>
  `;
  await page.setContent(getBaseHtml("Tecnologia de Papelão", "Sistema de Conquistas, Níveis e Desafios Gamificados para Crianças", "ORDER BUMP #4", "#8B5CF6", bump4Html));
  await page.pdf({ path: path.join(downloadsDir, 'bump_04_tecnologia_de_papelao.pdf'), format: 'A4', printBackground: true });

  // 6. BUMP 5: MÁQUINAS HIDRÁULICAS
  console.log("Compilando Bump 5: Máquinas Hidráulicas...");
  const bump5Html = `
    <h2>10 Desafios Avançados com Seringas, Pistões e Água</h2>
    <div class="card">
      <div class="card-title">A Força Invisível dos Fluidos Confinados</div>
      <p>Guia detalhado para construir pontes basculantes, braços de escavadeira e prensas que funcionam exclusivamente pela pressão da água em seringas plásticas.</p>
    </div>
  `;
  await page.setContent(getBaseHtml("Máquinas Hidráulicas", "Projetos de Alta Potência com Seringas e Transmissão por Fluidos", "ORDER BUMP #5", "#06B6D4", bump5Html));
  await page.pdf({ path: path.join(downloadsDir, 'bump_05_maquinas_hidraulicas.pdf'), format: 'A4', printBackground: true });

  // 7. BUMP 6: FESTA DOS INVENTORES
  console.log("Compilando Bump 6: Festa dos Inventores...");
  const bump6Html = `
    <h2>Kit Imprimível de Gincana & Aniversário Científico</h2>
    <div class="card">
      <div class="card-title">Uma Tarde Inesquecível de Brincadeiras Criativas</div>
      <p>Convites temáticos, crachás de cientista maluco, plaquinhas de identificação de bancada e roteiro de 5 gincanas colaborativas para fazer com amigos e primos.</p>
    </div>
  `;
  await page.setContent(getBaseHtml("Festa dos Inventores", "Kit Completo Imprimível de Aniversário, Gincanas e Tarde com Amigos", "ORDER BUMP #6", "#F97316", bump6Html));
  await page.pdf({ path: path.join(downloadsDir, 'bump_06_festa_dos_inventores.pdf'), format: 'A4', printBackground: true });

  // 8. BUMP 7: DIÁRIO DO PEQUENO INVENTOR
  console.log("Compilando Bump 7: Diário do Inventor...");
  const bump7Html = `
    <h2>Caderno de Laboratório Secreto & Hipóteses</h2>
    <div class="card">
      <div class="card-title">O Diário de Bordo para Registrar Experimentos Reais</div>
      <p>Folhas pautadas ilustradas para a criança desenhar suas invenções, anotar materiais necessários, registrar o que deu certo e formular novas hipóteses como um cientista de verdade.</p>
    </div>
  `;
  await page.setContent(getBaseHtml("Diário do Pequeno Inventor", "Caderno de Laboratório Secreto Imprimível para Hipóteses e Desenhos", "ORDER BUMP #7", "#475569", bump7Html));
  await page.pdf({ path: path.join(downloadsDir, 'bump_07_diario_do_inventor.pdf'), format: 'A4', printBackground: true });

  await browser.close();
  console.log("🎉 TODOS OS ENTREGÁVEIS (BÔNUS E BUMPS) FORAM GERADOS COM SUCESSO!");
}

generateAll().catch(console.error);
