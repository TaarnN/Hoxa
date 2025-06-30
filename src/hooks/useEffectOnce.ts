import { useEffect } from "react";

export const useEffectOnce = (effect: () => void | (() => void)) => {
  useEffect(effect, []);
};
