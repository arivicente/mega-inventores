# Teste ChatGPT Ads - Mega Inventors ES (24 EUR)

## Arquivos
- `campaigns.csv`, `ad_groups.csv`, `ads.csv`: as 3 abas do bulk upload. Os nomes das colunas seguem o que achei em fontes secundárias. **Compare com o template oficial em Ads Manager > Create > Bulk upload antes de subir.**
- Limites conferidos: título ≤ 32 (G1 = 32, G2 = 28) e descrição ≤ 54 (ambas = 50).

## Plano
- Orçamento: R$ 50/dia (~€8), de 18/11 a 01/12/2026 (14 dias, ~R$ 700).
- 2 grupos de anúncios (G1 sem telas, G2 robótica/STEM), 1 anúncio cada, só ES.
- Parar: ~€70 gastos e 0 vendas, ou CPC > €0,90 de forma consistente.
- Escalar: 3 ou mais vendas e CPA < €24 (considerando upsell).

## Estado do rastreamento (regions/es)
| Item | Estado |
| :-- | :-- |
| Meta Pixel `1864964467859741` | Instalado (PageView, InitiateCheckout, Purchase) |
| Pixel/CAPI OpenAI (`oaiq`) | **Não existe na pasta.** Falta o Pixel ID e a chave da Conversions API (Ads Manager > Conversions). |
| CAPI server-side (qualquer plataforma) | **Não existe** no `worker.js`. |
| `/api/track` chamado no `index.html` | `worker.js` não trata essa rota |
| Purchase em `thank-you.html` | Valor fixo de 24 EUR (ignora order bumps) e dispara em qualquer visita, sem validar `session_id` |

## Antes de ligar (bloqueadores)
1. Pegar no Ads Manager o Pixel ID e a chave da CAPI da OpenAI. Sem eles não há conversão medida.
2. Adicionar `oaiq` na `index.html` (evento de checkout iniciado) e na `thank-you.html` (`order_created`). Usar valor real e `event_id` = `session_id` do Stripe.
3. Enviar a mesma compra pelo servidor (CAPI) com o mesmo `event_id`, para deduplicar. A compra deve ser confirmada pelo webhook ou pela sessão do Stripe, não pela visita à página.
4. Corrigir o Purchase da Meta para usar o valor real e validar a sessão.
5. Confirmar a conta, o crédito (gaste R$ 450 e ganhe R$ 450) e se o país de faturamento permite veicular na Espanha.
6. Opcional: domínio próprio no lugar de `*.workers.dev`, para ajudar na aprovação e na confiança.

Preço verificado no código: `worker.js` cobra 2400 centavos (24 EUR) e a página mostra 24.00€, então está consistente.
