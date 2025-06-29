import { useRef, useMemo } from "react";

export function useMemoCompare<T>(
  value: T,
  compare: (prev: T | undefined, current: T) => boolean
) {
  const previousRef = useRef<T>(undefined);
  const previous = previousRef.current;

  const isEqual = compare(previous, value);

  const memoized = useMemo(() => {
    if (!isEqual) {
      previousRef.current = value;
      return value;
    }
    return previous;
  }, [value, isEqual, previous]);

  return memoized;
}
