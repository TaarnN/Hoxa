import { useState, useEffect, useRef } from "react";

export function useViewportPosition<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  { top: number; left: number; visibleRatio: number }
] {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    visibleRatio: 0,
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const updatePosition = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const top = Math.max(0, rect.top);
      const bottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, bottom - top);
      const visibleRatio = Math.min(1, visibleHeight / rect.height);

      setPosition({
        top: rect.top,
        left: rect.left,
        visibleRatio,
      });
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return [ref, position];
}
