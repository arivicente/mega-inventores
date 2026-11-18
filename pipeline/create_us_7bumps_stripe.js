const fs = require('fs');
const path = require('path');

const env = fs.readFileSync(path.resolve('mega-inventors', 'regions', 'en', '.env'), 'utf8');
const stripeKey = env.match(/STRIPE_SECRET_KEY=(.+)/)[1].trim();

const BUMPS = [
  {
    id: 'pequenos_engenheiros',
    name: '🛠️ Little Engineers: 10 Starter Projects for Young Minds',
    desc: '10 fun, hands-on starter projects to build, invent, and learn through play.',
    amount: 11.99
  },
  {
    id: 'robotica_movimento',
    name: '🤖 Moving Robotics: 24 Cardboard Articulated Mechanisms',
    desc: 'Robots that actually move and grasp: 24 cardboard mechanisms with printable blueprints.',
    amount: 11.99
  },
  {
    id: 'cientistas_casa',
    name: '🔬 Scientists at Home: 60 Illustrated Kitchen Experiments',
    desc: '60 illustrated experiments to explore chemistry and physics using ordinary household items.',
    amount: 11.99
  },
  {
    id: 'tecnologia_sem_telas',
    name: '🏆 Screen-Free Tech: 40 Level-Up Challenges & Badges',
    desc: '40 progressive STEM challenges with a printable progress board and achievement diplomas.',
    amount: 11.99
  },
  {
    id: 'maquinas_hidraulicas',
    name: '🚀 Hydraulic Machines: 10 Water-Powered Challenges',
    desc: 'Build working hydraulic excavators and discover fluid power through family play.',
    amount: 11.99
  },
  {
    id: 'festa_inventores',
    name: "🎉 The Inventor's Birthday Party: Complete Themed Kit",
    desc: 'Editable invitations, printable decorations, group challenges, and engineer badges.',
    amount: 11.99
  },
  {
    id: 'diario_inventor',
    name: "📓 My Inventor's Journal: 30 Days of Creation & Blueprints",
    desc: '30 daily creative prompts, blueprint sketch pages, and testing logs. Print and start creating!',
    amount: 11.99
  }
];

async function createUSLinkWith7Bumps() {
  console.log('--- CRIANDO STRIPE PAYMENT LINK US COM 7 ORDER BUMPS ---');

  // 1. Create main product ($27)
  const prodParams = new URLSearchParams();
  prodParams.append('name', "The Young Inventor's Mega Pack: 120 Hands-On STEM & Robotics Projects");
  prodParams.append('description', 'Instant Digital Access • Blueprints, Video Guides & 5 Super Bonuses');

  const resProd = await fetch('https://api.stripe.com/v1/products', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + stripeKey, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: prodParams.toString()
  });
  const mainProd = await resProd.json();

  const priceParams = new URLSearchParams();
  priceParams.append('product', mainProd.id);
  priceParams.append('unit_amount', '2700');
  priceParams.append('currency', 'usd');

  const resPrice = await fetch('https://api.stripe.com/v1/prices', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + stripeKey, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: priceParams.toString()
  });
  const mainPrice = await resPrice.json();

  // 2. Build Payment Link Params
  const plParams = new URLSearchParams();
  plParams.append('line_items[0][price]', mainPrice.id);
  plParams.append('line_items[0][quantity]', '1');

  // 3. Add each of the 7 bumps
  let idx = 1;
  for (const b of BUMPS) {
    const bProdParams = new URLSearchParams();
    bProdParams.append('name', b.name);
    bProdParams.append('description', b.desc);
    const bResProd = await fetch('https://api.stripe.com/v1/products', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + stripeKey, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bProdParams.toString()
    });
    const bProd = await bResProd.json();

    const bPriceParams = new URLSearchParams();
    bPriceParams.append('product', bProd.id);
    bPriceParams.append('unit_amount', Math.round(b.amount * 100).toString());
    bPriceParams.append('currency', 'usd');
    const bResPrice = await fetch('https://api.stripe.com/v1/prices', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + stripeKey, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bPriceParams.toString()
    });
    const bPrice = await bResPrice.json();

    plParams.append(`line_items[${idx}][price]`, bPrice.id);
    plParams.append(`line_items[${idx}][quantity]`, '1');
    plParams.append(`line_items[${idx}][adjustable_quantity][enabled]`, 'true');
    plParams.append(`line_items[${idx}][adjustable_quantity][minimum]`, '0');
    plParams.append(`line_items[${idx}][adjustable_quantity][maximum]`, '1');
    idx++;
  }

  plParams.append('after_completion[type]', 'redirect');
  plParams.append('after_completion[redirect][url]', 'https://mega-inventors-us.codhun.workers.dev/thank-you.html');

  const resPL = await fetch('https://api.stripe.com/v1/payment_links', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + stripeKey, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: plParams.toString()
  });
  const pl = await resPL.json();
  if (pl.error) {
    console.error('Error creating payment link:', pl.error);
    throw new Error(pl.error.message);
  }

  console.log('\n✓ NOVO STRIPE LINK US COM 7 ORDER BUMPS CRIADO:');
  console.log('URL:', pl.url);
  console.log('ID:', pl.id);

  // Save to stripe_links.json
  const linksFile = path.resolve('mega-inventors', 'assets', 'translations', 'stripe_links.json');
  const links = JSON.parse(fs.readFileSync(linksFile, 'utf8'));
  links.us_7bumps = pl.url;
  fs.writeFileSync(linksFile, JSON.stringify(links, null, 2));

  return pl.url;
}

createUSLinkWith7Bumps().catch(console.error);
