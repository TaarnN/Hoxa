import { useCallback, useRef, useEffect } from "react";

export function useEventQueue<T>(
  processor: (event: T) => Promise<void>,
  options: { interval?: number } = {}
) {
  const queueRef = useRef<T[]>([]);
  const isProcessingRef = useRef(false);
  const interval = options.interval ?? 0;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

      if (queueRef.current.length > 0) {
        if (interval > 0) {
          timeoutRef.current = setTimeout(processQueue, interval);
        } else {
          // Avoid call stack overflow by using setTimeout
          timeoutRef.current = setTimeout(processQueue, 0);
        }
      }
    }
  }, [processor, interval]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { addToQueue, queueSize: queueRef.current.length };
}
