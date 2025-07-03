import { useState, useCallback, type ReactNode } from "react";

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => setError(null), []);

  const throwError = useCallback((err: Error) => {
    setError(err);
  }, []);

  const ErrorBoundary = useCallback(
    ({ children, fallback }: { children: ReactNode; fallback: ReactNode }) => {
      if (error) return fallback;
      return children;
    },
    [error]
  );

  return { throwError, resetError, ErrorBoundary, error };
}

