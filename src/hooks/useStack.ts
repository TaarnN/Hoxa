import { useState, useCallback, useRef } from "react";

export function useStack<T>(initialItems: T[] = []) {
  const stackRef = useRef(initialItems);
  const [_, forceUpdate] = useState(0);

  const push = useCallback((item: T) => {
    stackRef.current = [...stackRef.current, item];
    forceUpdate(n => n + 1);
  }, []);

  const pop = useCallback((): T | undefined => {
    if (stackRef.current.length === 0) return undefined;
    const lastItem = stackRef.current[stackRef.current.length - 1];
    stackRef.current = stackRef.current.slice(0, -1);
    forceUpdate(n => n + 1);
    return lastItem;
  }, []);

  const peek = useCallback((): T | undefined => {
    return stackRef.current.length > 0 
      ? stackRef.current[stackRef.current.length - 1] 
      : undefined;
  }, []);

  const clear = useCallback(() => {
    if (stackRef.current.length > 0) {
      stackRef.current = [];
      forceUpdate(n => n + 1);
    }
  }, []);

  return {
    items: stackRef.current,
    size: stackRef.current.length,
    isEmpty: stackRef.current.length === 0,
    push,
    pop,
    peek,
    clear,
  };
}