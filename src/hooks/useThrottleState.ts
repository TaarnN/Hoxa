import { useState, useEffect, useRef, useCallback } from "react";

export function useThrottleState<T>(
  initialValue: T,
  interval: number
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const lastUpdateRef = useRef<number>(0);
  const pendingRef = useRef<T | null>(null);

  useEffect(() => {
    const now = Date.now();
    if (
      now - lastUpdateRef.current >= interval &&
      pendingRef.current !== null
    ) {
      setValue(pendingRef.current);
      pendingRef.current = null;
      lastUpdateRef.current = now;
    } else {
      const timeout = setTimeout(() => {
        if (pendingRef.current !== null) {
          setValue(pendingRef.current);
          pendingRef.current = null;
          lastUpdateRef.current = Date.now();
        }
      }, interval - (now - lastUpdateRef.current));

      return () => clearTimeout(timeout);
    }
  }, [value, interval]);

  const throttledSet = useCallback(
    (newValue: React.SetStateAction<T>) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(value)
          : newValue;

      pendingRef.current = resolvedValue;
    },
    [value]
  );

  return [value, throttledSet];
}
