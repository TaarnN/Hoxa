import { useCallback, useRef } from "react";

type Listener<T> = (data: T) => void;
type Listeners<T> = Set<Listener<T>>;

export function useEventEmitter<T = void>() {
  const listeners = useRef<Listeners<T>>(new Set()).current;

  const emit = useCallback(
    (data: T) => {
      listeners.forEach((listener) => listener(data));
    },
    [listeners]
  );

  const subscribe = useCallback(
    (listener: Listener<T>) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    [listeners]
  );

  return { emit, subscribe };
}
