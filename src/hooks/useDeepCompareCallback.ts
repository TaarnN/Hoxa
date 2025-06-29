import { useCallback, useRef } from "react";
import isEqual from "lodash/isEqual";

export function useDeepCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: any[]
): T {
  const depsRef = useRef<any[]>(dependencies);
  const callbackRef = useRef<T>(callback);

  if (!isEqual(depsRef.current, dependencies)) {
    depsRef.current = dependencies;
    callbackRef.current = callback;
  }

  return useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []) as T;
}
