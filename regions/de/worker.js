export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Stripe Embedded Checkout Session API
    if (url.pathname === '/api/create-checkout-session' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { email, name, phone, bumps, utm_params } = body || {};

        // Base product
        const lineItems = [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: "Die Jungen Erfinder • Mega-Paket",
                description: "120 Schritt-für-Schritt MINT-Projekte + 5 Exklusive Boni"
              },
              unit_amount: 2700
            },
            quantity: 1
          }
        ];

        const bumpNames = {
  "bump-pequenos-engenheiros": "Kleine Ingenieure: 10 Projekte für junge Erfinder",
  "bump-robotica-movimento": "Robotik in Bewegung: 24 Karton-Mechanismen",
  "bump-cientistas-casa": "Wissenschaftler zu Hause: 60 Illustrierte Experimente",
  "bump-tecnologia-sem-telas": "Bildschirmfreie Technik: 40 Herausforderungen",
  "bump-maquinas-hidraulicas": "Hydraulik-Maschinen: 10 Herausforderungen mit Wasser",
  "bump-festa-inventores": "Erfinder-Geburtstagsfeier: Komplett-Set",
  "bump-diario-inventor": "Mein Erfinder-Tagebuch: 30 Tage voller Ideen"
};

        if (Array.isArray(bumps)) {
          for (const bumpId of bumps) {
            if (bumpNames[bumpId]) {
              lineItems.push({
                price_data: {
                  currency: 'eur',
                  product_data: {
                    name: bumpNames[bumpId]
                  },
                  unit_amount: 1199
                },
                quantity: 1
              });
            }
          }
        }

        const params = new URLSearchParams();
        params.append('ui_mode', 'embedded_page');
        params.append('mode', 'payment');
        params.append('return_url', `${url.origin}/thank-you.html?session_id={CHECKOUT_SESSION_ID}`);

        if (email && email.includes('@')) {
          params.append('customer_email', email.trim());
        }

        lineItems.forEach((item, idx) => {
          params.append(`line_items[${idx}][price_data][currency]`, item.price_data.currency);
          params.append(`line_items[${idx}][price_data][product_data][name]`, item.price_data.product_data.name);
          if (item.price_data.product_data.description) {
            params.append(`line_items[${idx}][price_data][product_data][description]`, item.price_data.product_data.description);
          }
          params.append(`line_items[${idx}][price_data][unit_amount]`, item.price_data.unit_amount.toString());
          params.append(`line_items[${idx}][quantity]`, item.quantity.toString());
        });

        if (name) params.append('metadata[customer_name]', name.trim());
        if (phone) params.append('metadata[customer_phone]', phone.trim());
        if (utm_params && typeof utm_params === 'object') {
          for (const [k, v] of Object.entries(utm_params)) {
            if (v && typeof v === 'string') {
              params.append(`metadata[${k}]`, v.slice(0, 500));
            }
          }
        }

        const rawSecret = (env.STRIPE_SECRET_KEY || '').trim().replace(/^[\"']|[\"']$/g, '');

        const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${rawSecret}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        });

        const data = await stripeRes.json();
        if (data.error) {
          return new Response(JSON.stringify({ error: data.error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ clientSecret: data.client_secret, sessionId: data.id }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Serve static assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
