const fs = require('fs');
const path = require('path');

const usCheckoutHTML = `
  <!-- CHECKOUT / ORDER SECTION -->
  <section id="checkout" class="py-12 sm:py-16 bg-slate-100/70 border-t border-slate-200">
    <div class="max-w-2xl mx-auto px-4">

      <!-- Top Badge & Header -->
      <div class="text-center mb-8">
        <span class="inline-block bg-green-100 text-green-800 text-xs font-black px-3.5 py-1.5 rounded-full border border-green-200 uppercase">⚡ FINAL STEP: GET INSTANT ACCESS</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl text-slate-900 mt-2">Fill in your details to get started</h2>
        <p class="text-xs sm:text-sm text-slate-600 mt-1">You will receive your download link and member access in your email immediately after confirmation.</p>
      </div>

      <!-- MAIN FORM CARD -->
      <div class="bg-white rounded-3xl border-2 border-blue-500/30 shadow-2xl overflow-hidden">
        
        <!-- Card Top Header -->
        <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-5 sm:p-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🤖</span>
            <div>
              <h3 class="font-display font-extrabold text-lg sm:text-xl leading-tight">The Young Inventor's Mega Pack</h3>
              <p class="text-xs text-blue-100">120 Step-by-Step Projects + 5 Exclusive Bonuses</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs text-blue-200 line-through block">Reg. $72.00</span>
            <span class="font-display font-black text-xl sm:text-2xl text-yellow-300">$27.00</span>
          </div>
        </div>

        <div class="p-6 sm:p-8 space-y-6">

          <!-- 1. PERSONAL DETAILS -->
          <div>
            <h4 class="font-display font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
              Where should we send your materials?
            </h4>
            <div class="space-y-3">
              <div>
                <label for="cust-name" class="block text-xs font-semibold text-slate-700 mb-1">Your Full Name:</label>
                <input type="text" id="cust-name" placeholder="e.g. Sarah Jenkins" 
                       class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              </div>
              <div>
                <label for="cust-email" class="block text-xs font-semibold text-slate-700 mb-1">Your Best Email (where you'll receive instant access):</label>
                <input type="email" id="cust-email" placeholder="e.g. sarah@gmail.com" 
                       class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              </div>
              <div>
                <label for="cust-phone" class="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone (for SMS updates & VIP support):</label>
                <input type="tel" id="cust-phone" placeholder="e.g. (555) 234-5678" 
                       class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              </div>
            </div>
          </div>

          <!-- 2. THE 7 OFFICIAL ORDER BUMPS -->
          <div class="pt-4 border-t border-slate-200">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-display font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                Special Add-On Bundles (Save 43% OFF):
              </h4>
            </div>

            <div class="space-y-3">
              
              <!-- Bump 1: Little Engineers -->
              <label class="order-bump-card block p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-400" id="card-bump-1">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="bump-pequenos-engenheiros" class="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <div class="flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-slate-900 text-xs sm:text-sm">🛠️ Little Engineers: 10 Projects for Young Inventors</span>
                      <span class="font-bold text-blue-700 text-xs sm:text-sm whitespace-nowrap">+ $11.99</span>
                    </div>
                    <p class="text-[11px] sm:text-xs text-slate-600 mt-1">10 fun projects to create, invent and learn through hands-on play!</p>
                  </div>
                </div>
              </label>

              <!-- Bump 2: Moving Robotics -->
              <label class="order-bump-card block p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-400" id="card-bump-2">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="bump-robotica-movimento" class="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <div class="flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-slate-900 text-xs sm:text-sm">🤖 Moving Robotics: 24 Cardboard Mechanisms</span>
                      <span class="font-bold text-blue-700 text-xs sm:text-sm whitespace-nowrap">+ $11.99</span>
                    </div>
                    <p class="text-[11px] sm:text-xs text-slate-600 mt-1">Robots that move for real: 24 cardboard mechanisms with templates and blueprints.</p>
                  </div>
                </div>
              </label>

              <!-- Bump 3: Scientists at Home -->
              <label class="order-bump-card block p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-400" id="card-bump-3">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="bump-cientistas-casa" class="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <div class="flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-slate-900 text-xs sm:text-sm">🔬 Scientists at Home: 60 Illustrated Experiments</span>
                      <span class="font-bold text-blue-700 text-xs sm:text-sm whitespace-nowrap">+ $11.99</span>
                    </div>
                    <p class="text-[11px] sm:text-xs text-slate-600 mt-1">60 Illustrated Experiments to discover science, spark curiosity and learn through family fun. ✨</p>
                  </div>
                </div>
              </label>

              <!-- Bump 4: Screen-Free Tech -->
              <label class="order-bump-card block p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-400" id="card-bump-4">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="bump-tecnologia-sem-telas" class="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <div class="flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-slate-900 text-xs sm:text-sm">🏆 Screen-Free Technology: 40 Challenges</span>
                      <span class="font-bold text-blue-700 text-xs sm:text-sm whitespace-nowrap">+ $11.99</span>
                    </div>
                    <p class="text-[11px] sm:text-xs text-slate-600 mt-1">40 level-based challenges with progress board, badges, and diplomas.</p>
                  </div>
                </div>
              </label>

              <!-- Bump 5: Hydraulic Machines -->
              <label class="order-bump-card block p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-400" id="card-bump-5">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="bump-maquinas-hidraulicas" class="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <div class="flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-slate-900 text-xs sm:text-sm">🚀 Hydraulic Machines: 10 Challenges with Water</span>
                      <span class="font-bold text-blue-700 text-xs sm:text-sm whitespace-nowrap">+ $11.99</span>
                    </div>
                    <p class="text-[11px] sm:text-xs text-slate-600 mt-1">Build hydraulic machines and discover how water creates movement while learning through family play 💧.</p>
                  </div>
                </div>
              </label>

              <!-- Bump 6: Inventor's Birthday Party -->
              <label class="order-bump-card block p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-400" id="card-bump-6">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="bump-festa-inventores" class="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <div class="flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-slate-900 text-xs sm:text-sm">🎉 Inventor's Birthday Party: Complete Themed Kit</span>
                      <span class="font-bold text-blue-700 text-xs sm:text-sm whitespace-nowrap">+ $11.99</span>
                    </div>
                    <p class="text-[11px] sm:text-xs text-slate-600 mt-1">Kit to host an unforgettable themed party: editable invitations, printable decor, group activity guide, and team badges.</p>
                  </div>
                </div>
              </label>

              <!-- Bump 7: My Inventor's Journal -->
              <label class="order-bump-card block p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-400" id="card-bump-7">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="bump-diario-inventor" class="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <div class="flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-slate-900 text-xs sm:text-sm">📓 My Inventor's Journal: 30 Days of Creation</span>
                      <span class="font-bold text-blue-700 text-xs sm:text-sm whitespace-nowrap">+ $11.99</span>
                    </div>
                    <p class="text-[11px] sm:text-xs text-slate-600 mt-1">30 days to imagine, draw, and discover. An illustrated journal to record ideas, tests, and improvements. Download, print, and start creating!</p>
                  </div>
                </div>
              </label>

            </div>
          </div>

          <!-- 3. ORDER SUMMARY & CHECKOUT BUTTON -->
          <div class="pt-4 border-t border-slate-200 bg-slate-50 p-5 rounded-2xl">
            <div class="space-y-1.5 text-xs sm:text-sm mb-4">
              <div class="flex justify-between text-slate-600">
                <span>The Young Inventor's Mega Pack (120 Projects + 5 Bonuses):</span>
                <span class="font-semibold text-slate-900">$27.00</span>
              </div>
              <div id="summary-pequenos-engenheiros" class="hidden flex justify-between text-blue-700">
                <span>+ Little Engineers (10 Projects):</span>
                <span class="font-semibold">+$11.99</span>
              </div>
              <div id="summary-robotica-movimento" class="hidden flex justify-between text-blue-700">
                <span>+ Moving Robotics (24 Mechanisms):</span>
                <span class="font-semibold">+$11.99</span>
              </div>
              <div id="summary-cientistas-casa" class="hidden flex justify-between text-blue-700">
                <span>+ Scientists at Home (60 Experiments):</span>
                <span class="font-semibold">+$11.99</span>
              </div>
              <div id="summary-tecnologia-sem-telas" class="hidden flex justify-between text-blue-700">
                <span>+ Screen-Free Tech (40 Challenges):</span>
                <span class="font-semibold">+$11.99</span>
              </div>
              <div id="summary-maquinas-hidraulicas" class="hidden flex justify-between text-blue-700">
                <span>+ Hydraulic Machines (10 Challenges):</span>
                <span class="font-semibold">+$11.99</span>
              </div>
              <div id="summary-festa-inventores" class="hidden flex justify-between text-blue-700">
                <span>+ Inventor's Party Kit:</span>
                <span class="font-semibold">+$11.99</span>
              </div>
              <div id="summary-diario-inventor" class="hidden flex justify-between text-blue-700">
                <span>+ My Inventor's Journal (30 Days):</span>
                <span class="font-semibold">+$11.99</span>
              </div>
              <div class="border-t border-slate-200 pt-2 flex justify-between items-center text-base sm:text-lg font-display font-extrabold text-slate-900">
                <span>Total to Pay:</span>
                <span id="summary-total" class="text-blue-700 font-black">$27.00</span>
              </div>
            </div>

            <!-- BUTTON COMPLETE ORDER -->
            <button id="btn-finalizar" type="button" class="pulse-btn w-full py-4 px-6 rounded-2xl bg-brandGreen hover:bg-brandGreenDark text-white font-display font-black text-lg sm:text-xl shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
              <span>COMPLETE ORDER ON STRIPE •</span>
              <span id="btn-total">$27.00</span>
            </button>

            <div class="flex items-center justify-center gap-4 text-[11px] text-slate-500 mt-3">
              <span class="flex items-center gap-1">🔒 256-Bit SSL Encrypted</span>
              <span class="flex items-center gap-1">⚡ Instant Email Access</span>
              <span class="flex items-center gap-1">🛡️ 30-Day Money Back</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
`;

