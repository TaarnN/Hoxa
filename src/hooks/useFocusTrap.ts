import { useEffect, useRef, useCallback } from "react";

export function useFocusTrap<T extends HTMLElement>(
  active: boolean = true
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  const focusFirstElement = useCallback(() => {
    const focusable =
      ref.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ?? [];

    if (focusable.length > 0) {
      focusable[0]!.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!ref.current || !active) return;

      const focusable = Array.from(
        ref.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.tabIndex >= 0);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [active]
  );

  useEffect(() => {
    if (!active || !ref.current) return;

    const currentElement = ref.current;
    currentElement.addEventListener("keydown", handleKeyDown);

    // Focus first element when trap activates
    focusFirstElement();

    return () => {
      currentElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, handleKeyDown, focusFirstElement]);

  return ref;
}
