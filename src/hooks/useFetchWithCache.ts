import { useState, useEffect, useCallback } from "react";

type Cache = {
  [key: string]: {
    data: any;
    timestamp: number;
  };
};

const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const memoryCache: Cache = {};

export function useFetchWithCache<T>(
  url: string,
  options?: RequestInit,
  cacheKey?: string
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
} {
  const cacheId = cacheKey || url;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const refresh = useCallback(() => {
    setRefreshToken((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check cache
        const cached = memoryCache[cacheId];
        if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
          setData(cached.data);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const responseData = await response.json();

        // Update cache
        memoryCache[cacheId] = {
          data: responseData,
          timestamp: Date.now(),
        };

        setData(responseData);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err as Error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, options, cacheId, refreshToken]);

  return { data, loading, error, refresh };
}
