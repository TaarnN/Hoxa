import { useEffect, useRef } from "react";

export function useIdleTimeout(callback: () => void, timeout: number = 60000) {
  const timerRef = useRef<NodeJS.Timeout>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = () => {
    lastActivityRef.current = Date.now();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (Date.now() - lastActivityRef.current >= timeout) {
        callback();
      }
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "touchstart"];

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
  }, [callback, timeout]);
}
