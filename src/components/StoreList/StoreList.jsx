import StoreCard from './StoreCard.jsx';
import './StoreList.css';

export default function StoreList({ stores, openNowMap, selectedStoreId, onStoreSelect }) {
  return (
    <section className="store-list" aria-label="Gefundene Geschäfte">
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          store={store}
          isOpen={openNowMap.get(store.id) ?? null}
          isSelected={store.id === selectedStoreId}
          onSelect={onStoreSelect}
        />
      ))}
    </section>
  );
}
