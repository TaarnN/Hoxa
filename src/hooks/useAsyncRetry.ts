import { useState, useEffect, useCallback, useRef } from "react";

type AsyncFunction<T> = () => Promise<T>;
type AsyncState<T> = {
  loading: boolean;
  error: Error | null;
  value: T | null;
  retryCount: number;
  retry: () => void;
  cancel: () => void;
};

export function useAsyncRetry<T>(
  asyncFunction: AsyncFunction<T>,
  options: { retryDelay?: number; maxRetries?: number } = {}
): AsyncState<T> {
  const { retryDelay = 1000, maxRetries = 3 } = options;
  const [state, setState] = useState<Omit<AsyncState<T>, "retry" | "cancel">>({
    loading: true,
    error: null,
    value: null,
    retryCount: 0,
  });
  const [trigger, setTrigger] = useState(0);
  const cancelRef = useRef(false);

  const cancel = useCallback(() => {
    cancelRef.current = true;
  }, []);

  const retry = useCallback(() => {
    cancelRef.current = false;
    setState((prev) => ({ ...prev, retryCount: prev.retryCount + 1 }));
    setTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const execute = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const result = await asyncFunction();
        if (isMounted && !cancelRef.current) {
          setState({
            loading: false,
            error: null,
            value: result,
            retryCount: 0,
          });
        }
      } catch (error) {
        if (isMounted && !cancelRef.current) {
          if (state.retryCount < maxRetries) {
            timeoutId = setTimeout(retry, retryDelay);
          }
          setState({
            loading: false,
            error: error as Error,
            value: null,
            retryCount: state.retryCount,
          });
        }
      }
    };

    execute();

    return () => {
      isMounted = false;
      cancelRef.current = true;
      clearTimeout(timeoutId);
    };
  }, [trigger, asyncFunction, retryDelay, maxRetries, state.retryCount, retry]);

  return { ...state, retry, cancel };
}
