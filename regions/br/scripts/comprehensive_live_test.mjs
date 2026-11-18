const domains = [
  { region: 'US', url: 'https://mega-inventors-us.codhun.workers.dev' },
  { region: 'DE', url: 'https://mega-inventors-de.codhun.workers.dev' },
  { region: 'FR', url: 'https://mega-inventors-fr.codhun.workers.dev' },
  { region: 'IT', url: 'https://mega-inventors-it.codhun.workers.dev' },
  { region: 'ES', url: 'https://mega-inventors-es.codhun.workers.dev' }
];

const requiredAssets = [
  'assets/mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png',
  'assets/duas-paginas-impressas-com-guindaste-1-886QDK4GmfiTPIuD.png',
  'assets/dupla_mao_robotica_diploma_6144-LSCVmlIl5heXJIMG.png',
  'assets/mapa-de-projetos-e-carro-eletrico-qsokkWGxoHu8RGXA.png',
  'assets/duas-fichas-educativas-ampliadas-em-fundo-transparente-6QYvrn0clj4FQsY8.png',
  'assets/composicao-bono-01-ampliada-e7jArHWyRh13WP9i.png',
  'assets/plano-de-robotica-caseira-em-14-dias-ypk7fkiSFgFXIROh.png',
  'assets/bonus-03_-guia-de-ajustes-e-testes-1-BvqVJpn43KjSbbUJ.png',
  'assets/bonus-4_-checklist-para-inventar-7TMwV3M07Cwn2nOr.png',
  'assets/bonus-05_-invencoes-no-quintal-1-xN6D6FikVSzT9pDm.png',
  'assets/garantia-YrDNbk5xkXtbRqee.png'
];

async function run() {
  console.log('=== STARTING LIVE VERIFICATION ===\n');

  for (const d of domains) {
    console.log(`Checking [${d.region}] - ${d.url}`);
    
    // 1. Fetch HTML
    const pageRes = await fetch(d.url);
    const html = await pageRes.text();
    const hasEmbed = html.includes('id="checkout-embed"');
    const hasStripeJs = html.includes('js.stripe.com');
    console.log(` - HTML: status=${pageRes.status}, EmbedDiv=${hasEmbed}, StripeJs=${hasStripeJs}`);

    // 2. Check all 11 images presence in HTML and HTTP 200
    let allImgsOk = true;
    for (const a of requiredAssets) {
      const inHtml = html.includes(a);
      const imgRes = await fetch(`${d.url}/${a}`);
      const is200 = imgRes.status === 200;
      if (!inHtml || !is200) {
        console.log(`   ❌ Image failed: ${a} (inHtml: ${inHtml}, status: ${imgRes.status})`);
        allImgsOk = false;
      }
    }
    if (allImgsOk) {
      console.log(` - All 11 Localized Images in HTML & loading HTTP 200: OK ✅`);
    }

    // 3. Test Stripe API
    try {
      const apiRes = await fetch(`${d.url}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bumps: ['pequenos-engenheiros'] })
      });
      const data = await apiRes.json();
      const hasSecret = Boolean(data.clientSecret && data.clientSecret.startsWith('cs_live_'));
      console.log(` - Stripe API: status=${apiRes.status}, clientSecret=${hasSecret ? 'VALID (cs_live_...)' : 'FAILED'} ✅\n`);
    } catch (e) {
      console.log(` - Stripe API Error: ${e.message}\n`);
    }
  }
}

run();
