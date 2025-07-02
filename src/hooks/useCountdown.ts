import { useState, useEffect, useCallback, useRef } from "react";

export function useCountdown(
  initialSeconds: number,
  options: {
    autoStart?: boolean;
    onComplete?: () => void;
    interval?: number;
  } = {}
) {
  const { autoStart = false, onComplete, interval = 1000 } = options;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newSeconds?: number) => {
      setIsRunning(false);
      setSeconds(newSeconds !== undefined ? newSeconds : initialSeconds);
    },
    [initialSeconds]
  );

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (seconds <= 0) {
      setIsRunning(false);
      onComplete?.();
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        const newValue = s - 1;
        if (newValue <= 0) {
          setIsRunning(false);
          onComplete?.();
          if (timerRef.current) clearInterval(timerRef.current);
        }
        return newValue;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, seconds, interval, onComplete]);

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
    formatted: `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`,
  };
}
