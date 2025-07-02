import { useEffect, useRef, useCallback } from "react";

export function useIdleTimeout(callback: () => void, timeout: number = 60000) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (timerRef.current) clearTimeout(timerRef.current);
    
    timerRef.current = setTimeout(() => {
      if (Date.now() - lastActivityRef.current >= timeout) {
        callbackRef.current();
      }
    }, timeout);
  }, [timeout]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "touchstart", "mousedown"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);
}
