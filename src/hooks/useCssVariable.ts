import { useState, useEffect, useCallback } from "react";

export function useCssVariable(
  name: string,
  element: HTMLElement | null = document.documentElement
): [string | null, (value: string) => void] {
  const [value, setValue] = useState<string | null>(null);

  const setVariable = useCallback(
    (newValue: string) => {
      if (!element) return;
      element.style.setProperty(name, newValue);
      setValue(newValue);
    },
    [name, element]
  );

  useEffect(() => {
    if (!element) return;

    const getValue = () => {
      return getComputedStyle(element).getPropertyValue(name).trim() || null;
    };

    setValue(getValue());

    const observer = new MutationObserver(() => {
      setValue(getValue());
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, [name, element]);

  return [value, setVariable];
}
