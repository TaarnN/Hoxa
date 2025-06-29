import { useRef, useCallback, useEffect } from 'react';

export function useLongPress(
  callback: () => void,
  duration: number = 500
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPressedRef = useRef(false);

  const start = useCallback(() => {
    isPressedRef.current = true;
    timeoutRef.current = setTimeout(() => {
      if (isPressedRef.current) {
        callback();
      }
    }, duration);
  }, [callback, duration]);

  const stop = useCallback(() => {
    isPressedRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop
  };
}