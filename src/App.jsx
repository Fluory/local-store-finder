import { useState } from 'react';
import { useGeolocation } from './hooks/useGeolocation.js';
import { useStores } from './hooks/useStores.js';
import { useOpenNow } from './hooks/useOpenNow.js';
import { FILTER_OPTIONS } from './constants.js';
import MapView from './components/MapView/MapView.jsx';
import StoreList from './components/StoreList/StoreList.jsx';
import FilterBar from './components/FilterBar/FilterBar.jsx';
import StatusMessage from './components/StatusMessage/StatusMessage.jsx';
import './App.css';

export default function App() {
  const [activeFilter, setActiveFilter] = useState(FILTER_OPTIONS.ALL);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const { position, error: geoError, loading: geoLoading } = useGeolocation();
  const { stores, loading: storesLoading, error: storesError } = useStores(position);
  const openNowMap = useOpenNow(stores);

  const filteredStores = stores.filter((store) => {
    if (activeFilter !== FILTER_OPTIONS.ALL && store.type !== activeFilter) return false;
    if (openNowOnly && openNowMap.get(store.id) !== true) return false;
    return true;
  });

  const isLoading = geoLoading || storesLoading;
  const error = geoError || storesError;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-header__title">
            <span className="app-header__icon" aria-hidden="true">📍</span>
            LocalStoreFinder
          </h1>
          {stores.length > 0 && (
            <span className="app-header__count">
              {filteredStores.length} / {stores.length} Geschäfte
            </span>
          )}
        </div>
      </header>

      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        openNowOnly={openNowOnly}
        onOpenNowChange={setOpenNowOnly}
      />

      {error && <StatusMessage type="error" message={error} />}
      {isLoading && !error && (
        <StatusMessage
          type="loading"
          message={geoLoading ? 'Standort wird ermittelt…' : 'Geschäfte werden geladen…'}
        />
      )}
      {!isLoading && !error && stores.length === 0 && position && (
        <StatusMessage type="empty" message="Keine Geschäfte in Ihrer Nähe gefunden." />
      )}
      {!isLoading && !error && filteredStores.length === 0 && stores.length > 0 && (
        <StatusMessage type="empty" message="Keine Geschäfte entsprechen dem gewählten Filter." />
      )}

      <main className="app-main">
        <MapView
          position={position}
          stores={filteredStores}
          openNowMap={openNowMap}
          selectedStoreId={selectedStoreId}
          onStoreSelect={setSelectedStoreId}
        />
        <StoreList
          stores={filteredStores}
          openNowMap={openNowMap}
          selectedStoreId={selectedStoreId}
          onStoreSelect={setSelectedStoreId}
        />
      </main>
    </div>
  );
}
