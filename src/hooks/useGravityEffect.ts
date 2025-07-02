// useGravityEffect.ts
import { useEffect } from "react";
import { gsap } from "gsap";

interface GravityOptions {
  gravity?: number; // m/s²
  mass?: number; // kg
  float?: boolean;
}

export function useGravityEffect(
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  options: GravityOptions = {}
) {
  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const anims = elements.map((ref) => {
      if (!ref.current) return null;
      const { gravity = 9.8, mass = 1, float = false } = options;
      return gsap.to(ref.current, {
        y: float ? `-=${gravity * mass}` : `+=${gravity * mass}`,
        ease: float ? "power1.out" : "bounce.out",
        repeat: -1,
        yoyo: true,
        duration: 1,
      });
    });
    return () => anims.forEach((a) => a && a.kill());
  }, [refs, options.gravity, options.mass, options.float]);
}
