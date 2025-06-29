import { useEffect, useRef } from "react";

export function useMutationObserver(
  target: Element | null,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true,
  }
) {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (!target) return;

    observerRef.current = new MutationObserver(callback);
    observerRef.current.observe(target, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [target, callback, options]);

  return {
    disconnect: () => observerRef.current?.disconnect(),
    takeRecords: () => observerRef.current?.takeRecords() || [],
  };
}
