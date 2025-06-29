import { useEffect } from "react";

export function useLocalStorageEffect(
  key: string,
  effect: (storedValue: any) => void,
  dependencies: any[] = []
) {
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        effect(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, effect, ...dependencies]);
}
