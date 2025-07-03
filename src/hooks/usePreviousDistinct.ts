import { useRef, useEffect } from "react";

export function usePreviousDistinct<T>(
  value: T,
  compare: (a: T, b: T) => boolean = (a, b) => a === b
): T | undefined {
  const ref = useRef<{ prev?: T; current: T }>({ current: value });

  useEffect(() => {
    if (!compare(ref.current.current, value)) {
      ref.current.prev = ref.current.current;
      ref.current.current = value;
    }
  }, [value, compare]);

  return ref.current.prev;
}
