import { useState, useCallback } from "react";

export function useStack<T>(initialItems: T[] = []) {
  const [stack, setStack] = useState<T[]>(initialItems);

  const push = useCallback((item: T) => {
    setStack((prev) => [...prev, item]);
  }, []);

  const pop = useCallback((): T | undefined => {
    setStack((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
    return stack[stack.length - 1];
  }, [stack]);

  const peek = useCallback(
    (): T | undefined => stack[stack.length - 1],
    [stack]
  );

  const clear = useCallback(() => setStack([]), []);

  return {
    items: stack,
    size: stack.length,
    isEmpty: stack.length === 0,
    push,
    pop,
    peek,
    clear,
  };
}
