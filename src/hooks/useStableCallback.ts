import { useRef, useCallback, useEffect } from "react";

export function useStableCallback<T extends (...args: any[]) => any>(fn: T) {
  const ref = useRef<T>(fn);

  useEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []);
}
