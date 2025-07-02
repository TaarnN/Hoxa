import { useState, useCallback, useRef } from "react";

export function usePromiseQueue() {
  const [isRunning, setIsRunning] = useState(false);
  const queueRef = useRef<Array<() => Promise<any>>>([]);

  const processQueue = useCallback(async () => {
    if (isRunning || queueRef.current.length === 0) return;

    setIsRunning(true);
    const nextTask = queueRef.current.shift();

    try {
      await nextTask?.();
    } catch (error) {
      console.error("Task failed:", error);
    } finally {
      setTimeout(() => {
        setIsRunning(false);
        processQueue();
      }, 0);
    }
  }, [isRunning]);

  const enqueue = useCallback(
    (task: () => Promise<any>) => {
      queueRef.current.push(task);
      processQueue();
    },
    [processQueue]
  );

  return {
    enqueue,
    isRunning,
    queueSize: queueRef.current.length,
  };
}
