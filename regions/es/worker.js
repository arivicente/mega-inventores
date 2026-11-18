const BUMP_NAMES = {
  "bump-pequenos-engenheiros": "Pequeños Ingenieros: 10 Proyectos para Pequeños Inventores",
  "bump-robotica-movimento": "Robótica con Movimiento: 24 Mecanismos de Cartón",
  "bump-cientistas-casa": "Científicos en Casa: 60 Experimentos Ilustrados",
  "bump-tecnologia-sem-telas": "Tecnología sin Pantallas: 40 Retos Desconectados",
  "bump-maquinas-hidraulicas": "Máquinas Hidráulicas: 10 Desafíos con Agua",
  "bump-festa-inventores": "Fiesta de Inventores: Kit de Cumpleaños Completo",
  "bump-diario-inventor": "Mi Diario de Inventor: 30 Días de Creación"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Stripe PaymentIntent API for Express Checkout + Accordion PaymentElement
    if (url.pathname === '/api/create-payment-intent' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { email, name, phone, bumps, utm_params, paymentIntentId } = body || {};

        const validBumps = Array.isArray(bumps) ? bumps.filter(id => Boolean(BUMP_NAMES[id])) : [];
        const amount = 2400 + validBumps.length * 1199;
        const description = validBumps.length > 0
          ? `Los Pequeños Inventores • Mega Pack + ${validBumps.length} Pack(s) Adicionales`
          : 'Los Pequeños Inventores • Mega Pack';

        const buildParams = (isCreate) => {
          const params = new URLSearchParams();
          params.append('amount', amount.toString());
          params.append('description', description);

          if (email && email.includes('@')) {
            params.append('receipt_email', email.trim());
          }
          if (name) params.append('metadata[customer_name]', name.trim());
          if (phone) params.append('metadata[customer_phone]', phone.trim());
          params.append('metadata[selected_bumps]', validBumps.join(','));

          if (utm_params && typeof utm_params === 'object') {
            for (const [k, v] of Object.entries(utm_params)) {
              if (v && typeof v === 'string') {
                params.append(`metadata[${k}]`, v.slice(0, 500));
              }
            }
          }

          if (isCreate) {
            params.append('currency', 'eur');
            params.append('automatic_payment_methods[enabled]', 'true');
          }
          return params;
        };

        const rawSecret = (env.STRIPE_SECRET_KEY || '').trim().replace(/^[\"']|[\"']$/g, '');
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
          if (!updateData.error) {
            data = updateData;
          }
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
                name: "Los Pequeños Inventores • Mega Pack",
                description: "120 Proyectos STEM Paso a Paso + 5 Super Bonos"
              },
              unit_amount: 2400
            },
            quantity: 1
          }
        ];

        const bumpNames = BUMP_NAMES;

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
