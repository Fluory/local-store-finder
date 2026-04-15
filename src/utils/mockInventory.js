export const CATEGORY_LABELS = {
  dairy:     'Molkereiprodukte',
  bread:     'Brot & Backwaren',
  produce:   'Obst & Gemüse',
  meat:      'Fleisch & Fisch',
  beverages: 'Getränke',
  frozen:    'Tiefkühl',
  snacks:    'Snacks & Süßes',
  household: 'Haushalt',
};

const PRODUCTS = {
  dairy: [
    { id: 'd1', name: 'Vollmilch 3,5%',     brand: 'Weihenstephan', price: '1,09 €', unit: '1 l',     emoji: '🥛' },
    { id: 'd2', name: 'Butter',              brand: 'Kerrygold',     price: '1,99 €', unit: '250 g',   emoji: '🧈' },
    { id: 'd3', name: 'Gouda jung',          brand: 'Leerdammer',    price: '2,49 €', unit: '200 g',   emoji: '🧀' },
    { id: 'd4', name: 'Naturjoghurt 3,5%',   brand: 'Danone',        price: '0,89 €', unit: '500 g',   emoji: '🥣' },
    { id: 'd5', name: 'Schlagsahne',         brand: 'Bärenmarke',    price: '0,99 €', unit: '200 ml',  emoji: '🥛' },
    { id: 'd6', name: 'Magerquark',          brand: 'Milram',        price: '0,79 €', unit: '500 g',   emoji: '🫙' },
    { id: 'd7', name: 'H-Milch 1,5%',        brand: 'Aldi',          price: '0,89 €', unit: '1 l',     emoji: '🥛' },
    { id: 'd8', name: 'Frischkäse Natur',    brand: 'Philadelphia',  price: '1,49 €', unit: '175 g',   emoji: '🧀' },
  ],
  bread: [
    { id: 'b1', name: 'Vollkornbrot',        brand: 'Mestemacher',   price: '1,49 €', unit: '500 g',   emoji: '🍞' },
    { id: 'b2', name: 'Toastbrot',           brand: 'Harry',         price: '1,29 €', unit: '500 g',   emoji: '🍞' },
    { id: 'b3', name: 'Laugenbrezel',        brand: '',              price: '0,39 €', unit: 'Stück',   emoji: '🥨' },
    { id: 'b4', name: 'Körnerbrötchen 6er',  brand: '',              price: '1,29 €', unit: '6 St.',   emoji: '🫓' },
    { id: 'b5', name: 'Knäckebrot Sesam',    brand: 'Wasa',          price: '1,99 €', unit: '275 g',   emoji: '🍞' },
    { id: 'b6', name: 'Croissant 4er',       brand: '',              price: '1,59 €', unit: '4 St.',   emoji: '🥐' },
    { id: 'b7', name: 'Körnerbrot',          brand: 'Edeka',         price: '2,19 €', unit: '500 g',   emoji: '🍞' },
  ],
  produce: [
    { id: 'p1', name: 'Äpfel Elstar',        brand: '',              price: '1,79 €', unit: '1 kg',    emoji: '🍎' },
    { id: 'p2', name: 'Bananen',             brand: 'Chiquita',      price: '1,49 €', unit: '1 kg',    emoji: '🍌' },
    { id: 'p3', name: 'Rispentomaten',       brand: '',              price: '1,99 €', unit: '500 g',   emoji: '🍅' },
    { id: 'p4', name: 'Kartoffeln',          brand: '',              price: '2,49 €', unit: '2,5 kg',  emoji: '🥔' },
    { id: 'p5', name: 'Brokkoli',            brand: '',              price: '0,99 €', unit: 'Stück',   emoji: '🥦' },
    { id: 'p6', name: 'Salatgurke',          brand: '',              price: '0,69 €', unit: 'Stück',   emoji: '🥒' },
    { id: 'p7', name: 'Zwiebeln',            brand: '',              price: '0,99 €', unit: '1 kg',    emoji: '🧅' },
    { id: 'p8', name: 'Erdbeeren',           brand: '',              price: '2,49 €', unit: '500 g',   emoji: '🍓' },
    { id: 'p9', name: 'Karotten',            brand: '',              price: '0,89 €', unit: '1 kg',    emoji: '🥕' },
  ],
  meat: [
    { id: 'm1', name: 'Hähnchenbrust',       brand: '',              price: '3,99 €', unit: '500 g',   emoji: '🍗' },
    { id: 'm2', name: 'Schweineschnitzel',   brand: '',              price: '4,49 €', unit: '500 g',   emoji: '🥩' },
    { id: 'm3', name: 'Aufschnitt Mix',      brand: 'Dulano',        price: '1,49 €', unit: '200 g',   emoji: '🍖' },
    { id: 'm4', name: 'Rinderhack',          brand: '',              price: '2,99 €', unit: '400 g',   emoji: '🥩' },
    { id: 'm5', name: 'Lachsfilet',          brand: 'Followfish',    price: '3,99 €', unit: '300 g',   emoji: '🐟' },
    { id: 'm6', name: 'Thunfisch in Öl',     brand: 'Saupiquet',     price: '1,29 €', unit: '185 g',   emoji: '🐟' },
  ],
  beverages: [
    { id: 'be1', name: 'Mineralwasser',      brand: 'Volvic',        price: '0,55 €', unit: '1,5 l',   emoji: '💧' },
    { id: 'be2', name: 'Orangensaft',        brand: 'Hohes C',       price: '1,99 €', unit: '1 l',     emoji: '🍊' },
    { id: 'be3', name: 'Cola',               brand: 'Coca-Cola',     price: '1,29 €', unit: '1,5 l',   emoji: '🥤' },
    { id: 'be4', name: 'Pils 6er',           brand: 'Bitburger',     price: '4,99 €', unit: '6×0,5 l', emoji: '🍺' },
    { id: 'be5', name: 'Kaffee gemahlen',    brand: 'Jacobs',        price: '4,49 €', unit: '500 g',   emoji: '☕' },
    { id: 'be6', name: 'Grüner Tee',         brand: 'Teekanne',      price: '2,29 €', unit: '20 Btl.', emoji: '🍵' },
    { id: 'be7', name: 'Apfelschorle',       brand: 'Granini',       price: '1,09 €', unit: '1 l',     emoji: '🍎' },
  ],
  frozen: [
    { id: 'f1', name: 'Pizza Margherita',    brand: 'Dr. Oetker',    price: '2,49 €', unit: '320 g',   emoji: '🍕' },
    { id: 'f2', name: 'Erbsen & Möhren',     brand: 'iglo',          price: '1,29 €', unit: '450 g',   emoji: '🫘' },
    { id: 'f3', name: 'Fischstäbchen',       brand: 'iglo',          price: '2,99 €', unit: '375 g',   emoji: '🐟' },
    { id: 'f4', name: 'Vanilleeis',          brand: 'Langnese',      price: '2,99 €', unit: '750 ml',  emoji: '🍦' },
    { id: 'f5', name: 'Hähnchen-Nuggets',    brand: 'Frosta',        price: '3,49 €', unit: '400 g',   emoji: '🍗' },
    { id: 'f6', name: 'Tiefkühlspinат',      brand: 'iglo',          price: '1,49 €', unit: '500 g',   emoji: '🥬' },
  ],
  snacks: [
    { id: 's1', name: 'Chips Paprika',       brand: "Lay's",         price: '1,49 €', unit: '175 g',   emoji: '🥔' },
    { id: 's2', name: 'Vollmilchschokolade', brand: 'Milka',         price: '0,99 €', unit: '100 g',   emoji: '🍫' },
    { id: 's3', name: 'Goldbären',           brand: 'Haribo',        price: '0,79 €', unit: '200 g',   emoji: '🐻' },
    { id: 's4', name: 'Müsliriegel',         brand: 'Corny',         price: '2,49 €', unit: '6 St.',   emoji: '🍫' },
    { id: 's5', name: 'Salzstangen',         brand: 'Lorenz',        price: '0,99 €', unit: '200 g',   emoji: '🥨' },
    { id: 's6', name: 'Nuss-Mix',            brand: 'Seeberger',     price: '2,99 €', unit: '200 g',   emoji: '🥜' },
  ],
  household: [
    { id: 'h1', name: 'Spülmittel',          brand: 'Fairy',         price: '1,99 €', unit: '500 ml',  emoji: '🧴' },
    { id: 'h2', name: 'Waschmittel flüssig', brand: 'Ariel',         price: '9,99 €', unit: '3 kg',    emoji: '🧺' },
    { id: 'h3', name: 'Küchenrolle',         brand: 'Zewa',          price: '1,79 €', unit: '2 Rll.',  emoji: '🧻' },
    { id: 'h4', name: 'Müllbeutel 20 l',     brand: 'Toppits',       price: '2,49 €', unit: '20 St.',  emoji: '🗑️' },
    { id: 'h5', name: 'WC-Reiniger',         brand: 'Domestos',      price: '1,49 €', unit: '750 ml',  emoji: '🚽' },
    { id: 'h6', name: 'Allzwecktücher',      brand: 'Bounty',        price: '3,49 €', unit: '3 Rll.',  emoji: '🧻' },
  ],
};

