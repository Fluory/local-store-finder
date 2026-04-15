import { useState } from 'react';
import { useGeolocation } from './hooks/useGeolocation.js';
import { useStores } from './hooks/useStores.js';
import { useOpenNow } from './hooks/useOpenNow.js';
import { FILTER_OPTIONS } from './constants.js';
import { lookupBarcode } from './utils/openFoodFacts.js';
import { searchProducts, CATEGORY_LABELS } from './utils/mockInventory.js';

import MapView from './components/MapView/MapView.jsx';
import StoreList from './components/StoreList/StoreList.jsx';
import FilterBar from './components/FilterBar/FilterBar.jsx';
import StatusMessage from './components/StatusMessage/StatusMessage.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import BarcodeScanner from './components/BarcodeScanner/BarcodeScanner.jsx';
import ProductResult from './components/ProductResult/ProductResult.jsx';
import StoreInventory from './components/StoreInventory/StoreInventory.jsx';

import './App.css';

// ── bottom panel view states ──────────────────────────────────────────────────
const VIEW = { STORES: 'stores', INVENTORY: 'inventory', RESULT: 'result' };

export default function App() {
  // ── map/store filters ──
  const [activeFilter, setActiveFilter] = useState(FILTER_OPTIONS.ALL);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  // ── bottom panel ──
  const [bottomView, setBottomView] = useState(VIEW.STORES);

  // ── scanner ──
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null);  // { product, nearestStores }
  const [lookingUp, setLookingUp] = useState(false);

  // ── data hooks ──
  const { position, error: geoError, loading: geoLoading } = useGeolocation();
  const { stores, loading: storesLoading, error: storesError } = useStores(position);
  const openNowMap = useOpenNow(stores);

  // ── derived: filtered store list ──
  const filteredStores = stores.filter((store) => {
    if (activeFilter !== FILTER_OPTIONS.ALL && store.type !== activeFilter) return false;
    if (openNowOnly && openNowMap.get(store.id) !== true) return false;
    return true;
  });

  // ── selected store object ──
  const selectedStore = stores.find((s) => s.id === selectedStoreId) ?? null;

  const isLoading = geoLoading || storesLoading || lookingUp;
  const statusError = geoError || storesError;

  // ── handlers ──────────────────────────────────────────────────────────────

  function handleStoreSelect(id) {
    setSelectedStoreId(id);
    setBottomView(VIEW.INVENTORY);
  }

  function handleInventoryClose() {
    setSelectedStoreId(null);
    setBottomView(VIEW.STORES);
  }

  function handleResultClose() {
    setScanResult(null);
    setBottomView(selectedStoreId ? VIEW.INVENTORY : VIEW.STORES);
  }

  async function handleScan(barcode) {
    setScannerOpen(false);
    setLookingUp(true);
    try {
      const product = await lookupBarcode(barcode);
      const nearestStores = stores.filter((s) => s.type === 'supermarket').slice(0, 3);
      setScanResult({
        product: product ?? { barcode, name: `Code: ${barcode}`, brand: '', category: null, imageUrl: null },
        nearestStores,
      });
      setBottomView(VIEW.RESULT);
    } catch {
      setScanResult({
        product: { barcode, name: `Code: ${barcode}`, brand: '', category: null, imageUrl: null },
        nearestStores: stores.filter((s) => s.type === 'supermarket').slice(0, 3),
      });
      setBottomView(VIEW.RESULT);
    } finally {
      setLookingUp(false);
    }
  }

  function handleTextSearch(query) {
    const matches = searchProducts(query);
    if (matches.length === 0) {
      setScanResult({
        product: { name: `"${query}"`, brand: 'Keine Treffer im lokalen Katalog', category: null, imageUrl: null },
        nearestStores: stores.filter((s) => s.type === 'supermarket').slice(0, 3),
      });
    } else {
      const best = matches[0];
      setScanResult({
        product: {
          name: best.name,
          brand: best.brand,
          category: best.category,
          imageUrl: null,
          quantity: best.unit,
        },
        nearestStores: stores.filter((s) => s.type === 'supermarket').slice(0, 3),
      });
    }
    setBottomView(VIEW.RESULT);
  }

  // ── panel tab labels ──
  const tabs = [
    { key: VIEW.STORES, label: 'Geschäfte' },
    ...(selectedStore ? [{ key: VIEW.INVENTORY, label: 'Inventar' }] : []),
    ...(scanResult ? [{ key: VIEW.RESULT, label: 'Suchergebnis' }] : []),
  ];

  // Clamp bottomView to a valid tab
  const activeView = tabs.some((t) => t.key === bottomView) ? bottomView : VIEW.STORES;

  return (
    <div className="app">
      {/* ── header ── */}
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-header__title">
            <span aria-hidden="true">📍</span> LocalStoreFinder
          </h1>
          {stores.length > 0 && (
            <span className="app-header__count">
              {filteredStores.length} / {stores.length}
            </span>
          )}
        </div>
      </header>

      {/* ── search bar ── */}
      <SearchBar onSearch={handleTextSearch} onScanRequest={() => setScannerOpen(true)} />

      {/* ── filter bar ── */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        openNowOnly={openNowOnly}
        onOpenNowChange={setOpenNowOnly}
      />

      {/* ── status messages ── */}
      {statusError && <StatusMessage type="error" message={statusError} />}
      {lookingUp && <StatusMessage type="loading" message="Artikel wird gesucht…" />}
      {!isLoading && !statusError && geoLoading === false && storesLoading === false && stores.length === 0 && position && (
        <StatusMessage type="empty" message="Keine Geschäfte in der Nähe gefunden." />
      )}
      {!isLoading && !statusError && filteredStores.length === 0 && stores.length > 0 && activeView === VIEW.STORES && (
        <StatusMessage type="empty" message="Keine Geschäfte entsprechen dem gewählten Filter." />
      )}

      {/* ── main: map + bottom panel ── */}
      <main className="app-main">
        <MapView
          position={position}
          stores={filteredStores}
          openNowMap={openNowMap}
          selectedStoreId={selectedStoreId}
          onStoreSelect={handleStoreSelect}
        />

        <div className="bottom-panel">
          {/* tab bar */}
          {tabs.length > 1 && (
            <div className="bottom-panel__tabs" role="tablist">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={activeView === t.key}
                  className={`bottom-tab ${activeView === t.key ? 'bottom-tab--active' : ''}`}
                  onClick={() => setBottomView(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* tab content */}
          <div className="bottom-panel__content">
            {activeView === VIEW.STORES && (
              <StoreList
                stores={filteredStores}
                openNowMap={openNowMap}
                selectedStoreId={selectedStoreId}
                onStoreSelect={handleStoreSelect}
              />
            )}
            {activeView === VIEW.INVENTORY && selectedStore && (
              <StoreInventory store={selectedStore} onClose={handleInventoryClose} />
            )}
            {activeView === VIEW.RESULT && scanResult && (
              <ProductResult
                result={scanResult}
                onClose={handleResultClose}
                onStoreSelect={handleStoreSelect}
              />
            )}
          </div>
        </div>
      </main>

      {/* ── barcode scanner modal ── */}
      {scannerOpen && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setScannerOpen(false)}
        />
      )}
    </div>
  );
}
