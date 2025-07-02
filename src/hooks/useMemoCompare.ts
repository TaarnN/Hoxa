import { useRef, useEffect } from "react";

export function useMemoCompare<T>(
  value: T,
  compare: (prev: T | undefined, current: T) => boolean
) {
  const previousRef = useRef<T | undefined>(undefined);
  const isEqualRef = useRef(false);

  // Update comparison whenever value changes
  useEffect(() => {
    isEqualRef.current = compare(previousRef.current, value);
    previousRef.current = value;
  }, [value, compare]);

  return isEqualRef.current ? previousRef.current : value;
}
