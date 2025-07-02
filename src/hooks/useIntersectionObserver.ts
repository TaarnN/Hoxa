import { useState, useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useIntersectionObserver(
  options: IntersectionObserverInit = {},
  enabled: boolean = true
): [RefObject<Element | null>, boolean, IntersectionObserverEntry?] {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<Element>(null);
  const observerRef = useRef<IntersectionObserver>(null);
  
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
      }
    }, options);

    observerRef.current = observer;
    observer.observe(targetRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [options, enabled]);

  return [targetRef, isIntersecting, entry];
}
