import { useCallback, useEffect, useRef } from "react";

export function useTimeoutFn() {
  const timeoutId = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  const set = useCallback(
    (fn: () => void, delay: number) => {
      clear();
      timeoutId.current = window.setTimeout(fn, delay);
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

  useEffect(() => () => clear(), [clear]);

  return { set, clear, reset };
}
