import { useState, useEffect } from "react";

export function useDarkMode(
  options: {
    localStorageKey?: string;
    defaultDark?: boolean;
  } = {}
): [boolean, (dark: boolean) => void] {
  const { localStorageKey = "darkMode", defaultDark = false } = options;

  const [isDark, setIsDark] = useState<boolean>(defaultDark);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const storedValue = localStorage.getItem(localStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialValue = storedValue !== null 
      ? JSON.parse(storedValue) 
      : prefersDark || defaultDark;
    
    setIsDark(initialValue);
  }, [localStorageKey, defaultDark]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    localStorage.setItem(localStorageKey, JSON.stringify(isDark));
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark, localStorageKey]);

  return [isDark, setIsDark];
}
