import fs from 'fs';
import path from 'path';

const STRIPE_PK = 'pk_live_51TTQv9EWgMF5GJUkvzWBnbaku78bLKwOCvRIAA8ksmnVB4a59HR2XSDtDuV0EH1RwyyVuFSvvIghc3iVdkBcKtrw00PSW5ZOFI';

const REGION_CONFIGS = {
  de: {
    lang: 'de',
    currency: 'eur',
    basePrice: 27.00,
    bumpPrice: 11.99,
    unitAmount: 2700,
    bumpAmount: 1199,
    prodName: "Die Jungen Erfinder • Mega-Paket",
    prodDesc: "120 Schritt-für-Schritt MINT-Projekte + 5 Exklusive Boni",
    bumps: {
      'bump-pequenos-engenheiros': "Kleine Ingenieure: 10 Projekte für junge Erfinder",
      'bump-robotica-movimento': "Robotik in Bewegung: 24 Karton-Mechanismen",
      'bump-cientistas-casa': "Wissenschaftler zu Hause: 60 Illustrierte Experimente",
      'bump-tecnologia-sem-telas': "Bildschirmfreie Technik: 40 Herausforderungen",
      'bump-maquinas-hidraulicas': "Hydraulik-Maschinen: 10 Herausforderungen mit Wasser",
      'bump-festa-inventores': "Erfinder-Geburtstagsfeier: Komplett-Set",
      'bump-diario-inventor': "Mein Erfinder-Tagebuch: 30 Tage voller Ideen"
    },
    step3Title: "3. Zahlungsdetails (Kreditkarte, Apple Pay, Google Pay):",
    stripeVerified: "🔒 Stripe Verifiziert",
    loadingText: "Sicheres Zahlungsformular wird geladen...",
    sslText: "🔒 256-Bit SSL-Verschlüsselung",
    instantText: "⚡ Sofortiger E-Mail-Zugang",
    guarText: "🛡️ 30-Tage Geld-zurück-Garantie"
  },
  fr: {
    lang: 'fr',
    currency: 'eur',
    basePrice: 27.00,
    bumpPrice: 11.99,
    unitAmount: 2700,
    bumpAmount: 1199,
    prodName: "Les Jeunes Inventeurs • Méga Pack",
    prodDesc: "120 Projets STEM Pas à Pas + 5 Bonus Exclusifs",
    bumps: {
      'bump-pequenos-engenheiros': "Petits Ingénieurs : 10 Projets pour Jeunes Inventeurs",
      'bump-robotica-movimento': "Robotique en Mouvement : 24 Mécanismes en Carton",
      'bump-cientistas-casa': "Scientifiques à la Maison : 60 Expériences Illustrées",
      'bump-tecnologia-sem-telas': "Technologie Sans Écran : 40 Défis Hors Ligne",
      'bump-maquinas-hidraulicas': "Machines Hydrauliques : 10 Défis avec l'Eau",
      'bump-festa-inventores': "Fête des Inventeurs : Kit Anniversaire Complet",
      'bump-diario-inventor': "Mon Journal d'Inventeur : 30 Jours de Création"
    },
    step3Title: "3. Coordonnées de Paiement (Carte, Apple Pay, Google Pay) :",
    stripeVerified: "🔒 Stripe Vérifié",
    loadingText: "Chargement du formulaire de paiement sécurisé...",
    sslText: "🔒 Cryptage SSL 256-Bit",
    instantText: "⚡ Accès Immédiat par E-mail",
    guarText: "🛡️ Garantie 30 Jours Satisfait ou Remboursé"
  },
  it: {
    lang: 'it',
    currency: 'eur',
    basePrice: 27.00,
    bumpPrice: 11.99,
    unitAmount: 2700,
    bumpAmount: 1199,
    prodName: "I Giovani Inventori • Mega Pacchetto",
    prodDesc: "120 Progetti STEM Passo dopo Passo + 5 Super Bonus",
    bumps: {
      'bump-pequenos-engenheiros': "Piccoli Ingegneri: 10 Progetti per Giovani Inventori",
      'bump-robotica-movimento': "Robotica in Movimento: 24 Meccanismi di Cartone",
      'bump-cientistas-casa': "Scienziati a Casa: 60 Esperimenti Illustrati",
      'bump-tecnologia-sem-telas': "Tecnologia Senza Schermi: 40 Sfide Offline",
      'bump-maquinas-hidraulicas': "Macchine Idrauliche: 10 Sfide ad Acqua",
      'bump-festa-inventores': "Festa degli Inventori: Kit per Compleanni",
      'bump-diario-inventor': "Il Mio Diario dell'Inventore: 30 Giorni di Creazione"
    },
    step3Title: "3. Dati di Pagamento (Carta, Apple Pay, Google Pay):",
    stripeVerified: "🔒 Stripe Verificato",
    loadingText: "Caricamento del modulo di pagamento sicuro...",
    sslText: "🔒 Crittografia SSL a 256 Bit",
    instantText: "⚡ Accesso Immediato via Email",
    guarText: "🛡️ Garanzia Soddisfatti o Rimborsati di 30 Giorni"
  },
  es: {
    lang: 'es',
    currency: 'eur',
    basePrice: 27.00,
    bumpPrice: 11.99,
    unitAmount: 2700,
    bumpAmount: 1199,
    prodName: "Los Pequeños Inventores • Mega Pack",
    prodDesc: "120 Proyectos STEM Paso a Paso + 5 Super Bonos",
    bumps: {
      'bump-pequenos-engenheiros': "Pequeños Ingenieros: 10 Proyectos para Pequeños Inventores",
      'bump-robotica-movimento': "Robótica con Movimiento: 24 Mecanismos de Cartón",
      'bump-cientistas-casa': "Científicos en Casa: 60 Experimentos Ilustrados",
      'bump-tecnologia-sem-telas': "Tecnología sin Pantallas: 40 Retos Desconectados",
      'bump-maquinas-hidraulicas': "Máquinas Hidráulicas: 10 Desafíos con Agua",
      'bump-festa-inventores': "Fiesta de Inventores: Kit de Cumpleaños Completo",
      'bump-diario-inventor': "Mi Diario de Inventor: 30 Días de Creación"
    },
    step3Title: "3. Datos de Pago (Tarjeta, Apple Pay, Google Pay):",
    stripeVerified: "🔒 Stripe Verificado",
    loadingText: "Cargando formulario de pago seguro...",
    sslText: "🔒 Cifrado SSL de 256 Bits",
    instantText: "⚡ Entrega Inmediata por Correo",
    guarText: "🛡️ Garantía de Devolución de 30 Días"
  }
};

