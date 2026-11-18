async function printBlock83() {
  const res = await fetch('https://developers.contasimples.com/br/comece-aqui/assinatura-requisicoes');
  const html = await res.text();
  const matches = [...html.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/g)];
  const b83 = matches[83][1]
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&');
  console.log(b83);
}
printBlock83().catch(console.error);
