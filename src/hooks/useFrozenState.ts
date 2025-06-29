import { useState, useRef, useEffect, useCallback } from "react";

export function useFrozenState<T>(
  initialValue: T,
  freezeCondition: boolean
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialValue);
  const frozenRef = useRef(freezeCondition);

  useEffect(() => {
    frozenRef.current = freezeCondition;
  }, [freezeCondition]);

  const setFrozenState = useCallback((newValue: React.SetStateAction<T>) => {
    if (!frozenRef.current) {
      setState(newValue);
    }
  }, []);

  return [state, setFrozenState];
}
