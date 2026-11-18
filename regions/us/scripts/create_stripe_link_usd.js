import fs from 'fs';
import path from 'path';

// Read .env if not already loaded
if (!process.env.STRIPE_SECRET_KEY && fs.existsSync('mega-inventors-us/.env')) {
  const envContent = fs.readFileSync('mega-inventors-us/.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = match[2].trim();
    }
  }
}

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_KEY) {
  console.error("STRIPE_SECRET_KEY not found in mega-inventors-us/.env!");
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

// 6 OFFICIAL HIGH-CONVERTING US ORDER BUMPS ($ USD)
const PRODUCTS_CONFIG = [
  {
    key: "main",
    name: "The Young Inventor's Mega Pack: 120 Hands-On STEM & Robotics Projects",
    description: "Instant digital access to 120 step-by-step DIY engineering projects using cardboard and everyday household items + 5 Super Bonuses.",
    price: 2700, // $27.00 USD
    isMain: true
  },
  {
    key: "little_engineers",
    name: "Little Engineers: 10 First-Timer Starter Builds (Ages 4-7)",
    description: "10 fun, easy, no-frustration projects designed specifically for younger builders.",
    price: 1299, // $12.99 USD
    isMain: false
  },
  {
    key: "robotics_motion",
    name: "Robotics in Motion: 24 Kinetic Cardboard Mechanisms",
    description: "Robots that actually walk, grasp, and move using simple cardboard cams, linkages, and levers.",
    price: 1499, // $14.99 USD
    isMain: false
  },
  {
    key: "kitchen_lab",
    name: "Kitchen Lab Scientists: 60 Hands-On Illustrated Experiments",
    description: "Discover physics and chemistry using everyday pantry ingredients. Illustrated step-by-step.",
    price: 1499, // $14.99 USD
    isMain: false
  },
  {
    key: "screen_free_reset",
    name: "The Screen-Free Dopamine Reset: 40 Gamified Weekly Challenges",
    description: "Level-based challenge tracks, printable reward badges, and official Inventor Certificates.",
    price: 1299, // $12.99 USD
    isMain: false
  },
  {
    key: "hydraulic_machines",
    name: "Hydraulic Power Machines: 10 Syringe & Water Physics Challenges",
    description: "Build moving excavators, robotic arms, and hydraulic lifts powered by water pressure.",
    price: 1299, // $12.99 USD
    isMain: false
  },
  {
    key: "inventor_journal",
    name: "The Young Inventor's Creative Blueprint Journal (30-Day Guided Log)",
    description: "A 30-day guided printable journal to plan, sketch, test, and improve custom inventions.",
    price: 1199, // $11.99 USD
    isMain: false
  }
];

async function getOrCreateProduct(prodConfig) {
  const listRes = await stripeRequest('/products?limit=100');
  if (!listRes.ok) {
    throw new Error(`Error listing products: ${JSON.stringify(listRes.data)}`);
  }

  let product = listRes.data.data.find(p => p.name.trim().toLowerCase() === prodConfig.name.trim().toLowerCase());

  if (!product) {
    console.log(`Creating product: ${prodConfig.name}...`);
    const createRes = await stripeRequest('/products', 'POST', {
      name: prodConfig.name,
      description: prodConfig.description,
    });
    if (!createRes.ok) {
      throw new Error(`Error creating product ${prodConfig.name}: ${JSON.stringify(createRes.data)}`);
    }
    product = createRes.data;
    console.log(`✓ Product created: [${product.id}] ${product.name}`);
  } else {
    console.log(`✓ Existing product found: [${product.id}] ${product.name}`);
  }

  const pricesRes = await stripeRequest(`/prices?product=${product.id}&limit=20`);
  if (!pricesRes.ok) {
    throw new Error(`Error listing prices for ${product.id}: ${JSON.stringify(pricesRes.data)}`);
  }

  let price = pricesRes.data.data.find(pr => pr.currency === 'usd' && pr.unit_amount === prodConfig.price && pr.active);

  if (!price) {
    console.log(`Creating price of $ ${(prodConfig.price / 100).toFixed(2)} USD for ${prodConfig.name}...`);
    const createPriceRes = await stripeRequest('/prices', 'POST', {
      product: product.id,
      unit_amount: prodConfig.price,
      currency: 'usd',
    });
    if (!createPriceRes.ok) {
      throw new Error(`Error creating price: ${JSON.stringify(createPriceRes.data)}`);
    }
    price = createPriceRes.data;
    console.log(`✓ Price created: [${price.id}] $ ${(price.unit_amount / 100).toFixed(2)} USD`);
  } else {
    console.log(`✓ Existing price found: [${price.id}] $ ${(price.unit_amount / 100).toFixed(2)} USD`);
  }

  return { key: prodConfig.key, product, price, isMain: prodConfig.isMain, priceNumber: prodConfig.price / 100 };
}

async function main() {
  console.log("=== CONFIGURING STRIPE PRODUCTS IN USD ===");

  const resolved = [];
  for (const config of PRODUCTS_CONFIG) {
    const res = await getOrCreateProduct(config);
    resolved.push(res);
  }

  const mainItem = resolved.find(r => r.isMain);
  const bumpItems = resolved.filter(r => !r.isMain);

  console.log("\nCreating Stripe Payment Link with Bumps...");

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
        url: "https://mega-inventors-us.codhun.workers.dev/thank-you.html?status=success"
      }
    }
  };

  const linkRes = await stripeRequest('/payment_links', 'POST', payload);
  if (!linkRes.ok) {
    console.error("Error creating Payment Link:", JSON.stringify(linkRes.data, null, 2));
    process.exit(1);
  }

  const paymentLinkUrl = linkRes.data.url;
  console.log("\n=======================================================");
  console.log("🚀 STRIPE PAYMENT LINK IN USD WITH 6 ORDER BUMPS CREATED!");
  console.log(`URL: ${paymentLinkUrl}`);
  console.log("=======================================================\n");

  const outPath = path.resolve('mega-inventors-us', 'public', 'stripe_products.json');
  fs.writeFileSync(outPath, JSON.stringify({
    paymentLinkUrl,
    products: resolved
  }, null, 2));
  console.log(`Saved ${outPath} successfully!`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
