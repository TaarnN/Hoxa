import { useState, useCallback } from "react";

export function useNumber(initialValue: number = 0) {
  const [value, setValue] = useState(initialValue);

  const increment = useCallback((amount: number = 1) => {
    setValue((v) => v + amount);
  }, []);

  const decrement = useCallback((amount: number = 1) => {
    setValue((v) => v - amount);
  }, []);

  const set = useCallback((newValue: number) => {
    setValue(newValue);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    increment,
    decrement,
    set,
    reset,
  };
}
