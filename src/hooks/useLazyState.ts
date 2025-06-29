import { useState, useCallback } from "react";

export function useLazyState<T>(
  initialValue: T,
  asyncSetter: (current: T) => Promise<T>
): [T, () => Promise<void>] {
  const [state, setState] = useState<T>(initialValue);

  const setAsync = useCallback(async () => {
    const newValue = await asyncSetter(state);
    setState(newValue);
  }, [state, asyncSetter]);

  return [state, setAsync];
}
