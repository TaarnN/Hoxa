// Fixed code
import { useState, useEffect, useRef, useCallback } from "react";
import type { RefObject } from "react";

export function useIntersectionObserver(
  options: IntersectionObserverInit = {},
  enabled: boolean = true
): [RefObject<Element | null>, boolean, IntersectionObserverEntry?] {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<Element>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  const stableOptions = useCallback(() => options, [options]);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
      }
    }, stableOptions());

    observerRef.current = observer;
    observer.observe(targetRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [stableOptions, enabled]);

  return [targetRef, isIntersecting, entry];
}
