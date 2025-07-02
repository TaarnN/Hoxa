import { useState, useEffect, useRef } from "react";
import axios from "axios";
import type { AxiosRequestConfig, CancelTokenSource } from "axios";

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig
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
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);
  const isMountedRef = useRef(true);

  const refetch = () => setTrigger((prev) => prev + 1);
  const abort = () => cancelTokenSourceRef.current?.cancel();

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      cancelTokenSourceRef.current?.cancel();
    };
  }, []);

  useEffect(() => {
    cancelTokenSourceRef.current?.cancel();
    cancelTokenSourceRef.current = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        if (!isMountedRef.current) return;
        setLoading(true);
        setError(null);

        const response = await axios.get<T>(url, {
          ...options,
          cancelToken: cancelTokenSourceRef.current?.token,
        });

        if (isMountedRef.current) setData(response.data);
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
      cancelTokenSourceRef.current?.cancel();
    };
  }, [url, options, trigger]);

  return { data, loading, error, abort, refetch };
}
