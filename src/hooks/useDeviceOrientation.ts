import { useState, useEffect } from "react";

type OrientationState = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  absolute: boolean | null;
};

export function useDeviceOrientation(): OrientationState {
  const [orientation, setOrientation] = useState<OrientationState>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: null,
  });

  useEffect(() => {
    let isMounted = true;
    
    if (!window.DeviceOrientationEvent) {
      console.warn("Device orientation not supported");
      return;
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!isMounted) return;
      
      setOrientation({
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma,
        absolute: e.absolute || null,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      isMounted = false;
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return orientation;
}
