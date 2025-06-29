import { useEffect, useRef } from "react";

export function useInterval(
  callback: () => void,
  delay: number | null,
  options: { immediate?: boolean } = {}
) {
  const savedCallback = useRef(callback);
  const { immediate = false } = options;

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    if (immediate) {
      savedCallback.current();
    }

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay, immediate]);
}
