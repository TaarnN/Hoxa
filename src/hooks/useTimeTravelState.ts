// useTimeTravelState.ts
import { useState, useCallback } from "react";

export function useTimeTravelState<T>(initial: T) {
  const [history, setHistory] = useState<T[]>([initial]);
  const [index, setIndex] = useState(0);

  const state = history[index];

  const setState = useCallback(
    (newState: T) => {
      const hist = history.slice(0, index + 1);
      setHistory([...hist, newState]);
      setIndex(hist.length);
    },
    [history, index]
  );

  const rewind = useCallback((step: number) => {
    setIndex((i) => Math.max(0, i - step));
  }, []);

  const forward = useCallback(
    (step: number) => {
      setIndex((i) => Math.min(history.length - 1, i + step));
    },
    [history]
  );

  return { state, setState, history, index, rewind, forward };
}
