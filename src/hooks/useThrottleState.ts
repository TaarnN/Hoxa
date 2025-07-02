import { useState, useEffect, useRef, useCallback } from "react";

export function useThrottleState<T>(
  initialValue: T,
  interval: number
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const lastUpdateRef = useRef<number>(0);
  const pendingRef = useRef<T | null>(null);
  const isScheduledRef = useRef<boolean>(false);

  useEffect(() => {
    if (isScheduledRef.current) return;
    const now = Date.now();
    const elapsed = now - lastUpdateRef.current;

    if (elapsed >= interval && pendingRef.current !== null) {
      setValue(pendingRef.current);
      pendingRef.current = null;
      lastUpdateRef.current = now;
    } else if (pendingRef.current !== null) {
      isScheduledRef.current = true;
      const timeout = setTimeout(() => {
        setValue(pendingRef.current!);
        pendingRef.current = null;
        lastUpdateRef.current = Date.now();
        isScheduledRef.current = false;
      }, interval - elapsed);

      return () => {
        clearTimeout(timeout);
        isScheduledRef.current = false;
      };
    }
  }, [interval, value]);

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
