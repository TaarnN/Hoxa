import { useState, useCallback, useRef, useEffect } from "react";

export function useLazyState<T>(
  initialValue: T,
  asyncSetter: (current: T) => Promise<T>
): [T, () => Promise<void>] {
  const [state, setState] = useState<T>(initialValue);
  const isMountedRef = useRef(true);
  const stateRef = useRef(state);
  
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const setAsync = useCallback(async () => {
    const newValue = await asyncSetter(stateRef.current);
    if (isMountedRef.current) {
      setState(newValue);
    }
  }, [asyncSetter]);

  return [state, setAsync];
}
