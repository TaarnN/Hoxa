import { useCallback, useRef } from "react";

export function useEventQueue<T>(
  processor: (event: T) => Promise<void>,
  options: { interval?: number } = {}
) {
  const queueRef = useRef<T[]>([]);
  const isProcessingRef = useRef(false);
  const interval = options.interval ?? 0;

  const addToQueue = useCallback((event: T) => {
    queueRef.current.push(event);
    processQueue();
  }, []);

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current || queueRef.current.length === 0) return;

    isProcessingRef.current = true;
    const event = queueRef.current.shift()!;

    try {
      await processor(event);
    } catch (error) {
      console.error("Event processing failed:", error);
    } finally {
      isProcessingRef.current = false;

      if (interval > 0) {
        setTimeout(processQueue, interval);
      } else {
        processQueue();
      }
    }
  }, [processor, interval]);

  return { addToQueue, queueSize: queueRef.current.length };
}
