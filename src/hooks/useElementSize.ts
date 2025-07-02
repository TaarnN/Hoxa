import { useState, useRef, useEffect } from "react";

export function useElementSize<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  { width: number; height: number }
] {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const updateSize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    updateSize();

    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(updateSize);
    }

    resizeObserverRef.current.observe(ref.current);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  return [ref, size];
}
