import {
  OVERPASS_URL,
  OVERPASS_URL_FALLBACK,
  RADIUS_METERS,
  HARDWARE_BRANDS,
  SUPERMARKET_BRANDS,
} from '../constants.js';

function buildQuery(lat, lon) {
  return `
[out:json][timeout:60];
(
  node["shop"="doityourself"](around:${RADIUS_METERS},${lat},${lon});
  way["shop"="doityourself"](around:${RADIUS_METERS},${lat},${lon});
  node["shop"="supermarket"](around:${RADIUS_METERS},${lat},${lon});
  way["shop"="supermarket"](around:${RADIUS_METERS},${lat},${lon});
);
out center tags;
`.trim();
}

function getCoords(element) {
  if (element.type === 'node') {
    return { lat: element.lat, lon: element.lon };
  }
  if (element.type === 'way' && element.center) {
    return { lat: element.center.lat, lon: element.center.lon };
  }
  return null;
}

function classifyStore(tags) {
  const nameRaw = (tags.name || tags.brand || '').toLowerCase();
  for (const brand of HARDWARE_BRANDS) {
    if (nameRaw.includes(brand)) return 'hardware';
  }
  for (const brand of SUPERMARKET_BRANDS) {
    if (nameRaw.includes(brand)) return 'supermarket';
  }
  return null;
}

function formatAddress(tags) {
  const street =
    tags['addr:street'] && tags['addr:housenumber']
      ? `${tags['addr:street']} ${tags['addr:housenumber']}`
      : tags['addr:street'] || null;
  const city = tags['addr:city'] || null;
  return [street, city].filter(Boolean).join(', ') || null;
}

async function postQuery(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function fetchStores(lat, lon) {
  const query = buildQuery(lat, lon);
  const body = new URLSearchParams({ data: query });

  let data;
  try {
    data = await postQuery(OVERPASS_URL, body);
  } catch {
    // Retry with fallback endpoint
    data = await postQuery(OVERPASS_URL_FALLBACK, body);
  }

  const stores = [];
  for (const element of data.elements || []) {
    const tags = element.tags || {};
    const type = classifyStore(tags);
    if (!type) continue;

    const coords = getCoords(element);
    if (!coords) continue;

    stores.push({
      id: `${element.type}-${element.id}`,
      name: tags.name || tags.brand || 'Unbekannt',
      type,
      lat: coords.lat,
      lon: coords.lon,
      address: formatAddress(tags),
      openingHoursRaw: tags.opening_hours || null,
      phone: tags.phone || tags['contact:phone'] || null,
      website: tags.website || tags['contact:website'] || null,
      distance: null,
    });
  }

  return stores;
}
