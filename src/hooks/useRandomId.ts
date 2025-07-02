import { useRef } from "react";

export function useRandomId(prefix = "id"): string {
  const idRef = useRef("");

  if (!idRef.current) {
    idRef.current = `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  return idRef.current;
}
