import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MARKER_COLORS } from '../../constants.js';
import { formatDistance } from '../../utils/distance.js';

function createColoredIcon(color, isSelected) {
  const size = isSelected ? 22 : 14;
  const border = isSelected ? 3 : 2;
  return L.divIcon({
    html: `<div style="
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${color};
      border:${border}px solid white;
      box-shadow:0 1px 5px rgba(0,0,0,.45);
      transition:width .15s,height .15s;
    "></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

const TYPE_LABEL = { hardware: 'Baumarkt', supermarket: 'Supermarkt' };

export default function StoreMarker({ store, isOpen, isSelected, onSelect }) {
  const color = MARKER_COLORS[store.type];
  const icon = createColoredIcon(color, isSelected);

  return (
    <Marker
      position={[store.lat, store.lon]}
      icon={icon}
      eventHandlers={{ click: () => onSelect(store.id) }}
    >
      <Popup>
        <div style={{ minWidth: '140px', lineHeight: '1.5' }}>
          <strong style={{ display: 'block', marginBottom: '2px' }}>{store.name}</strong>
          <span style={{ fontSize: '0.75rem', color: color, fontWeight: 600 }}>
            {TYPE_LABEL[store.type]}
          </span>
          {store.address && (
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
              {store.address}
            </span>
          )}
          {store.distance != null && (
            <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '2px' }}>
              {formatDistance(store.distance)}
            </span>
          )}
          {isOpen === true && (
            <span style={{ display: 'block', color: '#16a34a', fontWeight: 600, fontSize: '0.75rem', marginTop: '4px' }}>
              Geöffnet
            </span>
          )}
          {isOpen === false && (
            <span style={{ display: 'block', color: '#dc2626', fontWeight: 600, fontSize: '0.75rem', marginTop: '4px' }}>
              Geschlossen
            </span>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
