import { useState, useCallback } from "react";

export function useArray<T>(initialValue: T[] = []) {
  const [array, setArray] = useState<T[]>(initialValue);

  const push = useCallback((item: T) => {
    setArray((prev) => [...prev, item]);
  }, []);

  const pop = useCallback(() => {
    setArray((prev) => {
      const newArray = [...prev];
      newArray.pop();
      return newArray;
    });
  }, []);

  const shift = useCallback(() => {
    setArray((prev) => {
      const newArray = [...prev];
      newArray.shift();
      return newArray;
    });
  }, []);

  const unshift = useCallback((item: T) => {
    setArray((prev) => [item, ...prev]);
  }, []);

  const update = useCallback((index: number, item: T) => {
    setArray((prev) => {
      const newArray = [...prev];
      newArray[index] = item;
      return newArray;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const filter = useCallback((predicate: (value: T) => boolean) => {
    setArray((prev) => prev.filter(predicate));
  }, []);

  const clear = useCallback(() => setArray([]), []);

  return {
    value: array,
    length: array.length,
    push,
    pop,
    shift,
    unshift,
    update,
    remove,
    filter,
    clear,
    set: setArray,
  };
}
