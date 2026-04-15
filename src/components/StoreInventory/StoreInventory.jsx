import { useState } from 'react';
import { getStoreInventory } from '../../utils/mockInventory.js';
import { MARKER_COLORS } from '../../constants.js';
import './StoreInventory.css';

export default function StoreInventory({ store, onClose }) {
  const [activeCat, setActiveCat] = useState(null);

  if (!store) return null;

  const inventory = getStoreInventory(store.name);
  const currentCat = activeCat ?? inventory[0]?.category;
  const currentSection = inventory.find((s) => s.category === currentCat);
  const accentColor = MARKER_COLORS[store.type] ?? '#64748b';

  return (
    <div className="store-inventory">
      {/* ── store header ── */}
      <div className="store-inventory__header" style={{ borderLeftColor: accentColor }}>
        <div className="store-inventory__meta">
          <h3 className="store-inventory__name">{store.name}</h3>
          {store.address && <p className="store-inventory__address">{store.address}</p>}
        </div>
        <button className="store-inventory__close" onClick={onClose} aria-label="Inventar schließen">✕</button>
      </div>

      {/* ── category tabs ── */}
      <div className="store-inventory__tabs" role="tablist" aria-label="Produktkategorien">
        {inventory.map(({ category, label }) => (
          <button
            key={category}
            role="tab"
            aria-selected={currentCat === category}
            className={`si-tab ${currentCat === category ? 'si-tab--active' : ''}`}
            onClick={() => setActiveCat(category)}
            style={currentCat === category ? { borderBottomColor: accentColor, color: accentColor } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── product list ── */}
      <div className="store-inventory__products" role="tabpanel">
        {currentSection?.products.map((p) => (
          <div key={p.id} className="si-product">
            <span className="si-product__emoji">{p.emoji}</span>
            <div className="si-product__info">
              <span className="si-product__name">{p.name}</span>
              {p.brand && <span className="si-product__brand">{p.brand}</span>}
            </div>
            <div className="si-product__right">
              <span className="si-product__unit">{p.unit}</span>
              <span className="si-product__price">{p.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
