// useGhostMode.ts
import { useEffect } from "react";
import { gsap } from "gsap";

export function useGhostMode(
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  intervalSec = 2
) {
  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const anims = elements.map((ref) => {
      if (!ref.current) return null;
      return gsap.to(ref.current, {
        autoAlpha: 0,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: intervalSec,
      });
    });
    return () => anims.forEach((a) => a && a.kill());
  }, [refs, intervalSec]);
}
