const domains = [
  { lang: 'US', host: 'https://mega-inventors-us.codhun.workers.dev' },
  { lang: 'DE', host: 'https://mega-inventors-de.codhun.workers.dev' },
  { lang: 'FR', host: 'https://mega-inventors-fr.codhun.workers.dev' },
  { lang: 'IT', host: 'https://mega-inventors-it.codhun.workers.dev' },
  { lang: 'ES', host: 'https://mega-inventors-es.codhun.workers.dev' }
];

async function testAll() {
  for (const d of domains) {
    const htmlRes = await fetch(d.host);
    const html = await htmlRes.text();
    const hasEmbed = html.includes('checkout-embed');
    const hasStripeJs = html.includes('https://js.stripe.com/v3/');

    let apiStatus = 0;
    let hasClientSecret = false;
    let errMsg = '';
    try {
      const apiRes = await fetch(d.host + '/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          name: 'Test Customer',
          bumps: ['bump-pequenos-engenheiros']
        })
      });
      apiStatus = apiRes.status;
      const data = await apiRes.json();
      hasClientSecret = !!data.clientSecret;
      if (data.error) errMsg = data.error;
    } catch(err) {
      errMsg = err.message;
    }

    console.log(`[${d.lang}] HTML: 200, EmbedDiv: ${hasEmbed}, StripeJs: ${hasStripeJs} | API: ${apiStatus}, ClientSecret: ${hasClientSecret} ${errMsg ? '(' + errMsg + ')' : ''}`);
  }
}

testAll();
