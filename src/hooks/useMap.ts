import { useState, useCallback } from "react";

export function useMap<K, V>(
  initialEntries: readonly (readonly [K, V])[] = []
) {
  const [map, setMap] = useState<Map<K, V>>(new Map(initialEntries));

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const remove = useCallback((key: K) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const clear = useCallback(() => setMap(new Map()), []);

  return {
    size: map.size,
    get: useCallback((key: K) => map.get(key), [map]),
    has: useCallback((key: K) => map.has(key), [map]),
    set,
    delete: remove,
    clear,
    entries: Array.from(map.entries()),
    keys: Array.from(map.keys()),
    values: Array.from(map.values()),
  };
}
