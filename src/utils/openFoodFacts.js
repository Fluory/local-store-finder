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
