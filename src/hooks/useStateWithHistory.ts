import { useState, useCallback } from "react";

export function useStateWithHistory<T>(
  initialValue: T,
  maxHistory: number = 100
): [
  T,
  (value: T | ((prev: T) => T)) => void,
  {
    history: T[];
    pointer: number;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
  }
] {
  const [value, setValue] = useState<T>(initialValue);
  const [history, setHistory] = useState<T[]>([initialValue]);
  const [pointer, setPointer] = useState(0);

  const set = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(value)
          : newValue;

      setValue(resolvedValue);

      setHistory((prev) => {
        const newHistory = [...prev.slice(0, pointer + 1), resolvedValue];
        return newHistory.slice(-maxHistory);
      });

      setPointer((prev) => Math.min(prev + 1, maxHistory - 1));
    },
    [value, pointer, maxHistory]
  );

  const back = useCallback(() => {
    if (pointer > 0) {
      const prevValue = history[pointer - 1];
      if (prevValue !== undefined) {
        setPointer((prev) => prev - 1);
        setValue(prevValue);
      }
    }
  }, [history, pointer]);

  const forward = useCallback(() => {
    if (pointer < history.length - 1) {
      const nextValue = history[pointer + 1];
      if (nextValue !== undefined) {
        setPointer((prev) => prev + 1);
        setValue(nextValue);
      }
    }
  }, [history, pointer]);

  const go = useCallback(
    (index: number) => {
      if (index >= 0 && index < history.length) {
        const targetValue = history[index];
        if (targetValue !== undefined) {
          setPointer(index);
          setValue(targetValue);
        }
      }
    },
    [history]
  );

  return [
    value,
    set,
    {
      history,
      pointer,
      back,
      forward,
      go,
    },
  ];
}
