// useDreamSequence.ts
import { useEffect } from "react";
import { gsap } from "gsap";

export function useDreamSequence(
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  intensity = 0.5
) {
  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const anims = elements.map(
      (ref) =>
        ref.current &&
        gsap.to(ref.current, {
          filter: `blur(${20 * intensity}px)`,
          y: `-=${50 * intensity}`,
          repeat: -1,
          yoyo: true,
          duration: 3,
        })
    );
    return () => anims.forEach((a) => a && a.kill());
  }, [refs, intensity]);
}
