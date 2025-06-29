// useTimeWarp.ts
import { useEffect } from "react";
import { gsap } from "gsap";

export function useTimeWarp(speed: number = 1) {
  useEffect(() => {
    gsap.globalTimeline.timeScale(speed);
    return () => {
      gsap.globalTimeline.timeScale(1);
    };
  }, [speed]);
}
