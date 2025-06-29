import { useEffect, useRef } from "react";

export function useSynchronizedScroll(refs: React.RefObject<HTMLElement>[]) {
  const activeRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = (index: number) => (e: Event) => {
      if (activeRef.current !== index) {
        activeRef.current = index;
        return;
      }

      const target = e.target as HTMLElement;
      const scrollTop = target.scrollTop;
      const scrollLeft = target.scrollLeft;

      refs.forEach((ref, refIndex) => {
        if (refIndex !== index && ref.current) {
          if (ref.current.scrollTop !== scrollTop) {
            ref.current.scrollTop = scrollTop;
          }
          if (ref.current.scrollLeft !== scrollLeft) {
            ref.current.scrollLeft = scrollLeft;
          }
        }
      });
    };

    const listeners = refs.map((ref, index) => {
      const handler = handleScroll(index);
      ref.current?.addEventListener("scroll", handler);
      return () => ref.current?.removeEventListener("scroll", handler);
    });

    return () => listeners.forEach((cleanup) => cleanup?.());
  }, [refs]);
}
