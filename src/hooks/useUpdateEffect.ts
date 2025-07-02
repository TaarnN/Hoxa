import { useEffect, useRef } from "react";

export function useUpdateEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList = []
) {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      return effect();
    }
  }, deps);
}
