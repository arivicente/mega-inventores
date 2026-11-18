# Estratégia de Validação e Escala Internacional — Mega / Young Inventors

> Documento de referência para não perder o foco entre fases e manter a estrutura de expansão organizada.

---

## Fase 1 — Validação Base (`US` Only) [ATUAL]
* **Objetivo:** Encontrar o **CPA real** e validar os criativos vencedores antes de multiplicar países ou idiomas.
* **Configuração ativa (`act_898705452000785` / Campanha `120252644518370168`):**
  * **Conjunto:** `[ABO R$200] US Only - All 5 Ads Consolidated` (`120252715725420168`)
  * **País:** Somente **Estados Unidos (`US`)**
  * **Orçamento:** **R$ 200,00/dia**
  * **Segmentação:** `Mobile` apenas (`device_platforms: ["mobile"]`), `Facebook + Instagram` apenas (`publisher_platforms: ["facebook", "instagram"]`, sem Audience Network), `Advantage+ Audience` ligado, idade `25–65+`.
  * **Anúncios dentro:** `Ad 01` a `Ad 05`.
* **Critério para avançar:** Acumular volume suficiente em `US` para identificar os criativos com vendas consistentes e CPA saudável → pausar os fracos → multiplicar/escalar os vencedores.

---

## Fase 2 — Expansão na Anglosfera (Sem Tradução)
Replicar **apenas os anúncios validados na Fase 1** em **conjuntos separados por país** (para comparar CPA/ROAS isoladamente sem que países de CPM menor roubem verba dos EUA):
1. 🇨🇦 **Canadá (`CA`)** — *Atenção: idioma Inglês / cuidado com Quebec*
2. 🇬🇧 **Reino Unido (`GB`)**
3. 🇦🇺 **Austrália (`AU`)**
4. 🇮🇪 **Irlanda (`IE`)**
5. 🇳🇿 **Nova Zelândia (`NZ`)**
*(Opcional após validar os 5 acima: 🇸🇬 Singapura `SG`)*

---

## Fase 3 — Expansão nos Idiomas Já Prontos (`regions/`)
Adaptar/traduzir **apenas os criativos vencedores** para as pastas de regiões já existentes:
* `regions/fr` — 🇫🇷 França (`FR`) *(+ Bélgica `BE` / Suíça francesa `CH`)*
* `regions/de` — 🇩🇪 Alemanha (`DE`) *(+ Áustria `AT` / Suíça alemã `CH`)*
* `regions/it` — 🇮🇹 Itália (`IT`)
* `regions/es` — 🇪🇸 Espanha (`ES`)
* `regions/br` — 🇧🇷 Brasil (`BR`) *(+ Portugal `PT`)*

---

## Fase 4 — Expansão Leste Europeu & Turquia (Os 5 Novos Mercados = Total 11 Países Base)
Pastas já pré-criadas em `regions/` e `rendered_ads/` para receber os criativos vencedores quando chegar a hora:
* `regions/pl` — 🇵🇱 **Polônia (`PL`)** | Idioma: Polonês | Moeda: `PLN` | **Atenção:** habilitar **BLIK** no Stripe (principal método local).
* `regions/cz` — 🇨🇿 **República Tcheca (`CZ`)** | Idioma: Tcheco | Moeda: `CZK` | Cartão / Apple Pay / Google Pay.
* `regions/hu` — 🇭🇺 **Hungria (`HU`)** | Idioma: Húngaro | Moeda: `HUF` | Cartão / Apple Pay / Google Pay.
* `regions/ro` — 🇷🇴 **Romênia (`RO`)** | Idioma: Romeno | Moeda: `RON` | Cartão / Apple Pay / Google Pay (produto digital = entrega imediata).
* `regions/tr` — 🇹🇷 **Turquia (`TR`)** | Idioma: Turco | Moeda: `TRY` (ou USD/EUR conforme checkout) | Baixo CPM e baixa concorrência.

---

## Fase 5 — Bônus de Alta Renda (Sem Precisar Traduzir Página Nova)
Depois de validar os 11 mercados principais, aproveitar as mesmas páginas e criativos já traduzidos para somar países vizinhos de alto poder aquisitivo e forte hábito de compra online:
* **Inglês (`regions/us` / `rendered_ads/en`):** 🇸🇬 **Singapura (`SG`)** *(e opcional 🇲🇹 Malta `MT`)*
* **Alemão (`regions/de` / `rendered_ads/de`):** 🇦🇹 **Áustria (`AT`)** e 🇨🇭 **Suíça alemã (`CH`)**
* **Francês (`regions/fr` / `rendered_ads/fr`):** 🇧🇪 **Bélgica (`BE`)** e 🇨🇭 **Suíça francesa (`CH`)**
* **Italiano (`regions/it` / `rendered_ads/it`):** 🇨🇭 **Suíça italiana (`CH`)**
* **Português (`regions/br`):** 🇵🇹 **Portugal (`PT`)**

---

## Regras de Ouro (Para Não Repetir Erros)
1. **Nunca misturar países de CPMs muito diferentes no mesmo conjunto** durante validação (senão a Meta joga a verba para o país de CPM mais barato).
2. **Não abrir vários conjuntos novos com orçamento baixo demais** (ex.: R$ 20/dia) antes de validar o criativo em `US`.
3. **Excluir `Audience Network`** para evitar cliques incentivados/acidentais de jogos sujando `InitiateCheckout` no pixel.
4. **Manter `Mobile` como foco** enquanto Apple Pay / Google Pay / Link forem o principal motor de conversão rápida.
