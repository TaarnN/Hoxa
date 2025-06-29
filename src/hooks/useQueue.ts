import { useState, useCallback } from "react";

export function useQueue<T>(initialItems: T[] = []) {
  const [queue, setQueue] = useState<T[]>(initialItems);

  const enqueue = useCallback((item: T) => {
    setQueue((prev) => [...prev, item]);
  }, []);

  const dequeue = useCallback((): T | undefined => {
    let removed;
    setQueue((prev) => {
      const [first, ...rest] = prev;
      removed = first;
      return rest;
    });
    return removed;
  }, []);

  const peek = useCallback((): T | undefined => queue[0], [queue]);

  const clear = useCallback(() => setQueue([]), []);

  return {
    items: queue,
    size: queue.length,
    isEmpty: queue.length === 0,
    enqueue,
    dequeue,
    peek,
    clear,
  };
}
