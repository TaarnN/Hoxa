import { useState, useEffect, useRef } from "react";

export function useRaf(callback: (time: DOMHighResTimeStamp) => void) {
  const [isRunning, setIsRunning] = useState(false);
  const frameRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isRunning) return;

    const loop = (time: DOMHighResTimeStamp) => {
      callbackRef.current(time);
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isRunning]);

  return {
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    toggle: () => setIsRunning((prev) => !prev),
    isRunning,
  };
}
