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

    let lastTime = 0;
    const loop = (time: DOMHighResTimeStamp) => {
      const delta = time - lastTime;
      callbackRef.current(time);
      lastTime = time;
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
