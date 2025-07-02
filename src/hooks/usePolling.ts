import { useCallback, useEffect, useRef } from "react";

export function usePolling(
  callback: () => Promise<void> | void,
  interval: number,
  immediate = true
) {
  const savedCallback = useRef(callback);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(false);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    isActiveRef.current = false;
  }, []);

  const start = useCallback(() => {
    if (isActiveRef.current || interval <= 0) return;
    
    isActiveRef.current = true;
    
    const tick = () => savedCallback.current();
    
    if (immediate) {
      tick();
    }
    
    timerRef.current = setInterval(tick, interval);
  }, [interval, immediate]);

  useEffect(() => {
    if (interval > 0) {
      start();
    } else {
      stop();
    }
    
    return stop;
  }, [interval, start, stop]);

  return { start, stop };
}
