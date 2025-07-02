import { useEffect, useRef } from "react";

export function useLockBodyScroll(lock: boolean = true) {
  const originalStyleRef = useRef<string | null>(null);
  
  useEffect(() => {
    if (lock) {
      originalStyleRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (lock) {
        document.body.style.overflow = originalStyleRef.current || "";
      }
    };
  }, [lock]);
}
