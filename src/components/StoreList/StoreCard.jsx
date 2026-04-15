import { formatDistance } from '../../utils/distance.js';
import { MARKER_COLORS } from '../../constants.js';

const TYPE_LABEL = { hardware: 'Baumarkt', supermarket: 'Supermarkt' };

export default function StoreCard({ store, isOpen, isSelected, onSelect }) {
  const accentColor = MARKER_COLORS[store.type];

  return (
    <article
      className={`store-card ${isSelected ? 'store-card--selected' : ''}`}
      onClick={() => onSelect(store.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(store.id)}
      aria-label={`${store.name}, ${formatDistance(store.distance)}`}
    >
      <div
        className="store-card__accent"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
      <div className="store-card__body">
        <div className="store-card__header">
          <h3 className="store-card__name">{store.name}</h3>
          <span className="store-card__distance">{formatDistance(store.distance)}</span>
        </div>
        <div className="store-card__meta">
          <span className="store-card__type" style={{ color: accentColor }}>
            {TYPE_LABEL[store.type]}
          </span>
          {store.address && (
            <span className="store-card__address">{store.address}</span>
          )}
          {isOpen === true && (
            <span className="store-card__open store-card__open--yes">Geöffnet</span>
          )}
          {isOpen === false && (
            <span className="store-card__open store-card__open--no">Geschlossen</span>
          )}
          {isOpen === null && store.openingHoursRaw === null && (
            <span className="store-card__open store-card__open--unknown">Zeiten unbekannt</span>
          )}
        </div>
      </div>
    </article>
  );
}
