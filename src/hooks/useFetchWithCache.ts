import { useState, useEffect, useCallback, useRef } from "react";
import axios, { type AxiosRequestConfig } from "axios";

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
  options?: AxiosRequestConfig,
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
  const isMountedRef = useRef(true);

  const refresh = useCallback(() => {
    setRefreshToken((prev) => prev + 1);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      if (!isMountedRef.current) return;

      setLoading(true);
      setError(null);

      try {
        // Check cache
        const cached = memoryCache[cacheId];
        if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
          if (isMountedRef.current) setData(cached.data);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const response = await axios.get<T>(url, {
          ...options,
          signal,
        });

        const responseData = response.data;

        // Update cache
        memoryCache[cacheId] = {
          data: responseData,
          timestamp: Date.now(),
        };

        if (isMountedRef.current) setData(responseData);
      } catch (err) {
        if (isMountedRef.current && !axios.isCancel(err)) {
          setError(err as Error);
        }
      } finally {
        if (isMountedRef.current) {
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
