import { useState, useCallback } from "react";

export function useCounter(
  initialValue: number = 0,
  options: { min?: number; max?: number; step?: number } = {}
) {
  const { min = -Infinity, max = Infinity, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((c) => Math.min(max, c + step));
  }, [max, step]);

  const decrement = useCallback(() => {
    setCount((c) => Math.max(min, c - step));
  }, [min, step]);

  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  const set = useCallback(
    (value: number) => {
      setCount(Math.max(min, Math.min(max, value)));
    },
    [min, max]
  );

  return {
    value: count,
    increment,
    decrement,
    reset,
    set,
  };
}
