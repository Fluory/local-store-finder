const BASE_URL = 'https://world.openfoodfacts.org/api/v2/product';
const FIELDS = 'product_name,brands,categories,pnns_groups_1,image_front_small_url,quantity';

// Maps OpenFoodFacts pnns_groups_1 → our internal category keys
const PNNS_MAP = {
  'Beverages': 'beverages',
  'Sweetened beverages': 'beverages',
  'Unsweetened beverages': 'beverages',
  'Waters and flavored waters': 'beverages',
  'Fruit juices': 'beverages',
  'Dairy': 'dairy',
  'Milk and yogurt': 'dairy',
  'Cheese': 'dairy',
  'Cereals and potatoes': 'bread',
  'Bread': 'bread',
  'Fish Meat Eggs': 'meat',
  'Processed meat': 'meat',
  'Fruits and vegetables': 'produce',
  'Sugary snacks': 'snacks',
  'Salty snacks': 'snacks',
  'Chocolate products': 'snacks',
  'Biscuits and cakes': 'snacks',
  'Fats': 'dairy',
};

// Fallback: parse raw categories string
function inferCategory(categoriesStr) {
  if (!categoriesStr) return null;
  const s = categoriesStr.toLowerCase();
  if (s.includes('milch') || s.includes('milk') || s.includes('dairy') || s.includes('käse') || s.includes('cheese') || s.includes('joghurt') || s.includes('yogurt') || s.includes('butter') || s.includes('sahne') || s.includes('cream')) return 'dairy';
  if (s.includes('brot') || s.includes('bread') || s.includes('bäckerei') || s.includes('bakery') || s.includes('toast') || s.includes('brötchen') || s.includes('getreide') || s.includes('cereal')) return 'bread';
  if (s.includes('obst') || s.includes('gemüse') || s.includes('fruit') || s.includes('vegetable') || s.includes('apfel') || s.includes('banane') || s.includes('tomaten')) return 'produce';
  if (s.includes('fleisch') || s.includes('meat') || s.includes('wurst') || s.includes('fisch') || s.includes('fish') || s.includes('geflügel') || s.includes('poultry')) return 'meat';
  if (s.includes('getränk') || s.includes('beverage') || s.includes('drink') || s.includes('wasser') || s.includes('water') || s.includes('saft') || s.includes('juice') || s.includes('bier') || s.includes('beer') || s.includes('kaffee') || s.includes('coffee') || s.includes('tee') || s.includes('tea')) return 'beverages';
  if (s.includes('tiefkühl') || s.includes('frozen')) return 'frozen';
  if (s.includes('schokolade') || s.includes('chocolate') || s.includes('snack') || s.includes('chips') || s.includes('süß') || s.includes('candy') || s.includes('sweet') || s.includes('keks') || s.includes('cookie')) return 'snacks';
  if (s.includes('haushalt') || s.includes('household') || s.includes('reinig') || s.includes('clean') || s.includes('wasch') || s.includes('wash')) return 'household';
  return null;
}

// Known German store-brand prefixes to strip when building a search term.
// e.g. "Lidl Toastbrot" → "Toastbrot", "ja! Butter" → "Butter"
const STORE_PREFIXES = [
  'lidl', 'aldi', 'rewe', 'edeka', 'kaufland', 'penny', 'netto',
  'ja!', 'ja ', 'gut & günstig', 'k-classic', 'k classic',
  'pilos', 'milbona', 'alesto', 'milsani', 'brooklea', 'freeway',
  'favorit', 'cien', 'w5', 'simply', 'belbake',
];

function extractSearchTerm(name) {
  let term = name.trim();
  const lower = term.toLowerCase();
  for (const prefix of STORE_PREFIXES) {
    if (lower.startsWith(prefix)) {
      term = term.slice(prefix.length).trim();
      break;
    }
  }
  // Remove trailing/leading punctuation
  return term.replace(/^[-–,]+|[-–,]+$/g, '').trim();
}

/**
 * Search Open Food Facts for real comparable products sold in Germany.
 * Strips store-brand prefixes so "Lidl Toast" → searches "Toast".
 */
export async function searchComparables(product, maxResults = 9) {
  const term = extractSearchTerm(product.name);
  if (!term || term.startsWith('Code:') || term.length < 2) return [];

  const params = new URLSearchParams({
    search_terms: term,
    countries_tags: 'en:germany',
    action: 'process',
    json: '1',
    page_size: String(maxResults),
    sort_by: 'popularity_key',
    fields: 'code,product_name,brands,image_front_small_url,quantity',
  });

  const res = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`
  );
  if (!res.ok) throw new Error(`OFacts search: HTTP ${res.status}`);
  const { products = [] } = await res.json();

  return products
    .filter((p) => p.product_name && p.product_name.trim().length > 0)
    .map((p) => ({
      code: p.code || '',
      name: p.product_name.trim(),
      brand: p.brands ? p.brands.split(',')[0].trim() : '',
      quantity: p.quantity || '',
      imageUrl: p.image_front_small_url || null,
    }));
}

export async function lookupBarcode(barcode) {
  const res = await fetch(`${BASE_URL}/${barcode}?fields=${FIELDS}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  if (data.status !== 1 || !data.product) return null;

  const p = data.product;
  const category = PNNS_MAP[p.pnns_groups_1] || inferCategory(p.categories) || null;

  return {
    barcode,
    name: p.product_name || 'Unbekanntes Produkt',
    brand: p.brands || '',
    quantity: p.quantity || '',
    category,
    imageUrl: p.image_front_small_url || null,
  };
}
