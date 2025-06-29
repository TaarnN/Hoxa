// useQuantumLeap.ts
import { useState, useCallback } from "react";

interface Bounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export function useQuantumLeap(bounds: Bounds) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const leap = useCallback(() => {
    const x = Math.random() * (bounds.xMax - bounds.xMin) + bounds.xMin;
    const y = Math.random() * (bounds.yMax - bounds.yMin) + bounds.yMin;
    setPos({ x, y });
    return { x, y };
  }, [bounds]);

  return { pos, leap };
}
