import { useEffect } from "react";

export function useLocalStorageEffect(
  key: string,
  effect: (storedValue: any) => void | (() => void),
  dependencies: any[] = []
) {
  useEffect(() => {
    let cleanup: void | (() => void);
    
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        cleanup = effect(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }

    return () => {
      if (cleanup && typeof cleanup === 'function') cleanup();
    };
  }, [key, effect, ...dependencies]);
}
