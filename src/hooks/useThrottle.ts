import { useCallback, useRef } from "react";

export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const lastArgs = useRef<Parameters<T> | null>(null);
  const lastCallTime = useRef<number>(0);

  const { leading = true, trailing = true } = options;

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (!leading && !lastCallTime.current) {
        lastCallTime.current = now;
      }

      const remaining = wait - (now - lastCallTime.current);

      if (remaining <= 0 || remaining > wait) {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
          timeoutId.current = null;
        }
        lastCallTime.current = now;
        func(...args);
      } else if (trailing && !timeoutId.current) {
        lastArgs.current = args;
        timeoutId.current = setTimeout(() => {
          lastCallTime.current = Date.now();
          timeoutId.current = null;
          if (lastArgs.current) {
            func(...lastArgs.current);
            lastArgs.current = null;
          }
        }, remaining);
      } else {
        lastArgs.current = args;
      }
    },
    [func, wait, leading, trailing]
  );

  return throttledFunction;
}
