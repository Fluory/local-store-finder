import opening_hours from 'opening_hours';

/**
 * Parse an OSM opening_hours string and determine if the store is open right now.
 * @returns {boolean|null} true=open, false=closed, null=unknown (no data or parse error)
 */
export function isOpenNow(rawValue, lat, lon) {
  if (!rawValue) return null;
  try {
    const oh = new opening_hours(rawValue, {
      lat,
      lon,
      address: { country_code: 'de' },
    });
    return oh.getState();
  } catch {
    return null;
  }
}
