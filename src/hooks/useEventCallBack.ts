import { useRef, useEffect, useCallback } from "react";

export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: any[]) => {
    return ref.current(...args);
  }, []) as T;
}
