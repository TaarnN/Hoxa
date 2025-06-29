import { useState, useCallback } from "react";

export function useSet<T>(initialValues: readonly T[] = []) {
  const [set, setSet] = useState<Set<T>>(new Set(initialValues));

  const add = useCallback((value: T) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      newSet.add(value);
      return newSet;
    });
  }, []);

  const remove = useCallback((value: T) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(value);
      return newSet;
    });
  }, []);

  const clear = useCallback(() => setSet(new Set()), []);

  return {
    size: set.size,
    has: useCallback((value: T) => set.has(value), [set]),
    add,
    delete: remove,
    clear,
    values: Array.from(set.values()),
  };
}
