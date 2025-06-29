import { useCallback, useEffect, useRef } from "react";

export function useTimeoutFn() {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  const set = useCallback(
    (fn: () => void, delay: number) => {
      clear();
      timeoutId.current = setTimeout(fn, delay);
    },
    [clear]
  );

  const reset = useCallback(
    (fn: () => void, delay: number) => {
      clear();
      set(fn, delay);
    },
    [clear, set]
  );

  useEffect(() => {
    return clear;
  }, [clear]);

  return { set, clear, reset };
}
