import { useRef, useCallback, useEffect } from "react";

export function useLongPress(callback: () => void, duration: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPressedRef = useRef(false);
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if ("touches" in e) {
        e.preventDefault();
      }

      isPressedRef.current = true;
      startPositionRef.current = {
        x: "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX,
        y: "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY,
      };

      timeoutRef.current = setTimeout(() => {
        if (isPressedRef.current) {
          callback();
        }
      }, duration);
    },
    [callback, duration]
  );

  const stop = useCallback(() => {
    isPressedRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isPressedRef.current || !startPositionRef.current) return;

      const currentX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const currentY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;

      const dx = Math.abs(currentX - startPositionRef.current.x);
      const dy = Math.abs(currentY - startPositionRef.current.y);

      if (dx > 10 || dy > 10) {
        stop();
      }
    },
    [stop]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove, { passive: false });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      stop();
    };
  }, [handleMove, stop]);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchMove: handleMove,
  };
}
