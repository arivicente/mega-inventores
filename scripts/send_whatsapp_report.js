const fs = require('fs');
const { generateReport } = require('./hourly_report');

function loadEnv(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) env[trimmed.substring(0, idx).trim()] = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
    });
    return env;
  } catch (e) { return {}; }
}
const env = { 
  ...loadEnv('.env'), 
  ...loadEnv('mega-inventors/regions/us/.env') 
};
const token = env.META_ACCESS_TOKEN;
const phoneId = '1443829242138375';

async function sendHourlyReport(recipient = '5521987552460') {
  const reportText = await generateReport();
  console.log('Generated report:\n', reportText);

  // Send as text message
  const body = {
    messaging_product: 'whatsapp',
    to: recipient,
    type: 'text',
    text: {
      body: reportText
    }
  };

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const resJson = await res.json();
  console.log('WhatsApp Delivery Result:', JSON.stringify(resJson, null, 2));
  return resJson;
}

if (require.main === module) {
  sendHourlyReport().catch(console.error);
}

module.exports = { sendHourlyReport };
