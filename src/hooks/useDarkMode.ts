import { useState, useEffect } from "react";

export function useDarkMode(
  options: {
    localStorageKey?: string;
    defaultDark?: boolean;
  } = {}
): [boolean, (dark: boolean) => void] {
  const { localStorageKey = "darkMode", defaultDark = false } = options;

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const storedValue = localStorage.getItem(localStorageKey);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
      return (
        window.matchMedia("(prefers-color-scheme: dark)").matches || defaultDark
      );
    } catch {
      return defaultDark;
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(isDark));
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark, localStorageKey]);

  return [isDark, setIsDark];
}
