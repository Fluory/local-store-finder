import { useMemo } from 'react';
import { isOpenNow } from '../utils/openingHours.js';

export function useOpenNow(stores) {
  return useMemo(() => {
    const map = new Map();
    for (const store of stores) {
      map.set(store.id, isOpenNow(store.openingHoursRaw, store.lat, store.lon));
    }
    return map;
  }, [stores]);
}
