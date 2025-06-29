import { useState, useEffect } from "react";

type MotionState = {
  acceleration: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
  accelerationIncludingGravity: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
  rotationRate: {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
  };
  interval: number | null;
};

export function useMotion(): MotionState {
  const [motion, setMotion] = useState<MotionState>({
    acceleration: { x: null, y: null, z: null },
    accelerationIncludingGravity: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null },
    interval: null,
  });

  useEffect(() => {
    if (!window.DeviceMotionEvent) {
      console.warn("Device motion not supported");
      return;
    }

    const handleMotion = (e: DeviceMotionEvent) => {
      setMotion({
        acceleration: {
          x: e.acceleration?.x || null,
          y: e.acceleration?.y || null,
          z: e.acceleration?.z || null,
        },
        accelerationIncludingGravity: {
          x: e.accelerationIncludingGravity?.x || null,
          y: e.accelerationIncludingGravity?.y || null,
          z: e.accelerationIncludingGravity?.z || null,
        },
        rotationRate: {
          alpha: e.rotationRate?.alpha || null,
          beta: e.rotationRate?.beta || null,
          gamma: e.rotationRate?.gamma || null,
        },
        interval: e.interval || null,
      });
    };

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  return motion;
}
