// Mega Inventors US - High Conversion Worker with CAPI & Persistent Sales Audit
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 0. HISPANIC US ROUTE (/es)
    if (url.pathname === '/es' || url.pathname === '/es/') {
      const assetUrl = new URL('/es.html', request.url);
      return env.ASSETS ? env.ASSETS.fetch(new Request(assetUrl, request)) : fetch(assetUrl);
    }

    // ==========================================
    // 1. STRIPE EMBEDDED CHECKOUT SESSION
    // ==========================================
    if (url.pathname === '/api/create-checkout-session' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { email, name, phone, bumps, utm_params, locale } = body || {};
        const isEs = locale === 'es' || (request.headers.get('referer') || '').includes('/es');

        // Base product: The Young Inventor's Mega Pack ($27.00)
        const lineItems = [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: isEs ? "Mega Pack del Joven Inventor™" : "The Young Inventor's Mega Pack",
                description: isEs ? "120 Proyectos Paso a Paso + 5 Bonos de Regalo" : "120 Step-by-Step Projects + 5 Exclusive Bonuses"
              },
              unit_amount: 2700
            },
            quantity: 1
          }
        ];

        // The 7 Order Bumps ($11.99 each)
        const bumpNames = isEs ? {
          'bump-pequenos-engenheiros': "Pequeños Ingenieros: 10 Proyectos Iniciales",
          'bump-robotica-movimento': "Robótica en Movimiento: 24 Mecanismos de Cartón",
          'bump-cientistas-casa': "Científicos en Casa: 60 Experimentos Ilustrados",
          'bump-tecnologia-sem-telas': "Tecnología Sin Pantallas: 40 Desafíos Offline",
          'bump-maquinas-hidraulicas': "Máquinas Hidráulicas: 10 Desafíos con Agua",
          'bump-festa-inventores': "Fiesta de Cumpleaños de Inventores: Kit Temático",
          'bump-diario-inventor': "Mi Diario de Inventor: 30 Días de Creación"
        } : {
          'bump-pequenos-engenheiros': "Little Engineers: 10 Projects for Young Inventors",
          'bump-robotica-movimento': "Moving Robotics: 24 Cardboard Mechanisms",
          'bump-cientistas-casa': "Scientists at Home: 60 Illustrated Experiments",
          'bump-tecnologia-sem-telas': "Screen-Free Tech: 40 Offline Challenges",
          'bump-maquinas-hidraulicas': "Hydraulic Machines: 10 Challenges with Water",
          'bump-festa-inventores': "Inventor's Birthday Party: Complete Themed Kit",
          'bump-diario-inventor': "My Inventor's Journal: 30 Days of Creation"
        };

        if (Array.isArray(bumps)) {
          for (const bumpId of bumps) {
            if (bumpNames[bumpId]) {
              lineItems.push({
                price_data: {
                  currency: 'usd',
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
        if (isEs) params.append('locale', 'es');

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

    // ==========================================
    // 2. STRIPE WEBHOOK (AUTO CAPI & DB AUDIT)
    // ==========================================
    if (url.pathname === '/api/stripe-webhook' && request.method === 'POST') {
      try {
        const payload = await request.text();
        const event = JSON.parse(payload);

        if (event.type === 'checkout.session.completed') {
          const session = event.data.object;
          await processSuccessfulSale(session, env, request);
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // ==========================================
    // 3. SESSION STATUS & AUTO-CAPI (THANK YOU PAGE)
    // ==========================================
    if (url.pathname === '/api/session-status' && request.method === 'GET') {
      try {
        const sessionId = url.searchParams.get('session_id');
        if (!sessionId) {
          return new Response(JSON.stringify({ error: 'Missing session_id' }), { status: 400 });
        }

        const rawSecret = (env.STRIPE_SECRET_KEY || '').trim().replace(/^["']|["']$/g, '');
        const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}?expand[]=line_items`, {
          headers: { 'Authorization': `Bearer ${rawSecret}` }
        });
        const session = await res.json();

        if (session.payment_status === 'paid') {
          // Process and ensure CAPI & DB record exist
          await processSuccessfulSale(session, env, request);

          const amountTotal = (session.amount_total || 2700) / 100;
          return new Response(JSON.stringify({
            status: 'complete',
            payment_status: 'paid',
            customer_email: session.customer_details?.email || session.customer_email || '',
            customer_name: session.customer_details?.name || session.metadata?.customer_name || 'Inventor',
            amount_total: amountTotal,
            currency: (session.currency || 'usd').toUpperCase()
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ status: session.status, payment_status: session.payment_status }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // ==========================================
    // 4. AUDIT & REMARKETING AUDIENCE ENDPOINT
    // ==========================================
    if (url.pathname === '/api/audit-sales') {
      const secret = url.searchParams.get('secret') || request.headers.get('x-audit-secret');
      if (secret !== (env.ADMIN_SECRET || 'inventors_audit_2026')) {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        let sales = [];
        if (env.SALES_DB) {
          const indexRaw = await env.SALES_DB.get('sales_index');
          const ids = indexRaw ? JSON.parse(indexRaw) : [];
          for (const id of ids) {
            const saleData = await env.SALES_DB.get(`sale:${id}`);
            if (saleData) sales.push(JSON.parse(saleData));
          }
        }

        // Summary Calculations
        const totalSalesCount = sales.length;
        const totalRevenue = sales.reduce((acc, s) => acc + (parseFloat(s.amount) || 0), 0);
        const aov = totalSalesCount > 0 ? (totalRevenue / totalSalesCount).toFixed(2) : '0.00';
        const ordersWithBumps = sales.filter(s => (s.items && s.items.length > 1) || (parseFloat(s.amount) > 30)).length;
        const bumpTakeRate = totalSalesCount > 0 ? ((ordersWithBumps / totalSalesCount) * 100).toFixed(1) : '0.0';

        // Export as CSV for Meta Custom Audience / Remarketing
        if (url.searchParams.get('format') === 'csv') {
          let csv = 'Email,Phone,FirstName,LastName,Amount_USD,Date,UTM_Campaign,UTM_Term,UTM_Content,FBCLID\n';
          for (const s of sales) {
            const names = (s.name || '').split(' ');
            const fn = names[0] || '';
            const ln = names.slice(1).join(' ') || '';
            const em = s.email || '';
            const ph = (s.phone || '').replace(/[^0-9+]/g, '');
            const amt = s.amount || '0.00';
            const dt = s.createdAt || '';
            const camp = s.marketing?.utm_campaign || '';
            const term = s.marketing?.utm_term || '';
            const cont = s.marketing?.utm_content || '';
            const fbclid = s.marketing?.fbclid || '';
            csv += `"${em}","${ph}","${fn}","${ln}","${amt}","${dt}","${camp}","${term}","${cont}","${fbclid}"\n`;
          }

          return new Response(csv, {
            status: 200,
            headers: {
              'Content-Type': 'text/csv; charset=utf-8',
              'Content-Disposition': 'attachment; filename="mega_inventors_buyers_remarketing.csv"'
            }
          });
        }

        return new Response(JSON.stringify({
          summary: {
            total_orders: totalSalesCount,
            total_revenue_usd: `$${totalRevenue.toFixed(2)}`,
            average_order_value: `$${aov}`,
            orders_with_bumps: ordersWithBumps,
            bump_take_rate: `${bumpTakeRate}%`
          },
          sales: sales
        }, null, 2), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // ==========================================
    // 5. MANUAL SALE SYNC (PAST OR TEST SALES)
    // ==========================================
    if (url.pathname === '/api/sync-sale' && request.method === 'POST') {
      const secret = url.searchParams.get('secret') || request.headers.get('x-audit-secret');
      if (secret !== (env.ADMIN_SECRET || 'inventors_audit_2026')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      try {
        const saleData = await request.json();
        const res = await recordSaleInDB(env, saleData);
        if (saleData.fireCapi) {
          await sendMetaCapi(env, {
            eventId: saleData.id,
            amount: saleData.amount,
            email: saleData.email,
            phone: saleData.phone,
            name: saleData.name,
            marketing: saleData.marketing
          });
        }
        return new Response(JSON.stringify({ success: true, recorded: res }), { status: 200 });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // ==========================================
    // 6. FIRST-PARTY VISITOR FUNNEL TRACKING
    // ==========================================
    if (url.pathname === '/api/track' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => ({}));
        const event = String(body.event || '');
        const allowed = ['page_view', 'scroll_50', 'scroll_checkout', 'cta_click', 'checkout_start'];
        if (allowed.includes(event) && env.SALES_DB) {
          const day = new Date().toISOString().slice(0, 10);
          const dayKey = `funnel:${day}`;
          const existingRaw = await env.SALES_DB.get(dayKey);
          const stats = existingRaw ? JSON.parse(existingRaw) : { date: day, page_view: 0, scroll_50: 0, scroll_checkout: 0, cta_click: 0, checkout_start: 0 };
          stats[event] = (stats[event] || 0) + 1;
          await env.SALES_DB.put(dayKey, JSON.stringify(stats));
        }
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
    }

    if (url.pathname === '/api/audit-funnel') {
      const secret = url.searchParams.get('secret') || request.headers.get('x-audit-secret');
      if (secret !== (env.ADMIN_SECRET || 'inventors_audit_2026')) {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      const day = url.searchParams.get('date') || new Date().toISOString().slice(0, 10);
      const raw = env.SALES_DB ? await env.SALES_DB.get(`funnel:${day}`) : null;
      const stats = raw ? JSON.parse(raw) : { date: day, page_view: 0, scroll_50: 0, scroll_checkout: 0, cta_click: 0, checkout_start: 0 };
      const pv = stats.page_view || 0;
      return new Response(JSON.stringify({
        date: day,
        metrics: stats,
        rates: {
          scroll_50_rate: pv > 0 ? `${((stats.scroll_50 / pv) * 100).toFixed(1)}%` : '0.0%',
          scroll_checkout_rate: pv > 0 ? `${((stats.scroll_checkout / pv) * 100).toFixed(1)}%` : '0.0%',
          cta_click_rate: pv > 0 ? `${((stats.cta_click / pv) * 100).toFixed(1)}%` : '0.0%',
          real_checkout_start_rate: pv > 0 ? `${((stats.checkout_start / pv) * 100).toFixed(1)}%` : '0.0%'
        }
      }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Route /v2 to v2.html
    if (url.pathname === '/v2' || url.pathname === '/v2/') {
      return env.ASSETS.fetch(new Request(new URL('/v2.html', request.url), request));
    }

    // Serve static assets for all other routes
    return env.ASSETS.fetch(request);
  }
};

// ==========================================
// HELPER FUNCTIONS (CAPI & DB AUDIT)
// ==========================================

async function sha256(str) {
  if (!str) return null;
  const clean = str.trim().toLowerCase();
  const buffer = new TextEncoder().encode(clean);
  const hash = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sendMetaCapi(env, data, request = null) {
  const pixelId = env.META_PIXEL_ID || '1864964467859741';
  const token = env.META_ACCESS_TOKEN;
  if (!token) return { skipped: 'No Meta Access Token' };

  try {
    const names = (data.name || '').trim().split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    const hashedEmail = await sha256(data.email);
    const hashedPhone = await sha256((data.phone || '').replace(/\D/g, ''));
    const hashedFn = await sha256(firstName);
    const hashedLn = await sha256(lastName);

    const clientIp = request ? request.headers.get('cf-connecting-ip') : null;
    const clientUserAgent = request ? request.headers.get('user-agent') : null;

    let fbc = undefined;
    if (data.marketing?.fbclid) {
      fbc = `fb.1.${Date.now()}.${data.marketing.fbclid}`;
    }

    const userData = {
      client_ip_address: clientIp || undefined,
      client_user_agent: clientUserAgent || undefined
    };
    if (hashedEmail) userData.em = [hashedEmail];
    if (hashedPhone) userData.ph = [hashedPhone];
    if (hashedFn) userData.fn = [hashedFn];
    if (hashedLn) userData.ln = [hashedLn];
    if (fbc) userData.fbc = fbc;

    const payload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          event_id: data.eventId, // Matches browser eventID for 100% deduplication
          action_source: 'website',
          event_source_url: 'https://mega-inventors-us.codhun.workers.dev/thank-you.html',
          user_data: userData,
          custom_data: {
            currency: 'USD',
            value: parseFloat(data.amount) || 27.00,
            content_type: 'product',
            contents: [
              { id: 'mega-pack-inventors', quantity: 1, item_price: parseFloat(data.amount) || 27.00 }
            ]
          }
        }
      ]
    };

    const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const capiRes = await res.json();
    return capiRes;
  } catch (err) {
    return { error: err.message };
  }
}

async function recordSaleInDB(env, saleRecord) {
  if (!env.SALES_DB) return null;
  const key = `sale:${saleRecord.id}`;
  
  // Check if already stored
  const existing = await env.SALES_DB.get(key);
  if (existing) return JSON.parse(existing);

  // Save Sale Record
  await env.SALES_DB.put(key, JSON.stringify(saleRecord));

  // Update Index
  const indexRaw = await env.SALES_DB.get('sales_index');
  const index = indexRaw ? JSON.parse(indexRaw) : [];
  if (!index.includes(saleRecord.id)) {
    index.push(saleRecord.id);
    await env.SALES_DB.put('sales_index', JSON.stringify(index));
  }
  return saleRecord;
}

async function processSuccessfulSale(session, env, request) {
  const sessionId = session.id;
  const amountTotal = ((session.amount_total || 2700) / 100).toFixed(2);
  const email = session.customer_details?.email || session.customer_email || '';
  const name = session.customer_details?.name || session.metadata?.customer_name || '';
  const phone = session.customer_details?.phone || session.metadata?.customer_phone || '';
  const address = session.customer_details?.address || {};

  // Extract Line Items
  let items = ["The Young Inventor's Mega Pack ($27.00)"];
  if (session.line_items?.data) {
    items = session.line_items.data.map(i => `${i.description || i.price?.product_data?.name} ($${((i.amount_total || 0)/100).toFixed(2)})`);
  }

  // Extract UTMs & Marketing Metadata
  const marketing = {
    utm_campaign: session.metadata?.utm_campaign || '',
    utm_term: session.metadata?.utm_term || '',
    utm_content: session.metadata?.utm_content || '',
    utm_source: session.metadata?.utm_source || 'meta',
    fbclid: session.metadata?.fbclid || ''
  };

  // 1. Send CAPI to Meta
  const capiResult = await sendMetaCapi(env, {
    eventId: sessionId,
    amount: amountTotal,
    email: email,
    phone: phone,
    name: name,
    marketing: marketing
  }, request);

  // 2. Record in SALES_DB
  const saleRecord = {
    id: sessionId,
    paymentIntentId: session.payment_intent || '',
    createdAt: new Date().toISOString(),
    amount: amountTotal,
    currency: 'USD',
    name: name,
    email: email,
    phone: phone,
    zip: address.postal_code || '',
    country: address.country || 'US',
    items: items,
    marketing: marketing,
    capiStatus: capiResult?.events_received ? 'delivered' : 'logged',
    capiResponse: capiResult
  };

  await recordSaleInDB(env, saleRecord);
  return saleRecord;
}
