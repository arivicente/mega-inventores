async function printBlocks() {
  const res = await fetch('https://developers.contasimples.com/br/comece-aqui/assinatura-requisicoes');
  const html = await res.text();
  const matches = [...html.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/g)];
  for (let i = 45; i < 95; i++) {
    if (matches[i]) {
      const clean = matches[i][1]
        .replace(/<[^>]+>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&amp;/g, '&');
      if (clean.includes('sig=') || clean.includes('@method') || clean.includes('openssl') || clean.includes('Signature')) {
        console.log(`--- BLOCK ${i} ---`);
        console.log(clean);
      }
    }
  }
}
printBlocks().catch(console.error);
