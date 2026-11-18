import puppeteer from 'puppeteer';
import path from 'path';

async function generateUltraCtaPerfect() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          width: 360px;
          height: 640px;
          background: transparent;
          font-family: -apple-system, BlinkMacSystemFont, "Montserrat", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Gradiente suave apenas atrás do card inferior para dar contraste */
        .bottom-shadow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 380px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0) 100%);
        }

        /* Top Banner Laranja Vibrante */
        .top-badge {
          position: absolute;
          top: 35px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #FF5500 0%, #FF2200 100%);
          color: #FFF;
          font-weight: 900;
          font-size: 13.5px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 10px 22px;
          border-radius: 50px;
          box-shadow: 0 6px 20px rgba(255, 34, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          border: 1.5px solid rgba(255,255,255,0.4);
          text-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }

        /* Card Central Inferior de Ultra Conversão */
        .cta-container {
          position: absolute;
          bottom: 18px;
          left: 12px;
          right: 12px;
          background: rgba(11, 19, 38, 0.96);
          border: 2.5px solid #22C55E;
          border-radius: 24px;
          padding: 16px 14px 12px 14px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.9), 0 0 30px rgba(34, 197, 94, 0.4);
        }

        .offer-title {
          color: #FFFFFF;
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 4px;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .old-price {
          color: #94A3B8;
          font-size: 14px;
          text-decoration: line-through;
          font-weight: 700;
        }

        .new-price {
          color: #22C55E;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.5px;
          text-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
        }

        .discount-pill {
          background: #EF4444;
          color: #FFF;
          font-size: 11px;
          font-weight: 900;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
        }

        /* Botão Grande Chamativo Verde Neon */
        .cta-button {
          background: linear-gradient(180deg, #22C55E 0%, #15803D 100%);
          color: #FFFFFF;
          font-size: 18px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 15px 12px;
          border-radius: 14px;
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.7), inset 0 2px 0 rgba(255,255,255,0.4);
          border: 1.5px solid rgba(255,255,255,0.3);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-shadow: 0 2px 3px rgba(0,0,0,0.4);
        }

        .bonus-tag {
          color: #FACC15;
          font-size: 12.5px;
          font-weight: 800;
          margin-bottom: 5px;
          letter-spacing: 0.2px;
        }

        .guarantee-tag {
          color: #94A3B8;
          font-size: 11.5px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        /* Setas animadas estilizadas */
        .arrows-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }

        .arrow-svg {
          width: 22px;
          height: 22px;
          fill: #22C55E;
          filter: drop-shadow(0 2px 5px rgba(34, 197, 94, 0.8));
        }
      </style>
    </head>
    <body>
      <div class="bottom-shadow"></div>

      <div class="top-badge">
        OFERTA ESPECIAL DE LANÇAMENTO
      </div>

      <div class="cta-container">
        <div class="offer-title">🤖 MEGA PACK DE INVENTORES</div>
        
        <div class="price-row">
          <span class="old-price">De R$ 97</span>
          <span class="new-price">R$ 37,00</span>
          <span class="discount-pill">62% OFF</span>
        </div>

        <div class="cta-button">
          CLIQUE EM SAIBA MAIS
        </div>

        <div class="bonus-tag">
          + 5 SUPER BÔNUS EXCLUSIVOS INCLUSOS
        </div>

        <div class="guarantee-tag">
          Acesso Vitalício Imediato • 7 Dias de Garantia
        </div>

        <div class="arrows-row">
          <svg class="arrow-svg" viewBox="0 0 24 24"><path d="M12 21l-8-8 1.4-1.4 5.6 5.6V3h2v14.2l5.6-5.6 1.4 1.4-8 8z"/></svg>
          <svg class="arrow-svg" viewBox="0 0 24 24"><path d="M12 21l-8-8 1.4-1.4 5.6 5.6V3h2v14.2l5.6-5.6 1.4 1.4-8 8z"/></svg>
          <svg class="arrow-svg" viewBox="0 0 24 24"><path d="M12 21l-8-8 1.4-1.4 5.6 5.6V3h2v14.2l5.6-5.6 1.4 1.4-8 8z"/></svg>
        </div>
      </div>
    </body>
    </html>
  `);

  const outPath = path.resolve('mega-inventores', 'public', 'anuncios', 'videos', 'overlay_ultra_cta.png');
  await page.screenshot({ path: outPath, omitBackground: true });
  await browser.close();
  console.log("✅ Overlay Ultra CTA atualizado com R$ 37,00 em:", outPath);
}

generateUltraCtaPerfect().catch(console.error);
