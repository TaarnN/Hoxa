import { useState, useEffect, useCallback } from "react";

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function setCookie(name: string, value: string, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export function useCookieState(
  key: string,
  initialValue: string = ""
): [string, (value: string, options?: { days?: number }) => void] {
  const [state, setState] = useState(() => {
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
    const cookieValue = getCookie(key);
    if (cookieValue) {
      setState(cookieValue);
    }
  }, [key]);

  return [state, updateCookie];
}
