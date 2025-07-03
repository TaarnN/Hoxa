// useRetroFilter.ts
import { useEffect } from "react";
import { gsap } from "gsap";

export function useRetroFilter(
  refs: React.RefObject<Element> | React.RefObject<Element>[],
  filter: "sepia" | "pixelate" | "scanlines"
) {
  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    elements.forEach((ref) => {
      if (!ref.current) return;
      switch (filter) {
        case "sepia":
          gsap.set(ref.current, { filter: "sepia(0.8)" });
          break;
        case "pixelate":
          gsap.set(ref.current, { filter: "url(#pixelate)" });
          break;
        case "scanlines":
          gsap.set(ref.current, { filter: "url(#scanlines)" });
          break;
      }
    });
    return () =>
      elements.forEach(
        (ref) => ref.current && gsap.set(ref.current, { filter: "none" })
      );
  }, [refs, filter]);
}
