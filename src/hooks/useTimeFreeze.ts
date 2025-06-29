// useTimeFreeze.ts
import { useRef } from "react";

export function useTimeFreeze<T>(value: T, freeze: boolean) {
  const ref = useRef<T>(value);
  if (!freeze) ref.current = value;
  return ref.current;
}
