import { useState, useEffect } from 'react';
import { fetchStores } from '../utils/overpass.js';
import { haversineDistance } from '../utils/distance.js';

export function useStores(position) {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!position) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const raw = await fetchStores(position.lat, position.lon);
        if (cancelled) return;

        const withDistance = raw
          .map((store) => ({
            ...store,
            distance: haversineDistance(position.lat, position.lon, store.lat, store.lon),
          }))
          .sort((a, b) => a.distance - b.distance);

        setStores(withDistance);
      } catch {
        if (!cancelled) {
          setError('Fehler beim Laden der Geschäfte. Bitte versuchen Sie es später erneut.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [position]);

  return { stores, loading, error };
}
