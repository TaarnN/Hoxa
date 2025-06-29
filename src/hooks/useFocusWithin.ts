import { useState, useEffect, useRef } from "react";

export function useFocusWithin<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  boolean
] {
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleFocusIn = (e: FocusEvent) => {
      if (node.contains(e.target as Node)) {
        setIsFocusWithin(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (!node.contains(e.relatedTarget as Node)) {
        setIsFocusWithin(false);
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return [ref, isFocusWithin];
}
