import { useState, useEffect } from "react";
import type { RefObject } from "react";

export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T | null>
): DOMRectReadOnly | null {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setDimensions(entries[0].contentRect);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return dimensions;
}
