import { useState, useEffect, useRef } from "react";

export function useHoverDelay(
  delay: number = 300
): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const onMouseEnter = () => {
    clearTimer();
    timeoutRef.current = setTimeout(() => setIsHovered(true), delay);
  };

  const onMouseLeave = () => {
    clearTimer();
    setIsHovered(false);
  };

  useEffect(() => clearTimer, []);

  return [isHovered, { onMouseEnter, onMouseLeave }];
}