function generateWorkerCode(cfg) {
  return `export default {
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
              currency: '${cfg.currency}',
              product_data: {
                name: ${JSON.stringify(cfg.prodName)},
                description: ${JSON.stringify(cfg.prodDesc)}
              },
              unit_amount: ${cfg.unitAmount}
            },
            quantity: 1
          }
        ];

        const bumpNames = ${JSON.stringify(cfg.bumps, null, 2)};

        if (Array.isArray(bumps)) {
          for (const bumpId of bumps) {
            if (bumpNames[bumpId]) {
              lineItems.push({
                price_data: {
                  currency: '${cfg.currency}',
                  product_data: {
                    name: bumpNames[bumpId]
                  },
                  unit_amount: ${cfg.bumpAmount}
                },
                quantity: 1
              });
            }
          }
        }

        const params = new URLSearchParams();
        params.append('ui_mode', 'embedded_page');
        params.append('mode', 'payment');
        params.append('return_url', \`\${url.origin}/thank-you.html?session_id={CHECKOUT_SESSION_ID}\`);

        if (email && email.includes('@')) {
          params.append('customer_email', email.trim());
        }

        lineItems.forEach((item, idx) => {
          params.append(\`line_items[\${idx}][price_data][currency]\`, item.price_data.currency);
          params.append(\`line_items[\${idx}][price_data][product_data][name]\`, item.price_data.product_data.name);
          if (item.price_data.product_data.description) {
            params.append(\`line_items[\${idx}][price_data][product_data][description]\`, item.price_data.product_data.description);
          }
          params.append(\`line_items[\${idx}][price_data][unit_amount]\`, item.price_data.unit_amount.toString());
          params.append(\`line_items[\${idx}][quantity]\`, item.quantity.toString());
        });

        if (name) params.append('metadata[customer_name]', name.trim());
        if (phone) params.append('metadata[customer_phone]', phone.trim());
        if (utm_params && typeof utm_params === 'object') {
          for (const [k, v] of Object.entries(utm_params)) {
            if (v && typeof v === 'string') {
              params.append(\`metadata[\${k}]\`, v.slice(0, 500));
            }
          }
        }

        const rawSecret = (env.STRIPE_SECRET_KEY || '').trim().replace(/^[\\"']|[\\"']$/g, '');

        const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            'Authorization': \`Bearer \${rawSecret}\`,
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
`;
}

