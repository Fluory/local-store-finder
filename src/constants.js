export const RADIUS_METERS = 100000;

export const STORE_TYPES = {
  HARDWARE: 'hardware',
  SUPERMARKET: 'supermarket',
};

export const FILTER_OPTIONS = {
  ALL: 'all',
  SUPERMARKET: 'supermarket',
  HARDWARE: 'hardware',
};

export const HARDWARE_BRANDS = ['obi', 'bauhaus', 'hornbach', 'toom', 'hellweg'];
export const SUPERMARKET_BRANDS = ['rewe', 'edeka', 'aldi', 'lidl', 'kaufland', 'penny', 'netto'];

export const MARKER_COLORS = {
  hardware: '#f97316',    // orange
  supermarket: '#3b82f6', // blue
};

export const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
export const OVERPASS_URL_FALLBACK = 'https://overpass.kumi.systems/api/interpreter';
