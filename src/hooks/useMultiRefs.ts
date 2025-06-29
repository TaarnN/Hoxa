import { useCallback, useRef } from "react";

export function useMultiRefs<T>(): [
  (index: number) => (element: T | null) => void,
  T[]
] {
  const refs = useRef<T[]>([]).current;

  const setRef = useCallback((index: number) => {
    return (element: T | null) => {
      if (element) {
        refs[index] = element;
      }
    };
  }, []);

  return [setRef, refs];
}
