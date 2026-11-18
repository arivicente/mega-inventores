import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const downloadsDir = path.resolve('mega-inventores', 'public', 'downloads');
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

// Catalog of 120 Projects grouped in 6 modules of 20 projects each
const modules = [
  {
    name: "Módulo 1: Robôs, Andadores & Autômatos de Papelão",
    desc: "Projetos focados em dar movimento e vida a caixas e materiais recicláveis.",
    color: "#2563EB",
    projects: [
      { id: 1, title: "Garra Mecânica Articulada Biônica", time: "30 min", age: "5-9 anos", mats: "Papelão, barbante, canudos", how: "Puxar anéis nos dedos flexiona os tendões da mão mecânica.", sci: "Alavancas de 3ª classe convertendo tração linear em flexão angular." },
      { id: 2, title: "Robô Andador por Gravidade", time: "40 min", age: "6-10 anos", mats: "Papelão, palitos, arruela pesada", how: "Ao colocar o robô em uma rampa leve, as pernas balançam alternadas.", sci: "Conversão de energia potencial gravitacional em movimento pendular cinético." },
      { id: 3, title: "Autômato do Pássaro que Bate Asas", time: "45 min", age: "7-11 anos", mats: "Papelão, arame fino, tampinhas", how: "Girar a manivela aciona uma manivela excêntrica que eleva as asas.", sci: "Transformação de movimento rotativo contínuo em movimento oscilatório vertical." },
      { id: 4, title: "Mandíbula de T-Rex Articulada", time: "25 min", age: "5-8 anos", mats: "Papelão, elástico, prendedor de roupa", how: "Apertar a alavanca abre e fecha os dentes ferozes do dinossauro.", sci: "Mecanismo de tesoura articulada e retorno por tensão elástica." },
      { id: 5, title: "Braço Robótico Telescópico", time: "35 min", age: "7-12 anos", mats: "Palitos de picolé, tachinhas bailarinas", how: "Empurrar as alavancas estica o braço até 3 vezes seu tamanho original.", sci: "Estrutura pantográfica em losangos deformáveis (mecanismo pantógrafo)." },
      { id: 6, title: "Robô Cabeçudo Dançarino de Mesa", time: "20 min", age: "5-8 anos", mats: "Copo descartável, mola ou arame espiral, papelão", how: "Toques leves na mesa fazem a cabeça balançar em ritmo frenético.", sci: "Frequência natural de oscilação e amortecimento harmônico simples." },
      { id: 7, title: "Rastejador Mecânico Lagarta", time: "30 min", age: "6-10 anos", mats: "Papelão sanfonado, palitos, clipe", how: "Empurrar e puxar a haste faz o corpo contrair e avançar.", sci: "Atrito unidirecional e locomoção peristáltica inspirada na natureza." },
      { id: 8, title: "Boneco Acrobata na Barra Fixa", time: "30 min", age: "6-10 anos", mats: "Papelão, barbante grosso, duas varetas", how: "Apertar as bases das varetas torce o barbante e faz o boneco girar 360°.", sci: "Torção de fios elásticos e momento angular de inércia rotacional." },
      { id: 9, title: "Garra de Pinça Dupla Cruzada", time: "25 min", age: "5-9 anos", mats: "Papelão ondulado, tachinhas, elástico", how: "Garras em pinça fina ideais para coletar bolinhas de gude.", sci: "Multiplicação de força mecânica em pinças de precisão." },
      { id: 10, title: "Robô Rolo Compressor com Direção", time: "40 min", age: "7-11 anos", mats: "Rolo de papel toalha, tampas de leite em pó, eixo de palito", how: "Roda frontal gigante com esterçamento suave por alavanca.", sci: "Geometria de direção e distribuição de peso sobre eixos rolantes." },
      { id: 11, title: "Mini Escavadeira com Concha de Papelão", time: "50 min", age: "8-12 anos", mats: "Caixa de sapatos, papelão duplo, canudos, barbante", how: "Dois comandos independentes: um ergue o braço e o outro despeja a carga.", sci: "Coordenação de alavancas de múltiplos graus de liberdade (DOF)." },
      { id: 12, title: "Batedor de Asas de Borboleta com Came", time: "35 min", age: "6-10 anos", mats: "Caixinha de fósforo, disco de papelão, arame", how: "Roda ovalada (came) empurra a haste que aciona as asas.", sci: "Cames mecânicos usados em comandos de válvulas industriais." },
      { id: 13, title: "Robô Soldado com Movimento de Guarda", time: "40 min", age: "7-11 anos", mats: "Papelão, arruelas, linha de pipa", how: "Puxar a cordinha inferior movimenta simultaneamente braços e pernas.", sci: "Mecanismo clássico de polichinelo com sincronismo de bielas." },
      { id: 14, title: "Boca Maluca do Monstro Devorador", time: "25 min", age: "5-8 anos", mats: "Caixa de lenço de papel, dentes de papelão, elástico", how: "Ao soltar bolinhas na rampa, a boca 'engole' e fecha com estalo.", sci: "Gatilhos mecânicos ativados por impacto com retorno elástico." },
      { id: 15, title: "Mini Empilhadeira com Roldanas", time: "45 min", age: "8-12 anos", mats: "Papelão, carretel de linha, barbante, manivela", how: "A plataforma sobe em trilhos verticais guiados para erguer mini paletes.", sci: "Movimento retilíneo guiado e redução de esforço por polias." },
      { id: 16, title: "Cãozinho Robótico Abanador de Rabo", time: "30 min", age: "5-9 anos", mats: "Papelão, tampinha furada, palito flexível", how: "Mover a coleira faz a cabeça e o rabo se mexerem em sentidos opostos.", sci: "Transmissão mecânica de gangorra com ponto de pivô central." },
      { id: 17, title: "Robô Boxeador de Punho Retrátil", time: "35 min", age: "6-10 anos", mats: "Papelão, elásticos fortes, haste guia", how: "Gatilho de dedo dispara o soco acolchoado para frente e puxa de volta.", sci: "Conservação de energia potencial elástica em impacto balístico." },
      { id: 18, title: "Autômato do Surfista nas Ondas", time: "45 min", age: "7-12 anos", mats: "Caixa de sapato, 3 manivelas de papelão", how: "Eixos em fases diferentes simulam a ondulação suave do mar sob a prancha.", sci: "Virabrequim mecânico com defasagem de 120 graus." },
      { id: 19, title: "Mão de Esqueleto com Luz Interna", time: "35 min", age: "7-11 anos", mats: "Canudos brancos, barbante preto, papelão fosco", how: "Tendões acionados por anéis que destacam as falanges biomecânicas.", sci: "Anatomia funcional comparada entre mãos humanas e robótica bio-inspirada." },
      { id: 20, title: "Robô Espião com Câmera Periscópica", time: "40 min", age: "7-12 anos", mats: "Caixa de leite, dois pequenos espelhos de bolso", how: "Permite enxergar por cima de muros e embaixo de portas sem ser visto.", sci: "Óptica geométrica: reflexão em espelhos planos paralelos a 45 graus." }
    ]
  },
  {
    name: "Módulo 2: Máquinas Simples & Alavancas Mecânicas",
    desc: "A física dos grandes guindastes e engenhocas explicada na prática.",
    color: "#F59E0B",
    projects: [
      { id: 21, title: "Guindaste de Polias com Trava Catraca", time: "45 min", age: "7-12 anos", mats: "Caixa de sapatos, carretel, clipe", how: "Ergue até 500g de peso sem soltar a manivela graças à trava mecânica.", sci: "Vantagem mecânica de sistemas de roldanas e dente de retenção." },
      { id: 22, title: "Catapulta Balística de Cerco", time: "25 min", age: "5-9 anos", mats: "Prendedores de madeira, colher descartável, elásticos", how: "Lança bolinhas de papel com precisão em alvos numerados.", sci: "Trajetória parabólica e balística de projéteis com lançamento angular." },
      { id: 23, title: "Ponte Levadiça com Guincho de Manivela", time: "40 min", age: "6-10 anos", mats: "Papelão duplo, barbante, espetos de madeira", how: "Girar as torres ergue as duas metades da ponte para barcos passarem.", sci: "Ponte basculante equilibrada por contrapeso e tração de cabos." },
      { id: 24, title: "Balança de Precisão Romana", time: "30 min", age: "6-11 anos", mats: "Cabide plástico, 2 copinhos descartáveis, barbante", how: "Compara o peso exato de objetos usando moedas como massa padrão.", sci: "Equilíbrio de torques estáticos: Força x Braço de Alavanca." },
      { id: 25, title: "Torno Mecânico Manual para Papel", time: "35 min", age: "7-12 anos", mats: "Dois apoios em V de papelão, manivela de arame", how: "Permite enrolar fitas de papel e fios com rapidez e tensão uniforme.", sci: "Vantagem mecânica do torno (roda e eixo) para torque multiplicado." },
      { id: 26, title: "Triturador de Papel por Cilindros Dentados", time: "45 min", age: "8-12 anos", mats: "Dois rolos de papel higiênico com tiras coladas, manivela", how: "Girar a manivela faz os rolos puxarem e prensarem folhas finas.", sci: "Transmissão por engrenagens de fricção de sentidos opostos." },
      { id: 27, title: "Elevador de Carga em Torre com Guias", time: "50 min", age: "7-12 anos", mats: "Caixa alta de papelão, caixa menor de cabine, carretel", how: "A cabine desliza suavemente por trilhos de palito sem tombar.", sci: "Guia linear com folga calibrada e redução de atrito estático." },
      { id: 28, title: "Catapulta Trebuchet de Contrapeso", time: "45 min", age: "8-12 anos", mats: "Papelão resistente, moedas pesadas de contrapeso, funda de tecido", how: "O peso caindo na ponta curta arremessa a ponta longa com velocidade supersônica.", sci: "Alavanca de 1ª classe assimétrica e aceleração angular de ponta de funda." },
      { id: 29, title: "Prensa Mecânica Parafuso Caseiro", time: "35 min", age: "7-11 anos", mats: "Parafuso longo com porca borboleta, pranchas de papelão", how: "Girar a porca esmaga com facilidade massinhas e papéis molhados.", sci: "Plano inclinado helicoidal: parafuso como multiplicador colossal de força." },
      { id: 30, title: "Batedor de Manteiga Planetário Manual", time: "30 min", age: "6-10 anos", mats: "Engrenagens de papelão com dentes triangulares", how: "Uma volta lenta na manivela gera 4 voltas velozes no eixo central.", sci: "Relação de transmissão e multiplicação de rotação por engrenamento." },
      { id: 31, title: "Gira-Gira Centrífugo com Esferas", time: "25 min", age: "5-9 anos", mats: "Prato de papelão, canudos em arco, bolinhas de gude", how: "Girar o prato empurra as esferas para as bordas externas.", sci: "Força centrífuga aparente e inércia de corpos em trajetória circular." },
      { id: 32, title: "Alavanca de Levantamento de Pesos Pesados", time: "20 min", age: "5-8 anos", mats: "Régua plástica resistente, borracha como fulcro, livros", how: "Com apenas um dedo na ponta, a criança ergue 5 livros pesados.", sci: "Princípio fundamental da alavanca descoberto por Arquimedes." },
      { id: 33, title: "Mecanismo Biela-Manivela do Trem a Vapor", time: "40 min", age: "7-12 anos", mats: "Disco de papelão com pino excêntrico, haste articulada e pistão", how: "O pistão vai e volta em linha reta fazendo a roda gigante girar sem parar.", sci: "Conversão cinemática de movimento linear alternativo em rotativo." },
      { id: 34, title: "Catapulta de Garrafa com Mola Espiral", time: "30 min", age: "6-10 anos", mats: "Fundo de garrafa PET, arame flexível em espiral", how: "Pressionar para baixo carrega a mola que dispara projéteis leves.", sci: "Lei de Hooke sobre deformação e restauração de corpos elásticos." },
      { id: 35, title: "Rampa de Lançamento Gravitacional Loop-the-Loop", time: "40 min", age: "6-11 anos", mats: "Canos de espuma cortados ao meio ou tiras de papelão curvadas", how: "A bolinha desce do topo e completa o looping de ponta-cabeça sem cair.", sci: "Conservação de energia mecânica e velocidade crítica mínima centrípeta." },
      { id: 36, title: "Moinho de Vento com Eixo Transversal", time: "35 min", age: "6-10 anos", mats: "Cata-vento de papel, palito central, engrenagem cônica de tampas", how: "O vento sopra de frente e o eixo gira uma polia voltada para cima.", sci: "Mudança de plano de rotação a 90 graus por dentes cruzados." },
      { id: 37, title: "Câmbio Manual de 2 Velocidades de Papelão", time: "50 min", age: "8-12 anos", mats: "Eixos concêntricos, 4 discos dentados de raios diferentes", how: "Deslizar a alavanca troca entre velocidade rápida e marcha de força.", sci: "Troca de torque por RPM nas transmissões veiculares modernas." },
      { id: 38, title: "Pêndulo Balístico Registrador de Impacto", time: "30 min", age: "7-11 anos", mats: "Caixinha suspensa por 4 fios, escala milimetrada", how: "O impacto do projétil faz o bloco subir e registrar a altura máxima.", sci: "Conservação da quantidade de movimento linear e energia em colisões inelásticas." },
      { id: 39, title: "Trança-Fios Mecânico de 3 Bobinas", time: "35 min", age: "6-10 anos", mats: "Disco entalhado estilo 'Kumihimo' de papelão", how: "Girar sequencialmente os fios pelos entalhes produz cordas trançadas perfeitas.", sci: "Topologia mecânica e tecelagem automatizada ancestral." },
      { id: 40, title: "Garra Pantográfica de Pinça Dupla", time: "35 min", age: "7-11 anos", mats: "6 palitos de picolé com pinos centrais, pontas emborrachadas", how: "Abre e fecha com alcance de até 40cm para pegar objetos no alto.", sci: "Transmissão proporcional de curso por malha articulada de hastes." }
    ]
  },
  {
    name: "Módulo 3: Veículos a Propulsão & Corridas Rápidas",
    desc: "Carrinhos, barcos e hovercrafts movidos a ar, água e elásticos.",
    color: "#10B981",
    projects: [
      { id: 41, title: "Super Carro Turbo a Propulsão Pneumática", time: "20 min", age: "5-10 anos", mats: "4 Tampinhas furadas, bexiga, canudo, caixa de leite", how: "Inflar a bexiga pelo canudo e soltar no chão liso dispara o carro a 5 metros.", sci: "3ª Lei de Newton: Ação do ar para trás gera Reação para a frente." },
      { id: 42, title: "Hovercraft de Disco com Almofada de Ar", time: "15 min", age: "5-9 anos", mats: "CD velho, tampa de detergente push-pull, bexiga", how: "O ar cria uma película invisível embaixo do CD, fazendo-o flutuar sem atrito.", sci: "Efeito solo e eliminação de atrito por colchão de fluido pressurizado." },
      { id: 43, title: "Dragster de Corrida com Tração por Elástico", time: "30 min", age: "6-10 anos", mats: "Chassi longo de papelão, elástico de dinheiro preso ao eixo traseiro", how: "Girar as rodas para trás enrola o elástico; ao soltar, ele arranca em alta velocidade.", sci: "Acúmulo de energia potencial elástica e transmissão direta por tração traseira." },
      { id: 44, title: "Barco a Vapor Pop-Pop com Caldeira Segura", time: "35 min", age: "8-12 anos", mats: "Bandeja de isopor, tubinho de metal ou canudo com papel alumínio", how: "Pequena fonte de calor aquece a água que sai em pulsos sonoros pelo escape.", sci: "Ciclo termodinâmico de expansão e condensação cíclica de vapor." },
      { id: 45, title: "Carro com Hélice Aviador de Ventoinha", time: "25 min", age: "6-10 anos", mats: "Garrafa plástica leve, hélice recortada de pote de sorvete, elástico", how: "Girar a hélice várias voltas e soltar impulsiona o veículo pelo vento gerado.", sci: "Empuxo aerodinâmico gerado pelo perfil de ataque das pás da hélice." },
      { id: 46, title: "Barco Catamarã com Roda de Pás Traseira", time: "30 min", age: "5-9 anos", mats: "Dois frascos plásticos paralelos, paleta de madeira com elástico", how: "Na banheira ou bacia, a roda d'água bate na água e move o barco suavemente.", sci: "Propulsão hidrodinâmica naval por pás rotativas inspirada nos vapores do Mississipi." },
      { id: 47, title: "Foguete de Canudo Balístico Aerodinâmico", time: "15 min", age: "5-8 anos", mats: "Dois canudos (um mais largo tampado na ponta), aletas de papel", how: "Soprar com força no canudo de base dispara o míssil a metros de distância.", sci: "Pressão de ar concentrada e estabilidade de voo por aletas traseiras." },
      { id: 48, title: "Carro com Rodas Gigantes Off-Road para Obstáculos", time: "35 min", age: "6-10 anos", mats: "Tampas de lata de achocolatado como rodas, chassi alto articulado", how: "Supera pequenos livros e lápis na sala sem encalhar.", sci: "Relação de raio de roda versus altura de degrau e vão livre do solo." },
      { id: 49, title: "Planador de Isopor com Centro de Gravidade Ajustável", time: "30 min", age: "7-11 anos", mats: "Bandejinha de frios, clipe de metal no bico", how: "Mover o clipe para frente ou para trás altera entre voos em linha reta ou acrobacias.", sci: "Centro de Pressão vs Centro de Gravidade em aerodinâmica aplicada." },
      { id: 50, title: "Trem Monotrilho Gravitacional de Fio Guia", time: "25 min", age: "5-9 anos", mats: "Caixinha suspensa por 2 clipes deslizando em fio de nylon esticado", how: "Ao inclinar o fio ou puxar um peso na ponta, a cabine corre pelo ar pela sala.", sci: "Sistemas de transporte por cabo aéreo (teleféricos) com atrito reduzido." },
      { id: 51, title: "Carro a Vento com Vela Náutica Ajustável", time: "25 min", age: "5-8 anos", mats: "Chassi de papelão, mastro de espeto, vela triangular de papel manteiga", how: "Usando um secador de cabelo ou ventilador, o carro corre em diferentes ângulos de vento.", sci: "Força de sustentação aerodinâmica e navegação à bolina em terra." },
      { id: 52, title: "Trator Lagarta com Trilhos de Correia de Lixa", time: "45 min", age: "8-12 anos", mats: "Tiras de tecido com palitos colados girando sobre 3 rolos de cada lado", how: "Girar as esteiras manuais permite andar sobre travesseiros e terrenos moles.", sci: "Distribuição de pressão sobre área ampliada (pressão = força / área)." },
      { id: 53, title: "Helicóptero de Queda Livre com Asas Auto-Rotativas", time: "15 min", age: "5-8 anos", mats: "Tira de papel sulfite com dois cortes e um clipe embaixo", how: "Ao soltar de 2 metros de altura, ele cai girando lentamente como semente de bordo.", sci: "Autorrotação e sustentação aerodinâmica por fluxo ascendente de ar." },
      { id: 54, title: "Lancha Rápida com Hidrojato de Bexiga", time: "20 min", age: "5-9 anos", mats: "Garrafa pet cortada, canudo submerso conectado à bexiga com água", how: "A água pressurizada expulsa por trás empurra a lancha na piscina ou banheira.", sci: "Propulsão a jato d'água com maior densidade de fluido expelido." },
      { id: 55, title: "Carro Acrobata que Capota e Continua Andando", time: "35 min", age: "6-10 anos", mats: "Chassi simétrico com rodas maiores que a altura do corpo", how: "Ao bater na parede e virar de cabeça para baixo, ele segue em frente sem travar.", sci: "Design bi-face com distância simétrica em relação ao plano de rolagem." },
      { id: 56, title: "Veículo Giroscópico de 2 Rodas Alinhadas", time: "40 min", age: "7-12 anos", mats: "Duas rodas alinhadas em tandem, volante giroscópico pesado de CD", how: "Enquanto o disco gira em alta rotação, o veículo mantém o equilíbrio sobre 2 rodas.", sci: "Efeito giroscópico e conservação do vetor momento angular." },
      { id: 57, title: "Foguete Hidropneumático de Garrafa PET com Bomba de Ar", time: "45 min", age: "8-12 anos", mats: "Garrafa pet de 2L, rolha com bico de encher bola, água", how: "Bombear ar comprime o ar sobre a água; ao soltar a trava, o foguete sobe 15 metros.", sci: "Termodinâmica de gases comprimidos e conservação de quantidade de movimento." },
      { id: 58, title: "Hovercraft Terrestre com Motor de Cooler Velho", time: "40 min", age: "8-12 anos", mats: "Placa de isopor, cooler 12V ou ventoinha USB, bateria 9V", how: "A ventoinha joga o ar para baixo através de furos na saia plástica flutuando o modelo.", sci: "Dinâmica dos fluidos: criação de zona de alta pressão estática confinado." },
      { id: 59, title: "Carro Esportivo com Amortecimento Independente", time: "45 min", age: "7-11 anos", mats: "Palitos articulados com pequenas molas de caneta em cada roda", how: "Cada roda sobe e desce individualmente sem desestabilizar o chassi principal.", sci: "Cinemática de suspensão independente Double Wishbone em escala." },
      { id: 60, title: "Submarino Garrafa PET de Lastro Controlado", time: "35 min", age: "7-11 anos", mats: "Garrafa plástica pequena, peso de moedas, mangueira de ar longa", how: "Soprar ar esvazia o submarino e ele sobe; deixar a água entrar faz ele afundar.", sci: "Princípio de Arquimedes e controle de empuxo hidrostático por tanque de lastro." }
    ]
  },
  {
    name: "Módulo 4: Eletricidade Básica & Circuitos com Pilha",
    desc: "Circuitos simples, motores vibratórios e luzes sem choque.",
    color: "#EF4444",
    projects: [
      { id: 61, title: "Robô Besouro Vibrador (Vibro-Bot)", time: "25 min", age: "6-10 anos", mats: "Escova de dente cortada, mini motor DC com pedaço de borracha na ponta, pilha moeda", how: "A vibração do motor faz as cerdas inclinadas correrem pela mesa.", sci: "Massa excêntrica rotativa gerando vibração ressonante direcional." },
      { id: 62, title: "Lanterna Tática Caseira com Interruptor de Clipe", time: "20 min", age: "5-9 anos", mats: "Rolo de papelão, LED brilhante, 2 pilhas AA em série, clipe de papel", how: "Deslizar o clipe fecha o contato de metal e acende a lanterna com foco brilhante.", sci: "Circuito elétrico fechado em série e polaridade de diodos emissores de luz (LED)." },
      { id: 63, title: "Labirinto Elétrico do Alarme Sonoro/Luminoso", time: "30 min", age: "6-11 anos", mats: "Arame de cobre dobrado com curvas, argola de arame, buzzer ou LED, pilha", how: "Se a argola encostar no arame do percurso, o alarme toca denunciando o erro.", sci: "Chave táctil de circuito aberto acionada por contato condutor momentâneo." },
      { id: 64, title: "Eletroímã Poderoso de Prego e Fio de Cobre", time: "25 min", age: "7-12 anos", mats: "Prego grande de ferro, 1 metro de fio esmaltado fino enrolado, pilha D", how: "Ao conectar na pilha, o prego atrai clipes e parafusos como um ímã mágico.", sci: "Lei de Ampère: Corrente elétrica passando por solenoide gera campo magnético intenso." },
      { id: 65, title: "Ventilador Portátil de Mão USB/Pilha", time: "30 min", age: "6-10 anos", mats: "Motorzinho DC de brinquedo quebrado, hélice de plástico, suporte de papelão", how: "Gera uma brisa refrescante apertando o botão na lateral do cabo.", sci: "Conversão de energia elétrica em energia mecânica rotacional por forças de Lorentz." },
      { id: 66, title: "Giroscópio Iluminado com LEDs Giratórios", time: "35 min", age: "7-11 anos", mats: "Tampa de pote giratória, bateria de lítio, LEDs coloridos em raios", how: "Ao girar o pião, as luzes se fundem em círculos brilhantes no escuro.", sci: "Persistência retiniana da visão humana (POV) criando ilusão de imagem contínua." },
      { id: 67, title: "Carrinho Elétrico com Motor Reduzido de Polia", time: "45 min", age: "8-12 anos", mats: "Chassi de papelão, motor DC, elástico fino como correia para o eixo grande", how: "O motor gira rápido e a polia grande reduz a velocidade aumentando a força das rodas.", sci: "Transmissão mecânica por correia com multiplicação de torque motor." },
      { id: 68, title: "Detector de Metais e Condutividade por Água", time: "30 min", age: "7-11 anos", mats: "Duas pontas de prova de grafite, LED indicador, solução de água com sal", how: "Mergulhar as pontas na água salgada acende a luz; na água pura ela fica apagada.", sci: "Eletrólise e condução iônica de corrente por íons livres de sódio e cloro." },
      { id: 69, title: "Semáforo Inteligente com Chave de 3 Posições", time: "35 min", age: "6-10 anos", mats: "3 LEDs (Vermelho, Amarelo, Verde), resistores de 220 ohms, seletor de papelão", how: "Girar o ponteiro acende apenas uma cor de cada vez, ensinando as regras de trânsito.", sci: "Chave comutadora multipolos e controle individual de ramais paralelos." },
      { id: 70, title: "Mini Campainha Residencial com Eletroímã e Haste", time: "40 min", age: "8-12 anos", mats: "Bobina caseira, lâmina de metal flexível, tampinha de metal para soar", how: "Apertar o interruptor atrai a haste que bate na tampa com som claro 'BEEP'.", sci: "Relé eletromecânico e ciclo de interrupção automática de circuito." },
      { id: 71, title: "Robô Limpador de Mesa com Esponja Vibratória", time: "30 min", age: "6-10 anos", mats: "Esponja de cozinha retangular, motor vibratório no topo, 2 olhos esbugalhados", how: "Vibra e varre farelos e pó da mesa enquanto anda aleatoriamente.", sci: "Distribuição randômica de movimento por vetor de vibração oscilante." },
      { id: 72, title: "Teégrafo de Código Morse de Madeira e Parafuso", time: "35 min", age: "7-12 anos", mats: "Tábua pequena, lâmina de metal como manipulador, buzzer piezoelétrico", how: "Pressionar a chave emite pulsos curtos (pontos) e longos (traços) sonoros.", sci: "Telecomunicações analógicas pioneiras e codificação binária Morse." },
      { id: 73, title: "Carrossel Giratório Motorizado com Músicos", time: "45 min", age: "7-11 anos", mats: "Disco de papelão, motor central com redutor, bonequinhos de papel", how: "Gira suavemente como um parque de diversões acionado por chave liga-desliga.", sci: "Redução de engrenagens para rotação estável de baixa rotação e alta estabilidade." },
      { id: 74, title: "Luminária de Cabeceira com Ajuste de Brilho (Potenciômetro)", time: "30 min", age: "8-12 anos", mats: "Grafite de lápis 6B grosso, clipe condutor deslizante, LED branco", how: "Deslizar o clipe pelo grafite deixa a luz mais fraca ou mais forte à vontade.", sci: "Resistência ôhmica variável proporcional ao comprimento do condutor condutivo." },
      { id: 75, title: "Robô com Sensor de Toque Frontal tipo 'Bate e Volta'", time: "50 min", age: "8-12 anos", mats: "Dois interruptores de fim de curso ou arames de toque no para-choque", how: "Ao bater em um obstáculo, o motor inverte a polaridade e o robô recua.", sci: "Inversão de sentido de rotação de motor DC por chaveamento H-Bridge simplificado." },
      { id: 76, title: "Globo Espacial com Fibra Óptica Caseira Iluminada", time: "35 min", age: "6-10 anos", mats: "Fios de pesca de nylon transparentes agrupados, LED superbrilhante na base", how: "A luz entra pela ponta inferior e viaja pelas curvas até sair brilhante nas pontas soltas.", sci: "Reflexão interna total em guias de onda ópticos (tecnologia de fibra óptica)." },
      { id: 77, title: "Alarme de Porta Anti-Intrusos Secreto de Gaveta", time: "30 min", age: "7-11 anos", mats: "Prendedor de roupa com contatos de papel alumínio e cartão isolante amarrado", how: "Ao abrir a porta, o cartão é puxado, os contatos se tocam e o alarme soa.", sci: "Sensor normalmente fechado por quebra de barreira isolante mecânica." },
      { id: 78, title: "Bateria Química Natural com Moedas e Vinagre", time: "25 min", age: "7-12 anos", mats: "5 moedas de cobre, arruelas de zinco, papel toalha molhado em vinagre", how: "Empilhar em camadas acende um mini LED vermelho sem nenhuma pilha comprada!", sci: "Pilha galvânica de Volta: reação redox entre cobre e zinco em meio ácido." },
      { id: 79, title: "Robô Solitário que Segue Luz (Fotovolt)", time: "55 min", age: "9-12 anos", mats: "Dois LDRs (fotoresistores), 2 transistores BC548, 2 motores de vibrador", how: "Ao iluminar o robô com a lanterna do celular, ele corre em direção à luz.", sci: "Ponte de controle proporcional por fototransistência analógica sem microcontrolador." },
      { id: 80, title: "Canhão Magnético Gauss de Disparo Rápido", time: "35 min", age: "8-12 anos", mats: "Trilho de régua, 3 ímãs de neodímio fortes espaçados, 6 esferas de aço", how: "Uma bolinha rolando devagar dispara a última com velocidade impressionante.", sci: "Aceleração em cascata por conservação de energia e potencial de campo magnético." }
    ]
  },
  {
    name: "Módulo 5: Hidráulica & Pneumática com Seringas",
    desc: "A potência dos fluidos pressurizados para erguer e mover cargas reais.",
    color: "#06B6D4",
    projects: [
      { id: 81, title: "Braço Mecânico Hidráulico de 2 Graus de Liberdade", time: "45 min", age: "7-12 anos", mats: "4 seringas de 10ml, 2 mangueirinhas plásticas, água com corante, papelão", how: "Empurrar as seringas no controle mestre ergue e dobra o braço mecânico à distância.", sci: "Princípio de Pascal: a pressão exercida em fluido confinado transmite-se integralmente." },
      { id: 82, title: "Ponte Elevadiça Hidráulica Dupla", time: "40 min", age: "6-11 anos", mats: "Duas seringas na base sob as pistas de papelão conectadas em T", how: "Um único comando de seringa levanta as duas pistas da ponte ao mesmo tempo.", sci: "Divisão de fluxo hidráulico em paralelo mantendo pressões equalizadas." },
      { id: 83, title: "Plataforma Elevatória Pantográfica (Tesoura)", time: "50 min", age: "8-12 anos", mats: "Mecanismo pantográfico de palitos acionado horizontalmente por pistão seringa", how: "O cilindro avança 4cm na horizontal e ergue a plataforma 15cm na vertical.", sci: "Conversão geométrica de curso horizontal em elevação vertical com trava de fluido." },
      { id: 84, title: "Garra Hidráulica de Precisão de Alta Pressão", time: "40 min", age: "7-12 anos", mats: "Pistão hidráulico central fechando pinças duplas com dentes de borracha", how: "Agarra e ergue copos e blocos com firmeza sem precisar de motor nem bateria.", sci: "Transmissão incompressível de força sem folgas típicas de engrenagens." },
      { id: 85, title: "Escavadeira com Concha Articulada e Rotação", time: "60 min", age: "9-12 anos", mats: "6 seringas coloridas no painel de comando estilo Joystick", how: "Opera como uma máquina pesada real da construção civil na caixa de areia.", sci: "Controle multieixo em circuito fechado emulado de sistemas hidráulicos industriais." },
      { id: 86, title: "Lançador Pneumático de Foguetes por Impacto de Pistão", time: "25 min", age: "6-10 anos", mats: "Seringa grande de 60ml conectada a tubo de canudo longo", how: "Bater com a palma da mão no êmbolo da seringa lança o dardo a 10 metros.", sci: "Compressão adiabática rápida gerando pico instantâneo de pressão pneumática." },
      { id: 87, title: "Prensa Hidráulica Capaz de Amassar Latas", time: "45 min", age: "8-12 anos", mats: "Seringa pequena de 5ml conectada a seringa larga de 50ml, estrutura de madeira", how: "Com a força do dedo mínimo na seringa fina, a seringa grossa esmaga objetos.", sci: "Multiplicação mecânica de força pela razão das áreas dos pistões ($F_2 = F_1 \\cdot A_2 / A_1$)." },
      { id: 88, title: "Porta de Garagem Automática Basculante com Cilindro", time: "35 min", age: "6-10 anos", mats: "Portão de papelão com braço oscilante preso a cilindro hidráulico", how: "Puxar a seringa no painel abre a porta suavemente para o carrinho passar.", sci: "Cinemática de quadrilátero articulado com acionamento linear angular." },
      { id: 89, title: "Caminhão Basculante com Caçamba Basculante por Seringa", time: "40 min", age: "6-10 anos", mats: "Chassi com caçamba de papelão inclinável por cilindro inferior", how: "Descarrega pedrinhas e peças de lego inclinando a caçamba a 45 graus.", sci: "Ponto de ancoragem de força e ângulo favorável de alavanca de torque." },
      { id: 90, title: "Robô Lutador de Sumo com Chute Pneumático", time: "35 min", age: "7-11 anos", mats: "Duas seringas com ar em circuito pneumático de disparo rápido", how: "Aperto súbito dispara o braço que empurra o robô adversário para fora do ringue.", sci: "Pneumática rápida: compressibilidade de gases gerando acelerações explosivas." },
      { id: 91, title: "Submarino com Mergulhador Cartesiano Hidráulico", time: "20 min", age: "5-9 anos", mats: "Garrafa plástica cheia de água, tampa de caneta com massinha dentro", how: "Apertar o lado da garrafa faz o mergulhador descer no fundo; soltar faz subir.", sci: "Variação de empuxo por compressão da bolha de ar dentro do corpo flutuante." },
      { id: 92, title: "Freio a Disco Hidráulico em Miniatura", time: "35 min", age: "8-12 anos", mats: "Disco plástico em eixo giratório, duas pastilhas acionadas por seringa", how: "Pressionar o freio aperta as pastilhas travando a rotação na hora.", sci: "Sistemas de frenagem automotiva hidráulica ABS por pinça e atrito dinâmico." },
      { id: 93, title: "Canhão de Água de Alta Pressão com Direcionamento", time: "30 min", age: "6-10 anos", mats: "Seringa com agulha plástica sem ponta montada em torre giratória", how: "Dispara jatos finos de água precisos para apagar velas e derrubar copos a 4 metros.", sci: "Equação da continuidade de Bernoulli: redução de diâmetro aumenta velocidade de escoamento." },
      { id: 94, title: "Balança Hidrostática Pesadora por Pressão de Coluna", time: "35 min", age: "7-11 anos", mats: "Bolsa de ar ou líquido conectada a coluna vertical milimetrada", how: "Colocar pesos sobre a base eleva a coluna de líquido em escala proporcional.", sci: "Manometria hidrostática: medição de peso por pressão de coluna fluida." },
      { id: 95, title: "Elevador Automotivo de Oficina de 4 Torres", time: "50 min", age: "8-12 anos", mats: "4 seringas sob 4 colunas conectadas por tubos ramificados", how: "Ergue miniaturas de carros nos 4 pontos de apoio perfeitamente nivelados.", sci: "Equilíbrio hidrostático de vasos comunicantes interligados." },
      { id: 96, title: "Barreira de Contenção Marítima Inflável", time: "30 min", age: "6-10 anos", mats: "Tubos flexíveis inflados por seringa de ar na bacia d'água", how: "Ao inflar, cria uma barreira flutuante que impede passagem de óleo ou folhas.", sci: "Engenharia de controle de poluição marítima por barreiras de flutuação positiva." },
      { id: 97, title: "Bomba D'água Manual Aspirante-Premente de Duas Válvulas", time: "40 min", age: "8-12 anos", mats: "Seringa grande com duas bolinhas de gude servindo de válvulas de retenção", how: "Bombear o êmbolo puxa água de um pote e ejeta sem retorno no outro pote.", sci: "Válvulas unidirecionais 'check-valves' que transformam vai-e-vem em fluxo unidirecional." },
      { id: 98, title: "Guilhotina Hidráulica de Recorte Suave de Massinha", time: "35 min", age: "6-10 anos", mats: "Lâmina plástica sem fio guiada por duas colunas e cilindro", how: "Corta cilindros de massinha com precisão milimétrica sem esforço da mão.", sci: "Corte por cisalhamento com força constante controlada hidraulicamente." },
      { id: 99, title: "Mão Robótica com Tendões Fluídicos Flexíveis", time: "50 min", age: "8-12 anos", mats: "5 tubos finos flexíveis com água conectados a pontas de dedo de borracha", how: "A pressão dilata os canais internos curvando os dedos de forma orgânica macia.", sci: "Robótica flexível ('Soft Robotics') para manipulação segura e delicada." },
      { id: 100, title: "Simulador de Terremoto com Plataforma Sísmica de Pistões", time: "45 min", age: "7-12 anos", mats: "Mesa montada sobre molas com dois pistões cruzados para trepidação", how: "Movimentar as seringas em ritmos diferentes testa se prédios de papelão caem.", sci: "Engenharia antissísmica: ondas P e S e ressonância estrutural de edifícios." }
    ]
  },
  {
    name: "Módulo 6: Truques Físicos & Feira de Ciências",
    desc: "Experimentos visuais inacreditáveis para impressionar amigos e professores.",
    color: "#8B5CF6",
    projects: [
      { id: 101, title: "Vulcão Químico Cromático com Erupção Efervescente", time: "20 min", age: "5-9 anos", mats: "Bicarbonato de sódio, detergente, vinagre, corante alimentício", how: "Despejar o vinagre sobre o cone causa uma erupção de espuma colorida efervescente.", sci: "Reação ácido-base com liberação rápida de gás dióxido de carbono ($CO_2$)." },
      { id: 102, title: "Lâmpada de Lava Caseira Efervescente sem Eletricidade", time: "15 min", age: "5-10 anos", mats: "Garrafa transparente, óleo de cozinha, água com corante, pastilha efervescente", how: "Bolhas coloridas sobem e descem em dança relaxante dentro do óleo transparente.", sci: "Imiscibilidade de líquidos, diferença de densidades e empuxo de gases dissolvidos." },
      { id: 103, title: "Caleidoscópio Mágico de Espelhos Triangulares", time: "25 min", age: "6-10 anos", mats: "3 lâminas reflexivas ou réguas espelhadas em triângulo, miçangas coloridas", how: "Olhar pelo orifício e girar forma mandalas geométricas simétricas infinitas.", sci: "Reflexões múltiplas sucessivas em superfícies espelhadas inclinadas a 60 graus." },
      { id: 104, title: "Tornado Líquido na Garrafa com Vórtice Perfeito", time: "15 min", age: "5-9 anos", mats: "Duas garrafas PET conectadas boca a boca com arruela central", how: "Girar as garrafas em círculo cria um funil de água perfeito escoando no centro.", sci: "Conservação do momento angular e dinâmica de turbilhonamento centrípeto." },
      { id: 105, title: "Ilusão Óptica Taumatrópio de Animação Rápida", time: "15 min", age: "5-8 anos", mats: "Disco de papel com gaiola de um lado e pássaro do outro, elásticos", how: "Girar os elásticos faz o disco rodar veloz e o pássaro parece estar dentro da gaiola.", sci: "Persistência visual: fusão de imagens separadas pelo cérebro em 1/10 de segundo." },
      { id: 106, title: "Arco-Íris Líquido de 5 Densidades Não Misturáveis", time: "25 min", age: "6-11 anos", mats: "Mel, detergente, água com corante, óleo e álcool colorido", how: "Despejar com calma na taça cria 5 listras coloridas nítidas que não se misturam.", sci: "Gradiente de densidade e forças de tensão superficial entre líquidos polares e apolares." },
      { id: 107, title: "Pêndulo de Areia Desenhador de Curvas Lissajous", time: "30 min", age: "7-12 anos", mats: "Funil com areia fina suspenso por cabo duplo em Y", how: "Ao soltar o funil, a areia desenha padrões matemáticos perfeitos na bandeja escura.", sci: "Movimento harmônico amortecido em dois eixos perpendiculares ortogonais." },
      { id: 108, title: "Bateria de Limão que Acende Relógio Digital", time: "30 min", age: "7-12 anos", mats: "4 limões ácidos, placas de cobre e pregos galvanizados de zinco", how: "Conectar os limões em série gera 3 Volts suficientes para ligar um display de LCD.", sci: "Célula eletroquímica usando o ácido cítrico como eletrólito despolarizante." },
      { id: 109, title: "Pássaro Equilibrador que Não Cai pelo Bico", time: "20 min", age: "5-8 anos", mats: "Papelão recortado em forma de águia com moedas coladas nas pontas das asas", how: "A ave equilibra o bico finamente sobre o dedo sem cair mesmo quando empurrada.", sci: "Centro de gravidade rebaixado abaixo do ponto de pivô de sustentação." },
      { id: 110, title: "Flauta de Pã de Canudos com Escala Musical Afinada", time: "20 min", age: "6-10 anos", mats: "8 canudos cortados em comprimentos decrescentes fixados com fita", how: "Soprar nas bordas produz notas musicais claras de dó a dó agudo.", sci: "Frequência de ressonância de colunas de ar em tubos sonoros semiabertos." },
      { id: 111, title: "Leite Mágico Psicodélico com Explosão de Cores", time: "15 min", age: "5-8 anos", mats: "Prato fundo com leite integral, gotas de corantes, cotonete com detergente", how: "Tocar o cotonete faz os corantes explodirem em desenhos radiais instantâneos.", sci: "Ruptura brusca da tensão superficial e dissolução micelar das gorduras do leite." },
      { id: 112, title: "Pára-quedas de Precisão com Gaiola de Resgate", time: "25 min", age: "5-9 anos", mats: "Sacola plástica leve cortada em octógono, 8 fios iguais, bonequinho", how: "Lançado no alto, abre perfeitamente e pousa devagar sem virar.", sci: "Força de arrasto aerodinâmico equilibrando a força peso em velocidade terminal constante." },
      { id: 113, title: "Estéreo Telefone de Copos e Fio de Tensão Acústica", time: "15 min", age: "5-8 anos", mats: "Dois copos descartáveis, 10 metros de barbante esticado sem nós", how: "Sussurrar no copo é ouvido perfeitamente na outra sala com som cristalino.", sci: "Transmissão mecânica de ondas sonoras longitudinais em meios sólidos tensionados." },
      { id: 114, title: "Bússola de Bolso Flutuante com Agulha Imantada", time: "15 min", age: "6-10 anos", mats: "Agulha de costura esfregada no ímã, rodela de rolha de cortiça, tigela com água", how: "A agulha gira sozinha e aponta com exatidão para o Norte Magnético da Terra.", sci: "Alinhamento com as linhas do campo geomagnético planetário." },
      { id: 115, title: "Mesa Invisível Tensegrity (Tensão Flutuante)", time: "40 min", age: "8-12 anos", mats: "Dois suportes de papelão em gancho unidos apenas por 3 fios de nylon", how: "A parte de cima flutua no ar sustentando pesos sem nenhuma haste sólida no meio!", sci: "Princípio da Tensegridade: equilíbrio mecânico estático por tração contínua." },
      { id: 116, title: "Impressora de Sombras Estelares para o Teto do Quarto", time: "25 min", age: "5-9 anos", mats: "Caixa cilíndrica com constelações furadas com alfinete, lanterna no centro", how: "No quarto escuro, projeta as estrelas e signos no teto e paredes com nitidez.", sci: "Propagação retilínea da luz e projeção ponto-a-ponto com fonte focal pontual." },
      { id: 117, title: "Pistola de Vórtice de Fumaça/Ar (Canhão de Toros)", time: "30 min", age: "7-11 anos", mats: "Garrafa plástica grande com fundo cortado e balão cobrindo, bico estreito", how: "Bater na bexiga dispara anéis de vento invisíveis que apagam velas a 3 metros.", sci: "Anéis de vórtice toroidal de ar com conservação de circulação fluida de Helmholtz." },
      { id: 118, title: "Espelho Infinito de Luz com Vidro Espelhado", time: "45 min", age: "8-12 anos", mats: "Caixinha rasa, espelho normal no fundo, fita de LED nas bordas, espelho semi-reflexivo", how: "Ao acender, parece um túnel luminoso 3D sem fim adentrando na parede.", sci: "Reflexão infinita atenuada entre espelho total e divisor de feixe semi-espelhado." },
      { id: 119, title: "Holograma 3D para Smartphone com Pirâmide Transparente", time: "20 min", age: "7-12 anos", mats: "Folha de plástico de acetato transparente recortada em pirâmide de 4 faces", how: "Colocar no centro do celular projeta robôs e peixes flutuando em 3D realista no ar.", sci: "Técnica de projeção Pepper's Ghost com reflexão parcial de 4 ângulos coordenados." },
      { id: 120, title: "O Grande Troféu e Diploma do Pequeno Inventor com Selo de Cera", time: "25 min", age: "5-12 anos", mats: "Papel diploma de alta gramatura, molde de troféu dourado montável de papelão", how: "Assinado pelos pais e pela criança na conclusão dos 120 projetos da oficina.", sci: "Recompensa psicológica de conquista, autoestima criativa e autonomia pessoal consolidada." }
    ]
  }
];

