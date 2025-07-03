import { useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: any[]
) {
  const previousDepsRef = useRef<any[]>(null);
  const cleanupRef = useRef<() => void>(null);

  useEffect(() => {
    const prev = previousDepsRef.current;
    const changed = prev === undefined || !isEqual(prev, dependencies);

    if (changed) {
      if (cleanupRef.current) {
        cleanupRef.current();
      }

      previousDepsRef.current = dependencies;

      const cleanup = effect();
      if (typeof cleanup === "function") {
        cleanupRef.current = cleanup;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);
}
