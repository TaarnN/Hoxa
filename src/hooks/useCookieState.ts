import { useState, useEffect, useCallback } from "react";

function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof window === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export function useCookieState(
  key: string,
  initialValue: string = ""
): [string, (value: string, options?: { days?: number }) => void] {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const cookieValue = getCookie(key);
    return cookieValue || initialValue;
  });

  const updateCookie = useCallback(
    (value: string, options?: { days?: number }) => {
      setState(value);
      setCookie(key, value, options?.days);
    },
    [key]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieValue = getCookie(key);
      if (cookieValue) setState(cookieValue);
    }
  }, [key]);

  return [state, updateCookie];
}
