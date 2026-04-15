import { FILTER_OPTIONS } from '../../constants.js';
import './FilterBar.css';

const TYPE_FILTERS = [
  { value: FILTER_OPTIONS.ALL, label: 'Alle' },
  { value: FILTER_OPTIONS.SUPERMARKET, label: 'Supermärkte' },
  { value: FILTER_OPTIONS.HARDWARE, label: 'Baumärkte' },
];

export default function FilterBar({ activeFilter, onFilterChange, openNowOnly, onOpenNowChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__type-group" role="group" aria-label="Geschäftstyp filtern">
        {TYPE_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            className={`filter-btn ${activeFilter === value ? 'filter-btn--active' : ''}`}
            onClick={() => onFilterChange(value)}
            aria-pressed={activeFilter === value}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="filter-bar__open-now">
        <input
          type="checkbox"
          checked={openNowOnly}
          onChange={(e) => onOpenNowChange(e.target.checked)}
        />
        <span>Jetzt geöffnet</span>
      </label>
    </div>
  );
}
