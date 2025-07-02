import { useState, useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useOnScreen<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry) {
        setIsVisible(entry.isIntersecting);
      }
    }, options);

    const currentElement = ref.current;

    if (currentElement) {
      observerRef.current.observe(currentElement);
    }

    return () => {
      if (observerRef.current) {
        if (currentElement) {
          observerRef.current.unobserve(currentElement);
        }
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  return [ref, isVisible];
}
