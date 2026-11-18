import fs from 'fs';

// Read .env if not already loaded
if (!process.env.STRIPE_SECRET_KEY && fs.existsSync('mega-inventores/.env')) {
  const envContent = fs.readFileSync('mega-inventores/.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = match[2].trim();
    }
  }
}

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_KEY) {
  console.error("STRIPE_SECRET_KEY não encontrado!");
  process.exit(1);
}

async function stripeRequest(endpoint, method = 'GET', data = null) {
  const url = `https://api.stripe.com/v1${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${STRIPE_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  if (data && method !== 'GET') {
    const params = new URLSearchParams();
    function appendData(prefix, val) {
      if (val === null || val === undefined) return;
      if (typeof val === 'object' && !Array.isArray(val)) {
        for (const [k, v] of Object.entries(val)) {
          appendData(`${prefix}[${k}]`, v);
        }
      } else if (Array.isArray(val)) {
        val.forEach((item, index) => {
          appendData(`${prefix}[${index}]`, item);
        });
      } else {
        params.append(prefix, val.toString());
      }
    }
    for (const [k, v] of Object.entries(data)) {
      appendData(k, v);
    }
    options.body = params.toString();
  }

  const res = await fetch(url, options);
  const json = await res.json();
  return { ok: res.ok, status: res.status, data: json };
}

// OS 7 ORDER BUMPS OFICIAIS IDENTIFICADOS NO CHECKOUT DA HOTMART
const PRODUCTS_CONFIG = [
  {
    key: "main",
    name: "Mega Pack de Inventores: 120 Projetos de Robótica & Ciência Caseira",
    description: "Biblioteca digital com 120 projetos passo a passo com papelão e recicláveis + 5 Super Bônus.",
    price: 3700, // R$ 37,00
    isMain: true
  },
  {
    key: "pequenos_engenheiros",
    name: "Pequeños Ingenieros: 10 Projetos para Pequenos Inventores",
    description: "10 projetos divertidos para criar, inventar e aprender brincando!",
    price: 2365, // R$ 23,65
    isMain: false
  },
  {
    key: "robotica_movimento",
    name: "Robótica com Movimento: 24 Mecanismos de Papelão",
    description: "Robôs que se movem de verdade: 24 mecanismos de papelão com moldes e gabaritos.",
    price: 2365, // R$ 23,65
    isMain: false
  },
  {
    key: "cientistas_casa",
    name: "Cientistas em Casa: 60 Experimentos Ilustrados",
    description: "60 Experimentos Ilustrados para descobrir a ciência, despertar a curiosidade e aprender brincando em família.",
    price: 2365, // R$ 23,65
    isMain: false
  },
  {
    key: "tecnologia_sem_telas",
    name: "Tecnologia sem Telas: 40 Desafios",
    description: "40 desafios por nível, com tabuleiro de progresso, emblemas e diplomas.",
    price: 2365, // R$ 23,65
    isMain: false
  },
  {
    key: "maquinas_hidraulicas",
    name: "Máquinas Hidráulicas: 10 Desafios com Água",
    description: "Construa máquinas hidráulicas e descubra como a água pode criar movimento enquanto aprende brincando em família.",
    price: 2365, // R$ 23,65
    isMain: false
  },
  {
    key: "fiesta_inventores",
    name: "Festa de Inventores: Kit Completo Temático",
    description: "Kit para organizar uma festa temática: convites editáveis, decoração para imprimir, guia de atividades e crachás.",
    price: 2365, // R$ 23,65
    isMain: false
  },
  {
    key: "diario_inventor",
    name: "Meu Diário de Inventor: 30 Dias de Criação",
    description: "30 dias para imaginar, desenhar e descobrir. Um diário ilustrado para registrar ideias, testes e melhorias.",
    price: 2365, // R$ 23,65
    isMain: false
  }
];

async function getOrCreateProduct(prodConfig) {
  const listRes = await stripeRequest('/products?limit=100');
  if (!listRes.ok) {
    throw new Error(`Erro ao listar produtos: ${JSON.stringify(listRes.data)}`);
  }

  let product = listRes.data.data.find(p => p.name.trim().toLowerCase() === prodConfig.name.trim().toLowerCase());

  if (!product) {
    console.log(`Criando produto: ${prodConfig.name}...`);
    const createRes = await stripeRequest('/products', 'POST', {
      name: prodConfig.name,
      description: prodConfig.description,
    });
    if (!createRes.ok) {
      throw new Error(`Erro ao criar produto ${prodConfig.name}: ${JSON.stringify(createRes.data)}`);
    }
    product = createRes.data;
    console.log(`✅ Produto criado: [${product.id}] ${product.name}`);
  } else {
    console.log(`ℹ️ Produto já existente: [${product.id}] ${product.name}`);
  }

  const pricesRes = await stripeRequest(`/prices?product=${product.id}&limit=20`);
  if (!pricesRes.ok) {
    throw new Error(`Erro ao listar preços para ${product.id}: ${JSON.stringify(pricesRes.data)}`);
  }

  let price = pricesRes.data.data.find(pr => pr.currency === 'brl' && pr.unit_amount === prodConfig.price && pr.active);

  if (!price) {
    console.log(`Criando preço de R$ ${(prodConfig.price / 100).toFixed(2)} para ${prodConfig.name}...`);
    const createPriceRes = await stripeRequest('/prices', 'POST', {
      product: product.id,
      unit_amount: prodConfig.price,
      currency: 'brl',
    });
    if (!createPriceRes.ok) {
      throw new Error(`Erro ao criar preço: ${JSON.stringify(createPriceRes.data)}`);
    }
    price = createPriceRes.data;
    console.log(`✅ Preço criado: [${price.id}] R$ ${(price.unit_amount / 100).toFixed(2)}`);
  } else {
    console.log(`ℹ️ Preço já existente: [${price.id}] R$ ${(price.unit_amount / 100).toFixed(2)}`);
  }

  return { key: prodConfig.key, product, price, isMain: prodConfig.isMain, priceNumber: prodConfig.price / 100 };
}

async function main() {
  console.log("=== CONFIGURANDO OS 7 ORDER BUMPS COMPLETOS NA STRIPE ===");

  const resolved = [];
  for (const config of PRODUCTS_CONFIG) {
    const res = await getOrCreateProduct(config);
    resolved.push(res);
  }

  const mainItem = resolved.find(r => r.isMain);
  const bumpItems = resolved.filter(r => !r.isMain);

  console.log(`\nCriando Payment Link com todos os ${bumpItems.length} Bumps Opcionais...`);

  const payload = {
    line_items: [
      {
        price: mainItem.price.id,
        quantity: 1
      }
    ],
    optional_items: bumpItems.map(item => ({
      price: item.price.id,
      quantity: 1
    })),
    after_completion: {
      type: "redirect",
      redirect: {
        url: "https://mega-inventores.pages.dev/obrigado.html?status=success"
      }
    }
  };

  const linkRes = await stripeRequest('/payment_links', 'POST', payload);
  if (!linkRes.ok) {
    console.error("Erro ao criar Payment Link:", JSON.stringify(linkRes.data, null, 2));
    process.exit(1);
  }

  const paymentLinkUrl = linkRes.data.url;
  console.log("\n=======================================================");
  console.log("🎉 STRIPE PAYMENT LINK COM OS 7 BUMPS CRIADO!");
  console.log(`URL: ${paymentLinkUrl}`);
  console.log("=======================================================\n");

  fs.writeFileSync('mega-inventores/public/stripe_products.json', JSON.stringify({
    paymentLinkUrl,
    products: resolved
  }, null, 2));
  console.log("Salvo stripe_products.json com sucesso!");
}

main().catch(err => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
