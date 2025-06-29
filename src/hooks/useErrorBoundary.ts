import { useState, useCallback } from "react";

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => setError(null), []);

  if (error) {
    throw error;
  }

  return { setError, resetError };
}
