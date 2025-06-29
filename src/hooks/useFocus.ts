import { useState, useCallback, useRef, useEffect } from "react";

export function useFocus<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  boolean,
  () => void
] {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<T>(null);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    node.addEventListener("focus", handleFocus);
    node.addEventListener("blur", handleBlur);

    return () => {
      node.removeEventListener("focus", handleFocus);
      node.removeEventListener("blur", handleBlur);
    };
  }, []);

  return [ref, isFocused, focus];
}
