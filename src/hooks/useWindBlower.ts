// useWindBlower.ts
import { useEffect } from "react";
import { gsap } from "gsap";

interface WindOptions {
  direction: "left" | "right" | "up" | "down";
  intensity?: number; // px per second
}

export function useWindBlower(
  refs: React.RefObject<Element> | React.RefObject<Element>[],
  options: WindOptions
) {
  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const { direction, intensity = 100 } = options;
    const props: any = {};
    if (direction === "left" || direction === "right")
      props.x = direction === "left" ? `-=${intensity}` : `+=${intensity}`;
    else props.y = direction === "up" ? `-=${intensity}` : `+=${intensity}`;

    const anims = elements.map(
      (ref) =>
        ref.current &&
        gsap.to(ref.current, {
          ...props,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          duration: 2,
        })
    );
    return () => anims.forEach((a) => a && a.kill());
  }, [refs, JSON.stringify(options)]);
}
