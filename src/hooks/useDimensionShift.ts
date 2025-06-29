// useDimensionShift.ts
import { useEffect } from "react";
import { gsap } from "gsap";

interface DimOptions {
  rotateX?: number;
  rotateY?: number;
  perspective?: number;
}

export function useDimensionShift(
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  options: DimOptions = { rotateX: 0, rotateY: 0, perspective: 800 }
) {
  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const anims = elements.map(
      (ref) =>
        ref.current &&
        gsap.to(ref.current, {
          rotationX: options.rotateX,
          rotationY: options.rotateY,
          transformPerspective: options.perspective,
          duration: 1,
          ease: "power2.inOut",
        })
    );
    return () => anims.forEach((a) => a && a.kill());
  }, [refs, JSON.stringify(options)]);
}