const usCheckoutScript = `
  <script>
    (function() {
      const BASE_PRICE = 27.00;
      const BUMP_PRICE = 11.99;

      const bumps = [
        { chk: document.getElementById('bump-pequenos-engenheiros'), card: document.getElementById('card-bump-1'), sum: document.getElementById('summary-pequenos-engenheiros') },
        { chk: document.getElementById('bump-robotica-movimento'), card: document.getElementById('card-bump-2'), sum: document.getElementById('summary-robotica-movimento') },
        { chk: document.getElementById('bump-cientistas-casa'), card: document.getElementById('card-bump-3'), sum: document.getElementById('summary-cientistas-casa') },
        { chk: document.getElementById('bump-tecnologia-sem-telas'), card: document.getElementById('card-bump-4'), sum: document.getElementById('summary-tecnologia-sem-telas') },
        { chk: document.getElementById('bump-maquinas-hidraulicas'), card: document.getElementById('card-bump-5'), sum: document.getElementById('summary-maquinas-hidraulicas') },
        { chk: document.getElementById('bump-festa-inventores'), card: document.getElementById('card-bump-6'), sum: document.getElementById('summary-festa-inventores') },
        { chk: document.getElementById('bump-diario-inventor'), card: document.getElementById('card-bump-7'), sum: document.getElementById('summary-diario-inventor') }
      ];

      const sumTotal = document.getElementById('summary-total');
      const btnTotal = document.getElementById('btn-total');
      const btnFinalizar = document.getElementById('btn-finalizar');

      function formatUSD(val) {
        return '$' + val.toFixed(2);
      }

      function updateTotal() {
        let total = BASE_PRICE;

        bumps.forEach(b => {
          if (b.chk && b.chk.checked) {
            total += BUMP_PRICE;
            b.card.classList.add('checked');
            b.sum.classList.remove('hidden');
          } else if (b.chk) {
            b.card.classList.remove('checked');
            b.sum.classList.add('hidden');
          }
        });

        const formatted = formatUSD(total);
        if (sumTotal) sumTotal.textContent = formatted;
        if (btnTotal) btnTotal.textContent = formatted;
      }

      bumps.forEach(b => {
        if (b.chk) b.chk.addEventListener('change', updateTotal);
      });

      // Redirect to Stripe Checkout with all 7 bumps prefilled
      if (btnFinalizar) {
        btnFinalizar.addEventListener('click', function() {
          const name = document.getElementById('cust-name').value.trim();
          const email = document.getElementById('cust-email').value.trim();

          if (!name || !email) {
            alert('Please provide your Name and Email to receive your instant download access.');
            document.getElementById('cust-name').focus();
            return;
          }

          if (typeof fbq === 'function') {
            fbq('track', 'InitiateCheckout', {
              value: BASE_PRICE,
              currency: 'USD',
              content_name: "The Young Inventor's Mega Pack"
            });
          }

          let checkoutUrl = 'https://buy.stripe.com/4gMdR9edd0Fm5Zr07R3Je0a';
          const params = new URLSearchParams();
          params.append('prefilled_email', email);
          if (name) params.append('client_reference_id', encodeURIComponent(name));

          const currentSearch = new URLSearchParams(window.location.search);
          for (const [key, value] of currentSearch.entries()) {
            params.append(key, value);
          }

          const finalUrl = checkoutUrl + (checkoutUrl.includes('?') ? '&' : '?') + params.toString();
          window.location.href = finalUrl;
        });
      }

    })();
  </script>
`;

// Paths to update
const targetPaths = [
  path.resolve('mega-inventors', 'regions', 'en', 'public', 'index.html'),
  path.resolve('mega-inventors-us', 'public', 'index.html')
];

for (const p of targetPaths) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');

    // Replace old checkout section
    const startSec = content.indexOf('<section id="checkout"');
    const endSec = content.indexOf('</section>', startSec) + 10;
    if (startSec !== -1 && endSec !== -1) {
      content = content.substring(0, startSec) + usCheckoutHTML + content.substring(endSec);
    }

    // Append script before </body>
    if (!content.includes('bump-pequenos-engenheiros')) {
      content = content.replace('</body>', `${usCheckoutScript}\n</body>`);
    } else {
      // replace existing script
      const scriptStart = content.lastIndexOf('<script>');
      const scriptEnd = content.lastIndexOf('</script>') + 9;
      if (scriptStart !== -1) {
        content = content.substring(0, scriptStart) + usCheckoutScript + content.substring(scriptEnd);
      }
    }

    fs.writeFileSync(p, content, 'utf8');
    console.log('✓ Updated US Landing Page with 7 Order Bumps:', p);
  }
}
