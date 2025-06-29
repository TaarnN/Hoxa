import { useRef, useEffect, useCallback } from "react";

export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  options: { leading?: boolean; trailing?: boolean } = { trailing: true }
): T {
  const { leading = false, trailing = true } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (leading && !timeoutRef.current) {
        callbackRef.current(...args);
      }

      timeoutRef.current = setTimeout(() => {
        if (trailing) {
          callbackRef.current(...args);
        }
        timeoutRef.current = null;
      }, delay);
    },
    [delay, leading, trailing]
  ) as T;
}
