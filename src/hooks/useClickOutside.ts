import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement>(
  handler: ClickOutsideHandler,
  elements?: RefObject<T>[] | null
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // If specific elements are provided
      if (elements) {
        const shouldTrigger = elements.every(
          (el) => el.current && !el.current.contains(target)
        );
        if (shouldTrigger) handler(event);
        return;
      }

      // If using the default ref
      if (ref.current && !ref.current.contains(target)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, elements]);

  return ref;
}
