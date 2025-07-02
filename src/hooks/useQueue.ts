import { useState, useCallback } from "react";

export function useQueue<T>(initialItems: T[] = []) {
  const [queue, setQueue] = useState<T[]>(initialItems);

  const enqueue = useCallback((item: T) => {
    setQueue((prev) => [...prev, item]);
  }, []);

  const dequeue = useCallback((): T | undefined => {
    setQueue((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(1);
    });
    return queue[0];
  }, [queue]);

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
