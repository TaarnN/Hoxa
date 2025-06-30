import { useEffect, useRef } from "react";
import isEqual from "lodash";

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: any[],
  shallowFallback: boolean = false
) {
  const currentDependenciesRef = useRef<any[]>([]);
  const hasShallowChanged = shallowFallback && 
    (dependencies.length !== currentDependenciesRef.current.length || 
     dependencies.some((dep, i) => dep !== currentDependenciesRef.current[i]));

  if (
    !currentDependenciesRef.current ||
    hasShallowChanged ||
    !isEqual([currentDependenciesRef.current, dependencies])
  ) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(effect, [currentDependenciesRef.current]);
}
