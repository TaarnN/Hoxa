// Fixed code
import { useEffect, useRef, useCallback } from "react";
import type { RefObject } from "react";

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement>(
  handler: ClickOutsideHandler,
  elements?: RefObject<T>[] | null
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const stableHandler = useCallback(handler, []);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Check if event originated from excluded elements
      if (
        (event as MouseEvent)
          .composedPath?.()
          .some((el) =>
            elements?.some((ref) => ref.current?.contains(el as Node))
          )
      ) {
        return;
      }

      // Check provided elements or default ref
      if (elements) {
        const shouldTrigger = elements.every(
          (el) => el.current && !el.current.contains(target)
        );
        if (shouldTrigger) stableHandler(event);
      } else if (ref.current && !ref.current.contains(target)) {
        stableHandler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [stableHandler, elements]);

  return ref;
}
