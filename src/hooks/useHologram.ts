// useHologram.ts
import { useEffect } from "react";
import { gsap } from "gsap";

interface HoloOptions {
  rotation?: number;
  depth?: number;
}

export function useHologram(
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  options: HoloOptions = { rotation: 45, depth: 100 }
) {
  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const anims = elements.map(
      (ref) =>
        ref.current &&
        gsap.to(ref.current, {
          rotationY: options.rotation,
          transformPerspective: options.depth,
          repeat: -1,
          yoyo: true,
          duration: 2,
        })
    );
    return () => anims.forEach((a) => a && a.kill());
  }, [refs, options.rotation, options.depth]);
}
