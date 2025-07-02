import { useState, useCallback } from "react";

export function useTimeTravelState<T>(initial: T) {
  const [history, setHistory] = useState<T[]>([initial]);
  const [index, setIndex] = useState(0);

  const state = history[index];

  const setState = useCallback((newState: T) => {
    setHistory((h) => {
      const hist = h.slice(0, index + 1);
      return [...hist, newState];
    });
    setIndex((i) => i + 1);
  }, [index]);

  const rewind = useCallback((step: number) => {
    setIndex((i) => Math.max(0, i - step));
  }, []);

  const forward = useCallback((step: number) => {
    setIndex((i) => Math.min(history.length - 1, i + step));
  }, [history.length]);

  return { state, setState, history, index, rewind, forward };
}
