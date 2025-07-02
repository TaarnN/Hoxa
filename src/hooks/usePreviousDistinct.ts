import { useRef, useEffect } from "react";

export function usePreviousDistinct<T>(
  value: T,
  compare: (a: T, b: T) => boolean = (a, b) => a === b
): T | undefined {
  const prevRef = useRef<T | undefined>(undefined);
  const currentRef = useRef<T>(value);

  useEffect(() => {
    if (!compare(currentRef.current, value)) {
      prevRef.current = currentRef.current;
      currentRef.current = value;
    }
  }, [value, compare]);

  return prevRef.current;
}
