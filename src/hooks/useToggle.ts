import { useState, useCallback } from "react";

export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => setState((prev) => !prev), []);

  return [state, toggle, setState];
}
