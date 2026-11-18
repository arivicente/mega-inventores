import fs from 'fs';

// IT
fs.copyFileSync(
  'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_it_trans.png',
  'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/it/public/assets/mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png'
);
fs.copyFileSync(
  'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_it_trans.png',
  'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/it/public/assets/mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png'
);
fs.copyFileSync(
  'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_it_trans.png',
  'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/mockup_translated_italian_transparent.png'
);

// DE
fs.copyFileSync(
  'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_de_trans.png',
  'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/de/public/assets/mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png'
);
fs.copyFileSync(
  'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_de_trans.png',
  'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/de/public/assets/mega-pack-3d-de-inventores-LvqdZ5F0Wyl4TKdk.png'
);
fs.copyFileSync(
  'c:/Users/Star/Documents/espionagem1/mega-inventores/scripts/test_de_trans.png',
  'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/mockup_translated_german_transparent.png'
);

// Also copy FR transparent to brain
fs.copyFileSync(
  'c:/Users/Star/Documents/espionagem1/mega-inventors/regions/fr/public/assets/mockup-transparente-com-selo-de-videos-1hqbF3qL5M29IzOX.png',
  'C:/Users/Star/.gemini/antigravity/brain/ba30b533-769e-47d8-bc38-248f05921353/mockup_translated_french_transparent.png'
);

console.log('Copied all transparent assets to DE, IT, and brain folder!');
