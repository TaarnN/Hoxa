import { useState, useEffect } from "react";

const cache = new Map<string, any>();

export function useCachedFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const fetchOptions = { ...options, signal: controller.signal };

    const fetchData = async () => {
      setLoading(true);

      if (cache.has(url)) {
        setData(cache.get(url));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) throw new Error(response.statusText);

        const result = await response.json();
        cache.set(url, result);
        setData(result);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, options]);

  return { data, loading, error, refetch: () => cache.delete(url) };
}
