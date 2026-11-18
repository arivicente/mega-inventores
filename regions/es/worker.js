const CURRENCY = 'eur';
const BASE_AMOUNT = 1908; // 19,08 €
const PRODUCT_NAME = "Mega Pack de Inventores • 120 Proyectos + 5 Bonos";
const PRODUCT_DESCRIPTION = "Más de 120 proyectos STEM paso a paso + 5 bonos gratis";

// Order bumps validados (preços em centavos de euro)
const BUMP_CATALOG = {
  "bump-robotica-movimento": {
    name: "🤖 Robots que se mueven de verdad: 24 mecanismos de cartón con plantillas",
    amount: 818
  },
  "bump-gran-desafio-inventor": {
    name: "🏆 Que ningún invento quede en un rincón: 30 misiones con puntos e insignias",
    amount: 818
  },
  "bump-cientificos-casa": {
    name: "🧪 Laboratorio en tu cocina: 50 experimentos seguros con lo que ya tenés",
    amount: 909
  },
  "bump-tecnologia-sem-telas": {
    name: "📵 Chau \"me aburro\": 40 desafíos por niveles, con diplomas y sin pantalla",
    amount: 727
  },
  "bump-agentes-inventores": {
    name: "🕵️ Agentes Inventores: 6 misterios para resolver inventando",
    amount: 818
  },
  "bump-magia-optica": {
    name: "🎩 Magia Óptica: 10 juguetes de ilusión para armar con papel y cartón",
    amount: 636
  }
};

const BUMP_NAMES = Object.fromEntries(
  Object.entries(BUMP_CATALOG).map(([id, item]) => [id, item.name])
);

function selectedBumps(bumps) {
  return Array.isArray(bumps)
    ? [...new Set(bumps.filter(id => Boolean(BUMP_CATALOG[id])))]
    : [];
}

function totalAmount(bumps) {
  return selectedBumps(bumps).reduce((sum, id) => sum + BUMP_CATALOG[id].amount, BASE_AMOUNT);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Stripe PaymentIntent API (compatibilidade com fluxo antigo)
    if (url.pathname === '/api/create-payment-intent' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { email, name, phone, bumps, utm_params, paymentIntentId } = body || {};

        const validBumps = selectedBumps(bumps);
        const amount = totalAmount(validBumps);
        const description = validBumps.length > 0
          ? `${PRODUCT_NAME} + ${validBumps.length} Pack(s) Adicionales`
          : PRODUCT_NAME;

        const buildParams = (isCreate) => {
          const params = new URLSearchParams();
          params.append('amount', amount.toString());
          params.append('description', description);

          if (email && email.includes('@')) params.append('receipt_email', email.trim());
          if (name) params.append('metadata[customer_name]', name.trim());
          if (phone) params.append('metadata[customer_phone]', phone.trim());
          params.append('metadata[selected_bumps]', validBumps.join(','));

          if (utm_params && typeof utm_params === 'object') {
            for (const [k, v] of Object.entries(utm_params)) {
              if (v && typeof v === 'string') params.append(`metadata[${k}]`, v.slice(0, 500));
            }
          }

          if (isCreate) {
            params.append('currency', CURRENCY);
            params.append('automatic_payment_methods[enabled]', 'true');
          }
          return params;
        };

        const rawSecret = (env.STRIPE_SECRET_KEY || '').trim().replace(/^["']|["']$/g, '');
        const headers = {
          'Authorization': `Bearer ${rawSecret}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        };

        let data = null;
        if (paymentIntentId && typeof paymentIntentId === 'string' && paymentIntentId.startsWith('pi_')) {
          const updateRes = await fetch(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`, {
            method: 'POST',
            headers,
            body: buildParams(false).toString()
          });
          const updateData = await updateRes.json();
          if (!updateData.error) data = updateData;
        }

        if (!data) {
          const createRes = await fetch('https://api.stripe.com/v1/payment_intents', {
            method: 'POST',
            headers,
            body: buildParams(true).toString()
          });
          data = await createRes.json();
        }

        if (data.error) {
          return new Response(JSON.stringify({ error: data.error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({
          clientSecret: data.client_secret,
          paymentIntentId: data.id,
          amount: data.amount
        }), {
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

    // Stripe Embedded Checkout Session API (one-checkout-page)
    if (url.pathname === '/api/create-checkout-session' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { email, name, phone, bumps, utm_params, locale } = body || {};

        const validBumps = selectedBumps(bumps);
        const lineItems = [
          {
            name: PRODUCT_NAME,
            description: PRODUCT_DESCRIPTION,
            amount: BASE_AMOUNT,
            quantity: 1
          }
        ];

        for (const id of validBumps) {
          lineItems.push({
            name: BUMP_CATALOG[id].name,
            amount: BUMP_CATALOG[id].amount,
            quantity: 1
          });
        }

        const params = new URLSearchParams();
        params.append('ui_mode', 'embedded_page');
        params.append('mode', 'payment');
        params.append('locale', typeof locale === 'string' && locale.trim() ? locale.trim() : 'es');
        params.append('return_url', `${url.origin}/thank-you.html?session_id={CHECKOUT_SESSION_ID}`);

        if (email && email.includes('@')) params.append('customer_email', email.trim());

        lineItems.forEach((item, idx) => {
          params.append(`line_items[${idx}][price_data][currency]`, CURRENCY);
          params.append(`line_items[${idx}][price_data][product_data][name]`, item.name);
          if (item.description) {
            params.append(`line_items[${idx}][price_data][product_data][description]`, item.description);
          }
          params.append(`line_items[${idx}][price_data][unit_amount]`, item.amount.toString());
          params.append(`line_items[${idx}][quantity]`, item.quantity.toString());
        });

        if (name) params.append('metadata[customer_name]', name.trim());
        if (phone) params.append('metadata[customer_phone]', phone.trim());
        params.append('metadata[selected_bumps]', validBumps.join(','));
        params.append('metadata[total_eur]', (totalAmount(validBumps) / 100).toFixed(2));

        if (utm_params && typeof utm_params === 'object') {
          for (const [k, v] of Object.entries(utm_params)) {
            if (v && typeof v === 'string') params.append(`metadata[${k}]`, v.slice(0, 500));
          }
        }

        const rawSecret = (env.STRIPE_SECRET_KEY || '').trim().replace(/^["']|["']$/g, '');

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
