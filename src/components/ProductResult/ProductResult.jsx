import { useEffect, useState } from 'react';
import { CATEGORY_LABELS, getSimilarProducts } from '../../utils/mockInventory.js';
import { searchComparables } from '../../utils/openFoodFacts.js';
import { formatDistance } from '../../utils/distance.js';
import { MARKER_COLORS } from '../../constants.js';
import './ProductResult.css';

// ── nearby store card (mock inventory) ───────────────────────────────────────
function StoreSimilarCard({ store, rank, category }) {
  const similar = getSimilarProducts(store.name, category);
  const color = MARKER_COLORS[store.type] ?? '#64748b';

  return (
    <div className="pr-store-card">
      <div className="pr-store-card__header">
        <span className="pr-store-card__rank">#{rank}</span>
        <div className="pr-store-card__dot" style={{ background: color }} />
        <span className="pr-store-card__name">{store.name}</span>
        <span className="pr-store-card__dist">{formatDistance(store.distance)}</span>
      </div>
      {similar.length > 0 ? (
        <ul className="pr-store-card__products">
          {similar.map((p) => (
            <li key={p.id} className="pr-store-card__product">
              <span className="pr-store-card__emoji">{p.emoji}</span>
              <span className="pr-store-card__pname">{p.name}</span>
              <span className="pr-store-card__brand">{p.brand}</span>
              <span className="pr-store-card__price">{p.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pr-store-card__none">Kategorie nicht verfügbar</p>
      )}
    </div>
  );
}

// ── single comparable product card (from Open Food Facts) ────────────────────
function ComparableCard({ item }) {
  return (
    <div className="comp-card">
      <div className="comp-card__img-wrap">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="comp-card__img" loading="lazy" />
        ) : (
          <div className="comp-card__img-placeholder">🛒</div>
        )}
      </div>
      <div className="comp-card__body">
        <p className="comp-card__name">{item.name}</p>
        {item.brand && <p className="comp-card__brand">{item.brand}</p>}
        {item.quantity && <p className="comp-card__qty">{item.quantity}</p>}
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function ProductResult({ result, onClose, onStoreSelect }) {
  const [comparables, setComparables] = useState([]);
  const [loadingComparables, setLoadingComparables] = useState(false);
  const [comparablesError, setComparablesError] = useState(null);

  useEffect(() => {
    if (!result?.product) return;
    let cancelled = false;

    setComparables([]);
    setComparablesError(null);
    setLoadingComparables(true);

    searchComparables(result.product)
      .then((items) => {
        if (cancelled) return;
        setComparables(items);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('searchComparables failed:', err);
        setComparablesError('Vergleich konnte nicht geladen werden.');
      })
      .finally(() => { if (!cancelled) setLoadingComparables(false); });

    return () => { cancelled = true; };
  }, [result]);

  if (!result) return null;
  const { product, nearestStores } = result;

  return (
    <div className="product-result">

      {/* ── scanned product header ── */}
      <div className="product-result__product">
        {product.imageUrl && (
          <img src={product.imageUrl} alt={product.name} className="product-result__img" loading="lazy" />
        )}
        <div className="product-result__info">
          <h3 className="product-result__name">{product.name}</h3>
          {product.brand && (
            <p className="product-result__brand">
              {product.brand}{product.quantity ? ` · ${product.quantity}` : ''}
            </p>
          )}
          {product.category
            ? <span className="product-result__cat-badge">{CATEGORY_LABELS[product.category] ?? product.category}</span>
            : <span className="product-result__cat-badge product-result__cat-badge--unknown">Kategorie unbekannt</span>
          }
        </div>
        <button className="product-result__close" onClick={onClose} aria-label="Schließen">✕</button>
      </div>

      {/* ── comparable products from the internet ── */}
      <div className="product-result__section">
        <h4 className="product-result__subtitle">
          Vergleichbare Artikel aus dem Internet
          {loadingComparables && <span className="product-result__spinner" />}
        </h4>

        {!loadingComparables && comparablesError && (
          <p className="product-result__empty-sm product-result__empty-sm--error">{comparablesError}</p>
        )}
        {!loadingComparables && !comparablesError && comparables.length === 0 && (
          <p className="product-result__empty-sm">Keine Vergleichsartikel gefunden.</p>
        )}

        {comparables.length > 0 && (
          <div className="comp-grid">
            {comparables.map((item) => (
              <ComparableCard key={item.code || item.name} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* ── nearest stores ── */}
      <div className="product-result__section">
        <h4 className="product-result__subtitle">3 nächste Supermärkte in der Nähe</h4>
        {nearestStores.length === 0 && (
          <p className="product-result__empty-sm">Keine Supermärkte in der Nähe gefunden.</p>
        )}
        {nearestStores.map((store, i) => (
          <div key={store.id} onClick={() => onStoreSelect(store.id)} style={{ cursor: 'pointer' }}>
            <StoreSimilarCard store={store} rank={i + 1} category={product.category} />
          </div>
        ))}
      </div>

    </div>
  );
}
