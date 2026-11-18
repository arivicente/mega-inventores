import { execSync } from 'child_process';

console.log("=== RE-RENDERIZANDO OS 3 ANÚNCIOS COM R$ 37,00 ===");

console.log("1/3 - Re-renderizando Ad 01...");
execSync("node mega-inventores/scripts/render_video_v4_dynamic.js", { stdio: 'inherit' });

console.log("\n2/3 - Re-renderizando Ad 02...");
execSync("node mega-inventores/scripts/render_video_02_dynamic.js", { stdio: 'inherit' });

console.log("\n3/3 - Re-renderizando Ad 03...");
execSync("node mega-inventores/scripts/render_video_03_dynamic.js", { stdio: 'inherit' });

console.log("\n🎉 TODOS OS 3 ANÚNCIOS ATUALIZADOS COM R$ 37,00 COM SUCESSO!");
