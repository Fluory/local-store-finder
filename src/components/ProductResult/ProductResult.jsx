import { CATEGORY_LABELS, getSimilarProducts } from '../../utils/mockInventory.js';
import { formatDistance } from '../../utils/distance.js';
import { MARKER_COLORS } from '../../constants.js';
import './ProductResult.css';

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

export default function ProductResult({ result, onClose, onStoreSelect }) {
  if (!result) return null;
  const { product, nearestStores } = result;

  return (
    <div className="product-result">
      {/* ── scanned product info ── */}
      <div className="product-result__product">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-result__img"
            loading="lazy"
          />
        )}
        <div className="product-result__info">
          <h3 className="product-result__name">{product.name}</h3>
          {product.brand && <p className="product-result__brand">{product.brand}{product.quantity ? ` · ${product.quantity}` : ''}</p>}
          {product.category && (
            <span className="product-result__cat-badge">
              {CATEGORY_LABELS[product.category] ?? product.category}
            </span>
          )}
          {!product.category && (
            <span className="product-result__cat-badge product-result__cat-badge--unknown">
              Kategorie unbekannt
            </span>
          )}
        </div>
        <button className="product-result__close" onClick={onClose} aria-label="Ergebnis schließen">✕</button>
      </div>

      {/* ── nearest stores ── */}
      <h4 className="product-result__subtitle">
        3 nächste Supermärkte mit ähnlichen Artikeln
      </h4>

      <div className="product-result__stores">
        {nearestStores.length === 0 && (
          <p className="product-result__empty">Keine Supermärkte in der Nähe gefunden.</p>
        )}
        {nearestStores.map((store, i) => (
          <div
            key={store.id}
            onClick={() => onStoreSelect(store.id)}
            style={{ cursor: 'pointer' }}
          >
            <StoreSimilarCard store={store} rank={i + 1} category={product.category} />
          </div>
        ))}
      </div>
    </div>
  );
}
