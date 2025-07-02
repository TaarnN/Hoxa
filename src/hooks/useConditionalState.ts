import { useState, useRef, useEffect, useCallback } from "react";

export function useConditionalState<T>(
  initialValue: T,
  condition: boolean
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialValue);
  const conditionRef = useRef(condition);

  useEffect(() => {
    conditionRef.current = condition;
  }, [condition]);

  const setConditionalState = useCallback((newValue: React.SetStateAction<T>) => {
    if (!conditionRef.current) {
      setState(newValue);
    }
  }, []);

  return [state, setConditionalState];
}
