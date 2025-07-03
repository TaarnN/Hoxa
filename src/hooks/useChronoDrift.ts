// useChronoDrift.ts
import { useEffect } from "react";
import { gsap } from "gsap";

export function useChronoDrift(
  refs: React.RefObject<Element> | React.RefObject<Element>[],
  duration = 10
) {
  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const anims = elements.map(
      (ref) =>
        ref.current &&
        gsap.to(ref.current, {
          x: "+=10",
          yoyo: true,
          repeat: -1,
          duration,
          ease: "none",
        })
    );
    return () => anims.forEach((a) => a && a.kill());
  }, [refs, duration]);
}
