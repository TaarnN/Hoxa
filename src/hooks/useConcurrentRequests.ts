import { useState, useEffect, useCallback } from "react";

export function useConcurrentRequests<T>(
  requests: (() => Promise<T>)[],
  options: {
    maxConcurrent?: number;
    onComplete?: (results: (T | null)[]) => void;
  } = {}
): {
  results: (T | null)[];
  errors: (Error | null)[];
  loading: boolean;
  progress: number;
  retry: () => void;
} {
  const { maxConcurrent = 5, onComplete } = options;
  const [results, setResults] = useState<(T | null)[]>([]);
  const [errors, setErrors] = useState<(Error | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const execute = useCallback(async () => {
    setLoading(true);
    setResults(Array(requests.length).fill(null));
    setErrors(Array(requests.length).fill(null));
    setProgress(0);

    const queue = [...requests];
    const results: (T | null)[] = [];
    const errors: (Error | null)[] = [];
    let completed = 0;

    const worker = async (): Promise<void> => {
      while (queue.length > 0) {
        const index = requests.length - queue.length;
        const request = queue.shift()!;
        let result: T | null = null;
        let error: Error | null = null;

        try {
          result = await request();
        } catch (err) {
          error = err as Error;
        } finally {
          completed++;
          if (completed % 5 === 0 || queue.length === 0) {
            setResults(prev => {
              const next = [...prev];
              next[index] = result;
              return next;
            });
            setErrors(prev => {
              const next = [...prev];
              next[index] = error;
              return next;
            });
            setProgress(completed / requests.length);
          }
        }
      }
    };

    const workers = Array(Math.min(maxConcurrent, requests.length))
      .fill(null)
      .map(worker);

    await Promise.all(workers);

    setLoading(false);
    onComplete?.(results);
  }, [requests, maxConcurrent, onComplete]);

  useEffect(() => {
    if (requests.length > 0) {
      execute();
    }
  }, [execute, requests]);

  return {
    results,
    errors,
    loading,
    progress,
    retry: execute,
  };
}
