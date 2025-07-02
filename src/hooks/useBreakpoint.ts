import { useState, useEffect } from "react";

const defaultBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export function useBreakpoint(
  breakpoints: Record<string, number> = defaultBreakpoints
): string {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(() => {
    const sorted = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);
    const width = window.innerWidth;
    for (const [name, size] of sorted) {
      if (width >= size) return name;
    }
    return "";
  });

  useEffect(() => {
    const sortedBreakpoints = Object.entries(breakpoints).sort(
      (a, b) => b[1] - a[1]
    );

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let breakpoint = "";

      for (const [name, size] of sortedBreakpoints) {
        if (width >= size) {
          breakpoint = name;
          break;
        }
      }

      setCurrentBreakpoint(breakpoint);
    };

    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, [breakpoints]);

  return currentBreakpoint;
}
