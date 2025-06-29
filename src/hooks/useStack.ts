import { useState, useCallback } from "react";

export function useStack<T>(initialItems: T[] = []) {
  const [stack, setStack] = useState<T[]>(initialItems);

  const push = useCallback((item: T) => {
    setStack((prev) => [...prev, item]);
  }, []);

  const pop = useCallback((): T | undefined => {
    let removed;
    setStack((prev) => {
      const newStack = [...prev];
      removed = newStack.pop();
      return newStack;
    });
    return removed;
  }, []);

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
