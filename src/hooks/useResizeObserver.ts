import { useState, useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T | null>
): DOMRectReadOnly | null {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    observerRef.current = new ResizeObserver((entries) => {
      if (entries[0]) {
        setDimensions(entries[0].contentRect);
      }
    });

    observerRef.current.observe(ref.current);

    return () => {
      if (observerRef.current && ref.current) {
        observerRef.current.unobserve(ref.current);
      }
    };
  }, [ref]);

  return dimensions;
}
