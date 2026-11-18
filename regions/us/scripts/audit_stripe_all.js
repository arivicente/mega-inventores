const key = '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';

async function checkAll() {
  console.log('--- ALL STRIPE CHARGES ---');
  const resCharges = await fetch('https://api.stripe.com/v1/charges?limit=20', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const dataCharges = await resCharges.json();
  console.log(`Total charges returned: ${dataCharges.data.length}`);
  dataCharges.data.forEach(c => {
    console.log(`- ID: ${c.id} | Status: ${c.status} | Amount: $${(c.amount/100).toFixed(2)} | Customer: ${c.billing_details?.name} (${c.billing_details?.email}) | Date: ${new Date(c.created*1000).toISOString()}`);
  });

  console.log('\n--- ALL STRIPE PAYMENT INTENTS ---');
  const resPI = await fetch('https://api.stripe.com/v1/payment_intents?limit=20', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const dataPI = await resPI.json();
  dataPI.data.forEach(pi => {
    if (pi.status === 'succeeded') {
      console.log(`- PI: ${pi.id} | SUCCEEDED | Amount: $${(pi.amount/100).toFixed(2)} | Date: ${new Date(pi.created*1000).toISOString()}`);
    }
  });

  console.log('\n--- ALL STRIPE CHECKOUT SESSIONS (PAID) ---');
  const resCS = await fetch('https://api.stripe.com/v1/checkout/sessions?limit=20', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const dataCS = await resCS.json();
  const paidSessions = dataCS.data.filter(s => s.payment_status === 'paid');
  console.log(`Paid Checkout Sessions: ${paidSessions.length}`);
  paidSessions.forEach(s => {
    console.log(`- Session: ${s.id} | Amount: $${(s.amount_total/100).toFixed(2)} | Email: ${s.customer_details?.email || s.customer_email} | Name: ${s.customer_details?.name} | Date: ${new Date(s.created*1000).toISOString()}`);
  });
}

checkAll().catch(console.error);
