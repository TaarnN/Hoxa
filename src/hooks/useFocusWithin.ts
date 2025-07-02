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

    const handleFocus = (e: FocusEvent) => {
      if (node.contains(e.target as Node)) {
        setIsFocusWithin(true);
      } else {
        setIsFocusWithin(false);
      }
    };

    // Use event capture to handle events in iframes
    document.addEventListener("focus", handleFocus, true);
    document.addEventListener("blur", handleFocus, true);

    return () => {
      document.removeEventListener("focus", handleFocus, true);
      document.removeEventListener("blur", handleFocus, true);
    };
  }, []);

  return [ref, isFocusWithin];
}
