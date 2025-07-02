import { useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: any[]
) {
  const currentDependenciesRef = useRef<any[]>([]);

  if (
    !currentDependenciesRef.current ||
    !isEqual(currentDependenciesRef.current, dependencies)
  ) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(effect, [currentDependenciesRef.current]);
}
