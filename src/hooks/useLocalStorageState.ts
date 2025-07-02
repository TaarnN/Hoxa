import { useState, useEffect, useRef } from "react";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T),
  options: {
    serialize?: (value: T) => string;
    deserialize?: (storedValue: string) => T;
  } = {}
): [T, (value: T | ((prev: T) => T)) => void] {
  const { serialize = JSON.stringify, deserialize = JSON.parse } = options;
  const prevKeyRef = useRef(key);

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

  useEffect(() => {
    if (prevKeyRef.current !== key) {
      try {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
          setState(deserialize(storedValue));
        } else {
          setState(
            initialValue instanceof Function ? initialValue() : initialValue
          );
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
      }
      prevKeyRef.current = key;
    }
  }, [key, deserialize, initialValue]);

  useEffect(() => {
    if (prevKeyRef.current !== key) return;

    try {
      const serializedValue = serialize(state);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state, serialize]);

  return [state, setState];
}
