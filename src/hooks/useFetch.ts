import { useState, useEffect, useRef } from "react";

export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  abort: () => void;
  refetch: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const refetch = () => setTrigger((prev) => prev + 1);
  const abort = () => abortControllerRef.current?.abort();

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        if (!signal.aborted) {
          setError(err as Error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, options, trigger]);

  return { data, loading, error, abort, refetch };
}
