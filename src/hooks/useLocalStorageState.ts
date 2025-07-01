// Fixed code
import { useState, useEffect } from "react";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T),
  options: {
    serialize?: (value: T) => string;
    deserialize?: (storedValue: string) => T;
  } = {}
): [T, (value: T | ((prev: T) => T)) => void] {
  const { serialize = JSON.stringify, deserialize = JSON.parse } = options;

  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null
        ? deserialize(storedValue)
        : initialValue instanceof Function
        ? initialValue()
        : initialValue;
    } catch (error) {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  });

  // Handle key changes
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setState(deserialize(storedValue));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, deserialize]);

  // Sync storage
  useEffect(() => {
    try {
      const serializedValue = serialize(state);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state, serialize]);

  return [state, setState];
}
