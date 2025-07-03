import { useState, useCallback, useRef } from "react";

export function useMap<K, V>(
  initialEntries: readonly (readonly [K, V])[] = []
) {
  const mapRef = useRef(new Map(initialEntries));
  const [_, forceUpdate] = useState(0);

  const set = useCallback((key: K, value: V) => {
    if (mapRef.current.get(key) !== value) {
      const newMap = new Map(mapRef.current);
      newMap.set(key, value);
      mapRef.current = newMap;
      forceUpdate(n => n + 1);
    }
  }, []);

  const remove = useCallback((key: K) => {
    if (mapRef.current.has(key)) {
      const newMap = new Map(mapRef.current);
      newMap.delete(key);
      mapRef.current = newMap;
      forceUpdate(n => n + 1);
    }
  }, []);

  const clear = useCallback(() => {
    if (mapRef.current.size > 0) {
      mapRef.current = new Map();
      forceUpdate(n => n + 1);
    }
  }, []);

  return {
    size: mapRef.current.size,
    get: useCallback((key: K) => mapRef.current.get(key), []),
    has: useCallback((key: K) => mapRef.current.has(key), []),
    set,
    delete: remove,
    clear,
    entries: Array.from(mapRef.current.entries()),
    keys: Array.from(mapRef.current.keys()),
    values: Array.from(mapRef.current.values()),
  };
}