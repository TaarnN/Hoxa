import { useState, useCallback, useRef } from "react";

export function usePromiseQueue() {
  const queueRef = useRef<Array<() => Promise<any>>>([]);
  const runningRef = useRef(false);

  const [isRunning, setIsRunning] = useState(false);

  const processQueue = useCallback(async () => {
    if (runningRef.current) return;
    if (queueRef.current.length === 0) {
      setIsRunning(false);
      return;
    }

    runningRef.current = true;
    setIsRunning(true);

    const task = queueRef.current.shift()!;

    try {
      await task();
    } catch (e) {
      console.error("Task failed:", e);
    } finally {
      runningRef.current = false;
      processQueue();
    }
  }, []);

  const enqueue = useCallback((task: () => Promise<any>) => {
    queueRef.current.push(task);
    processQueue();
  }, [processQueue]);

  return { enqueue, isRunning };
}