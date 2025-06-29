import { useMemo } from "react";

export function useBezierEase(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): (t: number) => number {
  return useMemo(() => {
    return function (t: number): number {
      return (
        3 * Math.pow(1 - t, 2) * t * p1y +
        3 * (1 - t) * Math.pow(t, 2) * p2y +
        Math.pow(t, 3)
      );
    };
  }, [p1x, p1y, p2x, p2y]);
}
