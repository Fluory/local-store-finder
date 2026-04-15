import { useState } from 'react';
import './SearchBar.css';

// QR-code icon (SVG inline, no dependency)
function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
      <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
      <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
      <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
      <line x1="12" y1="7" x2="12" y2="17"/>
    </svg>
  );
}

export default function SearchBar({ onSearch, onScanRequest }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (q) onSearch(q);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Artikelsuche">
      <input
        className="search-bar__input"
        type="search"
        placeholder="Artikel suchen…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Artikel eingeben"
      />
      <button
        type="button"
        className="search-bar__scan-btn"
        onClick={onScanRequest}
        aria-label="Barcode oder QR-Code scannen"
      >
        <ScanIcon />
        <span>Scannen</span>
      </button>
    </form>
  );
}