// Which categories each supermarket brand carries
const STORE_CATEGORIES = {
  rewe:     ['dairy', 'bread', 'produce', 'meat', 'beverages', 'frozen', 'snacks', 'household'],
  edeka:    ['dairy', 'bread', 'produce', 'meat', 'beverages', 'frozen', 'snacks', 'household'],
  aldi:     ['dairy', 'bread', 'produce', 'beverages', 'frozen', 'snacks', 'household'],
  lidl:     ['dairy', 'bread', 'produce', 'beverages', 'frozen', 'snacks', 'household'],
  kaufland: ['dairy', 'bread', 'produce', 'meat', 'beverages', 'frozen', 'snacks', 'household'],
  penny:    ['dairy', 'bread', 'produce', 'beverages', 'frozen', 'snacks'],
  netto:    ['dairy', 'bread', 'produce', 'beverages', 'frozen', 'snacks'],
};

const BRAND_KEYS = Object.keys(STORE_CATEGORIES);

function getStoreBrand(storeName) {
  const name = storeName.toLowerCase();
  return BRAND_KEYS.find((b) => name.includes(b)) || 'rewe';
}

/** Full inventory for the store inventory panel */
export function getStoreInventory(storeName) {
  const brand = getStoreBrand(storeName);
  const categories = STORE_CATEGORIES[brand];
  return categories.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    products: PRODUCTS[cat],
  }));
}

/**
 * Up to 3 similar products for a given store + category.
 * Different brands show different products (offset rotation).
 */
export function getSimilarProducts(storeName, category) {
  if (!category) return [];
  const brand = getStoreBrand(storeName);
  const storeCategories = STORE_CATEGORIES[brand] || [];
  if (!storeCategories.includes(category)) return [];

  const all = PRODUCTS[category] || [];
  const offset = BRAND_KEYS.indexOf(brand) % all.length;
  const rotated = [...all.slice(offset), ...all.slice(0, offset)];
  return rotated.slice(0, 3);
}

/** Search across all products for a text query */
export function searchProducts(query) {
  const q = query.toLowerCase();
  const results = [];
  for (const [category, products] of Object.entries(PRODUCTS)) {
    for (const p of products) {
      if (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) {
        results.push({ ...p, category });
      }
    }
  }
  return results;
}