function updateIndexHtmlWithStripeEmbed(lang) {
  const cfg = REGION_CONFIGS[lang];
  const indexPath = `c:/Users/Star/Documents/espionagem1/mega-inventors/regions/${lang}/public/index.html`;
  let html = fs.readFileSync(indexPath, 'utf8');

  // Add Stripe.js in <head> if not present
  if (!html.includes('https://js.stripe.com/v3/')) {
    html = html.replace('</head>', '  <script src="https://js.stripe.com/v3/"></script>\n</head>');
  }

  // Replace CTA button with Stripe Embedded Checkout container
  const checkoutSectionRegex = /<!-- TOTAL DISPLAY -->[\s\S]*?<!-- STICKY MOBILE BOTTOM BAR -->/;
  
  const embeddedCheckoutMarkup = `<!-- TOTAL DISPLAY -->
        <div class="bg-blue-50 rounded-2xl p-4 border border-blue-200 flex items-center justify-between mb-4">
          <span class="font-bold text-slate-800 text-sm">TOTAL:</span>
          <span id="display-total" class="font-display font-black text-2xl text-blue-700">27.00€</span>
        </div>

        <!-- 3. STRIPE EMBEDDED CHECKOUT (NATIVE FORM) -->
        <div class="pt-5 border-t border-slate-200">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-display font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
              <span>${cfg.step3Title}</span>
            </h4>
            <span class="text-[11px] font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200 flex items-center gap-1">
              ${cfg.stripeVerified}
            </span>
          </div>

          <!-- Stripe Element Mount Target -->
          <div id="checkout-embed" class="bg-white rounded-2xl p-2 sm:p-4 border-2 border-blue-500/20 shadow-inner min-h-[380px]">
            <div class="py-16 text-center text-slate-500 text-sm animate-pulse flex flex-col items-center justify-center gap-3">
              <div class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span class="font-medium">${cfg.loadingText}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 mt-4">
            <span class="flex items-center gap-1">${cfg.sslText}</span>
            <span class="flex items-center gap-1">${cfg.instantText}</span>
            <span class="flex items-center gap-1">${cfg.guarText}</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- STICKY MOBILE BOTTOM BAR -->`;

  html = html.replace(checkoutSectionRegex, embeddedCheckoutMarkup);

  // Replace script at the bottom
  const scriptRegex = /<!-- DYNAMIC STRIPE REDIRECTION SCRIPT -->[\s\S]*?<\/script>/;

  const embeddedScript = `<!-- DYNAMIC STRIPE EMBEDDED CHECKOUT SCRIPT -->
  <script>
    (function() {
      const BASE_PRICE = 27.00;
      const BUMP_PRICE = 11.99;
      const STRIPE_PK = '${STRIPE_PK}';

      const bumpIds = [
        'bump-pequenos-engenheiros',
        'bump-robotica-movimento',
        'bump-cientistas-casa',
        'bump-tecnologia-sem-telas',
        'bump-maquinas-hidraulicas',
        'bump-festa-inventores',
        'bump-diario-inventor'
      ];

      const chks = document.querySelectorAll('.bump-chk');
      // Assign IDs to checkboxes sequentially
      chks.forEach((chk, idx) => {
        if (bumpIds[idx]) chk.id = bumpIds[idx];
      });

      const displayTotal = document.getElementById('display-total');

      function formatEUR(val) {
        return val.toFixed(2) + '€';
      }

      function updateTotal() {
        let total = BASE_PRICE;
        chks.forEach(chk => {
          const card = chk.closest('.order-bump-card');
          if (chk.checked) {
            total += BUMP_PRICE;
            if (card) card.classList.add('checked');
          } else {
            if (card) card.classList.remove('checked');
          }
        });
        if (displayTotal) displayTotal.textContent = formatEUR(total);
      }

      let stripe = null;
      let embeddedCheckoutInstance = null;
      let updateDebounceTimer = null;
      let hasTrackedInitiate = false;

      async function mountStripe() {
        const container = document.getElementById('checkout-embed');
        if (!container) return;

        if (embeddedCheckoutInstance) {
          try {
            embeddedCheckoutInstance.destroy();
          } catch(e) {}
          embeddedCheckoutInstance = null;
        }

        container.innerHTML = '<div class="py-16 text-center text-slate-500 text-sm animate-pulse flex flex-col items-center justify-center gap-3"><div class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div><span class="font-medium">${cfg.loadingText}</span></div>';

        const name = (document.getElementById('cust-name')?.value || '').trim();
        const email = (document.getElementById('cust-email')?.value || '').trim();

        const selectedBumps = [];
        chks.forEach(chk => {
          if (chk.checked && chk.id) selectedBumps.push(chk.id);
        });

        if (!hasTrackedInitiate && typeof fbq === 'function') {
          fbq('track', 'InitiateCheckout', {
            value: BASE_PRICE + (selectedBumps.length * BUMP_PRICE),
            currency: 'EUR',
            content_name: "${cfg.prodName}"
          });
          hasTrackedInitiate = true;
        }

        try {
          if (!stripe && typeof Stripe === 'function') {
            stripe = Stripe(STRIPE_PK);
          }
          if (!stripe) throw new Error('Stripe.js not loaded');

          embeddedCheckoutInstance = await stripe.initEmbeddedCheckout({
            fetchClientSecret: async () => {
              const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: email,
                  name: name,
                  bumps: selectedBumps,
                  utm_params: Object.fromEntries(new URLSearchParams(window.location.search).entries())
                })
              });
              const data = await res.json();
              if (data.error) throw new Error(data.error);
              return data.clientSecret;
            }
          });

          container.innerHTML = '';
          embeddedCheckoutInstance.mount('#checkout-embed');
        } catch (err) {
          console.error('Embedded Checkout mount error:', err);
          container.innerHTML = '<div class="text-center py-6 px-4 bg-slate-50 rounded-xl"><p class="text-xs text-slate-700 font-semibold mb-3">Erreur de chargement. Veuillez rafraîchir la page.</p></div>';
        }
      }

      function scheduleMount() {
        clearTimeout(updateDebounceTimer);
        updateDebounceTimer = setTimeout(() => {
          mountStripe();
        }, 400);
      }

      chks.forEach(chk => {
        chk.addEventListener('change', () => {
          updateTotal();
          scheduleMount();
        });
      });

      const custEmail = document.getElementById('cust-email');
      const custName = document.getElementById('cust-name');

      if (custEmail) custEmail.addEventListener('blur', scheduleMount);
      if (custName) custName.addEventListener('blur', scheduleMount);

      // Initial Mount
      document.addEventListener('DOMContentLoaded', () => {
        updateTotal();
        scheduleMount();
      });

      // Simple 15min Urgency Countdown
      let seconds = 14 * 60 + 59;
      const elCount = document.getElementById('countdown');
      setInterval(function() {
        if (seconds > 0) {
          seconds--;
          const m = Math.floor(seconds / 60);
          const s = seconds % 60;
          if (elCount) elCount.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        }
      }, 1000);
    })();
  </script>`;

  html = html.replace(scriptRegex, embeddedScript);

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`✓ Updated public/index.html with Stripe Embedded Checkout for [${lang}]`);
}

const langs = ['de', 'fr', 'it', 'es'];

langs.forEach(lang => {
  const dir = `c:/Users/Star/Documents/espionagem1/mega-inventors/regions/${lang}`;
  const cfg = REGION_CONFIGS[lang];

  // 1. Write worker.js with API route
  const workerCode = generateWorkerCode(cfg);
  fs.writeFileSync(path.join(dir, 'worker.js'), workerCode, 'utf8');
  console.log(`✓ Generated worker.js with API route for [${lang}]`);

  // 2. Update wrangler.toml to use worker.js and assets
  const toml = `name = "mega-inventors-${lang}"
main = "worker.js"
compatibility_date = "2024-11-01"

[assets]
directory = "./public"
binding = "ASSETS"
`;
  fs.writeFileSync(path.join(dir, 'wrangler.toml'), toml, 'utf8');

  // 3. Update public/index.html with Stripe Embed & localized images
  updateIndexHtmlWithStripeEmbed(lang);
});
