import React from 'react';
import ReactDOM from 'react-dom/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import App from './App.jsx';
import Legal, { LEGAL_PATHS } from './components/Legal/Legal.jsx';

// Fix Leaflet's default icon paths broken by Vite's asset hashing.
// We use L.divIcon for store markers, but this fix is needed for
// any Popup close button or other internal Leaflet icon usage.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Impressum and Datenschutz are plain pages: they must open without the app
// asking for the location or contacting map and data services.
const path = window.location.pathname.replace(/\/+$/, '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {LEGAL_PATHS.includes(path) ? <Legal path={path} /> : <App />}
  </React.StrictMode>
);
