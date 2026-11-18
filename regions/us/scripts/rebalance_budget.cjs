const token = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';

async function updateAdset(id, updates) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(updates)) {
    params.append(k, v);
  }
  const res = await fetch(`https://graph.facebook.com/v21.0/${id}?access_token=${token}`, {
    method: 'POST',
    body: params
  });
  return res.json();
}

async function run() {
  console.log('=== APLICANDO OTIMIZAÇÃO DE ORÇAMENTO E CAIXA ===\n');

  // 1. Ad 01 -> R$ 40/dia (ACTIVE)
  console.log('1. Atualizando Ad 01 para R$ 40/dia...');
  const res01 = await updateAdset('120252644520680168', {
    daily_budget: '4000',
    name: '[ABO R$40] Ad 01 - Screens vs Curiosity (Robot & Cardboard)',
    status: 'ACTIVE'
  });
  console.log('Ad 01:', res01);

  // 2. Ad 03 -> R$ 40/dia (ACTIVE)
  console.log('2. Confirmando Ad 03 em R$ 40/dia...');
  const res03 = await updateAdset('120252644531340168', {
    daily_budget: '4000',
    name: '[ABO R$40] Ad 03 - Parent & Child Weekend Connection',
    status: 'ACTIVE'
  });
  console.log('Ad 03:', res03);

  // 3. Ad 04 -> R$ 30/dia (ACTIVE)
  console.log('3. Atualizando Ad 04 para R$ 30/dia...');
  const res04 = await updateAdset('120252644535670168', {
    daily_budget: '3000',
    name: '[ABO R$30] Ad 04 - Recycled Cardboard Workshop & 120 Projects',
    status: 'ACTIVE'
  });
  console.log('Ad 04:', res04);

  // 4. Ad 02 -> PAUSED
  console.log('4. Pausando Ad 02...');
  const res02 = await updateAdset('120252644524270168', {
    status: 'PAUSED',
    name: '[PAUSED] Ad 02 - Articulated Robots & DIY Engineering'
  });
  console.log('Ad 02:', res02);

  // 5. Ad 05 -> PAUSED
  console.log('5. Pausando Ad 05...');
  const res05 = await updateAdset('120252644537510168', {
    status: 'PAUSED',
    name: '[PAUSED] Ad 05 - Dynamic 18s (Build Their Future)'
  });
  console.log('Ad 05:', res05);

  // 6. Verificar status de todos
  console.log('\n--- CONFERÊNCIA FINAL DOS CONJUNTOS NA META ---');
  const campId = '120252644518370168';
  const resList = await fetch(`https://graph.facebook.com/v21.0/${campId}/adsets?fields=id,name,status,effective_status,daily_budget&access_token=${token}`);
  const dataList = await resList.json();
  let totalDaily = 0;
  dataList.data.forEach(s => {
    const isAct = s.status === 'ACTIVE';
    const b = isAct ? (parseInt(s.daily_budget)/100) : 0;
    totalDaily += b;
    console.log(`- ${s.name} | Status: ${s.status} (${s.effective_status}) | Diária: R$ ${(parseInt(s.daily_budget)/100).toFixed(2)}`);
  });

  console.log(`\nNOVO TOTAL DIÁRIO ATIVO: R$ ${totalDaily.toFixed(2)} / dia`);
  console.log(`Pista de Pouso Estimada para R$ 1.000: ${(1000 / (totalDaily * 1.13)).toFixed(1)} dias!`);
}

run().catch(console.error);
