import fs from 'fs';

const langs = ['de', 'fr', 'it', 'es'];
langs.forEach(lang => {
  const dir = 'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/' + lang;
  const toml = `name = "mega-inventors-${lang}"
main = "worker.js"
compatibility_date = "2024-11-01"

[assets]
directory = "./public"
binding = "ASSETS"
`;
  fs.writeFileSync(dir + '/wrangler.toml', toml, 'utf8');

  const worker = `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
`;
  fs.writeFileSync(dir + '/worker.js', worker, 'utf8');
  console.log('Configured', lang);
});
