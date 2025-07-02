import { useState, useEffect, useRef } from "react";

export function useKeyPress(targetKey: string | string[]): boolean {
  const [keyPressed, setKeyPressed] = useState(false);
  const keysRef = useRef<string[]>([]);

  useEffect(() => {
    if (Array.isArray(targetKey)) {
      keysRef.current = targetKey;
    } else {
      keysRef.current = [targetKey];
    }
  }, [targetKey]);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (keysRef.current.includes(key)) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      if (keysRef.current.includes(key)) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
}
