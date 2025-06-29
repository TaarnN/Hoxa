// useChronoLoop.ts
import { useEffect, useRef } from "react";

export function useChronoLoop(
  callback: () => void,
  interval: number,
  speed = 1
) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);
  useEffect(() => {
    let id: NodeJS.Timeout;
    function tick() {
      saved.current();
      id = setTimeout(tick, interval / speed);
    }
    id = setTimeout(tick, interval / speed);
    return () => clearTimeout(id);
  }, [interval, speed]);
}