function generateHtml() {
  let projectsHtml = '';

  for (const mod of modules) {
    projectsHtml += `
      <div style="page-break-before: always; margin-top: 20px;">
        <div style="background: ${mod.color}; color: white; padding: 18px 24px; border-radius: 16px; margin-bottom: 24px;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 900;">${mod.name}</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">${mod.desc}</p>
        </div>
    `;

    for (const p of mod.projects) {
      projectsHtml += `
        <div class="card-project">
          <div class="proj-header">
            <span class="proj-num">#${p.id.toString().padStart(3, '0')}</span>
            <div class="proj-title">${p.title}</div>
          </div>
          <div class="proj-meta">
            <span class="meta-tag">⏱️ ${p.time}</span>
            <span class="meta-tag">👶 ${p.age}</span>
            <span class="meta-tag">📦 ${p.mats}</span>
          </div>
          <div class="step-box">
            <strong>Como Montar e Brincar:</strong> ${p.how}
          </div>
          <div class="science-explain">
            <strong>🔬 A Ciência em Ação:</strong> ${p.sci}
          </div>
        </div>
      `;
    }

    projectsHtml += `</div>`;
  }

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Mega Pack de Inventores | 120 Projetos Oficiais</title>
  <style>
    @page { size: A4; margin: 1.2cm; }
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; line-height: 1.45; font-size: 12px; }
    
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 85vh;
      border: 8px solid #2563EB;
      border-radius: 28px;
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
      box-sizing: border-box;
    }
    .badge {
      display: inline-block;
      background-color: #2563EB;
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
      font-size: 38px;
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 15px;
      color: #1e3a8a;
    }
    .cover-sub {
      font-size: 15px;
      color: #475569;
      max-width: 500px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .seal-box {
      display: flex;
      gap: 20px;
      margin-top: 15px;
    }
    .seal {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #F59E0B;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: 900;
      font-size: 13px;
      box-shadow: 0 4px 12px rgba(245,158,11,0.3);
    }
    .seal-green { background: #10B981; box-shadow: 0 4px 12px rgba(16,185,129,0.3); }

    .toc-page {
      page-break-after: always;
      padding: 20px 10px;
    }
    .toc-title {
      font-size: 24px;
      font-weight: 900;
      color: #1e3a8a;
      border-bottom: 3px solid #2563EB;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .toc-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      margin-bottom: 8px;
      background: #f8fafc;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
    }

    .card-project {
      page-break-inside: avoid;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      padding: 14px 18px;
      margin-bottom: 14px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .proj-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }
    .proj-num {
      background: #e0e7ff;
      color: #3730a3;
      font-weight: 900;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .proj-title {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
    }
    .proj-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 10.5px;
      font-weight: 700;
      color: #64748b;
    }
    .meta-tag {
      background: #f1f5f9;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .step-box {
      background: #f8fafc;
      border-left: 3.5px solid #2563EB;
      padding: 8px 12px;
      margin-bottom: 6px;
      font-size: 11.5px;
    }
    .science-explain {
      background: #fef3c7;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 11px;
      color: #92400e;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <div class="badge">ACERVO OFICIAL COMPLETO · 120 PROJETOS</div>
    <div class="cover-title">MEGA PACK DE INVENTORES</div>
    <div class="cover-sub">
      O Guia Prático Definitivo de Robótica, Ciência & Mecânica com Sucata e Recicláveis Caseiros para Crianças de 5 a 12 Anos.
    </div>
    <div class="seal-box">
      <div class="seal">
        <span>120</span>
        <span style="font-size: 10px;">PROJETOS</span>
      </div>
      <div class="seal seal-green">
        <span>100%</span>
        <span style="font-size: 10px;">PRÁTICO</span>
      </div>
    </div>
    <p style="margin-top: 35px; font-size: 11px; color: #64748b; font-weight: 600;">
      Oficina do Pequeno Inventor · Edição Especial Homologada 2026
    </p>
  </div>

  <div class="toc-page">
    <div class="toc-title">Sumário do Acervo dos 120 Projetos</div>
    <div class="toc-item"><span>Módulo 1: Robôs, Andadores & Autômatos de Papelão</span><span style="color: #2563EB;">Projetos 001 a 020</span></div>
    <div class="toc-item"><span>Módulo 2: Máquinas Simples & Alavancas Mecânicas</span><span style="color: #F59E0B;">Projetos 021 a 040</span></div>
    <div class="toc-item"><span>Módulo 3: Veículos a Propulsão & Corridas Rápidas</span><span style="color: #10B981;">Projetos 041 a 060</span></div>
    <div class="toc-item"><span>Módulo 4: Eletricidade Básica & Circuitos com Pilha</span><span style="color: #EF4444;">Projetos 061 a 080</span></div>
    <div class="toc-item"><span>Módulo 5: Hidráulica & Pneumática com Seringas</span><span style="color: #06B6D4;">Projetos 081 a 100</span></div>
    <div class="toc-item"><span>Módulo 6: Truques Físicos & Feira de Ciências</span><span style="color: #8B5CF6;">Projetos 101 a 120</span></div>
  </div>

  ${projectsHtml}
</body>
</html>
  `;
}

async function run() {
  console.log("Iniciando compilação do Mega Pack Oficial com 120 Projetos...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const html = generateHtml();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  const pdfPath = path.join(downloadsDir, 'mega_pack_120_projetos.pdf');
  console.log("Renderizando PDF em padrão A4 vetorial...");
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
  });

  const stats = fs.statSync(pdfPath);
  console.log(`✅ PDF Completo Gerado com Sucesso!`);
  console.log(`Arquivo: ${pdfPath}`);
  console.log(`Tamanho: ${(stats.size / 1024).toFixed(1)} KB`);

  await browser.close();
}

run().catch(console.error);
