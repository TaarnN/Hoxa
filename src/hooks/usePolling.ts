import { useCallback, useEffect, useRef } from "react";

export function usePolling(
  callback: () => Promise<void> | void,
  interval: number,
  immediate = true
) {
  const savedCallback = useRef(callback);
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (interval <= 0) return;

    const tick = () => {
      savedCallback.current();
    };

    if (immediate) {
      tick();
    }

    timerRef.current = setInterval(tick, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [interval, immediate]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (!timerRef.current && interval > 0) {
      timerRef.current = setInterval(() => savedCallback.current(), interval);
    }
  }, [interval]);

  return { start, stop };
}
