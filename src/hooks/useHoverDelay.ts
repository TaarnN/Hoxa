import { useState, useEffect, useRef } from "react";

export function useHoverDelay(
  delay: number = 300
): [boolean, { onPointerEnter: () => void; onPointerLeave: () => void }] {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const onPointerEnter = () => {
    clearTimer();
    timeoutRef.current = setTimeout(() => setIsHovered(true), delay);
  };

  const onPointerLeave = () => {
    clearTimer();
    setIsHovered(false);
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return [isHovered, { onPointerEnter, onPointerLeave }];
}
