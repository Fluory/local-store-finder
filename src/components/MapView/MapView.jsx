import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Circle } from 'react-leaflet';
import StoreMarker from './StoreMarker.jsx';
import './MapView.css';

function MapController({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView([position.lat, position.lon], 13);
  }, [position, map]);
  return null;
}

export default function MapView({ position, stores, openNowMap, selectedStoreId, onStoreSelect }) {
  const defaultCenter = [51.1657, 10.4515]; // Germany center

  return (
    <div className="map-container">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        className="leaflet-map"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        {position && <MapController position={position} />}
        {position && (
          <Circle
            center={[position.lat, position.lon]}
            radius={80}
            pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.9, weight: 2 }}
          />
        )}
        {stores.map((store) => (
          <StoreMarker
            key={store.id}
            store={store}
            isOpen={openNowMap.get(store.id) ?? null}
            isSelected={store.id === selectedStoreId}
            onSelect={onStoreSelect}
          />
        ))}
      </MapContainer>
    </div>
  );
}
