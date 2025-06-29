import { useRef } from "react";

let globalIdCounter = 0;

export function useRandomId(prefix = "id"): string {
  const idRef = useRef("");

  if (!idRef.current) {
    globalIdCounter++;
    idRef.current = `${prefix}-${globalIdCounter}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  return idRef.current;
}
