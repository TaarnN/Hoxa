import { useCallback, useRef } from "react";

export function useMultiRefs<T>(): [
  (index: number) => (element: T | null) => void,
  React.RefObject<T[]>
] {
  const refs = useRef<T[]>([]);

  const setRef = useCallback((index: number) => {
    return (element: T | null) => {
      if (element) {
        // Increase array size if needed
        if (index >= refs.current.length) {
          refs.current = [...refs.current, ...Array(index - refs.current.length + 1)];
        }
        refs.current[index] = element;
      }
    };
  }, []);

  return [setRef, refs];
}
