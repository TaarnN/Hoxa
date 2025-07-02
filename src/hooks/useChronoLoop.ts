// useChronoLoop.ts
import { useEffect, useRef } from "react";

export function useChronoLoop(
  callback: () => void,
  interval: number,
  speed = 1
) {
  const saved = useRef(callback);
  const speedRef = useRef(speed);

  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    let id: NodeJS.Timeout;
    const tick = () => saved.current();
    
    id = setInterval(tick, interval / speedRef.current);
    
    return () => clearInterval(id);
  }, [interval]);
}
