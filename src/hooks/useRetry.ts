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
  attempt: () => Promise<void>;
  retry: () => void;
} {
  const { retries, retryDelay = 1000, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    let lastError: Error | null = null;

    for (let currentAttempt = 0; currentAttempt <= retries; currentAttempt++) {
      setAttemptCount(currentAttempt);
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

  const attempt = useCallback(async () => {
    await execute().finally(() => setLoading(false));
  }, [execute]);

  const retry = useCallback(() => {
    setAttemptCount(0);
    attempt();
  }, [attempt]);

  useEffect(() => {
    attempt();
  }, []);

  return {
    data,
    error,
    loading,
    attempt,
    retry,
  };
}
