import { useState, useCallback, useRef } from "react";

export function useSet<T>(initialValues: readonly T[] = []) {
  const setRef = useRef(new Set(initialValues));
  const [_, forceUpdate] = useState(0);

  const add = useCallback((value: T) => {
    if (!setRef.current.has(value)) {
      const newSet = new Set(setRef.current);
      newSet.add(value);
      setRef.current = newSet;
      forceUpdate(n => n + 1);
    }
  }, []);

  const remove = useCallback((value: T) => {
    if (setRef.current.has(value)) {
      const newSet = new Set(setRef.current);
      newSet.delete(value);
      setRef.current = newSet;
      forceUpdate(n => n + 1);
    }
  }, []);

  const clear = useCallback(() => {
    if (setRef.current.size > 0) {
      setRef.current = new Set();
      forceUpdate(n => n + 1);
    }
  }, []);

  return {
    size: setRef.current.size,
    has: useCallback((value: T) => setRef.current.has(value), []),
    add,
    delete: remove,
    clear,
    values: Array.from(setRef.current.values()),
  };
}