const token = "EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD";
const actId = "act_898705452000785";

async function checkDateBreakdowns() {
  const dates = ['yesterday', 'today', 'maximum'];
  for (const d of dates) {
    const res = await fetch(`https://graph.facebook.com/v21.0/${actId}/insights?date_preset=${d}&fields=spend,actions,action_values&access_token=${token}`);
    const data = await res.json();
    const row = data.data?.[0];
    const purchases = row?.actions?.find(a => a.action_type === 'purchase')?.value || 0;
    const purchaseVal = row?.action_values?.find(a => a.action_type === 'purchase')?.value || 0;
    console.log(`[Date Preset: ${d}] Spend: R$ ${parseFloat(row?.spend||0).toFixed(2)} | Purchases: ${purchases} | Purchase Value: ${purchaseVal}`);
  }
}

checkDateBreakdowns().catch(console.error);
