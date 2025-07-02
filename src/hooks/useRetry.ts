import { useState, useEffect, useCallback } from "react";

export function useRetry<T>(
  asyncFn: () => Promise<T>,
  options: {
    retries: number;
    retryDelay?: number;
    onSuccess?: (data: T) => void;
    onError?: (error: Error, attempt: number) => void;
  }
): {
  data: T | null;
  error: Error | null;
  loading: boolean;
  attempt: number;
  retry: () => void;
} {
  const { retries, retryDelay = 1000, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    let lastError: Error | null = null;

    for (let currentAttempt = 0; currentAttempt <= retries; currentAttempt++) {
      setAttempt(currentAttempt);
      try {
        const result = await asyncFn();
        setData(result);
        onSuccess?.(result);
        setLoading(false);
        return result;
      } catch (err) {
        lastError = err as Error;
        setError(lastError);
        onError?.(lastError, currentAttempt);
        if (currentAttempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
    setLoading(false);
    throw lastError;
  }, [asyncFn, retries, retryDelay, onSuccess, onError]);

  const retry = useCallback(() => {
    setAttempt(0);
    execute().finally(() => setLoading(false));
  }, [execute]);

  useEffect(() => {
    retry();
  }, []);

  return {
    data,
    error,
    loading,
    attempt,
    retry,
  };
}
