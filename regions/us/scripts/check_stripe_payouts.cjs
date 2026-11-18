const key = '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';

async function checkStripePayouts() {
  console.log('=== AUDITORIA STRIPE: SALDOS E REPASSES ===\n');

  // 1. Balance
  const resBal = await fetch('https://api.stripe.com/v1/balance', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const bal = await resBal.json();
  console.log('1. Saldo Geral Stripe:');
  console.log('Available (Disponível para Repasse Imediato):');
  (bal.available || []).forEach(a => console.log(`  - ${(a.amount/100).toFixed(2)} ${a.currency.toUpperCase()}`));
  console.log('Pending (Em Compensação / Agendado):');
  (bal.pending || []).forEach(p => console.log(`  - ${(p.amount/100).toFixed(2)} ${p.currency.toUpperCase()}`));

  // 2. Balance Transactions (Quando o dinheiro fica disponível)
  const resTx = await fetch('https://api.stripe.com/v1/balance_transactions?limit=10', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const tx = await resTx.json();
  console.log('\n2. Transações e Datas de Disponibilidade (Available On):');
  (tx.data || []).forEach(t => {
    const net = (t.net / 100).toFixed(2);
    const fee = (t.fee / 100).toFixed(2);
    const gross = ((t.net + t.fee) / 100).toFixed(2);
    const availDate = new Date(t.available_on * 1000).toLocaleDateString('pt-BR');
    const createdDate = new Date(t.created * 1000).toLocaleDateString('pt-BR');
    console.log(`- [${t.type}] Bruto: $${gross} | Taxa Stripe: $${fee} | Líquido: $${net} ${t.currency.toUpperCase()}`);
    console.log(`  Criado em: ${createdDate} -> LIBERAÇÃO NA STRIPE: ${availDate} (${t.status})`);
  });

  // 3. Payouts (Repasses para a Conta Bancária)
  const resPayouts = await fetch('https://api.stripe.com/v1/payouts?limit=5', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const payouts = await resPayouts.json();
  console.log('\n3. Histórico e Repasses Agendados para o Banco:');
  if (payouts.data && payouts.data.length > 0) {
    payouts.data.forEach(p => {
      const amt = (p.amount / 100).toFixed(2);
      const arrival = new Date(p.arrival_date * 1000).toLocaleDateString('pt-BR');
      console.log(`- Repasse ID: ${p.id} | Valor: $${amt} ${p.currency.toUpperCase()} | Status: ${p.status} | Data Estimada de Chegada no Banco: ${arrival}`);
    });
  } else {
    console.log('Nenhum repasse agendado ou concluído recentemente.');
  }

  // 4. Account Payout Schedule
  const resAcc = await fetch('https://api.stripe.com/v1/account', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const acc = await resAcc.json();
  if (acc.settings?.payouts) {
    console.log('\n4. Configuração de Repasses da Conta (Payout Schedule):');
    console.log(`  Intervalo: ${acc.settings.payouts.schedule?.interval} (Delay: ${acc.settings.payouts.schedule?.delay_days} dias)`);
    console.log(`  Conta Bancária Padrão: ${acc.external_accounts?.data?.[0]?.bank_name || 'Configurada'} (Final ${acc.external_accounts?.data?.[0]?.last4 || '****'})`);
  }
}

checkStripePayouts().catch(console.error);
